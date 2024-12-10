import React, { useState } from 'react';
import tableData from '../components/tables.json'; // Assuming you store the JSON file in the same directory

function Table() {
  const [tables, setTables] = useState(tableData);

  // Function to handle chair booking
  const handleChairClick = (tableIndex, chairIndex) => {
    setTables((prevTables) =>
      prevTables.map((table, tIndex) =>
        tIndex === tableIndex
          ? {
              ...table,
              chairs: table.chairs.map((chair, cIndex) =>
                cIndex === chairIndex
                  ? { ...chair, isBooked: !chair.isBooked }
                  : chair
              )
            }
          : table
      )
    );
  };

  const handleBookAll = () => {
    alert('Booking completed!'); // Replace with actual booking functionality
  };

  return (
    <div className="w-full lg:w-2/3 flex flex-col mx-auto items-center justify-center p-6 bg-stone-700">
      <h1 className="text-2xl font-bold text-white mb-4">Restaurant Tables</h1>
      <div className=" mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {tables.map((table, tableIndex) => (
          <div
            key={table.tableNumber}
            className=" w-60 h-48 p-4 border rounded-xl bg-stone-400 transition-transform transform hover:scale-105"
          >
            <h2 className="text-center text-lg font-bold text-black mb-4">
              Table-{table.tableNumber}
            </h2>
            <div className="flex flex-col space-y-6 ">
             <div className='flex flex-row justify-between'>
             {table.chairsleft.map((chair, chairIndex) => (
                <button
                  key={chair.chairNumber}
                  onClick={() => handleChairClick(tableIndex, chairIndex)}
                  className={`w-10 h-12 rounded-xl text-xl font-bold flex items-center justify-center ${
                    chair.isBooked ? 'bg-red-500 text-white' : 'bg-green-500 text-black'
                  }`}
                >
                  {chair.chairNumber}
                </button>
              ))}
             </div>
             <div className='flex flex-row justify-between'>
             {table.chairsright.map((chair, chairIndex) => (
                <button
                  key={chair.chairNumber}
                  onClick={() => handleChairClick(tableIndex, chairIndex)}
                  className={`w-10 h-12 rounded-xl text-xl font-bold flex items-center justify-center ${
                    chair.isBooked ? 'bg-red-500 text-white' : 'bg-green-500 text-black'
                  }`}
                >
                  {chair.chairNumber}
                </button>
              ))}
             </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleBookAll}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
      >
        Book
      </button>
    </div>
   
  );
}

export default Table;
