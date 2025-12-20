-- =============================================
-- ATUALIZAÇÃO: QUALIDADE - TIPO DE ARMAZENAMENTO
-- Substitui temperatura_min/max por tipo_armazenamento
-- =============================================

-- 1. Adicionar coluna tipo_armazenamento
ALTER TABLE produtos_qualidade 
  ADD COLUMN IF NOT EXISTS tipo_armazenamento VARCHAR(20) DEFAULT 'ambiente'
  CHECK (tipo_armazenamento IN ('ambiente', 'refrigerado', 'congelado'));

-- 2. Migrar dados existentes (se houver)
-- Se tinha temperatura_min negativa -> congelado
-- Se tinha temperatura_max <= 10 -> refrigerado
-- Caso contrário -> ambiente
UPDATE produtos_qualidade
SET tipo_armazenamento = CASE
  WHEN temperatura_min < 0 OR temperatura_max < 0 THEN 'congelado'
  WHEN temperatura_max <= 10 THEN 'refrigerado'
  ELSE 'ambiente'
END
WHERE tipo_armazenamento IS NULL;

-- 3. (Opcional) Remover colunas antigas após confirmar migração
-- Descomente apenas após testar e confirmar que tudo funciona
-- ALTER TABLE produtos_qualidade DROP COLUMN IF EXISTS temperatura_min;
-- ALTER TABLE produtos_qualidade DROP COLUMN IF EXISTS temperatura_max;

-- =============================================
-- ✅ PRONTO! tipo_armazenamento implementado
-- =============================================

-- OBSERVAÇÕES:
-- - As colunas antigas (temperatura_min/max) não serão removidas automaticamente
-- - Isso garante rollback se necessário
-- - Após confirmar que tudo funciona, execute os comandos DROP acima
