import { useEffect, useState } from "react";
import ChartComponent from "../components/ChartComponent";
import api from "../utils/api"; // make sure you have api configured

function Portfolio() {
  const INITIAL_BALANCE = 100000;
  const [portfolio, setPortfolio] = useState([]);
  const [summary, setSummary] = useState({ invested: 0, currentValue: INITIAL_BALANCE, returns: 0 });
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get("/portfolio");
      const data = Array.isArray(res.data.portfolio) ? res.data.portfolio : [];
      setPortfolio(data);

      const invested = data.reduce((acc, item) => acc + item.units * item.buyPrice, 0);
      const currentValue = INITIAL_BALANCE - invested;
      setSummary({ invested, currentValue, returns: currentValue - invested });
    } catch (err) {
      console.error("Failed to fetch portfolio:", err);
    } finally {
      setLoading(false);
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
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Portfolio Chart</h3>
        {chartData.length > 0 ? (
          <ChartComponent data={chartData} dataKey="value" />
        ) : (
          <p className="text-gray-500 text-center">No investments yet.</p>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
