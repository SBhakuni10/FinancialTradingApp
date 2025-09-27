import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
