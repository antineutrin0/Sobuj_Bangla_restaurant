import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { useAuth } from "../appwrite/AuthConfig";
import { LuTriangleAlert } from "react-icons/lu";
import { BsPciCard } from "react-icons/bs";
import { GiUpgrade } from "react-icons/gi";
import service from "../appwrite/databaseConfig";

const Customersideber = ({toggleSidebar}) => {
  const navigate = useNavigate();
   const {user,logout}=useAuth();
   const [clicklogout,setclicklogout]=useState(false);
   const [showDetails, setShowDetails] = useState(false);
   const [userData,setuserData]=useState([]);
  const handleLogout =  () => {
    setclicklogout(!clicklogout);
     
  };

  useEffect(()=>{
    const data=async()=>{

      try {
        const response=await service.getUserData(user.email);
        setuserData(response);
      } catch (error) {
        console.log(error);
      }
    }
    data();
  },[])

  const handleLogoutclicked = async () => {
    try {
     await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full bg-green-600 rounded-lg flex flex-col justify-start items-center">
      
      <div className="mb-8">
        <h1 className="text-2xl text-center my-4 mb-8 text-gray-800 font-bold">Customer Dashboard</h1>
        <div className="flex items-center mt-4">
          <img
            src={
              userData.length > 0
                ? userData[0].photo_URL
                : "https://via.placeholder.com/40"
            }
            alt="Profile"
            className="rounded-full w-20 h-20"
          />
          <div className="ml-3">
            <h2 className="text-lg text-gray-800 font-semibold">{user.name}</h2>
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="mt-2 text-gray-800 text-sm underline focus:outline-none"
            >
              {showDetails ? "Hide Details" : "See Details"}
            </button>
          </div>
        </div>
        {showDetails && userData.length > 0 && (
          <div className="mt-4 p-4 bg-green-600 rounded-lg shadow-lg border text-gray-800">
            <p className="text-sm">
              <strong>Email:</strong> {userData[0].email}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {userData[0].phone || "N/A"}
            </p>
            <p className="text-sm">
              <strong>About:</strong> {userData[0].about || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {userData[0].address || "N/A"}
            </p>
          </div>
        )}
      </div>

      <aside className="w-full" aria-label="Sidebar">
  <div className="px-3 py-4 md:h-screen rounded-lg overflow-y-auto  bg-gray-50 dark:bg-gray-800">
    <ul className="space-y-6 ml-4">
      <li>
        <button
          onClick={() => {
            toggleSidebar();
            navigate("orderfood")
           
          }
          }
          className="flex items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span className="ml-3">Order Food</span>
        </button>
      </li>
      <li >
        <button
          onClick={() => {
            toggleSidebar();
            navigate("mycard")
          }
          }
          className="flex items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
         <BsPciCard className="text-gray-400"/>
          <span className="ml-3">My Cart</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            toggleSidebar();
            navigate("booktable")
          
          }}
          className="flex items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 3.5a1.5 1.5 0 100 3h4a1.5 1.5 0 100-3h-4zM4.5 7A1.5 1.5 0 013 8.5v8A1.5 1.5 0 014.5 18h11a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0015.5 7h-11z"></path>
          </svg>
          <span className="ml-3">Book Table</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            toggleSidebar();
            navigate("orderhistory")
          }}
          className="flex items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4a2 2 0 100 4h8a2 2 0 100-4H4zM3 10h10a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1z"></path>
          </svg>
          <span className="ml-3">Order History</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            toggleSidebar();
            navigate("reviewfood")
          
          }}
          className="flex items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 1a9 9 0 100 18A9 9 0 1010 1zM8 11.5l-3-3 1.5-1.5L8 8.5l4.5-4.5L14 5l-6 6z"></path>
          </svg>
          <span className="ml-3">Review Food</span>
        </button>
      </li>
      <li>
        <button
          className="items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hidden"
        onClick={()=>{
          toggleSidebar();
        }}
        >

          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 1a9 9 0 100 18A9 9 0 1010 1zM8 11.5l-3-3 1.5-1.5L8 8.5l4.5-4.5L14 5l-6 6z"></path>
          </svg>
          <span className="ml-3">Donation</span>
        </button>
      </li>
      <li >
        <button
          onClick={() => {
            toggleSidebar(); 
            navigate("updateprofile")
          }}
          className="flex items-center p-4 w-full text-lg font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
         <GiUpgrade  className="text-gray-400 text-3xl font-bold"/>
          <span className="ml-3">Update Profile</span>
        </button>
      </li>
      <li>
        <button
          onClick={
            handleLogout}
          className="flex items-center p-4 w-full text-lg font-semibold  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 7a1 1 0 112 0v6a1 1 0 11-2 0V7zM4 3a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3z"></path>
          </svg>
          <span className="ml-3">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</aside>
            {
              clicklogout&& <div className="absolute top-1/3 left-4 lg:right-1/2 z-30 flex items-center justify-center rounded-lg m-0 bg-none">
              <div className="rounded-lg bg-gray-950 px-16 py-14">
                <div className="flex justify-center">
                  <div className="rounded-full bg-red-600 p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 p-4">
                    <LuTriangleAlert className="text-3xl font-bold text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="my-4 text-center text-3xl font-semibold text-gray-100">
              Are You Sure to Logout?
                </h3>
                <div className="flex space-x-32 justify-center rounded-lg">
                  <button className="text-xl p-2 bg-gray-700 rounded-lg" onClick={()=>{
                    setclicklogout(!clicklogout);
                  }}>cencel</button>
                  <button className="text-xl p-2 bg-red-600 rounded-lg text-black" onClick={handleLogoutclicked}>Logout</button>
                </div>
              </div>
            </div>
            }
    </div>
  );
};

export default Customersideber;
