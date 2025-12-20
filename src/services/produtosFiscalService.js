import { supabase } from "./supabaseClient";

/**
 * SERVIÇO: PRODUTOS FISCAL
 * Gerencia informações fiscais dos produtos (NCM, CFOP, impostos)
 */

/* OBTER DADOS FISCAIS DE UM PRODUTO */
export async function obterFiscalProduto(produtoId) {
  const { data, error } = await supabase
    .from("produtos_fiscal")
    .select(`
      *,
      ncm (
        id,
        codigo,
        descricao,
        aliquota_nacional
      )
    `)
    .eq("produto_id", produtoId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }
  
  return data || null;
}

/* CRIAR/ATUALIZAR DADOS FISCAIS */
export async function salvarFiscalProduto(produtoId, dados) {
  // Validações
  if (!dados.ncm_id) {
    throw new Error("NCM é obrigatório para dados fiscais");
  }

  const fiscalData = {
    produto_id: produtoId,
    ncm_id: dados.ncm_id,
    cfop: dados.cfop || null,
    icms: dados.icms || 0,
    pis: dados.pis || 0,
    cofins: dados.cofins || 0,
    ipi: dados.ipi || 0,
    origem: dados.origem || "0",
    cst_icms: dados.cst_icms || null,
    cst_pis: dados.cst_pis || null,
    cst_cofins: dados.cst_cofins || null,
    cest: dados.cest || null,
  };

  // Upsert (insert ou update)
  const { data, error } = await supabase
    .from("produtos_fiscal")
    .upsert(fiscalData, { onConflict: "produto_id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* DELETAR DADOS FISCAIS */
export async function deletarFiscalProduto(produtoId) {
  const { error } = await supabase
    .from("produtos_fiscal")
    .delete()
    .eq("produto_id", produtoId);

  if (error) throw error;
}

/* CALCULAR IMPOSTOS */
export function calcularImpostos(precoVenda, fiscal) {
  if (!fiscal || !precoVenda) {
    return {
      icms: 0,
      pis: 0,
      cofins: 0,
      ipi: 0,
      total: 0,
    };
  }

  const valorICMS = (precoVenda * (fiscal.icms || 0)) / 100;
  const valorPIS = (precoVenda * (fiscal.pis || 0)) / 100;
  const valorCOFINS = (precoVenda * (fiscal.cofins || 0)) / 100;
  const valorIPI = (precoVenda * (fiscal.ipi || 0)) / 100;

  return {
    icms: valorICMS,
    pis: valorPIS,
    cofins: valorCOFINS,
    ipi: valorIPI,
    total: valorICMS + valorPIS + valorCOFINS + valorIPI,
  };
}

/* ===== NCM ===== */

/* LISTAR TODOS OS NCMs */
export async function listarNCMs() {
  const { data, error } = await supabase
    .from("ncm")
    .select("*")
    .order("codigo");

  if (error) throw error;
  return data;
}

/* BUSCAR NCM POR CÓDIGO */
export async function buscarNCMPorCodigo(codigo) {
  const { data, error } = await supabase
    .from("ncm")
    .select("*")
    .eq("codigo", codigo)
    .single();

  if (error) throw error;
  return data;
}

/* CRIAR NCM */
export async function criarNCM(dados) {
  // Validação do código NCM (8 dígitos)
  const codigo = dados.codigo.replace(/\D/g, "");
  if (codigo.length !== 8) {
    throw new Error("Código NCM deve ter 8 dígitos");
  }

  const ncmData = {
    codigo,
    descricao: dados.descricao,
    aliquota_nacional: dados.aliquota_nacional || 0,
  };

  const { data, error } = await supabase
    .from("ncm")
    .insert([ncmData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* BUSCAR NCMs (com filtro) */
export async function buscarNCMs(termo) {
  const { data, error } = await supabase
    .from("ncm")
    .select("*")
    .or(`codigo.ilike.%${termo}%,descricao.ilike.%${termo}%`)
    .order("codigo")
    .limit(20);

  if (error) throw error;
  return data;
}
