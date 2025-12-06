import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Register from '../login&registration/Register';
import Login from '../login&registration/login';

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                Component:Home,
            },
            {
            path:"/login",
            Component: Login,
            },
            {
                path:"/register",
                Component: Register,
            }
        ]
    }
])

export default router;