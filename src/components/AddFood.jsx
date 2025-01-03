import React, { useEffect, useState } from 'react';
import service from '../appwrite/databaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import conf from '../conf/conf';

function AddFood() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const {itemId}=useParams();

 useEffect(()=>{
    const fetchitem=async()=>{
        try {
           const response=await service.getsingledocument(itemId,conf.sobujbanglaMenuCollectionId);
           setId(response.id)
           setName(response.name)
          setDescription(response.description)
          setPrice(response.price)
          setImage(response.image)            
        } catch (error) {
            console.log(error);
        }
    }
    if(itemId)
        fetchitem();
 },[])

  const handleImageUpload = (event) => {
    event.preventDefault();
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
        id:parseInt(id),
        name, 
        description,
        image,
        price:parseFloat(price)
      };

    if(itemId){

        try {
            console.log("update",formData);
            await service.updateFoodData(formData,itemId)
           
            navigate('/dashboard/admin/foodmenu')
            window.location.reload();
            return;
        } catch (error) {
            console.log(error);
        }
    }

    try {
      let imageUrl = '';

      if (image) {
        console.log('Uploading image...', image);
        imageUrl = await service.uploadPhoto(image);
        console.log('Image uploaded successfully:', imageUrl);
      }
      console.log('Submitting food data:', formData);
      await service.addFoodData({...formData,image:imageUrl});
      console.log('Food added successfully');
      
      navigate('/dashboard/admin/foodmenu');
      window.location.reload();
    } catch (error) {
      console.error('Error adding food:', error);
      alert('Failed to add food. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-stone-900">
      <div className="w-full max-w-lg text-gray-100 p-8 bg-stone-800 rounded-lg shadow-lg">
        {
         itemId? <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">Update the Item</h2>
         :<h2 className="text-2xl font-bold text-gray-100 text-center mb-6">Add New Item</h2>
        
     }
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Food ID</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter food ID"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Food Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter food name"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description of the food"
              rows="4"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {
            !itemId&&<div>
            <label className="block text-sm font-medium text-gray-100 mb-2">Upload Food Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-100 border border-gray-100 rounded-lg cursor-pointer bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        }

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
