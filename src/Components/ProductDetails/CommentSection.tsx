// CommentSection.tsx

import React from 'react';// Import Product and Comment interfaces
import type { Product } from '../../Types';

interface CommentSectionProps {
  product: Product; 
}

const CommentSection: React.FC<CommentSectionProps> = ({ product }) => {
  const { title, comments } = product;

  const renderStars = (rating: number) => {
    return (
      <div className="text-xl text-yellow-500 mr-2">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="max-h-96 xl:max-h-80 overflow-y-scroll p-8 max-w-lg bg-white rounded-lg font-sans border border-gray-100">
      <h2 className="text-2xl font-medium text-gray-900 mb-6">
        Customer Reviews for "{title}" ({comments.length})
      </h2>

      {comments.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No customer reviews yet. Be the first to review this product!
        </div>
      ) : (
        <div className="space-y-6 max-h-96 overflow-y-auto pr-4">
          {comments.map((comment) => (
            <div key={comment.commentId} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center mb-2">
                {renderStars(comment.starRating)}
                <span className="text-sm font-semibold text-gray-800">{comment.author}</span>
                <span className="text-xs text-gray-500 ml-3">on {comment.date}</span>
              </div>
              
              <p className="text-gray-700 mb-3">{comment.text}</p>
              
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;