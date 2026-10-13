import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Big Billion Days",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
    tag: "Biggest Sale of the Year",
  },
  {
    id: 2,
    title: "Latest Flagship Smartphones",
    img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=1600&q=80",
    tag: "Up to 40% Off on Top Brands",
  },
  {
    id: 3,
    title: "Electronics & Gadgets",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80",
    tag: "Noise Cancelling Headphones & Laptops",
  },
  {
    id: 4,
    title: "Top Fashion Trends",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
    tag: "Min 50% Off on Premium Brands",
  },
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Next Slide Function (Loops to 0 after last slide)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  // Prev Slide Function (Loops to end if at 0)
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length,
    );
  };

  // Auto-slide Timer using useEffect with Cleanup
  useEffect(() => {
    if (isPaused) return; // Don't auto-slide if user is hovering!

    const timer = setInterval(() => {
      nextSlide();
    }, 3500); // Advances every 3.5 seconds

    // 👈 CLEANUP: Destroys timer before starting next one!
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div
      className="max-w-7xl mx-auto px-4 mb-6"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      <div className="relative h-44 sm:h-64 md:h-80 w-full overflow-hidden rounded-sm shadow-sm group">
        {/* Banner Images Track */}
        <div
          className="flex transition-transform duration-500 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full h-full shrink-0 relative">
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Subtle Gradient Overlay with Offer Tag */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="bg-[#ffe500] text-gray-900 text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                    {banner.tag}
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl font-bold mt-1 drop-shadow-md">
                    {banner.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-r-sm shadow-md opacity-0 group-hover:opacity-100 transition duration-200 z-10"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-l-sm shadow-md opacity-0 group-hover:opacity-100 transition duration-200 z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot Indicators at the bottom */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
