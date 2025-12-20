-- =============================================
-- DGUST ERP - EVOLUÇÃO DO MÓDULO DE PRODUTOS
-- Migration: 001 - Produtos Evolution
-- Data: 2025-12-20
-- =============================================

-- =============================================
-- PARTE 1: EXTENSÃO DA TABELA PRODUTOS
-- =============================================

-- Adicionar novos campos à tabela produtos (sem remover nada)
ALTER TABLE produtos 
  ADD COLUMN IF NOT EXISTS codigo_barras VARCHAR(50),
  ADD COLUMN IF NOT EXISTS preco_custo DECIMAL(10, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS fornecedor_id UUID,
  ADD COLUMN IF NOT EXISTS unidade_id VARCHAR(10) DEFAULT 'UN';

-- Renomear campos para padronização (se necessário)
-- preco_compra -> preco_custo já foi adicionado acima
-- unidade_medida -> unidade_id já foi adicionado acima

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_produtos_codigo_barras ON produtos(codigo_barras);
CREATE INDEX IF NOT EXISTS idx_produtos_fornecedor ON produtos(fornecedor_id);

-- =============================================
-- PARTE 2: TABELA DE FORNECEDORES
-- =============================================

CREATE TABLE IF NOT EXISTS fornecedores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  razao_social VARCHAR(255),
  cnpj VARCHAR(18),
  cpf VARCHAR(14),
  email VARCHAR(255),
  telefone VARCHAR(20),
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  observacoes TEXT,
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fornecedores_empresa ON fornecedores(empresa_id);
CREATE INDEX IF NOT EXISTS idx_fornecedores_cnpj ON fornecedores(cnpj);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_fornecedores_updated_at ON fornecedores;
CREATE TRIGGER update_fornecedores_updated_at BEFORE UPDATE ON fornecedores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS para fornecedores
ALTER TABLE fornecedores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON fornecedores
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- PARTE 3: TABELA DE QUALIDADE (ALIMENTOS)
-- =============================================

CREATE TABLE IF NOT EXISTS produtos_qualidade (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  validade DATE,
  lote VARCHAR(50),
  temperatura_min DECIMAL(5, 2),
  temperatura_max DECIMAL(5, 2),
  certificacoes TEXT[], -- Array de certificações (ISO, ANVISA, etc)
  alergenos TEXT[], -- Array de alérgenos
  composicao TEXT, -- Ingredientes / composição
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(produto_id) -- Um produto só pode ter um registro de qualidade
);

CREATE INDEX IF NOT EXISTS idx_produtos_qualidade_produto ON produtos_qualidade(produto_id);
CREATE INDEX IF NOT EXISTS idx_produtos_qualidade_validade ON produtos_qualidade(validade);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_produtos_qualidade_updated_at ON produtos_qualidade;
CREATE TRIGGER update_produtos_qualidade_updated_at BEFORE UPDATE ON produtos_qualidade
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS para produtos_qualidade
ALTER TABLE produtos_qualidade ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON produtos_qualidade
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- PARTE 4: TABELA FISCAL (NCM / IMPOSTOS)
-- =============================================

-- Tabela de NCM (Nomenclatura Comum do Mercosul)
CREATE TABLE IF NOT EXISTS ncm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo VARCHAR(8) NOT NULL UNIQUE, -- 8 dígitos
  descricao TEXT NOT NULL,
  aliquota_nacional DECIMAL(5, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ncm_codigo ON ncm(codigo);

-- RLS para ncm
ALTER TABLE ncm ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON ncm
  FOR ALL USING (auth.role() = 'authenticated');

-- Tabela de dados fiscais do produto
CREATE TABLE IF NOT EXISTS produtos_fiscal (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
  ncm_id UUID NOT NULL REFERENCES ncm(id),
  cfop VARCHAR(4), -- Código Fiscal de Operações
  icms DECIMAL(5, 2) DEFAULT 0, -- Percentual
  pis DECIMAL(5, 2) DEFAULT 0, -- Percentual
  cofins DECIMAL(5, 2) DEFAULT 0, -- Percentual
  ipi DECIMAL(5, 2) DEFAULT 0, -- Percentual
  origem VARCHAR(1) DEFAULT '0', -- 0=Nacional, 1=Estrangeira - Importação direta, etc
  cst_icms VARCHAR(3), -- Código de Situação Tributária ICMS
  cst_pis VARCHAR(2), -- Código de Situação Tributária PIS
  cst_cofins VARCHAR(2), -- Código de Situação Tributária COFINS
  cest VARCHAR(7), -- Código Especificador da Substituição Tributária
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(produto_id) -- Um produto só pode ter um registro fiscal
);

CREATE INDEX IF NOT EXISTS idx_produtos_fiscal_produto ON produtos_fiscal(produto_id);
CREATE INDEX IF NOT EXISTS idx_produtos_fiscal_ncm ON produtos_fiscal(ncm_id);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_produtos_fiscal_updated_at ON produtos_fiscal;
CREATE TRIGGER update_produtos_fiscal_updated_at BEFORE UPDATE ON produtos_fiscal
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS para produtos_fiscal
ALTER TABLE produtos_fiscal ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON produtos_fiscal
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- PARTE 5: TABELA DE LOTES (FIFO)
-- =============================================

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

CREATE INDEX IF NOT EXISTS idx_estoque_lotes_produto ON estoque_lotes(produto_id);
CREATE INDEX IF NOT EXISTS idx_estoque_lotes_lote ON estoque_lotes(lote);
CREATE INDEX IF NOT EXISTS idx_estoque_lotes_validade ON estoque_lotes(validade);
CREATE INDEX IF NOT EXISTS idx_estoque_lotes_status ON estoque_lotes(status);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_estoque_lotes_updated_at ON estoque_lotes;
CREATE TRIGGER update_estoque_lotes_updated_at BEFORE UPDATE ON estoque_lotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS para estoque_lotes
ALTER TABLE estoque_lotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all for authenticated users" ON estoque_lotes
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- PARTE 6: FUNÇÃO PARA ATUALIZAR STATUS DE LOTES VENCIDOS
-- =============================================

CREATE OR REPLACE FUNCTION atualizar_status_lotes_vencidos()
RETURNS void AS $$
BEGIN
  UPDATE estoque_lotes
  SET status = 'vencido'
  WHERE validade < CURRENT_DATE
    AND status = 'ativo';
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- PARTE 7: VIEW PARA PRODUTOS COM INFORMAÇÕES COMPLETAS
-- =============================================

CREATE OR REPLACE VIEW vw_produtos_completo AS
SELECT 
  p.id,
  p.codigo,
  p.nome,
  p.descricao,
  p.categoria_id,
  c.nome as categoria_nome,
  p.preco_custo,
  p.preco_venda,
  p.codigo_barras,
  p.estoque_minimo,
  p.estoque_atual,
  p.unidade_id,
  p.fornecedor_id,
  f.nome as fornecedor_nome,
  p.ativo,
  
  -- Status de estoque
  CASE 
    WHEN p.estoque_atual <= 0 THEN 'critico'
    WHEN p.estoque_atual <= p.estoque_minimo THEN 'baixo'
    ELSE 'ok'
  END as status_estoque,
  
  -- Informações de qualidade
  pq.validade,
  pq.lote,
  pq.temperatura_min,
  pq.temperatura_max,
  pq.certificacoes,
  
  -- Status de validade
  CASE 
    WHEN pq.validade IS NULL THEN NULL
    WHEN pq.validade < CURRENT_DATE THEN 'vencido'
    WHEN pq.validade <= CURRENT_DATE + INTERVAL '7 days' THEN 'vencendo_7d'
    WHEN pq.validade <= CURRENT_DATE + INTERVAL '30 days' THEN 'vencendo_30d'
    ELSE 'ok'
  END as status_validade,
  
  -- Informações fiscais
  pf.ncm_id,
  n.codigo as ncm_codigo,
  n.descricao as ncm_descricao,
  pf.cfop,
  pf.icms,
  pf.pis,
  pf.cofins,
  
  p.created_at,
  p.updated_at
FROM produtos p
LEFT JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN fornecedores f ON p.fornecedor_id = f.id
LEFT JOIN produtos_qualidade pq ON p.id = pq.produto_id
LEFT JOIN produtos_fiscal pf ON p.id = pf.produto_id
LEFT JOIN ncm n ON pf.ncm_id = n.id;

-- =============================================
-- PARTE 8: DADOS INICIAIS (NCM BÁSICOS)
-- =============================================

-- Inserir alguns NCMs básicos para alimentos
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
-- COMENTÁRIOS PARA DOCUMENTAÇÃO
-- =============================================

COMMENT ON TABLE produtos_qualidade IS 'Armazena informações de qualidade para produtos alimentícios (validade, lote, temperatura, certificações)';
COMMENT ON TABLE produtos_fiscal IS 'Armazena informações fiscais dos produtos (NCM, CFOP, impostos)';
COMMENT ON TABLE estoque_lotes IS 'Controle de lotes de estoque com FIFO (First In, First Out)';
COMMENT ON TABLE ncm IS 'Nomenclatura Comum do Mercosul - códigos de classificação fiscal';
COMMENT ON TABLE fornecedores IS 'Cadastro de fornecedores';

COMMENT ON COLUMN produtos.codigo_barras IS 'Código de barras EAN-13 ou similar';
COMMENT ON COLUMN produtos.estoque_minimo IS 'Quantidade mínima em estoque para alertas';
COMMENT ON COLUMN produtos_qualidade.validade IS 'Data de validade do produto (para alimentos perecíveis)';
COMMENT ON COLUMN produtos_qualidade.lote IS 'Número do lote de fabricação';
COMMENT ON COLUMN produtos_fiscal.ncm_id IS 'Referência para NCM (obrigatório para NF-e)';
COMMENT ON COLUMN produtos_fiscal.origem IS '0=Nacional, 1=Estrangeira - Importação direta, 2=Estrangeira - Adquirida no mercado interno';
COMMENT ON COLUMN estoque_lotes.status IS 'Status do lote: ativo, vencido ou bloqueado';

-- =============================================
-- FIM DA MIGRATION
-- =============================================

