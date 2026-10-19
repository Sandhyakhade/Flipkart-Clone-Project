import React, { useState, useEffect } from "react";
import { Package, ArrowLeft, Clock, MapPin, CheckCircle2 } from "lucide-react";

const OrdersPage = ({ user, onContinueShopping }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's orders from Express + MongoDB Atlas
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/orders/myorders",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, 
            },
          },
        );

        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.token) {
      fetchOrders();
    }
  }, [user]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2874f0]"></div>
      </div>
    );
  }

  // Empty Orders State
  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-12 bg-white rounded-sm shadow-sm text-center">
        <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center bg-blue-50 rounded-full text-[#2874f0]">
          <Package size={56} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          No Orders Placed Yet!
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Looks like you haven't made your choice yet.
        </p>
        <button
          onClick={onContinueShopping}
          className="bg-[#2874f0] hover:bg-blue-600 text-white font-semibold px-8 py-2.5 rounded-sm shadow-sm transition text-sm"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // Orders List
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Navigation Header */}
      <button
        onClick={onContinueShopping}
        className="flex items-center gap-2 text-sm text-[#2874f0] font-semibold hover:underline mb-4"
      >
        <ArrowLeft size={16} /> Back to Shopping
      </button>

      <h1 className="text-xl font-bold text-gray-800 mb-4">
        My Orders ({orders.length})
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Order Card Header */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-6">
                <div>
                  <span className="font-semibold block text-gray-500">
                    ORDER ID
                  </span>
                  <span className="font-bold text-gray-800">{order._id}</span>
                </div>
                <div>
                  <span className="font-semibold block text-gray-500">
                    ORDER DATE
                  </span>
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-semibold block text-gray-500">
                    TOTAL AMOUNT
                  </span>
                  <span className="font-bold text-gray-900">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 font-bold text-[#388e3c] bg-green-50 px-3 py-1 rounded-full border border-green-200">
                <CheckCircle2 size={14} />
                <span>{order.orderStatus}</span>
              </div>
            </div>

            {/* Order Items List */}
            <div className="p-6 divide-y divide-gray-100">
              {order.orderItems.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 shrink-0 flex items-center justify-center p-1 border border-gray-100 rounded">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 hover:text-[#2874f0] cursor-pointer">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-sm font-bold text-gray-900 sm:text-right">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Address Snapshot */}
            <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100 text-xs text-gray-600 flex items-center gap-2">
              <MapPin size={14} className="text-[#2874f0] shrink-0" />
              <span>
                <strong>Delivering to:</strong> {order.shippingAddress.name},{" "}
                {order.shippingAddress.locality}, {order.shippingAddress.city} (
                {order.shippingAddress.pincode}) | <strong>Payment:</strong>{" "}
                {order.paymentMethod}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
