import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "user") return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user = await User.findById(decoded.id).select("-password");
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
