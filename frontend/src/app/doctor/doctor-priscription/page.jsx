'use client';
import React, { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-hot-toast';

const DoctorPrescription = ({ slotId, appointment, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        medicines: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
        diagnosis: '',
        doctorNotes: '',
        followUpDate: ''
    });
    const [loading, setLoading] = useState(false);

    const addMedicine = () => {
        setFormData({
            ...formData,
            medicines: [...formData.medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
        });
    };

    const updateMedicine = (index, field, value) => {
        const updatedMedicines = formData.medicines.map((med, i) => 
            i === index ? { ...med, [field]: value } : med
        );
        setFormData({ ...formData, medicines: updatedMedicines });
    };

    const removeMedicine = (index) => {
        if (formData.medicines.length > 1) {
            const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
            setFormData({ ...formData, medicines: updatedMedicines });
        }
    };

    const savePrescription = async () => {
        // Validate required fields
        const validMedicines = formData.medicines.filter(med => 
            med.name.trim() && med.dosage.trim() && med.frequency.trim() && med.duration.trim()
        );

        if (validMedicines.length === 0) {
            toast.error('Please add at least one complete medicine');
            return;
        }

        if (!formData.diagnosis.trim()) {
            toast.error('Please enter a diagnosis');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                medicines: validMedicines,
                diagnosis: formData.diagnosis,
                doctorNotes: formData.doctorNotes,
                followUpDate: formData.followUpDate || null
            };

            await api.put(`/slot/add-prescription/${slotId}`, payload);
            toast.success('Prescription added successfully!');
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error saving prescription:', error);
            toast.error('Failed to save prescription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Add Prescription</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Patient Info */}
                <div className="p-6 bg-gray-50 border-b">
                    <h3 className="text-lg font-semibold mb-3">Patient Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Patient Name</p>
                            <p className="font-medium">{appointment.patientName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Appointment Date</p>
                            <p className="font-medium">{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                        </div>
                    </div>
                </div>

                {/* Prescription Form */}
                <div className="p-6 space-y-6">
                    {/* Diagnosis */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Diagnosis <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            rows="3"
                            placeholder="Enter patient diagnosis..."
                            required
                        />
                    </div>

                    {/* Medicines */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Prescribed Medicines <span className="text-red-500">*</span>
                            </label>
                            <button
                                onClick={addMedicine}
                                className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors"
                            >
                                + Add Medicine
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.medicines.map((medicine, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                        <input
                                            type="text"
                                            placeholder="Medicine name *"
                                            value={medicine.name}
                                            onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Dosage (e.g., 500mg) *"
                                            value={medicine.dosage}
                                            onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                        <select
                                            value={medicine.frequency}
                                            onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        >
                                            <option value="">Select frequency *</option>
                                            <option value="Once daily">Once daily</option>
                                            <option value="Twice daily">Twice daily</option>
                                            <option value="Three times daily">Three times daily</option>
                                            <option value="Four times daily">Four times daily</option>
                                            <option value="As needed">As needed</option>
                                        </select>
                                        <input
                                            type="text"
                                            placeholder="Duration (e.g., 7 days) *"
                                            value={medicine.duration}
                                            onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                                            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="text"
                                            placeholder="Special instructions (e.g., Take after meals)"
                                            value={medicine.instructions}
                                            onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                        />
                                        {formData.medicines.length > 1 && (
                                            <button
                                                onClick={() => removeMedicine(index)}
                                                className="text-red-600 hover:text-red-800 p-2"
                                                title="Remove medicine"
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
                    </div>

                    {/* Doctor Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                        <textarea
                            value={formData.doctorNotes}
                            onChange={(e) => setFormData({ ...formData, doctorNotes: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            rows="3"
                            placeholder="Any additional instructions or notes for the patient..."
                        />
                    </div>

                    {/* Follow-up Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Date (Optional)</label>
                        <input
                            type="date"
                            value={formData.followUpDate}
                            onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={savePrescription}
                        disabled={loading}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Prescription'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorPrescription;