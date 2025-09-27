import express from "express";
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} from "../controllers/watchlistController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWatchlist);
router.post("/", protect, addToWatchlist);
router.delete("/:productId", protect, removeFromWatchlist);

export default router;
