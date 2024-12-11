import React, { useState } from 'react';
import Table from '../components/Table';


function BookTable() {
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [formData, setFormData] = useState(null);

  const generateNext7Days = () => {
    const dates = [];
    const now = new Date();

    for (let i = 0; i < 7; i++) {
      const futureDate = new Date();
      futureDate.setDate(now.getDate() + i);
      dates.push(futureDate.toISOString().split('T')[0]); // YYYY-MM-DD format
    }

    return dates;
  };

  const generateHours = (startHour) => {
    const hours = [];
    for (let i = startHour; i < 24; i++) {
      hours.push(i.toString().padStart(2, '0')); // Format as 2 digits
    }
    return hours;
  };

  const now = new Date();
  now.setDate(now.getDate() + 1);
  const today = now.toISOString().split('T')[0];
  const currentHour = new Date().getHours();
  const isToday = selectedDate === today;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentHour, isToday);
    console.log(new Date().getHours(), selectedDate);
    if (!selectedDate || !startTime || !endTime) {
      alert('Please fill in all fields!');
      return;
    }

    const data = {
      date: selectedDate,
      startTime: `${startTime}:00`,
      endTime: `${endTime}:00`,
    };

    setSuccessMessage(
      `Table booked successfully for ${data.date} from ${data.startTime} to ${data.endTime}`
    );
    setFormData(data);
    setShowTable(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stone-950 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Book a Table</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-stone-800 p-6 rounded-lg shadow-md space-y-4"
      >
        {/* Date Selection */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Select a Date
          </label>
          <select
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-stone-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Choose a date</option>
            {generateNext7Days().map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Select Start Time
          </label>
          <select
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full bg-stone-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Choose start time</option>
            {generateHours(isToday ? currentHour : 0).map((hour) => (
              <option key={hour} value={hour}>
                {hour}:00
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Select End Time
          </label>
          <select
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full bg-stone-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">Choose end time</option>
            {generateHours(startTime ? parseInt(startTime, 10) + 1 : 0).map((hour) => (
              <option key={hour} value={hour}>
                {hour}:00
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition"
        >
          Take Your Seat
        </button>
      </form>
      {showTable && formData && <Table formData={formData} />}
    </div>
  );
}

export default BookTable;
