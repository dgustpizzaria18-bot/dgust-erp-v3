import React, { useState, useEffect } from "react";
import {
  listarTodasCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
  toggleCategoria,
  buscarCategorias,
} from "../services/categoriasService";
import { useToast } from "../components/ToastNotifications";
import SkeletonTable from "../components/SkeletonTable";
import { TIPOS_CATEGORIA, getTipoLabel } from "../constants/categorias";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    tipo: "",
    descricao: "",
    ativo: true,
  });

  const { addToast } = useToast();

  useEffect(() => {
    loadCategorias();
  }, []);

  async function loadCategorias() {
    try {
      setLoading(true);
      const data = await listarTodasCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      addToast("Erro ao carregar categorias", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(termo) {
    setSearchTerm(termo);
    if (termo.trim().length === 0) {
      loadCategorias();
      return;
    }

    try {
      const data = await buscarCategorias(termo);
      setCategorias(data);
    } catch (error) {
      console.error("Erro na busca:", error);
      addToast("Erro ao buscar categorias", "error");
    }
  }

  function openModal(categoria = null) {
    if (categoria) {
      setEditingCategoria(categoria);
      setFormData({
        nome: categoria.nome,
        tipo: categoria.tipo,
        descricao: categoria.descricao || "",
        ativo: categoria.ativo,
      });
    } else {
      setEditingCategoria(null);
      setFormData({
        nome: "",
        tipo: "",
        descricao: "",
        ativo: true,
      });
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingCategoria(null);
    setFormData({
      nome: "",
      tipo: "",
      descricao: "",
      ativo: true,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.nome || formData.nome.trim().length === 0) {
      addToast("Nome da categoria é obrigatório", "error");
      return;
    }

    if (!formData.tipo) {
      addToast("Tipo da categoria é obrigatório", "error");
      return;
    }

    try {
      if (editingCategoria) {
        await atualizarCategoria(editingCategoria.id, formData);
        addToast("Categoria atualizada com sucesso!", "success");
      } else {
        await criarCategoria(formData);
        addToast("Categoria criada com sucesso!", "success");
      }

      closeModal();
      loadCategorias();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      addToast(error.message || "Erro ao salvar categoria", "error");
    }
  }

  async function handleDelete(categoria) {
    if (!confirm(`Deseja realmente deletar a categoria "${categoria.nome}"?`)) {
      return;
    }

    try {
      await deletarCategoria(categoria.id);
      addToast("Categoria deletada com sucesso!", "success");
      loadCategorias();
    } catch (error) {
      console.error("Erro ao deletar:", error);
      addToast(error.message || "Erro ao deletar categoria", "error");
    }
  }

  async function handleToggle(id, ativo) {
    try {
      await toggleCategoria(id, !ativo);
      addToast(
        ativo ? "Categoria desativada" : "Categoria ativada",
        "success"
      );
      loadCategorias();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      addToast("Erro ao alterar status", "error");
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800">Categorias</h1>
          <button
            onClick={() => openModal()}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-smooth font-semibold shadow-md hover:shadow-lg"
          >
            <Plus size={16} className="inline mr-2" />
            Nova Categoria
          </button>
        </div>
        <SkeletonTable rows={8} columns={5} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-800">Categorias</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-smooth font-semibold shadow-md hover:shadow-lg"
        >
          <Plus size={16} className="inline mr-2" />
          Nova Categoria
        </button>
      </div>

      {/* Busca */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Buscar categoria..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                Produtos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {categorias.map((categoria) => (
              <tr key={categoria.id} className="table-row-hover">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-neutral-900">
                      {categoria.nome}
                    </div>
                    {categoria.descricao && (
                      <div className="text-xs text-neutral-500">
                        {categoria.descricao}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-neutral-700">
                    {getTipoLabel(categoria.tipo)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded font-medium ${
                      categoria.ativo
                        ? "bg-success-100 text-success-800"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {categoria.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-neutral-900">
                    {categoria.produtos_count || 0}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-3">
                  <button
                    onClick={() => openModal(categoria)}
                    className="text-primary-600 hover:text-primary-800 font-medium transition-smooth inline-flex items-center gap-1"
                  >
                    <Edit2 size={14} />
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggle(categoria.id, categoria.ativo)}
                    className="text-warning-600 hover:text-warning-800 font-medium transition-smooth"
                  >
                    {categoria.ativo ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    onClick={() => handleDelete(categoria)}
                    className="text-danger-600 hover:text-danger-800 font-medium transition-smooth inline-flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categorias.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <p className="text-lg mb-2 font-medium">
              Nenhuma categoria encontrada
            </p>
            <p className="text-sm">
              {searchTerm
                ? "Tente outro termo de busca"
                : 'Clique em "Nova Categoria" para começar'}
            </p>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 modal-overlay">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-modal modal-content">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
              <h2 className="text-xl font-bold">
                {editingCategoria ? "Editar Categoria" : "Nova Categoria"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Nome da Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={50}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                    value={formData.nome}
                    onChange={(e) =>
                      setFormData({ ...formData, nome: e.target.value })
                    }
                    placeholder="Ex: Ingredientes, Bebidas..."
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Máximo 50 caracteres
                  </p>
                </div>

                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Tipo *
                  </label>
                  <select
                    required
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                    value={formData.tipo}
                    onChange={(e) =>
                      setFormData({ ...formData, tipo: e.target.value })
                    }
                  >
                    <option value="">Selecione um tipo</option>
                    {TIPOS_CATEGORIA.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label} - {tipo.descricao}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-neutral-500 mt-1">
                    Define comportamento no estoque, fiscal e qualidade
                  </p>
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    maxLength={255}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
                    value={formData.descricao}
                    onChange={(e) =>
                      setFormData({ ...formData, descricao: e.target.value })
                    }
                    placeholder="Descrição interna opcional..."
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Máximo 255 caracteres
                  </p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.ativo}
                      onChange={(e) =>
                        setFormData({ ...formData, ativo: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-300 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                  <span className="text-sm font-medium text-neutral-700">
                    {formData.ativo ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-neutral-50 border-t px-6 py-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-smooth font-medium text-neutral-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-smooth font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingCategoria ? "Atualizar" : "Criar"} Categoria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
