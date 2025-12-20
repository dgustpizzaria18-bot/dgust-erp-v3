import { supabase } from "./supabaseClient";

/* LISTAR */
export async function listarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select(`
      id,
      nome,
      codigo_barras,
      estoque_atual,
      estoque_minimo,
      preco_custo,
      preco_venda,
      unidade_id,
      ativo,
      categorias ( nome )
    `)
    .order("nome");

  if (error) throw error;
  return data;
}

/* LISTAR COM DETALHES COMPLETOS (para o modal) */
export async function obterProdutoCompleto(id) {
  const { data, error } = await supabase
    .from("produtos")
    .select(`
      *,
      categorias ( id, nome )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

/* CRIAR */
export async function criarProduto(produto) {
  // Regra ERP: Estoque sempre inicia em 0
  // Futuras entradas devem ser feitas via movimentações
  const produtoData = {
    nome: produto.nome,
    descricao: produto.descricao || null,
    categoria_id: produto.categoria_id || null,
    codigo_barras: produto.codigo_barras || null,
    preco_custo: produto.preco_custo || 0,
    preco_venda: produto.preco_venda,
    estoque_minimo: produto.estoque_minimo || 0,
    estoque_atual: 0, // Forçar estoque inicial = 0
    unidade_id: produto.unidade_id || "UN",
    fornecedor_id: produto.fornecedor_id || null,
    ativo: produto.ativo !== undefined ? produto.ativo : true,
  };

  const { data, error } = await supabase
    .from("produtos")
    .insert([produtoData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ATUALIZAR */
export async function atualizarProduto(id, dados) {
  // Remover estoque_atual se vier nos dados (proteção)
  const { estoque_atual, ...dadosSeguros } = dados;
  
  // Garantir que não estamos enviando campos undefined
  const dadosLimpos = Object.fromEntries(
    Object.entries(dadosSeguros).filter(([_, v]) => v !== undefined)
  );
  
  const { error } = await supabase
    .from("produtos")
    .update(dadosLimpos)
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
