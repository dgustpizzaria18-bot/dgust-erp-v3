import { supabase } from "./supabaseClient";

/**
 * SERVIÇO: ESTOQUE LOTES
 * Controla lotes de estoque com sistema FIFO (First In, First Out)
 */

/* LISTAR LOTES DE UM PRODUTO */
export async function listarLotesProduto(produtoId) {
  const { data, error } = await supabase
    .from("estoque_lotes")
    .select("*")
    .eq("produto_id", produtoId)
    .gt("quantidade", 0) // Apenas lotes com saldo
    .order("created_at", { ascending: true }); // FIFO

  if (error) throw error;
  return data;
}

/* OBTER LOTE POR ID */
export async function obterLote(id) {
  const { data, error } = await supabase
    .from("estoque_lotes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

/* CRIAR LOTE (ENTRADA) */
export async function criarLote(dados) {
  const loteData = {
    produto_id: dados.produto_id,
    lote: dados.lote,
    validade: dados.validade || null,
    quantidade: dados.quantidade,
    quantidade_inicial: dados.quantidade,
    preco_custo: dados.preco_custo || 0,
    movimentacao_id: dados.movimentacao_id || null,
    status: "ativo",
  };

  const { data, error } = await supabase
    .from("estoque_lotes")
    .insert([loteData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* CONSUMIR LOTE (SAÍDA FIFO) */
export async function consumirLoteFIFO(produtoId, quantidadeTotal) {
  // 1. Buscar lotes ativos, ordenados por FIFO
  const lotes = await listarLotesProduto(produtoId);
  
  if (lotes.length === 0) {
    throw new Error("Nenhum lote disponível para este produto");
  }

  let quantidadeRestante = quantidadeTotal;
  const lotesConsumidos = [];

  // 2. Consumir lotes na ordem FIFO
  for (const lote of lotes) {
    if (quantidadeRestante <= 0) break;

    // Verificar se lote está vencido
    if (lote.validade) {
      const hoje = new Date();
      const validade = new Date(lote.validade);
      if (validade < hoje) {
        throw new Error(`Lote ${lote.lote} está vencido e não pode ser usado`);
      }
    }

    const quantidadeConsumida = Math.min(lote.quantidade, quantidadeRestante);
    const novaQuantidade = lote.quantidade - quantidadeConsumida;

    // Atualizar quantidade do lote
    const { error } = await supabase
      .from("estoque_lotes")
      .update({ quantidade: novaQuantidade })
      .eq("id", lote.id);

    if (error) throw error;

    lotesConsumidos.push({
      lote_id: lote.id,
      lote: lote.lote,
      quantidade_consumida: quantidadeConsumida,
      quantidade_restante: novaQuantidade,
    });

    quantidadeRestante -= quantidadeConsumida;
  }

  if (quantidadeRestante > 0) {
    throw new Error(`Quantidade insuficiente em lotes. Faltam ${quantidadeRestante} unidades.`);
  }

  return lotesConsumidos;
}

/* ATUALIZAR STATUS DE LOTES VENCIDOS */
export async function atualizarLotesVencidos() {
  const hoje = new Date().toISOString().split("T")[0];
  
  const { error } = await supabase
    .from("estoque_lotes")
    .update({ status: "vencido" })
    .lt("validade", hoje)
    .eq("status", "ativo");

  if (error) throw error;
}

/* LISTAR LOTES VENCIDOS OU VENCENDO */
export async function listarLotesVencendo(diasAntecedencia = 7) {
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() + diasAntecedencia);
  
  const { data, error } = await supabase
    .from("estoque_lotes")
    .select(`
      *,
      produtos (
        id,
        nome,
        estoque_atual
      )
    `)
    .lte("validade", dataLimite.toISOString().split("T")[0])
    .gt("quantidade", 0)
    .order("validade", { ascending: true });

  if (error) throw error;
  return data;
}

/* BLOQUEAR/DESBLOQUEAR LOTE */
export async function toggleLote(id, status) {
  const { error } = await supabase
    .from("estoque_lotes")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}
