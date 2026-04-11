import { Outlet, Link } from "react-router-dom";
import { useContext } from "react"; // সরাসরি useContext ইমপোর্ট করুন
import { AuthContext } from "../provider/AuthProvider"; // আপনার পাথ অনুযায়ী

const DashboardLayout = () => {
  // হুক ব্যবহার না করে সরাসরি কনটেক্সট থেকে রোল এবং ইউজার নিচ্ছি
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64 bg-slate-800 text-white p-5 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-red-400">Paw<span className="text-white">Mart</span></h2>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard/profile" className="hover:text-red-400">My Profile</Link>
          </li>

          {role === "admin" && (
            <>
              <div className="border-t border-gray-600 my-2"></div>
              <li><Link to="/dashboard/manage-users" className="hover:text-red-400">Manage Users</Link></li>

            </>
          )}

          {(role === "seller" || role === "admin") && (
            <>
              <div className="border-t border-gray-600 my-2"></div>
              <li><Link to="/dashboard/add-listing" className="hover:text-red-400">Add Product</Link></li>
              <div className="border-t border-gray-600 my-2"></div>
              <li><Link to="/dashboard/my-listings" className="hover:text-red-400">My Listings</Link></li>
            </>
          )}

          
            <div>
              <div className="border-t border-gray-600 my-2"></div>
              <li><Link to="/dashboard/my-orders" className="hover:text-red-400">My Orders</Link></li>
            </div>


          <div className="border-t border-gray-600 my-4"></div>
          <li>
            <Link to="/" className="btn btn-sm btn-outline btn-error w-full">Back to Home</Link>
          </li>
        </ul>
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;