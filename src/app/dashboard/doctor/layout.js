"use client";

import DoctorNavbar from '../../components/Navbar/DoctorNavbar'
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function UserLayout({ children }) {

const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true); // track loading

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

  if (loading) return null; // render nothing on server/client until data is ready

  if (!doctor) return <p className="text-center mt-8">Doctor not found</p>;

 

  return (
    <div className="min-h-screen flex flex-col">
       <DoctorNavbar name={doctor.name} role="doctor" image={doctor.image} />
      <main className="flex-1">{children}</main>
     

    </div>
  );
}
