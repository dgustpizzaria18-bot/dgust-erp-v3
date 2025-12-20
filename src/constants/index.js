// Stock thresholds
export const STOCK_THRESHOLD_CRITICAL = 5; // Red warning
export const STOCK_THRESHOLD_LOW = 10;     // Yellow warning

// Toast durations
export const TOAST_DURATION = 5000; // milliseconds

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Date formats
export const DATE_FORMAT = "pt-BR";
export const DATETIME_FORMAT = "pt-BR";

// Status
export const PRODUCT_STATUS = {
  ACTIVE: true,
  INACTIVE: false,
};

export const MOVEMENT_TYPES = {
  ENTRADA: "ENTRADA",
  SAIDA: "SAIDA",
};

// ===== NOVOS - MÓDULO DE PRODUTOS EVOLUÍDO =====

// Unidades de medida
export const UNIDADES_MEDIDA = [
  { value: "UN", label: "Unidade (UN)" },
  { value: "KG", label: "Quilograma (KG)" },
  { value: "G", label: "Grama (G)" },
  { value: "LT", label: "Litro (LT)" },
  { value: "ML", label: "Mililitro (ML)" },
  { value: "CX", label: "Caixa (CX)" },
  { value: "PCT", label: "Pacote (PCT)" },
  { value: "FD", label: "Fardo (FD)" },
  { value: "M", label: "Metro (M)" },
  { value: "M2", label: "Metro Quadrado (M²)" },
];

// Status de estoque
export const STATUS_ESTOQUE = {
  OK: { value: "ok", label: "Normal", cor: "green" },
  BAIXO: { value: "baixo", label: "Baixo", cor: "yellow" },
  CRITICO: { value: "critico", label: "Crítico", cor: "red" },
};

// Status de validade
export const STATUS_VALIDADE = {
  OK: { value: "ok", label: "OK", cor: "green" },
  VENCENDO_30D: { value: "vencendo_30d", label: "Vence em 30 dias", cor: "yellow" },
  VENCENDO_7D: { value: "vencendo_7d", label: "Vence em 7 dias", cor: "orange" },
  VENCIDO: { value: "vencido", label: "Vencido", cor: "red" },
};

// Status de lote
export const STATUS_LOTE = {
  ATIVO: { value: "ativo", label: "Ativo", cor: "green" },
  VENCIDO: { value: "vencido", label: "Vencido", cor: "red" },
  BLOQUEADO: { value: "bloqueado", label: "Bloqueado", cor: "gray" },
};

// Tipos de armazenamento (QUALIDADE - ABA 2)
export const TIPOS_ARMAZENAMENTO = [
  { value: "ambiente", label: "Ambiente (Seco)" },
  { value: "refrigerado", label: "Refrigerado (0-10°C)" },
  { value: "congelado", label: "Congelado (-18°C ou menos)" },
];

// Origem fiscal (tabela A da NF-e)
export const ORIGEM_FISCAL = [
  { value: "0", label: "0 - Nacional" },
  { value: "1", label: "1 - Estrangeira - Importação direta" },
  { value: "2", label: "2 - Estrangeira - Adquirida no mercado interno" },
  { value: "3", label: "3 - Nacional - Mercadoria com Conteúdo de Importação superior a 40%" },
  { value: "4", label: "4 - Nacional - Produção em conformidade com processos produtivos básicos" },
  { value: "5", label: "5 - Nacional - Mercadoria com Conteúdo de Importação inferior ou igual a 40%" },
  { value: "6", label: "6 - Estrangeira - Importação direta, sem similar nacional" },
  { value: "7", label: "7 - Estrangeira - Adquirida no mercado interno, sem similar nacional" },
  { value: "8", label: "8 - Nacional - Mercadoria com Conteúdo de Importação superior a 70%" },
];

// CST ICMS mais comuns
export const CST_ICMS_COMUM = [
  { value: "000", label: "000 - Tributada integralmente" },
  { value: "010", label: "010 - Tributada e com cobrança do ICMS por ST" },
  { value: "020", label: "020 - Com redução de BC" },
  { value: "030", label: "030 - Isenta ou não tributada e com cobrança do ICMS por ST" },
  { value: "040", label: "040 - Isenta" },
  { value: "041", label: "041 - Não tributada" },
  { value: "050", label: "050 - Suspensão" },
  { value: "060", label: "060 - ICMS cobrado anteriormente por ST" },
  { value: "070", label: "070 - Com redução de BC e cobrança do ICMS por ST" },
  { value: "090", label: "090 - Outras" },
  { value: "101", label: "101 - Tributada pelo Simples Nacional com permissão de crédito" },
  { value: "102", label: "102 - Tributada pelo Simples Nacional sem permissão de crédito" },
  { value: "103", label: "103 - Isenção do ICMS no Simples Nacional" },
  { value: "201", label: "201 - Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por ST" },
  { value: "202", label: "202 - Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por ST" },
  { value: "500", label: "500 - ICMS cobrado anteriormente por ST ou por antecipação" },
  { value: "900", label: "900 - Outras" },
];

// CST PIS/COFINS mais comuns
export const CST_PIS_COFINS_COMUM = [
  { value: "01", label: "01 - Operação Tributável com Alíquota Básica" },
  { value: "02", label: "02 - Operação Tributável com Alíquota Diferenciada" },
  { value: "03", label: "03 - Operação Tributável com Alíquota por Unidade de Medida de Produto" },
  { value: "04", label: "04 - Operação Tributável Monofásica - Revenda a Alíquota Zero" },
  { value: "05", label: "05 - Operação Tributável por Substituição Tributária" },
  { value: "06", label: "06 - Operação Tributável a Alíquota Zero" },
  { value: "07", label: "07 - Operação Isenta da Contribuição" },
  { value: "08", label: "08 - Operação sem Incidência da Contribuição" },
  { value: "09", label: "09 - Operação com Suspensão da Contribuição" },
  { value: "49", label: "49 - Outras Operações de Saída" },
  { value: "99", label: "99 - Outras Operações" },
];

// CFOP mais comuns (vendas internas)
export const CFOP_COMUM = [
  { value: "5101", label: "5.101 - Venda de produção do estabelecimento" },
  { value: "5102", label: "5.102 - Venda de mercadoria adquirida ou recebida de terceiros" },
  { value: "5103", label: "5.103 - Venda de produção do estabelecimento, efetuada fora do estabelecimento" },
  { value: "5104", label: "5.104 - Venda de mercadoria adquirida ou recebida de terceiros, efetuada fora do estabelecimento" },
  { value: "5405", label: "5.405 - Venda de mercadoria adquirida ou recebida de terceiros em operação com mercadoria sujeita ao regime de ST" },
  { value: "5949", label: "5.949 - Outra saída de mercadoria ou prestação de serviço não especificado" },
];

// Certificações comuns em alimentos
export const CERTIFICACOES_COMUNS = [
  "ISO 9001",
  "ISO 22000",
  "HACCP",
  "BPF (Boas Práticas de Fabricação)",
  "Orgânico (IBD)",
  "Kosher",
  "Halal",
  "ANVISA",
  "Inmetro",
  "SIF (Serviço de Inspeção Federal)",
];

// Alérgenos comuns
export const ALERGENOS_COMUNS = [
  "Glúten",
  "Leite e derivados",
  "Ovos",
  "Soja",
  "Amendoim",
  "Nozes",
  "Peixes",
  "Crustáceos",
  "Gergelim",
  "Sulfitos",
];
