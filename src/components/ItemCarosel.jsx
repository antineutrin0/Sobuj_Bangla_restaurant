import React from 'react';
import foodData from './foodData.json';
import { useNavigate } from 'react-router-dom';

const ItemCarosel = () => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col md:flex-row items-center justify-between'>
      <div className="carousel carousel-end bg-stone-950 rounded-box mx-4 w-2/3 space-x-4 p-4">
      {foodData.map((item) => (
        <div key={item.id} className="carousel-item w-full md:w-1/2 relative bg-zinc-900 rounded-xl transition-transform transform hover:scale-105 ">
          <img
            src={item.image}
            alt={item.name}
            className="rounded-box w-full mx-auto  h-full object-cover"
          />
          <div className="absolute bottom-6 left-0 right-0 backdrop-blur-md text-white text-center text-3xl font-semibold py-2">
            <p className="font-semibold">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
    <div className='flex flex-col items-center justify-center mx-auto'>
    <div className=' border p-2 rounded-lg my-6 lg:my-8'>
        <p className='backdrop-blur-md text-amber-600 text-center text-xl md:text-2xl  font-semibold py-2 '>--POPULAR ITEMS--</p>
      </div>
      <div>
      <p className=" text-lg font-thin mt-2 rounded-lg p-2">This Restaurant offers an authentic taste of Bengal,<br /> blending traditional flavors with modern charm. <br /> With every dish crafted to perfection, <br /> it’s a place where great food meets heartfelt hospitality.</p>
      </div>
      <div>
        <button className='text-xl bg-green-500 rounded-lg p-2  text-black font-semibold hover:bg-green-600'
        onClick={()=>{
          navigate('/dashboard/customer/orderfood')
        }}
        >Order Here</button>
      </div>
    </div>
    </div>
  );
};

export default ItemCarosel;
