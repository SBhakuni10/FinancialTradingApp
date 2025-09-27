import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pan: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  wallet: { type: Number, default: 100000 }, // virtual wallet
  kycCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
