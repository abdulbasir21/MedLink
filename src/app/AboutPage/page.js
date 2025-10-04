"use client";

import { FaUserFriends, FaBriefcaseMedical, FaStethoscope, FaClock } from "react-icons/fa";

export default function AboutPage() {
  return (
    <section className="py-16  bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mt-4 text-gray-900">About MedLink</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We are dedicated to providing exceptional healthcare services with a focus on 
            patient satisfaction and medical excellence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At <strong>MedLink</strong>, our mission is to make quality healthcare accessible to everyone. 
            We believe that finding and booking appointments with the right healthcare professionals 
            should be simple, convenient, and stress-free.
          </p>
          <p className="text-gray-700">
            Our platform connects patients with a diverse network of experienced doctors across various 
            specialties, ensuring that you receive the care you need when you need it.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <FaUserFriends className="text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">Patient-Centered Care</h3>
            </div>
            <p className="text-gray-600 text-sm">
              We put our patients first, providing compassionate and personalized healthcare services.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <FaBriefcaseMedical className="text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">Expert Professionals</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Our team consists of highly qualified doctors with years of experience in their specialties.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <FaStethoscope className="text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">Comprehensive Services</h3>
            </div>
            <p className="text-gray-600 text-sm">
              From general checkups to specialized treatments, we offer a wide range of medical services.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600">
              <FaClock className="text-xl" />
              <h3 className="text-lg font-semibold text-gray-900">Convenient Scheduling</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Book appointments at your convenience with our easy-to-use booking system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
