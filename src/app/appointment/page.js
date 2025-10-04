"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after submit

export default function Appointment() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    doctor: "", 
  });

  const doctors = [
    "Dr. Ahmed Khan",
    "Dr. Bilal Raza",
    "Dr. Imran Ali",
    "Dr. Omar Farooq",
    "Dr. Saad Qureshi",
    "Dr. Hassan Shah"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(`Appointment Confirmed with ${formData.doctor || "a doctor"}!`);

    // Redirect to home after short delay
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 px-4 pt-28 md:pt-32">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 w-full max-w-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Book Your Appointment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-gray-800 placeholder-gray-400 bg-white"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-gray-800 placeholder-gray-400 bg-white"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-gray-800 placeholder-gray-400 bg-white"
              required
            />
          </div>

          {/* ✅ Choose Doctor */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Choose Doctor
            </label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              text-gray-800 bg-white"
              required
            >
              <option value="">Select a doctor</option>
              {doctors.map((doc, index) => (
                <option key={index} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          {/* Appointment Date & Time */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                text-gray-800 bg-white"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-1">
                Appointment Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                text-gray-800 bg-white"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
