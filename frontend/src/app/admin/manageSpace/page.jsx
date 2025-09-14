"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Component name should be in PascalCase
const ManageSpace = () => {
  const [spaceList, setSpaceList] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch all spaces from the API
  const fetchSpaces = async () => {
    try {
      const response = await fetch('http://localhost:5500/space/getall');
      if (!response.ok) {
        throw new Error('Failed to fetch spaces');
      }
      const data = await response.json();
      setSpaceList(data);
    } catch (err) {
      console.error(err);
      toast.error("Could not fetch spaces.");
    } finally {
      setLoading(false); // Stop loading once data is fetched or an error occurs
    }
  };

  // Function to delete a space
  const deleteSpace = async (id) => {
    toast.loading('Deleting space...', { id: 'delete-toast' });
    try {
      const response = await fetch('http://localhost:5500/space/delete/' + id, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        toast.success('Space deleted successfully', { id: 'delete-toast' });
        // Optimistically update the UI by removing the deleted space from the state
        setSpaceList(currentSpaces => currentSpaces.filter(space => space._id !== id));
      } else {
        toast.error('Failed to delete space', { id: 'delete-toast' });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred.', { id: 'delete-toast' });
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSpaces();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Spaces...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl text-black font-bold">
          Manage <span className="text-blue-700">Spaces</span>
        </h1>
        <Link href="/admin/space" className="btn-primary">
          Add New Space
        </Link>
      </div>
      
      {spaceList.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Area (sqft)</th>
                <th scope="col" className="px-6 py-3">Price (₹/hr)</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {spaceList.map((space) => (
                <tr key={space._id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      className="w-16 h-16 rounded-lg object-cover"
                      src={`http://localhost:5500/${space.image}`}
                      alt={space.name}
                    />
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {space.name}
                  </th>
                  <td className="px-6 py-4">{space.address}</td>
                  <td className="px-6 py-4">{space.area}</td>
                  <td className="px-6 py-4">₹{space.price}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/update/${space._id}`} className="font-medium text-blue-600 hover:underline mr-4">
                      Edit
                    </Link>
                    <button onClick={() => deleteSpace(space._id)} className="font-medium text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-20 p-8 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">No spaces have been added yet.</p>
            <Link href="/admin/space" className="mt-4 inline-block btn-primary">
              Add Your First Space
            </Link>
        </div>
      )}
    </div>
  );
};

export default ManageSpace;