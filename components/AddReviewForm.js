"use client"

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
    return <p>Please log in to add a review.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <label>Rating:</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <label>Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      ></textarea>
      <button type="submit">Submit Review</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddReviewForm;
