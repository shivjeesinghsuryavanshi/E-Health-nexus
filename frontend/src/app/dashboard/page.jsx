'use client';
import React from 'react';
import Link from 'next/link';

const DashboardSelection = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-600 to-blue-600 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Welcome to E-Health Nexus
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Choose your dashboard to access personalized healthcare services and manage your medical needs effectively
                    </p>
                </div>

                {/* Dashboard Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* User Dashboard Card */}
                    <div className="group cursor-pointer">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-teal-200 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-transparent rounded-bl-full opacity-50"></div>

                            <div className="text-center relative z-10">
                                {/* Icon */}
                                <div className="mx-auto w-28 h-28 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                    Patient Dashboard
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    Book appointments, view medical records, manage prescriptions, and connect with healthcare providers from one convenient location.
                                </p>

                                {/* Features */}
                                <div className="text-left mb-8 space-y-4">
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Book & manage appointments</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">View medical history</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Access prescriptions</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Find nearby doctors</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-teal-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-600">500+</div>
                                        <div className="text-sm text-gray-600">Doctors</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-teal-600">10k+</div>
                                        <div className="text-sm text-gray-600">Patients</div>
                                    </div>
                                </div>

                                {/* Button */}
                                <div>
                                    <Link href="/login">
                                        <button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                            Login as Patient
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Dashboard Card */}
                    <div className="group cursor-pointer">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent hover:border-blue-200 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>

                            <div className="text-center relative z-10">
                                {/* Icon */}
                                <div className="mx-auto w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                                    </svg>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                    Doctor Dashboard
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                    Manage your practice, schedule appointments, maintain patient records, and provide quality healthcare services efficiently.
                                </p>

                                {/* Features */}
                                <div className="text-left mb-8 space-y-4">
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Manage appointments</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Patient records access</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Prescription management</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-medium">Schedule & slot management</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-blue-50 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">98%</div>
                                        <div className="text-sm text-gray-600">Success Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                                        <div className="text-sm text-gray-600">Support</div>
                                    </div>
                                </div>

                                {/* Button */}
                                <div>
                                    <Link href="/doctor-signup">
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                            Login as Doctor
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="text-center mt-16 space-y-6">
                    {/* Quick Access Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/store" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Browse Doctors
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/signup" className="text-gray-600 hover:text-gray-800 transition-colors">
                            Create Account
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
                            About Us
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-200">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-teal-600 mb-1">500+</div>
                            <div className="text-sm text-gray-600">Expert Doctors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-1">10k+</div>
                            <div className="text-sm text-gray-600">Happy Patients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">50k+</div>
                            <div className="text-sm text-gray-600">Appointments</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-1">24/7</div>
                            <div className="text-sm text-gray-600">Support</div>
                        </div>
                    </div>

                    {/* Security Badge */}
                    <div className="flex justify-center items-center space-x-2 text-gray-500 text-sm mt-8">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Secure & HIPAA Compliant Healthcare Platform</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSelection;