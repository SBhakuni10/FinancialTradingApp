import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products"); // token added via api.js
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Investment Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition p-6 rounded-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mb-1"><span className="font-medium">Category:</span> {product.type}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Symbol:</span> {product.symbol}</p>
              <p className="text-gray-600 mb-2"><span className="font-medium">Price per Unit:</span> ₹{product.price}</p>
              <p className="text-gray-500 text-sm">{product.description}</p>
            </div>
            <Link
              to={`/products/${product._id}`}
              className="mt-4 bg-blue-50 text-blue-700 font-medium py-2 px-4 rounded hover:bg-blue-100 text-center transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
