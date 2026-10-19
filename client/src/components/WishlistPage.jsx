import React from "react";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import ProductCard from "./ProductCard";

/**
 * WishlistPage — shows all products the user has saved to their wishlist.
 * Wishlist is managed in App.jsx state (persisted to localStorage).
 */
const WishlistPage = ({ wishlist, onToggleWishlist, onAddToCart, onContinueShopping }) => {
  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        {/* Empty state */}
        <Heart size={64} className="text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 text-sm mb-6">
          Save items you love by clicking the ❤️ on any product.
        </p>
        <button
          onClick={onContinueShopping}
          className="bg-[#2874f0] text-white px-8 py-2.5 font-semibold text-sm rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-1 text-[#2874f0] text-sm font-semibold hover:underline"
        >
          <ArrowLeft size={16} /> Back to Shopping
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Heart size={20} className="text-red-500" fill="#ef4444" />
        <h1 className="text-xl font-bold text-gray-800">
          My Wishlist ({wishlist.length} {wishlist.length === 1 ? "item" : "items"})
        </h1>
      </div>

      {/* Product Grid — reuses ProductCard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <div key={product._id} className="flex flex-col gap-2">
            <ProductCard
              product={product}
              isWishlisted={true} // always true here since we're on the wishlist page
              onToggleWishlist={onToggleWishlist}
            />
            {/* Add to Cart button below each card */}
            <button
              onClick={() => onAddToCart(product)}
              className="w-full flex items-center justify-center gap-2 bg-[#ff9f00] text-white py-2 text-sm font-bold rounded-sm hover:bg-yellow-600 transition"
            >
              <ShoppingCart size={15} />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
