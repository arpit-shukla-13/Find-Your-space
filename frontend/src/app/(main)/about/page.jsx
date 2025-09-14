import React from "react";
import Navbar from "../navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            About <span className="text-blue-700">Us</span>
          </h1>
        </header>
        <main className="max-w-4xl mx-auto text-lg text-gray-600 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-black mb-4">
              Our <span className="text-blue-700">Company</span>
            </h2>
            <p>
              At Office Space, we're dedicated to revolutionizing the way you
              work. We understand that the traditional office model doesn't
              always suit the diverse needs of modern businesses and
              professionals. That's why we've crafted a flexible office space
              solution that adapts to you.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-black mb-4">
              Our <span className="text-blue-700">Mission</span>
            </h2>
            <p>
              Our mission is simple: to provide a dynamic workspace that fosters
              productivity, collaboration, and innovation. We believe that where
              you work should empower you to do your best work, whether you're a
              freelancer, startup, or established corporation.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-black mb-4">
              Our <span className="text-blue-700">Spaces</span>
            </h2>
            <p>
              From private offices and dedicated desks to shared coworking areas and meeting rooms, we have a space that's perfect for you. Our thoughtfully designed environments are equipped with high-speed internet, ergonomic furniture, and everything else you need to thrive.
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default About;