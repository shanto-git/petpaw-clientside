import React from "react";
import { Link } from "react-router-dom";
import errImg from "../../assets/error.jpg"

const NotFound = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center">
        <div className="w-6/12 flex flex-col items-center justify-center p-6 text-center">

      <img src={errImg} alt="" />
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        Go Back Home
      </Link>
  </div>
    </div>
  );
};

export default NotFound;
