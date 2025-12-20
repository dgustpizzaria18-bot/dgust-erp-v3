# 📘 EXEMPLOS DE USO - SERVICES DO MÓDULO DE PRODUTOS

Este documento demonstra como usar os novos services criados para o módulo de produtos.

---

## 📦 1. PRODUTOS SERVICE (Atualizado)

### Listar Produtos
```javascript
import { listarProdutos } from "../services/produtosService";

async function carregarProdutos() {
  try {
    const produtos = await listarProdutos();
    console.log(produtos);
    // Retorna: [{ id, nome, estoque_atual, preco_venda, codigo_barras, ... }]
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Obter Produto Completo
```javascript
import { obterProdutoCompleto } from "../services/produtosService";

async function buscarProduto(produtoId) {
  try {
    const produto = await obterProdutoCompleto(produtoId);
    console.log(produto);
    // Retorna todos os campos do produto
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Criar Produto
```javascript
import { criarProduto } from "../services/produtosService";

async function cadastrarProduto() {
  try {
    const novoProduto = await criarProduto({
      nome: "Pizza Margherita",
      descricao: "Pizza tradicional com molho de tomate e mussarela",
      categoria_id: "uuid-da-categoria",
      codigo_barras: "7891234567890",
      preco_custo: 15.00,
      preco_venda: 35.00,
      estoque_minimo: 10,
      unidade_id: "UN",
      fornecedor_id: "uuid-do-fornecedor",
      ativo: true
    });
    
    console.log("Produto criado:", novoProduto);
    // Estoque sempre será 0 ao criar
  } catch (error) {
    console.error("Erro:", error.message);
  }
}
```

### Atualizar Produto
```javascript
import { atualizarProduto } from "../services/produtosService";

async function editarProduto(produtoId) {
  try {
    await atualizarProduto(produtoId, {
      preco_venda: 38.00,
      estoque_minimo: 15,
      // NOTA: estoque_atual é ignorado (proteção)
    });
    
    console.log("Produto atualizado!");
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

---

## 🥗 2. PRODUTOS QUALIDADE SERVICE

### Salvar Dados de Qualidade
```javascript
import { salvarQualidadeProduto } from "../services/produtosQualidadeService";

async function cadastrarQualidade(produtoId) {
  try {
    const qualidade = await salvarQualidadeProduto(produtoId, {
      validade: "2025-12-31",
      lote: "L20251220A",
      temperatura_min: -18,
      temperatura_max: -10,
      certificacoes: ["ISO 22000", "HACCP", "BPF"],
      alergenos: ["Glúten", "Leite e derivados"],
      composicao: "Farinha de trigo, mussarela, tomate, azeite",
      observacoes: "Manter congelado até o momento do uso"
    });
    
    console.log("Qualidade salva:", qualidade);
  } catch (error) {
    console.error("Erro:", error.message);
    // Pode ser: "Data de validade não pode ser no passado"
  }
}
```

### Obter Qualidade de um Produto
```javascript
import { obterQualidadeProduto } from "../services/produtosQualidadeService";

async function buscarQualidade(produtoId) {
  try {
    const qualidade = await obterQualidadeProduto(produtoId);
    
    if (qualidade) {
      console.log("Validade:", qualidade.validade);
      console.log("Lote:", qualidade.lote);
      console.log("Certificações:", qualidade.certificacoes);
    } else {
      console.log("Produto sem dados de qualidade");
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Calcular Status de Validade
```javascript
import { calcularStatusValidade } from "../services/produtosQualidadeService";

function verificarValidade(dataValidade) {
  const status = calcularStatusValidade(dataValidade);
  
  if (status) {
    console.log(`Status: ${status.status}`);
    console.log(`Dias restantes: ${status.dias}`);
    console.log(`Cor: ${status.cor}`);
    
    // Exemplos de retorno:
    // { status: "vencido", dias: 5, cor: "red" }
    // { status: "vencendo_7d", dias: 3, cor: "red" }
    // { status: "vencendo_30d", dias: 20, cor: "yellow" }
    // { status: "ok", dias: 90, cor: "green" }
  }
}
```

### Listar Produtos Vencendo
```javascript
import { listarProdutosValidadeProxima } from "../services/produtosQualidadeService";

async function alertarVencimentos() {
  try {
    // Produtos que vencem nos próximos 7 dias
    const vencendo = await listarProdutosValidadeProxima(7);
    
    vencendo.forEach(item => {
      console.log(`Produto: ${item.produtos.nome}`);
      console.log(`Validade: ${item.validade}`);
      console.log(`Estoque: ${item.produtos.estoque_atual}`);
      console.log("---");
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

---

## 📊 3. PRODUTOS FISCAL SERVICE

### Salvar Dados Fiscais
```javascript
import { salvarFiscalProduto } from "../services/produtosFiscalService";

async function cadastrarFiscal(produtoId, ncmId) {
  try {
    const fiscal = await salvarFiscalProduto(produtoId, {
      ncm_id: ncmId,
      cfop: "5102",
      icms: 12.00,
      pis: 1.65,
      cofins: 7.60,
      ipi: 0,
      origem: "0",
      cst_icms: "000",
      cst_pis: "01",
      cst_cofins: "01",
      cest: ""
    });
    
    console.log("Dados fiscais salvos:", fiscal);
  } catch (error) {
    console.error("Erro:", error.message);
    // Pode ser: "NCM é obrigatório para dados fiscais"
  }
}
```

### Obter Dados Fiscais
```javascript
import { obterFiscalProduto } from "../services/produtosFiscalService";

async function buscarFiscal(produtoId) {
  try {
    const fiscal = await obterFiscalProduto(produtoId);
    
    if (fiscal) {
      console.log("NCM:", fiscal.ncm.codigo, "-", fiscal.ncm.descricao);
      console.log("ICMS:", fiscal.icms + "%");
      console.log("PIS:", fiscal.pis + "%");
      console.log("COFINS:", fiscal.cofins + "%");
    } else {
      console.log("Produto sem dados fiscais");
    }
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Calcular Impostos
```javascript
import { calcularImpostos } from "../services/produtosFiscalService";

function simularImpostos() {
  const precoVenda = 100.00;
  const dadosFiscais = {
    icms: 12.00,
    pis: 1.65,
    cofins: 7.60,
    ipi: 0
  };
  
  const impostos = calcularImpostos(precoVenda, dadosFiscais);
  
  console.log("Valor do produto: R$", precoVenda.toFixed(2));
  console.log("ICMS: R$", impostos.icms.toFixed(2));
  console.log("PIS: R$", impostos.pis.toFixed(2));
  console.log("COFINS: R$", impostos.cofins.toFixed(2));
  console.log("IPI: R$", impostos.ipi.toFixed(2));
  console.log("Total de impostos: R$", impostos.total.toFixed(2));
  console.log("Valor líquido: R$", (precoVenda - impostos.total).toFixed(2));
}
```

### Gerenciar NCMs
```javascript
import { 
  listarNCMs, 
  buscarNCMs, 
  criarNCM 
} from "../services/produtosFiscalService";

// Listar todos
async function listarTodosNCMs() {
  const ncms = await listarNCMs();
  console.log(`${ncms.length} NCMs cadastrados`);
}

// Buscar por termo
async function buscarNCM() {
  const resultados = await buscarNCMs("pizza");
  resultados.forEach(ncm => {
    console.log(`${ncm.codigo} - ${ncm.descricao}`);
  });
}

// Criar novo NCM
async function cadastrarNCM() {
  try {
    const novoNCM = await criarNCM({
      codigo: "19059010",
      descricao: "Massas alimentícias recheadas",
      aliquota_nacional: 12.00
    });
    console.log("NCM criado:", novoNCM);
  } catch (error) {
    console.error("Erro:", error.message);
    // Pode ser: "Código NCM deve ter 8 dígitos"
  }
}
```

---

## 👥 4. FORNECEDORES SERVICE

### CRUD Completo
```javascript
import { 
  listarFornecedores,
  obterFornecedor,
  criarFornecedor,
  atualizarFornecedor,
  toggleFornecedor
} from "../services/fornecedoresService";

// Listar ativos
async function listarFornecedoresAtivos() {
  const fornecedores = await listarFornecedores();
  console.log(fornecedores); // Apenas ativos
}

// Obter um fornecedor
async function buscarFornecedor(id) {
  const fornecedor = await obterFornecedor(id);
  console.log(fornecedor);
}

// Criar fornecedor
async function cadastrarFornecedor() {
  const novoFornecedor = await criarFornecedor({
    nome: "Distribuidora de Alimentos XYZ",
    razao_social: "XYZ Alimentos LTDA",
    cnpj: "12.345.678/0001-90",
    email: "contato@xyz.com",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    observacoes: "Entrega apenas terças e quintas",
    ativo: true
  });
  console.log("Fornecedor criado:", novoFornecedor);
}

// Atualizar fornecedor
async function editarFornecedor(id) {
  await atualizarFornecedor(id, {
    telefone: "(11) 98888-9999",
    email: "novo@xyz.com"
  });
  console.log("Fornecedor atualizado!");
}

// Desativar fornecedor
async function desativarFornecedor(id) {
  await toggleFornecedor(id, false);
  console.log("Fornecedor desativado!");
}
```

---

## 📦 5. ESTOQUE LOTES SERVICE

### Criar Lote (Entrada)
```javascript
import { criarLote } from "../services/estoqueLotesService";

async function registrarEntradaComLote(produtoId, movimentacaoId) {
  try {
    const lote = await criarLote({
      produto_id: produtoId,
      lote: "L20251220A",
      validade: "2026-06-30",
      quantidade: 100,
      preco_custo: 15.00,
      movimentacao_id: movimentacaoId
    });
    
    console.log("Lote criado:", lote);
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Consumir Lote (Saída FIFO)
```javascript
import { consumirLoteFIFO } from "../services/estoqueLotesService";

async function saidaComFIFO(produtoId) {
  try {
    const quantidadeSaida = 50;
    const lotesConsumidos = await consumirLoteFIFO(produtoId, quantidadeSaida);
    
    console.log("Lotes consumidos:");
    lotesConsumidos.forEach(lote => {
      console.log(`Lote: ${lote.lote}`);
      console.log(`Consumido: ${lote.quantidade_consumida}`);
      console.log(`Restante: ${lote.quantidade_restante}`);
      console.log("---");
    });
  } catch (error) {
    console.error("Erro:", error.message);
    // Possíveis erros:
    // "Lote X está vencido e não pode ser usado"
    // "Quantidade insuficiente em lotes. Faltam X unidades."
    // "Nenhum lote disponível para este produto"
  }
}
```

### Listar Lotes de um Produto
```javascript
import { listarLotesProduto } from "../services/estoqueLotesService";

async function visualizarLotes(produtoId) {
  try {
    const lotes = await listarLotesProduto(produtoId);
    
    console.log("Lotes disponíveis:");
    lotes.forEach(lote => {
      console.log(`Lote: ${lote.lote}`);
      console.log(`Validade: ${lote.validade}`);
      console.log(`Quantidade: ${lote.quantidade}/${lote.quantidade_inicial}`);
      console.log(`Status: ${lote.status}`);
      console.log("---");
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Listar Lotes Vencendo
```javascript
import { listarLotesVencendo } from "../services/estoqueLotesService";

async function alertarLotesVencendo() {
  try {
    // Lotes que vencem nos próximos 7 dias
    const lotes = await listarLotesVencendo(7);
    
    console.log(`⚠️ ${lotes.length} lotes vencendo:`);
    lotes.forEach(lote => {
      console.log(`Produto: ${lote.produtos.nome}`);
      console.log(`Lote: ${lote.lote}`);
      console.log(`Validade: ${lote.validade}`);
      console.log(`Quantidade: ${lote.quantidade}`);
      console.log("---");
    });
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Atualizar Lotes Vencidos
```javascript
import { atualizarLotesVencidos } from "../services/estoqueLotesService";

async function executarRotinaDiaria() {
  try {
    await atualizarLotesVencidos();
    console.log("✅ Lotes vencidos atualizados");
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

### Bloquear/Desbloquear Lote
```javascript
import { toggleLote } from "../services/estoqueLotesService";

async function bloquearLote(loteId) {
  try {
    await toggleLote(loteId, "bloqueado");
    console.log("Lote bloqueado!");
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function reativarLote(loteId) {
  try {
    await toggleLote(loteId, "ativo");
    console.log("Lote reativado!");
  } catch (error) {
    console.error("Erro:", error);
  }
}
```

---

## 🎯 EXEMPLOS PRÁTICOS DE INTEGRAÇÃO

### Exemplo 1: Cadastro Completo de Produto Alimentício
```javascript
async function cadastrarProdutoCompleto() {
  try {
    // 1. Criar o produto básico
    const produto = await criarProduto({
      nome: "Pizza Calabresa Grande",
      descricao: "Pizza grande de calabresa com cebola",
      categoria_id: "uuid-categoria-pizzas",
      codigo_barras: "7891234567890",
      preco_custo: 18.50,
      preco_venda: 42.00,
      estoque_minimo: 5,
      unidade_id: "UN",
      fornecedor_id: "uuid-fornecedor",
      ativo: true
    });
    
    // 2. Adicionar dados de qualidade
    await salvarQualidadeProduto(produto.id, {
      validade: "2025-12-31",
      lote: "L20251220B",
      temperatura_min: -18,
      temperatura_max: -10,
      certificacoes: ["ANVISA", "BPF"],
      alergenos: ["Glúten", "Leite e derivados"],
      composicao: "Farinha de trigo, calabresa, mussarela, cebola, molho de tomate",
      observacoes: "Congelar imediatamente"
    });
    
    // 3. Adicionar dados fiscais
    const ncmPizza = await buscarNCMPorCodigo("19059090");
    await salvarFiscalProduto(produto.id, {
      ncm_id: ncmPizza.id,
      cfop: "5102",
      icms: 12.00,
      pis: 1.65,
      cofins: 7.60,
      origem: "0",
      cst_icms: "000",
      cst_pis: "01",
      cst_cofins: "01"
    });
    
    console.log("✅ Produto cadastrado com sucesso!");
    console.log("ID:", produto.id);
    
    return produto;
  } catch (error) {
    console.error("❌ Erro no cadastro:", error.message);
    throw error;
  }
}
```

### Exemplo 2: Fluxo de Entrada com Lote
```javascript
async function entradaProdutoComLote(produtoId, quantidade, dadosLote) {
  try {
    // 1. Criar movimentação de estoque (usar service existente)
    const movimentacao = await criarMovimentacao({
      produto_id: produtoId,
      tipo: "entrada",
      quantidade: quantidade,
      motivo: "Compra de fornecedor"
    });
    
    // 2. Criar lote vinculado à movimentação
    const lote = await criarLote({
      produto_id: produtoId,
      lote: dadosLote.numero,
      validade: dadosLote.validade,
      quantidade: quantidade,
      preco_custo: dadosLote.precoCusto,
      movimentacao_id: movimentacao.id
    });
    
    console.log("✅ Entrada registrada com lote!");
    console.log("Movimentação:", movimentacao.id);
    console.log("Lote:", lote.lote);
    
    return { movimentacao, lote };
  } catch (error) {
    console.error("❌ Erro na entrada:", error.message);
    throw error;
  }
}
```

### Exemplo 3: Verificação antes de Venda
```javascript
async function verificarAntesDaVenda(produtoId) {
  try {
    // 1. Buscar dados de qualidade
    const qualidade = await obterQualidadeProduto(produtoId);
    
    if (qualidade && qualidade.validade) {
      const status = calcularStatusValidade(qualidade.validade);
      
      if (status.status === "vencido") {
        throw new Error("❌ Produto vencido! Não pode ser vendido.");
      }
      
      if (status.status === "vencendo_7d") {
        console.warn(`⚠️ Produto vence em ${status.dias} dias!`);
      }
    }
    
    // 2. Verificar estoque
    const produto = await obterProdutoCompleto(produtoId);
    
    if (produto.estoque_atual <= 0) {
      throw new Error("❌ Produto sem estoque!");
    }
    
    if (produto.estoque_atual <= produto.estoque_minimo) {
      console.warn("⚠️ Estoque abaixo do mínimo!");
    }
    
    console.log("✅ Produto OK para venda!");
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
}
```

### Exemplo 4: Dashboard de Alertas
```javascript
async function gerarDashboardAlertas() {
  try {
    // 1. Produtos vencendo
    const vencendo = await listarProdutosValidadeProxima(7);
    
    // 2. Lotes vencendo
    const lotesVencendo = await listarLotesVencendo(7);
    
    // 3. Produtos com estoque baixo
    const produtos = await listarProdutos();
    const estoqueBaixo = produtos.filter(p => 
      p.estoque_atual > 0 && 
      p.estoque_atual <= p.estoque_minimo
    );
    
    // 4. Produtos sem estoque
    const semEstoque = produtos.filter(p => 
      p.estoque_atual === 0 && 
      p.ativo
    );
    
    return {
      produtosVencendo: vencendo.length,
      lotesVencendo: lotesVencendo.length,
      estoqueBaixo: estoqueBaixo.length,
      semEstoque: semEstoque.length,
      detalhes: {
        vencendo,
        lotesVencendo,
        estoqueBaixo,
        semEstoque
      }
    };
  } catch (error) {
    console.error("Erro ao gerar dashboard:", error);
    throw error;
  }
}

// Uso
async function exibirAlertas() {
  const alertas = await gerarDashboardAlertas();
  
  console.log("📊 DASHBOARD DE ALERTAS");
  console.log("========================");
  console.log(`⚠️ Produtos vencendo: ${alertas.produtosVencendo}`);
  console.log(`📦 Lotes vencendo: ${alertas.lotesVencendo}`);
  console.log(`📉 Estoque baixo: ${alertas.estoqueBaixo}`);
  console.log(`❌ Sem estoque: ${alertas.semEstoque}`);
}
```

---

## 🎓 BOAS PRÁTICAS

### 1. Sempre use try/catch
```javascript
try {
  await criarProduto(dados);
} catch (error) {
  console.error("Erro:", error.message);
  // Exibir toast para o usuário
}
```

### 2. Valide dados antes de enviar
```javascript
if (!formData.nome.trim()) {
  addToast("Nome é obrigatório", "error");
  return;
}
```

### 3. Use loading states
```javascript
setLoading(true);
try {
  await salvarProduto();
} finally {
  setLoading(false);
}
```

### 4. Feedback para o usuário
```javascript
await criarProduto(dados);
addToast("Produto criado com sucesso!", "success");
```

### 5. Não edite estoque diretamente
```javascript
// ❌ ERRADO
await atualizarProduto(id, { estoque_atual: 100 });

// ✅ CORRETO
await criarMovimentacao({
  produto_id: id,
  tipo: "entrada",
  quantidade: 100
});
```

---

## 📚 DOCUMENTAÇÃO ADICIONAL

- **GUIA_IMPLANTACAO_PRODUTOS.md** - Como implantar tudo
- **RESUMO_EXECUTIVO_PRODUTOS.md** - Visão geral do projeto
- **migrations/001_produtos_evolution.sql** - Schema do banco (comentado)

---

**Desenvolvido para facilitar o uso e manutenção do sistema.**  
**Todos os services têm tratamento de erros e validações.**

🎉 **Bom desenvolvimento!**
