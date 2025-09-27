// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ========================
// Register
// ========================
export const register = async (req, res) => {
  const { name, email, password, pan, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pan,
      role: role || "user",
    });

    const token = generateToken(user._id, user.role);
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ========================
// Login
// ========================
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);
    res.status(200).json({ token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ========================
// Upload KYC
// ========================
export const uploadKYC = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Save file path or info to user's record
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { kyc: req.file.path },
      { new: true }
    );

    res.status(200).json({ message: "KYC uploaded successfully", user });
  } catch (err) {
    console.error("KYC upload error:", err);
    res.status(500).json({ message: err.message });
  }
};
