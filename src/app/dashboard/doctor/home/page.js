"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FetchAllAppointments from '../../../components/FetchAllAppointments';

export default function DoctorDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const doctorId = localStorage.getItem("doctorId");

    // Redirect if not logged in or wrong role
    if (!doctorId || role !== "doctor") {
      router.push("/login/doctor");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#00072D]">
      <FetchAllAppointments />
    </div>
  );
}
