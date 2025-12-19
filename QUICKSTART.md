# 🚀 Quick Start Guide - D'GUST ERP

## Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git instalado

## 1️⃣ Configuração do Supabase

### Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Crie uma conta ou faça login
3. Clique em "New Project"
4. Preencha os dados do projeto:
   - Nome do projeto
   - Database Password (anote essa senha!)
   - Região (escolha a mais próxima)

### Obter Credenciais

1. Após criar o projeto, vá em **Settings** (⚙️) no menu lateral
2. Clique em **API**
3. Você verá duas informações importantes:
   - **Project URL**: algo como `https://xxxxx.supabase.co`
   - **anon public key**: uma chave JWT longa

## 2️⃣ Configuração Local

### Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd d3
```

### Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-jwt-anon-aqui
```

### Instalar Dependências

```bash
npm install
```

## 3️⃣ Configurar Banco de Dados

No Supabase, vá em **SQL Editor** e execute as seguintes queries:

### Criar Tabela de Categorias

```sql
CREATE TABLE categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### Criar Tabela de Fornecedores

```sql
CREATE TABLE fornecedores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT,
  telefone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### Criar Tabela de Produtos

```sql
CREATE TABLE produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  estoque_atual INTEGER DEFAULT 0,
  preco_venda DECIMAL(10,2) DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  categoria_id UUID REFERENCES categorias(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### Criar Tabela de Movimentações de Estoque

```sql
CREATE TABLE estoque_movimentacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produto_id UUID REFERENCES produtos(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
  quantidade INTEGER NOT NULL,
  origem TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### Inserir Dados de Exemplo (Opcional)

```sql
-- Inserir categoria de exemplo
INSERT INTO categorias (nome) VALUES ('Bebidas'), ('Alimentos'), ('Limpeza');

-- Inserir fornecedor de exemplo
INSERT INTO fornecedores (nome, email, telefone) 
VALUES ('Fornecedor Exemplo', 'contato@exemplo.com', '11999999999');

-- Inserir produto de exemplo
INSERT INTO produtos (nome, estoque_atual, preco_venda, ativo, categoria_id)
VALUES (
  'Pizza Margherita', 
  10, 
  35.90, 
  true,
  (SELECT id FROM categorias WHERE nome = 'Alimentos' LIMIT 1)
);
```

## 4️⃣ Criar Usuário de Teste

1. No Supabase, vá em **Authentication** > **Users**
2. Clique em "Add user" > "Create new user"
3. Preencha:
   - Email: seu@email.com
   - Password: sua-senha-segura
   - Confirme o email automaticamente (toggle)

## 5️⃣ Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 6️⃣ Fazer Login

Use o email e senha que você criou no passo 4.

## ✅ Pronto!

Você deve ver:
- Dashboard com gráficos e KPIs
- Menu lateral com todas as seções
- Produtos listados (se inseriu dados de exemplo)

## 🔒 Próximos Passos (Segurança)

Para produção, configure Row Level Security (RLS):

```sql
-- Habilitar RLS nas tabelas
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque_movimentacoes ENABLE ROW LEVEL SECURITY;

-- Política básica (permite tudo para usuários autenticados)
CREATE POLICY "Usuários autenticados podem ver produtos"
  ON produtos FOR SELECT
  TO authenticated
  USING (true);

-- Repita para as outras operações (INSERT, UPDATE, DELETE) e tabelas
```

## 🆘 Problemas Comuns

### Erro: "Missing Supabase environment variables"
- Verifique se o arquivo `.env` existe
- Confirme que as variáveis estão corretas
- Reinicie o servidor de desenvolvimento

### Erro de conexão com Supabase
- Verifique se a URL está correta (não esqueça o `https://`)
- Verifique se a chave anon está completa
- Confirme que o projeto Supabase está ativo

### Login não funciona
- Verifique se criou o usuário no Supabase
- Confirme que o email foi verificado
- Tente resetar a senha

## 📚 Documentação Adicional

- [README.md](./README.md) - Documentação completa
- [SECURITY.md](./SECURITY.md) - Guia de segurança
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Detalhes técnicos

## 🤝 Suporte

Para dúvidas ou problemas, consulte a documentação do Supabase:
- [Documentação Oficial](https://supabase.com/docs)
- [Guia de RLS](https://supabase.com/docs/guides/auth/row-level-security)
