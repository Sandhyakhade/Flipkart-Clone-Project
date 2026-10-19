import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

/**
 * FilterSidebar — lets users filter products by price range and sort order.
 * Uses local state while user is selecting, and only pushes to parent on "Apply".
 * This prevents an API call on every single keystroke.
 */
const FilterSidebar = ({ currentFilters, onApplyFilters, onClearFilters }) => {
  const [minPrice, setMinPrice] = useState(currentFilters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice || "");
  const [sortBy, setSortBy] = useState(currentFilters.sort || "");

  const sortOptions = [
    { label: "Relevance (Default)", value: "" },
    { label: "Price: Low to High", value: "price_low" },
    { label: "Price: High to Low", value: "price_high" },
    { label: "Top Rated First", value: "rating" },
  ];

  const pricePresets = [
    { label: "Under ₹500",       min: "",      max: "500" },
    { label: "₹500 – ₹2,000",   min: "500",   max: "2000" },
    { label: "₹2,000 – ₹10,000",min: "2000",  max: "10000" },
    { label: "Above ₹10,000",   min: "10000", max: "" },
  ];

  const handleApply = () => {
    onApplyFilters({ minPrice, maxPrice, sort: sortBy });
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
    onClearFilters();
  };

  const hasActiveFilter = minPrice || maxPrice || sortBy;

  return (
    <aside className="w-64 shrink-0 bg-white rounded-sm shadow-sm h-fit sticky top-20">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <SlidersHorizontal size={16} className="text-[#2874f0]" />
          <span>Filters</span>
        </div>
        {hasActiveFilter && (
          <button
            onClick={handleClear}
            className="text-xs text-[#2874f0] font-semibold flex items-center gap-1 hover:underline"
          >
            <X size={12} /> Clear All
          </button>
        )}
      </div>

      <div className="p-4 space-y-6">

        {/* Sort By */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sort By</h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="accent-[#2874f0]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#2874f0] transition">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Range</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 mb-1 block">Min (₹)</label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[#2874f0]"
              />
            </div>
            <span className="text-gray-400 mt-4">—</span>
            <div className="flex-1">
              <label className="text-[10px] text-gray-400 mb-1 block">Max (₹)</label>
              <input
                type="number"
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[#2874f0]"
              />
            </div>
          </div>

          {/* Quick-select price presets */}
          <div className="mt-3 space-y-1.5">
            <p className="text-[10px] text-gray-400 uppercase font-semibold">Quick Select</p>
            {pricePresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => { setMinPrice(preset.min); setMaxPrice(preset.max); }}
                className={`w-full text-left text-xs px-2 py-1.5 rounded border transition ${
                  minPrice === preset.min && maxPrice === preset.max
                    ? "border-[#2874f0] bg-blue-50 text-[#2874f0] font-semibold"
                    : "border-gray-100 text-gray-600 hover:border-[#2874f0] hover:text-[#2874f0]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-[#2874f0] text-white py-2 rounded text-sm font-bold hover:bg-blue-700 transition shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
