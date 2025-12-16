import { supabase } from "./supabaseClient";

export async function getProdutosPorCategoria() {
  const { data, error } = await supabase
    .from("produtos")
    .select(`
      id,
      categorias ( nome )
    `);

  if (error) return [];

  const grouped = {};

  data.forEach((item) => {
    const categoria = item.categorias?.nome || "Sem categoria";
    grouped[categoria] = (grouped[categoria] || 0) + 1;
  });

  return Object.keys(grouped).map((key) => ({
    categoria: key,
    total: grouped[key],
  }));
}

export async function getProdutosAtivosInativos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("ativo");

  if (error) return [];

  const ativos = data.filter((p) => p.ativo).length;
  const inativos = data.length - ativos;

  return [
    { name: "Ativos", value: ativos },
    { name: "Inativos", value: inativos },
  ];
}
