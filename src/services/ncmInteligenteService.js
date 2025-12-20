import { supabase } from "./supabaseClient";

/**
 * SERVIÇO: NCM INTELIGENTE PARA PIZZARIA
 * Sistema especialista que sugere NCM baseado no nome do produto
 */

/* MAPA DE PALAVRAS-CHAVE → NCM SUGERIDO */
const NCM_KEYWORDS_MAP = {
  // QUEIJOS (prioridade máxima)
  queijo: ["04069000", "04063021", "04069090"],
  mussarela: ["04063021"],
  muçarela: ["04063021"],
  muzzarella: ["04063021"],
  catupiry: ["04069051"],
  cheddar: ["04069000"],
  parmesao: ["04069090"],
  parmesão: ["04069090"],
  provolone: ["04069090"],
  requeijao: ["04069041"],
  requeijão: ["04069041"],
  gorgonzola: ["04069090"],
  brie: ["04069090"],
  cream: ["04069051"],
  
  // CARNES
  carne: ["02023000", "16010000"],
  calabresa: ["16010010"],
  linguica: ["16010020"],
  linguiça: ["16010020"],
  presunto: ["16024100"],
  bacon: ["16024200"],
  salame: ["16024900"],
  mortadela: ["16024900"],
  pepperoni: ["16024900"],
  frango: ["02071400"],
  galinha: ["02071400"],
  peru: ["02071400"],
  atum: ["16041100"],
  
  // TOMATES E MOLHOS
  tomate: ["07020000", "21039010"],
  molho: ["21039010", "21039090"],
  catchup: ["21032000"],
  ketchup: ["21032000"],
  
  // AZEITONAS
  azeitona: ["20019000"],
  
  // VEGETAIS
  cebola: ["07031000"],
  cogumelo: ["07099000"],
  champignon: ["07099000"],
  palmito: ["20059100"],
  milho: ["20058000"],
  ervilha: ["20054000"],
  pimentao: ["07096000"],
  pimentão: ["07096000"],
  rucula: ["07099000"],
  rúcula: ["07099000"],
  espinafre: ["07099000"],
  brocoli: ["07104000"],
  brócolis: ["07104000"],
  
  // MASSAS E FARINHA
  massa: ["19023010"],
  farinha: ["11010010"],
  fermento: ["21023000"],
  
  // ÓLEOS
  azeite: ["15091000"],
  oleo: ["15152900"],
  óleo: ["15152900"],
  
  // BEBIDAS
  refrigerante: ["22021000"],
  coca: ["22021000"],
  guarana: ["22021000"],
  guaraná: ["22021000"],
  suco: ["22029100"],
  agua: ["22021000"],
  água: ["22021000"],
  cerveja: ["22030000"],
  
  // CHOCOLATES
  chocolate: ["18069000"],
  brigadeiro: ["18069000"],
  nutella: ["18069000"],
  
  // EMBALAGENS
  caixa: ["48191000"],
  embalagem: ["48192000"],
  saco: ["39232100"],
  guardanapo: ["48236900"],
  
  // CONDIMENTOS
  oregano: ["09109100"],
  orégano: ["09109100"],
  pimenta: ["09042100"],
  alho: ["07032000"],
  sal: ["25010010"],
  tempero: ["21039010"],
  
  // DIVERSOS
  biscoito: ["19053100"],
  bolacha: ["19053100"],
  pao: ["19059090"],
  pão: ["19059090"],
};

/* SUGERIR NCMs BASEADO NO NOME DO PRODUTO */
export async function sugerirNCMsInteligente(nomeProduto) {
  if (!nomeProduto || nomeProduto.length < 3) {
    return [];
  }

  const nomeNormalizado = nomeProduto.toLowerCase().trim();
  const palavras = nomeNormalizado.split(/\s+/);
  
  // Buscar NCMs por palavras-chave
  const codigosEncontrados = new Set();
  
  palavras.forEach(palavra => {
    // Busca exata
    if (NCM_KEYWORDS_MAP[palavra]) {
      NCM_KEYWORDS_MAP[palavra].forEach(codigo => codigosEncontrados.add(codigo));
    }
    
    // Busca parcial (contains)
    Object.keys(NCM_KEYWORDS_MAP).forEach(keyword => {
      if (palavra.includes(keyword) || keyword.includes(palavra)) {
        NCM_KEYWORDS_MAP[keyword].forEach(codigo => codigosEncontrados.add(codigo));
      }
    });
  });

  // Se encontrou códigos via keywords, buscar detalhes
  if (codigosEncontrados.size > 0) {
    const codigos = Array.from(codigosEncontrados);
    const { data, error } = await supabase
      .from("ncm")
      .select("*")
      .in("codigo", codigos)
      .order("codigo");

    if (!error && data && data.length > 0) {
      return data;
    }
  }

  // Fallback: busca textual na base
  const { data, error } = await supabase
    .from("ncm")
    .select("*")
    .ilike("descricao", `%${nomeNormalizado}%`)
    .limit(10);

  return data || [];
}

