import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModel";
import CartPage from "./components/CartPage"; // 1. Import CartPage

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  //  2. Cart State & Page Navigation State!
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fetch products from Express API
  const fetchProducts = async (category = "", search = "") => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/products";
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (search) params.append("search", search);

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

  useEffect(() => {
    fetchProducts(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  const handleSearch = (term) => {
    setShowCart(false); // Return to home grid when searching
    setSelectedCategory("");
    setSearchQuery(term);
  };

  //  3. CART HANDLER FUNCTIONS:

  // Add Item to Cart
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

  // Increase or Decrease Quantity (+ and -)
  const handleUpdateQuantity = (productId, delta) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item._id === productId) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean), // Automatically removes items if quantity reaches 0!
    );
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Calculate total items count for the Navbar badge
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f1f2f4]">
      {/* 1. Navbar showing live cart badge and click handler */}
      <Navbar
        onSearch={handleSearch}
        cartCount={totalCartCount}
        onOpenCart={() => setShowCart(true)}
      />

      {/* 2. Show Cart View OR Home Product Catalog */}
      {showCart ? (
        /* CART PAGE */
        <CartPage
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onContinueShopping={() => setShowCart(false)}
        />
      ) : (
        /* HOME SHOPPING PAGE */
        <>
          <CategoryBar
            onSelectCategory={(cat) => {
              setSearchQuery("");
              setSelectedCategory(cat === selectedCategory ? "" : cat);
            }}
          />

          <main className="max-w-7xl mx-auto px-4 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {searchQuery
                  ? `Search results for "${searchQuery}" (${products.length})`
                  : selectedCategory
                    ? `${selectedCategory} Deals (${products.length})`
                    : "Best Deals for You"}
              </h2>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setSearchQuery("");
                  }}
                  className="text-xs text-[#2874f0] font-semibold hover:underline"
                >
                  Clear All Filters
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
                  No products found matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            )}
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
    </div>
  );
}

export default App;
