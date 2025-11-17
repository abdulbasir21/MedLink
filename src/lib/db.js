import mongoose from "mongoose";
const mongourl = process.env.MONGOURL;
const connectDB = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
