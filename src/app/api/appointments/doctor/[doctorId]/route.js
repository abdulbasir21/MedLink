// src/app/api/appointments/doctor/[doctorId]/route.js

import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

   
    const { pathname } = new URL(request.url);
    const doctorId = pathname.split("/").pop(); 

    console.log("Fetching appointments for Doctor ID:", doctorId);

    
    if (!doctorId || !doctorId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid Doctor ID format" },
        { status: 400 }
      );
    }

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email phone image")
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
    console.error("Error fetching doctor's appointments:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch appointments",
        details: error.message,
      },
      { status: 500 }
    );
  }
}