"use client";

import Image from "next/image";
import Link from "next/link";
import doctors from "../lib/doctors";

export default function AllDoctorsPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Doctors</h2>
          <p className="text-gray-600 mt-2">
            Browse our network of experienced healthcare professionals and find
            the right doctor for your needs.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <Link
              href={`/IndividualDoctor/${doctor.id}`}
              key={doctor.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
            >
              {/* Doctor Image */}
            <div className="w-full h-72 rounded-lg overflow-hidden mb-5 shadow-lg border-2 border-gray-200">
  <Image
    src={doctor.image}
    alt={doctor.name}
    width={400}
    height={300}
    className="object-cover object-center w-full h-full"
  />
</div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-900">
                {doctor.name}
              </h3>

              {/* Specialization */}
              <p className="text-blue-600 font-medium mt-1">
                {doctor.specialization}
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-3 flex-grow">
                {doctor.description}
              </p>

              {/* Button */}
              <div className="mt-5">
                <button className="w-full py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition">
                  View Profile &amp; Book
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
