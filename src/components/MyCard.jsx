import React, { useEffect, useState } from "react";
import service from "../appwrite/databaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../appwrite/AuthConfig";

const MyCard = () => {
  const { user,foodData } = useAuth();
  const [cardData, setCardData] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [triger, setTriger] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCardData = async () => {
      try {
        const data = await service.getMyCardData(user.email);
        console.log(data);
        setCardData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCardData();
  }, [triger]);

  useEffect(() => {
    const newFoodItems = cardData.map((item) =>
      foodData.find((singleitem) => singleitem.id == item.itemId)
    );
    console.log("foodItem: ", newFoodItems);
    setFoodItem(newFoodItems);
  }, [cardData]);

  const handleremove = async (id) => {
    console.log(id.toString());
    try {
      await service.deleteFromCard(id.toString(), user.email);
    } catch (error) {
      console.log(error);
    }
    setTriger(!triger);
  };

  return (
    <div className="bg-stone-900 p-6 h-full">
      <div className="text-2xl md:text-3xl border w-1/2 mx-auto p-2 border-amber-700 text-amber-700 rounded-lg font-bold text-center mb-6">
        MY CART
      </div>

     
      {foodItem.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-3xl text-gray-400 font-bold"> Cart is Empty</h2>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItem.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 relative"
            >
              <div className="block">
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="mt-4 mx-auto">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {card.name}
                </h2>
                <div>
                  {cardData.map((singlecard) =>
                    singlecard.itemId == card.id ? (
                      <div className="flex flex-row-reverse justify-between">
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-2">
                          Total: ${singlecard.totalPrice}
                        </p>
                        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-2">
                          Quantity: {singlecard.quantity}
                        </p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
                  onClick={() => handleremove(card.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {foodItem.length > 0 && (
        <div className="flex justify-center my-20">
          <button
            className="text-2xl p-2 md:p-4 font-bold bg-amber-600 hover:bg-amber-700 rounded-lg text-black"
            onClick={() => {
              navigate("/dashboard/customer/orderfood/orderedlist");
            }}
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCard;
