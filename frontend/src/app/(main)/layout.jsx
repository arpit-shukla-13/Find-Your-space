import React from 'react';
import Navbar from './navbar'; // Yahan se single, consolidated navbar import hoga

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default MainLayout;