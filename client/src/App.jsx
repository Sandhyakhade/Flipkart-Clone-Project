import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to fetch products from our Express Backend API!
  const fetchProducts = async (category = "") => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/products";
      if (category) {
        url += `?category=${category}`;
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

  // Fetch products on initial page load
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f1f2f4]">
      {/* 1. Flipkart Navbar */}
      <Navbar />

      {/* 2. Category Navigation Bar */}
      <CategoryBar
        onSelectCategory={(cat) =>
          setSelectedCategory(cat === selectedCategory ? "" : cat)
        }
      />

      {/* 3. Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            {selectedCategory
              ? `${selectedCategory} Deals`
              : "Best Deals for You"}
          </h2>
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory("")}
              className="text-xs text-[#2874f0] font-semibold hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2874f0]"></div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
