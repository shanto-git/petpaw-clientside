import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("https://backend10-phi.vercel.app/listing")
      .then((res) => res.json())
      .then((data) => {
        const newData = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setListings(newData);
      })
      .catch((error) => {
        console.error("Error fetching listings:", error);
      });
  }, []);

  return (
    <div className="py-12 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl underline md:text-4xl font-bold text-center mb-8">
        Recent Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-gray-600 mt-1">
                {item.category === "Pets (Adoption)" ? (
                  <span className="font-bold">Free for Adoption</span>
                ) : (
                  <span className="font-semibold">Price: ${item.price}</span>
                )}
              </p>

              <div className="flex justify-between">
                <p className="text-gray-600 mt-1">
                  <span className="font-semibold">Category:</span>{" "}
                  {item.category}
                </p>
                <p className="text-gray-600 mt-1 mb-3">
                  <span className="font-semibold">Location:</span>{" "}
                  {item.location}
                </p>
              </div>

              <Link
                to={`/listing/${item._id}`}
                className="btn btn-secondary w-full text-white"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
