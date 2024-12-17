import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { useAuth } from '../appwrite/AuthConfig';

function Signup() {

    const {createAccount}=useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Customer', // Default user type
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
  });

  const navigate = useNavigate();

  const validateInputs = () => {
    const { name, email, password } = formData;
    const newErrors = { name: '', email: '', password: '', userType: '' };
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const result = await createAccount(formData);
      console.log(result);
      if(formData.userType=='Customer')
      navigate('/dashboard/customer/orderfood');
       if(formData.userType=='Admin')
        navigate('/dashboard/admin') 
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, password: error.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 p-4">
      <div className="bg-stone-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mx-auto text-center mb-8">
          <span className="relative left-5 text-xl bg-red-600 px-3 py-1 rounded-r-3xl rounded-l-lg text-white font-semibold">
            SOBUJ
          </span>
          <span className="bg-green-600 pl-6 pr-2 py-1 text-xl rounded-lg text-white font-semibold">
            BANGLA
          </span>
        </div>
        
        <div className="my-4">
          {/* <p className="text-white text-xl font-semibold mb-2">User Type:</p> */}
          <div className="flex space-x-4">
            <label className="flex items-center text-xl font-semibold text-gray-100">
              <input
                type="radio"
                name="userType"
                value="Customer"
                checked={formData.userType === 'Customer'}
                onChange={handleChange}
                className="mr-2"
              />
              Customer
            </label>
            <label className="flex items-center text-xl font-semibold text-gray-100">
              <input
                type="radio"
                name="userType"
                value="Admin"
                checked={formData.userType === 'Admin'}
                onChange={handleChange}
                className="mr-2"
              />
              Admin
            </label>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-100" />
              <span className="text-gray-400">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a
            href="/signin"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
