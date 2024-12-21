import React, { useState } from "react";
import foodData from "../components/foodData.json"; // Import the JSON file
import { useNavigate } from "react-router-dom";
import { useAuth } from "../appwrite/AuthConfig";

const Menu = () => {
  const navigate = useNavigate();
  const {user}=useAuth();
  const handleOrder = (id) => {
    if(user)
    navigate(`${id}`); 
  else
  navigate('/signin'); 
  };

  return (
   <div >
    <div className=' p-2 rounded-lg my-3 lg:my-4 w-full md:w-1/2 mx-auto '>
        <p className='backdrop-blur-md  text-amber-600 text-center text-xl font-semibold py-2 '>Add Items To Cart</p>
      </div>
         
     <div className="h-screen overflow-y-auto">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 p-6 bg-stone-950">
         
         {foodData.map((food) => (
           <div
             key={food.id}
             className="bg-stone-900 rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto transition-transform transform hover:scale-105"
           >
             <img
               src={food.image}
               alt={food.name}
               className="w-full h-64 object-cover"
             />
             <div className="p-4">
               <h2 className="text-2xl font-bold text-white">{food.name}</h2>
               <p className="text-white mt-2">{food.description}</p>
               <p className="text-lg font-semibold text-white mt-2">${food.price}</p>
               <div className="mt-4 flex justify-end">
                 <button
                   onClick={() => handleOrder(food.id)} 
                   className="px-4 py-2 bg-amber-600 text-black font-bold rounded hover:bg-blue-700"
                 >
                   Take Item
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
  );
};

export default Menu;
