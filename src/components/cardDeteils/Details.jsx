import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

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

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const orderData = {
      buyerName: user?.displayName || "",
      email: user?.email || "",
      listingId: listing._id,
      listingName: listing.name,
      quantity: listing.category === "Pets" ? 1 : parseInt(form.quantity.value),
      price: listing.price,
      address: form.address.value,
      date: form.date.value,
      phone: form.phone.value,
      notes: form.notes.value,
    };

    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Order placed successfully!");
        setIsModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="text-center py-10 text-lg">Loading...</p>;

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

        <div className="">
          <h1 className="text-3xl w-2xl font-bold ">{listing.name}</h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-800 mt-2 font-semibold">
              {listing.price === "0" || listing.price === 0
                ? "Free for Adoption"
                : `Price: $${listing.price}`}
            </p>
            <p className="text-gray-800 mt-2">
              <span className="font-semibold">Category:</span>{" "}
              {listing.category}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Owner Email:</span>{" "}
              {listing.email}
            </p>
            <p className="text-gray-600 mt-1">
              <span className="font-semibold">Location:</span>{" "}
              {listing.location}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-secondary mt-6 w-full"
          >
            Adopt
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
              <h2 className="text-2xl text-center font-bold mb-4">Place Your Order</h2>
              <form onSubmit={handleOrderSubmit} className="space-y-3">
                <input
                  type="text"
                  name="buyerName"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                  placeholder="Buyer Name"
                />

                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                  placeholder="Email"
                />

                <input
                  type="text"
                  name="listingId"
                  value={listing._id}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                  placeholder="Listing ID"
                />

                <input
                  type="text"
                  name="listingName"
                  value={listing.name}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                  placeholder="Listing Name"
                />

                {listing.category !== "Pets" && (
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    defaultValue={1}
                    className="input input-bordered w-full"
                    placeholder="Quantity"
                  />
                )}

                <input
                  type="text"
                  name="price"
                  value={listing.price}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                  placeholder="Price"
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
                  placeholder="Phone"
                />

                <textarea
                  name="notes"
                  className="textarea textarea-bordered w-full"
                  placeholder="Additional Notes"
                ></textarea>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <p className="text-gray-700 mt-3 leading-relaxed">
        <span className="font-semibold underline block mb-1">Description:</span>
        {listing.description}
      </p>
    </div>
  );
};

export default Details;
