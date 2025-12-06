import React from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;