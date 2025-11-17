"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctorId = localStorage.getItem("doctorId");

      if (!doctorId) {
        alert("Doctor not logged in!");
        return;
      }

      try {
        const res = await axios.get(`/api/appointments/doctor/${doctorId}`, {
  withCredentials: true
});
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setDeleting(id);
      const res = await axios.delete(`/api/appointments/${id}`);
      if (res.data.message) {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
        alert("Appointment cancelled successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <p className="text-center mt-8 text-white">Loading appointments...</p>;
  if (appointments.length === 0) return <p className="text-center pt-8 text-white">No appointments found.</p>;

  return (
  <div className="p-4 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-center text-white">
      My Appointments
    </h1>

    <div className="space-y-4">
      {appointments.map((appt) => (
        <div
          key={appt._id}
          className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 bg-white rounded-2xl shadow hover:shadow-lg transition"
        >
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4 w-full">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              {appt.user.name ? appt.user.name[0].toUpperCase() : "U"}
            </div>

            {/* Patient Details */}
            <div className="text-sm">
              <p className="font-semibold text-gray-800">
                Name: {appt.user.name || "Unknown"}
              </p>
              <p className="text-gray-500">
                Email: {appt.user.email || "No email"}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {new Date(appt.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {appt.time}
              </p>
            </div>
          </div>

          {/* BUTTON RESPONSIVE */}
          <button
            onClick={() => handleCancel(appt._id)}
            disabled={deleting === appt._id}
            className="bg-red-500 w-full md:w-auto text-center text-white px-4 py-2 rounded-xl hover:bg-red-600 disabled:opacity-50 transition"
          >
            {deleting === appt._id ? "Cancelling..." : "Cancel Appointment"}
          </button>
        </div>
      ))}
    </div>
  </div>
);
}
