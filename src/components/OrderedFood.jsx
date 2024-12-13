import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import service from '../appwrite/databaseConfig';
import { useAuth } from '../appwrite/AuthConfig';

function OrderedFood({ orderDetail }) {
    const { user } = useAuth();
    const navigate = useNavigate(); // Initialize navigate
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State to manage success alert

    let total = 0;
    orderDetail.map(item => {
        total += item.price;
    });

    async function placeorder() {
        try {
            const orderDetailString = JSON.stringify(orderDetail);

            await service.placeOrder({
                customerName: user.name,
                customerEmail: user.email,
                orderItem: orderDetailString,
                totalPrice: total.toFixed(2),
            });

            setShowSuccessAlert(true); // Show success alert
            setTimeout(() => {
                navigate('/dashboard/customer/orderfood'); // Navigate to OrderFood after 3 seconds
            }, 3000);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    }

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
                        Congratulations!!!
                    </h3>
                    <p className="w-[230px] text-center font-normal text-gray-100">
                        Your order has been placed successfully and is being processed.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-stone-950 p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <h2 className="text-white mx-auto text-2xl bg-green-700 rounded-lg px-6 text-center font-semibold">
                    Ordered Food
                </h2>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-stone-800 text-left text-xl font-semibold text-white uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-stone-800 text-left text-xl font-semibold text-white uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-stone-800 text-left text-xl font-semibold text-white uppercase tracking-wider">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-stone-600 text-lg font-semibold">
                                        <p className="text-gray-100 whitespace-no-wrap">{item.itemName}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-stone-600 text-lg font-semibold">
                                        <p className="text-gray-100 whitespace-no-wrap text-center">{item.quantity}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-stone-600 text-lg font-semibold">
                                        <p className="text-gray-100 whitespace-no-wrap">{`$${item.price.toFixed(2)}`}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <p className="text-white text-xl text-right mr-2 font-bold">
                    Total: ${total.toFixed(2)}
                </p>
            </div>
            <div className="flex items-center mt-8">
                <button
                    className="text-white mx-auto text-2xl bg-lime-700 hover:bg-green-600 rounded-lg px-4 py-1 text-center font-semibold"
                    onClick={placeorder}
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
}

export default OrderedFood;
