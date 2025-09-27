import Transaction from "../models/Transaction.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Buy product
export const buyProduct = async (req, res) => {
  const { productId, units } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const totalPrice = units * product.price;
    if (user.wallet < totalPrice) return res.status(400).json({ message: "Insufficient balance" });

    user.wallet -= totalPrice;
    await user.save();

    const transaction = await Transaction.create({
      userId: user._id,
      userName: user.name,
      productId: product._id,
      productName: product.name,
      units,
      price: product.price,
    });

    res.json({ message: "Purchase successful", transaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
