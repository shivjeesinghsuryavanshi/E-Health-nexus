'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiologist',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1559839734-2b71e197e1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Neurologist',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      specialization: 'Pediatrician',
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <div className="w-full text-gray-700 bg-cream">
        <div className="flex flex-col max-w-screen-xl px-8 mx-auto md:items-center md:justify-between md:flex-row">
          <div className="flex flex-row items-center justify-between py-6">
            <div className="relative md:mt-8">
              <Link href="/" className="text-lg relative z-50 font-bold tracking-widest text-gray-900 rounded-lg focus:outline-none focus:shadow-outline">
                E HEALTH-NEXUS
              </Link>
              <svg className="h-11 z-40 absolute -top-2 -left-3" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M35.2574 2.24264C37.6005 -0.100501 41.3995 -0.100505 43.7426 2.24264L76.7574 35.2574C79.1005 37.6005 79.1005 41.3995 76.7574 43.7426L43.7426 76.7574C41.3995 79.1005 37.6005 79.1005 35.2574 76.7574L2.24264 43.7426C-0.100501 41.3995 -0.100505 37.6005 2.24264 35.2574L35.2574 2.24264Z" fill="#65DAFF"/>
              </svg>
            </div>
            <button 
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                {!isMenuOpen ? (
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                ) : (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                )}
              </svg>
            </button>
          </div>
          <nav 
            className={`flex flex-col flex-grow md:items-center pb-4 md:pb-0 md:flex md:justify-end md:flex-row origin-top duration-300 ${
              isMenuOpen ? 'h-full scale-y-100' : 'h-0 scale-y-0 md:scale-y-100'
            }`}
          >
            <Link href="/" className="px-4 py-2 mt-2 text-sm bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline">
              Home
            </Link>
            <Link href="/careers" className="px-4 py-2 mt-2 text-sm bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline">
              Careers
            </Link>
            <Link href="/blog" className="px-4 py-2 mt-2 text-sm bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline">
              Blog
            </Link>
            <Link href="/about" className="px-4 py-2 mt-2 text-sm bg-transparent rounded-lg md:mt-8 md:ml-4 hover:text-gray-900 focus:outline-none focus:shadow-outline">
              About Us
            </Link>
            <Link href="/login" className="px-10 py-3 mt-2 text-sm text-center bg-white text-gray-800 rounded-full md:mt-8 md:ml-4">
              Login
            </Link>
            <Link href="/signup" className="px-10 py-3 mt-2 text-sm text-center bg-yellow-500 text-white rounded-full md:mt-8 md:ml-4">
              Sign Up
            </Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Welcome to E-Health Nexus
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your trusted platform for connecting with experienced healthcare professionals
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Expert Doctors</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                <p className="mt-2 text-gray-600">{doctor.specialization}</p>
                <p className="mt-1 text-sm text-gray-500">Experience: {doctor.experience}</p>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage 