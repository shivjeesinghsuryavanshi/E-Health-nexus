'use client'
import { Upload, ShoppingCart, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Button from "@/components/button"

export default function EHealthNexusLanding() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-teal-600 to-blue-600 shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="bg-white p-2 rounded-xl mr-3 shadow-lg">
                                <span className="text-teal-600 font-bold text-2xl">+</span>
                            </div>
                            <div className="text-white">
                                <h1 className="font-bold text-xl lg:text-2xl">E HEALTH NEXUS</h1>
                                <p className="text-teal-100 text-sm">.com</p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex-1 mx-4 max-w-3xl w-full">
                            <div className="flex bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 flex items-center border-r border-gray-200">
                                    <span className="text-gray-600 text-sm">Deliver to</span>
                                    <span className="text-teal-600 font-semibold mx-2">226001</span>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Search for medicine & wellness products..."
                                        className="w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-6 text-white">
                            <Link href="/" className="hover:text-teal-200 transition-colors font-medium">
                                HOME
                            </Link>
                            <Link href="/contact" className="hover:text-teal-200 transition-colors font-medium">
                                CONTACT US
                            </Link>
                            <Link href="/about" className="hover:text-teal-200 transition-colors font-medium">
                                ABOUT US
                            </Link>
                            <Link href="/dashboard" className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                                <span className="mr-2">👤</span>
                                <span className="font-medium">Sign up</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Category Navigation */}
            <nav className="bg-teal-500 border-t border-teal-400">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-wrap items-center gap-6 text-white">
                        <div className="flex items-center hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                            <div className="bg-white p-2 rounded-lg mr-3">
                                <span className="text-teal-500 text-lg">💊</span>
                            </div>
                            <span className="font-medium">Medicine</span>
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </div>
                        <div className="flex items-center hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                            <div className="bg-white p-2 rounded-lg mr-3">
                                <span className="text-teal-500 text-lg">🧪</span>
                            </div>
                            <span className="font-medium">Wellness</span>
                            <ChevronDown className="h-4 w-4 ml-2" />
                        </div>
                        <div className="flex items-center hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                            <div className="bg-white p-2 rounded-lg mr-3">
                                <span className="text-teal-500 text-lg">🧪</span>
                            </div>
                            <span className="font-medium">Lab Tests</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Subcategory Navigation */}
            <div className="bg-white py-4 shadow-sm border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                        {[
                            'Covid Essentials', 'Diabetes', 'Cardiac Care', 'Stomach Care',
                            'Ayurvedic', 'Homeopathy', 'Fitness', 'Mom & Baby',
                            'Devices', 'Surgicals', 'Sexual Wellness', 'Treatments',
                            'Skin Care', 'Personal Care'
                        ].map((category) => (
                            <Link
                                key={category}
                                href="#"
                                className="text-gray-700 hover:text-teal-600 hover:bg-teal-50 px-3 py-2 rounded-lg transition-colors font-medium"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="lg:w-1/2 space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Bridging the gap
                                    <span className="block text-teal-600">between patients</span>
                                    <span className="block">and care</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Access quality healthcare anytime, anywhere with our comprehensive telemedicine platform.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/store">
                                    <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                                        Explore Services
                                    </button>
                                </Link>
                                <Link href="/dashboard">
                                    <button className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Right Image */}
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-teal-400 to-blue-500 rounded-3xl p-8 shadow-2xl">
                                    <img
                                        src="/rinky-pinky.jpg"
                                        alt="Healthcare Services"
                                        width={600}
                                        height={400}
                                        className="rounded-2xl shadow-lg w-full h-auto"
                                    />
                                </div>
                                {/* Floating elements */}
                                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg">
                                    <span className="text-2xl">💊</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg">
                                    <span className="text-2xl">❤️</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tagline */}
            <div className="bg-white py-6 border-b">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl text-gray-700 font-medium">
                        E Health Nexus is your most trusted online healthcare platform
                    </p>
                </div>
            </div>

            {/* Category Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                        <p className="text-xl text-gray-600">Choose from our wide range of healthcare services</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Order Medicine Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4 rounded-2xl mr-4">
                                    <span className="text-3xl">💊</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Order Medicine</h3>
                                    <p className="text-green-600 font-semibold text-lg">Save Up to 25% off</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">Get your medicines delivered to your doorstep with our fast and reliable service.</p>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors">
                                Order Now
                            </button>
                        </div>

                        {/* Beauty Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-4 rounded-2xl mr-4">
                                    <span className="text-3xl">💄</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Beauty</h3>
                                    <p className="text-green-600 font-semibold text-lg">Save Up to 40% off</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">Discover premium beauty and skincare products from trusted brands.</p>
                            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition-colors">
                                Shop Beauty
                            </button>
                        </div>

                        {/* Wellness Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="flex items-center mb-6">
                                <div className="bg-gradient-to-br from-red-400 to-pink-500 p-4 rounded-2xl mr-4">
                                    <span className="text-3xl">❤️</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Wellness</h3>
                                    <p className="text-green-600 font-semibold text-lg">Up to 60% off</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">Comprehensive wellness solutions for a healthier lifestyle.</p>
                            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition-colors">
                                Explore Wellness
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store CTA */}
            <section className="py-8 bg-gradient-to-r from-teal-600 to-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <Link href="/store">
                        <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                            Visit Our Store
                        </button>
                    </Link>
                </div>
            </section>

            {/* Doctor Consultation Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 lg:p-12 shadow-xl">
                        {/* Left Content */}
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                Online doctor consultation with qualified doctors
                            </h2>
                            <p className="text-2xl text-teal-600 font-bold mb-8">Starting at ₹199</p>

                            {/* Features */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="flex items-center bg-white p-4 rounded-xl shadow-md">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">Talk within 30 min</span>
                                </div>

                                <div className="flex items-center bg-white p-4 rounded-xl shadow-md">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                            <polyline points="14 2 14 8 20 8"></polyline>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">Free follow up for 3 days</span>
                                </div>

                                <div className="flex items-center bg-white p-4 rounded-xl shadow-md md:col-span-2">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">Get a valid prescription</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Link href="/store">
                                <button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                                    Consult Now
                                </button>
                            </Link>
                        </div>

                        {/* Right Image */}
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-blue-400 to-teal-500 rounded-3xl p-6 shadow-2xl">
                                    <img
                                        src="/placeholder.svg?height=350&width=400"
                                        alt="Doctor consultation illustration"
                                        width={400}
                                        height={350}
                                        className="object-contain rounded-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Choose E Health Nexus?</h2>
                        <p className="text-xl text-gray-600">Experience the future of healthcare with our comprehensive platform</p >
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Benefit 1 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-20 h-20 mb-6 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">100% Confidential</h3>
                            <p className="text-gray-600 leading-relaxed">
                                All advice & consultations are completely confidential. You can also delete chats whenever you want.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-20 h-20 mb-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Certified Doctors</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We offer quality healthcare through our network of certified and experienced doctors.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-20 h-20 mb-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Convenience</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Forget the hassle of long queues and rush hour. Seek expert opinion anytime, anywhere.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-20 h-20 mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Effective</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We provide medical assistance on non urgent queries for free. Fee starting at ₹50 for faster response.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-teal-600 p-3 rounded-xl mr-3">
                                <span className="text-white font-bold text-2xl">+</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl">E HEALTH NEXUS</h3>
                                <p className="text-gray-400">.com</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Your trusted partner in healthcare, providing quality medical services and products at your convenience.
                        </p>
                        <div className="border-t border-gray-800 pt-8">
                            <p className="text-gray-400">
                                © 2025 E Health Nexus. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
