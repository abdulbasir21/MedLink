"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaStethoscope, FaUserMd, FaClock, FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function DoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("/api/doctors", {
  withCredentials: true
});
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <p className="text-center p-8">Loading doctors...</p>;

  if (!doctors.length)
    return <p className="text-center p-8">No doctors available at the moment.</p>;

  return (
    <section className="py-20 bg-gray-50" id="doctors">
      <div className="max-w-7xl mx-auto px-6 text-center">
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex flex-col items-center cursor-pointer">

                {/* Doctor Image */}
                <div className="w-full h-72 rounded-xl overflow-hidden mb-6 shadow-lg  relative">
                  <Image
                    src={doctor.image || "/placeholder-doctor.png"}
                    alt={doctor.name || "Doctor"}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>

                {/* Specialization */}
                <div className="flex items-center justify-center gap-2 text-blue-600 mt-2 text-sm">
                  <FaStethoscope />
                  <span>{doctor.specialization}</span>
                </div>

               

                {/* Description */}
                <div className="flex items-start justify-center gap-2 text-gray-600 mt-3 text-xs px-2 text-center">
                  <FaInfoCircle className="mt-0.5" />
                  <p className="line-clamp-3">{doctor.description || "No description available."}</p>
                </div>

                {/* View Profile Button */}
                <div className="w-full mt-6">
                  <button
                    onClick={() => doctor._id && router.push(`/dashboard/user/book/${doctor._id}`)}
                    className="inline-block w-full px-5 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
                  >
                    View Profile &amp; Book
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
