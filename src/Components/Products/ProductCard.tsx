import { useNavigate } from 'react-router-dom';
import type { Product } from './../../Types/Product';
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from '../../context/ProductContext';
import slugify from "slugify";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { setproduct } = useContext(ProductContext) ?? {};
  const [loading, setLoading] = useState(true); // controls blur + skeleton

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const goToDetails = () => {
    setproduct?.(product);
    localStorage.setItem("product", JSON.stringify(product));
    const slug = slugify(product.title ?? '', { lower: true, strict: true });
    navigate(`/product/${slug}`);
  };

  return (
    <div
      onClick={goToDetails}
      className="relative px-5 pb-5 rounded-lg cursor-pointer hover:brightness-95 transition-all duration-300"
    >
      {/* --- Best Seller Badge --- */}
      {!loading && product.bestSeller && (
        <div className="absolute top-5 left-8 bg-orange-800 text-white text-xs px-3 py-1 rounded-full z-10 shadow-md transition-opacity duration-300 opacity-100">
          Best Seller
        </div>
      )}

      {/* --- Product Image with blur --- */}
      <div className="overflow-hidden rounded-lg">
        <img
          className={`rounded-lg brightness-105 w-full hover:scale-[1.1] object-cover transition-all duration-500 ${
            loading ? 'blur-md scale-105' : 'blur-0 scale-100'
          }`}
          src={product.image}
          alt={product.title}
        />
      </div>

      {/* --- Product Info or Skeletons --- */}
      <div className="mt-3 text-center">
        {loading ? (
          <>
            {/* Title skeleton */}
            <div className="mx-auto mb-2 h-5 w-3/4 rounded bg-gray-200 animate-pulse"></div>
            {/* Price skeleton */}
            <div className="mx-auto h-5 w-1/2 rounded bg-gray-200 animate-pulse"></div>
          </>
        ) : (
          <>
            <p className="text-lg font-normal text-gray-800 mb-1">{product.title}</p>
            <p className="text-lg font-serif font-medium text-red-700 italic">
              {product.price} EGP
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
