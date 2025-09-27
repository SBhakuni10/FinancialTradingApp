import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Product name
  type: { type: String, required: true },       // Stock or Mutual Fund
  symbol: { type: String, required: true },     // Stock symbol or fund code
  price: { type: Number, required: true },      // Price per unit
  description: { type: String, required: true },// Product description
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
