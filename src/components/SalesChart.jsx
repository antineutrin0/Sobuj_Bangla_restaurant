import React, { useEffect, useState } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Rectangle, ResponsiveContainer, LineChart, Line } from 'recharts';
import service from '../appwrite/databaseConfig';
import conf from '../conf/conf';

function SalesChart() {
  const [salesData, setsalesData] = useState([]);
  const [salesChartData, setsalesChartData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const response = await service.getAllCollectionData(conf.sobujbanglaOrderCollectionId);
      setsalesData(response);
    };

    fetchSalesData();
  }, []);

  const generateLast7Days = () => {
    const dates = [];
    const now = new Date();
    for (let i = -6; i <= 0; i++) {
      const pastDate = new Date();
      pastDate.setDate(now.getDate() + i);
      dates.push(pastDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  useEffect(() => {
    if (!salesData || salesData.length === 0) {
      console.log("No sales data available");
      return;
    }

    const dates = generateLast7Days();
    const sales7days = [];

    dates.forEach((date) => {
      let salesValue = 0;
      salesData.forEach((data) => {
        if (data.$createdAt.split('T')[0] === date) {
          salesValue += parseFloat(data.totalPrice);
        }
      });
      sales7days.push({ date: date, value: salesValue });
    });

    setsalesChartData(sales7days);
  }, [salesData]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-full w-full mx-auto space-y-4 md:space-y-0 md:space-x-10 rounded-lg bg-stone-800">
        <div className='w-full flex flex-col items-center justify-center bg-stone-800 rounded-xl '>

<ResponsiveContainer width="100%" height={300} className="bg-stone-800">
  <BarChart
    data={salesChartData}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
    style={{ backgroundColor: '#292524' }} // stone-800 equivalent
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" /> {/* Stone-500 for grid */}
    <XAxis 
      dataKey="date"
      label={{
        value: 'Dates',
        angle: 0,
        position: 'insideBottom',
        offset: -5,
        fill: '#FFFFFF', // White text
      }}
      tick={{ fill: '#FFFFFF' }} // White ticks
    />
    <YAxis 
      label={{
        value: 'Sales Value (USD)',
        angle: -90,
        position: 'insideLeft',
        fill: '#FFFFFF', // White text
      }}
      tick={{ fill: '#FFFFFF' }} // White ticks
    />
    <Tooltip 
      contentStyle={{
        backgroundColor: '#1F2937', // Slate-800 equivalent
        color: '#FFFFFF', // White text
      }}
      itemStyle={{ color: '#FFFFFF' }} // White text
    />
    <Bar dataKey="value" fill="#8884d8" activeBar={<Rectangle fill="gray" stroke="blue" />} />
  </BarChart>
</ResponsiveContainer>

        <div className='text-xl my-6 font-bold text-gray-100'>
          Sales in Last 7 Days
        </div>
        </div>

        <div className='w-full flex flex-col items-center justify-center bg-stone-800 rounded-xl'>
        <ResponsiveContainer width="100%" height={300} className="bg-stone-800">
  <LineChart
    data={salesChartData}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
    style={{ backgroundColor: '#292524' }} // stone-800 equivalent
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" /> {/* Stone-500 for grid */}
    <XAxis 
      dataKey="date"
      label={{
        value: 'Dates',
        angle: 0,
        position: 'insideBottom',
        offset: -5,
        fill: '#FFFFFF', // White text
      }}
      tick={{ fill: '#FFFFFF' }} // White ticks
    />
    <YAxis 
      label={{
        value: 'Sales Value (USD)',
        angle: -90,
        position: 'insideLeft',
        fill: '#FFFFFF', // White text
      }}
      tick={{ fill: '#FFFFFF' }} // White ticks
    />
    <Tooltip 
      contentStyle={{
        backgroundColor: '#1F2937', // Slate-800 equivalent
        color: '#FFFFFF', // White text
      }}
      itemStyle={{ color: '#FFFFFF' }} // White text
    />
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#8884d8" 
      activeDot={{ r: 8, fill: "pink", stroke: "blue" }} 
    />
  </LineChart>
</ResponsiveContainer>
        <div className='text-xl my-6 font-bold text-gray-100'>
          Sales Progress
        </div>
        </div>
        
    </div>
  );
}

export default SalesChart;
