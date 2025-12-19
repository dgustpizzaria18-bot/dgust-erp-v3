import React, { useEffect, useState } from "react";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  toggleProduto,
} from "../services/produtosService";
import { useToast } from "../components/Toast";
import { STOCK_THRESHOLD_CRITICAL } from "../constants";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    estoque_atual: 0,
    preco_venda: 0,
    ativo: true,
  });
  const { addToast } = useToast();

  useEffect(() => {
    loadProdutos();
  }, []);

  async function loadProdutos() {
    try {
      setLoading(true);
      const data = await listarProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      addToast("Erro ao carregar produtos", "error");
    } finally {
      setLoading(false);
    }
  }

  function openModal(produto = null) {
    if (produto) {
      setEditingProduto(produto);
      setFormData({
        nome: produto.nome,
        estoque_atual: produto.estoque_atual,
        preco_venda: produto.preco_venda,
        ativo: produto.ativo,
      });
    } else {
      setEditingProduto(null);
      setFormData({
        nome: "",
        estoque_atual: 0,
        preco_venda: 0,
        ativo: true,
      });
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingProduto(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingProduto) {
        await atualizarProduto(editingProduto.id, formData);
        addToast("Produto atualizado com sucesso!", "success");
      } else {
        await criarProduto(formData);
        addToast("Produto criado com sucesso!", "success");
      }
      closeModal();
      loadProdutos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      addToast("Erro ao salvar produto", "error");
    }
  }

  async function handleToggle(id, ativo) {
    try {
      await toggleProduto(id, !ativo);
      addToast(`Produto ${!ativo ? "ativado" : "desativado"} com sucesso!`, "success");
      loadProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      addToast("Erro ao atualizar produto", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estoque
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{produto.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {produto.categorias?.nome || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`${
                      produto.estoque_atual <= STOCK_THRESHOLD_CRITICAL
                        ? "text-red-600 font-semibold"
                        : ""
                    }`}
                  >
                    {produto.estoque_atual}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  R$ {produto.preco_venda?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      produto.ativo
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {produto.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => openModal(produto)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggle(produto.id, produto.ativo)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {produto.ativo ? "Desativar" : "Ativar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum produto cadastrado
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingProduto ? "Editar Produto" : "Novo Produto"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque Atual
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.estoque_atual}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estoque_atual: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preço de Venda
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={formData.preco_venda}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preco_venda: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="ativo"
                  className="mr-2"
                  checked={formData.ativo}
                  onChange={(e) =>
                    setFormData({ ...formData, ativo: e.target.checked })
                  }
                />
                <label htmlFor="ativo" className="text-sm text-gray-700">
                  Produto ativo
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
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
