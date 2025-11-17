"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/user", {
  withCredentials: true
});
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A3B8F] p-6">
      {/* Circle Avatar */}
      <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl font-bold mb-6">
        {user.name[0].toUpperCase()}
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md text-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender || "Not specified"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
