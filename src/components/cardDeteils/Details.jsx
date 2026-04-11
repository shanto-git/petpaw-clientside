import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://backend10-phi.vercel.app/listing/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setListing(data);
        setLoading(false);
      });
  }, [id]);

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

    axios.post("https://backend10-phi.vercel.app/orders", formData).then(() => {
      Swal.fire({
        icon: "success",
        title: "Order Successful",
      });
      setIsModalOpen(false);
    });
  };

  if (loading)
    return (
      <div className="flex flex-col items-center py-10">
        <p>Loading...</p>
        <progress className="progress w-56"></progress>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* IMAGE */}
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full lg:w-1/3 h-64 lg:h-80 object-cover rounded-lg order-1"
        />

        {/* INFO */}
        <div className="flex-1 order-2">
          <h1 className="text-2xl lg:text-3xl font-bold">{listing.name}</h1>

          <div className="flex justify-between mt-3 gap-2">
            <p className="font-semibold">
              {listing.category === "Pets"
                ? "Free for Adoption"
                : `Price: $${listing.price}`}
            </p>

            <p>
              <span className="font-semibold">Category:</span>{" "}
              {listing.category}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-2">
            <p>
              <span className="font-semibold">Owner Email:</span>{" "}
              {listing.email}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {listing.location}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-secondary mt-6 w-full sm:w-auto"
          >
            {listing.category === "Pets" ? "Adopt" : "Order Now"}
          </button>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <span className="font-semibold underline block mb-2">Description:</span>
        <p>{listing.description}</p>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white w-full max-w-md rounded-lg p-5">
            <h2 className="text-xl font-bold text-center mb-4">
              Place Your Order
            </h2>

            <form onSubmit={handleOrder} className="space-y-3">
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="text"
                value={listing._id}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="text"
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
                value={listing.price}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                className="input input-bordered w-full"
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
                placeholder="Phone Number"
                required
                className="input input-bordered w-full"
              />

              <textarea
                name="notes"
                placeholder="Additional Notes"
                className="textarea textarea-bordered w-full"
              />

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
  );
};

export default Details;
