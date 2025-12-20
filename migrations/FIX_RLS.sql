-- =============================================
-- CORREÇÃO DAS POLÍTICAS RLS
-- Copie e cole no SQL Editor do Supabase
-- =============================================

-- Remover políticas antigas que podem estar conflitando
DROP POLICY IF EXISTS "Allow all for authenticated users" ON fornecedores;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON produtos_qualidade;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON ncm;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON produtos_fiscal;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON estoque_lotes;

-- Criar políticas corretas (uma para cada operação)
-- FORNECEDORES
CREATE POLICY "fornecedores_select" ON fornecedores FOR SELECT USING (true);
CREATE POLICY "fornecedores_insert" ON fornecedores FOR INSERT WITH CHECK (true);
CREATE POLICY "fornecedores_update" ON fornecedores FOR UPDATE USING (true);
CREATE POLICY "fornecedores_delete" ON fornecedores FOR DELETE USING (true);

-- PRODUTOS_QUALIDADE
CREATE POLICY "produtos_qualidade_select" ON produtos_qualidade FOR SELECT USING (true);
CREATE POLICY "produtos_qualidade_insert" ON produtos_qualidade FOR INSERT WITH CHECK (true);
CREATE POLICY "produtos_qualidade_update" ON produtos_qualidade FOR UPDATE USING (true);
CREATE POLICY "produtos_qualidade_delete" ON produtos_qualidade FOR DELETE USING (true);

-- NCM
CREATE POLICY "ncm_select" ON ncm FOR SELECT USING (true);
CREATE POLICY "ncm_insert" ON ncm FOR INSERT WITH CHECK (true);
CREATE POLICY "ncm_update" ON ncm FOR UPDATE USING (true);
CREATE POLICY "ncm_delete" ON ncm FOR DELETE USING (true);

-- PRODUTOS_FISCAL
CREATE POLICY "produtos_fiscal_select" ON produtos_fiscal FOR SELECT USING (true);
CREATE POLICY "produtos_fiscal_insert" ON produtos_fiscal FOR INSERT WITH CHECK (true);
CREATE POLICY "produtos_fiscal_update" ON produtos_fiscal FOR UPDATE USING (true);
CREATE POLICY "produtos_fiscal_delete" ON produtos_fiscal FOR DELETE USING (true);

-- ESTOQUE_LOTES
CREATE POLICY "estoque_lotes_select" ON estoque_lotes FOR SELECT USING (true);
CREATE POLICY "estoque_lotes_insert" ON estoque_lotes FOR INSERT WITH CHECK (true);
CREATE POLICY "estoque_lotes_update" ON estoque_lotes FOR UPDATE USING (true);
CREATE POLICY "estoque_lotes_delete" ON estoque_lotes FOR DELETE USING (true);

-- =============================================
-- PRONTO! Recarregue o navegador
-- =============================================
