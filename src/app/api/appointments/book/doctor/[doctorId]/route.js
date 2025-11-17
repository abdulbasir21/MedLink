// Book apointment  src/app/api/appointments/book/doctor/[doctorId]/route.js

import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

   
    const { pathname } = new URL(request.url);
    const doctorId = pathname.split("/").pop(); 

   
    const body = await request.json();
    const { userId, date, time } = body;

    console.log("Booking appointment for Doctor ID:", doctorId); 

    if (!userId || !doctorId || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields: userId, doctorId, date, time" },
        { status: 400 }
      );
    }
   console.log(userId,doctorId,date,time);
   // Validate MongoDB ObjectId
    if (!doctorId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid Doctor ID format" },
        { status: 400 }
      );
    }

    // Check if user already booked this doctor
const alreadyBooked = await Appointment.findOne({
  user: userId,
  doctor: doctorId,
});

if (alreadyBooked) {
  return NextResponse.json(
    { error: "You have already booked an appointment with this doctor." },
    { status: 400 }
  );
}


    const appointment = new Appointment({
      user: userId,
      doctor: doctorId,
      date,
      time,
    });

    await appointment.save();

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully!",
        appointment,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Appointment booking error:", error);
    return NextResponse.json(
      { error: "Failed to book appointment", details: error.message },
      { status: 500 }
    );
  }
}