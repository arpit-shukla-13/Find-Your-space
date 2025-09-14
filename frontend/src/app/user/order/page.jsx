"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Component name should be in PascalCase
const OrderPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Safely access sessionStorage only on the client side
    const sessionData = sessionStorage.getItem('user');
    
    if (sessionData) {
      // The user object is nested inside the session data
      const currentUser = JSON.parse(sessionData).user;

      // Ensure currentUser and its _id exist before fetching
      if (currentUser && currentUser._id) {
        fetch(`http://localhost:5500/booking/getbyuser/${currentUser._id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setOrderList(data);
          })
          .catch((err) => {
            console.error("Failed to fetch orders:", err);
            toast.error("Could not load your orders.");
          })
          .finally(() => {
            // Stop loading after fetch is complete
            setLoading(false);
          });
      } else {
        // Handle case where user ID is missing
        setLoading(false);
      }
    } else {
      // Handle case where user is not logged in
      setLoading(false);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Your Orders...</div>;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-10">
          Your <span className="text-blue-700">Orders</span>
        </h1>

        {orderList.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Booking Date</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Features</th>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order) => (
                  <tr key={order._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        className="w-24 h-24 rounded-lg object-cover"
                        src={`http://localhost:5500/${order.space.image}`}
                        alt={order.space.name}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.space.name}
                      <p className="font-normal text-gray-500 text-xs mt-1">{order.space.address}</p>
                    </td>
                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">₹{order.space.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {order.space.selectedFeatures.map(feature => (
                          <span key={feature} className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-20 p-8 border-2 border-dashed rounded-lg">
            <p className="text-lg text-gray-500">You have no orders yet.</p>
            <Link href="/browse-space" className="mt-4 inline-block btn-primary">
              Book Your First Space
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;