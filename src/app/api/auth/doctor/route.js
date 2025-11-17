import { NextResponse } from "next/server";
import Doctor from "@/models/Doctor";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "doctor") return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const doctor = await Doctor.findById(decoded.id).select("-password");
    return NextResponse.json(doctor);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
