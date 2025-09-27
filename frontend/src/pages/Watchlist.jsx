import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const res = await api.get("/watchlist");
      // res.data contains an array of products or watchlist items with productId populated
      const products = res.data.map(item => item.productId || item);
      setWatchlist(products);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch watchlist");
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (productId) => {
    try {
      await api.delete(`/watchlist/${productId}`);
      toast.success("Removed from watchlist");
      fetchWatchlist();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error removing product");
    }
  };

  if (!watchlist.length) return <p className="text-center mt-10">No products in watchlist.</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">My Watchlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {watchlist.map(product => (
          <div key={product._id} className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p>Category: {product.type}</p>
            <p>Price per Unit: ₹{product.price}</p>
            <Link
              to={`/products/${product._id}`}
              className="mt-2 inline-block bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
            >
              View
            </Link>
            <button
              onClick={() => removeFromWatchlist(product._id)}
              className="mt-2 inline-block bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
