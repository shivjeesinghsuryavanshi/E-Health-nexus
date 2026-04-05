'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const UserAppointments = () => {
    const [bookedSlots, setBookedSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');
    const [userData, setUserData] = useState({});

    // Get user token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("user-token") : null;

    useEffect(() => {
        if (token) {
            fetchUserData();
            fetchBookedSlots();
        } else {
            setLoading(false);
        }
    }, [token]);

    const fetchUserData = async () => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUserData({ name: payload.name || 'User' });
        } catch (error) {
            console.error('Error parsing token:', error);
        }
    };

    const fetchBookedSlots = async () => {
        try {
            // Mock data for demo - replace with actual API call
            const mockData = [
                {
                    _id: '1',
                    date: '2025-06-06',
                    time: '10:00 AM - 12:00 PM',
                    status: 'confirmed',
                    doctor: {
                        _id: 'doc1',
                        name: 'Dr. Sarah Johnson',
                        speciality: 'Cardiology',
                        location: 'City Hospital',
                        fee: 750
                    },
                    prescription: 'Take rest and prescribed medication'
                },
                {
                    _id: '2',
                    date: '2025-06-08',
                    time: '2:00 PM - 4:00 PM',
                    status: 'pending',
                    doctor: {
                        _id: 'doc2',
                        name: 'Dr. Michael Brown',
                        speciality: 'Dermatology',
                        location: 'Medical Center',
                        fee: 600
                    }
                },
                {
                    _id: '3',
                    date: '2025-06-03',
                    time: '9:00 AM - 11:00 AM',
                    status: 'completed',
                    doctor: {
                        _id: 'doc3',
                        name: 'Dr. Emily Davis',
                        speciality: 'General Medicine',
                        location: 'Health Clinic',
                        fee: 500
                    },
                    prescription: 'Complete blood test recommended. Follow up in 2 weeks.'
                }
            ];
            setBookedSlots(mockData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching booked slots:', error);
            toast.error('Failed to load your appointments');
            setLoading(false);
        }
    };

    const cancelSlot = async (slotId) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) {
            return;
        }

        try {
            // API call would go here
            setBookedSlots(bookedSlots.map(slot =>
                slot._id === slotId ? { ...slot, status: 'cancelled' } : slot
            ));
            toast.success('Appointment cancelled successfully!');
        } catch (error) {
            console.error('Error cancelling slot:', error);
            toast.error('Failed to cancel appointment');
        }
    };

    const filteredSlots = bookedSlots.filter(slot => {
        if (filterStatus === 'all') return true;
        return slot.status === filterStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getUpcomingSlots = () => {
        const today = new Date();
        return bookedSlots.filter(slot => {
            const slotDate = new Date(slot.date);
            return slotDate >= today && slot.status !== 'cancelled' && slot.status !== 'completed';
        });
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto">
                    <div className="mb-6">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
                    <p className="text-gray-600 mb-6">You need to login to view your appointments</p>
                    <Link href="/login">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                            Login to Continue
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your appointments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <Link href="/user/dashboard" className="text-gray-600 hover:text-gray-900">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                                <p className="text-gray-600 text-sm">Welcome back, {userData.name}</p>
                            </div>
                        </div>
                        <Link href="/store">
                            <button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Book New Appointment
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Appointments</p>
                                <p className="text-3xl font-bold text-gray-900">{bookedSlots.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Upcoming</p>
                                <p className="text-3xl font-bold text-gray-900">{getUpcomingSlots().length}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Completed</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {bookedSlots.filter(slot => slot.status === 'completed').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Cancelled</p>
                                <p className="text-3xl font-bold text-gray-900">
                                    {bookedSlots.filter(slot => slot.status === 'cancelled').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Appointments</h3>
                    <div className="flex flex-wrap gap-3">
                        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all duration-200 ${filterStatus === status
                                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status === 'all' ? 'All Appointments' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appointments List */}
                {filteredSlots.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="mb-6">
                            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {filterStatus === 'all' ? 'No appointments found' : `No ${filterStatus} appointments`}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {filterStatus === 'all'
                                ? 'You haven\'t booked any appointments yet.'
                                : `You don't have any ${filterStatus} appointments.`
                            }
                        </p>
                        {filterStatus === 'all' && (
                            <Link href="/store">
                                <button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Book Your First Appointment
                                </button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredSlots.map((slot) => (
                            <div key={slot._id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                                    {/* Appointment Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold text-lg">
                                                        {slot.doctor?.name?.split(' ').map(n => n[0]).join('') || 'DR'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {slot.doctor?.name || 'Doctor Name'}
                                                    </h3>
                                                    <p className="text-gray-600">{slot.doctor?.speciality || 'General Medicine'}</p>
                                                </div>
                                            </div>
                                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(slot.status)}`}>
                                                {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Date</p>
                                                    <p className="text-sm font-semibold text-gray-900">{formatDate(slot.date)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Time</p>
                                                    <p className="text-sm font-semibold text-gray-900">{slot.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                </svg>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Fee</p>
                                                    <p className="text-sm font-semibold text-gray-900">₹{slot.doctor?.fee || '500'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl mb-4">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-xs text-blue-600 font-medium">Location</p>
                                                <p className="text-sm font-semibold text-blue-900">{slot.doctor?.location || 'Hospital'}</p>
                                            </div>
                                            <div className="ml-auto">
                                                <p className="text-xs text-gray-500 font-medium">Booking ID</p>
                                                <p className="text-sm font-mono font-semibold text-gray-900">#{slot._id?.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>

                                        {slot.prescription && (
                                            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                                                <div className="flex items-center mb-2">
                                                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    <p className="font-semibold text-green-700">Prescription</p>
                                                </div>
                                                <p className="text-green-800 ml-7">{slot.prescription}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-3 min-w-[200px]">
                                        {slot.status === 'pending' && (
                                            <button
                                                onClick={() => cancelSlot(slot._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Cancel Appointment
                                            </button>
                                        )}

                                        <Link href={`/view-doctor/${slot.doctor?._id}`}>
                                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                View Doctor
                                            </button>
                                        </Link>

                                        {(slot.status === 'completed' || slot.prescription) && (
                                            <button
                                                onClick={() => window.print()}
                                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                            >
                                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                </svg>
                                                Print Prescription
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/user/dashboard" className="group">
                            <div className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 text-center cursor-pointer">
                                <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 002 2h4a2 2 0 002-2V7a2 2 0 00-2-2H9a2 2 0 00-2 2v4H5V7z" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">Dashboard</p>
                            </div>
                        </Link>

                        <Link href="/store" className="group">
                            <div className="p-4 rounded-xl bg-teal-50 hover:bg-teal-100 transition-all duration-200 text-center cursor-pointer">
                                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">Browse Doctors</p>
                            </div>
                        </Link>

                        <Link href="/" className="group">
                            <div className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-200 text-center cursor-pointer">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">Home</p>
                            </div>
                        </Link>

                        <button
                            onClick={() => {
                                localStorage.removeItem("user-token");
                                window.location.href = "/";
                            }}
                            className="group"
                        >
                            <div className="p-4 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-200 text-center cursor-pointer">
                                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-gray-900 text-sm">Logout</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAppointments;