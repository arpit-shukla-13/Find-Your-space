'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Component name should be in PascalCase
const AdminProfile = () => {
    // State to hold the admin's data
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Safely load data from sessionStorage on the client side
    useEffect(() => {
        const sessionData = sessionStorage.getItem('admin');
        if (sessionData) {
            setAdminData(JSON.parse(sessionData).user);
        } else {
            // If no admin is logged in, redirect to login page after a short delay
            toast.error("You must be logged in to view this page.");
            router.push('/login');
        }
        setLoading(false);
    }, [router]); // Added router to dependency array

    // Show a loading message while checking session storage
    if (loading) {
        return <div className="text-center mt-20 text-xl font-semibold">Loading Profile...</div>;
    }

    // If no admin data is found, show this message
    if (!adminData) {
        return (
            <div className="text-center mt-20">
                <p className="text-lg text-gray-600">No admin data found.</p>
                <Link href="/login" className="mt-4 inline-block btn-primary">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <main className="profile-page bg-gray-100">
            {/* Header Section with Background */}
            <section className="relative block h-96">
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: "url('/meeting.jpg')" }}
                >
                    <span className="w-full h-full absolute opacity-50 bg-black" />
                </div>
            </section>

            {/* Profile Card Section */}
            <section className="relative py-16">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                {/* Profile Image */}
                                <div className="w-full flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="Admin Profile"
                                            src={`${API_URL}/${adminData.image || 'default-avatar.png'}`}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                            style={{ maxWidth: "150px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-24">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700">
                                    {adminData.name}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400" />
                                    Lucknow, Uttar Pradesh
                                </div>
                                <div className="mb-2 text-gray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-gray-400" />
                                    Administrator - OfficeSpace
                                </div>
                                <div className="mb-2 text-gray-600">
                                    <i className="fas fa-university mr-2 text-lg text-gray-400" />
                                    {adminData.email}
                                </div>
                            </div>
                            <div className="mt-10 py-10 border-t border-gray-200 text-center">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-9/12 px-4">
                                        <p className="mb-4 text-lg leading-relaxed text-gray-700">
                                            As an administrator, I am dedicated to managing our flexible office spaces with precision and creativity. From optimizing layouts to fostering a vibrant community, my goal is to ensure our spaces exceed expectations and empower every individual to reach their fullest potential.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AdminProfile;