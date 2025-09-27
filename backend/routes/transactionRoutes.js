import express from "express";
import { buyProduct } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/buy", protect, buyProduct);

export default router;
