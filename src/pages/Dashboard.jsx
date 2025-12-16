import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import KpiCard from "../components/KpiCard";
import ProdutosPorCategoriaChart from "../components/ProdutosPorCategoriaChart";
import ProdutosAtivosChart from "../components/ProdutosAtivosChart";
import { getDashboardKpis } from "../services/dashboardService";
import MovimentacaoEstoqueChart from "../components/MovimentacaoEstoqueChart";
import { getMovimentacaoEstoque } from "../services/estoqueChartsService";
import {
  getProdutosPorCategoria,
  getProdutosAtivosInativos,
} from "../services/dashboardChartsService";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [categoriasData, setCategoriasData] = useState([]);
  const [ativosData, setAtivosData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const kpisData = await getDashboardKpis();
      const categorias = await getProdutosPorCategoria();
      const ativos = await getProdutosAtivosInativos();

      setKpis(kpisData);
      setCategoriasData(categorias);
      setAtivosData(ativos);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <p>Carregando dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Dashboard
      </h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Produtos" value={kpis.totalProdutos} />
        <KpiCard title="Ativos" value={kpis.produtosAtivos} />
        <KpiCard title="Estoque baixo" value={kpis.estoqueBaixo} />
        <KpiCard title="Fornecedores" value={kpis.totalFornecedores} />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProdutosPorCategoriaChart data={categoriasData} />
        <ProdutosAtivosChart data={ativosData} />
      </div>
    </DashboardLayout>
  );
}
