// RatingCard.tsx

import React, { useMemo } from 'react';
import type { Product } from '../../Types/Product';

interface RatingCardProps {
  product: Product;
}

const ProductRatingCard: React.FC<RatingCardProps> = ({ product }) => {

  const { averageRating, totalReviews, distributionData } = useMemo(() => {
    const rawDistribution = product.rating.starDistribution;

    const starCounts = Object.entries(rawDistribution)
      .map(([key, count]) => ({
        star: parseInt(key.split('_')[0]), 
        count: count,
      }));

    const total = starCounts.reduce((sum, item) => sum + item.count, 0);

    const weightedSum = starCounts.reduce((sum, item) => sum + item.star * item.count, 0);
    const average = total > 0 ? weightedSum / total : 0.0;

    const distribution = starCounts
      .map(item => ({
        star: item.star,
        percentage: total > 0 ? (item.count / total) * 100 : 0,
      }))
      .sort((a, b) => b.star - a.star); 

    return {
      averageRating: average,
      totalReviews: total,
      distributionData: distribution,
    };
  }, [product.rating.starDistribution]);

  // UI rendering values
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;

  return (
    <div className="p-8 max-w-lg mb-3 bg-white rounded-lg font-sans border border-gray-100">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">
        Rate {product.title}
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Rating and reviews are verified and are from people who purchased this product
      </p>

      <div className="flex items-start">
        
        {/* Left Side: Summary Score and Count */}
        <div className="flex-shrink-0 mr-10 text-left">
          <div className="text-7xl font-normal leading-none text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div className="text-2xl text-yellow-500 mb-1 tracking-widest">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="inline-block">
                <span className={
                  i < fullStars 
                    ? 'text-yellow-500' 
                    : i === fullStars && hasHalfStar
                      ? 'text-yellow-400 opacity-70' 
                      : 'text-gray-300' 
                }>
                  &#9733;
                </span>
              </span>
            ))}
          </div>
          <div className="text-base text-gray-600">
            {totalReviews.toLocaleString()} Reviews
          </div>
        </div>

        {/* Right Side: Distribution Bars */}
        <div className="flex-grow flex flex-col space-y-2 pt-1">
          {distributionData.map(({ star, percentage }) => (
            <div key={star} className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-600 w-3 text-right">
                {star}
              </span>
              <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Bar Fill */}
                <div 
                  className="h-full bg-blue-500 transition-all duration-300" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductRatingCard;