import { useEffect, useState } from "react";
import service from "../appwrite/databaseConfig";
import { useAuth } from "../appwrite/AuthConfig";
import conf from "../conf/conf";

function NewOrders() {
  const [newOrder, setNewOrder] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNewOrder = async () => {
      try {
        const data = await service.getAllCollectionData(conf.sobujbanglaOrderCollectionId);

        if (data) {
          const parsedData = data
            .map((order) => ({
              ...order,
              orderItem: JSON.parse(order.orderItem),
            }))
            .filter((order) => order.isReceived === false);

          setNewOrder(parsedData);
        }
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    if (user) {
      fetchNewOrder();
    }
  }, []);

  const handleReceive = async (orderId, index) => {
    try {
      await service.updateOrderStatus(orderId, { isReceived: true });

      setNewOrder((prevOrders) =>
        prevOrders.map((order, i) =>
          i === index ? { ...order, isReceived: true } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  
  const orderdate=(timestamp)=>{
    const dateObj = new Date(timestamp);
    const bangladeshTime = new Date(dateObj.getTime() + 6 * 60 * 60 * 1000);
    const date = bangladeshTime.toISOString().split("T")[0]; 
    return date;
  }
  const ordertime=(timestamp)=>{
     const dateObj = new Date(timestamp);
    const bangladeshTime = new Date(dateObj.getTime() + 6 * 60 * 60 * 1000);
    const time = bangladeshTime.toISOString().split("T")[1].split(".")[0];
    return time;
  }

  return (
    <div className="w-full mx-auto h-screen overflow-y-auto p-4">
      <div className="bg-white rounded-lg border shadow-md sm:p-8 dark:bg-stone-900 dark:border-gray-700">
        <h3 className="text-xl my-4 text-center font-bold leading-none text-gray-900 dark:text-white">
          New Orders
        </h3>
        <div className="space-y-4">
          {newOrder.map((order, index) => (
            <div
              key={order.$id}
              className="p-4 bg-stone-800 rounded-lg text-gray-100 shadow-md"
            >
              <div className="flex justify-between my-4">
              <div className="mb-2">
                <p className="text-lg font-semibold">Customer Name: <span className="text-sm">{order.customerName}</span></p>
                <p className="text-lg font-semibold">Customer Email: <span className="text-sm">{order.customerEmail}</span></p>
                <p className="text-lg font-semibold">Phone: <span className="text-sm">{order.phone}</span></p>
                <p className="text-lg font-semibold">Location: <span className="text-sm">{order.location}</span></p>
              </div>
              <div>
              <p>Date: {orderdate(order.$createdAt)}</p>
              <p>Time: {ordertime(order.$createdAt)}</p>
              </div>
              </div>
             <div className="flex justify-between items-end">
             <div className="mb-4">
                <p className="text-lg font-semibold">Order Items:</p>
                <ul className="list-disc list-inside space-y-1">
                  {order.orderItem.map((item, i) => (
                    <li key={i}>
                      {item.itemName} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className=" flex flex-col items-end ">
              <div className="mb-2">
                <p className="text-lg font-semibold">Total Price: <span className="text-sm">${order.totalPrice}</span></p>
              </div>
              
              <button
                onClick={() => handleReceive(order.$id, index)}
                className={`px-4 py-2 text-lg font-semibold rounded-md ${
                  order.isReceived
                    ? "bg-green-600 text-white cursor-default"
                    : "bg-amber-600 text-white hover:bg-amber-700"
                }`}
                disabled={order.isReceived}
              >
                {order.isReceived ? "Received" : "Receive"}
              </button>
              </div>
             </div>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewOrders;
