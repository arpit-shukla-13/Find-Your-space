import React from 'react';
// Purane 'AdminNavbar' ki jagah naye universal Navbar ko import karein
import Navbar from '../(main)/navbar'; 

const AdminLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main> 
        </>
    )
}

export default AdminLayout;