import Watchlist from "../models/Watchlist.js";
import Product from "../models/Product.js";

// Get user watchlist
export const getWatchlist = async (req, res) => {
  const items = await Watchlist.find({ userId: req.user._id }).populate("productId");
  const products = items.map(i => i.productId);
  res.json(products);
};

// Add product to watchlist
export const addToWatchlist = async (req, res) => {
  const { productId } = req.body;
  const exists = await Watchlist.findOne({ userId: req.user._id, productId });
  if (exists) return res.status(400).json({ message: "Already in watchlist" });

  await Watchlist.create({ userId: req.user._id, productId });
  res.json({ message: "Added to watchlist" });
};

// Remove product from watchlist
export const removeFromWatchlist = async (req, res) => {
  const { productId } = req.params;
  await Watchlist.findOneAndDelete({ userId: req.user._id, productId });
  res.json({ message: "Removed from watchlist" });
};
