import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between border border-transparent hover:border-gray-200">
      {/* 1. Product Image */}
      <div className="h-48 w-full flex items-center justify-center overflow-hidden mb-3">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* 2. Product Info */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-[#2874f0] transition">
          {product.title}
        </h3>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mt-1 mb-2">
          <span className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} <Star size={10} fill="white" />
          </span>
          <span className="text-xs text-gray-500">
            ({product.numReviews.toLocaleString()})
          </span>
        </div>

        {/* Price & Discount */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="text-xs font-semibold text-[#388e3c]">
              {product.discountPercentage}% off
            </span>
          )}
        </div>

        <p className="text-[11px] text-gray-500 mt-1">Free delivery</p>
      </div>
    </div>
  );
};

export default ProductCard;
