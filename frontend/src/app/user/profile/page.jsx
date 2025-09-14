"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Component name in PascalCase
const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const sessionData = sessionStorage.getItem('user');
    if (sessionData) {
      const data = JSON.parse(sessionData);
      setCurrentUser(data.user); 
    }
  }, []);

  const userProfile = useFormik({
    initialValues: currentUser || { 
      name: '', email: '', address: '', phone: '', gender: '', bio: '', image: '' 
    },
    enableReinitialize: true, 
    onSubmit: async (values) => {
      if (!currentUser || !currentUser._id) {
        toast.error("User ID not found. Cannot update.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5500/user/update/${currentUser._id}`, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
          const updatedUserData = await response.json();
          toast.success("Profile Updated Successfully");
          
          setCurrentUser(updatedUserData);
          
          const oldSessionData = JSON.parse(sessionStorage.getItem('user'));
          oldSessionData.user = updatedUserData;
          sessionStorage.setItem('user', JSON.stringify(oldSessionData));

        } else {
          toast.error("Profile Update Failed");
        }
      } catch (err) {
        console.error("An error occurred during update:", err);
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("myfile", file);
    toast.loading('Uploading...', { id: 'upload-toast' });
    fetch("http://localhost:5500/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("File Uploaded", { id: 'upload-toast' });
        userProfile.setFieldValue("image", file.name);
      } else {
        toast.error("Upload Failed", { id: 'upload-toast' });
      }
    });
  };

  if (!currentUser) {
    return <div className="text-center mt-20 text-xl font-semibold">Loading Profile...</div>;
  }

  return (
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-xl shadow p-4 sm:p-7">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-600">Manage your name and account settings.</p>
        </div>
        <form onSubmit={userProfile.handleSubmit}>
          <div className="grid sm:grid-cols-12 gap-4 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="form-label mt-2">Profile photo</label>
            </div>
            <div className="sm:col-span-9">
                <input type="file" onChange={uploadFile} id="image" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            </div>

            <div className="sm:col-span-3"><label htmlFor="name" className="form-label mt-2">Full name</label></div>
            <div className="sm:col-span-9"><input id="name" type="text" className="form-input" {...userProfile.getFieldProps('name')} /></div>

            <div className="sm:col-span-3"><label htmlFor="email" className="form-label mt-2">Email</label></div>
            <div className="sm:col-span-9"><input id="email" type="email" className="form-input" {...userProfile.getFieldProps('email')} /></div>
            
            <div className="sm:col-span-3"><label htmlFor="address" className="form-label mt-2">Address</label></div>
            <div className="sm:col-span-9"><input id="address" type="text" className="form-input" {...userProfile.getFieldProps('address')} /></div>

            <div className="sm:col-span-3"><label htmlFor="phone" className="form-label mt-2">Phone</label></div>
            <div className="sm:col-span-9"><input id="phone" type="text" className="form-input" {...userProfile.getFieldProps('phone')} /></div>

            <div className="sm:col-span-3"><label className="form-label mt-2">Gender</label></div>
            <div className="sm:col-span-9">
              <div className="sm:flex">
                <label htmlFor="gender-male" className="flex items-center py-2 px-3 w-full border rounded-l-lg"><input id="gender-male" type="radio" name="gender" onChange={userProfile.handleChange} value="male" checked={userProfile.values.gender === 'male'} className="form-radio" /><span className="ml-3 text-sm">Male</span></label>
                <label htmlFor="gender-female" className="flex items-center py-2 px-3 w-full border-t border-b"><input id="gender-female" type="radio" name="gender" onChange={userProfile.handleChange} value="female" checked={userProfile.values.gender === 'female'} className="form-radio" /><span className="ml-3 text-sm">Female</span></label>
                <label htmlFor="gender-other" className="flex items-center py-2 px-3 w-full border rounded-r-lg"><input id="gender-other" type="radio" name="gender" onChange={userProfile.handleChange} value="other" checked={userProfile.values.gender === 'other'} className="form-radio" /><span className="ml-3 text-sm">Other</span></label>
              </div>
            </div>

            <div className="sm:col-span-3"><label htmlFor="bio" className="form-label mt-2">BIO</label></div>
            <div className="sm:col-span-9"><textarea id="bio" rows={4} className="form-input" {...userProfile.getFieldProps('bio')} /></div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button type="button" className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;