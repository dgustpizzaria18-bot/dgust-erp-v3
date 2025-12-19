import React, { useEffect, useState } from "react";
import KpiCard from "../components/KpiCard";
import ProdutosPorCategoriaChart from "../components/ProdutosPorCategoriaChart";
import ProdutosAtivosChart from "../components/ProdutosAtivosChart";
import MovimentacaoEstoqueChart from "../components/MovimentacaoEstoqueChart";
import { getDashboardKpis } from "../services/dashboardService";
import { getProdutosPorCategoria, getProdutosAtivosInativos } from "../services/dashboardChartsService";
import { getMovimentacaoEstoque } from "../services/estoqueChartsService";

export default function Dashboard() {
  const [kpis, setKpis] = useState({
    totalProdutos: 0,
    produtosAtivos: 0,
    estoqueBaixo: 0,
    totalFornecedores: 0,
    ultimaAtualizacao: null,
  });

  const [categoriaData, setCategoriaData] = useState([]);
  const [ativosData, setAtivosData] = useState([]);
  const [movimentacaoData, setMovimentacaoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [kpisData, categorias, ativos, movimentacao] = await Promise.all([
          getDashboardKpis(),
          getProdutosPorCategoria(),
          getProdutosAtivosInativos(),
          getMovimentacaoEstoque(),
        ]);

        setKpis(kpisData);
        setCategoriaData(categorias);
        setAtivosData(ativos);
        setMovimentacaoData(movimentacao);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total de Produtos" 
          value={kpis.totalProdutos}
        />
        <KpiCard 
          title="Produtos Ativos" 
          value={kpis.produtosAtivos}
          subtitle={`${kpis.totalProdutos - kpis.produtosAtivos} inativos`}
        />
        <KpiCard 
          title="Estoque Baixo" 
          value={kpis.estoqueBaixo}
          subtitle="≤ 5 unidades"
        />
        <KpiCard 
          title="Fornecedores" 
          value={kpis.totalFornecedores}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProdutosPorCategoriaChart data={categoriaData} />
        <ProdutosAtivosChart data={ativosData} />
      </div>

      <div className="grid grid-cols-1">
        <MovimentacaoEstoqueChart data={movimentacaoData} />
      </div>

      {kpis.ultimaAtualizacao && (
        <p className="text-xs text-gray-400 text-right">
          Última atualização: {new Date(kpis.ultimaAtualizacao).toLocaleString("pt-BR")}
        </p>
      )}
    </div>
  );
}
