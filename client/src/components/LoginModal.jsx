import React, { useState } from "react";
import { X, Lock, Mail, User } from "lucide-react";

const LoginModal = ({ onClose, onLoginSuccess }) => {
  // Toggle between 'Login' and 'Register' modes
  const [isRegistering, setIsRegistering] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Status & Error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Choose the right endpoint based on mode:
      const endpoint = isRegistering
        ? "https://flipkart-clone-project-fre2.onrender.com/api/auth/register"
        : "https://flipkart-clone-project-fre2.onrender.com/api/auth/login";

      const payload = isRegistering
        ? { name, email, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Success! Pass the user data up and close modal
      onLoginSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row min-h-[480px]">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 p-1.5 rounded-full hover:bg-gray-100 transition z-10"
        >
          <X size={22} />
        </button>

        {/* 1. Left Column (Flipkart Signature Blue Banner) */}
        <div className="bg-[#2874f0] text-white p-8 md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-3">
              {isRegistering ? "Looks like you're new here!" : "Login"}
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              {isRegistering
                ? "Sign up with your details to get started"
                : "Get access to your Orders, Wishlist and Recommendations"}
            </p>
          </div>

          <div className="hidden md:block text-center opacity-90 my-auto">
            <span className="text-6xl">🛍️</span>
          </div>

          <div className="text-xs text-blue-200">Flipkart Secure Login 🔒</div>
        </div>

        {/* 2. Right Column (Form Input Area) */}
        <div className="p-8 md:w-3/5 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Banner */}
            {error && (
              <div className="bg-red-50 text-red-600 text-xs p-2.5 rounded border border-red-200 font-medium">
                {error}
              </div>
            )}

            {/* Name Input (Only shown when registering) */}
            {isRegistering && (
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-sm border-b border-gray-300 focus:border-[#2874f0] outline-none py-1.5 px-1 transition"
                  />
                  <User size={16} className="text-gray-400 absolute right-1" />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full text-sm border-b border-gray-300 focus:border-[#2874f0] outline-none py-1.5 px-1 transition"
                />
                <Mail size={16} className="text-gray-400 absolute right-1" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password (min 6 characters)"
                  className="w-full text-sm border-b border-gray-300 focus:border-[#2874f0] outline-none py-1.5 px-1 transition"
                />
                <Lock size={16} className="text-gray-400 absolute right-1" />
              </div>
            </div>

            <p className="text-[11px] text-gray-500 pt-2">
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fb641b] hover:bg-[#e85a14] text-white font-bold py-2.5 rounded-sm text-sm uppercase shadow transition disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : isRegistering
                  ? "Continue"
                  : "Login"}
            </button>
          </form>

          {/* Toggle between Login and Register Mode */}
          <div className="pt-4 text-center border-t border-gray-100 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError("");
              }}
              className="text-[#2874f0] hover:underline font-semibold text-xs"
            >
              {isRegistering
                ? "Existing User? Log in"
                : "New to Flipkart? Create an account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
