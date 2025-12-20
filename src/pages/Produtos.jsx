import React, { useEffect, useState } from "react";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  toggleProduto,
  obterProdutoCompleto,
} from "../services/produtosService";
import { listarCategorias } from "../services/categoriasService";
import { listarFornecedores } from "../services/fornecedoresService";
import { listarNCMs } from "../services/produtosFiscalService";
import {
  sugerirNCMsInteligente,
  buscarNCMs,
  obterAliquotasPadraoDF,
  validarNCM,
  formatarNCM,
} from "../services/ncmInteligenteService";
import {
  obterQualidadeProduto,
  salvarQualidadeProduto,
} from "../services/produtosQualidadeService";
import {
  obterFiscalProduto,
  salvarFiscalProduto,
  calcularImpostos,
} from "../services/produtosFiscalService";
import { useToast } from "../components/ToastNotifications";
import SkeletonTable from "../components/SkeletonTable";
import { StatusEstoqueBadge, StatusValidadeBadge } from "../components/StatusBadge";
import InfoCard from "../components/InfoCard";
import { TableSkeleton } from "../components/SkeletonLoader";
import {
  STOCK_THRESHOLD_CRITICAL,
  UNIDADES_MEDIDA,
  TIPOS_ARMAZENAMENTO,
  ORIGEM_FISCAL,
  CST_ICMS_COMUM,
  CST_PIS_COFINS_COMUM,
  CFOP_COMUM,
  CERTIFICACOES_COMUNS,
  ALERGENOS_COMUNS,
} from "../constants";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [ncms, setNcms] = useState([]);
  const [ncmSugestoes, setNcmSugestoes] = useState([]);
  const [showNcmSugestoes, setShowNcmSugestoes] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduto, setEditingProduto] = useState(null);
  const [activeTab, setActiveTab] = useState("geral");
  const [loadingModal, setLoadingModal] = useState(false);

  // Form Data - Geral
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria_id: "",
    codigo_barras: "",
    preco_custo: 0,
    preco_venda: 0,
    estoque_minimo: 0,
    fornecedor_id: "",
    unidade_id: "UN",
    ativo: true,
  });

  // Form Data - Qualidade
  const [formQualidade, setFormQualidade] = useState({
    validade: "",
    lote: "",
    tipo_armazenamento: "ambiente", // ambiente | refrigerado | congelado
    certificacoes: [],
    alergenos: [],
    composicao: "",
    observacoes: "",
  });

  // Form Data - Fiscal
  const [formFiscal, setFormFiscal] = useState({
    ncm_id: "",
    cfop: "",
    icms: 0,
    pis: 0,
    cofins: 0,
    ipi: 0,
    origem: "0",
    cst_icms: "",
    cst_pis: "",
    cst_cofins: "",
    cest: "",
  });

  const { addToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [produtosData, categoriasData, fornecedoresData, ncmsData] = await Promise.all([
        listarProdutos(),
        listarCategorias(),
        listarFornecedores(),
        listarNCMs(),
      ]);
      setProdutos(produtosData);
      setCategorias(categoriasData);
      setFornecedores(fornecedoresData);
      setNcms(ncmsData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      addToast("Erro ao carregar dados", "error");
    } finally {
      setLoading(false);
    }
  }

  async function loadProdutos() {
    try {
      const data = await listarProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  async function openModal(produto = null) {
    setShowModal(true);
    setActiveTab("geral");
    setLoadingModal(false); // Garantir que inicia como false

    if (produto) {
      setLoadingModal(true);
      setEditingProduto(produto);

      try {
        // Carregar dados completos do produto
        const produtoCompleto = await obterProdutoCompleto(produto.id);

        // Preencher form geral
        setFormData({
          nome: produtoCompleto.nome || "",
          descricao: produtoCompleto.descricao || "",
          categoria_id: produtoCompleto.categoria_id || "",
          codigo_barras: produtoCompleto.codigo_barras || "",
          preco_custo: produtoCompleto.preco_custo || 0,
          preco_venda: produtoCompleto.preco_venda || 0,
          estoque_minimo: produtoCompleto.estoque_minimo || 0,
          fornecedor_id: produtoCompleto.fornecedor_id || "",
          unidade_id: produtoCompleto.unidade_id || "UN",
          ativo: produtoCompleto.ativo,
        });

        // Carregar qualidade e fiscal de forma segura
        try {
          const qualidade = await obterQualidadeProduto(produto.id);
          if (qualidade) {
            setFormQualidade({
              validade: qualidade.validade || "",
              lote: qualidade.lote || "",
              tipo_armazenamento: qualidade.tipo_armazenamento || "ambiente",
              certificacoes: qualidade.certificacoes || [],
              alergenos: qualidade.alergenos || [],
              composicao: qualidade.composicao || "",
              observacoes: qualidade.observacoes || "",
            });
          } else {
            resetFormQualidade();
          }
        } catch (error) {
          console.warn("Qualidade não encontrada:", error);
          resetFormQualidade();
        }

        try {
          const fiscal = await obterFiscalProduto(produto.id);
          if (fiscal) {
            setFormFiscal({
              ncm_id: fiscal.ncm_id || "",
              cfop: fiscal.cfop || "",
              icms: fiscal.icms || 0,
              pis: fiscal.pis || 0,
              cofins: fiscal.cofins || 0,
              ipi: fiscal.ipi || 0,
              origem: fiscal.origem || "0",
              cst_icms: fiscal.cst_icms || "",
              cst_pis: fiscal.cst_pis || "",
              cst_cofins: fiscal.cst_cofins || "",
              cest: fiscal.cest || "",
            });
          } else {
            resetFormFiscal();
          }
        } catch (error) {
          console.warn("Fiscal não encontrado:", error);
          resetFormFiscal();
        }
      } catch (error) {
        console.error("Erro ao carregar dados do produto:", error);
        addToast("Erro ao carregar dados completos", "error");
      } finally {
        setLoadingModal(false);
      }
    } else {
      setEditingProduto(null);
      resetForms();
    }
  }

  function closeModal() {
    setShowModal(false);
    setEditingProduto(null);
    resetForms();
  }

  function resetForms() {
    setFormData({
      nome: "",
      descricao: "",
      categoria_id: "",
      codigo_barras: "",
      preco_custo: 0,
      preco_venda: 0,
      estoque_minimo: 0,
      fornecedor_id: "",
      unidade_id: "UN",
      ativo: true,
    });
    resetFormQualidade();
    resetFormFiscal();
  }

  function resetFormQualidade() {
    setFormQualidade({
      validade: "",
      lote: "",
      tipo_armazenamento: "ambiente",
      certificacoes: [],
      alergenos: [],
      composicao: "",
      observacoes: "",
    });
  }

  function resetFormFiscal() {
    setFormFiscal({
      ncm_id: "",
      cfop: "",
      icms: 0,
      pis: 0,
      cofins: 0,
      ipi: 0,
      origem: "0",
      cst_icms: "",
      cst_pis: "",
      cst_cofins: "",
      cest: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.nome.trim()) {
      addToast("Nome do produto é obrigatório", "error");
      return;
    }

    if (formData.preco_venda <= 0) {
      addToast("Preço de venda deve ser maior que zero", "error");
      return;
    }

    // ❌ VALIDAÇÃO CRÍTICA: preço_venda <= preço_custo
    if (formData.preco_custo > 0 && formData.preco_venda <= formData.preco_custo) {
      addToast("❌ Preço de venda não pode ser menor ou igual ao preço de custo", "error");
      return;
    }

    // 🧠 VALIDAÇÃO FISCAL INTELIGENTE
    if (!validarFiscal()) {
      return;
    }

    try {
      const produtoData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao?.trim() || null,
        categoria_id: formData.categoria_id || null,
        codigo_barras: formData.codigo_barras?.trim() || null,
        preco_custo: Number(formData.preco_custo) || 0,
        preco_venda: Number(formData.preco_venda),
        estoque_minimo: Number(formData.estoque_minimo) || 0,
        fornecedor_id: formData.fornecedor_id || null,
        unidade_id: formData.unidade_id || "UN",
        ativo: formData.ativo,
      };

      let produtoId;

      if (editingProduto) {
        await atualizarProduto(editingProduto.id, produtoData);
        produtoId = editingProduto.id;
        addToast("Produto atualizado com sucesso!", "success");
      } else {
        const novoProduto = await criarProduto(produtoData);
        produtoId = novoProduto.id;
        addToast(
          "Produto criado! Use movimentações para adicionar estoque.",
          "success"
        );
      }

      // Salvar dados de qualidade (se houver)
      if (
        formQualidade.validade ||
        formQualidade.lote ||
        formQualidade.certificacoes.length > 0
      ) {
        // ❌ VALIDAÇÃO CRÍTICA: validade <= hoje
        if (formQualidade.validade) {
          const hoje = new Date().toISOString().split('T')[0];
          if (formQualidade.validade < hoje) {
            addToast("❌ Data de validade não pode ser anterior a hoje", "error");
            return;
          }
        }
        
        await salvarQualidadeProduto(produtoId, formQualidade);
      }

      // Salvar dados fiscais (se houver NCM)
      if (formFiscal.ncm_id) {
        await salvarFiscalProduto(produtoId, formFiscal);
      }

      closeModal();
      loadProdutos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      addToast(error.message || "Erro ao salvar produto", "error");
    }
  }

  async function handleToggle(id, ativo) {
    try {
      await toggleProduto(id, !ativo);
      addToast(
        `Produto ${!ativo ? "ativado" : "desativado"} com sucesso!`,
        "success"
      );
      loadProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      addToast("Erro ao atualizar produto", "error");
    }
  }

  // Função para calcular status de estoque
  function getStatusEstoque(produto) {
    if (produto.estoque_atual <= 0) return "critico";
    if (produto.estoque_atual <= produto.estoque_minimo) return "baixo";
    return "ok";
  }

  // Função para calcular margem
  function calcularMargem() {
    if (formData.preco_custo > 0 && formData.preco_venda > 0) {
      return (
        ((formData.preco_venda - formData.preco_custo) / formData.preco_custo) *
        100
      ).toFixed(2);
    }
    return null;
  }

  // Toggle array items (certificações, alérgenos)
  function toggleArrayItem(array, item) {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  }

  // 🧠 SISTEMA INTELIGENTE DE NCM
  // Debounce timer
  const [ncmDebounce, setNcmDebounce] = useState(null);

  // Sugerir NCMs baseado no nome do produto (com debounce)
  // REGRA: Só sugere se nome >= 3 caracteres E preço > 0 E produto novo
  useEffect(() => {
    if (
      formData.nome && 
      formData.nome.length >= 3 && 
      formData.preco_venda > 0 &&
      !editingProduto
    ) {
      if (ncmDebounce) clearTimeout(ncmDebounce);
      
      const timer = setTimeout(async () => {
        try {
          const sugestoes = await sugerirNCMsInteligente(formData.nome);
          if (sugestoes && sugestoes.length > 0) {
            setNcmSugestoes(sugestoes);
            setShowNcmSugestoes(true);
          }
        } catch (error) {
          console.error("Erro ao sugerir NCMs:", error);
        }
      }, 1200); // 1.2s debounce (mais tempo para usuário terminar de digitar)
      
      setNcmDebounce(timer);
    } else {
      // Limpar sugestões se condições não atendidas
      setShowNcmSugestoes(false);
    }
    
    return () => {
      if (ncmDebounce) clearTimeout(ncmDebounce);
    };
  }, [formData.nome, formData.preco_venda]);

  // Aplicar NCM selecionado (preencher alíquotas automaticamente)
  async function aplicarNCM(ncm) {
    const aliquotas = obterAliquotasPadraoDF(ncm.codigo);
    
    setFormFiscal({
      ...formFiscal,
      ncm_id: ncm.id,
      icms: aliquotas.icms,
      pis: aliquotas.pis,
      cofins: aliquotas.cofins,
      ipi: aliquotas.ipi,
      origem: aliquotas.origem,
      cst_icms: aliquotas.cst_icms,
      cst_pis: aliquotas.cst_pis,
      cst_cofins: aliquotas.cst_cofins,
      cfop: "5102", // CFOP padrão para venda interna
    });
    
    setShowNcmSugestoes(false);
    
    addToast(
      `✅ NCM ${formatarNCM(ncm.codigo)} aplicado! Preencha outros dados e clique em Salvar.`,
      "success"
    );
  }

  // Validar antes de salvar
  function validarFiscal() {
    // Para produtos em edição, fiscal é opcional
    if (editingProduto) {
      return true;
    }
    
    // Para produtos NOVOS, NCM não é obrigatório inicialmente
    // Apenas alertar se não tiver
    if (!formFiscal.ncm_id) {
      console.warn("Produto sem NCM - poderá adicionar depois na edição");
    }
    
    // Se preencheu NCM, CFOP é obrigatório
    if (formFiscal.ncm_id && !formFiscal.cfop) {
      addToast("CFOP é obrigatório quando há NCM", "error");
      return false;
    }
    
    return true;
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neutral-800">Produtos</h1>
          <button
            onClick={() => openModal()}
            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-smooth font-semibold shadow-md hover:shadow-lg"
          >
            + Novo Produto
          </button>
        </div>
        <SkeletonTable rows={8} columns={7} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-800">Produtos</h1>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-smooth font-semibold shadow-md hover:shadow-lg"
        >
          + Novo Produto
        </button>
      </div>

      {/* Skeleton ou Tabela */}
      {loading ? (
        <SkeletonTable rows={8} columns={7} />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Estoque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {produtos.map((produto) => {
                const statusEstoque = getStatusEstoque(produto);
                return (
                  <tr key={produto.id} className="table-row-hover">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-neutral-900">
                          {produto.nome}
                        </div>
                        {produto.codigo_barras && (
                          <div className="text-xs text-neutral-500">
                            {produto.codigo_barras}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {produto.categorias?.nome || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {produto.unidade_id || "UN"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-semibold ${
                            statusEstoque === "critico"
                              ? "text-danger-600 pulse-critical"
                              : statusEstoque === "baixo"
                              ? "text-warning-600"
                              : "text-success-600"
                          }`}
                        >
                          {produto.estoque_atual}
                        </span>
                        {produto.estoque_minimo > 0 && (
                          <span className="text-xs text-neutral-400">
                            / mín {produto.estoque_minimo}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium">
                          R$ {produto.preco_venda?.toFixed(2)}
                        </div>
                        {produto.preco_custo > 0 && (
                          <div className="text-xs text-neutral-500">
                            Custo: R$ {produto.preco_custo?.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded font-medium ${
                          produto.ativo
                            ? "bg-success-100 text-success-800"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        {produto.ativo ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openModal(produto)}
                        className="text-primary-600 hover:text-primary-800 font-medium transition-smooth"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggle(produto.id, produto.ativo)}
                        className="text-neutral-600 hover:text-neutral-800 font-medium transition-smooth"
                      >
                        {produto.ativo ? "Desativar" : "Ativar"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {produtos.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <p className="text-lg mb-2 font-medium">Nenhum produto cadastrado</p>
              <p className="text-sm">
                Clique em "Novo Produto" para começar
              </p>
            </div>
          )}
        </div>
      )}

      {/* MODAL COM ABAS */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 modal-overlay">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-modal modal-content">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 z-10">
              <h2 className="text-xl font-bold">
                {editingProduto ? "Editar Produto" : "Novo Produto"}
              </h2>
            </div>

            {/* Abas */}
            <div className="border-b px-6 sticky top-[73px] bg-white z-10">
              <div className="flex space-x-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("geral")}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-smooth ${
                    activeTab === "geral"
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  📋 Geral
                </button>
                {editingProduto && (
                  <>
                    <button
                      type="button"
                      onClick={() => setActiveTab("qualidade")}
                      className={`py-3 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === "qualidade"
                          ? "border-primary-600 text-primary-600"
                          : "border-transparent text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      🥗 Qualidade
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("fiscal")}
                      className={`py-3 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === "fiscal"
                          ? "border-primary-600 text-primary-600"
                          : "border-transparent text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      📊 Fiscal
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("estoque")}
                      className={`py-3 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === "estoque"
                          ? "border-primary-600 text-primary-600"
                          : "border-transparent text-neutral-500 hover:text-neutral-700"
                      }`}
                    >
                      📦 Estoque
                    </button>
                  </>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Conteúdo das Abas */}
              <div className="p-6 fade-in">
                {loadingModal ? (
                  <div className="text-center py-8">
                    <div className="spinner mx-auto mb-3"></div>
                    <p className="text-neutral-500">Carregando dados...</p>
                  </div>
                ) : (
                  <>
                    {/* ABA GERAL */}
                    {activeTab === "geral" && (
                      <div className="space-y-6">
                        {/* Informações Básicas */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-neutral-700">
                            Informações Básicas
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Nome do Produto *
                              </label>
                              <input
                                type="text"
                                required
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                                value={formData.nome}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    nome: e.target.value,
                                  })
                                }
                              />
                              
                              {/* 🧠 SUGESTÕES INTELIGENTES DE NCM */}
                              {showNcmSugestoes && ncmSugestoes.length > 0 && (
                                <div className="mt-3 bg-primary-50 border border-primary-200 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-primary-800">
                                      💡 NCMs sugeridos para "{formData.nome}"
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() => setShowNcmSugestoes(false)}
                                      className="text-primary-600 hover:text-primary-800 text-xs font-medium"
                                    >
                                      ✕ Dispensar
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {ncmSugestoes.slice(0, 3).map((ncm) => (
                                      <button
                                        key={ncm.id}
                                        type="button"
                                        onClick={() => aplicarNCM(ncm)}
                                        className="w-full text-left bg-white hover:bg-primary-100 border border-primary-300 rounded px-3 py-2 text-sm transition-all"
                                      >
                                        <div className="font-mono font-semibold text-primary-900">
                                          {formatarNCM(ncm.codigo)}
                                        </div>
                                        <div className="text-neutral-600 text-xs mt-1">
                                          {ncm.descricao}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                  <p className="text-xs text-primary-600 mt-2 flex items-center gap-1">
                                    <span>💡</span>
                                    Clique para aplicar NCM e preencher alíquotas do DF automaticamente
                                  </p>
                                </div>
                              )}
                            </div>

                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Descrição
                              </label>
                              <textarea
                                rows={3}
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300 focus:border-transparent"
                                value={formData.descricao}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    descricao: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Categoria
                              </label>
                              <select
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.categoria_id}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    categoria_id: e.target.value,
                                  })
                                }
                              >
                                <option value="">Sem categoria</option>
                                {categorias.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Código de Barras
                              </label>
                              <input
                                type="text"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.codigo_barras}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    codigo_barras: e.target.value,
                                  })
                                }
                                placeholder="EAN-13, EAN-8, etc"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Unidade de Medida
                              </label>
                              <select
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.unidade_id}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    unidade_id: e.target.value,
                                  })
                                }
                              >
                                {UNIDADES_MEDIDA.map((un) => (
                                  <option key={un.value} value={un.value}>
                                    {un.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Fornecedor
                              </label>
                              <select
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.fornecedor_id}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    fornecedor_id: e.target.value,
                                  })
                                }
                              >
                                <option value="">Sem fornecedor</option>
                                {fornecedores.map((forn) => (
                                  <option key={forn.id} value={forn.id}>
                                    {forn.nome}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Preços e Estoque */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-neutral-700">
                            Preços e Estoque
                          </h3>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Preço de Custo
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.preco_custo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    preco_custo: Number(e.target.value),
                                  })
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Preço de Venda *
                              </label>
                              <input
                                type="number"
                                required
                                min="0.01"
                                step="0.01"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.preco_venda}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    preco_venda: Number(e.target.value),
                                  })
                                }
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Estoque Mínimo
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.estoque_minimo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    estoque_minimo: Number(e.target.value),
                                  })
                                }
                              />
                            </div>
                          </div>

                          {/* Cálculo de Margem */}
                          {calcularMargem() !== null && (
                            <div className="mt-4 bg-primary-50 border border-primary-200 rounded p-4">
                              <p className="text-sm text-primary-800">
                                <span className="font-semibold">
                                  Margem de Lucro:
                                </span>{" "}
                                {calcularMargem()}%
                                {calcularMargem() < 0 && (
                                  <span className="text-red-600 ml-2">
                                    ⚠️ Prejuízo
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                          
                          {/* Indicador de NCM Aplicado */}
                          {formFiscal.ncm_id && !editingProduto && (
                            <div className="mt-4 bg-green-50 border border-green-200 rounded p-3">
                              <p className="text-sm text-green-800 flex items-center gap-2">
                                <span className="text-lg">✅</span>
                                <span>
                                  <strong>NCM Aplicado!</strong> Dados fiscais preenchidos automaticamente.
                                  Continue editando ou clique em <strong>Salvar Produto</strong>.
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Status */}
                        <div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="ativo"
                              className="mr-2 h-4 w-4"
                              checked={formData.ativo}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  ativo: e.target.checked,
                                })
                              }
                            />
                            <label
                              htmlFor="ativo"
                              className="text-sm text-neutral-700 font-medium"
                            >
                              Produto ativo
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ABA QUALIDADE */}
                    {activeTab === "qualidade" && editingProduto && (
                      <div className="space-y-6">
                        <div className="bg-primary-50 border border-primary-200 rounded p-4">
                          <p className="text-sm text-primary-800">
                            ℹ️ <strong>Informações para produtos alimentícios</strong>
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            Preencha os dados de validade, lote e certificações necessárias.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Data de Validade
                            </label>
                            <input
                              type="date"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formQualidade.validade}
                              onChange={(e) =>
                                setFormQualidade({
                                  ...formQualidade,
                                  validade: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Lote
                            </label>
                            <input
                              type="text"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formQualidade.lote}
                              onChange={(e) =>
                                setFormQualidade({
                                  ...formQualidade,
                                  lote: e.target.value,
                                })
                              }
                              placeholder="Ex: L20251220"
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              ❄️ Armazenamento
                              <span className="text-xs text-neutral-500 ml-2">
                                (Importante para Brasília/DF - VISA controla)
                              </span>
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formQualidade.tipo_armazenamento}
                              onChange={(e) =>
                                setFormQualidade({
                                  ...formQualidade,
                                  tipo_armazenamento: e.target.value,
                                })
                              }
                            >
                              {TIPOS_ARMAZENAMENTO.map((tipo) => (
                                <option key={tipo.value} value={tipo.value}>
                                  {tipo.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Certificações
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {CERTIFICACOES_COMUNS.map((cert) => (
                                <button
                                  key={cert}
                                  type="button"
                                  onClick={() =>
                                    setFormQualidade({
                                      ...formQualidade,
                                      certificacoes: toggleArrayItem(
                                        formQualidade.certificacoes,
                                        cert
                                      ),
                                    })
                                  }
                                  className={`px-3 py-1 rounded text-sm border transition ${
                                    formQualidade.certificacoes.includes(cert)
                                      ? "bg-blue-100 border-blue-500 text-blue-700"
                                      : "bg-neutral-50 border-neutral-300 text-neutral-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {cert}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Alérgenos
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {ALERGENOS_COMUNS.map((alerg) => (
                                <button
                                  key={alerg}
                                  type="button"
                                  onClick={() =>
                                    setFormQualidade({
                                      ...formQualidade,
                                      alergenos: toggleArrayItem(
                                        formQualidade.alergenos,
                                        alerg
                                      ),
                                    })
                                  }
                                  className={`px-3 py-1 rounded text-sm border transition ${
                                    formQualidade.alergenos.includes(alerg)
                                      ? "bg-red-100 border-red-500 text-red-700"
                                      : "bg-neutral-50 border-neutral-300 text-neutral-600 hover:bg-gray-100"
                                  }`}
                                >
                                  {alerg}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Composição / Ingredientes
                            </label>
                            <textarea
                              rows={3}
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formQualidade.composicao}
                              onChange={(e) =>
                                setFormQualidade({
                                  ...formQualidade,
                                  composicao: e.target.value,
                                })
                              }
                              placeholder="Liste os ingredientes..."
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Observações
                            </label>
                            <textarea
                              rows={2}
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formQualidade.observacoes}
                              onChange={(e) =>
                                setFormQualidade({
                                  ...formQualidade,
                                  observacoes: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ABA FISCAL */}
                    {activeTab === "fiscal" && editingProduto && (
                      <div className="space-y-6">
                        <div className="bg-primary-50 border border-primary-200 rounded p-4">
                          <p className="text-sm text-primary-800 font-medium">
                            🧠 Sistema Fiscal Inteligente - Brasília/DF
                          </p>
                          <p className="text-xs text-blue-700 mt-1">
                            As alíquotas são preenchidas automaticamente ao selecionar o NCM. Você pode ajustar conforme necessário.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              NCM (Nomenclatura Comum do Mercosul) *
                              <span className="text-xs text-neutral-500 ml-2">
                                💡 Sugerido automaticamente pelo nome do produto
                              </span>
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.ncm_id}
                              onChange={(e) => {
                                const ncmSelecionado = ncms.find(n => n.id === e.target.value);
                                if (ncmSelecionado) {
                                  aplicarNCM(ncmSelecionado);
                                } else {
                                  setFormFiscal({
                                    ...formFiscal,
                                    ncm_id: e.target.value,
                                  });
                                }
                              }}
                            >
                              <option value="">Selecione um NCM</option>
                              {ncms.map((ncm) => (
                                <option key={ncm.id} value={ncm.id}>
                                  {formatarNCM(ncm.codigo)} - {ncm.descricao}
                                </option>
                              ))}
                            </select>
                            {formFiscal.ncm_id && (
                              <p className="text-xs text-green-600 mt-1">
                                ✓ Alíquotas padrão do DF aplicadas
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              Origem
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.origem}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  origem: e.target.value,
                                })
                              }
                            >
                              {ORIGEM_FISCAL.map((orig) => (
                                <option key={orig.value} value={orig.value}>
                                  {orig.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              CFOP
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.cfop}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  cfop: e.target.value,
                                })
                              }
                            >
                              <option value="">Selecione...</option>
                              {CFOP_COMUM.map((cfop) => (
                                <option key={cfop.value} value={cfop.value}>
                                  {cfop.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              ICMS (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.icms}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  icms: Number(e.target.value),
                                })
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              CST ICMS
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.cst_icms}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  cst_icms: e.target.value,
                                })
                              }
                            >
                              <option value="">Selecione...</option>
                              {CST_ICMS_COMUM.map((cst) => (
                                <option key={cst.value} value={cst.value}>
                                  {cst.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              PIS (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.pis}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  pis: Number(e.target.value),
                                })
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              CST PIS
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.cst_pis}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  cst_pis: e.target.value,
                                })
                              }
                            >
                              <option value="">Selecione...</option>
                              {CST_PIS_COFINS_COMUM.map((cst) => (
                                <option key={cst.value} value={cst.value}>
                                  {cst.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              COFINS (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.cofins}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  cofins: Number(e.target.value),
                                })
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              CST COFINS
                            </label>
                            <select
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.cst_cofins}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  cst_cofins: e.target.value,
                                })
                              }
                            >
                              <option value="">Selecione...</option>
                              {CST_PIS_COFINS_COMUM.map((cst) => (
                                <option key={cst.value} value={cst.value}>
                                  {cst.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              IPI (%)
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.01"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.ipi}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  ipi: Number(e.target.value),
                                })
                              }
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">
                              CEST
                            </label>
                            <input
                              type="text"
                              maxLength="7"
                              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                              value={formFiscal.cest}
                              onChange={(e) =>
                                setFormFiscal({
                                  ...formFiscal,
                                  cest: e.target.value,
                                })
                              }
                              placeholder="0000000"
                            />
                          </div>
                        </div>

                        {/* Simulação de Impostos */}
                        {formFiscal.ncm_id && formData.preco_venda > 0 && (
                          <div className="bg-neutral-50 border border-neutral-300 rounded p-4">
                            <h4 className="font-semibold text-neutral-700 mb-3">
                              💰 Simulação de Impostos
                            </h4>
                            {(() => {
                              const impostos = calcularImpostos(
                                formData.preco_venda,
                                formFiscal
                              );
                              return (
                                <div className="grid grid-cols-4 gap-3 text-sm">
                                  <div>
                                    <p className="text-neutral-600">ICMS</p>
                                    <p className="font-semibold">
                                      R$ {impostos.icms.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-neutral-600">PIS</p>
                                    <p className="font-semibold">
                                      R$ {impostos.pis.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-neutral-600">COFINS</p>
                                    <p className="font-semibold">
                                      R$ {impostos.cofins.toFixed(2)}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-neutral-600">Total</p>
                                    <p className="font-bold text-red-600">
                                      R$ {impostos.total.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    )}

                    {/* ABA ESTOQUE/CUSTO */}
                    {activeTab === "estoque" && editingProduto && (
                      <div className="space-y-6">
                        <div className="bg-primary-50 border border-primary-200 rounded p-4">
                          <p className="text-sm text-primary-800 mb-2">
                            📊 <strong>Gestão de Custos e Ponto de Reposição</strong>
                          </p>
                          <p className="text-xs text-blue-700">
                            Configure os preços e o estoque mínimo. O estoque atual é controlado por movimentações.
                          </p>
                        </div>

                        {/* Preços */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-neutral-700">
                            💰 Preços
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Preço de Custo (R$)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.preco_custo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    preco_custo: Number(e.target.value),
                                  })
                                }
                                placeholder="Valor de compra do fornecedor"
                              />
                              <p className="text-xs text-neutral-500 mt-1">
                                Valor de compra do fornecedor
                              </p>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Preço de Venda (R$) *
                              </label>
                              <input
                                type="number"
                                required
                                min="0.01"
                                step="0.01"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.preco_venda}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    preco_venda: Number(e.target.value),
                                  })
                                }
                                placeholder="Valor de venda ao cliente"
                              />
                              <p className="text-xs text-neutral-500 mt-1">
                                Valor de venda ao cliente
                              </p>
                            </div>
                          </div>

                          {/* Margem de Lucro */}
                          {calcularMargem() !== null && (
                            <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded p-4">
                              <p className="text-sm text-gray-800">
                                <span className="font-semibold">
                                  📈 Margem de Lucro:
                                </span>{" "}
                                <span className="text-lg font-bold text-green-700">
                                  {calcularMargem()}%
                                </span>
                                {calcularMargem() < 0 && (
                                  <span className="text-red-600 ml-2 font-semibold">
                                    ⚠️ Prejuízo!
                                  </span>
                                )}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Estoque */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-neutral-700">
                            📦 Controle de Estoque
                          </h3>
                          
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <InfoCard
                              label="Estoque Atual"
                              value={editingProduto.estoque_atual || 0}
                              icon="📦"
                              color={
                                editingProduto.estoque_atual <= 0
                                  ? "red"
                                  : editingProduto.estoque_atual <=
                                    formData.estoque_minimo
                                  ? "yellow"
                                  : "green"
                              }
                            />

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Ponto de Pedido (Mínimo)
                              </label>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary-300"
                                value={formData.estoque_minimo}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    estoque_minimo: Number(e.target.value),
                                  })
                                }
                                placeholder="Ex: 10"
                              />
                              <p className="text-xs text-neutral-500 mt-1">
                                Quantidade para alertar reposição
                              </p>
                            </div>

                            <InfoCard
                              label="Status"
                              value={
                                <StatusEstoqueBadge
                                  estoqueAtual={editingProduto.estoque_atual}
                                  estoqueMinimo={formData.estoque_minimo}
                                />
                              }
                              icon="📊"
                              color="blue"
                            />
                          </div>

                          <div className="bg-warning-50 border border-warning-200 rounded p-4">
                            <p className="text-sm text-warning-800 mb-2">
                              ⚠️{" "}
                              <strong>
                                Estoque Atual não é editável aqui
                              </strong>
                            </p>
                            <p className="text-xs text-warning-700">
                              Para adicionar ou remover estoque, use o módulo de
                              <strong> Movimentações</strong>. Isso garante rastreabilidade e auditoria completa.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
                  disabled={loadingModal}
                >
                  {loadingModal ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner"></div>
                      <span>Processando...</span>
                    </div>
                  ) : (
                    "Salvar Produto"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

