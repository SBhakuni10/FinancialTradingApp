import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import ChartComponent from "../components/ChartComponent";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuy = async () => {
    if (!units || units < 1) return toast.error("Enter valid units");
    try {
      await api.post("/transactions/buy", { productId: id, units });
      toast.success("Purchase successful");
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await api.post("/watchlist", { productId: id });
      toast.success("Added to watchlist");
      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to watchlist");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const chartData = [
    { name: "Jan", value: product.price * 0.95 },
    { name: "Feb", value: product.price * 0.98 },
    { name: "Mar", value: product.price },
    { name: "Apr", value: product.price * 1.02 },
    { name: "May", value: product.price * 1.05 },
  ];

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">{product.name || "N/A"}</h2>
      <div className="text-gray-600 mb-4 space-y-1 text-sm">
        <p><span className="font-medium">Category:</span> {product.type || "N/A"}</p>
        <p><span className="font-medium">Symbol:</span> {product.symbol || "N/A"}</p>
        <p><span className="font-medium">Price per Unit:</span> ₹{product.price ?? "N/A"}</p>
        <p className="text-gray-500">{product.description || "No description available"}</p>
      </div>

      <div className="my-4 p-3 bg-white rounded-lg shadow-sm">
        <h3 className="text-md font-medium text-gray-700 mb-2">Price History</h3>
        <ChartComponent data={chartData} dataKey="value" />
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <input
          type="number"
          min="1"
          value={units}
          onChange={(e) => setUnits(Number(e.target.value))}
          className="border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
        <button
          onClick={handleBuy}
          className="bg-green-100 text-green-700 font-medium py-2 px-4 rounded hover:bg-green-200 transition text-sm"
        >
          Buy
        </button>
        <button
          onClick={handleAddToWatchlist}
          className="bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded hover:bg-blue-200 transition text-sm"
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
