"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Convert file to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const role = "doctor"; // hardcoded role

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const specialization = e.target.specialization.value.trim();
    const experience = e.target.experience.value.trim();
    const description = e.target.description.value.trim();

    // Validation
    if (name.length < 3) {
      alert("Name must be at least 3 characters long.");
      setLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    let imageBase64 = "";
    if (file) {
      imageBase64 = await fileToBase64(file);
    }

    const formData = {
      role,
      name,
      email,
      password,
      specialization,
      experience,
      description,
      imageBase64,
    };

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      alert(data.message);

      if (res.ok && role === "doctor") {
        router.push("/login/doctor");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-10 flex justify-center items-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/header1.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-transparent border border-white/20
          shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-3xl
          p-10 w-full max-w-md text-center flex flex-col gap-5"
      >
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg">
          Doctor Registration
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            placeholder-white/70 border border-white/30
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            placeholder-white/70 border border-white/30
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            placeholder-white/70 border border-white/30
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all"
        />

        {/* Specialization */}
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            placeholder-white/70 border border-white/30
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all"
        />

        {/* Experience */}
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            placeholder-white/70 border border-white/30
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            placeholder-white/70 border border-white/30
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all resize-none h-24"
        ></textarea>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full p-3 rounded-xl bg-transparent text-white
            border border-white/30 cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-blue-400
            backdrop-blur-md transition-all"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full py-3 rounded-xl font-semibold text-white
            bg-blue-600/80 hover:bg-blue-700 shadow-lg backdrop-blur-sm
            transition-all duration-300 hover:scale-105 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
