import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import BannerCarousel from "./components/BannerCarousel";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModel";
import CartPage from "./components/CartPage";
import LoginModal from "./components/LoginModal";
import CheckoutModal from "./components/CheckoutModal";
import OrdersPage from "./components/OrdersPage";
import ProfilePage from "./components/ProfilePage";
import FilterSidebar from "./components/FilterSidebar";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // filters holds minPrice, maxPrice, sort — all in one object
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", sort: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart & Modals
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  //  NAVIGATION VIEW: 'home', 'cart', 'orders', 'profile'
  const [currentView, setCurrentView] = useState("home");

  // Auth State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const fetchProducts = async (category = "", search = "", activeFilters = {}) => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/products";
      const params = new URLSearchParams();

      // Append all params — URLSearchParams ignores empty strings
      if (category) params.append("category", category);
      if (search) params.append("search", search);
      if (activeFilters.minPrice) params.append("minPrice", activeFilters.minPrice);
      if (activeFilters.maxPrice) params.append("maxPrice", activeFilters.maxPrice);
      if (activeFilters.sort) params.append("sort", activeFilters.sort);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever category, search, OR filters change
  useEffect(() => {
    fetchProducts(selectedCategory, searchQuery, filters);
  }, [selectedCategory, searchQuery, filters]);

  const handleSearch = (term) => {
    setCurrentView("home");
    setSelectedCategory("");
    setSearchQuery(term);
  };

  // Cart Functions
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === productToAdd._id,
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item._id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Auth Functions
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCurrentView("home");
  };

  return (
    <div className="min-h-screen bg-[#f1f2f4]">
      {/* 1. Navbar */}
      <Navbar
        onSearch={handleSearch}
        cartCount={totalCartCount}
        onOpenCart={() => setCurrentView("cart")}
        user={user}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onOpenOrders={() => setCurrentView("orders")}
        onOpenProfile={() => setCurrentView("profile")}
      />

      {/* 2. Dynamic View Rendering */}
      {currentView === "cart" ? (
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onContinueShopping={() => setCurrentView("home")}
          onStartCheckout={() => {
            if (!user) {
              setShowLoginModal(true);
            } else {
              setShowCheckout(true);
            }
          }}
        />
      ) : currentView === "orders" ? (
        <OrdersPage
          user={user}
          onContinueShopping={() => setCurrentView("home")}
        />
      ) : currentView === "profile" ? (
        <ProfilePage
          user={user}
          onContinueShopping={() => setCurrentView("home")}
        />
      ) : (
        <>
          <CategoryBar
            onSelectCategory={(cat) => {
              setSearchQuery("");
              setSelectedCategory(cat === selectedCategory ? "" : cat);
            }}
          />

          {!searchQuery && !selectedCategory && <BannerCarousel />}

          {/* Main content area: Sidebar on left, Products on right */}
          <main className="max-w-7xl mx-auto px-4 pb-8">
            <div className="flex gap-4 mt-4">

              {/* LEFT: Filter Sidebar */}
              <FilterSidebar
                currentFilters={filters}
                onApplyFilters={(newFilters) => setFilters(newFilters)}
                onClearFilters={() => setFilters({ minPrice: "", maxPrice: "", sort: "" })}
              />

              {/* RIGHT: Products Section */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {searchQuery
                      ? `Search results for "${searchQuery}" (${products.length})`
                      : selectedCategory
                        ? `${selectedCategory} Deals (${products.length})`
                        : `Best Deals for You (${products.length})`}
                  </h2>
                  {(selectedCategory || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory("");
                        setSearchQuery("");
                      }}
                      className="text-xs text-[#2874f0] font-semibold hover:underline"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2874f0]"></div>
                  </div>
                ) : products.length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-sm shadow-sm">
                    <p className="text-gray-500 text-base">
                      No products found for the selected filters.
                    </p>
                    <button
                      onClick={() => setFilters({ minPrice: "", maxPrice: "", sort: "" })}
                      className="mt-3 text-sm text-[#2874f0] font-semibold hover:underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      )}

      {/* 3. Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 4. Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 5. Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          cart={cart}
          totalAmount={cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          )}
          user={user}
          onClose={() => setShowCheckout(false)}
          onOrderSuccess={() => {
            setCart([]);
            setCurrentView("orders");
          }}
        />
      )}
    </div>
  );
}

export default App;
