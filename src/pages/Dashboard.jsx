import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import KpiCard from "../components/KpiCard";
import { getDashboardKpis } from "../services/dashboardService";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKpis() {
      const data = await getDashboardKpis();
      setKpis(data);
      setLoading(false);
    }

    loadKpis();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Carregando indicadores...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Produtos cadastrados"
          value={kpis.totalProdutos}
        />

        <KpiCard
          title="Produtos ativos"
          value={kpis.produtosAtivos}
        />

        <KpiCard
          title="Estoque baixo"
          value={kpis.estoqueBaixo}
          subtitle="≤ 5 unidades"
        />

        <KpiCard
          title="Fornecedores"
          value={kpis.totalFornecedores}
        />
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Última atualização de estoque:{" "}
        {kpis.ultimaAtualizacao
          ? new Date(kpis.ultimaAtualizacao).toLocaleString()
          : "—"}
      </div>
    </DashboardLayout>
  );
}
