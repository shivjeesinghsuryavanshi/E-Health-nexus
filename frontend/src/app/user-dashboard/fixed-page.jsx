"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DoctorCard from '@/components/DoctorCard';
import toast from 'react-hot-toast';
import { fetchWithTimeout, fetchData, checkServerConnectivity } from '@/utils/fetchHelpers';

export default function UserDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('doctors');
    const [userData, setUserData] = useState({
        name: 'User',
        email: '',
        phone: '123-456-7890',
        address: '123 Street, City',
        dateOfBirth: '01/01/1990',
        bloodType: 'A+',
        allergies: 'None',
        medications: 'None',
        medicalConditions: 'None',
        emergency_contact: {
            name: 'Emergency Contact',
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
    const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'online', 'offline'

    useEffect(() => {
        // Check server connectivity
        checkServerConnectivity()
            .then(isOnline => {
                setServerStatus(isOnline ? 'online' : 'offline');
                if (!isOnline) {
                    toast.error('Backend server appears to be offline. Please check the server status.');
                }
            });

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

                try {
                    const data = await fetchData(`http://localhost:5000/slot/patient/${user._id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            ...(user.token && { 'Authorization': `Bearer ${user.token}` })
                        }
                    });

                    console.log('Received appointments:', data);
                    setAppointments(data);
                } catch (fetchError) {
                    console.error('API fetch error:', fetchError);
                    toast.error(`Failed to load appointments: ${fetchError.message}`);
                    setAppointments([]);
                }
            } catch (parseError) {
                console.error('Error parsing user data:', parseError);
                setAppointments([]);
            }
        } catch (error) {
            console.error('Error in fetchAppointments:', error);
            toast.error(`Error: ${error.message || 'Unknown error'}`);
            setAppointments([]);
        }
    };

    const fetchDoctors = async () => {
        try {
            console.log('Fetching doctors list...');
            setDoctors([]); // Clear any previous data

            try {
                const data = await fetchData('http://localhost:5000/doctor/getall', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log('Received doctors:', data);
                setDoctors(data);
            } catch (error) {
                console.error('Error in doctor fetch:', error);

                if (error.message.includes('Failed to fetch')) {
                    toast.error(
                        <div>
                            <p>Failed to connect to server. Please check:</p>
                            <ul className="mt-2 list-disc pl-5 text-sm">
                                <li>Backend server is running</li>
                                <li>No network connectivity issues</li>
                            </ul>
                        </div>
                    );
                } else {
                    toast.error(`Failed to load doctors: ${error.message}`);
                }
            }
        } catch (error) {
            console.error('Unexpected error in fetchDoctors:', error);
            toast.error('An unexpected error occurred');
            setDoctors([]);
        }
    };

    const openBookingModal = async (doctor) => {
        setSelectedDoctor(doctor);
        setIsBookingModalOpen(true);

        try {
            // Fetch available slots for the selected doctor
            const data = await fetchData(`http://localhost:5000/slot/available/${doctor._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setAvailableSlots(data);
        } catch (error) {
            console.error('Error fetching available slots:', error);
            toast.error('Failed to load available slots');
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
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server returned ${response.status}`);
            }

            const data = await response.json();
            toast.success('Appointment booked successfully');
            closeBookingModal();
            fetchAppointments(); // Refresh appointments
        } catch (error) {
            console.error('Error booking slot:', error);
            toast.error(`Failed to book appointment: ${error.message}`);
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
            if (!user || !user.token) {
                toast.error('Authentication required');
                return;
            }

            const response = await fetchWithTimeout(`http://localhost:5000/slot/cancel/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Server returned ${response.status}`);
            }

            const data = await response.json();
            toast.success('Appointment cancelled successfully');
            fetchAppointments(); // Refresh appointments
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            toast.error(`Failed to cancel appointment: ${error.message}`);
        }
    };

    // Debug function to test API connectivity
    const debugApiConnection = async () => {
        toast.info("Testing API connection...");

        try {
            // Check server status
            const isServerOnline = await checkServerConnectivity();
            console.log('Server status:', isServerOnline ? 'Online' : 'Offline');

            if (!isServerOnline) {
                toast.error("Server appears to be offline. Please check if the backend is running.");
                return;
            }

            // Try base endpoint
            try {
                const baseResponse = await fetchWithTimeout('http://localhost:5000/', {}, 3000);
                console.log('Base endpoint:', baseResponse.status, await baseResponse.text());
                toast.success("Successfully connected to server base endpoint");
            } catch (baseError) {
                console.error('Base endpoint error:', baseError);
                toast.error("Failed to connect to base endpoint");
            }

            // Try doctor endpoint
            try {
                const doctorResponse = await fetchWithTimeout('http://localhost:5000/doctor/getall', {
                    headers: { 'Content-Type': 'application/json' }
                }, 3000);

                if (!doctorResponse.ok) {
                    toast.error(`Doctor endpoint error: ${doctorResponse.status}`);
                } else {
                    const data = await doctorResponse.json();
                    toast.success(`Doctor endpoint: Found ${data.length} doctors`);
                }
            } catch (doctorError) {
                console.error('Doctor endpoint error:', doctorError);
                toast.error("Failed to fetch doctor data");
            }

            // Check auth
            console.log('Auth status:', isAuthenticated ? 'Authenticated' : 'Not authenticated');
            console.log('User in localStorage:', localStorage.getItem('user') ? 'Present' : 'Missing');
        } catch (error) {
            console.error('Debug test failed:', error);
            toast.error(`API test failed: ${error.message}`);
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

    // The rest of your component (render function, etc.)
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Server Offline Warning */}
            {serverStatus === 'offline' && (
                <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-2 text-center z-50">
                    ⚠️ Server appears to be offline. Some features may not work properly.
                </div>
            )}

            {/* Show login prompt if not authenticated */}
            {!isAuthenticated && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                        <p className="mb-6">You need to be logged in to view your dashboard.</p>
                        <div className="flex space-x-4">
                            <Link
                                href="/login"
                                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg text-center"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-center"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* The rest of your component remains unchanged */}
        </div>
    );
}
