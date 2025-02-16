import React, { useEffect, useState } from 'react'
import SalesChart from './SalesChart'
import AdminOrderHistory from './AdminOrderHistory'
import AdminTableHistory from './AdminTableHistory'
import { FaDollarSign, FaFileInvoice, FaUsers } from 'react-icons/fa'
import service from '../appwrite/databaseConfig'
import conf from '../conf/conf'

function AdminOutlet() {
    const [usercount,setusercount]=useState();
    const [income,setincome]=useState();
    const [orders,setorders]=useState();

    useEffect(()=>{
        const fetchdashboarddata=async()=>{
            try {
                const response=await service.getsingledocument(conf.sobujbanglaTotalPriceId,conf.sobujbanglaDashboardDataCollectionId)
                setincome(response.totalIncome);
                setorders(response.totalOrder);
            } catch (error) {
                
            }
        }
        fetchdashboarddata();
    },[])

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
    className="flex flex-col items-center justify-center w-full bg-stone-800"
  >
    <div className="text-white text-xl font-bold rounded-xl p-2 my-8 roboto-text flex flex-row  justify-between ">
   <span className="relative left-5 text-black  bg-red-600 px-3 py-1 rounded-r-3xl rounded-l-lg">
      SOBUJ BANGLA
    </span>
    <span className="bg-green-600 text-gray-100 pl-6 pr-2 py-1 rounded-lg">
      Dashboard
    </span>
  </div>

    <div className="flex flex-col mb-10 md:flex-row justify-between w-full space-y-4 md:space-y-0 md:space-x-10">
      <div className="bg-stone-900 w-full shadow-md p-4 rounded-lg flex justify-between items-center">
        <div className='ml-4 md:ml-0'>
          <h4 className="text-gray-100 text-lg font-semibold">Users</h4>
          <p className="text-xl font-bold">+{usercount}</p>
        </div>
        <FaUsers className="text-blue-500 text-3xl mr-4 md:mr-0" />
      </div>
      <div className="bg-stone-900 w-full shadow-md p-4 rounded-lg flex justify-between items-center">
        <div className='ml-4 md:ml-0'>
          <h4 className="text-gray-100 text-lg font-semibold">Total Sales</h4>
          <p className="text-xl font-bold">${income}</p>
        </div>
        <FaDollarSign className="text-green-500 text-3xl mr-4 md:mr-0" />
      </div>
      <div className="bg-stone-900 w-full shadow-md p-4 rounded-lg flex justify-between items-center">
        <div className='ml-4 md:ml-0'>
          <h4 className="text-gray-100 text-lg font-semibold">Orders</h4>
          <p className="text-xl font-bold">+{orders}</p>
        </div>
        <FaFileInvoice className="text-yellow-500 text-3xl mr-4 md:mr-0" />
      </div>
    </div>

    <div className="bg-stone-700 w-full shadow-md rounded-lg">
      <SalesChart />
    </div>
  </div>
  )
}

export default AdminOutlet