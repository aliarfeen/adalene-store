import React, { useState } from 'react';
import type { Product } from '../../Types';

// Using a placeholder image URL for the product image
const PLACEHOLDER_IMAGE_URL = 'https://i.imgur.com/g8D0kK5.png'; // Replaces your uploaded image with a publicly accessible placeholder



const ProductPrieview: React.FC<Product> = ({
  image = PLACEHOLDER_IMAGE_URL,
  title = "I'm a product",
  id = 1,
  price = 250.0,
  description = "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care."
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">

        {/* --- Product Image --- */}
        <div className="w-full md:w-1/2 flex justify-center items-start">
          <img
            src={image}
            alt={title}
            className="w-96 h-96 object-cover max-w-lg shadow-lg"
          />
        </div>

        {/* --- Product Details and Actions --- */}
        <div className="w-full md:w-1/2">
          
          {/* --- Details --- */}
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
              <div className="p-2 border-l border-gray-300 hover:bg-gray-100">{quantity}</div>
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
            <button
              className="py-3 px-6 text-white text-base font-semibold rounded shadow-md transition-colors duration-200"
              style={{ backgroundColor: '#cc6633' }} /* Custom color to match the image */
              onClick={() => console.log(`Added ${quantity} of ${name} to cart!`)}
            >
              Add to Cart
            </button>
            <button
              className="py-3 px-6 bg-black text-white text-base font-semibold rounded shadow-md hover:bg-gray-800 transition-colors duration-200"
              onClick={() => console.log(`Buying ${quantity} of ${name} now!`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPrieview;