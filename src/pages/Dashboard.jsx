import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

/* KPIs */
import KpiCard from "../components/KpiCard";
import { getDashboardKpis } from "../services/dashboardService";

/* Gráficos */
import ProdutosPorCategoriaChart from "../components/ProdutosPorCategoriaChart";
import ProdutosAtivosChart from "../components/ProdutosAtivosChart";
import MovimentacaoEstoqueChart from "../components/MovimentacaoEstoqueChart";

/* Services de gráficos */
import {
  getProdutosPorCategoria,
  getProdutosAtivosInativos,
} from "../services/dashboardChartsService";
import { getMovimentacaoEstoque } from "../services/estoqueChartsService";

export default function Dashboard() {
  /* STATES */
  const [kpis, setKpis] = useState(null);
  const [categoriasData, setCategoriasData] = useState([]);
  const [ativosData, setAtivosData] = useState([]);
  const [estoqueData, setEstoqueData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* EFFECT */
  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          kpisResult,
          categoriasResult,
          ativosResult,
          estoqueResult,
        ] = await Promise.all([
          getDashboardKpis(),
          getProdutosPorCategoria(),
          getProdutosAtivosInativos(),
          getMovimentacaoEstoque(),
        ]);

        setKpis(kpisResult);
        setCategoriasData(categoriasResult);
        setAtivosData(ativosResult);
        setEstoqueData(estoqueResult);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  /* LOADING */
  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-500">Carregando dashboard...</p>
      </DashboardLayout>
    );
  }

  /* RENDER */
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProdutosPorCategoriaChart data={categoriasData} />
        <ProdutosAtivosChart data={ativosData} />
      </div>

      {/* Gráfico de movimentação de estoque */}
      <div className="mt-8">
        <MovimentacaoEstoqueChart data={estoqueData} />
      </div>

      {/* Rodapé informativo */}
      <div className="mt-6 text-sm text-gray-500">
        Última atualização de estoque:{" "}
        {kpis.ultimaAtualizacao
          ? new Date(kpis.ultimaAtualizacao).toLocaleString()
          : "—"}
      </div>
    </DashboardLayout>
  );
}
