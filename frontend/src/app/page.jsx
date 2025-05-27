'use client'
import { Upload, ShoppingCart, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Button from "@/components/button"

export default function EHealthNexusLanding() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-teal-500 py-4 shadow">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="mr-2">
                                <div className="bg-white p-1 rounded-md">
                                    <span className="text-teal-500 font-bold text-2xl">+</span>
                                </div>
                            </div>
                            <div className="text-white font-bold text-xl">
                                E HEALTH NEXUS<span className="text-sm">.com</span>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 mx-4 max-w-2xl w-full">
                            <div className="flex">
                                <div className="bg-white rounded-l-md px-3 py-2 flex items-center border-r">
                                    <span>Deliver to</span>
                                    <span className="text-teal-500 font-medium mx-1">226001</span>
                                    <ChevronDown className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search for medicine & wellness products..."
                                        className="w-full py-2 px-3 rounded-r-md focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4 text-white">
                            <button className="flex items-center hover:text-teal-200 transition">
                                <span>HOME</span>
                            </button>
                            <Link href="/contact" className="flex items-center hover:text-teal-200 transition">
                                <span className="mr-1"></span>
                                <span>CONTACT US</span>
                            </Link>
                            <Link href="/about" className="flex items-center hover:text-teal-200 transition">
                                <span>ABOUT US</span>
                            </Link>
                            <Link href="/(main)/signup" className="flex items-center hover:text-teal-200 transition">
                                <span className="mr-1">👤</span>
                                <span>Sign up</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Navigation */}
            <nav className="bg-teal-500 py-3 border-t border-teal-400">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex items-center text-white">
                            <div className="flex items-center mr-8">
                                <div className="bg-white p-1 rounded-md mr-2">
                                    <span className="text-teal-500">💊</span>
                                </div>
                                <span>Medicine</span>
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </div>
                            <div className="flex items-center mr-8">
                                <div className="bg-white p-1 rounded-md mr-2">
                                    <span className="text-teal-500">🧪</span>
                                </div>
                                <span>Wellness</span>
                                <ChevronDown className="h-4 w-4 ml-1" />
                            </div>
                            <div className="flex items-center mr-8">
                                <div className="bg-white p-1 rounded-md mr-2">
                                    <span className="text-teal-500">🧪</span>
                                </div>
                                <span>Lab Tests</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Subcategory Navigation */}
            <div className="bg-white py-3 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Covid Essentials
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Diabetes
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Cardiac Care
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Stomach Care
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Ayurvedic
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Homeopathy
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Fitness
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Mom & Baby
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Devices
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Surgicals
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Sexual Wellness
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Treatments
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Skin Care
                        </Link>
                        <Link href="#" className="text-gray-700 hover:text-teal-500">
                            Personal Care
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Banner */}
            <div className="relative bg-gray-100 py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Left Content */}
                        <div className="md:w-1/2 space-y-4 mb-8 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-teal-700">
                                Bridging the gap
                                <br />
                                between patients and care—anytime, anywhere.
                            </h1>
                        </div>
                        {/* Right Image */}
                        <div className="md:w-1/2">
                            <div className="relative">
                                <img
                                    src="/rinky-pinky.jpg"
                                    alt="Kapiva Ayurvedic Products"
                                    width={600}
                                    height={400}
                                    className="rounded-lg shadow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tagline */}
            <div className="bg-white py-4 text-center">
                <p className="text-gray-700">E Health Nexus is most trusted online pharmacy</p>
            </div>

            {/* Category Cards */}
            <div className="py-8 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Order Medicine Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 relative">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <span className="text-3xl">💊</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Order Medicine</h3>
                                    <p className="text-green-600 font-medium">Save Upto 25% off</p>
                                </div>
                            </div>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                <ChevronRight className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Beauty Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 relative">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div className="bg-pink-100 p-3 rounded-lg">
                                        <span className="text-3xl">💄</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Beauty</h3>
                                    <p className="text-green-600 font-medium">Save Upto 40% off</p>
                                </div>
                            </div>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                <ChevronRight className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>

                        {/* Wellness Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 relative">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div className="bg-red-100 p-3 rounded-lg">
                                        <span className="text-3xl">❤</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Wellness</h3>
                                    <p className="text-green-600 font-medium">Upto 60% off</p>
                                </div>
                            </div>
                            <button className="absolute right-4 top-1/2 -translate-y-1/2">
                                <ChevronRight className="h-6 w-6 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Link href="/store">
                <Button>visit store</Button>
            </Link>

            {/* Doctor Consultation Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white py-12 mt-8 shadow rounded-lg container mx-auto px-4">
                {/* Left Content */}
                <div className="lg:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Online doctor consultation with qualified doctors
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">Starting at ₹199</p>
                    {/* Features */}
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-red-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <span className="text-gray-700">Talk within 30 min</span>
                        </div>

                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-blue-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <span className="text-gray-700">Free follow up for 3 days</span>
                        </div>

                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-red-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <path d="M9 15l3 3L22 8"></path>
                                </svg>
                            </div>
                            <span className="text-gray-700">Get a valid prescription</span>
                        </div>
                    </div>
                    {/* CTA Button */}
                    <button className="bg-red-400 hover:bg-red-500 text-white font-medium py-3 px-8 rounded-md transition duration-300 text-lg w-full md:w-auto shadow">
                        Consult now
                    </button>
                </div>
                {/* Right Image */}
                <div className="lg:w-1/2">
                    <div className="relative w-full h-[300px] md:h-[350px]">
                        <img
                            src="/placeholder.svg?height=350&width=400"
                            alt="Doctor consultation illustration"
                            width={400}
                            height={350}
                            className="object-contain rounded-lg shadow"
                        />
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {/* Benefit 1 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-full h-full text-teal-500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="#B2EBEB"
                            />
                            <path d="M12 17V11" stroke="#00A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8V7" stroke="#00A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#00A0A0"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">100% Confidential</h3>
                    <p className="text-gray-600">
                        All advice & consultations are completely confidential. You can also delete chats whenever you want.
                    </p>
                </div>

                {/* Benefit 2 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-full h-full text-blue-500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                                fill="#B3D4FF"
                            />
                            <path d="M12 22L20 18L12 14L4 18L12 22Z" fill="#B3D4FF" />
                            <path
                                d="M12 22L20 18L12 14L4 18L12 22Z"
                                stroke="#0066CC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                                stroke="#0066CC"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Certified Doctors</h3>
                    <p className="text-gray-600">
                        We offer quality healthcare through our network of certified and experienced doctors.
                    </p>
                </div>

                {/* Benefit 3 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-full h-full text-teal-500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="5" y="2" width="14" height="20" rx="2" fill="#B2EBEB" />
                            <path d="M12 18H12.01" stroke="#00A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 2H16" stroke="#00A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <rect
                                x="5"
                                y="2"
                                width="14"
                                height="20"
                                rx="2"
                                stroke="#00A0A0"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Convenience</h3>
                    <p className="text-gray-600">
                        Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.
                    </p>
                </div>

                {/* Benefit 4 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-6">
                        <svg
                            viewBox="0 0 24 24"
                            className="w-full h-full text-teal-500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z"
                                fill="#B2EBEB"
                            />
                            <path d="M16 3V7M8 3V7" stroke="#00A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 11H2" stroke="#00A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path
                                d="M2 9C2 7.89543 2.89543 7 4 7H20C21.1046 7 22 7.89543 22 9V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V9Z"
                                stroke="#00A0A0"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Cost Effective</h3>
                    <p className="text-gray-600">
                        We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response to
                        queries.
                    </p>
                </div>
            </div>
        </div>
    )
}
