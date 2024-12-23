import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaFileInvoiceDollar, FaUsers } from "react-icons/fa";
import { LuTriangleAlert } from "react-icons/lu";
import { useAuth } from "../appwrite/AuthConfig";
import service from "../appwrite/databaseConfig";
import { TbBrandBooking, TbMenuOrder } from "react-icons/tb";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";

const AdminSidebar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState([]);
  const [clickLogout, setClickLogout] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await service.getUserData(user.email);
        setUserData(response);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [user.email]);

  const handleLogoutClicked = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white w-4/5 md:w-full p-5 flex flex-col rounded-lg">
      <div className="mb-8 ">
        <h1 className="text-2xl text-center my-4 mb-8 font-bold">Admin Dashboard</h1>
        <div className="flex items-center mt-4">
          <img
            src={
              userData.length > 0
                ? userData[0].photo_URL
                : "https://via.placeholder.com/40"
            }
            alt="Profile"
            className="rounded-full w-20 h-20"
          />
          <div className="ml-3">
            <h2 className="text-sm font-semibold">{user.name}</h2>
            <p className="text-xs text-gray-400">
              Admin
            </p>
            <button
              onClick={() => setShowDetails((prev) => !prev)}
              className="mt-2 text-blue-500 text-sm underline focus:outline-none"
            >
              {showDetails ? "Hide Details" : "See Details"}
            </button>
          </div>
        </div>
        {showDetails && userData.length > 0 && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg">
            <p className="text-sm">
              <strong>Email:</strong> {userData[0].email}
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> {userData[0].phone || "N/A"}
            </p>
            <p className="text-sm">
              <strong>About:</strong> {userData[0].about || "N/A"}
            </p>
            <p className="text-sm">
              <strong>Address:</strong> {userData[0].address || "N/A"}
            </p>
          </div>
        )}
      </div>

      <ul className="space-y-4">
        {/* Sidebar Menu Items */}
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <FaHome className="mr-3" />
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("neworder");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <TbMenuOrder className="mr-3" />
            New Orders
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("tablebooking");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <TbBrandBooking className="mr-3" />
            Table Booking
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("foodmenu");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <BiFoodMenu className="mr-3" />
            Food Menu
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("additem");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <MdOutlinePostAdd className="mr-3" />
            Add Item
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("orderhistory");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <FaFileInvoiceDollar className="mr-3" />
            Order History
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              toggleSidebar();
              navigate("updateprofile");
            }}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <GiUpgrade className="mr-3" />
            Update Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => setClickLogout(true)}
            className="flex items-center p-2 w-full text-lg font-semibold hover:bg-gray-700 rounded"
          >
            <LuTriangleAlert className="mr-3" />
            Logout
          </button>
        </li>
      </ul>

      {clickLogout && (
        <div className="absolute top-1/3 left-1/4 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-center text-xl font-semibold text-white mb-4">
            Are you sure you want to log out?
          </h3>
          <div className="flex justify-around">
            <button
              onClick={() => setClickLogout(false)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleLogoutClicked}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
