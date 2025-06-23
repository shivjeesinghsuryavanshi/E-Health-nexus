'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SlotManagement = () => {
    const router = useRouter();
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [addingSlot, setAddingSlot] = useState(false);
    const [doctorData, setDoctorData] = useState({});

    // Get doctor token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("doctor-token") : null;

    useEffect(() => {
        if (!token) {
            router.push('/doctor-login');
            return;
        }

        // Fetch doctor data
        const fetchDoctorData = async () => {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const doctorId = payload._id;

                const doctorRes = await axios.get(
                    `http://localhost:5000/doctor/getbyid/${doctorId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDoctorData(doctorRes.data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };

        // Fetch slots
        const fetchSlots = async () => {
            try {
                const response = await axios.get('http://localhost:5000/slot/doctor-slots', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Update the slots data structure
                const slotsWithPatients = await Promise.all(
                    response.data.map(async (slot) => {
                        if (slot.booked && slot.patient) {
                            try {
                                const patientRes = await axios.get(`http://localhost:5000/patient/getbyid/${slot.patient}`, {
                                    headers: { Authorization: `Bearer ${token}` },
                                });
                                return { ...slot, patient: patientRes.data };
                            } catch (error) {
                                console.error('Error fetching patient data:', error);
                                return slot;
                            }
                        }
                        return slot;
                    })
                );
                setSlots(slotsWithPatients);
            } catch (error) {
                console.error('Error fetching slots:', error);
                if (error.response?.status === 403) {
                    toast.error('Session expired. Please login again');
                    router.push('/doctor-login');
                } else {
                    toast.error('Failed to load slots');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
        fetchSlots();
    }, [token, router]);

    const addSlot = async () => {
        if (!date || !time) {
            toast.error('Please enter both date and time');
            return;
        }

        setAddingSlot(true);
        try {
            // Fixed: Use correct endpoint URL
            const response = await axios.post(
                'http://localhost:5000/slot/add',
                { date, time },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSlots([...slots, response.data]);
            setDate('');
            setTime('');
            toast.success('Slot added successfully!');
        } catch (error) {
            console.error('Error adding slot:', error);
            toast.error('Failed to add slot');
        } finally {
            setAddingSlot(false);
        }
    };

    // Update your deleteSlot function
    const deleteSlot = async (slotId) => {
        try {
            // Check if the slot is booked before deletion
            const slotToDelete = slots.find(slot => slot._id === slotId);
            if (slotToDelete && slotToDelete.status !== 'available') {
                toast.error("Cannot delete a booked slot");
                return;
            }

            const response = await axios.delete(`http://localhost:5000/slot/${slotId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Using the doctor's token
                }
            });

            if (response.status === 200) {
                // Remove the deleted slot from the state
                setSlots(slots.filter(slot => slot._id !== slotId));
                toast.success('Slot deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting slot:', error);
            toast.error("Failed to delete slot");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("doctor-token");
        toast.success("Logged out successfully");
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading slots...</p>
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
                            <Link href="/doctor/doctor-dashboard" className="text-gray-600 hover:text-gray-900">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Slot Management</h1>
                                <p className="text-gray-600 text-sm">Manage your appointment slots</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center overflow-hidden">
                                {doctorData.image ? (
                                    <img src={doctorData.image} alt="Profile" className="w-10 h-10 object-cover rounded-full" />
                                ) : (
                                    <span className="text-white font-semibold">
                                        {doctorData.name?.[0] || "D"}
                                    </span>
                                )}
                            </div>
                            <span className="text-gray-700 font-medium">Dr. {doctorData.name}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Add Slot Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Slot</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot</label>
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">Select time slot</option>
                                <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                                <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                                <option value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</option>
                                <option value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</option>
                                <option value="6:00 PM - 8:00 PM">6:00 PM - 8:00 PM</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={addSlot}
                                disabled={addingSlot}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {addingSlot ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Slot
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slots List */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Your Slots</h2>
                        <div className="text-sm text-gray-600">
                            Total: {slots.length} slots
                        </div>
                    </div>

                    {slots.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No slots available</h3>
                            <p className="text-gray-600">Add your first slot to start receiving appointments.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {slots.map((slot) => (
                                <div
                                    key={slot._id}
                                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-600">
                                                    {new Date(slot.date).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {slot.time}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${slot.status === 'available'
                                                        ? 'bg-green-100 text-green-800'
                                                        : slot.status === 'booked'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : slot.status === 'completed'
                                                                ? 'bg-gray-100 text-gray-800'
                                                                : 'bg-orange-100 text-orange-800'
                                                    }`}>
                                                    {slot.status === 'available' ? 'Available' :
                                                        slot.status === 'booked' ? 'Booked' :
                                                            slot.status === 'completed' ? 'Completed' :
                                                                slot.status || 'Pending'}
                                                </span>

                                                {slot.consultationType && (
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${slot.consultationType === 'video'
                                                            ? 'bg-purple-100 text-purple-800'
                                                            : 'bg-indigo-100 text-indigo-800'
                                                        }`}>
                                                        {slot.consultationType === 'video' ? 'Video Call' : 'In-Person'}
                                                    </span>
                                                )}
                                            </div>

                                            {slot.booked && slot.patient && (
                                                <div className="mt-2 space-y-2 bg-gray-50 p-3 rounded-lg">
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        <span className="font-medium">
                                                            {typeof slot.patient === 'object' ? slot.patient.name : 'Patient'}
                                                        </span>
                                                    </div>
                                                    {slot.patient.contact && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 002-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <span>{slot.patient.contact}</span>
                                                        </div>
                                                    )}
                                                    {slot.patient.email && (
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            <span>{slot.patient.email}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {!slot.booked && (
                                            <button
                                                onClick={() => deleteSlot(slot._id)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                title="Delete slot"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/doctor/doctor-dashboard" className="group">
                                <div className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-200 text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">Dashboard</p>
                                </div>
                            </Link>

                            <Link href="/doctor/appointments" className="group">
                                <div className="p-4 rounded-xl bg-teal-50 hover:bg-teal-100 transition-all duration-200 text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">Appointments</p>
                                </div>
                            </Link>

                            <Link href="/doctor/profile" className="group">
                                <div className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all duration-200 text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">Profile</p>
                                </div>
                            </Link>

                            <Link href="/store" className="group">
                                <div className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-200 text-center cursor-pointer">
                                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <p className="font-semibold text-gray-900 text-sm">All Doctors</p>
                                </div>
                            </Link>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={handleLogout}
                                className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlotManagement;