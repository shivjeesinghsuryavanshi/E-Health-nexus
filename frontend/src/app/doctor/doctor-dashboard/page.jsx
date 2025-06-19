'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
    const router = useRouter();
    const [doctorData, setDoctorData] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
        totalAppointments: 0,
        todayAppointments: 0,
        totalPatients: 0,
        monthlyEarnings: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("doctor-token");
                if (!token) {
                    router.push('/doctor-login');
                    return;
                }

                const payload = JSON.parse(atob(token.split('.')[1]));
                const doctorId = payload._id;

                // Fetch doctor data
                const doctorRes = await axios.get(
                    `http://localhost:5000/doctor/getbyid/${doctorId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDoctorData(doctorRes.data);

                // Fetch real appointments for the logged-in doctor
                const appointmentsRes = await axios.get(
                    `http://localhost:5000/slot/doctor-appointments`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const allAppointments = appointmentsRes.data; // These are all appointments for the doctor

                // Filter for today's appointments
                const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

                const todaysAppointments = allAppointments.filter(app => {
                    // Assuming app.date from backend is in 'YYYY-MM-DD' format for this comparison
                    return app.date === today;
                }).map(app => ({
                    id: app._id,
                    patientName: app.patient ? app.patient.name : 'N/A',
                    time: app.time, // Assuming this is in a displayable format like "10:00 AM"
                    date: app.date, // This will be today's date in YYYY-MM-DD
                    status: app.status,
                    // 'type' (e.g., "checkup") is not in slotModel, so it's omitted.
                }));

                setAppointments(todaysAppointments);

                // Set stats: real for appointment counts, mock for others (matching original structure)
                setStats({
                    totalAppointments: allAppointments.length, // Total appointments for this doctor
                    todayAppointments: todaysAppointments.length, // Appointments for today
                    totalPatients: 342, // Kept from original mock data
                    monthlyEarnings: 15750, // Kept from original mock data
                });

            } catch (error) {
                toast.error("Failed to fetch dashboard data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [router]);

    // Enhanced logout with confirmation
    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("doctor-token");
            // Clear any other stored data if needed
            localStorage.removeItem("doctor-data");
            toast.success("Logged out successfully");
            router.push('/dashboard'); // or wherever you want to redirect
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
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
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center overflow-hidden">
                                {doctorData.image ? (
                                    <img src={doctorData.image} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
                                ) : (
                                    <span className="text-white font-semibold text-lg">
                                        {doctorData.name?.[0] || "D"}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Welcome back, Dr. {doctorData.name || "Doctor"}
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    {doctorData.specialization || "Medical Professional"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5l-5-5h5v-12" />
                                </svg>
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200"
                            >
                                Logout
                            </button>
                        </div>
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
                                <p className="text-3xl font-bold text-gray-900">{stats.totalAppointments}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Today's Appointments</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.todayAppointments}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Patients</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalPatients}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Monthly Earnings</p>
                                <p className="text-3xl font-bold text-gray-900">${stats.monthlyEarnings}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Link href="/doctor/appointments" className="group">
                                    <div className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-200 text-center cursor-pointer">
                                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-gray-900 text-sm">Appointments</p>
                                    </div>
                                </Link>

                                <Link href="/doctor/profile" className="group">
                                    <div className="p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-all duration-200 text-center cursor-pointer">
                                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-gray-900 text-sm">Profile</p>
                                    </div>
                                </Link>

                                <Link href="/doctor/slot-management" className="group">
                                    <div className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-200 text-center cursor-pointer">
                                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-gray-900 text-sm">Slots</p>
                                    </div>
                                </Link>

                                <Link href="/store" className="group">
                                    <div className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-200 text-center cursor-pointer">
                                        <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <p className="font-semibold text-gray-900 text-sm">Store</p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Today's Appointments */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
                                <Link href="/doctor/manage-appoinment" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                                    View All
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {appointments.map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold">
                                                    {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                                                <p className="text-sm text-gray-600">{appointment.time} • {appointment.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${appointment.status === 'confirmed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {appointment.status}
                                            </span>
                                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200 transition-all duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm text-gray-900">New appointment booked</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm text-gray-900">Slot updated successfully</p>
                                        <p className="text-xs text-gray-500">4 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-sm text-gray-900">Profile information updated</p>
                                        <p className="text-xs text-gray-500">1 day ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Settings */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Available for appointments</span>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">Email notifications</span>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors focus:outline-none">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1"></span>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">SMS reminders</span>
                                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors focus:outline-none">
                                        <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Help & Support */}
                        <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                            <p className="text-blue-100 text-sm mb-4">
                                Get support from our team or check our documentation.
                            </p>
                            <button className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;