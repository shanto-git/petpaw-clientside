import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // react-router-dom নিশ্চিত করুন
import Swal from "sweetalert2";

const UpdateListing = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const navigate = useNavigate();
  const baseUrl = "https://backend10-phi.vercel.app";

  useEffect(() => {
    if (id) {
      axios
        .get(`${baseUrl}/listing/${id}`)
        .then((res) => {
          setListing(res.data);
        })
        .catch((err) => {
          console.error("Data fetch error:", err);
        });
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.name.value,
      category: form.category.value,
      price: parseInt(form.price.value),
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: user?.email,
    };

    axios
      .put(`${baseUrl}/listing/${id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Listing Updated Successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          navigate("/dashboard/my-listings");
        }
      })
      .catch((err) => console.error(err));
  };

  if (!listing._id) {
    return (
      <div className="text-center mt-10">
        <p>Loading Data...</p>
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Update Listing</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="font-semibold">Product / Pet Name</label>
          <input
            defaultValue={listing?.name}
            type="text"
            name="name"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Category</label>
          <select
            defaultValue={listing?.category}
            className="select select-bordered w-full"
            name="category"
            required
          >
            <option value="Pets">Pets</option>
            <option value="Food">Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Care Products">Care Products</option>
          </select>
        </div>
        <div>
          <label className="font-semibold">Price</label>
          <input
            defaultValue={listing?.price}
            type="number"
            name="price"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Location</label>
          <input
            defaultValue={listing?.location}
            type="text"
            name="location"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={listing?.description}
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <div>
          <label className="font-semibold">Image URL</label>
          <input
            defaultValue={listing?.image}
            type="text"
            name="image"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Pick Up Date</label>
          <input
            defaultValue={listing?.date}
            type="date"
            name="date"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="font-semibold">Your Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <button className="btn btn-secondary w-full text-white mt-4">
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default UpdateListing;
