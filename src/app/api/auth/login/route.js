import connectDB from "@/lib/db";
import User from "@/models/User";
import Doctor from "@/models/Doctor";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();  

    // Try User model first
    let user = await User.findOne({ email });
    let role = null;

    // If not found in User, try Doctor model
    if (user) {
      role = "user";
    } else {
      user = await Doctor.findOne({ email });
      if (user) {
        role = "doctor";
      }
    }

    // If not found in both → error
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 400 });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return Response.json({ error: "Wrong Password" }, { status: 400 });
    }

    // Now role is determined safely
    const token = jwt.sign(
      { id: user._id, role: role },  // ✔ role from DB, not frontend
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({ message: "Logged in successfully", role, user }),
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`,
          "Content-Type": "application/json"
        }
      }
    );

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
