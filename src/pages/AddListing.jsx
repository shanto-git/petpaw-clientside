import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
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
    };
    console.log(formData);
    axios.post('http://localhost:3000/listing', formData)
    .then(res=>{
        console.log(res)
    })
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Product / Pet Name</label>
          <input
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
            className="select select-bordered w-full"
            name="category"
            required
            onChange={(e) => setCategory(e.target.value)}
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
            type="number"
            name="price"
            required
            min="0"
            value={category === "Pets" ? 0 : undefined}
            readOnly={category === "Pets"}
            className="input input-bordered w-full"
            placeholder={
              category === "Pets" ? "Pets price is always 0" : "Enter price"
            }
          />
        </div>
        <div>
          <label className="font-semibold">Location</label>
          <input
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
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
