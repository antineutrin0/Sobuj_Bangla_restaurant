import React, { useEffect, useState } from 'react'
import SalesChart from './SalesChart'
import AdminOrderHistory from './AdminOrderHistory'
import AdminTableHistory from './AdminTableHistory'
import { FaDollarSign, FaFileInvoice, FaUsers } from 'react-icons/fa'
import service from '../appwrite/databaseConfig'
import conf from '../conf/conf'

function AdminOutlet() {
    const [usercount,setusercount]=useState();
    useEffect(()=>{
        const fetchuser=async()=>{
            try {
                const user=await service.getAllCollectionData(conf.sobujbanglaUserCollectionId)
                setusercount(user.length);
            } catch (error) {
                console.log(error);
            }
        }
        fetchuser();
    },[])

  return (
    <div 
    className="flex flex-col items-center justify-center w-full mx-4 md:mx-10"
  >
    <h1 className="text-2xl font-bold my-5">Sobuj Bangla Dashboard</h1>
    <div className="flex flex-col md:flex-row justify-between w-full space-y-4 md:space-y-0 md:space-x-10">
      <div className="bg-white w-full shadow-md p-4 rounded-lg flex justify-between items-center">
        <div>
          <h4 className="text-gray-600 text-lg font-semibold">Users</h4>
          <p className="text-xl font-bold">+{usercount}</p>
        </div>
        <FaUsers className="text-blue-500 text-3xl" />
      </div>
      <div className="bg-white w-full shadow-md p-4 rounded-lg flex justify-between items-center">
        <div>
          <h4 className="text-gray-600 text-lg font-semibold">Income</h4>
          <p className="text-xl font-bold">$2,873.88</p>
        </div>
        <FaDollarSign className="text-green-500 text-3xl" />
      </div>
      <div className="bg-white w-full shadow-md p-4 rounded-lg flex justify-between items-center">
        <div>
          <h4 className="text-gray-600 text-lg font-semibold">Orders</h4>
          <p className="text-xl font-bold">+79</p>
        </div>
        <FaFileInvoice className="text-yellow-500 text-3xl" />
      </div>
    </div>

    <h2 className="text-2xl font-bold mt-10 mb-5">Last 24h Incomes</h2>
    <div className="bg-stone-700 w-full shadow-md rounded-lg">
      <SalesChart />
    </div>
  </div>
  )
}

export default AdminOutlet