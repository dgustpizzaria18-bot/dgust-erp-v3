import { supabase } from "./supabaseClient";

export async function getMovimentacaoEstoque() {
  const { data, error } = await supabase
    .from("estoque_movimentacoes")
    .select("tipo, quantidade, created_at")
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  const grouped = {};

  data.forEach((item) => {
    const date = new Date(item.created_at).toLocaleDateString();

    if (!grouped[date]) {
      grouped[date] = {
        date,
        ENTRADA: 0,
        SAIDA: 0,
      };
    }

    grouped[date][item.tipo] += Number(item.quantidade);
  });

  return Object.values(grouped);
}
