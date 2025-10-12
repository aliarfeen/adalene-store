import React, { useState, useEffect } from 'react';
import type { Product } from '../../Types';
import { Button } from '../Common/Button';

// Placeholder image
const PLACEHOLDER_IMAGE_URL = 'https://i.imgur.com/g8D0kK5.png';

const ProductPreview: React.FC<Product> = ({
  image = PLACEHOLDER_IMAGE_URL,
  title = "I'm a product",
  id = 1,
  price = 250.0,
  description = "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care."
}) => {
  const [quantity, setQuantity] = useState(1);
  const [blur, setBlur] = useState(true); // image starts blurred

  useEffect(() => {
    const timer = setTimeout(() => {
      setBlur(false); // remove blur after 500ms
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const formattedPrice = `${price.toFixed(2)} EGP`;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">

        {/* --- Product Image --- */}
        <div className="relative w-full md:w-1/2 flex justify-center items-start">
          
          {/* Best Seller Badge */}
          <div className="absolute top-4 left-4 bg-orange-800 text-white text-xs font-semibold  px-3 py-1 rounded-full shadow-md z-10">
            Best Seller
          </div>

          <img
            src={image}
            alt={title}
            className={`w-96 h-96 object-cover max-w-lg shadow-lg transition-all duration-500 ${blur ? 'blur-md scale-105' : 'blur-0 scale-100'}`}
          />
        </div>

        {/* --- Product Details --- */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-normal mb-1 text-gray-800">{title}</h1>
          <p className="text-sm mb-1 text-gray-500">SKU: {id}</p>
          <p className="text-xl font-medium mb-4 text-red-600">{formattedPrice}</p>

          <p className="text-base mb-2 text-gray-700">{description}</p>
          <hr className="my-6 border-t border-gray-200" />

          {/* --- Quantity Selector --- */}
          <div className="mb-6">
            <label htmlFor="quantity-input" className="block text-sm font-medium mb-2 text-gray-800">
              Quantity <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center justify-between max-w-fit border border-gray-300 rounded overflow-hidden">
              <button
                className="p-2 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                –
              </button>
              <div className="p-2">{quantity}</div>
              <button
                className="p-2 border-l border-gray-300 hover:bg-gray-100"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex flex-col space-y-3">
            <Button
              className="py-3 px-6 text-white text-base font-semibold rounded shadow-md transition-colors duration-200 bg-orange-800 hover:bg-gray-800"
              onClick={() => console.log(`Added ${quantity} of ${title} to cart!`)}
              text="Add to Cart"
            />
            <Button
              className="py-3 px-6 text-base font-semibold rounded shadow-md hover:bg-gray-800 transition-colors duration-200"
        
              onClick={() => console.log(`Added ${quantity} of ${title} to cart!`)}
              text="Buy Now"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
