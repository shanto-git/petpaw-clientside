import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiGmail } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";

const MultiLogin = ({ onClose }) => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useContext(AuthContext);

  const handleClose = () => {
    if (onClose) onClose();
    navigate("/");
  };

  const handleWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        // console.log(user);

        if (onClose) onClose();
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg relative shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        <h3 className="font-bold text-lg text-center mb-4">
          Please Login First
        </h3>

        <div className="flex flex-col justify-center gap-3">
          <NavLink
            to="/login"
            onClick={onClose}
            className="btn bg-white text-black border border-[#e5e5e5] hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <SiGmail />
            Login with Email
          </NavLink>

          <button
            onClick={handleWithGoogle}
            className="btn bg-white text-black border border-[#e5e5e5] hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <FcGoogle />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiLogin;
