"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import UserNavbar from "../../../components/Navbar/UserNavbar";
import Footer from "../../../components/Footer";
import Doctor from "../../../components/Doctor";
import HeroSection from "../../../components/HeroSection";
import ServicesSection from "@/app/components/Navbar/ServicesSection";

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    // Redirect if not logged in or wrong role
    if (!userId || role !== "user") {
      router.push("/login/user");
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#doctors") {
      setTimeout(() => {
        const el = document.getElementById("doctors");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [pathname]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
     
      <HeroSection />
      <Doctor />
      <ServicesSection />
      <Footer />
    </div>
  );
}
