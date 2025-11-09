'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '@/app/config';


const BrowseSpace = () => {
  const [spaceList, setSpaceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user session
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      setCurrentUser(JSON.parse(userSession));
    }

    // Fetch from API
    fetch(`${API_URL}/space/getall`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch spaces');
        }
        return response.json();
      })
      .then((data) => {
        setSpaceList(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load spaces.");
      })
      .finally(() => {
        setLoading(false); // Loading complete
      });
  }, []);

  const openDetails = (id) => {
    if (currentUser === null) {
      toast.error('Please Login First');
      router.push('/login');
    } else {
      router.push(`/space-details/${id}`);
    }
  };


  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Spaces...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl text-black font-bold text-center mb-12">
          Browse <span className='text-blue-700'>Spaces</span>
        </h1>
        {spaceList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {spaceList.map(space => (
              <div key={space._id} className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg duration-150 hover:scale-105 hover:shadow-xl transition-transform">
                <img
                  className="w-full rounded-lg object-cover object-center h-56"
                  src={`${API_URL}/${space.image}`}
                  alt={space.name}
                />
                <div className="py-4 px-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{space.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 truncate">{space.address}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">₹{space.price}<span className="text-xs font-normal text-gray-500">/hour</span></p>
                    <p className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                      {space.area} sqft
                    </p>
                  </div>
                  <button onClick={() => openDetails(space._id)} className="mt-6 w-full btn-primary">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-20 text-gray-500">No spaces available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseSpace;