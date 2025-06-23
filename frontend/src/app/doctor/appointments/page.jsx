"use client";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Loading spinner component
const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
);

export default function ManageAppointments() {
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Add SVG icons as constants
    const CalendarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    );

    const ClockIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );

    const UserIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

    const VideoIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
    );

    const HospitalIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    );

    const PrescriptionIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>    );

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/slot/doctor-booked-slots');
                
                if (Array.isArray(response.data)) {
                    setAppointments(response.data);
                } else {
                    toast.error('Invalid data received from server');
                    setAppointments([]);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                toast.error('Failed to fetch appointments');
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();    }, []);const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/slot/update-status/${appointmentId}`,
                { status: newStatus }
            );

            // Update the local state
            setAppointments(appointments.map(apt =>
                apt._id === appointmentId ? { ...apt, status: newStatus } : apt
            ));

            toast.success(`Appointment ${newStatus} successfully`);
        } catch (error) {
            console.error('Error updating appointment status:', error);
            toast.error('Failed to update appointment status');
        }
    };

    const handleAddPrescription = (appointmentId) => {
        router.push(`/doctor/add-prescription/${appointmentId}`);
    };

    // Helper functions
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter appointments based on search and filter criteria
    const filteredAppointments = appointments.filter(apt => {
        // Handle status filtering
        if (filter !== 'all' && apt.status !== filter) {
            return false;
        }

        // Handle search filtering - safely check properties
        if (searchTerm) {
            const patientName = apt.patient?.name || '';
            const patientEmail = apt.patient?.email || '';

            return (
                patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patientEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return true;
    });

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Calendar helpers
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Generate days for current month view
    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);

        const days = [];

        // Previous month days
        const prevMonthDays = getDaysInMonth(year, month - 1);
        for (let i = 0; i < firstDay; i++) {
            days.push({
                date: new Date(year, month - 1, prevMonthDays - firstDay + i + 1),
                isCurrentMonth: false,
                isToday: false
            });
        }

        // Current month days
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({
                date,
                isCurrentMonth: true,
                isToday:
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
            });
        }

        // Fill remaining slots (next month)
        const totalDays = 42; // 6 rows of 7 days
        if (days.length < totalDays) {
            const daysToAdd = totalDays - days.length;
            for (let i = 1; i <= daysToAdd; i++) {
                days.push({
                    date: new Date(year, month + 1, i),
                    isCurrentMonth: false,
                    isToday: false
                });
            }
        }

        return days;
    };

    // Get appointments for a specific day
    const getAppointmentsForDay = (date) => {
        return appointments.filter(apt => {
            if (!apt.date) return false;

            const aptDate = new Date(apt.date);
            return (
                aptDate.getDate() === date.getDate() &&
                aptDate.getMonth() === date.getMonth() &&
                aptDate.getFullYear() === date.getFullYear()
            );
        });
    };

    // Navigation for calendar
    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };    // Check for loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Appointments</h1>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4">
                    {/* View Toggle */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-sm text-gray-600 font-medium">View:</span>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'list'
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            List
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'calendar'
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Calendar
                        </button>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 shadow-sm">
                        <span className="text-sm text-gray-600 font-medium">Status:</span>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 rounded-md text-sm ${filter === 'all'
                                ? 'bg-teal-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-3 py-1 rounded-md text-sm ${filter === 'pending'
                                ? 'bg-yellow-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setFilter('confirmed')}
                            className={`px-3 py-1 rounded-md text-sm ${filter === 'confirmed'
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Confirmed
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-3 py-1 rounded-md text-sm ${filter === 'completed'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setFilter('cancelled')}
                            className={`px-3 py-1 rounded-md text-sm ${filter === 'cancelled'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Cancelled
                        </button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search patient name or email..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
                </div>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        // LIST VIEW
                        <>
                            {filteredAppointments.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredAppointments.map((appointment) => (
                                        <div key={appointment._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                            <div className="p-5">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="bg-teal-100 p-3 rounded-full">
                                                            <UserIcon />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-lg text-gray-900">
                                                                {appointment.patient?.name || 'Patient Name Not Available'}
                                                            </h3>
                                                            <p className="text-sm text-gray-600">{appointment.patient?.email || 'No email provided'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                                                            {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Unknown'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-gray-500"><CalendarIcon /></span>
                                                        <span className="text-gray-700">{formatDate(appointment.date)}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-gray-500"><ClockIcon /></span>
                                                        <span className="text-gray-700">{formatTime(appointment.date)}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {appointment.consultationType === 'video' ? (
                                                            <span className="text-blue-500"><VideoIcon /></span>
                                                        ) : (
                                                            <span className="text-green-500"><HospitalIcon /></span>
                                                        )}
                                                        <span className="text-gray-700">
                                                            {appointment.consultationType?.charAt(0).toUpperCase() + appointment.consultationType?.slice(1) || 'In-person'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-gray-500"><PrescriptionIcon /></span>
                                                        <span className="text-gray-700">
                                                            {appointment.prescription ? 'Prescription Added' : 'No Prescription'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {appointment.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleStatusChange(appointment._id, 'confirmed')}
                                                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none"
                                                        >
                                                            Confirm
                                                        </button>
                                                    )}

                                                    {(appointment.status === 'confirmed' || appointment.status === 'pending') && (
                                                        <button
                                                            onClick={() => handleStatusChange(appointment._id, 'cancelled')}
                                                            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}

                                                    {appointment.status === 'confirmed' && (
                                                        <button
                                                            onClick={() => handleStatusChange(appointment._id, 'completed')}
                                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none"
                                                        >
                                                            Mark as Completed
                                                        </button>
                                                    )}

                                                    {(appointment.status === 'confirmed' || appointment.status === 'completed') && (
                                                        <button
                                                            onClick={() => handleAddPrescription(appointment._id)}
                                                            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 focus:outline-none"
                                                        >
                                                            {appointment.prescription ? 'Update Prescription' : 'Add Prescription'}
                                                        </button>
                                                    )}

                                                    {appointment.consultationType === 'video' && appointment.status === 'confirmed' && (
                                                        <a
                                                            href="#" // Replace with actual meeting link
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none"
                                                        >
                                                            Join Video Call
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-md">
                                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
                                    <p className="text-gray-500 mt-2">Try changing your filters or create new appointment slots</p>
                                </div>
                            )}
                        </>
                    ) : (
                        // CALENDAR VIEW
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={prevMonth}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </h2>
                                    <button
                                        onClick={nextMonth}
                                        className="p-1 rounded-full hover:bg-gray-200"
                                    >
                                        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                                        <span className="text-xs text-gray-600">Pending</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                                        <span className="text-xs text-gray-600">Confirmed</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                                        <span className="text-xs text-gray-600">Completed</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                                        <span className="text-xs text-gray-600">Cancelled</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="text-center font-medium text-sm text-gray-600 py-1">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {generateCalendarDays().map((day, index) => {
                                    const dailyAppointments = getAppointmentsForDay(day.date);
                                    const filteredDailyAppointments = dailyAppointments.filter(apt =>
                                        filter === 'all' || apt.status === filter
                                    );

                                    return (
                                        <div
                                            key={index}
                                            className={`border rounded-lg p-1 min-h-[100px] ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
                                                } ${day.isToday ? 'border-teal-500 border-2' : 'border-gray-200'}`}
                                        >
                                            <div className="text-right p-1 font-medium text-sm">
                                                {day.date.getDate()}
                                            </div>

                                            <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                                                {filteredDailyAppointments.slice(0, 3).map((apt) => (
                                                    <div
                                                        key={apt._id}
                                                        onClick={() => router.push(`/doctor/appointment/${apt._id}`)}
                                                        className={`p-1 text-xs rounded cursor-pointer ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-red-100 text-red-800'
                                                            }`}
                                                        title={apt.patient?.name || 'Patient'}
                                                    >
                                                        <div className="truncate">{formatTime(apt.date)} - {apt.patient?.name || 'Patient'}</div>
                                                    </div>
                                                ))}

                                                {filteredDailyAppointments.length > 3 && (
                                                    <div className="text-xs text-center font-medium text-teal-600 p-1 bg-teal-50 rounded">
                                                        +{filteredDailyAppointments.length - 3} more
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}