// models/Doctor.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  description: String,
  image: String, // filename
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "doctor" }
}, { timestamps: true });

DoctorSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

DoctorSchema.methods.comparePassword = function(password){
  return bcrypt.compare(password, this.password);
}

export default mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
