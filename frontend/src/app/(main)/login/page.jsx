'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
        router.push('/user/dashboard');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
        {formik.status && (
          <div
            className={`mb-4 text-center ${formik.status.success ? "text-green-600" : "text-red-600"}`}
          >
            {formik.status.message}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded transition"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default UserLogin;