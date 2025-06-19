'use client';
import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const DoctorLogin = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/doctor/authenticate",
                    values
                );
                toast.success("Login successful!");
                localStorage.setItem("doctor-token", res.data.token);
                router.push("/doctor/doctor-dashboard"); // Redirect to slot-management
            } catch (err) {
                toast.error(err.response?.data?.message || "Login failed");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-3xl shadow-2xl dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                            </svg>
                        </div>
                        <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">Doctor Login</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Don't have an account?
                            <Link className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 ml-1" href="/doctor-signup">
                                Register here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-5">
                        <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 transition-all duration-200">
                            <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                                <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                                <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                                <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                                <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                            </svg>
                            Sign in with Google
                        </button>

                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>

                        {/* Form */}
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid gap-y-4">
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all duration-200"
                                            placeholder="Enter your email address"
                                            required
                                        />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Group */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-white">Password</label>
                                        <a className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">Forgot password?</a>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all duration-200"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                    </div>
                                    <div className="ms-3">
                                        <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-hidden focus:from-blue-700 focus:to-blue-800 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    {formik.isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </>
                                    ) : 'Sign in as Doctor'}
                                </button>

                                <div className="text-center">
                                    <Link href="/" className="inline-flex items-center gap-x-1 text-sm text-gray-600 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorLogin;