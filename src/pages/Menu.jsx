import React, { useState } from "react";
import foodData from "../components/foodData.json"; // Import the JSON file
import { useNavigate } from "react-router-dom";

const Menu = ({orderDetail}) => {
  const navigate = useNavigate();

  const handleOrder = (id) => {
    navigate(`${id}`);  
  };

  return (
   <div>
    <div className="flex justify-end mr-4 mt-4">
          <button className="bg-emerald-500 p-2 text-xl font-semibold rounded-lg text-black "
          onClick={()=>{
            navigate("orderedlist")
          }}
          >Place Order</button>
         </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 p-6 bg-stone-950">
         
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
                   className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                 >
                   Take Item
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
   </div>
  );
};

export default Menu;
