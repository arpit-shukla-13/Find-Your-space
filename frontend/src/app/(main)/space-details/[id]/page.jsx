"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaRupeeSign, FaThLarge } from "react-icons/fa";

// Component ka naam PascalCase mein
const SpaceDetails = () => {
  const { id } = useParams();
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5500/space/getbyid/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Space not found');
          }
          return response.json();
        })
        .then((data) => {
          setSpaceDetails(data);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]); // id ko dependency array mein add karein

  // Loading State
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Space Details...</div>;
  }

  // Error State
  if (error) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="text-gray-600">{error}</p>
        <Link href="/browse-space" className="mt-4 inline-block btn-primary">
          Back to Spaces
        </Link>
      </div>
    );
  }

  // Success State
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          {/* Image Section */}
          <div className="w-full h-64 lg:h-full">
            <img
              src={`http://localhost:5500/${spaceDetails.image}`}
              alt={spaceDetails.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900">{spaceDetails.name}</h1>
            <div className="mt-4 flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <p>{spaceDetails.address}</p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <FaRupeeSign className="mx-auto text-blue-600 text-2xl" />
                <p className="mt-2 text-xl font-bold">{spaceDetails.price}</p>
                <p className="text-sm text-gray-500">per hour</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <FaThLarge className="mx-auto text-green-600 text-2xl" />
                <p className="mt-2 text-xl font-bold">{spaceDetails.area}</p>
                <p className="text-sm text-gray-500">sqft</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {/* Features ko dynamically map karein */}
                {spaceDetails.selectedFeatures.map((feature, index) => (
                  <span key={index} className="px-3 py-1 rounded-full bg-gray-200 text-gray-800 text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <Link
                href={`/user/booking/${spaceDetails._id}`}
                className="w-full btn-primary text-center block"
              >
                Book This Location
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDetails;