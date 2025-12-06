import React from "react";
import { createBrowserRouter } from "react-router-dom"; // make sure it's react-router-dom
import MainLayout from "../../layout/MainLayout";
import Home from "../../pages/Home";
import Register from "../login&registration/Register";
import Login from "../login&registration/Login";
import MultiLogin from "../login&registration/MultiLogin";
import Pets from "../../pages/Pets";

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
    ],
  },
]);

export default router;
