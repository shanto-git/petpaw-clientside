import React from "react";
import { Link } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { FaHome } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">PawMart</h2>
        </div>
        <p className="max-w-sm text-gray-400">
          PawMart connects local pet owners and buyers for adoption and pet care products.
        </p>
        <div className="flex flex-col items-center md:flex-row gap-4">
          <Link to="/" className="hover:text-white"><FaHome /></Link>
          <Link to="/contact" className="hover:text-white"><IoCall /></Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
