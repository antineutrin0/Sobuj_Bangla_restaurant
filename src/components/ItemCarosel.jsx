import React from 'react';
import foodData from './foodData.json';

const ItemCarosel = () => {
  return (
    <div className="carousel carousel-end bg-stone-950 rounded-box mx-4 md:w-2/3 space-x-4 p-4">
      {foodData.map((item) => (
        <div key={item.id} className="carousel-item relative bg-zinc-900 rounded-xl">
          <img
            src={item.image}
            alt={item.name}
            className="rounded-box w-full  h-full object-cover"
          />
          <div className="absolute bottom-6 left-0 right-0 backdrop-blur-md text-white text-center text-3xl font-semibold py-2">
            <p className="font-semibold">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCarosel;
