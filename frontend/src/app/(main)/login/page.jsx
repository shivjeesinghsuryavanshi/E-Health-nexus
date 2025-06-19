'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Password is required'),
});

const UserLogin = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,
          values
        );
        setStatus({ success: true, message: 'Login successful!' });
        localStorage.setItem('user-token', res.data.token);
        toast.success('Login successful!');

        // Redirect to dashboard page
        router.push('/user-dashboard');

      } catch (err) {
        setStatus({
          success: false,
          message: err.response?.data?.message || 'Login failed',
        });
        toast.error(err.response?.data?.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your E-Health Nexus account</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Status Message */}
            {formik.status && (
              <div
                className={`p-4 rounded-lg text-center ${formik.status.success
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                  }`}
              >
                {formik.status.message}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${formik.touched.email && formik.errors.email
                    ? 'border-red-300'
                    : 'border-gray-300'
                  }`}
                placeholder="Enter your email"
                required
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${formik.touched.password && formik.errors.password
                    ? 'border-red-300'
                    : 'border-gray-300'
                  }`}
                placeholder="Enter your password"
                required
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-teal-600 hover:text-teal-700">
                Forgot your password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {formik.isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full mb-6 py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          {/* Footer Links */}
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/(main)/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                Sign up
              </Link>
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                ← Back to Home
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/doctor/login" className="text-gray-500 hover:text-gray-700">
                Doctor Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;