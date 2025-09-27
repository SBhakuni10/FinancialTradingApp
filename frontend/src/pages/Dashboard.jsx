import { Link } from "react-router-dom";


function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
    

      {/* Dashboard Content */}
      <div className="relative z-10 max-w-7xl mx-auto mt-12 p-6">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800">Dashboard</h2>
        <p className="text-gray-600 mb-10 text-lg">
          Welcome to your financial trading dashboard. Access your products, portfolio, watchlist, and KYC verification from below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link
            to="/products"
            className="bg-blue-50 border border-blue-100 shadow-md hover:shadow-lg transition p-8 rounded-xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-2xl font-medium mb-2">Products</span>
            <p className="text-blue-600 text-center text-sm">Browse and invest in stocks and mutual funds.</p>
          </Link>

          <Link
            to="/portfolio"
            className="bg-green-50 border border-green-100 shadow-md hover:shadow-lg transition p-8 rounded-xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-2xl font-medium mb-2">Portfolio</span>
            <p className="text-green-600 text-center text-sm">View your investments and track performance.</p>
          </Link>

          <Link
            to="/watchlist"
            className="bg-yellow-50 border border-yellow-100 shadow-md hover:shadow-lg transition p-8 rounded-xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-2xl font-medium mb-2">Watchlist</span>
            <p className="text-yellow-600 text-center text-sm">Keep an eye on your favorite products.</p>
          </Link>

          <Link
            to="/kyc"
            className="bg-purple-50 border border-purple-100 shadow-md hover:shadow-lg transition p-8 rounded-xl flex flex-col items-center justify-center text-gray-800"
          >
            <span className="text-2xl font-medium mb-2">Complete KYC</span>
            <p className="text-purple-600 text-center text-sm">Verify your identity to start trading.</p>
          </Link>
        </div>
      </div>
       
    </div>
  );
}

export default Dashboard;
