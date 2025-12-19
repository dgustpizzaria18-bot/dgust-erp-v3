import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { listarProdutos } from "../services/produtosService";
import { movimentarEstoque } from "../services/estoqueService";

export default function EstoqueMovimentacoes() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    produto_id: "",
    tipo: "ENTRADA",
    quantidade: 0,
    origem: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [movimentacoesData, produtosData] = await Promise.all([
        loadMovimentacoes(),
        listarProdutos(),
      ]);
      setMovimentacoes(movimentacoesData);
      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadMovimentacoes() {
    const { data, error } = await supabase
      .from("estoque_movimentacoes")
      .select(`
        id,
        tipo,
        quantidade,
        origem,
        created_at,
        produtos (nome)
      `)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;
    return data || [];
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await movimentarEstoque(formData);
      setShowModal(false);
      setFormData({
        produto_id: "",
        tipo: "ENTRADA",
        quantidade: 0,
        origem: "",
      });
      loadData();
    } catch (error) {
      console.error("Erro ao movimentar estoque:", error);
      alert("Erro ao movimentar estoque");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando movimentações...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Movimentações de Estoque</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Movimentação
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Origem
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movimentacoes.map((mov) => (
              <tr key={mov.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {new Date(mov.created_at).toLocaleString("pt-BR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {mov.produtos?.nome || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      mov.tipo === "ENTRADA"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {mov.tipo}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{mov.quantidade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{mov.origem || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {movimentacoes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma movimentação registrada
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nova Movimentação</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Produto
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.produto_id}
                  onChange={(e) =>
                    setFormData({ ...formData, produto_id: e.target.value })
                  }
                >
                  <option value="">Selecione um produto</option>
                  {produtos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.tipo}
                  onChange={(e) =>
                    setFormData({ ...formData, tipo: e.target.value })
                  }
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SAIDA">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantidade
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.quantidade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantidade: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Origem/Destino
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.origem}
                  onChange={(e) =>
                    setFormData({ ...formData, origem: e.target.value })
                  }
                  placeholder="Ex: Fornecedor, Cliente, Depósito"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
