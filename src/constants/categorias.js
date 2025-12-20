// =============================================
// TIPOS DE CATEGORIA — D'GUST ERP
// Padrão para pizzarias
// =============================================

export const TIPOS_CATEGORIA = [
  { value: "ingredientes", label: "Ingredientes", descricao: "Insumos alimentícios" },
  { value: "bebidas", label: "Bebidas", descricao: "Refrigerantes, sucos, água" },
  { value: "embalagens", label: "Embalagens", descricao: "Caixas, sacolas" },
  { value: "limpeza", label: "Limpeza", descricao: "Produtos de higiene" },
  { value: "descartaveis", label: "Descartáveis", descricao: "Copos, guardanapos" },
  { value: "equipamentos", label: "Equipamentos", descricao: "Utensílios" },
  { value: "produtos_finais", label: "Produtos Finais", descricao: "Pizzas, combos" },
];

export const getTipoLabel = (tipo) => {
  const encontrado = TIPOS_CATEGORIA.find(t => t.value === tipo);
  return encontrado?.label || tipo;
};
