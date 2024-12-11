import React, { useEffect, useState } from 'react';
import tableData from './tables.json'; // Assuming you store the JSON file in the same directory
import service from '../appwrite/databaseConfig';

function Table({ formData }) {
  console.log(formData);
  const [tables, setTables] = useState(tableData);

  const handleChairClick = (tableIndex, chairIndex) => {
    setTables((prevTables) =>
      prevTables.map((table, tIndex) =>
        tIndex === tableIndex
          ? {
              ...table,
              chairs: table.chairs.map((chair, cIndex) =>
                cIndex === chairIndex && chair.isBooked !== "Booked" // Prevent toggling if "Booked"
                  ? { ...chair, isBooked: !chair.isBooked }
                  : chair
              ),
            }
          : table
      )
    );
  };

  async function bookseat(data) {
    try {
      console.log("Booking data:", data);
      await service.bookTable(data);
      console.log("booked successfully!"); // Ensure service.bookTable is implemented to create a document
    } catch (error) {
      console.error("Error booking seat:", error);
    }
  }

  useEffect(() => {
    const fetchBookedTable = async () => {
      try {
        const data = await service.getbookedtable(formData.date);
        const bookedtable = data.documents;
        const updatedTables = [...tables];
        bookedtable.forEach((table) => {
          const tableNo = table.tableNo;
          if (
            formData.endTime >= table.startTime &&
            formData.endTime <= table.endTime
          ) {
            const chairNo = table.chairNo;
            tables[tableNo - 1].chairs.forEach((chair) => {
              if (chair.chairNumber === chairNo) {
                chair.isBooked = "Booked";
                console.log("got it");
              }
            });
          }
        
          
        });
        setTables(updatedTables);
        console.log(tables);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookedTable();
  }, [formData.date]);

  const handleBookAll = () => {
    tables.forEach((table) => {
      const tableNo = table.tableNumber;

      table.chairs.forEach((chair) => {
        if (chair.isBooked === true) {
          const data = {
            tableNo: tableNo,
            chairNo: chair.chairNumber,
            bookingDate: formData.date,
            startTime: formData.startTime,
            endTime: formData.endTime,
          };
          bookseat(data);
        }
      });
    });
  };

  return (
    <div className="w-full lg:w-2/3 flex flex-col mx-auto items-center justify-center p-6 bg-stone-950">
      <h1 className="text-2xl font-bold text-white mb-4">Restaurant Tables</h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table, tableIndex) => (
          <div
            key={table.tableNumber}
            className="w-60 p-4 border rounded-xl bg-stone-700 transition-transform transform hover:scale-105"
          >
            <h2 className="text-center text-lg font-bold text-white mb-4">
              Table-{table.tableNumber}
            </h2>
            <div className="flex flex-col space-y-4">
              {table.chairs
                .reduce((rows, chair, index) => {
                  const rowIndex = Math.floor(index / 4);
                  if (!rows[rowIndex]) rows[rowIndex] = [];
                  rows[rowIndex].push(chair);
                  return rows;
                }, [])
                .map((row, rowIndex) => (
                  <div key={rowIndex} className="flex flex-row justify-between">
                    {row.map((chair, chairIndex) => (
                      <button
                        key={chair.chairNumber}
                        onClick={() => {
                          if (chair.isBooked !== "Booked") {
                            handleChairClick(
                              tableIndex,
                              chairIndex + rowIndex * 4
                            );
                          }
                        }}
                        className={`w-10 h-12 rounded-xl text-xl font-bold flex items-center justify-center 
                          ${chair.isBooked === "Booked" ? "bg-red-500 text-black" : chair.isBooked ? "bg-yellow-500 text-white" : "bg-green-500 text-black"}
                        `}
                        disabled={chair.isBooked === "Booked"} // Disable button for "Booked" chairs
                      >
                        {chair.chairNumber}
                      </button>
                    ))}
                  </div>
                ))}
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
