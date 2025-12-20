-- =============================================
-- APLICAR AGORA NO SUPABASE - SQL EDITOR
-- Copie e cole este código inteiro
-- =============================================

-- 1. Adicionar campos novos na tabela produtos
ALTER TABLE produtos 
  ADD COLUMN IF NOT EXISTS codigo_barras VARCHAR(50),
  ADD COLUMN IF NOT EXISTS preco_custo DECIMAL(10, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fornecedor_id UUID,
  ADD COLUMN IF NOT EXISTS unidade_id VARCHAR(10) DEFAULT 'UN';

-- 2. Criar índices
CREATE INDEX IF NOT EXISTS idx_produtos_codigo_barras ON produtos(codigo_barras);
CREATE INDEX IF NOT EXISTS idx_produtos_fornecedor ON produtos(fornecedor_id);

-- 3. Tabela de fornecedores
CREATE TABLE IF NOT EXISTS fornecedores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  razao_social VARCHAR(255),
  cnpj VARCHAR(18),
  email VARCHAR(255),
  telefone VARCHAR(20),
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de qualidade
CREATE TABLE IF NOT EXISTS produtos_qualidade (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  validade DATE,
  lote VARCHAR(50),
  temperatura_min DECIMAL(5, 2),
  temperatura_max DECIMAL(5, 2),
  certificacoes TEXT[],
  alergenos TEXT[],
  composicao TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(produto_id)
);

-- 5. Tabela NCM
CREATE TABLE IF NOT EXISTS ncm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(8) NOT NULL UNIQUE,
  descricao TEXT NOT NULL,
  aliquota_nacional DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela de dados fiscais
CREATE TABLE IF NOT EXISTS produtos_fiscal (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  ncm_id UUID NOT NULL REFERENCES ncm(id),
  cfop VARCHAR(4),
  icms DECIMAL(5, 2) DEFAULT 0,
  pis DECIMAL(5, 2) DEFAULT 0,
  cofins DECIMAL(5, 2) DEFAULT 0,
  ipi DECIMAL(5, 2) DEFAULT 0,
  origem VARCHAR(1) DEFAULT '0',
  cst_icms VARCHAR(3),
  cst_pis VARCHAR(2),
  cst_cofins VARCHAR(2),
  cest VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(produto_id)
);

-- 7. Tabela de lotes
CREATE TABLE IF NOT EXISTS estoque_lotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  lote VARCHAR(50) NOT NULL,
  validade DATE,
  quantidade INTEGER NOT NULL DEFAULT 0,
  quantidade_inicial INTEGER NOT NULL,
  preco_custo DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'vencido', 'bloqueado')),
  movimentacao_id UUID REFERENCES estoque_movimentacoes(id),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. RLS (Row Level Security)
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos_qualidade ENABLE ROW LEVEL SECURITY;
ALTER TABLE ncm ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos_fiscal ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque_lotes ENABLE ROW LEVEL SECURITY;

-- 9. Políticas permissivas (desenvolvimento)
CREATE POLICY "Allow all for authenticated users" ON fornecedores FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON produtos_qualidade FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON ncm FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON produtos_fiscal FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON estoque_lotes FOR ALL USING (auth.role() = 'authenticated');

-- 10. Dados iniciais de NCM
INSERT INTO ncm (codigo, descricao, aliquota_nacional) VALUES
  ('21069090', 'Outras preparações alimentícias não especificadas', 10.00),
  ('19059090', 'Produtos de padaria, pastelaria e da indústria de bolachas', 12.00),
  ('04063021', 'Mussarela', 12.00),
  ('02023000', 'Carnes de bovinos, desossadas, congeladas', 10.00),
  ('07020000', 'Tomates frescos ou refrigerados', 8.00),
  ('04069000', 'Outros queijos', 12.00),
  ('19023010', 'Massas alimentícias não cozidas', 10.00)
ON CONFLICT (codigo) DO NOTHING;

-- =============================================
-- PRONTO! Agora volte ao navegador e recarregue
-- =============================================
