import express from "express";
import { getAllUsers, getAllTransactions } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, admin, getAllUsers);
router.get("/transactions", protect, admin, getAllTransactions);

export default router;
