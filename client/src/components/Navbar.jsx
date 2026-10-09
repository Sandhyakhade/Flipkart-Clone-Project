import React, { useState } from "react";
import { Search, ShoppingCart, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // We will connect this to our backend search API!
    }
  };

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* 1. Flipkart Logo */}
        <div className="flex flex-col cursor-pointer">
          <span className="text-xl font-bold italic tracking-wide">
            Flipkart
          </span>
          <div className="flex items-center text-[11px] italic -mt-1 text-gray-200">
            <span>Explore</span>
            <span className="text-[#ffe500] font-semibold ml-1">Plus</span>
            <span className="text-[#ffe500] text-xs ml-0.5">✦</span>
          </div>
        </div>

        {/* 2. Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl relative flex items-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full bg-white text-gray-800 text-sm px-4 py-2 pr-10 rounded-sm shadow-sm focus:outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            className="absolute right-3 text-[#2874f0] hover:text-blue-700 transition"
          >
            <Search size={19} />
          </button>
        </form>

        {/* 3. Navigation Links & Buttons */}
        <div className="flex items-center gap-6 font-medium text-sm">
          {/* Login Button */}
          <button className="bg-white text-[#2874f0] px-8 py-1 font-semibold rounded-sm shadow-sm hover:bg-gray-50 transition">
            Login
          </button>

          {/* Become a Seller */}
          <span className="hidden md:inline cursor-pointer hover:text-gray-200 transition">
            Become a Seller
          </span>

          {/* More Options */}
          <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
            <span>More</span>
            <ChevronDown size={15} />
          </div>

          {/* Cart with Badge */}
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition">
            <div className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </div>
            <span className="hidden sm:inline font-semibold">Cart</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
