"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Calendar,
    Clock,
    Star,
    MapPin,
    Languages,
    GraduationCap,
    Stethoscope,
    IndianRupee,
    Video,
    Phone,
    MessageCircle,
    Home,
    Users,
    User,
    LogIn,
    Award,
    BookOpen,
} from "lucide-react"

export default function ViewDoctor() {
    const { id } = useParams()
    const [doctorData, setDoctorData] = useState({})
    const [availableSlots, setAvailableSlots] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedSlot, setSelectedSlot] = useState(null)

    useEffect(() => {
        fetchDoctorData()
        fetchAvailableSlots()
    }, [id])

    const fetchDoctorData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/getbyid/${id}`)
            setDoctorData(response.data)
        } catch (error) {
            console.error("Error fetching doctor data:", error)
            toast.error("Failed to load doctor information")
        }
    }

    const fetchAvailableSlots = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slot/getbydoctor/${id}`)
            setAvailableSlots(response.data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching slots:", error)
            toast.error("Failed to load available slots")
            setLoading(false)
        }
    }

    const handleBookSlot = async (slotId, consultationType = "in-person") => {
        try {
            const token = localStorage.getItem("user-token")
            if (!token) {
                toast.error("Please login to book a slot")
                return
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/slot/book/${slotId}`,
                { consultationType },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            toast.success(`${consultationType === "video" ? "Video consultation" : "Appointment"} booked successfully!`)

            // If it's a video consultation, show Google Meet link
            if (consultationType === "video") {
                const meetLink = `https://meet.google.com/new`
                toast.success(
                    <div>
                        <p>Video consultation booked!</p>
                        <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Join Google Meet
                        </a>
                    </div>,
                    { duration: 8000 },
                )
            }

            fetchAvailableSlots()
        } catch (error) {
            console.error("Error booking slot:", error)
            toast.error(error.response?.data?.message || "Failed to book slot")
        }
    }

    const generateMeetLink = () => {
        // In a real application, you would generate a unique meet link for each appointment
        return `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading doctor information...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-6xl mx-auto px-4 space-y-6">
                {/* Doctor Profile Header */}
                <Card className="overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <div className="flex flex-col lg:flex-row items-center gap-6">
                            <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                                <AvatarImage src={doctorData.image || "/placeholder.svg?height=128&width=128"} alt={doctorData.name} />
                                <AvatarFallback className="text-2xl bg-blue-500">{doctorData.name?.charAt(0) || "D"}</AvatarFallback>
                            </Avatar>

                            <div className="text-center lg:text-left flex-1">
                                <h1 className="text-3xl font-bold mb-2">{doctorData.name || "Dr. John Doe"}</h1>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                                    <Badge variant="secondary" className="bg-white/20 text-white">
                                        <GraduationCap className="w-4 h-4 mr-1" />
                                        {doctorData.qualification || "MBBS, MD"}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/20 text-white">
                                        <Stethoscope className="w-4 h-4 mr-1" />
                                        {doctorData.speciality || "General Medicine"}
                                    </Badge>
                                </div>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="font-medium">4.8</span>
                                        <span className="opacity-80">(120 reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        <span>{doctorData.experience || "15+"} years exp.</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{doctorData.location || "Multi-location"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Available Slots */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                    Available Slots
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {availableSlots.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {availableSlots.map((slot) => (
                                            <Card key={slot._id} className="border-2 hover:border-blue-300 transition-colors">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div>
                                                            <div className="font-medium text-gray-900">{slot.date}</div>
                                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Clock className="w-4 h-4" />
                                                                {slot.time}
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                                            Available
                                                        </Badge>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Button
                                                            onClick={() => handleBookSlot(slot._id, "in-person")}
                                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                                            size="sm"
                                                        >
                                                            <Stethoscope className="w-4 h-4 mr-2" />
                                                            Book In-Person
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleBookSlot(slot._id, "video")}
                                                            variant="outline"
                                                            className="w-full border-green-600 text-green-600 hover:bg-green-50"
                                                            size="sm"
                                                        >
                                                            <Video className="w-4 h-4 mr-2" />
                                                            Video Consultation
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-2">No available slots at the moment</p>
                                        <p className="text-sm text-gray-500">Please check back later or contact the clinic</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Google Meet Integration */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Video className="w-5 h-5 text-green-600" />
                                    Video Consultation Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                                        <Video className="w-8 h-8 text-green-600" />
                                        <div>
                                            <h3 className="font-medium text-gray-900">Google Meet</h3>
                                            <p className="text-sm text-gray-600">Secure video calls</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                                        <Phone className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <h3 className="font-medium text-gray-900">Phone Call</h3>
                                            <p className="text-sm text-gray-600">Voice consultation</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <MessageCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <h4 className="font-medium text-yellow-800">How it works:</h4>
                                            <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                                                <li>• Book a video consultation slot</li>
                                                <li>• Receive Google Meet link via email/SMS</li>
                                                <li>• Join the meeting at your scheduled time</li>
                                                <li>• Get prescription and follow-up digitally</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Doctor Information Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <IndianRupee className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="font-medium">₹{doctorData.fee || "500"}</p>
                                        <p className="text-sm text-gray-500">Consultation fee</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Languages className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="font-medium">English, Hindi</p>
                                        <p className="text-sm text-gray-500">Languages spoken</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-purple-600" />
                                    <div>
                                        <p className="font-medium">30 minutes</p>
                                        <p className="text-sm text-gray-500">Average consultation</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* About */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                    About
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {doctorData.about ||
                                        "Experienced physician specializing in providing comprehensive healthcare services with a focus on patient-centered care and evidence-based treatment approaches."}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Specializations */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Stethoscope className="w-5 h-5 text-green-600" />
                                    Specializations
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Diabetes Management",
                                        "Hypertension",
                                        "Thyroid Disorders",
                                        "General Health",
                                        "Infectious Diseases",
                                    ].map((spec) => (
                                        <Badge key={spec} variant="secondary" className="text-xs">
                                            {spec}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Action Buttons */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    Home
                                </Button>
                            </Link>
                            <Link href="/store">
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Browse Doctors
                                </Button>
                            </Link>
                            {typeof window !== "undefined" && localStorage.getItem("user-token") ? (
                                <Link href="/user/dashboard">
                                    <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                                        <User className="w-4 h-4" />
                                        My Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/(main)/login">
                                    <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                                        <LogIn className="w-4 h-4" />
                                        Login to Book
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
