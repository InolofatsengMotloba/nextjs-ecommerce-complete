"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const AddReviewForm = ({ productId }) => {
  const { user } = useAuth(); // Access logged-in user
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/products/${productId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Review added successfully!");
      // Optionally refresh the reviews or reset the form
    } else {
      setMessage(data.error || "Error adding review");
    }
  };

  if (!user) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-extrabold mb-2">Add a Review</h3>
        <span className="text-gray-600">
          Please{" "}
          <Link
            href="/login"
            className="text-[#2d7942] hover:text-green-950 underline"
          >
            LOGIN
          </Link>{" "}
          to add a review.
        </span>
      </div>
    );
  }


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-extrabold">Add a Review</h3>
          <div className="flex items-center">
            {/* Submit Button */}

            <button
              type="submit"
              className="border border-black  bg-gray-100 rounded-full shadow-sm px-3 py-2 mr-2 focus:outline-none focus:ring-[#2d7942] focus:border-[#2d7942] hover:bg-[#2d7942] hover:text-white hover:border-white"
            >
              Submit Review
            </button>
          </div>
        </div>

        {/* Rating Input */}
        <div className="flex items-center">
          <label className="mr-4 font-bold">Rating:</label>
          <div className="flex">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 cursor-pointer ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                onClick={() => setRating(index + 1)}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Comment Input */}
        <div>
          <label className="block text-sm font-bold">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Write your review here"
            className="w-1/2 p-3 border border-gray-300 rounded-lg mt-1 focus:ring-[#2d7942] focus:border-[#2d7942] transition duration-150 ease-in-out"
          ></textarea>
        </div>

        {/* Message Display */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddReviewForm;
