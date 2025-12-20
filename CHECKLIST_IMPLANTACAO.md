# ✅ CHECKLIST DE IMPLANTAÇÃO - MÓDULO DE PRODUTOS V2.0

## 📋 ANTES DE COMEÇAR

### Preparação
- [ ] Backup completo do banco de dados
- [ ] Backup do código atual (Git commit ou cópia)
- [ ] Ambiente de desenvolvimento funcionando
- [ ] Acesso ao Supabase Dashboard
- [ ] Terminal aberto no VS Code

---

## 🗄️ PARTE 1: BANCO DE DADOS

### 1.1 Aplicar Migration

- [ ] Abrir Supabase Dashboard (https://supabase.com)
- [ ] Selecionar o projeto correto
- [ ] Clicar em "SQL Editor" no menu lateral
- [ ] Abrir arquivo `migrations/001_produtos_evolution.sql`
- [ ] Copiar TODO o conteúdo (Ctrl+A, Ctrl+C)
- [ ] Colar no SQL Editor do Supabase
- [ ] Clicar em "Run" (ou Ctrl+Enter)
- [ ] ✅ Verificar mensagem de sucesso

### 1.2 Verificar Tabelas Criadas

Execute no SQL Editor:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'fornecedores', 
    'produtos_qualidade', 
    'produtos_fiscal', 
    'estoque_lotes', 
    'ncm'
  )
