import React from "react";
import { useNavigate } from "react-router-dom";
import { Client, Account } from "appwrite";
import { useAuth } from "../appwrite/AuthConfig";

const Customersideber = () => {
  const navigate = useNavigate();
   const {logout}=useAuth();
  // Logout function
  const handleLogout = async () => {
    try {

     await logout();
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-stone-800 flex flex-col justify-start  items-center">
      {/* Profile Card */}
      <div className="flex flex-col justify-center items-center  bg-cyan-700 w-full h-1/3   rounded-xl">
        <div className="flex justify-center items-center">
          <img
            className="object-cover  h-40 w-40 rounded-full"
            src="https://images.unsplash.com/photo-1484608856193-968d2be4080e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
            alt="User Profile"
          />
        </div>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-white text-xl font-bold mb-2">Maria R.</h1>
            <p className="text-white text-sm">New York, USA</p>
          </div>
      </div>

      <aside className="w-full" aria-label="Sidebar">
  <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
    <ul className="space-y-6 ml-4">
      <li>
        <button
          onClick={() => navigate("orderfood")}
          className="flex items-center p-4 w-full text-xl font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
          </svg>
          <span className="ml-3">Order Food</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/book-table")}
          className="flex items-center p-4 w-full text-xl font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 3.5a1.5 1.5 0 100 3h4a1.5 1.5 0 100-3h-4zM4.5 7A1.5 1.5 0 013 8.5v8A1.5 1.5 0 014.5 18h11a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0015.5 7h-11z"></path>
          </svg>
          <span className="ml-3">Book Table</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/order-history")}
          className="flex items-center p-4 w-full text-xl font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4a2 2 0 100 4h8a2 2 0 100-4H4zM3 10h10a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1z"></path>
          </svg>
          <span className="ml-3">Order History</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/review-food")}
          className="flex items-center p-4 w-full text-xl font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 1a9 9 0 100 18A9 9 0 1010 1zM8 11.5l-3-3 1.5-1.5L8 8.5l4.5-4.5L14 5l-6 6z"></path>
          </svg>
          <span className="ml-3">Review Food</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => navigate("/donation")}
          className="flex items-center p-4 w-full text-xl font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 1a9 9 0 100 18A9 9 0 1010 1zM8 11.5l-3-3 1.5-1.5L8 8.5l4.5-4.5L14 5l-6 6z"></path>
          </svg>
          <span className="ml-3">Donation</span>
        </button>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="flex items-center p-4 w-full text-xl font-semibold  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 7a1 1 0 112 0v6a1 1 0 11-2 0V7zM4 3a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3z"></path>
          </svg>
          <span className="ml-3">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</aside>

    </div>
  );
};

export default Customersideber;
