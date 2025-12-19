# D'GUST ERP v3

Sistema de ERP (Enterprise Resource Planning) completo para gestão empresarial, desenvolvido com React, Vite, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

### ✅ Implementado
- **Dashboard** - Visualização com KPIs e gráficos interativos
  - Total de produtos, produtos ativos, estoque baixo
  - Gráficos de produtos por categoria
  - Gráfico de produtos ativos vs inativos
  - Gráfico de movimentação de estoque (entrada/saída)
  
- **Gestão de Produtos** - CRUD completo
  - Listagem de produtos com filtros
  - Criação e edição de produtos
  - Ativação/desativação de produtos
  - Controle de estoque e preços
  
- **Controle de Estoque**
  - Visualização de níveis de estoque
  - Indicadores visuais (estoque baixo, normal)
  - Movimentações de estoque (entrada/saída)
  - Histórico de movimentações

- **Autenticação e Segurança**
  - Login via Supabase Auth
  - Proteção de rotas (ProtectedRoute)
  - Context API para gerenciamento de sessão
  - Preparado para RLS (Row Level Security)

### 🔨 Em Desenvolvimento
- Clientes
- Pedidos
- Vendas
- Financeiro (Contas a Receber/Pagar)
- Relatórios
- Auditoria
- Configurações de Empresa
- Gestão de Usuários

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **Vite 5** - Build tool e dev server
- **Tailwind CSS v4** - Framework CSS utilitário
- **Supabase** - Backend as a Service (BaaS)
  - Autenticação
  - Banco de dados PostgreSQL
  - Row Level Security (RLS)
- **Recharts** - Biblioteca de gráficos
- **React Router Dom v6** - Roteamento

## 📦 Instalação

### 1. Configurar Variáveis de Ambiente

Antes de executar o projeto, você precisa configurar as variáveis de ambiente do Supabase:

```bash
# Copiar o arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Onde encontrar as credenciais:**
1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em Settings > API
3. Copie a "Project URL" para `VITE_SUPABASE_URL`
4. Copie a "anon public" key para `VITE_SUPABASE_ANON_KEY`

### 2. Instalar Dependências e Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── App.jsx           # Componente principal
│   ├── AuthContext.jsx   # Context de autenticação
│   ├── ProtectedRoute.jsx # HOC para proteção de rotas
│   └── routes.jsx        # Definição de rotas
├── components/
│   ├── Header.jsx        # Cabeçalho com logout
│   ├── Sidebar.jsx       # Menu lateral de navegação
│   ├── KpiCard.jsx       # Card de KPI
│   └── *Chart.jsx        # Componentes de gráficos
├── layouts/
│   └── DashboardLayout.jsx # Layout principal do sistema
├── pages/
│   ├── Login.jsx         # Página de login
│   ├── Dashboard.jsx     # Dashboard principal
│   ├── Produtos.jsx      # CRUD de produtos
│   ├── Estoque.jsx       # Controle de estoque
│   └── ...               # Outros módulos
├── services/
│   ├── supabaseClient.js # Configuração do Supabase
│   ├── dashboardService.js
│   ├── produtosService.js
│   └── estoqueService.js
└── styles/
    └── index.css         # Importação do Tailwind
```

## 🎨 Design System

O sistema utiliza Tailwind CSS v4 com paleta de cores personalizada:

- **Primary**: Zinc/Black - Interface profissional
- **Success**: Green - Indicadores positivos
- **Warning**: Yellow - Alertas
- **Danger**: Red - Erros e ações críticas
- **Info**: Blue - Informações e ações primárias

## 🔐 Segurança

### Row Level Security (RLS)
O sistema está preparado para usar RLS do Supabase para:
- Isolamento de dados por empresa (multiempresa)
- Controle de acesso por usuário
- Auditoria de ações

### Autenticação
- Login com email/senha via Supabase Auth
- Sessão persistente
- Logout seguro

## 📊 Módulos do Sistema

### Dashboard
Visão geral do negócio com:
- KPIs principais
- Gráficos interativos
- Indicadores de performance

### Cadastros
- **Produtos**: Gestão completa do catálogo
- **Clientes**: Cadastro e histórico (em dev)

### Estoque
- Controle de níveis de estoque
- Movimentações (entrada/saída)
- Alertas de estoque baixo

### Vendas
- Pedidos (em dev)
- Vendas (em dev)

### Financeiro
- Contas a Receber (em dev)
- Contas a Pagar (em dev)

### Relatórios
- Diversos relatórios gerenciais (em dev)
- Auditoria de ações (em dev)

### Configurações
- Empresa (multiempresa) (em dev)
- Usuários e permissões (em dev)

## 🚀 Próximos Passos

1. Implementar módulo de Clientes completo
2. Implementar módulo de Pedidos com integração ao estoque
3. Implementar módulo Financeiro
4. Configurar RLS no Supabase
5. Adicionar testes unitários e E2E
6. Implementar sistema de permissões
7. Adicionar auditoria de ações
8. Implementar relatórios avançados

## 📝 Banco de Dados (Supabase)

Tabelas principais:
- `produtos` - Catálogo de produtos
- `categorias` - Categorias de produtos
- `fornecedores` - Cadastro de fornecedores
- `estoque_movimentacoes` - Histórico de movimentações
- `clientes` - Cadastro de clientes
- `pedidos` - Pedidos de venda
- (outras tabelas conforme necessário)

## 🤝 Contribuindo

Este é um projeto em desenvolvimento ativo. Para contribuir:
1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Projeto privado - D'GUST ERP v3