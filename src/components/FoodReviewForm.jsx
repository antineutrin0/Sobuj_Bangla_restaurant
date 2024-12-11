import React, { useState } from 'react';
import { FaRegUser, FaStar } from 'react-icons/fa';
import service from '../appwrite/databaseConfig';
import { useAuth } from '../appwrite/AuthConfig';

function FoodReviewForm() {
    const {user}=useAuth();
    console.log(user.email);
  const [formData, setFormData] = useState({
    name:user.name,
    gmail:user.email,
    profile:'',
    category: '',
    rating: 0,
    review: '',
  });

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleRatingClick = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleReviewChange = (e) => {
    setFormData({ ...formData, review: e.target.value });
  };

  async function handleSubmit (e) {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    try {
        await service.makereview(formData);
        console.log('post saved successfully!');
        navigate('orderfood');
        setFormData({
            name:user.name,
            gmail:user.email,
            category: '',
            rating: 0,
            review: '',
        })
        
    } catch (error) {
        
    }
    
  };

  return (
    <div className="bg-stone-950 text-white flex flex-col w-full mx-auto h-full items-center pt-16 sm:justify-center sm:pt-0">
      <a href="#">
        <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
          <FaRegUser size={24} />
          Food Review
        </div>
      </a>
      <div className="relative mt-12 w-full max-w-lg sm:mt-10">
        <div className="relative -mb-px h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
        <div
          className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-6">
            <h3 className="text-xl font-semibold leading-6 tracking-tighter">Submit Your Food Review</h3>
            <p className="mt-1.5 text-sm font-medium text-white/50">Let us know your thoughts about the food!</p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit}>
              {/* Food Category */}
              <div>
                <div
                  className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">
                    Food Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground">
                    <option value="">Select Category</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="main_course">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-4">
                <div
                  className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">
                    Rating
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                        onClick={() => handleRatingClick(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review */}
              <div className="mt-4">
                <div
                  className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                  <label className="text-xs font-medium text-gray-400 group-focus-within:text-white">
                    Review
                  </label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleReviewChange}
                    rows="4"
                    placeholder="Write your review here..."
                    className="block w-full border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 flex items-center justify-end gap-x-2">
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
                  type="submit">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodReviewForm;
