# ✅ CHECKLIST DE APLICAÇÃO

## 📋 ANTES DE COMEÇAR

- [ ] Tenho acesso ao Supabase SQL Editor
- [ ] Estou no projeto correto do Supabase
- [ ] Tenho permissões de administrador
- [ ] O navegador está aberto em localhost:5173/produtos

---

## 🔧 PASSO 1: CORRIGIR RLS

### Ação:
1. [ ] Abra o Supabase Dashboard
2. [ ] Vá em SQL Editor
3. [ ] Crie uma nova query
4. [ ] Abra o arquivo: `migrations/FIX_RLS.sql`
5. [ ] Copie TODO o conteúdo
6. [ ] Cole no SQL Editor
7. [ ] Clique em RUN
8. [ ] Aguarde "Success" aparecer

### Verificação:
```sql
-- Execute esta query para confirmar
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('fornecedores', 'produtos_qualidade', 'produtos_fiscal', 'ncm', 'estoque_lotes');

-- Deve retornar 20 linhas (4 políticas × 5 tabelas)
```

**Status**: [ ] ✅ Completo

---

## 📊 PASSO 2: CARREGAR NCMs

### Ação:
1. [ ] No mesmo SQL Editor
2. [ ] Crie outra nova query
3. [ ] Abra o arquivo: `migrations/NCM_PIZZARIA.sql`
4. [ ] Copie TODO o conteúdo
5. [ ] Cole no SQL Editor
6. [ ] Clique em RUN
7. [ ] Aguarde "Success" aparecer

### Verificação:
```sql
-- Execute esta query para confirmar
SELECT COUNT(*) FROM ncm;
-- Deve retornar > 70

SELECT codigo, descricao FROM ncm WHERE codigo = '04063021';
-- Deve retornar: 04063021 | Mussarela
```

**Status**: [ ] ✅ Completo

---

## 🔄 PASSO 3: RECARREGAR SISTEMA

### Ação:
1. [ ] Volte para a aba do navegador (localhost:5173)
2. [ ] Pressione F5 ou Ctrl+R
3. [ ] Aguarde o sistema recarregar
4. [ ] Veja se aparece "Produtos" na tela

**Status**: [ ] ✅ Completo

---

## 🧪 PASSO 4: TESTAR SISTEMA

### Teste 1: Sugestão de NCM
1. [ ] Clique em "+ Novo Produto"
2. [ ] Digite no nome: "Queijo Mussarela"
3. [ ] Aguarde 1 segundo
4. [ ] Veja se aparece o box azul com sugestões
5. [ ] Deve mostrar "0406.30.21 - Mussarela"

**Status**: [ ] ✅ Box apareceu

---

### Teste 2: Aplicar NCM
1. [ ] Clique no NCM sugerido "0406.30.21"
2. [ ] Sistema deve ir para aba "Fiscal"
3. [ ] Deve aparecer toast verde: "NCM aplicado..."
4. [ ] Verifique se campos foram preenchidos:
   - [ ] NCM: 0406.30.21
   - [ ] ICMS: 12.00%
   - [ ] PIS: 1.65%
   - [ ] COFINS: 7.60%
   - [ ] CFOP: 5102

**Status**: [ ] ✅ Alíquotas preenchidas

---

### Teste 3: Validação
1. [ ] Volte para aba "Geral"
2. [ ] Apague o nome
3. [ ] Preencha só o preço: R$ 10,00
4. [ ] Clique em "Salvar"
5. [ ] Deve aparecer erro: "Nome é obrigatório"

**Status**: [ ] ✅ Validação funcionando

---

### Teste 4: Salvar Produto Completo
1. [ ] Preencha todos os campos:
   - [ ] Nome: "Queijo Mussarela"
   - [ ] Preço venda: 45.00
   - [ ] Categoria: (selecione uma)
2. [ ] Clique em "Salvar"
3. [ ] Deve aparecer toast verde: "Produto criado..."
4. [ ] Produto deve aparecer na lista

**Status**: [ ] ✅ Produto criado com sucesso

---

## 🎯 TESTES AVANÇADOS

### Teste 5: Outros NCMs
Teste com diferentes produtos:

- [ ] "Calabresa" → Deve sugerir 1601.00.10
- [ ] "Refrigerante Coca" → Deve sugerir 2202.10.00
- [ ] "Molho de Tomate" → Deve sugerir 2103.90.10
- [ ] "Chocolate" → Deve sugerir 1806.90.00
- [ ] "Caixa de Pizza" → Deve sugerir 4819.10.00

**Status**: [ ] ✅ Todos funcionando

---

### Teste 6: Alíquotas Diferenciadas
Verifique se bebidas têm ICMS 27%:

1. [ ] Crie produto: "Coca-Cola 2L"
2. [ ] Aplique NCM sugerido (2202.10.00)
3. [ ] Verifique: ICMS deve ser **27%** (não 12%)

**Status**: [ ] ✅ ICMS 27% para bebidas

---

## 🐛 TROUBLESHOOTING

### Erro: "produtos_qualidade does not exist"
**Solução**: Aplicar `migrations/APLICAR_AGORA.sql` primeiro

### Erro: 406 Not Acceptable
**Solução**: Aplicar `migrations/FIX_RLS.sql`

### Sugestões não aparecem
**Soluções**:
1. [ ] Verifique console (F12) se há erros
2. [ ] Verifique se NCM_PIZZARIA.sql foi aplicado
3. [ ] Limpe cache (Ctrl+Shift+Del)
4. [ ] Recarregue (F5)

### NCM não preenche alíquotas
**Soluções**:
1. [ ] Verifique se está clicando no NCM (não só selecionando)
2. [ ] Verifique console (F12) se há erros
3. [ ] Tente outro NCM para confirmar

---

## ✅ CONFIRMAÇÃO FINAL

Marque apenas se TODOS os testes passaram:

- [ ] RLS corrigido (sem erros 406)
- [ ] 70+ NCMs carregados
- [ ] Sugestões aparecem ao digitar
- [ ] Alíquotas preenchem automaticamente
- [ ] Validações funcionando
- [ ] Produto salva com sucesso

### 🎉 TUDO OK?

**Status Final**: [ ] ✅ SISTEMA 100% FUNCIONAL

---

## 📞 SE ALGO NÃO FUNCIONAR

1. Tire print do erro (F12 → Console)
2. Verifique qual passo não funcionou
3. Revise o arquivo `INSTRUCOES_FISCAL_INTELIGENTE.md`
4. Execute queries de verificação acima

---

## 📊 RELATÓRIO DE IMPLANTAÇÃO

Data: ___/___/______
Responsável: ________________
Tempo total: _______ minutos

### Problemas encontrados:
```
(Descreva aqui)
```

### Observações:
```
(Descreva aqui)
```

---

**Sistema desenvolvido especificamente para pizzarias em Brasília/DF** 🍕
