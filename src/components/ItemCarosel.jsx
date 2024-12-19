import React from 'react';
import foodData from './foodData.json';

const ItemCarosel = () => {
  return (
    <div className='flex flex-col items-center '>
      <div className=' border p-2 rounded-lg my-6 lg:my-8'>
        <p className='backdrop-blur-md text-amber-600 text-center text-xl md:text-2xl  font-semibold py-2 '>--POPULAR ITEMS--</p>
      </div>
      <div className="carousel carousel-end bg-stone-950 rounded-box mx-4 max-w-7xl space-x-4 p-4">
      {foodData.map((item) => (
        <div key={item.id} className="carousel-item w-full  relative bg-zinc-900 rounded-xl transition-transform transform hover:scale-105 ">
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
    </div>
  );
};

export default ItemCarosel;
