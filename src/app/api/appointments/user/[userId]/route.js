// src/app/api/appointments/user/[userId]/route.js

import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

  
    const { pathname } = new URL(request.url);
    const userId = pathname.split("/").pop(); 

    console.log("Fetching appointments for User ID:", userId);

    // Validate ObjectId format 
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid User ID format" },
        { status: 400 }
      );
    }

   const appointments = await Appointment.find({ user: userId })
  .populate("user", "name email")
  .populate("doctor", "name image specialization") // <-- populate doctor
  .sort({ date: 1, time: 1 })
  .lean();


    return NextResponse.json(
      {
        success: true,
        count: appointments.length,
        appointments,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching user appointments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch appointments",
        details: error.message,
      },
      { status: 500 }
    );
  }
}