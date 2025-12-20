import { supabase } from "./supabaseClient";

/**
 * CATEGORIAS SERVICE
 * Gerencia operações CRUD de categorias
 */

/* LISTAR TODAS AS CATEGORIAS (incluindo inativas) */
export async function listarTodasCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select(`
      *,
      produtos:produtos(count)
    `)
    .order("nome");

  if (error) throw error;
  
  // Formatar contagem de produtos
  return (data || []).map(cat => ({
    ...cat,
    produtos_count: cat.produtos?.[0]?.count || 0
  }));
}

/* LISTAR CATEGORIAS ATIVAS (para dropdowns) */
export async function listarCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("ativo", true)
    .order("nome");

  if (error) throw error;
  return data || [];
}

/* OBTER CATEGORIA POR ID */
export async function obterCategoria(id) {
  const { data, error } = await supabase
    .from("categorias")
    .select(`
      *,
      produtos:produtos(count)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  
  return {
    ...data,
    produtos_count: data.produtos?.[0]?.count || 0
  };
}

/* CRIAR CATEGORIA */
export async function criarCategoria(categoria) {
  // Validações
  if (!categoria.nome || categoria.nome.trim().length === 0) {
    throw new Error("Nome da categoria é obrigatório");
  }

  if (categoria.nome.length > 50) {
    throw new Error("Nome deve ter no máximo 50 caracteres");
  }

  if (!categoria.tipo) {
    throw new Error("Tipo da categoria é obrigatório");
  }

  if (categoria.descricao && categoria.descricao.length > 255) {
    throw new Error("Descrição deve ter no máximo 255 caracteres");
  }

  // Verificar duplicação de nome
  const { data: existente } = await supabase
    .from("categorias")
    .select("id")
    .eq("nome", categoria.nome.trim())
    .maybeSingle();

  if (existente) {
    throw new Error("Já existe uma categoria com este nome");
  }

  const { data, error } = await supabase
    .from("categorias")
    .insert([{
      nome: categoria.nome.trim(),
      tipo: categoria.tipo,
      descricao: categoria.descricao?.trim() || null,
      ativo: categoria.ativo !== false
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ATUALIZAR CATEGORIA */
export async function atualizarCategoria(id, categoria) {
  // Validações
  if (!categoria.nome || categoria.nome.trim().length === 0) {
    throw new Error("Nome da categoria é obrigatório");
  }

  if (categoria.nome.length > 50) {
    throw new Error("Nome deve ter no máximo 50 caracteres");
  }

  if (!categoria.tipo) {
    throw new Error("Tipo da categoria é obrigatório");
  }

  if (categoria.descricao && categoria.descricao.length > 255) {
    throw new Error("Descrição deve ter no máximo 255 caracteres");
  }

  // Verificar duplicação de nome (exceto própria categoria)
  const { data: existente } = await supabase
    .from("categorias")
    .select("id")
    .eq("nome", categoria.nome.trim())
    .neq("id", id)
    .maybeSingle();

  if (existente) {
    throw new Error("Já existe outra categoria com este nome");
  }

  const { data, error } = await supabase
    .from("categorias")
    .update({
      nome: categoria.nome.trim(),
      tipo: categoria.tipo,
      descricao: categoria.descricao?.trim() || null,
      ativo: categoria.ativo !== false
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* DELETAR CATEGORIA (soft delete) */
export async function deletarCategoria(id) {
  // Verificar se há produtos vinculados
  const { count, error: countError } = await supabase
    .from("produtos")
    .select("id", { count: "exact", head: true })
    .eq("categoria_id", id);

  if (countError) throw countError;

  if (count > 0) {
    throw new Error(
      `Esta categoria possui ${count} produto(s) vinculado(s). Não é possível deletar.`
    );
  }

  // Soft delete
  const { error } = await supabase
    .from("categorias")
    .update({ ativo: false })
    .eq("id", id);

  if (error) throw error;
}

/* TOGGLE STATUS */
export async function toggleCategoria(id, ativo) {
  const { data, error } = await supabase
    .from("categorias")
    .update({ ativo })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* BUSCAR CATEGORIAS */
export async function buscarCategorias(termo) {
  if (!termo || termo.trim().length === 0) {
    return listarTodasCategorias();
  }

  const { data, error } = await supabase
    .from("categorias")
    .select(`
      *,
      produtos:produtos(count)
    `)
    .ilike("nome", `%${termo.trim()}%`)
    .order("nome");

  if (error) throw error;
  
  return (data || []).map(cat => ({
    ...cat,
    produtos_count: cat.produtos?.[0]?.count || 0
  }));
}

