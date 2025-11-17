"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";

export default function UserLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post("/api/auth/login", { ...form }); 

    if (res.data.user && res.data.user._id) {
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("role", res.data.role); // use backend role
    }

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    router.push("/dashboard/user/home");
  } catch (err) {
    alert(err.response?.data?.error || "Login failed");
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
    p-10 w-full max-w-md text-center"
  >
    {/* Heading */}
    <h2 className="text-3xl font-extrabold text-white mb-6 drop-shadow-lg">
      User Login
    </h2>

    {/* Email Input */}
    <input
      name="email"
      type="email"
      placeholder="Email"
      onChange={handleChange}
      required
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
      onChange={handleChange}
      required
      className="w-full p-3 mt-3 rounded-xl bg-transparent text-white 
      placeholder-white/70 border border-white/30 
      focus:outline-none focus:ring-2 focus:ring-blue-400 
      backdrop-blur-md transition-all"
    />

    {/* Submit Button */}
    <button
      type="submit"
      className="mt-3 w-full py-3 rounded-xl font-semibold text-white 
      bg-blue-600/80 hover:bg-blue-700 shadow-lg backdrop-blur-sm 
      transition-all duration-300 hover:scale-105"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

    {/* Register Link */}
    <p className="text-sm text-white/80 mt-4">
      Don’t have an account?{" "}
      <span
        className="text-blue-300 cursor-pointer hover:underline"
        onClick={() => router.push("/register/user")}
      >
        Register
      </span>
    </p>
  </form>
</div>

  );
}
