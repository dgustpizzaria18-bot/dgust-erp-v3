import { supabase } from "./supabaseClient";

/**
 * SERVIÇO: FORNECEDORES
 * Gerencia cadastro de fornecedores
 */

/* LISTAR FORNECEDORES */
export async function listarFornecedores() {
  const { data, error } = await supabase
    .from("fornecedores")
    .select("*")
    .eq("ativo", true)
    .order("nome");

  if (error) throw error;
  return data;
}

/* OBTER FORNECEDOR POR ID */
export async function obterFornecedor(id) {
  const { data, error } = await supabase
    .from("fornecedores")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

/* CRIAR FORNECEDOR */
export async function criarFornecedor(dados) {
  const { data, error } = await supabase
    .from("fornecedores")
    .insert([dados])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ATUALIZAR FORNECEDOR */
export async function atualizarFornecedor(id, dados) {
  const { error } = await supabase
    .from("fornecedores")
    .update(dados)
    .eq("id", id);

  if (error) throw error;
}

/* ATIVAR/DESATIVAR FORNECEDOR */
export async function toggleFornecedor(id, ativo) {
  const { error } = await supabase
    .from("fornecedores")
    .update({ ativo })
    .eq("id", id);

  if (error) throw error;
}
