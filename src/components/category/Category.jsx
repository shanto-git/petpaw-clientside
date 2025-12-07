import React from "react";
import { FaDog, FaBone, FaShoppingBag, FaMedkit } from "react-icons/fa";

const categories = [
  {
    name: "Pets (Adoption)",
    icon: <FaDog size={30} />,
    bg: "bg-yellow-200",
  },
  {
    name: "Pet Food",
    icon: <FaBone size={30} />,
    bg: "bg-green-200",
  },
  {
    name: "Accessories",
    icon: <FaShoppingBag size={30} />,
    bg: "bg-pink-200",
  },
  {
    name: "Pet Care Products",
    icon: <FaMedkit size={30} />,
    bg: "bg-blue-200",
  },
];

const Category = () => {
  return (
    <div className="py-10 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Explore Categories
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer ${cat.bg}`}
          >
            <div className="mb-3">{cat.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
