import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService, { useAuth } from '../appwrite/AuthConfig';

function Signin() {
    const {login}=useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // Single error state for simplicity
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(formData);
      console.log('Login successful:', result);
      navigate('/cusotmer')
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid email or password.'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 p-4">
      <div className="bg-stone-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mx-auto text-center mb-6">
          <span className="relative left-5 text-xl bg-red-600 px-3 py-1 rounded-r-3xl rounded-l-lg">
            SOBUJ
          </span>
          <span className="bg-green-600 pl-6 pr-2 py-1 text-xl rounded-lg">
            BANGLA
          </span>
        </div>

        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Sign In
        </h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
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
              className="mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
