"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
    const router = useRouter()
    const { id } = useParams()
    const [doctorData, setDoctorData] = useState({})
    const [availableSlots, setAvailableSlots] = useState({})
    const [loading, setLoading] = useState(true)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [consultationType, setConsultationType] = useState('in-person')

    useEffect(() => {
        if (id) {
            fetchDoctorData()
            fetchAvailableSlots()
        }
    }, [id])

    const fetchDoctorData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/doctor/getbyid/${id}`)
            console.log('Doctor data:', response.data)
            setDoctorData(response.data)
        } catch (error) {
            console.error("Error fetching doctor data:", error)
            toast.error("Failed to load doctor information")
        }
    }

    const fetchAvailableSlots = async () => {
        try {
            setLoading(true)
            console.log('Fetching available slots for doctor:', id)

            const response = await axios.get(`http://localhost:5000/slot/available/${id}`)
            console.log('Slots response:', response.data)

            if (response.data.success && Array.isArray(response.data.slots)) {
                const slots = response.data.slots.filter(slot =>
                    slot && slot.date && slot.time && !slot.booked && slot.status === 'available'
                )

                if (slots.length === 0) {
                    console.log('No available slots found')
                    setAvailableSlots({})
                    return
                }

                // Sort slots by date and time
                const sortedSlots = slots.sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time}`)
                    const dateB = new Date(`${b.date}T${b.time}`)
                    return dateA - dateB
                })

                // Group slots by date
                const groupedSlots = sortedSlots.reduce((acc, slot) => {
                    const date = slot.date
                    if (!acc[date]) {
                        acc[date] = []
                    }
                    acc[date].push({
                        ...slot,
                        time: slot.time.substring(0, 5) // Format time to HH:mm
                    })
                    return acc
                }, {})

                console.log('Grouped slots:', groupedSlots)
                setAvailableSlots(groupedSlots)
            } else {
                console.log('No slots in response:', response.data)
                setAvailableSlots({})
            }
        } catch (error) {
            console.error("Error fetching slots:", error)
            toast.error("Failed to load available slots")
            setAvailableSlots({})
        } finally {
            setLoading(false)
        }
    }

    const handleBookSlot = async (slotId, selectedConsultationType) => {
        try {
            const token = localStorage.getItem("user-token")
            if (!token) {
                toast.error("Please login to book an appointment")
                router.push("/login")
                return
            }

            // Show loading toast
            const loadingToast = toast.loading("Booking your appointment...")

            const response = await axios.put(
                `http://localhost:5000/slot/book/${slotId}`,
                { consultationType: selectedConsultationType },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // Dismiss loading toast
            toast.dismiss(loadingToast)

            if (response.data.success) {
                toast.success(
                    `${selectedConsultationType === "video" ? "Video consultation" : "Appointment"} booked successfully!`
                )

                // If it's a video consultation, show Google Meet link
                if (selectedConsultationType === "video") {
                    const meetLink = generateMeetLink()
                    toast.success(
                        <div>
                            <p>Video consultation booked!</p>
                            <a
                                href={meetLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Join Google Meet
                            </a>
                        </div>,
                        { duration: 8000 }
                    )
                }

                // Refresh available slots
                fetchAvailableSlots()

                // Clear selection
                setSelectedSlot(null)
                setConsultationType('in-person')

                // Redirect to dashboard after successful booking
                router.push("/user/appointments")
            }
        } catch (error) {
            console.error("Error booking slot:", error)
            toast.error(error.response?.data?.message || "Failed to book appointment")
        }
    }

    const generateMeetLink = () => {
        return `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`
    }

    // Format date for display
    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            {/* Existing doctor profile card */}
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

            {/* Available Slots Section */}
            <div className="max-w-6xl mx-auto px-4 mt-8">
                <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <CardTitle className="text-2xl flex items-center gap-2">
                            <Calendar className="h-6 w-6" />
                            Book Appointment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Select Consultation Type</h3>
                            <div className="flex gap-4 mb-6">
                                <button
                                    onClick={() => setConsultationType('in-person')}
                                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${consultationType === 'in-person'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <User className="h-5 w-5 text-blue-600" />
                                        <div className="text-left">
                                            <div className="font-medium">In-Person Visit</div>
                                            <div className="text-sm text-gray-600">Visit the clinic</div>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setConsultationType('video')}
                                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${consultationType === 'video'
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 hover:border-green-200'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Video className="h-5 w-5 text-green-600" />
                                        <div className="text-left">
                                            <div className="font-medium">Video Call</div>
                                            <div className="text-sm text-gray-600">Online consultation</div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">Available Time Slots</h3>
                            {Object.keys(availableSlots).length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                    <h4 className="text-lg font-medium text-gray-900">No Available Slots</h4>
                                    <p className="text-gray-600">The doctor has no available appointments at this time.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {Object.entries(availableSlots).map(([date, slots]) => (
                                        <div key={date} className="bg-white rounded-lg border p-4">
                                            <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                {formatDate(date)}
                                            </h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                                {slots.map((slot) => (<button
                                                    key={slot._id}
                                                    onClick={() => !slot.booked && setSelectedSlot(slot)}
                                                    disabled={slot.booked}
                                                    className={`p-3 rounded-lg text-sm font-medium transition-all relative
                                                            ${selectedSlot?._id === slot._id
                                                            ? 'bg-blue-600 text-white shadow-lg scale-105'
                                                            : slot.booked
                                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                >
                                                    {slot.booked && (
                                                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                                                    )}
                                                    <Clock className={`h-4 w-4 mb-1 mx-auto ${slot.booked ? 'text-gray-400' : ''}`} />
                                                    {slot.time}
                                                    {slot.booked && (
                                                        <div className="text-xs text-gray-500 mt-1">Booked</div>
                                                    )}
                                                </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {selectedSlot && (<div className="mt-6 p-6 bg-gray-50 rounded-lg border">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-lg font-medium">Booking Summary</h4>
                                            <Badge variant="outline" className="text-blue-600">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {selectedSlot.time}
                                            </Badge>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            <div className="flex justify-between items-center py-2 border-b">
                                                <span className="text-gray-600">Date</span>
                                                <span className="font-medium">{formatDate(selectedSlot.date)}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b">
                                                <span className="text-gray-600">Consultation Type</span>
                                                <Badge variant={consultationType === 'video' ? 'success' : 'default'}>
                                                    {consultationType === 'video' ? 'Video Call' : 'In-Person Visit'}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center py-2 border-b">
                                                <span className="text-gray-600">Fee</span>
                                                <span className="font-medium text-green-600">₹{doctorData.fee || '500'}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Button
                                                className="w-full bg-blue-600 hover:bg-blue-700"
                                                onClick={() => handleBookSlot(selectedSlot._id, consultationType)}
                                            >
                                                {consultationType === 'video' ? (
                                                    <>
                                                        <Video className="h-5 w-5 mr-2" />
                                                        Confirm Video Consultation
                                                    </>
                                                ) : (
                                                    <>
                                                        <User className="h-5 w-5 mr-2" />
                                                        Confirm In-Person Visit
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => setSelectedSlot(null)}
                                            >
                                                Cancel Selection
                                            </Button>
                                        </div>
                                    </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Rest of the existing UI components */}
            <div className="max-w-6xl mx-auto px-4 space-y-6">
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
