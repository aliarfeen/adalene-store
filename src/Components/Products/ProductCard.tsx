import { useNavigate } from 'react-router-dom';
import type { Product } from './../../Types/Product';
import React, { useState, useEffect, useContext } from "react";
import { ProductContext, type ProductContextType } from '../../context/ProductContext';
import slugify from "slugify";

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { setproduct } = useContext(ProductContext) ?? {};

  const goToDetails = () => {
  setproduct?.(product);
  localStorage.setItem("product", JSON.stringify(product));
  const slug = slugify(product.title ?? '', { lower: true, strict: true });
  navigate(`/product/${slug}`);
};

  return (
    <div
      onClick={goToDetails}
      className="relative px-5 pb-5 rounded-lg cursor-pointer hover:brightness-95"
    >
      {product.bestSeller && (
        <div className="absolute top-5 left-8 bg-orange-800 text-white text-xs px-3 py-1 rounded-full z-10">
          Best Seller
        </div>
      )}
      <img className="rounded-lg brightness-105" src={product.image} alt={product.title} />
      <p className="text-lg text-center font-normal text-gray-800 mb-1">{product.title}</p>
      <p className="text-lg text-center font-serif font-medium text-red-700 italic">
        {product.price} EGP
      </p>
    </div>
  );
};

export default ProductCard;