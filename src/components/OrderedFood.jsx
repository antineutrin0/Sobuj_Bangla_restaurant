import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import service from '../appwrite/databaseConfig';
import { useAuth } from '../appwrite/AuthConfig';

function OrderedFood() {
    const { user } = useAuth();
    const navigate = useNavigate(); 
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
    const [orderDetail, setOrderDetail] = useState([]);
    const [totalprice, settotalprice] = useState(0);
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState({});
    let total = 0;

    useEffect(() => {
        const orderdata = async () => {
            try {
                const response = await service.getMyCardData(user.email);
                setOrderDetail(response);
                console.log(orderDetail);
            } catch (error) {
                console.log(error);
            }
        };
        orderdata();
    }, []);

    useEffect(() => {
        console.log("total");
        console.log("order", orderDetail);
        const sum = () => {
            orderDetail.map(item => {
                total += Number(item.totalPrice);
            });
            settotalprice(total);
        };

        sum();
    }, [orderDetail]);

    async function placeorder() {
        const formErrors = {};

        if (!location) {
            formErrors.location = "Location is required.";
        }

        if (!phone) {
            formErrors.phone = "Phone number is required.";
        }

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        try {
            const OrderDetailString = orderDetail.map(order => ({
                id: order.itemId,
                itemName: order.itemName,
                quantity: order.quantity,
                price: order.totalPrice,
            }));
            console.log("stringify", OrderDetailString);
            const orderstringify = JSON.stringify(OrderDetailString);

            const formData = {
                customerName: user.name,
                customerEmail: user.email,
                location,
                phone,
                orderItem: orderstringify,
                totalPrice: totalprice.toFixed(2),
                location:location,
                phone:phone
            };

            await service.placeOrder(formData);

            orderDetail.map(order => {
                const deleteFromCard = async () => {
                    try {
                        await service.deleteFromCard(order.itemId, user.email);
                    } catch (error) {
                        console.log(error);
                    }
                };
                deleteFromCard();
            });

            setShowSuccessAlert(true);
            setTimeout(() => {
                navigate('/dashboard/customer/orderfood');
                window.location.reload();
            }, 2000);
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
        <div className="bg-stone-950 p-8 rounded-md w-full lg:w-2/3 mx-auto">
            <div className="flex items-center justify-between pb-6">
                <h2 className="text-white mx-auto text-2xl border border-amber-700 rounded-lg px-6 text-center font-semibold">
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
                                        <p className="text-gray-100 whitespace-no-wrap ml-10">{item.quantity}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-stone-600 text-lg font-semibold">
                                        <p className="text-gray-100 whitespace-no-wrap">{`$${item.totalPrice}`}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <p className="text-white text-xl text-right mr-2 font-bold">
                    Total: ${totalprice.toFixed(2)}
                </p>
            </div>

            <div className="flex flex-col items-center mt-8">
            <div className="mb-4">
                <label htmlFor="location" className="block text-white text-lg font-semibold">
                    Location
                </label>
                <input
                    id="location"
                    type="text"
                    className="w-full px-4 py-2 text-black rounded-lg"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-white text-lg font-semibold">
                    Phone Number
                </label>
                <input
                    id="phone"
                    type="text"
                    className="w-full px-4 py-2 text-black rounded-lg"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
               {orderDetail.length ? (
                   <button
                       className="text-white mx-auto text-2xl bg-lime-700 hover:bg-green-600 rounded-lg px-4 py-1 text-center font-semibold"
                       onClick={placeorder}
                   >
                       Confirm Order
                   </button>
               ) :
               (
                <p>Card is empty</p>
               )
            }

            </div>
            </div>
             
        );
    }
    export default OrderedFood;
