import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ChartComponent({ data, dataKey }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartComponent;
