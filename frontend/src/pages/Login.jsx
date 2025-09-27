import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().min(6, "Min 6 characters").required("Password required"),
});

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting login data:", data); // Debug log
      const res = await api.post("/auth/login", data);
      console.log("Login response:", res.data); // Debug log

      // Save token using AuthContext
      login(res.data.token);

      // Decode token to get role
      const decoded = jwt_decode(res.data.token);
      console.log("Decoded token:", decoded);

      const role = decoded.role;
      if (role === "admin") navigate("/admin");
      else navigate("/dashboard");

      toast.success("Login successful");
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        console.error("Backend response data:", err.response.data);
        console.error("Backend status:", err.response.status);
        toast.error(err.response.data.message || "Login failed on server");
      } else if (err.request) {
        console.error("No response received:", err.request);
        toast.error("No response from server, check backend");
      } else {
        toast.error("Error: " + err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input {...register("email")} placeholder="Email" className="w-full p-2 border mb-2 rounded" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border mb-2 rounded" />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
