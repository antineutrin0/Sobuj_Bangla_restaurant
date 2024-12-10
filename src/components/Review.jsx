import React from "react";
import reviews from "./review.json";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

const Review = () => {
  return (
    <div className="min-h-screen bg-stone-900 flex justify-center items-center p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-lg shadow-lg bg-stone-800 transition-transform transform hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.profileImage}
                alt={review.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h5 className="text-lg font-bold text-white">{review.name}</h5>
                <p className="text-sm text-gray-400">{review.role}</p>
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="text-gray-300">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
