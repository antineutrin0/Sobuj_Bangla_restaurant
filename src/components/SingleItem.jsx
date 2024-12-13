import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import items from './foodData.json';

function SingleItem({ addToOrder }) {
  const { id } = useParams();
  const [singleitem, setsingleitem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false); // Track if the item has been added

  const handleAddToOrder = () => {
    const orderItem = {
      id: singleitem.id,
      itemName: singleitem.name,
      quantity,
      price: quantity * singleitem.price,
    };

    addToOrder(orderItem);
    setIsAdded(true); // Set to true after adding the item
  };

  useEffect(() => {
    const foundItem = items.find(item => item.id == id);
    setsingleitem(foundItem);
  }, [id]);

  if (!singleitem) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-bold text-gray-100">Loading...</p>
      </div>
    );
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div
        key={singleitem.id}
        className="bg-stone-900 rounded-lg shadow-lg flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/3 h-2/3 mx-4 md:mx-auto transition-transform transform hover:scale-105"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">{singleitem.name}</h2>
        </div>
        <div className="flex items-center">
          <img
            src={singleitem.image}
            alt={singleitem.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <p className="text-white mt-2">{singleitem.description}</p>
            <p className="text-xl font-bold text-white mt-2">
              ${singleitem.price}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center mt-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-1 bg-slate-700 text-xl text-white font-bold rounded hover:bg-red-700"
            >
              -
            </button>
            <span className="text-xl font-semibold text-white">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-1 text-xl bg-slate-700 text-white font-bold rounded hover:bg-green-700"
            >
              +
            </button>
          </div>

          <button
            className={`mt-6 px-6 py-2 font-bold rounded-lg ${
              isAdded ? 'bg-green-600 text-gray-200' : 'bg-cyan-900 text-white hover:bg-emerald-600'
            }`}
            onClick={handleAddToOrder}
          >
            {isAdded ? 'Item Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;
