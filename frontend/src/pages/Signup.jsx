import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().min(6, "Min 6 characters").required("Password required"),
  pan: yup
    .string()
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN")
    .required("PAN required"),
  role: yup.string().oneOf(["user", "admin"], "Invalid role").required(),
});

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role: "user" },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Submitting signup data:", data); // Debug log
      const response = await api.post("/auth/register", data);
      console.log("Signup response:", response.data); // Debug log
      toast.success("Signup successful, proceed to login");
      navigate("/");
    } catch (err) {
      // More detailed logging
      console.error("Signup error:", err);
      if (err.response) {
        console.error("Backend response data:", err.response.data);
        console.error("Backend status:", err.response.status);
        toast.error(err.response.data.message || "Signup failed on server");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input {...register("name")} placeholder="Full Name" className="w-full p-2 border mb-2 rounded" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" className="w-full p-2 border mb-2 rounded" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border mb-2 rounded" />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <input {...register("pan")} placeholder="PAN Number" className="w-full p-2 border mb-2 rounded" />
        <p className="text-red-500 text-sm">{errors.pan?.message}</p>

        <select {...register("role")} className="w-full p-2 border mb-2 rounded">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <p className="text-red-500 text-sm">{errors.role?.message}</p>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded mt-2 hover:bg-green-700">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
