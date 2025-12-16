import { supabase } from "./supabaseClient";

export async function movimentarEstoque({
  produto_id,
  tipo,
  quantidade,
  origem,
}) {
  const { error } = await supabase.from("estoque_movimentacoes").insert([
    {
      produto_id,
      tipo,
      quantidade,
      origem,
    },
  ]);

  if (error) throw error;
}
