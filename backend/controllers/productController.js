
import Product from "../models/Product.js";
import redisClient from "../config/redis.js";

// Get all products with Redis caching
export const getProducts = async (req, res) => {
  try {
    const cache = await redisClient.get("products");
    if (cache) return res.json(JSON.parse(cache));

    const products = await Product.find();
    await redisClient.setEx("products", 3600, JSON.stringify(products)); // cache for 1 hour
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
