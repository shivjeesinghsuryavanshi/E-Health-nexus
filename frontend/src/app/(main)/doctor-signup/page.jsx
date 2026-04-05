'use client';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Infinity } from 'ldrs/react';
import 'ldrs/react/Infinity.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Password is required')
        .matches(/[a-z]/, 'lowercase letter is required')
        .matches(/[A-Z]/, 'uppercase letter is required')
        .matches(/[0-9]/, 'number is required')
        .matches(/\W/, 'special character is required')
        .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string().required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const Signup = () => {

    const router = useRouter();

    // initializing formik
    const signForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            console.log(values);

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/doctor/add`,
                    values
                );

                console.log(res.data);
                console.log(res.status);
                console.log(res.statusText);
                toast.success('Doctor Registered Successfully!');

                router.push('/doctor-login');
                resetForm();

            } catch (error) {
                toast.error(error?.response?.data?.message);
                console.log(error);
                setSubmitting(false);
            }
        },
        validationSchema: SignupSchema
    });

    const uploadFile = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return toast.error('Please select a file');
        }
        console.log(file);

        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'hoodhogan');
        fd.append('cloud_name', 'ddsnnqpbv');

        axios.post('https://api.cloudinary.com/v1_1/ddsnnqpbv/image/upload', fd)
            .then((result) => {
                console.log(result.data.url);
                signForm.setFieldValue('avatar', result.data.url);
                toast.success('File uploaded successfully!');
            }).catch((err) => {
                console.log(err);
                toast.error('File upload failed!');
            });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
            <div className="mt-7 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-2xl dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-6 sm:p-10">
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                            </svg>
                        </div>
                        <h1 className="block text-3xl font-bold text-gray-800 dark:text-white">Doctor Sign Up</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Already have an account?
                            <Link className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500 ml-1" href="/doctor-login">
                                Sign in here
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
                            Sign up with Google
                        </button>

                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>

                        {/* Form */}
                        <form onSubmit={signForm.handleSubmit}>

                            {/* Profile Picture Upload */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 dark:text-white">Profile Picture</label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-neutral-800 dark:bg-neutral-700 hover:bg-gray-100 dark:border-neutral-600 dark:hover:border-neutral-500 transition-all duration-200">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> profile picture</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" onChange={uploadFile} accept="image/*" />
                                    </label>
                                </div>
                            </div>

                            <div className="grid gap-y-4 md:grid-cols-2 md:gap-x-6">
                                {/* Form Group */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2 dark:text-white">Full Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="name"
                                            onChange={signForm.handleChange}
                                            value={signForm.values.name}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all duration-200"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    {
                                        (signForm.touched.name && signForm.errors.name) && (
                                            <p className="text-xs text-red-600 mt-2">
                                                {signForm.errors.name}
                                            </p>
                                        )
                                    }
                                </div>

                                {/* Form Group */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">Email Address</label>
                                    <div className="relative">
                                        <input type="email" id="email"
                                            onChange={signForm.handleChange}
                                            value={signForm.values.email}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all duration-200"
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    {
                                        (signForm.touched.email && signForm.errors.email) && (
                                            <p className="text-xs text-red-600 mt-2">
                                                {signForm.errors.email}
                                            </p>
                                        )
                                    }
                                </div>

                                {/* Form Group */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium mb-2 dark:text-white">Password</label>
                                    <div className="relative">
                                        <input type="password" id="password"
                                            onChange={signForm.handleChange}
                                            value={signForm.values.password}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all duration-200"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    {
                                        (signForm.touched.password && signForm.errors.password) && (
                                            <p className="text-xs text-red-600 mt-2">
                                                {signForm.errors.password}
                                            </p>
                                        )
                                    }
                                </div>

                                {/* Form Group */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 dark:text-white">Confirm Password</label>
                                    <div className="relative">
                                        <input type="password" id="confirmPassword"
                                            onChange={signForm.handleChange}
                                            value={signForm.values.confirmPassword}
                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 transition-all duration-200"
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                    {
                                        (signForm.touched.confirmPassword && signForm.errors.confirmPassword) && (
                                            <p className="text-xs text-red-600 mt-2">
                                                {signForm.errors.confirmPassword}
                                            </p>
                                        )
                                    }
                                </div>

                                {/* Checkbox */}
                                <div className="flex items-center">
                                    <div className="flex">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                    </div>
                                    <div className="ms-3">
                                        <label htmlFor="remember-me" className="text-sm dark:text-white">I accept the <a className="text-blue-600 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium dark:text-blue-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>

                                <button
                                    disabled={signForm.isSubmitting}
                                    type="submit"
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-hidden focus:from-blue-700 focus:to-blue-800 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    {
                                        signForm.isSubmitting ? (
                                            <Infinity
                                                size="30"
                                                speed="2.5"
                                                color="white"
                                            />
                                        ) : 'Create Doctor Account'
                                    }
                                </button>
                            </div>
                        </form>
                        {/* End Form */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup