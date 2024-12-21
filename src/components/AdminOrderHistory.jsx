import { useEffect, useState } from "react";
import service from "../appwrite/databaseConfig";
import { useAuth } from "../appwrite/AuthConfig";
import conf from "../conf/conf";

const generateLast7Days = () => {
  const dates = [];
  const now = new Date();
  for (let i = -6; i <= 0; i++) {
    const pastDate = new Date();
    pastDate.setDate(now.getDate() + i);
    dates.push(pastDate.toISOString().split("T")[0]);
  }
  return dates;

};

function AdminOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user } = useAuth();
  const last7Days = generateLast7Days();

  useEffect(() => {

    const fetchOrderHistory = async () => {
        try {
          const data = await service.getAllCollectionData(conf.sobujbanglaOrderCollectionId);
      
          if (data) {
            const parsedData = data
              .map((order) => {
                order.orderItem = JSON.parse(order.orderItem);
                return order;
              })
              .filter((order) =>
                order.isReceived === true && last7Days.includes(order.$createdAt.split("T")[0])
              );
            setOrderHistory(parsedData);
          }
        } catch (error) {
          console.error("Error fetching order history:", error);
        }
      };
      

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  return (
    <div className="w-full mx-auto h-screen overflow-y-auto">
      <div className="p-4 mx-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-stone-900 dark:border-gray-700"> 
          <h3 className="text-xl text-center font-bold leading-none text-gray-900 dark:text-white">
            Order History (Last 7 Days)
          </h3>
        <div className="flow-root ">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {orderHistory.map((order, index) => (
              <li className="py-3 sm:py-4" key={index}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`https://via.placeholder.com/40?text=${order.customerName.charAt(0)}`}
                      alt={`${order.customerName} avatar`}
                    />
                  </div>
                  <div className="font-semibold">
                    <p className="text-lg text-gray-100 font-semibold">Customer</p>
                    {order.customerName}
                  </div>
                  <div className="flex flex-row w-full items-center space-x-2 overflow-x-auto text-base font-semibold  text-gray-100">
                    {order.orderItem.map((item, i) => (
                      <p key={i} className="mx-3">
                        {item.itemName} <br />
                       <span className="text-gray-400"> x {item.quantity}</span>
                      </p>
                    ))}
                  </div>
                  <div className="font-semibold">
                    <p className="text-lg text-gray-100 font-semibold">Date</p>
                    {order.$createdAt.split("T")[0]}
                  </div>
                  <div >
                    <p className="text-lg text-gray-100 font-semibold">Total</p>
                    <p className="text-sm font-semibold text-gray-400">
                      ${order.totalPrice}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default AdminOrderHistory;


