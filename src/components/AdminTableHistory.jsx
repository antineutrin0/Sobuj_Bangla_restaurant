import { useEffect, useState } from "react";
import service from "../appwrite/databaseConfig";
import { useAuth } from "../appwrite/AuthConfig";
import conf from "../conf/conf";

const generateNext7Days = () => {
  const dates = [];
  const now = new Date();
  for (let i = 0; i <= 7; i++) {
    const pastDate = new Date();
    pastDate.setDate(now.getDate() + i);
    dates.push(pastDate.toISOString().split("T")[0]);
  }
  return dates;
};

function AdminTableHistory() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();
  const next7Days = generateNext7Days();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await service.getAllCollectionData(conf.sobujbanglaAdminTableDataCollectionId);
        console.log("Admin table bookings:", data);
        console.log("Last 7 days:", next7Days);
  
        const next7DaysData = data.filter(book => 
          next7Days.includes(book.bookingDate)
        );
  
        setBookings(next7DaysData); 
      } catch (error) {
        console.error("Error fetching table bookings:", error);
      }
    };
  
    if (user) {
      fetchBookings();
    }
  }, [user]);
  

  const handleCheck = async (bookingId, index) => {
    try {
      await service.updateBookingStatus(bookingId, { isChecked: true }); 

      setBookings((prevBookings) =>
        prevBookings.map((booking, i) =>
          i === index ? { ...booking, isChecked: true } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <div className="w-full mt-8 h-screen overflow-y-auto">
      <div className="p-4 mx-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-stone-900 dark:border-gray-700">
        <h3 className="text-xl text-center mb-4 text-green-600 font-bold leading-none">
          Table Bookings (Next 7 Days)
        </h3>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {bookings.map((booking, index) => (
              <li className="py-3 sm:py-4" key={index}>
                <div className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <p className="text-gray-900 dark:text-white text-lg">Customer Name:</p>
                  <p>{booking.customerName || "N/A"}</p>
                </div>
                <div className="flex justify-end mt-4">
                  {booking.isChecked ? (
                    <span className="text-green-600 font-bold">Checked</span>
                  ) : (
                    <button
                      onClick={() => handleCheck(booking.$id, index)}
                      className="px-4 py-2 bg-amber-600 text-white text-lg font-semibold rounded-md hover:bg-amber-700"
                    >
                      Check Out
                    </button>
                  )}
                </div>
                </div>
                <div className="flex space-x-2 items-center">
                  <p className="text-gray-900 text-lg dark:text-white">Email:</p>
                  <p>{booking.email || "N/A"}</p>
                </div>
                <div className="flex space-x-2 items-center">
                  <p className="text-gray-900 dark:text-white">Table No:</p>
                  <p className="text-lg font-bold">{booking.tableNo || "N/A"}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-900 mr-2 text-lg dark:text-white">Chair Numbers:</p>
                  <div className="text-gray-900 flex space-x-1 dark:text-white">
                    {booking.chairs ? (
                      JSON.parse(booking.chairs).map((chair, i) => (
                        <span key={i} className="text-lg font-semibold text-green-600 border p-0.5 rounded-lg">
                          {chair.chairNumber}
                        </span>
                      ))
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-900 mr-2 text-lg dark:text-white">Booking Date:</p>
                  <p className="font-bold">{booking.bookingDate || "N/A"}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-900 mr-2 text-lg dark:text-white">Time:</p>
                  <p className="text-lg font-bold border-b">
                    {booking.startTime || "N/A"} - {booking.endTime || "N/A"}
                  </p>
                </div>
               
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminTableHistory;
