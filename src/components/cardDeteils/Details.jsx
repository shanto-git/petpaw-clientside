import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/listing/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching listing:", error);
        setLoading(false);
      });
  }, [id]);

  // ✅ FIXED — Handle Order
  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      buyerName: user?.displayName,
      email: user?.email,
      listingId: listing._id,
      listingName: listing.name,
      quantity: form.quantity ? parseInt(form.quantity.value) : 1,
      price: listing.price,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
    };

    axios
      .post("http://localhost:3000/orders", formData)
      .then((res) => {
        toast.success("Order placed successfully!");
        setIsModalOpen(false);
      })
      .catch((err) => console.log(err));
  };

  if (loading)
    return <p className="text-center py-10 text-lg">Loading...</p>;

  if (!listing)
    return <p className="text-center py-10 text-red-500">Listing not found.</p>;

  return (
    <div className="p-5">
      <div className="flex justify-start items-center gap-5 mx-auto bg-white">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-72 h-72 object-cover rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{listing.name}</h1>

          <div className="flex justify-between items-center">
            <p className="mt-2 font-semibold">
              {listing.category == "Pets" ? "Free for Adoption" : `Price: $${listing.price}`}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Category:</span> {listing.category}
            </p>
          </div>

          <div className="flex justify-between items-center gap-10">
            <p className="mt-1">
              <span className="font-semibold">Owner Email:</span> {listing.email}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Location:</span> {listing.location}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-secondary mt-6 w-full"
          >
            {listing.category === "Pets" ? "Adopt" : "Order Now"}
          </button>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
              <h2 className="text-2xl text-center font-bold mb-3">Place Your Order</h2>

              <form onSubmit={handleOrder} className="space-y-3">
                <input
                  type="text"
                  name="buyerName"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />

                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />

                <input
                  type="text"
                  name="listingId"
                  value={listing._id}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />

                <input
                  type="text"
                  name="listingName"
                  value={listing.name}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />

                {listing.category !== "Pets" && (
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={1}
                    className="input input-bordered w-full"
                  />
                )}

                <input
                  type="text"
                  name="price"
                  value={listing.price}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />

                <input
                  type="text"
                  name="address"
                  required
                  className="input input-bordered w-full"
                  placeholder="Address"
                />

                <input
                  type="date"
                  name="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="input input-bordered w-full"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  className="input input-bordered w-full"
                  placeholder="Phone Number"
                />

                <textarea
                  name="notes"
                  className="textarea textarea-bordered w-full"
                  placeholder="Additional Notes"
                ></textarea>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-secondary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-700">
        <span className="font-semibold underline block mb-1">Description:</span>
        {listing.description}
      </p>
    </div>
  );
};

export default Details;
