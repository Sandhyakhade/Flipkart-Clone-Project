import React from "react";

const categories = [
  {
    name: "Mobiles",
    img: "https://rukminim2.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100",
  },
  {
    name: "Electronics",
    img: "https://rukminim2.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100",
  },
  {
    name: "Fashion",
    img: "https://rukminim2.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100",
  },
  {
    name: "Home",
    img: "https://rukminim2.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100",
  },
  {
    name: "Appliances",
    img: "https://rukminim2.flixcart.com/flap/128/128/image/0ff236d1f404c66d.png?q=100",
  },
  {
    name: "Beauty",
    img: "https://rukminim2.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100",
  },
];

const CategoryBar = ({ onSelectCategory }) => {
  return (
    <div className="bg-white shadow-sm mb-4">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between overflow-x-auto gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className="flex flex-col items-center cursor-pointer group min-w-[70px]"
          >
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden mb-1">
              <img
                src={cat.img}
                alt={cat.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-200"
              />
            </div>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-[#2874f0] transition">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
