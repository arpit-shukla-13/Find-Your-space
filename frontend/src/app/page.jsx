import React from 'react';
import Navbar from './(main)/navbar';
import Link from 'next/link';
import Image from 'next/image';
import { FaWifi, FaInstagram, FaStar, FaRegStar, FaArrowRight } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { IoGameController, IoCafeOutline } from "react-icons/io5";
import { GiCctvCamera } from "react-icons/gi";

// --- Sub-components for better organization ---

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 text-center transition-all duration-300 bg-white border rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2">
    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50">
      {icon}
    </div>
    <h6 className="mb-2 text-xl font-semibold leading-5 text-gray-900">{title}</h6>
    <p className="mb-3 text-sm text-gray-700">{description}</p>
  </div>
);

const GalleryCard = ({ href, imgSrc, title }) => (
  <Link href={href} className="group relative block h-64 md:h-96 w-full">
    <Image
      src={imgSrc}
      fill
      alt={title}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-110 rounded-lg"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-20 rounded-lg" />
    <div className="relative flex items-end h-full p-6">
      <h3 className="text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-2">{title}</h3>
    </div>
  </Link>
);

const TestimonialCard = ({ quote, name, title, stars }) => (
    <div className="p-8 bg-white border rounded-lg shadow-sm">
        <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
                i < stars ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />
            ))}
        </div>
        <p className="mb-4 text-gray-600">"{quote}"</p>
        <div>
            <p className="font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);


