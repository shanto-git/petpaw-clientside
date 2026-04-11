import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { IoIosMoon, IoIosPaw } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { WiDaySunny, WiMoonAltWaningCrescent6 } from "react-icons/wi";

const Navbar = () => {
  const { user, role, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [theme, setTheme] = useState("light");

  const handleProfile = () => navigate("/dashboard/profile");

  // Close search input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.querySelector("html").setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.querySelector("html").setAttribute("data-theme", saved);
  }, []);

  // Role checking logic
  const isAdmin = role === "admin";
  const isSeller = role === "seller";
  const isBuyer = role === "buyer";

  // Shared Nav Links logic
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/pets">Pets & Supplies</NavLink>
      </li>
      {user && isBuyer && (
        <li>
          <NavLink to="/dashboard/my-orders">My Orders</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm px-2 md:px-10">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex text-xl font-bold gap-0">
            <span className="text-red-600">Paw</span>Mart
            <IoIosPaw style={{ transform: "rotate(45deg)" }} />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-3">
          {/* <button onClick={toggleTheme} className="text-2xl ml-2">
            {theme === "light" ? <WiMoonAltWaningCrescent6 /> : <WiDaySunny />}
          </button> */}

          {!user ? (
            <Link
              to="/chooseLogin"
              className="btn btn-secondary btn-sm md:btn-md text-white"
            >
              Login
            </Link>
          ) : (
            <div className="flex gap-4 items-center">
              <div
                ref={wrapperRef}
                className="relative flex items-center"
              ></div>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-10 rounded-full border-2 border-gray-400">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/placeholder.png"}
                      alt="profile"
                    />
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 gap-2"
                >
                  <div className="px-4 py-2 font-bold text-center">
                    {user?.displayName}
                  </div>
                    <Link to="/dashboard/profile">
                  <li className="w-full btn btn-secondary btn-dash">
                    View Profile
                  </li>
                    </Link>
                  <li>
                    <button
                      onClick={logOut}
                      className="btn btn-error btn-dash font-bold"
                    >
                      Logout
                    </button>
                  </li>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
