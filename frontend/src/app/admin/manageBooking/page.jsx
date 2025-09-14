'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Component name should be in PascalCase
const ManageBooking = () => {
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch all bookings from the API
  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5500/booking/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      const data = await response.json();
      setBookingList(data);
    } catch (err) {
      console.error(err);
      toast.error('Could not fetch booking data.');
    } finally {
      setLoading(false); // Stop loading once data is fetched or an error occurs
    }
  };

  // Function to delete a booking
  const deleteBooking = async (id) => {
    toast.loading('Deleting booking...', { id: 'delete-toast' });
    try {
      const response = await fetch('http://localhost:5500/booking/delete/' + id, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        toast.success('Booking deleted successfully', { id: 'delete-toast' });
        // Optimistically update the UI by removing the deleted booking from the state
        setBookingList(currentBookings => currentBookings.filter(booking => booking._id !== id));
      } else {
        toast.error('Failed to delete booking', { id: 'delete-toast' });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred.', { id: 'delete-toast' });
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Bookings...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-black font-bold text-center mb-8">
        Manage <span className="text-blue-700">Bookings</span>
      </h1>
      
      {bookingList.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Space Name</th>
                <th scope="col" className="px-6 py-3">User Name</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Booking Date</th>
                <th scope="col" className="px-6 py-3">Time Slot</th>
                <th scope="col" className="px-6 py-3">Duration</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((book) => (
                <tr key={book._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {book.space?.name || 'N/A'}
                  </th>
                  <td className="px-6 py-4">{book.user?.name || 'N/A'}</td>
                  <td className="px-6 py-4">₹{book.paymentDetails?.amount / 100 || 'N/A'}</td>
                  <td className="px-6 py-4">{new Date(book.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{book.time}</td>
                  <td className="px-6 py-4">{book.duration}</td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-red-600 hover:underline"
                      onClick={() => { deleteBooking(book._id) }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default ManageBooking;