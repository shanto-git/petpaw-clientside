import React from "react";
import { FaDog, FaBone, FaShoppingBag, FaMedkit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Pets", icon: <FaDog size={30} />, bg: "bg-yellow-200" },
  { name: "Food", icon: <FaBone size={30} />, bg: "bg-green-200" },
  { name: "Accessories", icon: <FaShoppingBag size={30} />, bg: "bg-pink-200" },
  { name: "Care Products", icon: <FaMedkit size={30} />, bg: "bg-blue-200" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl underline md:text-3xl font-bold text-center mb-6">
        Explore Categories
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {categories.map((cat, id) => (
          <div
            key={id}
            onClick={() => handleCategoryClick(cat.name)}
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md hover:shadow-xl hover:bg-white transition cursor-pointer ${cat.bg}`}
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
