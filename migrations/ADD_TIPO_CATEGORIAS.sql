-- =============================================
-- MIGRATION: Atualizar constraints da tabela categorias
-- Data: 20/12/2025
-- =============================================

-- Atualizar categorias existentes com tipo padrão
UPDATE categorias 
SET tipo = 'produtos_finais' 
WHERE tipo IS NULL;

-- Adicionar constraint de valores válidos
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'categorias_tipo_check') THEN
        ALTER TABLE categorias 
        ADD CONSTRAINT categorias_tipo_check 
        CHECK (tipo IN ('ingredientes','bebidas','embalagens','limpeza','descartaveis','equipamentos','produtos_finais'));
    END IF;
END $$;

-- Adicionar índice
CREATE INDEX IF NOT EXISTS idx_categorias_tipo ON categorias(tipo);

-- Adicionar constraint de unicidade
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'categorias_empresa_nome_unique') THEN
        ALTER TABLE categorias 
        ADD CONSTRAINT categorias_empresa_nome_unique 
        UNIQUE (empresa_id, nome);
    END IF;
END $$;

-- =============================================
-- ✅ MIGRATION CONCLUÍDA
-- =============================================

-- ROLLBACK (se necessário):
-- ALTER TABLE categorias DROP CONSTRAINT IF EXISTS categorias_tipo_check;
-- ALTER TABLE categorias DROP CONSTRAINT IF EXISTS categorias_empresa_nome_unique;
-- DROP INDEX IF EXISTS idx_categorias_tipo;
-- ALTER TABLE categorias DROP COLUMN IF EXISTS tipo;
