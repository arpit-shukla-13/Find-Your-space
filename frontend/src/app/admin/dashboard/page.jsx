'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Component ka naam PascalCase mein hona chahiye
const AdminDashboard = () => {

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sabhi data ko ek saath fetch karne ka function
  const fetchDashboardData = async () => {
    try {
      const [userRes, bookingRes, spaceRes] = await Promise.all([
        fetch('http://localhost:5500/user/getall'),
        fetch('http://localhost:5500/booking/getall'),
        fetch('http://localhost:5500/space/getall')
      ]);

      if (!userRes.ok || !bookingRes.ok || !spaceRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const userData = await userRes.json();
      const bookingData = await bookingRes.json();
      const spaceData = await spaceRes.json();

      setUsers(userData.filter(user => user.role === 'user'));
      setBookings(bookingData);
      setSpaces(spaceData);
      
      const total = bookingData.reduce((acc, booking) => {
        // Check karein ki paymentDetails aur amount मौजूद hai
        if (booking.paymentDetails && booking.paymentDetails.amount) {
          return acc + (booking.paymentDetails.amount / 100);
        }
        return acc;
      }, 0);
      setTotalAmount(total);

    } catch (err) {
      console.error(err);
      toast.error('Could not load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Dashboard...</div>;
  }

  return (
    <div>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-100 p-4 z-50">
        <span className="text-black font-bold text-lg">ADMIN PANEL</span>
        <ul className="mt-6">
          <li className="mb-2">
            <Link href="/admin/dashboard" className="flex items-center py-2 px-4 text-gray-700 bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">Dashboard</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/manageuser" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">Manage Users</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/space" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">Add Space</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/manageSpace" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">Manage Spaces</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/manageBooking" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">Manage Bookings</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/viewFeedback" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">View Feedback</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/contact" className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md">
              <span className="text-sm font-semibold">View Contacts</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen">
        <div className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-md border p-6 shadow-sm">
              <div className="text-2xl font-semibold">{users.length}</div>
              <div className="text-sm font-medium text-gray-500">Total Users</div>
            </div>
            <div className="bg-white rounded-md border p-6 shadow-sm">
              <div className="text-2xl font-semibold">{spaces.length}</div>
              <div className="text-sm font-medium text-gray-500">Total Spaces</div>
            </div>
            <div className="bg-white rounded-md border p-6 shadow-sm">
              <div className="text-2xl font-semibold">{bookings.length}</div>
              <div className="text-sm font-medium text-gray-500">Total Bookings</div>
            </div>
            <div className="bg-white rounded-md border p-6 shadow-sm">
              <div className="text-2xl font-semibold">₹{totalAmount.toFixed(2)}</div>
              <div className="text-sm font-medium text-gray-500">Total Revenue</div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white border rounded-md p-6 shadow-sm">
            <h3 className="font-semibold text-base text-gray-900 mb-4">Recent Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase font-semibold text-left text-gray-500">
                  <tr>
                    <th className="p-2">User</th>
                    <th className="p-2">Space</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking._id}>
                      <td className="p-2">{booking.user?.name || 'N/A'}</td>
                      <td className="p-2">{booking.space?.name || 'N/A'}</td>
                      <td className="p-2">{new Date(booking.createdAt).toLocaleDateString()}</td>
                      <td className="p-2 text-green-500 font-medium">₹{booking.paymentDetails?.amount / 100 || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;