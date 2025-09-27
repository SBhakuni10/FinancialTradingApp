import Transaction from "../models/Transaction.js";

// Get user portfolio
export const getPortfolio = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });
    const portfolio = transactions.map(tx => ({
      productId: tx.productId,
      productName: tx.productName,
      units: tx.units,
      buyPrice: tx.price,
      currentValue: tx.units * tx.price * 1.05, // dummy calculation: current price = 1.05 * buy price
      returns: tx.units * tx.price * 1.05 - tx.units * tx.price,
    }));

    const totalInvested = transactions.reduce((sum, tx) => sum + tx.units * tx.price, 0);
    const currentValue = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
    const totalReturns = currentValue - totalInvested;

    res.json({ portfolio, totalInvested, currentValue, totalReturns });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