/* BUSCAR NCMs POR TEXTO (AUTOCOMPLETE) */
export async function buscarNCMs(termo, limit = 20) {
  if (!termo || termo.length < 2) {
    // Retornar os mais usados em pizzaria
    const { data } = await supabase
      .from("ncm")
      .select("*")
      .in("codigo", [
        "04063021", // Mussarela
        "04069000", // Cheddar
        "16010010", // Calabresa
        "16024100", // Presunto
        "21039010", // Molho de tomate
        "20019000", // Azeitonas
        "07020000", // Tomates
        "19023010", // Massas
      ])
      .order("codigo");
    
    return data || [];
  }

  // Buscar por código ou descrição
  const { data, error } = await supabase
    .from("ncm")
    .select("*")
    .or(`codigo.ilike.%${termo}%,descricao.ilike.%${termo}%`)
    .order("codigo")
    .limit(limit);

  return data || [];
}

/* LISTAR NCMs MAIS USADOS EM PIZZARIA */
export async function listarNCMsPrioritarios() {
  const codigosPrioritarios = [
    "04063021", // Mussarela
    "04069000", // Cheddar
    "04069051", // Catupiry
    "04069090", // Parmesão
    "16010010", // Calabresa
    "16024100", // Presunto
    "16024200", // Bacon
    "02071400", // Frango
    "21039010", // Molho de tomate
    "20019000", // Azeitonas
    "07020000", // Tomates frescos
    "07031000", // Cebola
    "19023010", // Massa
    "11010010", // Farinha
    "22021000", // Refrigerante
    "18069000", // Chocolate
    "48191000", // Caixa de pizza
  ];

  const { data } = await supabase
    .from("ncm")
    .select("*")
    .in("codigo", codigosPrioritarios)
    .order("codigo");

  return data || [];
}

/* OBTER ALÍQUOTAS PADRÃO PARA DF (BRASÍLIA) */
export function obterAliquotasPadraoDF(ncmCodigo) {
  // Categorizar por NCM
  const primeirosDois = ncmCodigo.substring(0, 2);
  
  // Bebidas (capítulo 22) - ICMS ST elevado
  if (primeirosDois === "22") {
    return {
      icms: 27.00,
      pis: 1.65,
      cofins: 7.60,
      ipi: 0,
      origem: "0", // Nacional
      cst_icms: "060", // ICMS cobrado por ST
      cst_pis: "01", // Tributável
      cst_cofins: "01", // Tributável
    };
  }
  
  // Chocolates (capítulo 18) - ICMS maior
  if (primeirosDois === "18") {
    return {
      icms: 18.00,
      pis: 1.65,
      cofins: 7.60,
      ipi: 0,
      origem: "0",
      cst_icms: "000", // Tributado integralmente
      cst_pis: "01",
      cst_cofins: "01",
    };
  }
  
  // Embalagens (capítulos 39, 48) - ICMS padrão
  if (["39", "48"].includes(primeirosDois)) {
    return {
      icms: 18.00,
      pis: 1.65,
      cofins: 7.60,
      ipi: 0,
      origem: "0",
      cst_icms: "000",
      cst_pis: "01",
      cst_cofins: "01",
    };
  }
  
  // Alimentos em geral (capítulos 02, 04, 07, 16, 19, 20, 21)
  if (["02", "04", "07", "16", "19", "20", "21"].includes(primeirosDois)) {
    return {
      icms: 12.00,
      pis: 1.65,
      cofins: 7.60,
      ipi: 0,
      origem: "0",
      cst_icms: "000",
      cst_pis: "01",
      cst_cofins: "01",
    };
  }
  
  // Padrão genérico
  return {
    icms: 12.00,
    pis: 1.65,
    cofins: 7.60,
    ipi: 0,
    origem: "0",
    cst_icms: "000",
    cst_pis: "01",
    cst_cofins: "01",
  };
}

/* VALIDAR NCM (8 DÍGITOS NUMÉRICOS) */
export function validarNCM(codigo) {
  if (!codigo) return false;
  const codigoLimpo = codigo.replace(/\D/g, "");
  return codigoLimpo.length === 8;
}

/* FORMATAR NCM (XXXX.XX.XX) */
export function formatarNCM(codigo) {
  if (!codigo) return "";
  const limpo = codigo.replace(/\D/g, "");
  if (limpo.length !== 8) return codigo;
  return `${limpo.substring(0, 4)}.${limpo.substring(4, 6)}.${limpo.substring(6, 8)}`;
}
