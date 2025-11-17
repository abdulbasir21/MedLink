import User from "@/models/User";
import Doctor from "@/models/Doctor";
import connectDB from "@/lib/db";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { role } = body;

    if (role === "user") {
      const { name, gender, email, password } = body;

      // Duplicate check
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return Response.json({ error: "Email already registered" }, { status: 409 });
      }

      const user = new User({ name, gender, email, password, role: "user" });
      await user.save();

      return Response.json({ message: "User registered", user }, { status: 201 });
    }

    if (role === "doctor") {
      const { name, specialization, experience, description, email, password, imageBase64 } = body;

      // Duplicate check
      const existingDoctor = await Doctor.findOne({ email });
      if (existingDoctor) {
        return Response.json({ error: "Email already registered" }, { status: 409 });
      }

      let imageUrl = "";
      if (imageBase64) {
        const upload = await imagekit.upload({
          file: imageBase64,
          fileName: `${Date.now()}_${name}`,
          folder: "/doctors",
        });
        imageUrl = upload.url;
      }

      const doctor = new Doctor({
        name,
        specialization,
        experience,
        description,
        email,
        password,
        role: "doctor",
        image: imageUrl,
      });

      await doctor.save();

      return Response.json({ message: "Doctor registered", doctor }, { status: 201 });
    }

    return Response.json({ error: "Invalid role" }, { status: 400 });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
