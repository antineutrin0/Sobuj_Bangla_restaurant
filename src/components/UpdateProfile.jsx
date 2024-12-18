import React, { useEffect, useState } from 'react';
import service from '../appwrite/databaseConfig';
import { useAuth } from '../appwrite/AuthConfig';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userdata,setuserdata]=useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const {user}=useAuth();
  const navigate=useNavigate();

  useEffect(()=>{
    const getuser=async()=>{
        try {
            const response= await service.getUserData(user.email);
            setuserdata(response);
           if(response.length>0)
            setPhoneNumber(response[0].phone);
           if(response.length>0)
            setAbout(response[0].about);
           if(response.length>0)
            setAddress(response[0].address);
        } catch (error) {
            console.log(error);
        }
    }
    getuser();
  },[])
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
        profilePhoto,
        phoneNumber,
        about,
        address,
      };

    if(userdata.length==0||userdata[0].photo_URL!=profilePhoto)
    {
        console.log("new photo",profilePhoto);
        try {
     const url=  await service.uploadProfile(profilePhoto);
     try {
        console.log("second try")
        const response=await service.updateUserData({
            photo_URL:url,
            email:user.email,
            phone:formData.phoneNumber,
            about:formData.about,
            address:formData.address
        })
         console.log(response);
        window.location.reload();
        navigate('/dashboard/customer/orderfood');
        return;
     } 
     catch (error) {
        console.log(error);
     }

    } catch (error) {
      console.error('Error uploading photo:', error);
      alert('Failed to upload photo. Please try again.');
    }
}
  else{
    try {
        const response=await service.updateUserData({
            photo_URL:profilePhoto,
            email:user.email,
            phone:formData.phoneNumber,
            about:formData.about,
            address:formData.address
        })
        console.log(response);
        window.location.reload();
        navigate('/dashboard/customer/orderfood')
        
     } catch (error) {
        console.log(error);
     }
  }
  };

  const handlePhotoUpload = (event) => {
    event.preventDefault();
    setProfilePhoto(event.target.files[0]);
  
  };

  return (
    <div className="flex items-center justify-center h-full bg-stone-900">
      <div className="w-full max-w-lg text-gray-100 p-8 bg-stone-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
               onChange={handlePhotoUpload}
              className="block w-full text-sm text-gray-100 border border-gray-100 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">About Me</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Write a short bio about yourself"
              rows="4"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Present Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your current address"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

         
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
