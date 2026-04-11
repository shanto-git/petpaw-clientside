import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import DashboardLayout from "../../layout/DashboardLayout"; 

// Pages & Components Import
import Home from "../../pages/Home";
import Register from "../login&registration/Register";
import Login from "../login&registration/Login";
import MultiLogin from "../login&registration/MultiLogin";
import Pets from "../../pages/Pets";
import Profile from "../../pages/Profile";
import AddListing from "../../pages/AddListing";
import MyListing from "../../pages/MyListing";
import Details from "../cardDeteils/Details";
import CategoryListings from "../category/CategoryListing";
import UpdateListing from "../update/UpdateListing";
import MyOrders from "../../pages/MyOrders";
import NotFound from "../error/NotFound";
import PrivateRoute from "../../provider/PrivateRoute";;
import ManageUsers from "../dashboard/admin/ManageUser";
const router = createBrowserRouter([
  // --- মেইন ওয়েবসাইট রুটস ---
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/pets",
        element: <Pets />,
      },
      {
        path: "/category/:category",
        element: <CategoryListings />,
      },
      {
        path: "/chooseLogin",
        element: <MultiLogin />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/listing/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
    ],
  },

  // --- ড্যাশবোর্ড রুটস (Nested Routing) ---
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: <ManageUsers />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "add-listing",
        element: <AddListing />,
      },
      {
        path: "my-listings",
        element: <MyListing />,
      },
      {
        path: "updatelist/:id",
        element: <UpdateListing />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
    ],
  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;