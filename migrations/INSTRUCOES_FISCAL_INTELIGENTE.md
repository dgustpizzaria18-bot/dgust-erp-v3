# 🚀 SISTEMA FISCAL INTELIGENTE - INSTRUÇÕES DE APLICAÇÃO

## 📋 PASSOS PARA ATIVAR O SISTEMA

### 1️⃣ CORRIGIR POLÍTICAS RLS (ERROS 406)
```sql
-- Aplicar no Supabase SQL Editor
-- Arquivo: migrations/FIX_RLS.sql
```

Execute o conteúdo de **FIX_RLS.sql** no Supabase para corrigir os erros 406 (Not Acceptable).

### 2️⃣ CARREGAR BASE DE NCMs ESPECIALIZADA
```sql
-- Aplicar no Supabase SQL Editor
-- Arquivo: migrations/NCM_PIZZARIA.sql
```

Isso vai substituir os 7 NCMs genéricos por **70+ NCMs especializados** em pizzaria, incluindo:
- Queijos (8 tipos)
- Carnes e embutidos (10 tipos)
- Vegetais e conservas
- Massas e farinhas
- Bebidas
- Chocolates
- Embalagens
- Temperos

### 3️⃣ RECARREGAR O NAVEGADOR
```
F5 ou Ctrl+R
```

---

## 🧠 FUNCIONALIDADES INTELIGENTES IMPLEMENTADAS

### ✅ 1. SUGESTÃO AUTOMÁTICA DE NCM
- Digite o nome do produto (ex: "Mussarela")
- Sistema sugere NCMs compatíveis em 0,8s
- **70+ palavras-chave mapeadas** (queijo, calabresa, molho, etc.)

### ✅ 2. AUTOPREENCHIMENTO DE ALÍQUOTAS
Ao clicar em um NCM sugerido ou selecionar manualmente:
- ✅ ICMS (12%, 18% ou 27% conforme categoria)
- ✅ PIS (1,65%)
- ✅ COFINS (7,60%)
- ✅ Origem (Nacional)
- ✅ CST ICMS, PIS, COFINS
- ✅ CFOP padrão (5102)

### ✅ 3. VALIDAÇÕES FISCAIS
- ❌ Bloqueia salvamento sem NCM (produtos novos)
- ❌ Bloqueia salvamento sem CFOP (quando há fiscal)
- ⚠️ Alerta para produtos alimentícios sem NCM

### ✅ 4. UX INTELIGENTE
- **Box azul** com sugestões aparece ao digitar
- Clique para aplicar NCM + alíquotas
- Usuário é levado automaticamente para aba Fiscal
- Formatação NCM: `0406.90.00`

---

## 📊 REGRAS DE NEGÓCIO (BRASÍLIA/DF)

### Alíquotas por Categoria:
| Categoria | ICMS | Exemplo |
|-----------|------|---------|
| Alimentos | 12% | Queijos, carnes, massas |
| Chocolates | 18% | Brigadeiro, Nutella |
| Bebidas | 27% | Refrigerantes, cervejas |
| Embalagens | 18% | Caixas, sacos |

### Palavras-Chave → NCM:
- **"Mussarela"** → `04063021`
- **"Calabresa"** → `16010010`
- **"Molho"** → `21039010`
- **"Chocolate"** → `18069000`
- **"Refrigerante"** → `22021000`
- **"Caixa"** → `48191000`

---

## 🧪 COMO TESTAR

### Teste 1: Sugestão Inteligente
1. Clique em **+ Novo Produto**
2. Digite nome: `Queijo Mussarela`
3. Aguarde 0,8s
4. Box azul aparece com sugestões
5. Clique em `0406.30.21 - Mussarela`
6. ✅ Alíquotas preenchidas automaticamente

### Teste 2: NCM Fiscal
1. Vá para aba **📊 Fiscal**
2. Selecione qualquer NCM no dropdown
3. ✅ Alíquotas calculadas conforme DF

### Teste 3: Validação
1. Tente salvar produto novo sem NCM
2. ⚠️ Alerta: "Produto alimentício exige NCM"

---

## 📁 ARQUIVOS CRIADOS/MODIFICADOS

### Novos Arquivos:
- ✅ `migrations/FIX_RLS.sql` - Corrige erros 406
- ✅ `migrations/NCM_PIZZARIA.sql` - Base 70+ NCMs
- ✅ `src/services/ncmInteligenteService.js` - Lógica inteligente

### Arquivos Modificados:
- ✅ `src/pages/Produtos.jsx` - UI inteligente

---

## ⚡ ORDEM DE EXECUÇÃO

```bash
# 1. Aplicar no Supabase (SQL Editor)
migrations/FIX_RLS.sql

# 2. Aplicar no Supabase (SQL Editor)
migrations/NCM_PIZZARIA.sql

# 3. Recarregar navegador
F5
```

---

## 🎯 PRÓXIMOS PASSOS (FUTURO)

### Fase 2 - Integração BrasilAPI:
- Busca online de NCMs não cadastrados
- Atualização automática de alíquotas

### Fase 3 - Histórico Fiscal:
- Rastreamento de mudanças de alíquotas
- Relatórios fiscais por período

### Fase 4 - NF-e (Nota Fiscal Eletrônica):
- Geração automática de XML
- Envio para SEFAZ-DF

---

## 📞 SUPORTE

Se houver erros:
1. Verifique se **FIX_RLS.sql** foi aplicado
2. Verifique se **NCM_PIZZARIA.sql** foi aplicado
3. Limpe cache do navegador (Ctrl+Shift+Del)
4. Verifique console (F12) para erros JS

---

**Sistema desenvolvido especificamente para pizzarias em Brasília/DF** 🍕
