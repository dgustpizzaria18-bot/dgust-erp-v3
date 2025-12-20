import { supabase } from "./supabaseClient";

/**
 * SERVIÇO: PRODUTOS QUALIDADE
 * Gerencia informações de qualidade para produtos alimentícios
 * (validade, lote, temperatura, certificações)
 */

/* OBTER QUALIDADE DE UM PRODUTO */
export async function obterQualidadeProduto(produtoId) {
  const { data, error } = await supabase
    .from("produtos_qualidade")
    .select("*")
    .eq("produto_id", produtoId)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = not found (é esperado para produtos sem qualidade)
    throw error;
  }
  
  return data || null;
}

/* CRIAR/ATUALIZAR QUALIDADE */
export async function salvarQualidadeProduto(produtoId, dados) {
  // Validações
  if (dados.validade) {
    const dataValidade = new Date(dados.validade);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (dataValidade < hoje) {
      throw new Error("Data de validade não pode ser no passado");
    }
  }
  
  if (dados.temperatura_min && dados.temperatura_max) {
    if (Number(dados.temperatura_min) >= Number(dados.temperatura_max)) {
      throw new Error("Temperatura mínima deve ser menor que a máxima");
    }
  }

  const qualidadeData = {
    produto_id: produtoId,
    validade: dados.validade || null,
    lote: dados.lote || null,
    temperatura_min: dados.temperatura_min || null,
    temperatura_max: dados.temperatura_max || null,
    certificacoes: dados.certificacoes || null,
    alergenos: dados.alergenos || null,
    composicao: dados.composicao || null,
    observacoes: dados.observacoes || null,
  };

  // Upsert (insert ou update)
  const { data, error } = await supabase
    .from("produtos_qualidade")
    .upsert(qualidadeData, { onConflict: "produto_id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* DELETAR QUALIDADE */
export async function deletarQualidadeProduto(produtoId) {
  const { error } = await supabase
    .from("produtos_qualidade")
    .delete()
    .eq("produto_id", produtoId);

  if (error) throw error;
}

/* OBTER STATUS DE VALIDADE */
export function calcularStatusValidade(dataValidade) {
  if (!dataValidade) return null;
  
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const validade = new Date(dataValidade);
  validade.setHours(0, 0, 0, 0);
  
  const diffDias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));
  
  if (diffDias < 0) return { status: "vencido", dias: Math.abs(diffDias), cor: "red" };
  if (diffDias <= 7) return { status: "vencendo_7d", dias: diffDias, cor: "red" };
  if (diffDias <= 30) return { status: "vencendo_30d", dias: diffDias, cor: "yellow" };
  
  return { status: "ok", dias: diffDias, cor: "green" };
}

/* LISTAR PRODUTOS VENCIDOS OU VENCENDO */
export async function listarProdutosValidadeProxima(diasAntecedencia = 7) {
  const dataLimite = new Date();
  dataLimite.setDate(dataLimite.getDate() + diasAntecedencia);
  
  const { data, error } = await supabase
    .from("produtos_qualidade")
    .select(`
      *,
      produtos (
        id,
        nome,
        estoque_atual
      )
    `)
    .lte("validade", dataLimite.toISOString().split("T")[0])
    .order("validade", { ascending: true });

  if (error) throw error;
  return data;
}
