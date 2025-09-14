'use client';
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from 'yup';
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
const UpdateSpace = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [initialData, setInitialData] = useState(null); // To store fetched data for Formik
  const [loading, setLoading] = useState(true);

  // List of available features
  const featuresList = [
    "Support Staff", "Cafeteria", "Chill Out Space", "High-Speed Internet",
    "Dedicated Lockers", "Fully Furnished", "CCTV Security", "Meeting Rooms"
  ];
  
  // Fetch existing space data when the component mounts
  useEffect(() => {
    fetch(`${API_URL}/space/getbyid/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch space data");
        return res.json();
      })
      .then(data => {
        setInitialData(data);
      })
      .catch(err => {
        console.error(err);
        toast.error("Could not load space details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const updateForm = useFormik({
    // Use fetched data as initial values
    initialValues: initialData || {
      name: "", address: "", area: "", image: "", price: "", selectedFeatures: []
    },
    enableReinitialize: true, // This is crucial to update the form when initialData is fetched
    validationSchema: SpaceSchema,
    onSubmit: async (values) => {
      try {
        const res = await fetch(`${API_URL}/space/update/${id}`, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        
        if (res.status === 200) {
          toast.success("Space Updated Successfully");
          router.push("/admin/manageSpace");
        } else {
          toast.error("Space update failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred during update.");
      }
    },
  });

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
        // Directly update the image field in Formik
        updateForm.setFieldValue("image", file.name);
      } else {
        toast.error("File upload failed", { id: 'upload-toast' });
      }
    });
  };

  // Show loading state while fetching initial data
  if (loading) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Form...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg sm:rounded-lg flex">
        <div className="flex-1 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Update <span className="text-blue-700">Space</span>
            </h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={updateForm.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="form-label">Name of the Place</label>
                    <input type="text" id="name" className="form-input"
                      onChange={updateForm.handleChange} value={updateForm.values.name} />
                    {updateForm.touched.name && updateForm.errors.name && <small className="text-red-500">{updateForm.errors.name}</small>}
                  </div>

                  {/* Address Input */}
                  <div>
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" id="address" className="form-input"
                      onChange={updateForm.handleChange} value={updateForm.values.address} />
                    {updateForm.touched.address && updateForm.errors.address && <small className="text-red-500">{updateForm.errors.address}</small>}
                  </div>
                  
                  {/* ... other form fields ... */}
                  <div>
                    <label htmlFor="area" className="form-label">Area (sqft)</label>
                    <input type="number" id="area" className="form-input"
                      onChange={updateForm.handleChange} value={updateForm.values.area} />
                    {updateForm.touched.area && updateForm.errors.area && <small className="text-red-500">{updateForm.errors.area}</small>}
                  </div>
                  <div>
                    <label htmlFor="price" className="form-label">Price (₹/hour)</label>
                    <input type="number" id="price" className="form-input"
                      onChange={updateForm.handleChange} value={updateForm.values.price} />
                    {updateForm.touched.price && updateForm.errors.price && <small className="text-red-500">{updateForm.errors.price}</small>}
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input type="file" id="image" onChange={uploadFile}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {updateForm.touched.image && updateForm.errors.image && <small className="text-red-500">{updateForm.errors.image}</small>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Features</label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {featuresList.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <input type="checkbox" id={feature} name="selectedFeatures" value={feature}
                            onChange={updateForm.handleChange} checked={updateForm.values.selectedFeatures.includes(feature)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <label htmlFor={feature} className="ml-2 block text-sm text-gray-900">{feature}</label>
                        </div>
                      ))}
                    </div>
                     {updateForm.touched.selectedFeatures && updateForm.errors.selectedFeatures && <small className="text-red-500">{updateForm.errors.selectedFeatures}</small>}
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full btn-primary mt-4">
                      Update Space
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSpace;