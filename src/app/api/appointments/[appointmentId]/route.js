// src/app/api/appointments/[appointmentId]/route.js

import connectDB from "@/lib/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    await connectDB();

   
    const { pathname } = new URL(request.url);
    const appointmentId = pathname.split("/").pop();

    console.log("Deleting Appointment ID:", appointmentId);

    // Validate MongoDB ObjectId format
    if (!appointmentId || !appointmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid Appointment ID format" },
        { status: 400 }
      );
    }

    const deleted = await Appointment.findByIdAndDelete(appointmentId);

    if (!deleted) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Appointment deleted successfully!",
        deletedAppointment: deleted,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete appointment error:", error);
    return NextResponse.json(
      {
        error: "Failed to delete appointment",
        details: error.message,
      },
      { status: 500 }
    );
  }
}