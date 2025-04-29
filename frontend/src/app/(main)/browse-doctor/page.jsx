'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch doctors from the backend
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getall`)
      .then((response) => {
        console.log(response.data);

        setDoctors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Browse Doctors</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">Speciality: {doctor.speciality}</p>
              <p className="text-gray-600">Experience: {doctor.experience}</p>
              <p className="text-gray-600">Price: ${doctor.price}</p>
              <p className="text-gray-600">Gender: {doctor.gender}</p>
              <p className="text-gray-600">
                Certification: {doctor.certification}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseDoctor;