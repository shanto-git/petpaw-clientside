import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // লোকালহোস্ট ইউআরএল
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${baseUrl}/all-users`)
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  // রোল পরিবর্তন করার ফাংশন (Buyer <-> Seller)
  const handleRoleChange = (id, newRole) => {
    axios.patch(`${baseUrl}/users/admin/${id}`, { role: newRole })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", `User is now a ${newRole}`, "success");
          fetchUsers();
        }
      });
  };

  // ইউজার ব্লক/আনব্লক সিস্টেম
  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";
    axios.patch(`${baseUrl}/users/admin/${id}`, { status: newStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", `User has been ${newStatus}`, "success");
          fetchUsers();
        }
      });
  };

  // ইউজার ডিলিট
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${baseUrl}/users/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              Swal.fire("Deleted!", "User removed successfully", "success");
              fetchUsers();
            }
          });
      }
    });
  };

  if (loading) return <div className="text-center mt-10">Loading Users...</div>;

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">All Users</h2>
      <table className="table w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Switch Role</th>
            <th>User Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.role === "admin" ? "badge-error" : user.role === "seller" ? "badge-info" : "badge-ghost"}`}>
                  {user.role}
                </span>
              </td>
              <td>

                {user.role === "admin" ? (
                  <button className="btn btn-xs btn-disabled">Not Permitted</button>
                ) : user.role === "buyer" ? (
                  <button 
                    onClick={() => handleRoleChange(user._id, "seller")} 
                    className="btn btn-xs btn-outline btn-info"
                  >
                    Make Seller
                  </button>
                ) : (
                  <button 
                    onClick={() => handleRoleChange(user._id, "buyer")} 
                    className="btn btn-xs btn-outline btn-warning"
                  >
                    Make Buyer
                  </button>
                )}
              </td>
              <td>
                <span className={`badge ${user.status === "blocked" ? "badge-error" : "badge-success"}`}>
                  {user.status || "active"}
                </span>
              </td>
              <td className="flex gap-2">

                {user.role !== "admin" ? (
                  <>
                    <button 
                      onClick={() => handleStatusChange(user._id, user.status)} 
                      className={`btn btn-xs ${user.status === "blocked" ? "btn-success" : "btn-warning"}`}
                    >
                      {user.status === "blocked" ? "Unblock" : "Block"}
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user._id)} 
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-400 italic">Protected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;