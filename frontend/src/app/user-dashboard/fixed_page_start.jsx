"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DoctorCard from '@/components/DoctorCard';
import toast from 'react-hot-toast';

export default function UserDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('doctors');
    const [userData, setUserData] = useState({
        name: 'user',
        email: '',
        phone: '123-456-7890',
        address: '123 Street, City',
        dateOfBirth: '01/01/1990',
        bloodType: 'A+',
        allergies: 'None',
        medications: 'None',
        medicalConditions: 'None',
        emergency_contact: {
            name: 'user',
            relationship: 'Spouse',
            phone: '987-654-3210'
        }
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [consultationType, setConsultationType] = useState('in-person');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        // Check if user is logged in and redirect if not
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            // Instead of immediately redirecting, set a flag to show a login prompt
            setIsAuthenticated(false);
        } else {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && parsedUser._id) {
                    setUserData(parsedUser);
                    setIsAuthenticated(true);
                    // Only fetch appointments if we have a valid user
                    fetchAppointments();
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Failed to parse user data:', error);
                setIsAuthenticated(false);
            }
        }

        // Fetch doctors regardless of authentication status
        fetchDoctors();
    }, []);

    // Update the fetchAppointments function to handle missing user data gracefully
    const fetchAppointments = async () => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
                console.log('No user data found in localStorage');
                setAppointments([]);
                return;
            }

            try {
                const user = JSON.parse(storedUser);
                if (!user || !user._id) {
                    console.log('User data is invalid or missing ID');
                    setAppointments([]);
                    return;
                }

                console.log('Fetching appointments for user:', user._id);
                const response = await fetch(`http://localhost:5000/slot/patient/${user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add token if available for authentication
                        ...(user.token && { 'Authorization': `Bearer ${user.token}` })
                    },
                });

                if (!response.ok) {
                    console.error(`Error response: ${response.status} ${response.statusText}`);
                    const text = await response.text();
                    console.error('Response text:', text);
                    throw new Error(`Server returned ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Received appointments:', data);
                setAppointments(data);
            } catch (parseError) {
                console.error('Error parsing user data:', parseError);
                setAppointments([]);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(`Failed to load appointments: ${error.message || 'Network error'}`);
            setAppointments([]);
        }
    };

    // Helper function for fetch with timeout
    const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    };

    const fetchDoctors = async () => {
        try {
            console.log('Fetching doctors list...');
            setDoctors([]); // Clear any previous data

            let response;
            try {
                // Add timeout to the fetch to prevent hanging requests
                response = await fetchWithTimeout('http://localhost:5000/doctor/getall', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            } catch (initialError) {
                console.log('Initial fetch failed, trying alternative URL:', initialError);
                try {
                    // Try alternative URL (if you have one deployed elsewhere)
                    response = await fetchWithTimeout('http://127.0.0.1:5000/doctor/getall', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                } catch (fallbackError) {
                    console.error('All fetch attempts failed:', fallbackError);
                    toast.error('Could not connect to the server. Please check if it is running.');
                    setDoctors([]);
                    return;
                }
            }

            if (!response.ok) {
                console.error(`Error response: ${response.status} ${response.statusText}`);
                const text = await response.text();
                console.error('Response text:', text);

                // For specific error codes, provide more helpful messages
                if (response.status === 404) {
                    toast.error("API endpoint not found. Please make sure the server is running correctly.");
                } else if (response.status >= 500) {
                    toast.error("Server error. Please try again later or contact support.");
                } else {
                    toast.error(`Error: ${response.status}: ${response.statusText}`);
                }
                setDoctors([]);
                return;
            }

            const data = await response.json();
            console.log('Received doctors:', data);

            if (!Array.isArray(data)) {
                console.error('Received non-array data:', data);
                toast.error('Invalid data format received from server');
                setDoctors([]);
                return;
            }

            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);

            // Check for specific network-related errors
            if (error.name === 'AbortError') {
                toast.error('Request timed out. Server may be down or unreachable.');
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                toast.error('Network error. Check if the backend server is running.');
            } else {
                toast.error(`Failed to load doctors: ${error.message || 'Unknown error'}`);
            }

            // Provide empty array as fallback
            setDoctors([]);
        }
    }; const openBookingModal = async (doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);

        try {
            // Fetch available slots for the selected doctor
            const response = await fetchWithTimeout(`http://localhost:5000/slot/available/${doctor._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            // Log the full response for debugging
            const contentType = response.headers.get('content-type');
            console.log('Response content type:', contentType);

            if (!response.ok) {
                const text = await response.text();
                console.error('Error response:', text);
                throw new Error(`Failed to load slots: ${response.status}`);
            }

            // Check if response is JSON
            if (!contentType || !contentType.includes('application/json')) {
                console.error('Invalid content type:', contentType);
                throw new Error('Server did not return JSON');
            }

            const data = await response.json();
            console.log('Received slots:', data);

            if (!Array.isArray(data)) {
                console.error('Invalid data format:', data);
                throw new Error('Invalid data format received');
            }

            setAvailableSlots(data);
        } catch (error) {
            console.error('Error fetching available slots:', error);
            toast.error(`Failed to load available slots: ${error.message}`);
            setAvailableSlots([]);
        }
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setSelectedDoctor(null);
        setSelectedSlot(null);
        setConsultationType('in-person');
    };

    const handleBookSlot = async () => {
        if (!selectedSlot) {
            toast.error('Please select a slot');
            return;
        }

        setIsLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user._id) {
                toast.error('User not logged in');
                setIsLoading(false);
                return;
            }

            const response = await fetchWithTimeout(`http://localhost:5000/slot/book/${selectedSlot._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(user.token && { 'Authorization': `Bearer ${user.token}` })
                },
                body: JSON.stringify({
                    patientId: user._id,
                    consultationType: consultationType
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Appointment booked successfully');
                closeBookingModal();
                fetchAppointments(); // Refresh appointments
            } else {
                toast.error(data.message || 'Failed to book appointment');
            }
        } catch (error) {
            console.error('Error booking slot:', error);
            toast.error('Failed to book appointment');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) {
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await fetchWithTimeout(`http://localhost:5000/slot/cancel/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(user && user.token ? { 'Authorization': `Bearer ${user.token}` } : {})
                }
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Appointment cancelled successfully');
                fetchAppointments(); // Refresh appointments
            } else {
                toast.error(data.message || 'Failed to cancel appointment');
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            toast.error('Failed to cancel appointment');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getAppointmentStatusClass = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    // Add a debug function to test connectivity
    const debugApiConnection = async () => {
        try {
            toast.info("Testing API connection...");

            // Test the base endpoint
            try {
                const baseResponse = await fetchWithTimeout('http://localhost:5000/', {}, 5000);
                const baseText = await baseResponse.text();
                console.log('Base endpoint response:', baseText);
                toast.success('Successfully connected to server base endpoint');
            } catch (baseError) {
                console.error('Base endpoint error:', baseError);
                toast.error(`Base endpoint error: ${baseError.message}`);
            }

            // Test the ping endpoint
            try {
                const pingResponse = await fetchWithTimeout('http://localhost:5000/slot/ping', {}, 5000);
                const pingText = await pingResponse.text();
                console.log('Ping response:', pingText);
                toast.success('Successfully connected to ping endpoint');
            } catch (pingError) {
                console.error('Ping endpoint error:', pingError);
                toast.error(`Ping endpoint error: ${pingError.message}`);
            }

            // Check auth status
            const authStatus = isAuthenticated ? 'Authenticated' : 'Not authenticated';
            console.log('Auth status:', authStatus);

            // Check localStorage
            const storedUser = localStorage.getItem('user');
            console.log('User in localStorage:', storedUser ? 'Present' : 'Missing');

            toast.success(`API connection test completed. Check console for details.`);
        } catch (error) {
            console.error('API connection test failed:', error);
            toast.error(`API connection test failed: ${error.message}`);
        }
    };

    // Helper function to retry failed fetch requests
    const fetchWithRetry = async (url, options = {}, retries = 2) => {
        let lastError;
        for (let i = 0; i <= retries; i++) {
            try {
                const response = await fetch(url, options);
                return response;
            } catch (err) {
                lastError = err;
                if (i < retries) {
                    // Wait for 1 second before retrying
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
        throw lastError; // If all retries failed, throw the last error
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center p-6 border-b">
                        <h2 className="text-2xl font-bold text-teal-600">E-Health Nexus</h2>
                    </div>
                    <div className="flex flex-col items-center p-6 border-b">
                        <div className="w-24 h-24 rounded-full bg-teal-100 mb-4 flex items-center justify-center">
                            <span className="text-4xl text-teal-600">{userData.name ? userData.name.charAt(0) : 'U'}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{userData.name}</h3>
                        <div className="mt-2 px-3 py-1 bg-teal-100 rounded-full">
                            <p className="text-sm text-teal-700">{userData.email}</p>
                        </div>
                    </div>
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                        <ul className="space-y-2">
                            <li>
                                <button
                                    onClick={() => setActiveTab('doctors')}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'doctors' ? 'bg-teal-500 text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Available Doctors
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('appointments')}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'appointments' ? 'bg-teal-500 text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    My Appointments
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'profile' ? 'bg-teal-500 text-white' : 'hover:bg-gray-100'}`}
                                >
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    My Profile
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={debugApiConnection}
                                    className="flex items-center w-full px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
                                >
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17V5" />
                                    </svg>
                                    Test API Connection
                                </button>
                            </li>
                        </ul>
                        <div className="pt-8">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-50"
                            >
                                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Header */}
                <div className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4 mx-auto">
                        <div className="flex items-center">
                            <button
                                className="mr-4 text-gray-600 md:hidden"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold text-gray-800">User Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="hidden md:block text-gray-600">{userData.email}</span>
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                <span className="text-lg text-teal-600">{userData.name ? userData.name.charAt(0) : 'U'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="px-6 py-8">
                    {/* Doctors Tab */}
                    {activeTab === 'doctors' && (
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">Available Doctors</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {doctors.map((doctor) => (
                                    <div key={doctor._id} className="overflow-hidden bg-white rounded-lg shadow-md">
                                        <div className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                                                    <span className="text-xl font-bold text-teal-600">
                                                        {doctor.name ? doctor.name.charAt(0) :
                                                            doctor.firstName ? doctor.firstName.charAt(0) : 'D'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {doctor.name || `${doctor.firstName || ''} ${doctor.lastName || ''}`}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">{doctor.speciality || 'Specialist'}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Experience:</span> {doctor.experience || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Location:</span> {doctor.location || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Price:</span> ${doctor.price || 'N/A'}
                                                </p>
                                            </div>
                                            <div className="flex mt-4">
                                                <button
                                                    onClick={() => openBookingModal(doctor)}
                                                    className="px-4 py-2 mr-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none"
                                                >
                                                    Book Appointment
                                                </button>
                                                <Link
                                                    href={`/view-doctor/${doctor._id}`}
                                                    className="px-4 py-2 text-sm font-medium text-teal-600 bg-teal-100 rounded-lg hover:bg-teal-200 focus:outline-none"
                                                >
                                                    View Profile
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {doctors.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="mt-4 text-lg text-gray-600">No doctors found</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">My Appointments</h2>
                            <div className="space-y-6">
                                {appointments.map((appointment) => (
                                    <div key={appointment._id} className="overflow-hidden bg-white rounded-lg shadow">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                                                        <span className="text-xl font-bold text-teal-600">
                                                            {appointment.doctor?.firstName?.charAt(0) || 'D'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Dr. {appointment.doctor?.firstName || ''} {appointment.doctor?.lastName || ''}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">{appointment.doctor?.speciality || 'Specialist'}</p>
                                                        <div className="mt-1">
                                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getAppointmentStatusClass(appointment.status)}`}>
                                                                {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : 'Unknown'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                                                    <button
                                                        onClick={() => handleCancelAppointment(appointment._id)}
                                                        className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-4">
                                                <div>
                                                    <h4 className="text-xs font-medium text-gray-500 uppercase">Date</h4>
                                                    <p className="mt-1 font-medium">{formatDate(appointment.date)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-medium text-gray-500 uppercase">Time</h4>
                                                    <p className="mt-1 font-medium">{formatTime(appointment.date)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-medium text-gray-500 uppercase">Consultation Type</h4>
                                                    <p className="mt-1 font-medium capitalize">{appointment.consultationType || 'In-person'}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-xs font-medium text-gray-500 uppercase">Duration</h4>
                                                    <p className="mt-1 font-medium">{appointment.duration || '30 mins'}</p>
                                                </div>
                                            </div>
                                            {appointment.consultationType === 'video' && appointment.status === 'confirmed' && (
                                                <div className="mt-4">
                                                    <a
                                                        href={appointment.doctor?.googlemeetLink || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                        </svg>
                                                        Join Video Call
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {appointments.length === 0 && (
                                    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="mt-4 text-lg text-gray-600">No appointments found</p>
                                        <button
                                            onClick={() => setActiveTab('doctors')}
                                            className="px-4 py-2 mt-4 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                                        >
                                            Book an Appointment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-gray-800">My Profile</h2>
                            <div className="p-6 bg-white rounded-lg shadow">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <div className="p-3 bg-teal-50 rounded-lg">
                                            <p className="text-teal-900">{userData.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.address}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.dateOfBirth}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                                        <div className="p-3 bg-gray-50 rounded-lg">
                                            <p className="text-gray-900">{userData.bloodType}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Medical Information</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-gray-900">{userData.allergies}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-gray-900">{userData.medications}</p>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-gray-900">{userData.medicalConditions}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-gray-900">{userData.emergency_contact?.name}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-gray-900">{userData.emergency_contact?.relationship}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-gray-900">{userData.emergency_contact?.phone}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Link
                                        href="/edit-profile"
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && selectedDoctor && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                                        Book Appointment with Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                                    </h3>
                                    <div className="mt-2">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Consultation Type
                                            </label>
                                            <div className="flex space-x-4">
                                                <button
                                                    type="button"
                                                    className={`px-4 py-2 rounded-md ${consultationType === 'in-person' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                    onClick={() => setConsultationType('in-person')}
                                                >
                                                    In-Person
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`px-4 py-2 rounded-md ${consultationType === 'video' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                                    onClick={() => setConsultationType('video')}
                                                >
                                                    Video Call
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Available Slots
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {availableSlots.length > 0 ? availableSlots.map((slot) => (
                                                    <button
                                                        key={slot._id}
                                                        type="button"
                                                        onClick={() => setSelectedSlot(slot)}
                                                        className={`p-3 rounded-md text-center ${selectedSlot && selectedSlot._id === slot._id ? 'bg-teal-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                                                    >
                                                        <div className="font-medium">
                                                            {formatDate(slot.date)}
                                                        </div>
                                                        <div className="text-sm">
                                                            {formatTime(slot.date)}
                                                        </div>
                                                    </button>
                                                )) : (
                                                    <div className="col-span-2 p-4 text-center bg-gray-100 rounded-md">
                                                        <p className="text-gray-500">No available slots</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none sm:col-start-2"
                                    onClick={handleBookSlot}
                                    disabled={!selectedSlot || isLoading}
                                >
                                    {isLoading ? 'Booking...' : 'Book Appointment'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:col-start-1"
                                    onClick={closeBookingModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