ORDER BY table_name;
```

**Resultado esperado:** 5 tabelas listadas

- [ ] `estoque_lotes` ✓
- [ ] `fornecedores` ✓
- [ ] `ncm` ✓
- [ ] `produtos_fiscal` ✓
- [ ] `produtos_qualidade` ✓

### 1.3 Verificar Dados Iniciais

Execute no SQL Editor:
```sql
SELECT COUNT(*) as total_ncms FROM ncm;
```

**Resultado esperado:** Pelo menos 7 NCMs

- [ ] NCMs inseridos: _____ (mínimo 7)

### 1.4 Verificar View

Execute no SQL Editor:
```sql
SELECT COUNT(*) FROM vw_produtos_completo;
```

- [ ] View criada com sucesso (sem erro)

---

## 📦 PARTE 2: CÓDIGO FRONTEND

### 2.1 Verificar Arquivos Criados

Checar se existem:

#### Services
- [ ] `src/services/produtosQualidadeService.js`
- [ ] `src/services/produtosFiscalService.js`
- [ ] `src/services/fornecedoresService.js`
- [ ] `src/services/estoqueLotesService.js`

#### Componentes
- [ ] `src/components/StatusBadge.jsx`
- [ ] `src/components/InfoCard.jsx`
- [ ] `src/components/SkeletonLoader.jsx`

#### Páginas
- [ ] `src/pages/Produtos_NEW.jsx`

#### Constantes
- [ ] `src/constants/index.js` (modificado com novas constantes)

### 2.2 Fazer Backup do Arquivo Atual

```powershell
Copy-Item "src/pages/Produtos.jsx" "src/pages/Produtos_BACKUP.jsx"
```

- [ ] Backup criado em `src/pages/Produtos_BACKUP.jsx`
- [ ] Tamanho do arquivo similar ao original

### 2.3 Substituir Arquivo Principal

```powershell
Move-Item "src/pages/Produtos_NEW.jsx" "src/pages/Produtos.jsx" -Force
```

- [ ] Arquivo `Produtos.jsx` substituído
- [ ] Arquivo `Produtos_NEW.jsx` não existe mais
- [ ] Arquivo `Produtos_BACKUP.jsx` existe

---

## 🚀 PARTE 3: TESTES

### 3.1 Iniciar Servidor

```powershell
npm run dev
```

- [ ] Servidor iniciou sem erros
- [ ] URL disponível (geralmente http://localhost:5173)

### 3.2 Testar Interface

#### Listagem
- [ ] Página de Produtos abre sem erros
- [ ] Tabela de produtos carrega
- [ ] Colunas exibidas: Nome, Categoria, Código, Estoque, Preço, Status, Ações
- [ ] Skeleton aparece durante carregamento (se houver produtos)

#### Console do Navegador (F12)
- [ ] Nenhum erro em vermelho
- [ ] Nenhum warning crítico

### 3.3 Testar CRUD Básico

#### Criar Produto
- [ ] Clicar em "+ Novo Produto"
- [ ] Modal abre
- [ ] Aba "Geral" visível
- [ ] Preencher dados obrigatórios:
  - Nome: `Produto Teste`
  - Preço de Venda: `50.00`
- [ ] Clicar em "Salvar Produto"
- [ ] Toast de sucesso aparece
- [ ] Modal fecha
- [ ] Produto aparece na listagem

#### Editar Produto
- [ ] Clicar em "Editar" em um produto
- [ ] Modal abre com dados carregados
- [ ] Loading aparece brevemente
- [ ] Dados preenchidos corretamente

#### Abas do Modal (ao editar)
- [ ] Aba "📋 Geral" funciona
- [ ] Aba "🥗 Qualidade" funciona
- [ ] Aba "📊 Fiscal" funciona
- [ ] Aba "📦 Estoque" funciona

### 3.4 Testar Campos Novos

#### Aba Geral
- [ ] Campo "Descrição" existe
- [ ] Campo "Código de Barras" existe
- [ ] Select "Unidade de Medida" com 10 opções
- [ ] Select "Fornecedor" existe
- [ ] Campo "Estoque Mínimo" existe
- [ ] **Cálculo de margem** aparece ao preencher preços
- [ ] Margem calcula corretamente

#### Aba Qualidade
- [ ] Campo "Data de Validade" funciona
- [ ] Campo "Lote" funciona
- [ ] Campos de temperatura (min/max) funcionam
- [ ] Botões de "Certificações" são clicáveis
- [ ] Certificação selecionada fica azul
- [ ] Botões de "Alérgenos" são clicáveis
- [ ] Alérgeno selecionado fica vermelho
- [ ] Campo "Composição" funciona
- [ ] Campo "Observações" funciona

#### Aba Fiscal
- [ ] Select "NCM" carrega opções
- [ ] Select "Origem" com 8 opções
- [ ] Select "CFOP" com 6 opções
- [ ] Campos de impostos (ICMS, PIS, COFINS, IPI) funcionam
- [ ] Selects de CST funcionam
- [ ] **Simulação de impostos** aparece ao selecionar NCM
- [ ] Valores calculados estão corretos

#### Aba Estoque
- [ ] Card "Estoque Atual" mostra valor
- [ ] Card "Estoque Mínimo" mostra valor
- [ ] Card "Status" mostra badge
- [ ] Badge de status tem cor correta:
  - Verde = Normal (estoque > mínimo)
  - Amarelo = Baixo (estoque <= mínimo)
  - Vermelho = Crítico (estoque = 0)

### 3.5 Testar Validações

#### Validações de Criação
- [ ] Tentar salvar sem nome → Erro exibido
- [ ] Tentar salvar com preço 0 → Erro exibido
- [ ] Toast de erro aparece em vermelho

#### Validações de Qualidade
- [ ] Tentar salvar validade no passado → Erro?
- [ ] Temperatura min > max → Erro?

#### Validações Fiscais
- [ ] Tentar salvar fiscal sem NCM → Erro exibido

### 3.6 Testar Integração

#### Services
- [ ] Abrir console do navegador (F12)
- [ ] Aba "Network"
- [ ] Criar/editar produto
- [ ] Verificar requisições ao Supabase
- [ ] Status 200 ou 201 nas requisições

#### Dados Persistidos
- [ ] Criar produto com qualidade
- [ ] Fechar modal
- [ ] Reabrir produto
- [ ] Dados de qualidade carregados
- [ ] Criar produto com dados fiscais
- [ ] Fechar modal
- [ ] Reabrir produto
- [ ] Dados fiscais carregados

---

## 🎨 PARTE 4: TESTES VISUAIS

### 4.1 Layout
- [ ] Modal é responsivo
- [ ] Abas são clicáveis
- [ ] Aba ativa tem destaque azul
- [ ] Botões têm hover
- [ ] Cores estão corretas (Tailwind)

### 4.2 Badges
- [ ] Badge de estoque Normal (verde)
- [ ] Badge de estoque Baixo (amarelo)
- [ ] Badge de estoque Crítico (vermelho)
- [ ] Badge de produto Ativo (verde)
- [ ] Badge de produto Inativo (vermelho)

### 4.3 Cards
- [ ] Cards na aba Estoque bem formatados
- [ ] Ícones aparecem
- [ ] Cores dos cards corretas

### 4.4 Skeleton
- [ ] Skeleton aparece ao carregar lista
- [ ] Animação "pulse" funciona
- [ ] Skeleton some quando dados carregam

---

## 📊 PARTE 5: TESTES DE DADOS

### 5.1 Verificar no Banco

Execute no SQL Editor do Supabase:

#### Produtos Criados
```sql
SELECT id, nome, codigo_barras, preco_custo, estoque_minimo 
FROM produtos 
ORDER BY created_at DESC 
LIMIT 5;
```

- [ ] Novos campos aparecem
- [ ] Dados salvos corretamente

#### Qualidade
```sql
SELECT * FROM produtos_qualidade LIMIT 5;
```

- [ ] Registros criados
- [ ] Arrays de certificações/alérgenos funcionam

#### Fiscal
```sql
SELECT pf.*, n.codigo as ncm_codigo
FROM produtos_fiscal pf
LEFT JOIN ncm n ON pf.ncm_id = n.id
LIMIT 5;
```

- [ ] Registros criados
- [ ] Relação com NCM funciona

---

## 🔍 PARTE 6: TESTES DE REGRESSÃO

### 6.1 Funcionalidades Antigas

- [ ] Listar produtos funciona
- [ ] Filtros funcionam (se existiam)
- [ ] Paginação funciona (se existia)
- [ ] Busca funciona (se existia)

### 6.2 Integrações Existentes

- [ ] Dashboard de produtos funciona
- [ ] Estoque continua funcionando
- [ ] Movimentações continuam funcionando
- [ ] Relatórios continuam funcionando

---

## 🐛 PARTE 7: TROUBLESHOOTING

### Se houver erros:

#### Erro: "relation does not exist"
- [ ] Migration foi executada?
- [ ] Tabela existe no Supabase?
- [ ] Nome da tabela está correto?

#### Erro: "fornecedores is not defined"
- [ ] Servidor reiniciado?
- [ ] Service importado corretamente?
- [ ] Arquivo existe?

#### Modal não abre
- [ ] Console tem erros?
- [ ] Service de produtos funcionando?
- [ ] Estado inicial correto?

#### Abas não aparecem
- [ ] Editando produto (não criando)?
- [ ] editingProduto não é null?
- [ ] Renderização condicional correta?

---

## ✅ PARTE 8: CHECKLIST FINAL

### Documentação
- [ ] Lido GUIA_IMPLANTACAO_PRODUTOS.md
- [ ] Consultado RESUMO_EXECUTIVO_PRODUTOS.md
- [ ] Visto EXEMPLOS_USO_SERVICES.md
- [ ] Conferido INDICE_COMPLETO.md

### Código
- [ ] Todos os services criados
- [ ] Todos os componentes criados
- [ ] Constantes atualizadas
- [ ] Página substituída

### Banco de Dados
- [ ] Migration aplicada
- [ ] 5 tabelas criadas
- [ ] View criada
- [ ] NCMs inseridos

### Funcionalidades
- [ ] CRUD básico funciona
- [ ] Novas abas funcionam
- [ ] Validações funcionam
- [ ] Cálculos funcionam
- [ ] Badges funcionam

### Testes
- [ ] Sem erros no console
- [ ] Sem erros no terminal
- [ ] Dados persistem
- [ ] Integrações OK

---

## 🎉 CONCLUSÃO

### Se TODOS os itens acima estão marcados:

✅ **IMPLANTAÇÃO CONCLUÍDA COM SUCESSO!**

### Próximos Passos:

1. [ ] Cadastrar fornecedores reais
2. [ ] Configurar NCMs específicos do negócio
3. [ ] Atualizar produtos existentes com novos dados
4. [ ] Treinar usuários nas novas funcionalidades
5. [ ] Monitorar logs e erros
6. [ ] Coletar feedback dos usuários

---

## 📞 SUPORTE

Se algo não funcionou:

1. ✅ Revisar este checklist
2. 📖 Consultar GUIA_IMPLANTACAO_PRODUTOS.md
3. 💻 Verificar console do navegador (F12)
4. 📊 Verificar logs do Supabase
5. 🔍 Consultar EXEMPLOS_USO_SERVICES.md

---

## 📝 ANOTAÇÕES

Use este espaço para anotar problemas encontrados ou observações:

```
_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________

```

---

**Data da Implantação:** _____ / _____ / _____

**Responsável:** _________________________________

**Status:** [ ] Sucesso  [ ] Com pendências  [ ] Falhou

**Observações:**

```
_____________________________________________________________________________

_____________________________________________________________________________

_____________________________________________________________________________

```

---

**Checklist desenvolvido para garantir implantação segura e completa.**  
**Siga cada item com atenção.**

✅ **Boa implantação!**
