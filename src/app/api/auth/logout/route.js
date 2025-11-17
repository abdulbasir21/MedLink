// src/app/api/auth/logout/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // Clear the cookie
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { 
    httpOnly: true, 
    path: "/", 
    maxAge: 0 
  });

  return response;
}
