"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DoctorNavbar from "../../../components/Navbar/DoctorNavbar";

export default function DoctorProfilePage() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get("/api/auth/doctor", {
  withCredentials: true
});
        setDoctor(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!doctor) return <p className="text-center mt-8">Doctor not found</p>;

  return (
    <>
    
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#00072D] p-6">
        {/* Circle Avatar with Image */}
        {doctor.image ? (
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 rounded-full object-cover mb-6  "
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold mb-6">
            {doctor.name[0].toUpperCase()}
          </div>
        )}

        {/* Details Card */}
       <div className="w-full max-w-md p-8 rounded-3xl bg-transparent backdrop-blur-xl border border-white/20 
                shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-white mx-auto">
  {/* Heading */}
  <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">
    Doctor Profile
  </h1>

  {/* Profile Details */}
  <div className="space-y-4">
    <p className="text-white/90">
      <strong className="text-white">Name:</strong> {doctor.name}
    </p>
    <p className="text-white/90">
      <strong className="text-white">Email:</strong> {doctor.email}
    </p>
    <p className="text-white/90">
      <strong className="text-white">Specialization:</strong> {doctor.specialization}
    </p>
    <p className="text-white/90">
      <strong className="text-white">Experience:</strong> {doctor.experience} years
    </p>
    <p className="text-white/90">
      <strong className="text-white">Description:</strong> {doctor.description}
    </p>
  </div>
</div>

      </div>
    </>
  );
}
