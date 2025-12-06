import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, updateUser, signInWithGoogle, loading, setLoading } =
    useContext(AuthContext);
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

    if (!minLength.test(password)) {
      return "Password must be at least 6 characters.";
    }
    if (!uppercase.test(password)) {
      return "Password must contain at least 1 uppercase letter.";
    }
    if (!lowercase.test(password)) {
      return "Password must contain at least 1 lowercase letter.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validate fields
    if (!name || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      setLoading(true);
      const result = await createUser(email, password);

      // Update user profile
      await updateUser({
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/placeholder.png",
      });

      setLoading(false);
      navigate("/"); // redirect after registration
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Photo URL</label>
          <input
            type="text"
            placeholder="Place your photo"
            className="w-full border p-2 rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Type your password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login here</Link> </p>
        </div>
        <button
          type="submit"
          className="btn btn-block btn-outline btn-secondary font-bold hover:text-white"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-block my-2"
        >
         <FcGoogle /> Register with Google
        </button>
      </form>
    </div>
  );    
};

export default Register;
