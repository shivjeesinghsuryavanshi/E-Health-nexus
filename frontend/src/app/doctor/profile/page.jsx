"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DoctorProfilePage() {
    const [profile, setProfile] = useState({
        username: "",
        firstName: "",
        lastName: "",
        nickname: "",
        role: "Subscriber",
        displayName: "",
        email: "",
        whatsapp: "",
        website: "",
        telegram: "",
        bio: "",
        oldPassword: "",
        newPassword: "",
        image: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const token = localStorage.getItem("doctor-token");
                if (!token) return;
                // Decode token to get doctor id (assuming JWT payload contains _id)
                const payload = JSON.parse(atob(token.split('.')[1]));
                const doctorId = payload._id;
                const res = await axios.get(
                    `http://localhost:5000/doctor/getbyid/${doctorId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Map backend fields to profile state as needed
                setProfile((prev) => ({
                    ...prev,
                    username: res.data.name || "",
                    firstName: res.data.name?.split(" ")[0] || "",
                    lastName: res.data.name?.split(" ")[1] || "",
                    email: res.data.email || "",
                    bio: res.data.about || "",
                    image: res.data.image || "",
                    googlemeetLink: res.data.googlemeetLink || "",
                    // Add more mappings if needed
                }));
                setImagePreview(res.data.image || "");
            } catch (err) {
                setStatus("Failed to fetch profile.");
            }
        };
        fetchDoctor();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Cloudinary upload
    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setStatus("Uploading image...");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "shiv7784"); // replace with your preset
        formData.append("cloud_name", "dcxvbe8hm"); // replace with your cloud name
        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dcxvbe8hm/image/upload", // replace with your cloud name
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();
            setProfile((prev) => ({ ...prev, image: data.secure_url }));
            setImagePreview(data.secure_url);
            setStatus("Image uploaded!");
        } catch (err) {
            setStatus("Image upload failed.");
        }
    };

    // Profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setStatus("Updating profile...");
        try {
            const token = localStorage.getItem("doctor-token");
            if (!token) return setStatus("No token found.");
            const payload = JSON.parse(atob(token.split('.')[1]));
            const doctorId = payload._id;
            await axios.put(
                `http://localhost:5000/doctor/update/${doctorId}`,
                {
                    name: profile.username,
                    email: profile.email,
                    about: profile.bio,
                    image: profile.image,
                    // Add other fields as needed
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setStatus("Profile updated successfully!");
        } catch (err) {
            setStatus("Profile update failed.");
        }
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        // handle password change logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-2">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 bg-white rounded-lg shadow p-6">
                    <div className="mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 overflow-hidden">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
                                ) : (
                                    profile.firstName?.[0] || "D"
                                )}
                            </div>
                            <div>
                                <div className="font-semibold">{profile.firstName || "Doctor Name"}</div>
                                <div className="text-xs text-gray-500">{profile.email || "doctor@email.com"}</div>
                            </div>
                        </div>
                    </div>
                    <nav>
                        <ul className="space-y-2">
                            <li>
                                <button className="w-full text-left px-3 py-2 rounded bg-blue-50 text-blue-600 font-semibold">
                                    Dashboard
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                                    Profile
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                                    Appointments
                                </button>
                            </li>
                            <li>
                                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                                    Settings
                                </button>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 bg-white rounded-lg shadow p-8">
                    <form onSubmit={handleProfileUpdate}>
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Profile Photo & Password */}
                            <div className="w-full md:w-1/3">
                                <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-5xl text-gray-400 overflow-hidden">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                                        ) : (
                                            profile.firstName?.[0] || "D"
                                        )}
                                    </div>
                                    <label className="bg-gray-100 border px-4 py-2 rounded font-medium hover:bg-gray-200 cursor-pointer">
                                        Upload Photo
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handlePhotoUpload}
                                        />
                                    </label>
                                </div>
                                <form className="mt-8" onSubmit={handlePasswordChange}>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">Old Password</label>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            value={profile.oldPassword}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-1">New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={profile.newPassword}
                                            onChange={handleChange}
                                            className="w-full border rounded px-3 py-2"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold w-full"
                                    >
                                        Change Password
                                    </button>
                                </form>
                            </div>

                            {/* Profile Info */}
                            <div className="w-full md:w-2/3">
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold mb-2">Profile Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={profile.username}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profile.firstName}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Last Name </label>
                                            
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profile.lastName}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Role</label>
                                            <select
                                                name="role"
                                                value={profile.role}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            >
                                                <option>Subscriber</option>
                                                <option>Admin</option>
                                                <option>Doctor</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Gender</label>
                                            <input
                                                type="text"
                                                name="gender"
                                                value={profile.gender}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Display Name Publicly as</label>
                                            <input
                                                type="text"
                                                name="displayName"
                                                value={profile.displayName}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-xl font-bold mb-2">Contact Info</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email (required)</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">WhatsApp</label>
                                            <input
                                                type="text"
                                                name="whatsapp"
                                                value={profile.whatsapp}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Google meet</label>
                                            <input
                                                type="text"
                                                name="googlemeetLink"
                                                value={profile.googlemeetLink}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Website</label>
                                            <input
                                                type="text"
                                                name="website"
                                                value={profile.website}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Year of Experience</label>
                                            <input
                                                type="text"
                                                name="experience"
                                                value={profile.experience}
                                                onChange={handleChange}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold mb-2">About the User</h2>
                                    <label className="block text-sm font-medium mb-1">Biographical Info</label>
                                    <textarea
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full border rounded px-3 py-2"
                                        placeholder="Write something about yourself..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded transition"
                                >
                                    Update Profile
                                </button>
                                {status && (
                                    <div className="mt-4 text-center text-sm text-gray-600">{status}</div>
                                )}
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}
