'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('appointments');

    // Mock user data (in real app, this would come from API/database)
    const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        address: "123 Main Street, New York, NY 10001",
        emergencyContact: "Jane Doe - +1 (555) 987-6543",
        bloodType: "O+",
        allergies: "Penicillin, Shellfish",
        memberSince: "2023-01-15",
        profileImage: "/api/placeholder/100/100"
    };

    // Mock appointments data
    const appointments = [
        {
            id: 1,
            doctorName: "Dr. Sarah Wilson",
            specialty: "Cardiologist",
            date: "2025-06-15",
            time: "10:00 AM",
            status: "Confirmed",
            type: "In-person",
            location: "Room 205, Medical Center",
            reason: "Regular checkup"
        },
        {
            id: 2,
            doctorName: "Dr. Michael Chen",
            specialty: "Dermatologist",
            date: "2025-06-10",
            time: "2:30 PM",
            status: "Completed",
            type: "Video call",
            location: "Online",
            reason: "Skin consultation"
        },
        {
            id: 3,
            doctorName: "Dr. Emily Johnson",
            specialty: "General Physician",
            date: "2025-06-20",
            time: "11:15 AM",
            status: "Pending",
            type: "In-person",
            location: "Room 101, Medical Center",
            reason: "Follow-up visit"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="bg-teal-600 p-2 rounded-lg mr-3">
                                    <span className="text-white font-bold text-xl">+</span>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">E Health Nexus</h1>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/user/book-appointment" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                                Book Appointment
                            </Link>
                            <Link href="/" className="text-gray-600 hover:text-gray-800">
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            {/* Profile Picture */}
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">
                                        {userData.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">{userData.name}</h3>
                                <p className="text-gray-600">{userData.email}</p>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('appointments')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                        activeTab === 'appointments' 
                                            ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        My Appointments
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                        activeTab === 'profile' 
                                            ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Profile
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('medical')}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                        activeTab === 'medical' 
                                            ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500' 
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Medical Records
                                    </div>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Appointments Tab */}
                        {activeTab === 'appointments' && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Appointments</h2>
                                    
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-green-500 rounded-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-2xl font-bold text-green-700">
                                                        {appointments.filter(apt => apt.status === 'Confirmed').length}
                                                    </p>
                                                    <p className="text-green-600">Confirmed</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-yellow-500 rounded-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-2xl font-bold text-yellow-700">
                                                        {appointments.filter(apt => apt.status === 'Pending').length}
                                                    </p>
                                                    <p className="text-yellow-600">Pending</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <div className="p-2 bg-blue-500 rounded-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-2xl font-bold text-blue-700">
                                                        {appointments.filter(apt => apt.status === 'Completed').length}
                                                    </p>
                                                    <p className="text-blue-600">Completed</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Appointments List */}
                                    <div className="space-y-4">
                                        {appointments.map((appointment) => (
                                            <div key={appointment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mr-4">
                                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctorName}</h3>
                                                            <p className="text-gray-600">{appointment.specialty}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                                        {appointment.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500">Date</p>
                                                        <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Time</p>
                                                        <p className="font-medium">{appointment.time}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Type</p>
                                                        <p className="font-medium">{appointment.type}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500">Location</p>
                                                        <p className="font-medium">{appointment.location}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-gray-500 text-sm">Reason</p>
                                                    <p className="font-medium">{appointment.reason}</p>
                                                </div>
                                                {appointment.status === 'Confirmed' && (
                                                    <div className="mt-4 flex space-x-3">
                                                        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                                                            Reschedule
                                                        </button>
                                                        <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{new Date(userData.dateOfBirth).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.gender}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{new Date(userData.memberSince).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.address}</p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.emergencyContact}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Medical Records Tab */}
                        {activeTab === 'medical' && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                            <p className="text-red-800 font-semibold">{userData.bloodType}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Known Allergies</label>
                                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <p className="text-yellow-800">{userData.allergies}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Medical History</h3>
                                    <div className="space-y-4">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Annual Physical Checkup</h4>
                                                    <p className="text-gray-600 text-sm">Dr. Sarah Wilson - Cardiologist</p>
                                                    <p className="text-gray-500 text-sm">June 10, 2024</p>
                                                </div>
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Normal</span>
                                            </div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Skin Consultation</h4>
                                                    <p className="text-gray-600 text-sm">Dr. Michael Chen - Dermatologist</p>
                                                    <p className="text-gray-500 text-sm">May 15, 2024</p>
                                                </div>
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Follow-up</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors mr-4">
                                        Update Medical Info
                                    </button>
                                    <button className="border border-teal-600 text-teal-600 px-6 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                                        Download Records
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;