import { useEffect, useState } from "react";
import api from "../utils/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/admin/users");
        setUsers(usersRes.data);

        const transRes = await api.get("/admin/transactions");
        setTransactions(transRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Users Table */}
      <div className="mb-8 bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Registered Users</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">PAN</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.pan}</td>
                <td className="border p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Transactions</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Product</th>
              <th className="border p-2">Units</th>
              <th className="border p-2">Price per Unit</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx._id}>
                <td className="border p-2">{tx.userName}</td>
                <td className="border p-2">{tx.productName}</td>
                <td className="border p-2">{tx.units}</td>
                <td className="border p-2">₹{tx.price}</td>
                <td className="border p-2">₹{tx.units * tx.price}</td>
                <td className="border p-2">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
