'use client';
import DoctorCard from '@/components/DoctorCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Sample doctor data - In a real application, this would come from an API
const doctors = [
    {
        id: 1,
        name: 'Dr. Shiv Jee Singh',
        specialization: 'Cardiologist',
        location: 'Lucknow, India',
        image: '/doctors/dr-shiv.jpg',
        availableSlots: [
            '10:00 AM - 12:00 PM, Mon-Fri',
            '2:00 PM - 4:00 PM, Sat-Sun'
        ]
    },
    {
        id: 2,
        name: 'Dr. Priya Sharma',
        specialization: 'Pediatrician',
        location: 'Delhi, India',
        image: '/doctors/dr-priya.jpg',
        availableSlots: [
            '9:00 AM - 1:00 PM, Mon-Wed-Fri',
            '3:00 PM - 6:00 PM, Tue-Thu'
        ]
    },
    {
        id: 3,
        name: 'Dr. Rajesh Kumar',
        specialization: 'Neurologist',
        location: 'Mumbai, India',
        image: '/doctors/dr-rajesh.jpg',
        availableSlots: [
            '11:00 AM - 2:00 PM, Mon-Fri',
            '4:00 PM - 7:00 PM, Sat'
        ]
    },
    // Add more doctors as needed
];

const DoctorDetailPage = () => {

    const [doctorList, setDoctorList] = useState([]);

    const fetchDoctors = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getall`);
        console.log(res.data);
        setDoctorList(res.data);
    }

    useEffect(() => {
        fetchDoctors();
    }, [])


    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Doctors</h1>
                    <p className="text-lg text-gray-600">
                        Book appointments with our experienced healthcare professionals
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search doctors..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Specializations</option>
                        <option value="cardiologist">Cardiologist</option>
                        <option value="pediatrician">Pediatrician</option>
                        <option value="neurologist">Neurologist</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">All Locations</option>
                        <option value="lucknow">Lucknow</option>
                        <option value="delhi">Delhi</option>
                        <option value="mumbai">Mumbai</option>
                    </select>
                </div>

                {/* Doctor Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctorList.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorDetailPage;
