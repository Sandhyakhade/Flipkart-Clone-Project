import React from "react";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

const CartPage = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onContinueShopping,
}) => {
  // 1. Calculate Price Totals using .reduce()
  const totalMRP = cart.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0,
  );
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalDiscount = totalMRP - totalAmount;

  // 2. Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-8 bg-white rounded-sm shadow-sm text-center">
        <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center bg-blue-50 rounded-full text-[#2874f0]">
          <ShoppingBag size={64} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Your Cart is Empty!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Explore our top categories and find great deals.
        </p>
        <button
          onClick={onContinueShopping}
          className="bg-[#2874f0] hover:bg-blue-600 text-white font-semibold px-8 py-2.5 rounded-sm shadow-sm transition text-sm"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // 3. Cart Items & Price Details View
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back to Shopping Header */}
      <button
        onClick={onContinueShopping}
        className="flex items-center gap-2 text-sm text-[#2874f0] font-semibold hover:underline mb-4"
      >
        <ArrowLeft size={16} /> Continue Shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width): Cart Items List */}
        <div className="lg:col-span-2 bg-white rounded-sm shadow-sm divide-y divide-gray-100">
          <div className="p-4 font-bold text-gray-800 text-base border-b border-gray-100">
            Flipkart Cart ({cart.reduce((t, i) => t + i.quantity, 0)} Items)
          </div>

          {cart.map((item) => (
            <div
              key={item._id}
              className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              {/* Product Thumbnail & Quantity Buttons */}
              <div className="flex sm:flex-col items-center gap-3 shrink-0">
                <div className="w-24 h-24 flex items-center justify-center p-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* + and - Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateQuantity(item._id, -1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold border border-gray-200 py-0.5">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item._id, 1)}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-800 hover:text-[#2874f0] cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Seller: RetailNet
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹
                        {(item.originalPrice * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                    )}
                    {item.discountPercentage > 0 && (
                      <span className="text-sm font-semibold text-[#388e3c]">
                        {item.discountPercentage}% Off
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Remove Item */}
                <div className="flex items-center gap-6 mt-4 pt-3 border-t border-gray-50">
                  <button
                    onClick={() => onRemoveFromCart(item._id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-red-600 uppercase tracking-wide transition"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Place Order Footer */}
          <div className="p-4 flex justify-end bg-gray-50 border-t border-gray-100">
            <button
              onClick={() =>
                alert(
                  `Order placed successfully for ₹${totalAmount.toLocaleString("en-IN")}! 🎉`,
                )
              }
              className="bg-[#fb641b] hover:bg-[#e85a14] text-white font-bold py-3 px-10 rounded-sm text-sm uppercase shadow transition"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Right Column (1/3 width): Flipkart Price Details Card */}
        <div className="h-fit sticky top-20">
          <div className="bg-white rounded-sm shadow-sm p-4 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider pb-3 border-b border-gray-100">
              Price Details
            </h3>

            <div className="space-y-3.5 my-4 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>
                  Price ({cart.reduce((t, i) => t + i.quantity, 0)} items)
                </span>
                <span>₹{totalMRP.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-[#388e3c]">
                <span>Discount</span>
                <span>- ₹{totalDiscount.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-[#388e3c] font-semibold">FREE</span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-3.5 flex justify-between font-bold text-base text-gray-900">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Savings Notice */}
            {totalDiscount > 0 && (
              <div className="border-t border-gray-100 pt-3 text-xs font-semibold text-[#388e3c]">
                You will save ₹{totalDiscount.toLocaleString("en-IN")} on this
                order 🎉
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
