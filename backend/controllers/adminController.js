import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get all transactions (admin only)
export const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
};
