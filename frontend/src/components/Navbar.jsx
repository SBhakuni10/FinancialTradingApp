import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-300 to-blue-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold hover:text-yellow-100 transition"
        >
          FinTrade
        </Link>

        {/* Nav Links */}
        {user && (
          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="hover:text-yellow-100 font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-yellow-100 font-medium transition"
            >
              Products
            </Link>
            <Link
              to="/portfolio"
              className="hover:text-yellow-100 font-medium transition"
            >
              Portfolio
            </Link>
            <Link
              to="/watchlist"
              className="hover:text-yellow-100 font-medium transition"
            >
              Watchlist
            </Link>
            {user.role === "admin" && (
              <Link
                to="/admin"
                className="hover:text-yellow-100 font-medium transition"
              >
                Admin
              </Link>
            )}
          </div>
        )}

        {/* Logout / Auth Buttons */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-semibold bg-pink-500 hover:bg-pink-700 px-4 py-2 rounded transition"
            >
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="hover:text-yellow-100 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-100 font-medium transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
