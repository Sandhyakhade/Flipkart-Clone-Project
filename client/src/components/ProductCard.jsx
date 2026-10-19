import React from "react";
import { Star, Heart } from "lucide-react";

/**
 * ProductCard — displays a single product in the grid.
 * Accepts an optional wishlist toggle so it works on both
 * the home page and inside WishlistPage.
 */
const ProductCard = ({ product, onClick, isWishlisted, onToggleWishlist }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition duration-200 cursor-pointer flex flex-col justify-between border border-transparent hover:border-gray-200 relative"
    >
      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent card click from firing when heart is clicked
          if (onToggleWishlist) onToggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-gray-100 transition"
        aria-label="Toggle Wishlist"
      >
        <Heart
          size={18}
          className={isWishlisted ? "text-red-500" : "text-gray-300"}
          fill={isWishlisted ? "#ef4444" : "none"}
        />
      </button>

      {/* Product Image */}
      <div className="h-48 w-full flex items-center justify-center overflow-hidden mb-3">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Info */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-[#2874f0] transition">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 mt-1 mb-2">
          <span className="bg-[#388e3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {product.rating} <Star size={10} fill="white" />
          </span>
          <span className="text-xs text-gray-500">
            ({product.numReviews.toLocaleString()})
          </span>
        </div>

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
