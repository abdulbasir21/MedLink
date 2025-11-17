"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";

export default function UserRegister() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", gender: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { name, email, password } = form; // destructure from your state

  // Validation
  if (!name || name.trim().length < 3) {
    alert("Name must be at least 3 characters long.");
    setLoading(false);
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  if (!password || password.length < 6) {
    alert("Password must be at least 6 characters long.");
    setLoading(false);
    return;
  }

  try {
    await axios.post("/api/auth/register", {
      ...form,
      role: "user",
    });

    alert("User registered successfully");
    router.push("/login/user");
  } catch (err) {
    alert(err.response?.data?.error || "Registration failed");
  } finally {
    setLoading(false);
  }
};


  return (
  <div
  className="min-h-screen flex justify-center items-center bg-cover bg-center px-4"
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
      User Registration
    </h2>

    {/* Name Input */}
    <input
      name="name"
      placeholder="Name"
      required
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-transparent text-white
      placeholder-white/70 border border-white/30
      focus:outline-none focus:ring-2 focus:ring-blue-400
      backdrop-blur-md transition-all"
    />

    {/* Gender Input */}
   <select
  name="gender"
  required
  onChange={handleChange}
  className="w-full p-3 rounded-xl bg-transparent text-white
    placeholder-white/70 border border-white/30
    focus:outline-none focus:ring-2 focus:ring-blue-400
    backdrop-blur-md transition-all"
>
  <option  value="" disabled selected>
    Select Gender
  </option >
  <option className="text-black " value="male">Male</option>
  <option className="text-black" value="female">Female</option>
</select>


    {/* Email Input */}
    <input
      name="email"
      type="email"
      placeholder="Email"
      required
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-transparent text-white
      placeholder-white/70 border border-white/30
      focus:outline-none focus:ring-2 focus:ring-blue-400
      backdrop-blur-md transition-all"
    />

    {/* Password Input */}
    <input
      name="password"
      type="password"
      placeholder="Password"
      required
      onChange={handleChange}
      className="w-full p-3 rounded-xl bg-transparent text-white
      placeholder-white/70 border border-white/30
      focus:outline-none focus:ring-2 focus:ring-blue-400
      backdrop-blur-md transition-all"
    />

    {/* Submit Button */}
    <button
      type="submit"
      className="mt-2 w-full py-3 rounded-xl font-semibold text-white
      bg-blue-600/80 hover:bg-blue-700 shadow-lg backdrop-blur-sm
      transition-all duration-300 hover:scale-105"
    >
      {loading ? "Registering..." : "Register"}
    </button>

    {/* Login Link */}
    <p className="text-sm text-white/80 mt-3">
      Already have an account?{" "}
      <span
        className="text-blue-300 cursor-pointer hover:underline"
        onClick={() => router.push("/login/user")}
      >
        Login
      </span>
    </p>
  </form>
</div>

  );
}
