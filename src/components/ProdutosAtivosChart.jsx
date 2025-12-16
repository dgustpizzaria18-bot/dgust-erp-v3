import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProdutosAtivosChart({ data }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow h-80">
      <h3 className="font-semibold mb-4">
        Produtos ativos x inativos
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
