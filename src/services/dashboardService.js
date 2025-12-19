import { supabase } from "./supabaseClient";
import { STOCK_THRESHOLD_CRITICAL } from "../constants";

export async function getDashboardKpis() {
  // total de produtos
  const { count: totalProdutos } = await supabase
    .from("produtos")
    .select("*", { count: "exact", head: true });

  // produtos ativos
  const { count: produtosAtivos } = await supabase
    .from("produtos")
    .select("*", { count: "exact", head: true })
    .eq("ativo", true);

  // estoque baixo (threshold configurável)
  const { count: estoqueBaixo } = await supabase
    .from("produtos")
    .select("*", { count: "exact", head: true })
    .lte("estoque_atual", STOCK_THRESHOLD_CRITICAL);

  // total de fornecedores
  const { count: totalFornecedores } = await supabase
    .from("fornecedores")
    .select("*", { count: "exact", head: true });

  // última atualização
  const { data: ultimaAtualizacao } = await supabase
    .from("produtos")
    .select("updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  return {
    totalProdutos: totalProdutos ?? 0,
    produtosAtivos: produtosAtivos ?? 0,
    estoqueBaixo: estoqueBaixo ?? 0,
    totalFornecedores: totalFornecedores ?? 0,
    ultimaAtualizacao: ultimaAtualizacao?.updated_at ?? null,
  };
}
