"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStethoscope } from "react-icons/fa";
import doctors from "../lib/doctors";

export default function DoctorsSection() {
  const displayedDoctors = doctors.slice(0, 4); // show only 4 doctors

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Meet Our Doctors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 mb-12 text-lg"
        >
          Our team of experienced healthcare professionals is here to provide you with the best care possible.
        </motion.p>

        {/* Doctor Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {displayedDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                href={`/IndividualDoctor/${doctor.id}`}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col items-center cursor-pointer"
              >
                {/* Doctor Image */}
              <div className="w-full h-72 rounded-xl overflow-hidden mb-6 shadow-lg border-2 border-gray-200">
  <Image
    src={doctor.image}
    alt={doctor.name}
    width={300}
    height={300}
    className="object-cover object-center w-full h-full"
  />
</div>



                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {doctor.name}
                </h3>

                {/* Specialization */}
                <div className="flex items-center justify-center gap-2 text-blue-600 mt-2 mb-6 text-sm">
                  <FaStethoscope />
                  <span>{doctor.specialization}</span>
                </div>

                {/* Button */}
                <div className="w-full">
                  <span className="inline-block w-full px-5 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-100 transition">
                    View Profile &amp; Book
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
