
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { IoIosPaw } from "react-icons/io";

const Navbar = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName]= useState(false);


  const handleProfile = ()=>
    navigate("/profile");
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
      tabIndex={-1}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
    >
      <li>
        <Link
          to="/"
          className={({ isActive }) => (isActive ? "underline" : "hover:btn")}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/pets"
          className={({ isActive }) => (isActive ? "underline" : "hover:btn")}
        >
          Pets & Supplies
        </Link>
      </li>

      {/* Only Visible After Login */}
      {user && (
        <>
          <li>
            <Link
              to="/add-listing"
              className={({ isActive }) => (isActive ? "underline" : "hover:btn")}
            >
              Add Listing
            </Link>
          </li>
          <li>
            <Link
              to="/my-listings"
              className={({ isActive }) => (isActive ? "underline" : "hover:btn")}
            >
              My Listings
            </Link>
          </li>
          <li>
            <Link
              to="/my-orders"
              className={({ isActive }) => (isActive ? "underline" : "hover:btn")}
            >
              My Orders
            </Link>
          </li>
        </>
      )}
    </ul>
          </div>
          <a className="flex text-xl font-bold gap-0"><span className="text-red-600">Paw</span>Mart<IoIosPaw style={{transform: "rotate(45deg"}} /></a>
        </div>
        <div className="navbar-center hidden lg:flex gap-5">
      <ul className="menu menu-horizontal px-1 gap-5">
        <li>
          <Link
            to="/"
            className={({ isActive }) => (!isActive ? "active:underline" : "hover:bg-gray-400")}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/pets"
            className={({ isActive }) => (isActive ? "active:underline" : "hover:bg-gray-400")}
          >
            Pets & Supplies
          </Link>
        </li>

        {/* Only Visible After Login */}
        {user && (
          <>
            <li>
              <Link
                to="/add-listing"
                className={({ isActive }) => (isActive ? "underline" : "hover:bg-gray-400")}
              >
                Add Listing
              </Link>
            </li>
            <li>
              <Link
                to="/my-listings"
                className={({ isActive }) => (isActive ? "underline" : "hover:bg-gray-400")}
              >
                My Listings
              </Link>
            </li>
            <li>
              <Link
                to="/my-orders"
                className={({ isActive }) => (isActive ? "underline" : "hover:bg-gray-400")}
              >
                My Orders
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
        <div className="navbar-end">
          {
            !user ? (
              <Link to="/chooseLogin" className="btn btn-soft btn-secondary font-bold hover:btn-secondary hover:text-white">Login</Link>
            ):
            (
              <div
          className="relative cursor-pointer"
          onMouseEnter={() => setUserName(true)}
          onMouseLeave={() => setUserName(false)}
          onClick={handleProfile}
        >
          <img
            src={user.photoURL || "https://i.ibb.co/placeholder.png"}
            alt={user.displayName || "User"}
            className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
          />
          {userName && (
            <span className="tooltip tooltip-left">
              {user.displayName || "User"}
            </span>
          )}
        </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
