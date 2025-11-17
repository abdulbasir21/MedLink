"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function UserAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // track which appointment is being deleted

  useEffect(() => {
    const fetchAppointments = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("You must be logged in to view appointments.");
        router.push("/login/user");
        return;
      }

      try {
        const res = await fetch(`/api/appointments/user/${userId}`, {
  credentials: "include" 
});
        const data = await res.json();

        if (res.ok) {
          setAppointments(data.appointments);
        } else {
          alert(data.error || "Failed to fetch appointments.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [router]);

  const handleDelete = async (appointmentId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    setDeleting(appointmentId);

    try {
      const res = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setAppointments((prev) =>
          prev.filter((appt) => appt._id !== appointmentId)
        );
        alert(data.message || "Appointment cancelled successfully");
      } else {
        alert(data.error || "Failed to cancel appointment");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while cancelling appointment.");
    } finally {
      setDeleting(null);
    }
  };

  if (loading)
  return (
    <section className="flex justify-center items-center min-h-screen bg-[#1A3B8F]">
      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
    </section>
  );

if (!appointments.length)
  return (
    <section className="flex justify-center items-center min-h-screen bg-[#1A3B8F]">
      <p className="text-white text-xl">You have no appointments yet.</p>
    </section>
  );

  return (
    
    <section className="py-16 bg-[#1A3B8F] min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 pt-10 text-white">My Appointments</h1>

        <div className="grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow"
            >
              {/* Doctor Image */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
                <Image
                  src={appt.doctor.image || "/placeholder-doctor.png"}
                  alt={appt.doctor.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Appointment Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  Dr. {appt.doctor.name}
                </h2>
                <p className="text-gray-600">{appt.doctor.specialization}</p>
              
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => handleDelete(appt._id)}
                disabled={deleting === appt._id}
                className="ml-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 disabled:opacity-50"
              >
                {deleting === appt._id ? "Cancelling..." : "Cancel"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
   
  );
}
