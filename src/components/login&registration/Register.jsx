import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2"; // মিষ্টি অ্যালার্ট এর জন্য (যদি ইনস্টল করা থাকে)

const Register = () => {
  const { createUser, signInWithGoogle, loading, setLoading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (!minLength.test(password)) return "Password must be at least 6 characters.";
    if (!uppercase.test(password)) return "Password must contain at least 1 uppercase letter.";
    if (!lowercase.test(password)) return "Password must contain at least 1 lowercase letter.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setLoading(true);
      
      await createUser(
        email, 
        password, 
        name, 
        photoURL || "https://i.ibb.co/placeholder.png", 
        "buyer"
      );

      setLoading(false);
      navigate("/");
      
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Registration Error:", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-secondary">Create Account</h2>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-secondary outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              placeholder="https://example.com/photo.jpg"
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-secondary outline-none"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-secondary outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border p-3 rounded-lg mt-1 focus:ring-2 focus:ring-secondary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`btn btn-secondary w-full mt-6 font-bold`}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-secondary font-bold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;