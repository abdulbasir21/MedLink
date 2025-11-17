"use client";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DoctorNavbar({ name,image }) {
  const router = useRouter();

  const logout = async () => {
  try {
    // Call backend logout API to clear HttpOnly cookie
    await axios.get("/api/auth/logout", {
  withCredentials: true
});

    // Remove doctor-related and common items from localStorage
    localStorage.removeItem("doctorId");
    localStorage.removeItem("role");
   

    // Redirect to homepage
    router.push("/");
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Failed to logout. Try again.");
  }
};

   const goToProfile = () => {
    router.push("/dashboard/doctor/profile");
  };

  return (
    <nav className="bg-white p-4 flex justify-between items-center text-[#007AFF]">
      <div className="text-xl font-bold cursor-pointer" onClick={()=>{
        router.push("/dashboard/doctor/home")
      }}>Doctor Dashboard</div>
      <div  onClick={goToProfile} className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div   className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {name[0].toUpperCase()}
          </div>
        )}
        <button onClick={logout} className="bg-[#007AFF] text-white px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
