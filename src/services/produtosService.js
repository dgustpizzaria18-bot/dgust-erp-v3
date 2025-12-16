import { supabase } from "./supabaseClient";

/* LISTAR */
export async function listarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select(`
      id,
      nome,
      estoque_atual,
      preco_venda,
      ativo,
      categorias ( nome )
    `)
    .order("nome");

  if (error) throw error;
  return data;
}

/* CRIAR */
export async function criarProduto(produto) {
  const { data, error } = await supabase
    .from("produtos")
    .insert([produto])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ATUALIZAR */
export async function atualizarProduto(id, dados) {
  const { error } = await supabase
    .from("produtos")
    .update(dados)
    .eq("id", id);

  if (error) throw error;
}

/* ATIVAR / DESATIVAR */
export async function toggleProduto(id, ativo) {
  const { error } = await supabase
    .from("produtos")
    .update({ ativo })
    .eq("id", id);

  if (error) throw error;
}
