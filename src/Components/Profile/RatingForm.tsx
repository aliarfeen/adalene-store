import React, { useEffect, useState } from "react";
import type { Product } from "../../Types";
import apiFactory from "../../Api/apiFactory";

const AddReviewForm: React.FC<{ product: Product }> = ({ product }) => {
  // Local state to manage the user's input
  const [selectedRating, setSelectedRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("loggedUser") || "null");
  const auther = currentUser.username;
    useEffect(() => {
        console.log(product);
        }, [product]);
        
  const handleSubmit = (
    selectedRating:  1 | 2 | 3 | 4 | 5,
    commentText: string,
    auther: string,
    product: Product
  ) => {
    const newComment = {
      commentId: String(Date.now()),
      starRating: selectedRating,
      text: commentText,
      author: auther,
      date: new Date().toLocaleDateString(),
    };

    const updatedProduct = {
      ...product,
      comments: [...product.comments, newComment],
      rating: { ...product.rating,
        starDistribution: { ...product.rating.starDistribution,
          [`${selectedRating}_star`]: product.rating.starDistribution[`${selectedRating}_star`] + 1,},
      },
    };
    console.log(updatedProduct);
    apiFactory.updateProduct(updatedProduct);
  };
  const renderStarSelector = () => {
    return (
      <div className="flex justify-center space-x-1 text-4xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= selectedRating
                ? "text-yellow-500 transition-colors"
                : "text-gray-300 transition-colors hover:text-yellow-400"
            }
            onClick={() => setSelectedRating(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Rate and Review
      </h3>
      <p className="text-center text-gray-600 mb-6">{product.title}</p>

      {/* 1. Star Rating Selection */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-3 text-center">
          Your Rating
        </label>
        {renderStarSelector()}
      </div>

      {/* 2. Comment Text Area */}
      <div className="mb-4">
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Your Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="What did you like or dislike about this product?"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
      </div>
      {/* 4. Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-semibold transition-colors
          ${
            selectedRating > 0 && commentText.length > 5
              ? "bg-orange-600 hover:bg-orange-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        disabled={selectedRating === 0 || commentText.length < 5} // Simple validation
        
        onClick={() =>
          handleSubmit(selectedRating as  1 | 2 | 3 | 4 | 5, commentText, auther, product)
        }
      >
        Submit Review
      </button>
    </div>
  );
};

export default AddReviewForm;
