'use client'
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const Contact = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      setCurrentUser(JSON.parse(userSession).user);
    }
  }, []);

  const contactForm = useFormik({
    initialValues: {
      name: currentUser ? currentUser.name : "",
      email: currentUser ? currentUser.email : "",
      subject: "",
      message: "",
    },
    enableReinitialize: true,
    validationSchema: ContactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:5500/contact/add', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          toast.success("Message Sent Successfully");
          resetForm();
        } else {
          toast.error("Failed to send message");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred.");
      }
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Contact <span className='text-blue-700'>Us</span>
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            We’d love to hear from you. Chat to our friendly team.
          </p>
        </div>
        
        <div className="mx-auto mt-12 w-full max-w-[550px]">
          <form onSubmit={contactForm.handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                onChange={contactForm.handleChange}
                value={contactForm.values.name}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {contactForm.touched.name && contactForm.errors.name && <small className="text-red-500">{contactForm.errors.name}</small>}
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@domain.com"
                onChange={contactForm.handleChange}
                value={contactForm.values.email}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {contactForm.touched.email && contactForm.errors.email && <small className="text-red-500">{contactForm.errors.email}</small>}
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="mb-3 block text-base font-medium text-[#07074D]">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter your subject"
                onChange={contactForm.handleChange}
                value={contactForm.values.subject}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {contactForm.touched.subject && contactForm.errors.subject && <small className="text-red-500">{contactForm.errors.subject}</small>}
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
                Message
              </label>
              <textarea
                rows={4}
                id="message"
                placeholder="Type your message"
                onChange={contactForm.handleChange}
                value={contactForm.values.message}
                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {contactForm.touched.message && contactForm.errors.message && <small className="text-red-500">{contactForm.errors.message}</small>}
            </div>
            <div>
              <button type='submit' className="w-full btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact;