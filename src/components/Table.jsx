import React, { useEffect, useState } from "react";
import tableData from "./tables.json"; // Assuming you store the JSON file in the same directory
import service from "../appwrite/databaseConfig";

function Table({ formData,showTable }) {
  console.log(formData);
  const [tables, setTables] = useState(tableData);
  const [isBooked, setIsBooked] = useState(false); // Track overall booking status
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // Track alert visibility

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
      console.log("Booked successfully!");
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

  const handleBookAll = async () => {
    try {
      for (const table of tables) {
        const tableNo = table.tableNumber;
        for (const chair of table.chairs) {
          if (chair.isBooked === true) {
            const data = {
              tableNo: tableNo,
              chairNo: chair.chairNumber,
              bookingDate: formData.date,
              startTime: formData.startTime,
              endTime: formData.endTime,
            };
            await bookseat(data);
          }
        }
      }
      setShowSuccessAlert(true); 
      console.log("ShowSuccessAlert triggered."); 
      setTimeout(() => {
        window.location.reload();
        setShowSuccessAlert(false);

      }, 3000); 
    } catch (error) {
      console.error("Error booking:", error);
      alert("Failed to book. Please try again.");
    }
  };
  
  if (showSuccessAlert) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950">
        <div className="rounded-lg bg-stone-900 px-16 py-14">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-400 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h3 className="my-4 text-center text-3xl font-semibold text-gray-100">
          Booked Successfully!
          </h3>
          <p className="w-[230px] text-center font-normal text-gray-100">
            Your seat has been placed and is being processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col mx-auto items-center justify-center p-6 bg-stone-950">
      <h1 className="text-2xl font-bold text-white mb-4">Map of Tables</h1>
      <div className="flex flex-row space-x-4 my-4">
        <div className="bg-red-600 text-black py-3 px-1 rounded-lg font-semibold">
          Booked
        </div>
        <div className="bg-yellow-500 text-black py-3 px-1 rounded-lg font-semibold">
         Added
        </div>
        <div className="bg-green-500 text-black py-3 px-1 rounded-lg font-semibold">
          Empty
        </div>
      </div>
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
        className={`my-16 px-3 py-1 md:py-2 font-bold text-xl rounded-lg ${
          isBooked ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        disabled={isBooked} // Disable if already booked
      >
        {isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
}

export default Table;