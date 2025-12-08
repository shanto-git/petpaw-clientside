import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pets = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch("http://localhost:3000/listing")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setFilteredListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching listings:", err);
        setLoading(false);
      });
  }, []);
  const handleFilter = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setCategory(value);

    if (value === "All") {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((item) => item.category === value);
      setFilteredListings(filtered);
    }
  };

  if (loading) return <p className="text-center py-16">Loading listings...</p>;

  return (
    <div className="py-12 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl underline md:text-4xl font-bold text-center mb-8">
        All Pets&Supplies
      </h2>
      <div className="flex justify-between items-center mb-8 border-b-2">
        <p className="font-semibold underline">Total Services: {filteredListings.length}</p>
        <select
          className="select select-bordered w-60 m-2"
          value={category}
          onChange={handleFilter}
        >
          <option value="All">All Categories</option>
          <option value="Pets">Pets</option>
          <option value="Food">Food</option>
          <option value="Accessories">Accessories</option>
          <option value="Care Products">Care Products</option>
        </select>
      </div>
      {filteredListings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item._id}
              className=" shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl">{item.name}</h3>
                <p className="text-gray-600 mt-2 font-semibold">
                  {item.category === "Pets" 
                    ? "Free for Adoption"
                    : `Price: $${item.price}`}
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
      )}
    </div>
  );
};

export default Pets;
