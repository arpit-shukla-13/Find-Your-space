"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { API_URL } from '@/app/config';

// Password reset ke liye validation schema
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('New Password is required')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

// Component ka naam PascalCase mein
const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP, 3: Reset Password

  // Email check karne aur OTP bhejne ka function
  const handleSendOtp = async () => {
    try {
      // Pehle check karein ki email registered hai ya nahi
      const checkEmailRes = await fetch(`${API_URL}/user/getbymail/${email}`);
      if (checkEmailRes.status !== 200) {
        toast.error("Email is not registered.");
        return;
      }
      
      // Agar email registered hai to OTP bhejein
      const otpRes = await fetch(`${API_URL}/util/sendotp`, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (otpRes.status === 201) {
        toast.success("OTP sent successfully to your email!");
        setStep(2); // Agle step par jaayein
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };
  
  // OTP verify karne ka function
  const handleVerifyOtp = async () => {
    try {
      const res = await fetch(`${API_URL}/util/verifyotp/${email}/${otp}`);
      if (res.status === 200) {
        toast.success("OTP Verified!");
        setStep(3); // Password reset form dikhayein
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during verification.");
    }
  };
  
  // Formik ka istemal naye password ke liye
  const resetForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      try {
        // Naye secure endpoint par request bhejein
        const res = await fetch(`${API_URL}/user/reset-password`, {
          method: "POST",
          body: JSON.stringify({ email: email, newPassword: values.password }),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          toast.success("Password updated successfully!");
          router.push("/login");
        } else {
          toast.error("Failed to update password.");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred.");
      }
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Reset <span className="text-blue-700">Password</span>
        </h2>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your registered email"
              />
            </div>
            <button onClick={handleSendOtp} type="button" className="w-full btn-primary">
              Send OTP
            </button>
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-input"
                placeholder="Check your email for the OTP"
              />
            </div>
            <button onClick={handleVerifyOtp} type="button" className="w-full btn-primary">
              Verify OTP
            </button>
          </div>
        )}

        {/* Step 3: Reset Password Form */}
        {step === 3 && (
          <form onSubmit={resetForm.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                id="password"
                type="password"
                value={resetForm.values.password}
                onChange={resetForm.handleChange}
                className="form-input"
              />
              {resetForm.touched.password && resetForm.errors.password && (
                <small className="text-red-500">{resetForm.errors.password}</small>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={resetForm.values.confirmPassword}
                onChange={resetForm.handleChange}
                className="form-input"
              />
              {resetForm.touched.confirmPassword && resetForm.errors.confirmPassword && (
                <small className="text-red-500">{resetForm.errors.confirmPassword}</small>
              )}
            </div>
            <button type="submit" className="w-full btn-primary">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;