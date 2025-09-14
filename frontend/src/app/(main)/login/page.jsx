'use client'
import React from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { API_URL } from '@/app/config';

// Login ke liye validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required("Password is Required"),
});

// Component ka naam PascalCase mein hona chahiye
const Login = () => {
  const router = useRouter();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${API_URL}/user/authenticate`, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (response.status === 200) {
          toast.success(data.message);
          
          // data object ko sessionStorage mein save karein
          if (data.user.role === 'admin') {
            sessionStorage.setItem('admin', JSON.stringify(data));
            router.push('/admin/dashboard');
          } else {
            sessionStorage.setItem('user', JSON.stringify(data));
            router.push('/user/profile');
          }
        } else {
          toast.error(data.message || 'Invalid Credentials');
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  return (
    <section className="bg-gray-50">
      <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col">
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-5xl">
              Unlock your Workspace,
              <span className="text-blue-700"> Flex Space Login</span>
            </h1>
            <p className="mt-4 text-base font-medium text-gray-700">
              Your Gateway to Productivity.
            </p>
          </div>
          <div className="p-2 border bg-white rounded-3xl shadow-lg">
            <div className="p-10">
              <form onSubmit={loginForm.handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your email address"
                      onChange={loginForm.handleChange}
                      value={loginForm.values.email}
                      className="form-input"
                    />
                    {loginForm.touched.email && loginForm.errors.email && (
                      <small className="text-red-500">{loginForm.errors.email}</small>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      onChange={loginForm.handleChange}
                      value={loginForm.values.password}
                      className="form-input"
                      placeholder="Type password here..."
                      type="password"
                    />
                    {loginForm.touched.password && loginForm.errors.password && (
                      <small className="text-red-500">{loginForm.errors.password}</small>
                    )}
                  </div>
                  <div className="col-span-full">
                    <button type="submit" className="w-full btn-primary">
                      Log in
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="flex mx-auto text-sm font-medium leading-tight text-center text-black">
                    <Link href="/resetPassword" className='text-blue-500 hover:underline'>Forgot password?</Link>
                    <Link className="ml-auto text-blue-500 hover:underline" href="/signup">
                      Sign up now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;