import { useEffect, useState } from "react";
import service from "../appwrite/databaseConfig";
import { useAuth } from "../appwrite/AuthConfig";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await service.getOrderHistory(user.email);
        const data = response.documents;
        console.log("fetch",data);
        if (data) {
          const parsedData = data.map((order) => {    
              order.orderItem = JSON.parse(order.orderItem);
              return order;
          });
          setOrderHistory(parsedData);
          console.log(orderHistory);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    if (user) {
      fetchOrderHistory();
      console.log(orderHistory);
    }
  }, [user]);

  return (
    <div className="w-full md:w-2/3 mx-auto h-screen overflow-y-auto">
      <div className="p-4 mx-auto bg-white rounded-lg border shadow-md sm:p-8 dark:bg-stone-900 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Order History
          </h3>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {orderHistory.map((order, index) => (
              <li className="py-3 sm:py-4" key={index}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {/* Placeholder Image */}
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`https://via.placeholder.com/40?text=${order.customerName.charAt(0)}`}
                      alt={`${order.customerName} avatar`}
                    />
                  </div>
                  
                  <div className="flex flex-row w-full items-center space-x-2 overflow-x-auto text-base font-semibold text-gray-900 dark:text-white">
                    {order.orderItem.map((item, i) => (
                        
                             <p key={i} className="mx-3">
                        {item.itemName} <br></br>x {item.quantity}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p>Date</p>
                    {
                       order.$createdAt.split("T")[0]
                    }
                  </div>
                  <div>
                    <p>Total</p>
                    <p className=" text-sm font-semibold text-gray-400">${order.totalPrice}</p>
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

export default OrderHistory;
