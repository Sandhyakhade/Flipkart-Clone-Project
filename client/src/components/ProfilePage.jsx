import React from "react";
import { User, Mail, Shield, ArrowLeft, Calendar } from "lucide-react";

const ProfilePage = ({ user, onContinueShopping }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back to Shopping Header */}
      <button
        onClick={onContinueShopping}
        className="flex items-center gap-2 text-sm text-[#2874f0] font-semibold hover:underline mb-6"
      >
        <ArrowLeft size={16} /> Back to Shopping
      </button>

      <div className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
        {/* Profile Header Banner */}
        <div className="bg-gradient-to-r from-[#2874f0] to-blue-600 p-8 text-white flex items-center gap-5">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/50 text-3xl font-bold uppercase">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold capitalize">{user?.name}</h1>
            <p className="text-sm text-blue-100 mt-0.5">{user?.email}</p>
            <span className="inline-block mt-2 bg-white/20 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider">
              {user?.role || "Customer"}
            </span>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="p-8 space-y-6">
          <h2 className="text-base font-bold text-gray-800 uppercase tracking-wide border-b border-gray-100 pb-2">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded border border-gray-100 flex items-start gap-3.5">
              <User size={20} className="text-[#2874f0] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-gray-500 block">
                  Full Name
                </span>
                <span className="text-sm font-bold text-gray-800 capitalize">
                  {user?.name}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-100 flex items-start gap-3.5">
              <Mail size={20} className="text-[#2874f0] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-gray-500 block">
                  Email Address
                </span>
                <span className="text-sm font-bold text-gray-800">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-100 flex items-start gap-3.5">
              <Shield size={20} className="text-[#2874f0] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-gray-500 block">
                  Account Security
                </span>
                <span className="text-sm font-bold text-gray-800">
                  Password Encrypted & Protected 🔒
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-100 flex items-start gap-3.5">
              <Calendar size={20} className="text-[#2874f0] mt-0.5 shrink-0" />
              <div>
                <span className="text-xs font-semibold text-gray-500 block">
                  Member Status
                </span>
                <span className="text-sm font-bold text-green-700">
                  Active Flipkart Plus Member ⭐
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
