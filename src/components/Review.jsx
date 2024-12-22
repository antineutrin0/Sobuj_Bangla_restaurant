import React, { useEffect, useState } from "react";
import { useAuth } from "../appwrite/AuthConfig";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/databaseConfig";
import conf from "../conf/conf";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const reviewsPerPage = 4; 
  
  useEffect(() => {
    const reviewData = async () => {
      try {
        const response = await service.getAllCollectionData(conf.sobujbanglaReviewCollectionId);
        setReviews(response);
      } catch (error) {
        console.log(error);
      }
    };
    reviewData();
  }, []);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);

  
  const nextPage = () => {
    if (endIndex < reviews.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-stone-950 flex flex-col md:flex-row-reverse justify-between items-center p-6">
      {/* Left Section */}
      <div className="flex flex-col justify-start items-center h-full text-center text-white p-6 bg-stone-950 w-full md:w-1/3">
        <p className="text-xl md:text-2xl text-start font-bold border border-amber-600 p-2 bg-amber-600 text-black rounded-lg">
          Our Clients Say
        </p>
        <h2 className="text-lg md:text-lx italic text-center">
          This Restaurant offers an authentic taste of Bengal,<br />
          blending traditional flavors with modern charm. <br />
          With every dish crafted to perfection, <br />
          it’s a place where great food meets heartfelt hospitality.
        </h2>
        <div className="flex mx-auto md:mx-0">
          <button
            className={`text-center mt-8 text-lg md:text-xl hover:text-black font-bold bg-stone-950 p-4 px-8 rounded-lg border border-amber-600 text-white hover:bg-amber-600 ${(user&&user.prefs.role)=="Admin"?"hidden":"Block"}`}
            onClick={() => {
              if (user) navigate("/review");
              else navigate("/signin");
            }}
          >
            Review Our Food
          </button>
        </div>
      </div>

      
      <div className="w-full md:w-2/3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-svh overflow-y-auto">
          {currentReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-lg shadow-lg bg-stone-800 transition-transform transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={
                    review.profile === ""
                      ? "https://i.ibb.co.com/WDk8Fjf/R-1.png"
                      : review.profile
                  }
                  alt={review.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-lg font-bold text-white">{review.name}</h5>
                  <p className="text-sm text-gray-400">{review.gmail}</p>
                  <div className="text-lg text-white"><span className="text-lg font-bold bg-gray-700 rounded-lg text-gray-50">Category: </span>{review.category}</div>
                  <StarRating rating={review.rating} />

                </div>
              </div>
              <p className="text-gray-100"><span className="text-lg font-bold ">Comment: </span>{review.review}</p>
            </div>
          ))}
        </div>

       
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white rounded-lg ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-500"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={endIndex >= reviews.length}
            className={`px-4 py-2 text-white rounded-lg ${
              endIndex >= reviews.length
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
