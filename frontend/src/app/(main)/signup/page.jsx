"use client";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { API_URL } from '@/app/config';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(4, "Name is too short").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
    .matches(/[0-9]/, 'Password must include at least one number')
    .matches(/\W/, 'Password must include at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

// Component ka naam PascalCase mein
const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      // confirmPassword ko backend mein bhejne se pehle hata dein
      const { confirmPassword, ...dataToSend } = values;

      try {
        const response = await fetch(`${API_URL}/user/add`, {
          method: 'POST',
          body: JSON.stringify(dataToSend),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (response.status === 200) {
          toast.success(data.message);
          resetForm();
          router.push('/login');
        } else {
          toast.error(data.message || "Sign up failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      }
    },
  });

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl flex">
        <div className="w-1/2 p-12">
          <h1 className="mb-8 text-black text-center text-4xl font-bold">
            Sign <span className="text-blue-700">up</span>
          </h1>
          <form onSubmit={signupForm.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" onChange={signupForm.handleChange} value={signupForm.values.name} className="form-input" />
              {signupForm.touched.name && signupForm.errors.name && <small className="text-red-500">{signupForm.errors.name}</small>}
            </div>
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" onChange={signupForm.handleChange} value={signupForm.values.email} className="form-input" />
              {signupForm.touched.email && signupForm.errors.email && <small className="text-red-500">{signupForm.errors.email}</small>}
            </div>
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" onChange={signupForm.handleChange} value={signupForm.values.password} className="form-input" />
              {signupForm.touched.password && signupForm.errors.password && <small className="text-red-500">{signupForm.errors.password}</small>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" onChange={signupForm.handleChange} value={signupForm.values.confirmPassword} className="form-input" />
              {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && <small className="text-red-500">{signupForm.errors.confirmPassword}</small>}
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-6 text-center">
            Already Registered?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">Login Here</Link>
          </p>
        </div>
        <div className="w-1/2 hidden lg:block">
            <img src="/signup.svg" alt="Signup Illustration" className="h-full w-full object-cover rounded-r-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Signup;