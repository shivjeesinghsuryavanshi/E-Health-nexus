import React from 'react';
import Link from 'next/link';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <img
          src={doctor.image || "/doctor-placeholder.jpg"}
          alt={`${doctor.name || "Doctor"}'s profile`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name || "Doctor Name"}</h3>
        <p className="text-blue-600 font-medium mb-2">{doctor.speciality || "Speciality"}</p>
        <div className="flex items-center text-gray-600 mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{doctor.location || "Location"}</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Available Slots:</h4>
          {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
            doctor.availableSlots.map((slot, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{slot.date} {slot.time}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-400">No slots available</div>
          )}
        </div>

        <Link
          href={'/view-doctor/' + doctor._id}
          className="mt-4 block text-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;