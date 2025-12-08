import React from "react";
import { createBrowserRouter } from "react-router-dom"; // make sure it's react-router-dom
import MainLayout from "../../layout/MainLayout";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />, // ⚠ pass JSX, not the component
      },
      {
        path:"/pets",
        element:<Pets/>
      },
      {
        path:"/category/:category",
        element:<CategoryListings/>
      },
      {
        path: "/chooseLogin",
        element: <MultiLogin />, // ⚠ not Component
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
        path:"/profile",
        element: <Profile/>
      },
      {
        path:"/add-listing",
        element: <AddListing/>
      },
      {
        path:"/my-listings",
        element: <MyListing/>
      },
      {
        path: "/listing/:id",
        element: <Details/>
      },
      {
        path: "/updatelist/:id",
        element: <UpdateListing/>
      },
      {
        path: "/my-orders",
        element: <MyOrders/>
      },
    ],
  },
  {
    path:"*",
    element: <NotFound/>
  }
]);

export default router;
