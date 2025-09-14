"use client";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import { API_URL } from '@/app/config';

// Validation schema for the form
const SpaceSchema = Yup.object().shape({
  name: Yup.string().required('Space name is required'),
  address: Yup.string().required('Address is required'),
  area: Yup.number().typeError('Area must be a number').required('Area is required'),
  price: Yup.number().typeError('Price must be a number').required('Price is required'),
  image: Yup.string().required('An image is required'),
  selectedFeatures: Yup.array().min(1, 'Select at least one feature'),
});

// Component name should be in PascalCase
const AddSpace = () => {
  const router = useRouter();

  // List of available features
  const featuresList = [
    "Support Staff",
    "Cafeteria",
    "Chill Out Space",
    "High-Speed Internet",
    "Dedicated Lockers",
    "Fully Furnished",
    "CCTV Security",
    "Meeting Rooms"
  ];

  const spaceForm = useFormik({
    initialValues: {
      name: "",
      address: "",
      area: "",
      image: "",
      price: "",
      selectedFeatures: []
    },
    validationSchema: SpaceSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(`${API_URL}/space/addSpace`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json", // Corrected typo
          },
        });

        if (response.status === 200) {
          toast.success("Space Added Successfully");
          resetForm();
          router.push('/admin/manageSpace'); // Redirect to manage spaces page
        } else {
          toast.error("Failed to add space.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while adding the space.");
      }
    },
  });

  // Function to handle file upload
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("myfile", file);
    
    toast.loading('Uploading image...', { id: 'upload-toast' });
    fetch(`${API_URL}/util/uploadfile`, {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("File Uploaded", { id: 'upload-toast' });
        // Set the image field in Formik with the uploaded file's name
        spaceForm.setFieldValue("image", file.name);
      } else {
        toast.error("File upload failed", { id: 'upload-toast' });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg sm:rounded-lg flex">
        <div className="flex-1 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Add New <span className="text-blue-700">Space</span>
            </h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={spaceForm.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="form-label">Name of the Place</label>
                    <input
                      type="text" id="name" className="form-input"
                      onChange={spaceForm.handleChange} value={spaceForm.values.name}
                    />
                    {spaceForm.touched.name && spaceForm.errors.name && <small className="text-red-500">{spaceForm.errors.name}</small>}
                  </div>

                  {/* Address Input */}
                  <div>
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text" id="address" className="form-input"
                      onChange={spaceForm.handleChange} value={spaceForm.values.address}
                    />
                     {spaceForm.touched.address && spaceForm.errors.address && <small className="text-red-500">{spaceForm.errors.address}</small>}
                  </div>

                  {/* Area Input */}
                  <div>
                    <label htmlFor="area" className="form-label">Area (sqft)</label>
                    <input
                      type="number" id="area" className="form-input"
                      onChange={spaceForm.handleChange} value={spaceForm.values.area}
                    />
                     {spaceForm.touched.area && spaceForm.errors.area && <small className="text-red-500">{spaceForm.errors.area}</small>}
                  </div>

                  {/* Price Input */}
                  <div>
                    <label htmlFor="price" className="form-label">Price (₹/hour)</label>
                    <input
                      type="number" id="price" className="form-input"
                      onChange={spaceForm.handleChange} value={spaceForm.values.price}
                    />
                     {spaceForm.touched.price && spaceForm.errors.price && <small className="text-red-500">{spaceForm.errors.price}</small>}
                  </div>

                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input
                      type="file" id="image" onChange={uploadFile}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                     {spaceForm.touched.image && spaceForm.errors.image && <small className="text-red-500">{spaceForm.errors.image}</small>}
                  </div>

                  {/* Features Checkboxes */}
                  <div className="md:col-span-2">
                    <label className="form-label">Features</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {featuresList.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            id={feature}
                            name="selectedFeatures"
                            value={feature}
                            onChange={spaceForm.handleChange}
                            checked={spaceForm.values.selectedFeatures.includes(feature)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={feature} className="ml-2 block text-sm text-gray-900">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                    {spaceForm.touched.selectedFeatures && spaceForm.errors.selectedFeatures && <small className="text-red-500">{spaceForm.errors.selectedFeatures}</small>}
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full btn-primary mt-4">
                      Add Space
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-100 text-center hidden lg:flex rounded-r-lg">
            <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/add-space.svg')" }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default AddSpace;