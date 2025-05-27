'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ViewDoctor() {
    const { id } = useParams();
    const [doctorData, setDoctorData] = useState({});
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctorData();
        fetchAvailableSlots();
    }, [id]);

    const fetchDoctorData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`);
            setDoctorData(response.data);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            toast.error('Failed to load doctor information');
        }
    };

    const fetchAvailableSlots = async () => {
        try {
            // Use the new endpoint to get slots by doctor ID
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slot/getbydoctor/${id}`);
            setAvailableSlots(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching slots:', error);
            toast.error('Failed to load available slots');
            setLoading(false);
        }
    };

    const handleBookSlot = async (slotId) => {
        try {
            const token = localStorage.getItem('user-token');
            if (!token) {
                toast.error('Please login to book a slot');
                return;
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/slot/book/${slotId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Slot booked successfully!');
            // Refresh available slots
            fetchAvailableSlots();
        } catch (error) {
            console.error('Error booking slot:', error);
            toast.error(error.response?.data?.message || 'Failed to book slot');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={doctorData.image || "/default-doctor.jpg"}
                            alt={doctorData.name || "Doctor"}
                            width={180}
                            height={180}
                            className="rounded-full border-4 border-teal-400"
                        />
                    </div>
                    {/* Doctor Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{doctorData.name || "Doctor Name"}</h1>
                        <p className="text-lg text-gray-600 mb-1">{doctorData.qualification || "MBBS, MD"}</p>
                        <p className="text-gray-500 mb-2">{doctorData.speciality || "Specialist"}</p>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-yellow-400 text-xl">★</span>
                            <span className="font-medium text-gray-700">4.8</span>
                            <span className="text-gray-400">(120 reviews)</span>
                        </div>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Experience:</span> {doctorData.experience || "15+"} years
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Languages:</span> English, Hindi
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Location:</span> {doctorData.location || "Hospital"}
                        </p>
                    </div>
                </div>

                {/* Available Slots */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Available Slots</h2>
                    {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {availableSlots.map((slot) => (
                                <div key={slot._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="text-sm text-gray-500 mb-1">{slot.date}</div>
                                    <div className="text-lg font-semibold text-gray-800 mb-3">{slot.time}</div>
                                    <button
                                        onClick={() => handleBookSlot(slot._id)}
                                        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded transition-colors"
                                    >
                                        Book Slot
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-100 rounded-lg p-6 text-center mb-6">
                            <p className="text-gray-600">No available slots at the moment.</p>
                        </div>
                    )}
                </div>

                {/* Doctor Details */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-teal-600 mb-2">About</h2>
                    <p className="text-gray-700 mb-4">
                        {doctorData.about || "Experienced physician specializing in providing quality healthcare services."}
                    </p>
                    <h2 className="text-xl font-semibold text-teal-600 mb-2">Specializations</h2>
                    <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Diabetes Management</li>
                        <li>Hypertension</li>
                        <li>Thyroid Disorders</li>
                        <li>General Health Checkups</li>
                        <li>Infectious Diseases</li>
                    </ul>
                    <h2 className="text-xl font-semibold text-teal-600 mb-2">Consultation Fee</h2>
                    <p className="text-gray-700 mb-6">₹{doctorData.fee || "500"} per consultation</p>
                </div>
            </div>
        </div>
    );
}