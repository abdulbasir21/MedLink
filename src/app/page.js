"use client";
import { useRouter } from "next/navigation"; 


export default function LandingPage() {
  const router = useRouter();

  return (
  <div
  className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center px-4"
  style={{ backgroundImage: "url('/header1.png')" }}
>
  {/* Glass Card */}
  <div className="backdrop-blur-xl bg-transparent border-white/20 
shadow-[0_10px_40px_rgba(0,0,0,0.4)] rounded-3xl p-10 w-full max-w-lg text-center">


    
    <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6">
      Welcome
    </h1>

    <p className="text-white/80 mb-8 text-lg">
      Choose how you want to continue
    </p>

    <div className="flex flex-col sm:flex-row gap-5 justify-center">
      {/* Doctor Button */}
      <button
        onClick={() => router.push("/login/doctor")}
        className="px-8 py-3 rounded-xl font-semibold text-white 
          bg-blue-600/80 hover:bg-blue-700 shadow-lg backdrop-blur-sm 
          transition-all duration-300 hover:scale-105"
      >
        Login as Doctor
      </button>

      {/* User Button */}
      <button
        onClick={() => router.push("/login/user")}
        className="px-8 py-3 rounded-xl font-semibold text-white 
          bg-green-600/80 hover:bg-green-700 shadow-lg backdrop-blur-sm 
          transition-all duration-300 hover:scale-105"
      >
        Login as User
      </button>
    </div>

  </div>
</div>

  );
}
