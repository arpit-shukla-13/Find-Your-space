"use client";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import StarRatings from 'react-star-ratings';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  comment: Yup.string().required("Comment is required").min(10, "Comment should be at least 10 characters long"),
});

const Feedback = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      setCurrentUser(JSON.parse(userSession).user);
    }
  }, []);

  const feedbackForm = useFormik({
    initialValues: {
      name: currentUser ? currentUser.name : "",
      email: currentUser ? currentUser.email : "",
      comment: "",
      rating: 0,
    },
    enableReinitialize: true,
    validationSchema: FeedbackSchema,
    onSubmit: async (values, { resetForm }) => {
      values.rating = rating;
      if (rating === 0) {
        toast.error("Please provide a rating before submitting.");
        return;
      }
      try {
        const response = await fetch("http://localhost:5500/feedback/add", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("Feedback submitted successfully! Thank you.");
          resetForm();
          setRating(0);
        } else {
          toast.error("Failed to submit feedback. Please try again.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred.");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="text-center">
        <h2 className="text-3xl text-gray-800 font-bold sm:text-4xl">
          Feed<span className="text-blue-700">back</span>
        </h2>
      </div>
      <div className="mt-12 p-4 relative z-10 bg-white border rounded-xl sm:p-10 shadow-lg">
        <form onSubmit={feedbackForm.handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">Full name</label>
            <input
              type="text"
              id="name"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Full name"
              onChange={feedbackForm.handleChange}
              value={feedbackForm.values.name}
            />
            {feedbackForm.touched.name && feedbackForm.errors.name && (
              <small className="text-red-500">{feedbackForm.errors.name}</small>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email address</label>
            <input
              type="email"
              id="email"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Email address"
              onChange={feedbackForm.handleChange}
              value={feedbackForm.values.email}
            />
            {feedbackForm.touched.email && feedbackForm.errors.email && (
              <small className="text-red-500">{feedbackForm.errors.email}</small>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="comment" className="block mb-2 text-sm font-medium">Comment</label>
            <textarea
              id="comment"
              rows={4}
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Leave your comment here..."
              onChange={feedbackForm.handleChange}
              value={feedbackForm.values.comment}
            />
            {feedbackForm.touched.comment && feedbackForm.errors.comment && (
              <small className="text-red-500">{feedbackForm.errors.comment}</small>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Your Rating</label>
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              changeRating={setRating}
              numberOfStars={5}
              name='rating'
              starDimension="30px"
              starSpacing="5px"
            />
          </div>
          <div className="mt-6 grid">
            <button
              type="submit"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;