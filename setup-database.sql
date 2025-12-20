-- Execute este SQL no Supabase SQL Editor
-- IMPORTANTE: Copie e cole TUDO de uma vez

-- 1. Criar tabelas básicas primeiro
CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  empresa_id UUID REFERENCES empresas(id),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL,
  empresa_id UUID REFERENCES empresas(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  preco_venda DECIMAL(10, 2) NOT NULL,
  estoque_atual INTEGER DEFAULT 0,
  empresa_id UUID REFERENCES empresas(id),
  categoria_id UUID REFERENCES categorias(id),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Desabilitar RLS temporariamente para desenvolvimento
ALTER TABLE empresas DISABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE clientes DISABLE ROW LEVEL SECURITY;
ALTER TABLE categorias DISABLE ROW LEVEL SECURITY;
ALTER TABLE produtos DISABLE ROW LEVEL SECURITY;

-- 3. Inserir empresa padrão
INSERT INTO empresas (nome, email) 
VALUES ('D''Gust Pizzaria', 'contato@dgust.com.br')
ON CONFLICT DO NOTHING;

-- 4. Inserir usuário na tabela usuarios (vincular com auth)
-- Execute DEPOIS de fazer login pela primeira vez
-- Substitua 'SEU_AUTH_USER_ID' pelo ID do usuário em Authentication
-- INSERT INTO usuarios (auth_user_id, nome, email, empresa_id)
-- SELECT 'SEU_AUTH_USER_ID', 'Admin', 'dgustpizzaria18@gmail.com', id
-- FROM empresas LIMIT 1;
