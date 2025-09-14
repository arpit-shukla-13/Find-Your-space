"use client";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { FaMapMarkerAlt, FaRupeeSign, FaThLarge } from "react-icons/fa";

// Validation schema for the booking form
const BookingSchema = Yup.object().shape({
  date: Yup.date().required('A booking date is required'),
  time: Yup.string().required('A time slot is required'),
  duration: Yup.string().required('Duration is required (e.g., 2 hours)'),
});

// Component name should be in PascalCase
const Booking = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [spaceDetails, setSpaceDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Time slots for the dropdown
  const timeSlots = [
    '08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00',
    '14:00 - 16:00', '16:00 - 18:00', '18:00 - 20:00'
  ];

  // Fetch space details when the component mounts
  useEffect(() => {
    fetch(`http://localhost:5500/space/getbyid/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not find the space.");
        return response.json();
      })
      .then((data) => {
        setSpaceDetails(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Formik setup for handling the booking form
  const bookingForm = useFormik({
    initialValues: {
      date: '',
      time: timeSlots[0], // Default to the first time slot
      duration: '',
      space: id,
    },
    validationSchema: BookingSchema,
    onSubmit: (values) => {
      // Store booking and space details in sessionStorage before moving to checkout
      sessionStorage.setItem("bookingDetails", JSON.stringify(values));
      sessionStorage.setItem("spaceDetails", JSON.stringify(spaceDetails));
      toast.success("Proceeding to checkout...");
      router.push(`/user/checkout/${id}`);
    },
  });

  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Booking Details...</div>;
  }
  
  if (!spaceDetails) {
    return <div className="text-center mt-20 text-xl text-red-500">Space not found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-center text-4xl font-bold text-black mb-10">
          Boo<span className="text-blue-700">king</span>
        </h1>
        <div className="bg-white rounded-lg shadow-xl lg:flex">
          {/* Left Side: Space Info */}
          <div className="lg:w-1/2 p-8">
            <img
              src={`http://localhost:5500/${spaceDetails.image}`}
              alt={spaceDetails.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <h2 className="text-3xl font-bold mt-6">{spaceDetails.name}</h2>
            <div className="flex items-center text-gray-600 mt-2">
              <FaMapMarkerAlt className="mr-2" />
              <span>{spaceDetails.address}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <FaRupeeSign className="text-blue-600 text-xl" />
                    <div className="ml-3">
                        <p className="font-bold">{spaceDetails.price}</p>
                        <p className="text-xs text-gray-500">per hour</p>
                    </div>
                </div>
                 <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <FaThLarge className="text-green-600 text-xl" />
                    <div className="ml-3">
                        <p className="font-bold">{spaceDetails.area}</p>
                        <p className="text-xs text-gray-500">sqft</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="lg:w-1/2 p-8 bg-gray-50 rounded-r-lg">
            <h3 className="text-2xl font-semibold mb-6">Select your slot</h3>
            <form onSubmit={bookingForm.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="date" className="form-label">Date</label>
                <input
                  type="date"
                  id="date"
                  onChange={bookingForm.handleChange}
                  value={bookingForm.values.date}
                  className="form-input"
                />
                {bookingForm.touched.date && bookingForm.errors.date && 
                  <small className="text-red-500">{bookingForm.errors.date}</small>}
              </div>
              
              <div>
                <label htmlFor="time" className="form-label">Time Slot</label>
                <select
                  id="time"
                  name="time"
                  onChange={bookingForm.handleChange}
                  value={bookingForm.values.time}
                  className="form-input"
                >
                  {timeSlots.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
                 {bookingForm.touched.time && bookingForm.errors.time && 
                  <small className="text-red-500">{bookingForm.errors.time}</small>}
              </div>

              <div>
                <label htmlFor="duration" className="form-label">Duration</label>
                <input
                  type="text"
                  id="duration"
                  placeholder="e.g., 2 hours, Full Day"
                  onChange={bookingForm.handleChange}
                  value={bookingForm.values.duration}
                  className="form-input"
                />
                 {bookingForm.touched.duration && bookingForm.errors.duration && 
                  <small className="text-red-500">{bookingForm.errors.duration}</small>}
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full btn-primary">
                  Proceed to Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;