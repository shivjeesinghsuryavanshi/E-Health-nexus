'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SlotManagement = () => {
    const [slots, setSlots] = useState([]);
    const [newSlot, setNewSlot] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch existing slots from the backend
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/slots`)
            .then((response) => {
                setSlots(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching slots:', error);
                setLoading(false);
            });
    }, []);

    const addSlot = () => {
        if (!newSlot) {
            toast.error('Please enter a valid slot');
            return;
        }

        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/doctor/slots, { slot: newSlot }`)
            .then((response) => {
                setSlots([...slots, response.data]);
                setNewSlot('');
                toast.success('Slot added successfully!');
            })
            .catch((error) => {
                console.error('Error adding slot:', error);
                toast.error('Failed to add slot');
            });
    };

    const deleteSlot = (slotId) => {
        axios
            .delete(`${process.env.NEXT_PUBLIC_API_URL}/doctor/slots/${slotId}`)
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
                    <div className="mb-4">
                        <input
                            type="text"
                            value={newSlot}
                            onChange={(e) => setNewSlot(e.target.value)}
                            placeholder="Enter new slot (e.g., 10:00 AM - 12:00 PM)"
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                        <button
                            onClick={addSlot}
                            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Add Slot
                        </button>
                    </div>

                    <ul className="space-y-4">
                        {slots.map((slot) => (
                            <li
                                key={slot._id}
                                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
                            >
                                <span>{slot.slot}</span>
                                <button
                                    onClick={() => deleteSlot(slot._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SlotManagement;