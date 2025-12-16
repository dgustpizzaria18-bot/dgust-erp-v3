import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function MovimentacaoEstoqueChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow h-96">
      <h3 className="font-semibold mb-4">
        Movimentação de estoque
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ENTRADA" />
          <Line type="monotone" dataKey="SAIDA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
