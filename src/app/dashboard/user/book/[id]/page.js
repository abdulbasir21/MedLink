"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaStethoscope, FaUserMd } from "react-icons/fa";
import axios from "axios";

export default function DoctorDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [doctor, setDoctor] = useState(null);
  const [userId, setUserId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch logged-in user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("You must be logged in to book an appointment.");
      router.push("/login/user");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  // Fetch doctor details from API (Axios)
  useEffect(() => {
    if (!id) return;

    const fetchDoctor = async () => {
      try {
        setFetching(true);

        const response = await axios.get(`/api/doctors/${id}`, {
  withCredentials: true
});
        console.log("Doctor API response:", response.data);

        if (!response.data.doctor) throw new Error("Doctor not found");

        setDoctor(response.data.doctor);
      } catch (err) {
        console.error(err);
        alert(err.message);
        router.push("/home/user");
      } finally {
        setFetching(false);
      }
    };

    fetchDoctor();
  }, [id, router]);

  // Handle appointment booking (Axios)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) return alert("User not loaded yet");
    if (!date || !time) return alert("Please select date and time");

    setLoading(true);

   try {
  console.log("Booking payload:", { userId, date, time });

  const response = await axios.post(
    `/api/appointments/book/doctor/${id}`,
    { userId, date, time }
  );

  alert("Appointment booked successfully!");
  router.push("/dashboard/user/appointments");

} catch (err) {
  console.error(err);

  const msg = err.response?.data?.error || "Booking failed";

  //  If user already booked message and redirect
  if (msg.includes("already booked")) {
    alert("You have already booked an appointment with this doctor.");
    router.push("/dashboard/user/home");  // redirect to home
    return;
  }

  alert(msg);
}
  }

  if (fetching)
    return <p className="p-6 text-center">Loading doctor details...</p>;
  if (!doctor)
    return <p className="p-6 text-center">Doctor not found.</p>;



  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow p-8">
        {/* Doctor Image */}
        <div className="relative w-full h-120 rounded-xl overflow-hidden">
          <Image
            src={doctor.image || "/placeholder-doctor.png"}
            alt={doctor.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Doctor Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>

          <div className="flex items-center gap-2 text-blue-600 mt-3">
            <FaStethoscope />
            <span className="text-lg font-medium">{doctor.specialization}</span>
          </div>

          {doctor.experience && (
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <FaUserMd />
              <span>{doctor.experience} years experience</span>
            </div>
          )}

          {doctor.description && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
            </div>
          )}

          {/* Appointment Form */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label>
              Select Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </label>

            <label>
              Select Time:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded mt-1"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
