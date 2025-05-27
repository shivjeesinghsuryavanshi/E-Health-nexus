'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SlotManagement = () => {
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(true);

    // Get doctor token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("doctor-token") : null;

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/slots`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setSlots(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching slots:', error);
                setLoading(false);
            });
    }, [token]);

    const addSlot = () => {
        if (!date || !time) {
            toast.error('Please enter both date and time');
            return;
        }

        axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/slot/add`,
                { date, time },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                setSlots([...slots, response.data]);
                setDate('');
                setTime('');
                toast.success('Slot added successfully!');
            })
            .catch((error) => {
                console.error('Error adding slot:', error);
                toast.error('Failed to add slot');
            });
    };

    const deleteSlot = (slotId) => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/doctor/slots/${slotId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setSlots(slots.filter((slot) => slot._id !== slotId));
                toast.success('Slot deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting slot:', error);
                toast.error('Failed to delete slot');
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Slot Management</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div>
                    <div className="mb-4 flex flex-col md:flex-row gap-2">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
                        />
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="Enter time (e.g., 10:00 AM - 12:00 PM)"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
                        />
                        <button
                            onClick={addSlot}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Add Slot
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {slots.map((slot) => (
                            <div
                                key={slot._id}
                                className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="text-gray-500 text-sm mb-2">
                                        {slot.date || "Date not set"}
                                    </div>
                                    <div className="text-lg font-semibold mb-4">
                                        {slot.time || "Time not set"}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteSlot(slot._id)}
                                    className="self-end text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SlotManagement;