'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Component name should be in PascalCase
const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle

  const router = useRouter();

  useEffect(() => {
    const adminData = sessionStorage.getItem('admin');
    if (adminData) {
      setIsAdmin(true);
      setCurrentUser(JSON.parse(adminData).user);
      return;
    }
    
    const userData = sessionStorage.getItem('user');
    if (userData) {
      setIsAdmin(false);
      setCurrentUser(JSON.parse(userData).user);
    }
  }, []);

  const logout = () => {
    sessionStorage.clear();
    setCurrentUser(null);
    setIsAdmin(false);
    setIsMenuOpen(false); // Also close menu on logout
    router.push('/login');
  }

  // A helper function to close the menu when a link is clicked on mobile
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const renderNavLinks = () => {
    const commonProps = { onClick: handleLinkClick, className: "nav-link block py-2 px-3 rounded md:p-0" };
    
    if (isAdmin) {
      // Admin Links
      return (
        <>
          <li><Link href="/admin/dashboard" {...commonProps}>Dashboard</Link></li>
          <li><Link href="/admin/manageSpace" {...commonProps}>Manage Spaces</Link></li>
          <li><Link href="/admin/manageBooking" {...commonProps}>Manage Bookings</Link></li>
          <li><Link href="/admin/profile" {...commonProps}>Profile</Link></li>
        </>
      );
    }
    if (currentUser) {
      // Logged-in User Links
      return (
        <>
          <li><Link href="/browse-space" {...commonProps}>Browse Space</Link></li>
          <li><Link href="/user/order" {...commonProps}>My Orders</Link></li>
          <li><Link href="/user/profile" {...commonProps}>Profile</Link></li>
          <li><Link href="/feedback" {...commonProps}>Feedback</Link></li>
        </>
      );
    }
    // Logged-out User Links
    return (
      <>
        <li><Link href="/browse-space" {...commonProps}>Browse Space</Link></li>
        <li><Link href="/about" {...commonProps}>About</Link></li>
        <li><Link href="/contact" {...commonProps}>Contact</Link></li>
      </>
    );
  }

  return (
    <nav className="bg-white border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3" onClick={handleLinkClick}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Office<span className="text-blue-700">Space</span>
          </span>
        </Link>
        
        {/* Hamburger button for mobile view */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
          aria-controls="navbar-default" 
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            // X icon for close
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          )}
        </button>

        {/* Updated classes for the collapsible menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white md:items-center">
            {renderNavLinks()}
            {currentUser ? (
              <li className="mt-4 md:mt-0"> 
                <button onClick={logout} className="w-full md:w-auto btn-primary-small">Logout</button>
              </li>
            ) : (
              <>
                <li className="mt-2 md:mt-0"><Link href="/login" className="nav-link block py-2 px-3 rounded md:p-0" onClick={handleLinkClick}>Login</Link></li>
                <li className="mt-2 md:mt-0"><Link href="/signup" className="w-full block md:w-auto btn-primary text-center" onClick={handleLinkClick}>Sign up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;