import React, { useState } from "react";
import { Search, ShoppingCart, ChevronDown, User, LogOut, Package, Heart } from "lucide-react";


const Navbar = ({
  onSearch,
  cartCount = 0,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  user,
  onOpenLogin,
  onLogout,
  onOpenOrders,
  onOpenProfile,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="bg-[#2874f0] text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Flipkart Logo */}
        <div
          onClick={() => {
            setSearchTerm("");
            onSearch("");
          }}
          className="flex flex-col cursor-pointer"
        >
          <span className="text-xl font-bold italic tracking-wide">
            Flipkart
          </span>
          <div className="flex items-center text-[11px] italic -mt-1 text-gray-200">
            <span>Explore</span>
            <span className="text-[#ffe500] font-semibold ml-1">Plus</span>
            <span className="text-[#ffe500] text-xs ml-0.5">✦</span>
          </div>
        </div>

        {/* Search Bar Form */}
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

        {/* Actions Section */}
        <div className="flex items-center gap-6 font-medium text-sm">
          {/* USER AUTH BUTTON: Show 'Login' button OR User Dropdown */}
          {user ? (
            /* Logged-In User Profile Pill */
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 font-bold hover:text-gray-200 transition capitalize"
              >
                <User size={16} />
                <span>{user.name}</span>
                <ChevronDown size={14} />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-sm shadow-xl border border-gray-100 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 text-xs">
                    <p className="text-gray-500">Signed in as</p>
                    <p className="font-bold truncate">{user.email}</p>
                  </div>

                  {/* 1. My Profile Link */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenProfile();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition"
                  >
                    <User size={14} /> My Profile
                  </button>

                  {/* 2. Orders Link */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenOrders();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition"
                  >
                    <Package size={14} /> Orders
                  </button>

                  {/* 3. Logout */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold hover:bg-gray-50 flex items-center gap-2 text-red-600 border-t border-gray-100 transition"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-Out State: White Login Button */
            <button
              onClick={onOpenLogin}
              className="bg-white text-[#2874f0] px-8 py-1 font-semibold rounded-sm shadow-sm hover:bg-gray-50 transition"
            >
              Login
            </button>
          )}

          <span className="hidden md:inline cursor-pointer hover:text-gray-200 transition">
            Become a Seller
          </span>

          <div className="hidden md:flex items-center gap-1 cursor-pointer hover:text-gray-200 transition">
            <span>More</span>
            <ChevronDown size={15} />
          </div>

          {/* Wishlist Icon */}
          <div
            onClick={onOpenWishlist}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition"
          >
            <div className="relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline font-semibold">Wishlist</span>
          </div>

          {/* Cart Icon with Live Count */}
          <div
            onClick={onOpenCart}
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition"
          >
            <div className="relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
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
