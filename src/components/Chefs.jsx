import React from "react";
import chefs from './chefs.json';

const Chefs = () => {
  return (
    <div className="pt-10 bg-stone-950">
      <p className="text-center text-2xl md:text-3xl font-bold my-8 border-b w-1/2 md:w-1/3 mx-auto pb-4 border-amber-700">Our Master Chefs</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-1 max-w-7xl mx-auto">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="bg-zinc-900 rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-110"
          >
            <img
              src={chef.photoUrl}
              alt={chef.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{chef.name}</h3>
            <p className="text-gray-600">{chef.designation}</p>
            <div className="flex justify-center mt-4 space-x-3">
              <a
                href={`mailto:${chef.email}`}
                className="text-blue-500 hover:text-blue-700"
                title="Email"
              >
                <i className="fas fa-envelope"> {chef.email}</i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chefs;