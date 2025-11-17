// app/api/doctors/[id]/route.js

import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(request) {
  
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop(); 
  console.log("Extracted ID from URL:", id); 

  if (!id || id.length < 20) {
    return NextResponse.json(
      { error: "Invalid or missing Doctor ID" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return NextResponse.json(
        { error: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, doctor });

  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}