const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <main>
      {/* --- NEW ADVANCED HERO SECTION --- */}
{/* --- NEW, RELIABLE HERO SECTION --- */}
<section className="relative flex items-center justify-center min-h-screen text-white overflow-hidden bg-blue-200">
    {/* Background using Tailwind Gradient Classes */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-blue-950 to-gray-800" />
    
    {/* Optional: Subtle background shapes for depth */}
    <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full opacity-10 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>


    {/* Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl"
            style={{ textShadow: '0px 4px 20px rgba(0,0,0,0.4)' }}
        >
            Your Future Workspace, <br />
            <span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300"
            >
                Designed for Success.
            </span>
        </h1>
        <p 
            className="mt-6 max-w-3xl mx-auto text-xl text-gray-400"
        >
            Discover a coworking space that adapts to your lifestyle. Boost productivity and creativity in an environment built for modern professionals.
        </p>

        {/* Action Buttons */}
        <div 
            className="mt-10 flex flex-wrap justify-center gap-4" 
        >
            <Link 
                href="/browse-space" 
                className="px-8 py-4 text-lg font-semibold text-center text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
                Find Your Space
            </Link>
            <Link 
                href="/about" 
                className="px-8 py-4 text-lg font-semibold text-center text-white bg-transparent border-2 border-white/80 rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
            >
                Take a Tour
            </Link>
        </div>

        {/* Social Proof Section */}
        <div 
            className="mt-16"
        >
            <p className="text-sm uppercase tracking-wider text-gray-500">Trusted by leading companies</p>
            <div className="flex justify-center items-center gap-8 mt-4 opacity-70">
                <span className="font-semibold text-gray-600">Innovate Inc.</span>
                <span className="font-semibold text-gray-600">Quantum Solutions</span>
                <span className="font-semibold text-gray-600">Apex Creatives</span>
            </div>
        </div>
    </div>
</section>

        {/* Features Section */}
        <section className="bg-slate-50">
          <div className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="max-w-xl mb-12 md:mx-auto sm:text-center lg:max-w-2xl">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                We Provide More Than Just a <span className='text-blue-600'>Desk</span>
              </h2>
              <p className="text-base text-gray-600 md:text-lg">
                Our spaces are equipped with everything you need to be productive, creative, and comfortable.
              </p>
            </div>
            <div className="grid gap-8 row-gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<FaWifi size={32} className="text-blue-600" />}
                title="High-Speed Internet"
                description="Blazing-fast and reliable internet to keep you connected and productive all day long."
              />
              <FeatureCard
                icon={<IoGameController size={32} className="text-blue-600" />}
                title="Chill Out Space"
                description="Relax and recharge in our comfortable common areas and lounges designed for collaboration and rest."
              />
              <FeatureCard
                icon={<IoCafeOutline size={32} className="text-blue-600" />}
                title="Unlimited Coffee"
                description="Enjoy complimentary gourmet coffee, tea, and healthy snacks to fuel your workday."
              />
              <FeatureCard
                icon={<GiCctvCamera size={32} className="text-blue-600" />}
                title="24/7 Security"
                description="Secure access and round-the-clock surveillance to ensure a safe and peaceful working environment."
              />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-800 lg:text-4xl">
                Find the <span className='text-blue-600'>Right Space</span> For Your Needs
              </h2>
              <p className="mx-auto max-w-screen-md text-gray-500 md:text-lg">
                From private cabins for focused work to dynamic areas for collaboration, we have it all.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              <GalleryCard href="/browse-space" imgSrc="/coworking.jpeg" title="Coworking Desks" />
              <GalleryCard href="/browse-space" imgSrc="/meeting.jpg" title="Meeting Rooms" />
              <GalleryCard href="/browse-space" imgSrc="/enevt.jpg" title="Event Spaces" />
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="bg-slate-50">
            <div className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="max-w-xl mb-12 md:mx-auto sm:text-center lg:max-w-2xl">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        What Our <span className="text-blue-600">Clients Say</span>
                    </h2>
                    <p className="text-base text-gray-600 md:text-lg">
                        We are trusted by thousands of professionals and teams. Here's what they have to say about us.
                    </p>
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                    <TestimonialCard 
                        quote="This is the most productive I've been in years. The atmosphere is fantastic and the amenities are top-notch. Highly recommended!"
                        name="Anjali Sharma"
                        title="Freelance Developer"
                        stars={5}
                    />
                    <TestimonialCard 
                        quote="Our startup has grown immensely since we moved here. The flexible plans and vibrant community have been a game-changer for our team."
                        name="Rohan Mehta"
                        title="CEO, Tech Innovate"
                        stars={5}
                    />
                     <TestimonialCard 
                        quote="The perfect blend of professionalism and comfort. The meeting rooms are excellent and the staff is always helpful. It's our go-to place for client meetings."
                        name="Priya Singh"
                        title="Marketing Consultant"
                        stars={4}
                    />
                </div>
            </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="bg-blue-200">
            <div className="container px-6 py-20 mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-700 sm:text-4xl">Ready to Elevate Your Workday?</h2>
                <p className="mt-4 text-lg text-gray-700">Join a community of innovators, creators, and entrepreneurs.</p>
                <Link href="/browse-space" className="inline-block px-10 py-4 mt-8 text-lg font-semibold text-blue-600 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-300">
                    Find Your Space
                </Link>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
              <div className="col-span-full lg:col-span-2">
                <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl" aria-label="logo">
                  Find<span className='text-blue-600'>Your</span><span className='text-blue-600'>Space</span>
                </Link>
                <p className="my-6 text-gray-500 sm:pr-8">
                  More than just a place to work, it's a place to grow and connect.
                </p>
                <div className="flex gap-4">
                  <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500"><FaInstagram size={24} /></a>
                  <a href="#" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500"><FaThreads size={24} /></a>
                </div>
              </div>
              <div>
                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Plans</div>
                <nav className="flex flex-col gap-4">
                  <Link href="/browse-space" className="text-gray-500 transition duration-100 hover:text-blue-500">Private Space</Link>
                  <Link href="/browse-space" className="text-gray-500 transition duration-100 hover:text-blue-500">Coworking Space</Link>
                  <Link href="/browse-space" className="text-gray-500 transition duration-100 hover:text-blue-500">Meeting Rooms</Link>
                </nav>
              </div>
              <div>
                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Company</div>
                <nav className="flex flex-col gap-4">
                  <Link href="/about" className="text-gray-500 transition duration-100 hover:text-blue-500">About</Link>
                  <Link href="/contact" className="text-gray-500 transition duration-100 hover:text-blue-500">Contact</Link>
                  <Link href="#" className="text-gray-500 transition duration-100 hover:text-blue-500">Blog</Link>
                </nav>
              </div>
               <div>
                <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Legal</div>
                <nav className="flex flex-col gap-4">
                  <Link href="#" className="text-gray-500 transition duration-100 hover:text-blue-500">Terms of Service</Link>
                  <Link href="#" className="text-gray-500 transition duration-100 hover:text-blue-500">Privacy Policy</Link>
                </nav>
              </div>
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-gray-400">
              © 2025 OfficeSpace Inc. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Home;