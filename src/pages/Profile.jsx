import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaBackspace } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";


const UserProfile = () => {
  const { user, setUser, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setLoading(true);

    updateProfile(user, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL: photo });
        toast.success("Profile Updated", {
          position: "top-center",
          autoClose: 5000,
          style: { color: "green", backgroundColor: "white", fontWeight: "bold" },
        });;
        setEditing(false);
      })
      .catch((error) => {
        toast.error("Failed to update profile: "+error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // redirect home
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="max-w-lg mx-auto p-6 my-20 shadow-lg rounded-2xl">
      <Toaster position="top-center" />
      <div className="flex justify-between">
        <button onClick={() => navigate(-1)} className="btn btn-dash btn-accent mb-4 hover:underline">
        <FaBackspace /> Back
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>
        <button
          onClick={handleLogout}
          className="btn btn-dash btn-error mb-4 hover:underline"
        >
          LogOut<TbLogout />
        </button>

      </div>
      {!editing ? (
        <div className="text-center space-y-4">
          <img
            src={user?.photoURL || "https://img.icons8.com/?size=100&id=gZmAnbNhG4iO&format=png&color=000000"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto shadow-lg border-2"
          />
          <h3 className="text-xl font-semibold">{user?.displayName || "No Name Set"}</h3>
          <p className="text-gray-600">{user?.email}</p>

          <button
            onClick={() => setEditing(true)}
            className="btn btn-secondary mt-4 px-6"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="label font-semibold">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-semibold">Profile Image URL</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`btn btn-success ${loading && "loading"}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-error"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserProfile;