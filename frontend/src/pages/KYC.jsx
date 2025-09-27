import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

function KYC() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    address: "",
    pan: "",
    idDocument: null,
    addressProof: null,
    selfie: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, dob, address, pan, idDocument, addressProof } = form;
    if (!fullName || !dob || !address || !pan || !idDocument || !addressProof) {
      return toast.error("Please fill all required fields and upload documents.");
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      await api.post("/auth/kyc", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("KYC submitted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">KYC Verification</h2>
        <p className="text-gray-500 mb-8 text-center">
          Complete your KYC to start investing securely.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column: Inputs */}
          <div className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Residential Address"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="pan"
              value={form.pan}
              onChange={handleChange}
              placeholder="PAN Number"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Right column: File uploads */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Upload ID Document</label>
              <input
                type="file"
                name="idDocument"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Upload Address Proof</label>
              <input
                type="file"
                name="addressProof"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Upload Selfie (Optional)</label>
              <input
                type="file"
                name="selfie"
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Submit button full width */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Submit KYC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default KYC;
