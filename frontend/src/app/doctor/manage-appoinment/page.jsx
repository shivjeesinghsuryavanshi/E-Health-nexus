'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ManageAppointments = () => {
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctorData, setDoctorData] = useState({});
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [consultationModal, setConsultationModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [prescription, setPrescription] = useState('');
    const [notes, setNotes] = useState('');

    // Get doctor token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("doctor-token") : null;

    useEffect(() => {
        if (!token) {
            router.push('/doctor-login');
            return;
        }

        const fetchData = async () => {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const doctorId = payload._id;

                // Fetch doctor data
                const doctorRes = await axios.get(
                    `http://localhost:5000/doctor/getbyid/${doctorId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setDoctorData(doctorRes.data);

                // Fetch appointments - mock data for now
                setAppointments([
                    {
                        _id: '1',
                        patientName: 'John Smith',
                        patientEmail: 'john@example.com',
                        patientPhone: '+1-234-567-8900',
                        date: '2025-06-05',
                        time: '10:00 AM',
                        status: 'confirmed',
                        type: 'consultation',
                        symptoms: 'Chest pain, shortness of breath',
                        age: 45,
                        gender: 'Male'
                    },
                    {
                        _id: '2',
                        patientName: 'Sarah Johnson',
                        patientEmail: 'sarah@example.com',
                        patientPhone: '+1-234-567-8901',
                        date: '2025-06-05',
                        time: '2:30 PM',
                        status: 'pending',
                        type: 'follow-up',
                        symptoms: 'Follow-up for diabetes management',
                        age: 38,
                        gender: 'Female'
                    },
                    {
                        _id: '3',
                        patientName: 'Michael Brown',
                        patientEmail: 'michael@example.com',
                        patientPhone: '+1-234-567-8902',
                        date: '2025-06-06',
                        time: '11:00 AM',
                        status: 'completed',
                        type: 'checkup',
                        symptoms: 'Regular health checkup',
                        age: 52,
                        gender: 'Male'
                    },
                    {
                        _id: '4',
                        patientName: 'Emily Davis',
                        patientEmail: 'emily@example.com',
                        patientPhone: '+1-234-567-8903',
                        date: '2025-06-06',
                        time: '3:00 PM',
                        status: 'confirmed',
                        type: 'consultation',
                        symptoms: 'Headaches and fatigue',
                        age: 29,
                        gender: 'Female'
                    }
                ]);

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, router]);

    const updateAppointmentStatus = async (appointmentId, newStatus) => {
        try {
            // API call would go here
            setAppointments(appointments.map(apt =>
                apt._id === appointmentId ? { ...apt, status: newStatus } : apt
            ));
            toast.success(`Appointment ${newStatus} successfully`);
        } catch (error) {
            toast.error('Failed to update appointment status');
        }
    };

    const startConsultation = (appointment) => {
        setSelectedAppointment(appointment);
        setConsultationModal(true);
        setPrescription('');
        setNotes('');
    };

    const completeConsultation = async () => {
        try {
            // API call to save consultation data would go here
            await updateAppointmentStatus(selectedAppointment._id, 'completed');
            setConsultationModal(false);
            toast.success('Consultation completed successfully');
        } catch (error) {
            toast.error('Failed to complete consultation');
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
        const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'consultation': return 'bg-purple-100 text-purple-800';
            case 'follow-up': return 'bg-orange-100 text-orange-800';
            case 'checkup': return 'bg-teal-100 text-teal-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading appointments...</p>
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
                                <h1 className="text-2xl font-bold text-gray-900">Manage Appointments</h1>
                                <p className="text-gray-600 text-sm">View and manage all your appointments</p>
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
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Appointments</p>
                                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
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
                                <p className="text-gray-600 text-sm font-medium">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {appointments.filter(apt => apt.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Confirmed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {appointments.filter(apt => apt.status === 'confirmed').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {appointments.filter(apt => apt.status === 'completed').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-4">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by patient name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">
                            Appointments ({filteredAppointments.length})
                        </h2>
                    </div>

                    {filteredAppointments.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
                            <p className="text-gray-600">No appointments match your current filters.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {filteredAppointments.map((appointment) => (
                                <div key={appointment._id} className="p-6 hover:bg-gray-50 transition-all duration-200">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                                        <div className="flex-1">
                                            <div className="flex items-start space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-semibold">
                                                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            {appointment.patientName}
                                                        </h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                                                            {appointment.status}
                                                        </span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(appointment.type)}`}>
                                                            {appointment.type}
                                                        </span>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a2 2 0 012 2v1l-2 2-2-2H7l-2 2-2-2V9a2 2 0 012-2h3z" />
                                                            </svg>
                                                            {new Date(appointment.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {appointment.time}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            {appointment.patientEmail}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            {appointment.patientPhone}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-700">
                                                            <strong>Symptoms:</strong> {appointment.symptoms}
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            Age: {appointment.age} • Gender: {appointment.gender}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {appointment.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-200"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}

                                            {appointment.status === 'confirmed' && (
                                                <button
                                                    onClick={() => startConsultation(appointment)}
                                                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    Start Consultation
                                                </button>
                                            )}

                                            {appointment.status === 'completed' && (
                                                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                                                    Consultation Completed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Consultation Modal */}
            {consultationModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Consultation - {selectedAppointment.patientName}
                                </h2>
                                <button
                                    onClick={() => setConsultationModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Patient Info */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="font-semibold text-gray-900 mb-2">Patient Information</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div><strong>Name:</strong> {selectedAppointment.patientName}</div>
                                    <div><strong>Age:</strong> {selectedAppointment.age}</div>
                                    <div><strong>Gender:</strong> {selectedAppointment.gender}</div>
                                    <div><strong>Phone:</strong> {selectedAppointment.patientPhone}</div>
                                </div>
                                <div className="mt-2">
                                    <strong>Symptoms:</strong> {selectedAppointment.symptoms}
                                </div>
                            </div>

                            {/* Prescription */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Prescription
                                </label>
                                <textarea
                                    value={prescription}
                                    onChange={(e) => setPrescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter prescription details..."
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Consultation Notes
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter consultation notes..."
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                            <button
                                onClick={() => setConsultationModal(false)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={completeConsultation}
                                className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Complete Consultation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageAppointments;