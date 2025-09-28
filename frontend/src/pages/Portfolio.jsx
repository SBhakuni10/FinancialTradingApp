import { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";
import api from "../utils/api";

function Portfolio() {
  const INITIAL_BALANCE = 100000;
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState({ invested: 0, currentValue: INITIAL_BALANCE, returns: 0 });
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ show: false, message: "" });

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio");
      const data = Array.isArray(res.data.portfolio) ? res.data.portfolio : [];
      setPortfolio(data);

      const invested = data.reduce((acc, item) => acc + item.units * item.buyPrice, 0);
      const currentValue = INITIAL_BALANCE - invested;
      const returnsValue = currentValue - invested;

      setSummary({ invested, currentValue, returns: returnsValue });

      // Show wallet empty alert
      if (currentValue <= 0) {
        setPopup({ show: true, message: "Wallet empty! You cannot invest anymore." });
      } else {
        setPopup({ show: false, message: "" });
      }
    } catch (err) {
      console.error("Failed to fetch portfolio:", err);
    } finally {
      setLoading(false);
    }
  };

  // Buy function
  const handleBuy = (amount) => {
    if (amount <= 0) return;

    // Check if enough balance
    if (amount > summary.currentValue) {
      setPopup({ show: true, message: "Required money not available!" });
      return;
    }

    // Update portfolio (simple calculation)
    const newInvested = summary.invested + amount;
    const newCurrentValue = summary.currentValue - amount;
    const newReturns = newCurrentValue - newInvested;

    setSummary({ invested: newInvested, currentValue: newCurrentValue, returns: newReturns });

    // Optional: add dummy product to portfolio
    setPortfolio(prev => [
      ...prev,
      { productName: "Manual Investment", units: 1, buyPrice: amount, currentValue: amount }
    ]);

    // Alert if wallet now empty
    if (newCurrentValue <= 0) {
      setPopup({ show: true, message: "Wallet empty! You cannot invest anymore." });
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const chartData = portfolio.map(item => ({
    name: item.productName,
    value: item.currentValue
  }));

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">My Portfolio</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-50 border border-blue-100 shadow-md p-5 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-medium text-blue-700 mb-2">Total Invested</h3>
          <p className="text-gray-800 text-xl font-semibold">₹{summary.invested.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 border border-green-100 shadow-md p-5 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-medium text-green-700 mb-2">Current Value</h3>
          <p className="text-gray-800 text-xl font-semibold">₹{summary.currentValue.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 shadow-md p-5 rounded-lg flex flex-col items-center">
          <h3 className="text-lg font-medium text-purple-700 mb-2">Returns</h3>
          <p className="text-gray-800 text-xl font-semibold">₹{summary.returns.toFixed(2)}</p>
        </div>
      </div>

    

      {/* Portfolio Chart */}
      {summary.currentValue > 0 && (
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Portfolio Chart</h3>
          {chartData.length > 0 ? (
            <ChartComponent data={chartData} dataKey="value" />
          ) : (
            <p className="text-gray-500 text-center">No investments yet.</p>
          )}
        </div>
      )}

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">Alert!</h2>
            <p className="mb-4">{popup.message}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setPopup({ show: false, message: "" })}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
