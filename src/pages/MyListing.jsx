import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router';
import axios from 'axios';

const MyListing = () => {
      const [myListings, setMyListings] = useState([]);
      const {user}= useContext(AuthContext);
    


    useEffect(() => {
        fetch(`http://localhost:3000/my-listings?email=${user?.email}`)
          .then((res) => res.json())
          .then((data) => {
            setMyListings(data);
          })
          .catch((err) => {
            console.error("Error fetching listings:", err);
          });
      }, [user?.email]);
      console.log(myListings);
      
      const handleDelete = (id)=>{
        axios.delete(`http://localhost:3000/delete/${id}`)
        .then(res=>{
          console.log(res.data);
          const filterData = myListings.filter(listing=> listing._id != id)
          setMyListings(filterData)
          
        })
      }
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    <tbody>
      {/* row 1 */}
      {
        myListings.map((listing)=><tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={listing?.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{listing?.name}</div>
              <div className="text-sm opacity-50">${listing?.price}</div>
            </div>
          </div>
        </td>
        <td>
          {listing?.category}
        </td>
        <td>{listing?.date}</td>
        <th className='flex gap-2'>
          <Link to={`/updatelist/${listing?._id}`}>
          <button className="btn btn-warning btn-xs">Update</button>
          </Link>
          <button onClick={()=>handleDelete(listing?._id)} className="btn btn-error btn-xs">delete</button>
        </th>
      </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyListing;