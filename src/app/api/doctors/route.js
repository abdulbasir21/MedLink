// src/app/api/doctors/route.js
import connectDB from "@/lib/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const doctors = await Doctor.find().select(
      "name specialization image experience description"
    );

    return NextResponse.json({ doctors });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
