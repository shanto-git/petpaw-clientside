import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const UpdateListing = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [listing, setListing] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://backend10-phi.vercel.app/listing/${id}`).then((res) => {
      console.log(res);
      setListing(res.data);
    });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = parseInt(form.price.value);
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.value;
    const date = form.date.value;
    const email = form.email.value;

    const formData = {
      name,
      category,
      price,
      location,
      description,
      image,
      date,
      email,
      createdAt: listing?.createdAt,
    };
    console.log(formData);
    axios
      .put(`https://backend10-phi.vercel.app/update/${id}`, formData)
      .then((res) => {
        console.log(res);
        navigate("/my-listings");
      });
  };
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
            placeholder="Enter product or pet name"
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
            <option value="">Select Category</option>
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
            min="0"
            className="input input-bordered w-full"
            placeholder={"Enter price"}
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
            placeholder="Enter location"
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            required
            className="textarea textarea-bordered w-full"
            placeholder="Write a short description..."
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
            placeholder="https://example.com/image.jpg"
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
            name="email"
            readOnly
            value={user?.email}
            className="input input-bordered w-full bg-gray-100"
          />
        </div>
        <button className="btn btn-secondary w-full text-white mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateListing;
