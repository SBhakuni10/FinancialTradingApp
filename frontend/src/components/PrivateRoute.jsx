import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // wait until user is loaded
  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}

export default PrivateRoute;
