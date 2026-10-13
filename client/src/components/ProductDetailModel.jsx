import React from "react";
import { Star, ShoppingCart, Zap, X, ShieldCheck, Tag } from "lucide-react";

const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  // If no product is selected, render nothing
  if (!product) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-sm max-w-4xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* 1. Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition z-10"
        >
          <X size={22} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-8">
          {/* 2. Left Column: Product Image & Action Buttons */}
          <div className="flex flex-col items-center">
            <div className="h-80 w-full flex items-center justify-center p-4 border border-gray-100 rounded mb-6">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Action Buttons: Add to Cart & Buy Now */}
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={handleAdd}
                className="bg-[#ff9f00] hover:bg-[#f39700] text-white font-bold py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 text-sm uppercase shadow-sm transition"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={handleAdd}
                className="bg-[#fb641b] hover:bg-[#e85a14] text-white font-bold py-3.5 px-4 rounded-sm flex items-center justify-center gap-2 text-sm uppercase shadow-sm transition"
              >
                <Zap size={18} />
                Buy Now
              </button>
            </div>
          </div>

          {/* 3. Right Column: Product Info & Flipkart Bank Offers */}
          <div className="flex flex-col">
            <h1 className="text-xl font-medium text-gray-800 leading-snug">
              {product.title}
            </h1>

            {/* Ratings & Reviews Badge */}
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                {product.rating} <Star size={12} fill="white" />
              </span>
              <span className="text-sm font-semibold text-gray-500">
                {product.numReviews.toLocaleString()} Ratings & Reviews
              </span>
            </div>

            {/* Price Breakdown */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-base font-bold text-[#388e3c]">
                  {product.discountPercentage}% off
                </span>
              )}
            </div>

            {/* Flipkart Bank Offers List */}
            <div className="mt-4 border-t border-b border-gray-100 py-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">
                Available Offers
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                <li className="flex items-start gap-1.5">
                  <Tag size={14} className="text-[#388e3c] shrink-0 mt-0.5" />
                  <span>
                    <strong>Bank Offer:</strong> 5% Unlimited Cashback on
                    Flipkart Axis Bank Card
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Tag size={14} className="text-[#388e3c] shrink-0 mt-0.5" />
                  <span>
                    <strong>Special Price:</strong> Extra 10% off on first order
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Tag size={14} className="text-[#388e3c] shrink-0 mt-0.5" />
                  <span>
                    <strong>Partner Offer:</strong> Sign up for Flipkart Pay
                    Later & get ₹500 Times Prime
                  </span>
                </li>
              </ul>
            </div>

            {/* Product Description */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">
                Product Description
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Brand Warranty Assurance */}
            <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100">
              <ShieldCheck size={18} className="text-[#2874f0]" />
              <span>1 Year Brand Warranty available for this product</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
