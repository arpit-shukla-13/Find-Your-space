import React from 'react';
// Purane 'user/navbar' ki jagah naye universal Navbar ko import karein
import Navbar from '../(main)/navbar'; 

const UserLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main> 
        </>
    )
}

export default UserLayout;