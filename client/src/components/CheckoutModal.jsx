import React, { useState } from "react";
import {
  X,
  CheckCircle,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const CheckoutModal = ({ cart, totalAmount, user, onClose, onOrderSuccess }) => {
  // Step 1: Address, Step 2: Payment, Step 3: Success Confirmation
  const [step, setStep] = useState(1);

  // Address Form State
  const [address, setAddress] = useState({
    name: user?.name || "",
    phone: "",
    pincode: "400001",
    locality: "",
    city: "Mumbai",
    state: "Maharashtra",
    addressType: "Home",
  });

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Generated Order Details on Success
  const [orderId, setOrderId] = useState("");

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Advance to Payment step!
  };

  // Inside CheckoutModal.jsx:
  const handlePlaceOrder = async () => {
    try {
      // 1. Prepare order payload
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl,
        })),
        shippingAddress: address,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount,
      };

      // 2. If user is logged in, send token to backend!
      let generatedId =
        "OD" + Math.floor(100000000000 + Math.random() * 900000000000);

      if (user && user.token) {
        const response = await fetch("https://flipkart-clone-project-fre2.onrender.com/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();
        if (data.success && data.order) {
          generatedId = data.order._id; // Use real MongoDB order ID!
        }
      }

      setOrderId(generatedId);
      setStep(3); // Advance to Order Success screen!
      onOrderSuccess(); // Clears cart in App.jsx!
    } catch (error) {
      console.error("Error saving order:", error);
      // Still show confirmation
      setStep(3);
      onOrderSuccess();
    }
    };
    
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
        {/* Header */}
        <div className="bg-[#2874f0] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#ffe500]" />
            <h2 className="text-lg font-bold">Flipkart Secure Checkout</h2>
          </div>
          {step !== 3 && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Progress Stepper Bar */}
        {step !== 3 && (
          <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600">
            <div
              className={`flex-1 py-3 text-center border-r border-gray-200 flex items-center justify-center gap-1.5 ${step === 1 ? "bg-white text-[#2874f0] border-b-2 border-b-[#2874f0]" : ""}`}
            >
              <MapPin size={14} /> 1. Delivery Address
            </div>
            <div
              className={`flex-1 py-3 text-center flex items-center justify-center gap-1.5 ${step === 2 ? "bg-white text-[#2874f0] border-b-2 border-b-[#2874f0]" : ""}`}
            >
              <CreditCard size={14} /> 2. Payment Options
            </div>
          </div>
        )}

        {/*  STEP 1: DELIVERY ADDRESS */}
        {step === 1 && (
          <form onSubmit={handleAddressSubmit} className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Add Delivery Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={address.name}
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                  placeholder="Receiver's Name"
                  className="w-full text-sm border border-gray-300 rounded p-2 focus:border-[#2874f0] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  10-Digit Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  placeholder="e.g. 9876543210"
                  className="w-full text-sm border border-gray-300 rounded p-2 focus:border-[#2874f0] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress({ ...address, pincode: e.target.value })
                  }
                  className="w-full text-sm border border-gray-300 rounded p-2 focus:border-[#2874f0] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  City / District
                </label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full text-sm border border-gray-300 rounded p-2 focus:border-[#2874f0] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                Flat, House no., Building, Street
              </label>
              <textarea
                required
                rows={2}
                value={address.locality}
                onChange={(e) =>
                  setAddress({ ...address, locality: e.target.value })
                }
                placeholder="Near landmark, street name..."
                className="w-full text-sm border border-gray-300 rounded p-2 focus:border-[#2874f0] outline-none"
              />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-sm font-bold text-gray-800">
                Total: ₹{totalAmount.toLocaleString("en-IN")}
              </span>
              <button
                type="submit"
                className="bg-[#fb641b] hover:bg-[#e85a14] text-white font-bold py-2.5 px-6 rounded-sm text-sm uppercase shadow transition flex items-center gap-1.5"
              >
                Deliver Here <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Select Payment Option
            </h3>

            <div className="space-y-3">
              {[
                {
                  id: "UPI",
                  label: "UPI (Google Pay, PhonePe, Paytm)",
                  desc: "Pay instantly using any UPI App",
                },
                {
                  id: "CARD",
                  label: "Credit / Debit / ATM Card",
                  desc: "Add and secure your card",
                },
                {
                  id: "NET",
                  label: "Net Banking",
                  desc: "All major Indian banks supported",
                },
                {
                  id: "COD",
                  label: "Cash on Delivery (COD)",
                  desc: "Pay cash when package arrives",
                },
              ].map((method) => (
                <label
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-start gap-3 p-3.5 border rounded cursor-pointer transition ${
                    paymentMethod === method.id
                      ? "border-[#2874f0] bg-blue-50/50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                    className="mt-1 text-[#2874f0]"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-800">
                      {method.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {method.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* Address Summary */}
            <div className="bg-gray-50 p-3 rounded text-xs text-gray-600 flex items-center justify-between border border-gray-100">
              <div>
                <span className="font-bold text-gray-800">Delivering to: </span>
                {address.name}, {address.locality}, {address.city} -{" "}
                {address.pincode}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-[#2874f0] font-bold hover:underline shrink-0 ml-2"
              >
                Change
              </button>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-500 block">
                  Total Payable
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="bg-[#fb641b] hover:bg-[#e85a14] text-white font-bold py-3 px-8 rounded-sm text-sm uppercase shadow transition"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: ORDER SUCCESS ================= */}
        {step === 3 && (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-[#388e3c] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={40} />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Order Placed Successfully! 🎉
            </h2>
            <p className="text-sm text-gray-500">
              Thank you for shopping on Flipkart. Your order has been placed and
              is being packed!
            </p>

            <div className="bg-gray-50 p-4 rounded text-left text-xs space-y-2 border border-gray-100 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-bold text-gray-800">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Mode:</span>
                <span className="font-bold text-gray-800">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-bold text-[#388e3c]">
                  Within 2 - 3 Days
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                <span>Total Amount Paid:</span>
                <span>₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-[#2874f0] hover:bg-blue-600 text-white font-semibold py-2.5 px-8 rounded-sm text-sm shadow transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};;

export default CheckoutModal;
