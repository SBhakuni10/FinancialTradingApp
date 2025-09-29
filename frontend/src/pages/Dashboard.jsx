import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto mt-16 p-7 text-center">
        <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to Your Trading Dashboard
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
          Manage your investments with ease and confidence.  
          Explore new opportunities, track your growth, and take smarter
          financial decisions — all in one place.
        </p>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 max-w-7xl mx-auto mt-12 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link
            to="/products"
            className="bg-white border border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition transform p-8 rounded-2xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-3xl font-semibold mb-3 text-blue-600">Products</span>
            <p className="text-gray-600 text-center text-sm">
              Browse and invest in top stocks & mutual funds.
            </p>
          </Link>

          <Link
            to="/portfolio"
            className="bg-white border border-green-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition transform p-8 rounded-2xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-3xl font-semibold mb-3 text-green-600">Portfolio</span>
            <p className="text-gray-600 text-center text-sm">
              Track and analyze your investment performance.
            </p>
          </Link>

          <Link
            to="/watchlist"
            className="bg-white border border-yellow-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition transform p-8 rounded-2xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-3xl font-semibold mb-3 text-yellow-600">Watchlist</span>
            <p className="text-gray-600 text-center text-sm">
              Keep an eye on your favorite stocks & funds.
            </p>
          </Link>

          <Link
            to="/kyc"
            className="bg-white border border-purple-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition transform p-8 rounded-2xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-3xl font-semibold mb-3 text-purple-600">Complete KYC</span>
            <p className="text-gray-600 text-center text-sm">
              Verify your identity & start secure trading.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
