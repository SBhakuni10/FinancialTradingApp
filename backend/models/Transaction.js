import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userName: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  productName: String,
  units: Number,
  price: Number,
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
