import React, { useState } from 'react';
import { FaUsers, FaDollarSign, FaFileInvoice } from 'react-icons/fa';
import AdminSidebar from '../components/AdminSidebar'; // Ensure this component exists
import SalesChart from '../components/SalesChart'; // Ensure this component exists
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from 'react-icons/tb';
import AdminOrderHistory from '../components/AdminOrderHistory';
import AdminTableHistory from '../components/AdminTableHistory';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [toggle, setToggle] = useState(false);

  const toggleSidebar = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex h-full  mx-auto bg-stone-800">
      <div className="absolute top-0 left-4 z-10 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black bg-gray-600 rounded-lg"
        >
          {toggle ? (
            <TbLayoutSidebarLeftExpandFilled size={24} className="text-white" />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled size={24} className="text-white" />
          )}
        </button>
      </div>

      <div className='w-full md:flex'>
      <div
          className={`w-4/5 absolute top-10 md:top-0 rounded-lg z-10 md:static md:w-1/3  ${toggle ? "block" : "hidden"} md:block`}
        > <AdminSidebar toggleSidebar={toggleSidebar}/>
        </div>
      <div className='w-full md:w-2/3 mx-4 md:mx-8'>
      <Outlet></Outlet>
      </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
