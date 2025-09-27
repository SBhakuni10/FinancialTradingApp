import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";

// Pages
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import KYC from "./pages/KYC.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/kyc" element={<PrivateRoute><KYC /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
        <Route path="/portfolio" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
        <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
