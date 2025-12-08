import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryListings = () => {
  const { category } = useParams(); // gets category from URL
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/listing")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => (item.category === category));
        setListings(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (listings.length === 0)
    return (
      <p className="text-center py-10 text-gray-500">
        No listings found in "{category}"
      </p>
    );

  return (
    <div className="py-12 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Category: {category}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-gray-800 mt-2 font-semibold">
                {item.category === "Pets"
                  ? "Free for Adoption"
                  : `$${item.price}`}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-gray-600 mt-1">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">Location:</span> {item.location}
              </p>
              </div>
              
              <Link
                to={`/listing/${item._id}`}
                className="btn btn-secondary w-full mt-3 text-white"
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

export default CategoryListings;
