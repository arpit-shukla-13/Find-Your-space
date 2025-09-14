'use client'
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '@/app/config';

// Component name should be in PascalCase
const ManageUser = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch all users from the API
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/user/getall`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      // Filter out admin users, only show regular users
      setUserList(data.filter(user => user.role === 'user'));
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch users.");
    } finally {
      setLoading(false); // Stop loading once data is fetched or an error occurs
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    toast.loading('Deleting user...', { id: 'delete-toast' });
    try {
      const response = await fetch(`${API_URL}/user/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        toast.success('User deleted successfully', { id: 'delete-toast' });
        // Optimistically update the UI by removing the deleted user from the state
        setUserList(currentUserList => currentUserList.filter(user => user._id !== id));
      } else {
        toast.error('Failed to delete user', { id: 'delete-toast' });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred.', { id: 'delete-toast' });
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Users...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-black font-bold text-center mb-8">
        Manage <span className="text-blue-700">Users</span>
      </h1>
      
      {userList.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full flex-shrink-0 mr-3"
                        src={`${API_URL}/${user.image}`}
                        alt={user.name}
                      />
                      {user.name}
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4">{user.address || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => { deleteUser(user._id) }} className="font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                    {/* NOTE: Edit functionality requires a dedicated page like /admin/update-user/[id] */}
                    {/* <Link href={`/admin/update-user/${user._id}`} className="ml-4 font-medium text-blue-600 hover:underline">Edit</Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default ManageUser;