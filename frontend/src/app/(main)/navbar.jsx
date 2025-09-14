'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check for admin first
    const adminData = sessionStorage.getItem('admin');
    if (adminData) {
      setIsAdmin(true);
      setCurrentUser(JSON.parse(adminData).user);
      return;
    }
    
    // If not admin, check for user
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setIsAdmin(false);
      setCurrentUser(JSON.parse(userData).user);
    }
  }, []);

  const logout = () => {
    sessionStorage.clear(); // Clear all session data
    setCurrentUser(null);
    setIsAdmin(false);
    router.push('/login');
  }

  const renderNavLinks = () => {
    if (isAdmin) {
      // Admin Links
      return (
        <>
          <li><Link href="/admin/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link href="/admin/manageSpace" className="nav-link">Manage Spaces</Link></li>
          <li><Link href="/admin/manageBooking" className="nav-link">Manage Bookings</Link></li>
          <li><Link href="/admin/profile" className="nav-link">Profile</Link></li>
        </>
      );
    }
    if (currentUser) {
      // Logged-in User Links
      return (
        <>
          <li><Link href="/browse-space" className="nav-link">Browse Space</Link></li>
          <li><Link href="/user/order" className="nav-link">My Orders</Link></li>
          <li><Link href="/user/profile" className="nav-link">Profile</Link></li>
          <li><Link href="/feedback" className="nav-link">Feedback</Link></li>
        </>
      );
    }
    // Logged-out User Links
    return (
      <>
        <li><Link href="/browse-space" className="nav-link">Browse Space</Link></li>
        <li><Link href="/about" className="nav-link">About</Link></li>
        <li><Link href="/contact" className="nav-link">Contact</Link></li>
      </>
    );
  }

  return (
    <nav className="bg-white border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Find<span className="text-yellow-700">Your</span><span className="text-blue-700">Space</span>
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 items-center">
            {renderNavLinks()}
            {currentUser ? (
              <li> 
                <button onClick={logout} className="btn-primary-small">Logout</button>
              </li>
            ) : (
              <>
                <li><Link href="/login" className="nav-link">Login</Link></li>
                <li><Link href="/signup" className="btn-primary">Sign up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;