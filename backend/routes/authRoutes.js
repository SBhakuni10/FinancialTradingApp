import express from "express";
import { register, login, uploadKYC } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/kyc", protect, upload.single("file"), uploadKYC);

export default router;
