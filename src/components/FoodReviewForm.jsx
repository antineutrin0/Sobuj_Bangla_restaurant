import React, { useState } from 'react';
import { FaRegUser, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import service from '../appwrite/databaseConfig';
import { useAuth } from '../appwrite/AuthConfig';
import foodData from './foodData.json';

function FoodReviewForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name || '',
    gmail: user.email || '',
    profile: '',
    category: '',
    rating: 0,
    review: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null); // For handling submission errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.category=='')
    {
      setError("Food Category can not be empty");
      return;
    }
    if(formData.review=='')
    {
      setError("Review section can not be empty");
      return;
    }
    setError(null);

    try {
      await service.makereview(formData);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate('/dashboard/customer/orderfood');
      }, 2000);

      // Reset form after submission
      setFormData({
        name: user.name || '',
        gmail: user.email || '',
        category: '',
        rating: 0,
        review: '',
      });
    } catch (err) {
      console.error('Submission Error:', err);
      setError('Failed to submit review. Please try again later.');
    }
  };

  return (
    <>
      {showSuccess ? (
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              </div>
            </div>
            <h3 className="my-4 text-center text-3xl font-semibold text-gray-100">Submitted Successfully!</h3>
            <p className="text-center font-normal text-gray-100">Your review has been submitted and is being processed.</p>
          </div>
        </div>
      ) : (
        <div className=" text-white flex flex-col w-full mx-auto h-full items-center pt-16 justify-center ">
          <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
            <FaRegUser size={24} />
            Food Review
          </div>

          <div className="relative mt-12 w-full max-w-lg bg-stone-800 rounded-lg">
            <div className="p-6">
              <h3 className="text-xl font-semibold leading-6 tracking-tighter">Submit Your Food Review</h3>
              <p className="mt-1.5 text-sm text-white/50">Let us know your thoughts about the food!</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 pt-0">
              {/* Food Category */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Food Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  <option value="">Select Category</option>
                  {foodData.map((data, index) => (
                    <option key={index} value={data.name} className="bg-gray-700">
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-400 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                      onClick={() => handleRatingClick(star)}
                    />
                  ))}
                </div>
              </div>

              {/* Review */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-400 mb-1">Review</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your review here..."
                  className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                ></textarea>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {/* Submit Button */}
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodReviewForm;
