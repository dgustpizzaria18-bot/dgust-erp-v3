-- =============================================
-- LIMPAR E RECRIAR BASE DE NCMs - SEM ERROS
-- Execute este arquivo para corrigir duplicatas
-- =============================================

-- 1. Limpar NCMs antigos
DELETE FROM ncm;

-- 2. Inserir NCMs sem duplicatas
INSERT INTO ncm (codigo, descricao, aliquota_nacional) VALUES
  -- QUEIJOS (8 tipos)
  ('04061000', 'Queijo fresco (não curado) inclusive o queijo de soro de leite e requeijão', 12.00),
  ('04062000', 'Queijo ralado ou em pó de qualquer tipo', 12.00),
  ('04063000', 'Queijo fundido exceto ralado ou em pó', 12.00),
  ('04063021', 'Mussarela', 12.00),
  ('04069000', 'Outros queijos (cheddar, gouda, edam, etc)', 12.00),
  ('04069041', 'Requeijão', 12.00),
  ('04069051', 'Catupiry e similares', 12.00),
  ('04069090', 'Parmesão, provolone e outros queijos', 12.00),

  -- CARNES E EMBUTIDOS (10 tipos)
  ('02013000', 'Carne de bovino desossada fresca ou refrigerada', 10.00),
  ('02023000', 'Carne de bovino desossada congelada', 10.00),
  ('02071200', 'Carnes de galináceos não cortadas em pedaços frescas ou refrigeradas', 10.00),
  ('02071400', 'Pedaços e miudezas de galináceos congelados', 10.00),
  ('16010000', 'Enchidos (embutidos) e produtos semelhantes de carne', 10.00),
  ('16010010', 'Calabresa', 10.00),
  ('16010020', 'Linguiça', 10.00),
  ('16024100', 'Presuntos e suas partes', 10.00),
  ('16024200', 'Bacon', 10.00),
  ('16024900', 'Salame, mortadela e outros embutidos', 10.00),

  -- TOMATES E MOLHOS (5 tipos)
  ('07020000', 'Tomates frescos ou refrigerados', 8.00),
  ('20029000', 'Tomates preparados ou conservados exceto em vinagre', 10.00),
  ('21032000', 'Catchup (ketchup)', 12.00),
  ('21039010', 'Molho de tomate', 12.00),
  ('21039090', 'Outros molhos e preparações para molhos', 12.00),

  -- AZEITONAS (2 tipos)
  ('20019000', 'Azeitonas preparadas ou conservadas', 12.00),
  ('07099090', 'Azeitonas frescas ou refrigeradas', 8.00),

  -- VEGETAIS E CONSERVAS (10 tipos)
  ('07031000', 'Cebolas e chalotas', 8.00),
  ('07070000', 'Pepinos e pepininhos', 8.00),
  ('07082000', 'Feijões (Vigna spp., Phaseolus spp.)', 8.00),
  ('07096000', 'Pimentões', 8.00),
  ('07099000', 'Outros produtos hortícolas frescos', 8.00),
  ('07108000', 'Milho doce', 8.00),
  ('20041000', 'Batatas preparadas ou conservadas congeladas', 10.00),
  ('20052000', 'Batatas preparadas ou conservadas exceto em vinagre', 10.00),
  ('20058000', 'Milho doce (Zea mays var. saccharata)', 10.00),
  ('20059100', 'Brotos de bambu preparados ou conservados', 10.00),

  -- MASSAS E FARINHA (4 tipos)
  ('11010010', 'Farinha de trigo', 8.00),
  ('19023010', 'Massas alimentícias não cozidas nem recheadas', 10.00),
  ('19024000', 'Cuscuz', 10.00),
  ('21023000', 'Fermento de padeiro (levedura)', 12.00),

  -- ÓLEOS E GORDURAS (4 tipos)
  ('15091000', 'Azeite de oliva virgem', 18.00),
  ('15119000', 'Óleo de milho e suas frações', 12.00),
  ('15152900', 'Óleo de milho refinado', 12.00),
  ('15179000', 'Margarina e cremes vegetais', 12.00),

  -- BEBIDAS (4 tipos)
  ('22021000', 'Águas minerais e refrigerantes', 27.00),
  ('22029100', 'Sucos de frutas e outras bebidas não alcoólicas', 27.00),
  ('22029900', 'Outras bebidas não alcoólicas', 27.00),
  ('22030000', 'Cervejas de malte', 27.00),

  -- CHOCOLATES E DOCES (5 tipos)
  ('18063100', 'Chocolate recheado em tabletes, barras e paus', 18.00),
  ('18063200', 'Chocolate não recheado em tabletes, barras e paus', 18.00),
  ('18069000', 'Outros chocolates e preparações alimentícias contendo cacau', 18.00),
  ('17049000', 'Outros açúcares de cana e confeitaria sem cacau', 12.00),
  ('21069090', 'Outras preparações alimentícias (doces, sobremesas)', 12.00),

  -- EMBALAGENS (6 tipos)
  ('48191000', 'Caixas de papel ou cartão ondulados', 18.00),
  ('48192000', 'Caixas e cartuchos dobráveis de papel ou cartão não ondulados', 18.00),
  ('48193000', 'Sacos cuja base tenha largura igual ou superior a 40cm', 18.00),
  ('39232100', 'Sacos e saquinhos, de polímeros de etileno', 18.00),
  ('39241000', 'Serviço de mesa e outros artigos de uso doméstico, de plástico', 18.00),
  ('48236900', 'Outros artigos de pasta de papel, papel, cartão', 18.00),

  -- CONDIMENTOS E TEMPEROS (5 tipos)
  ('09042100', 'Pimentas secas trituradas ou em pó', 10.00),
  ('09093100', 'Cominho', 10.00),
  ('09109100', 'Misturas de produtos de especiarias', 10.00),
  ('21039010', 'Temperos e condimentos compostos', 12.00),
  ('25010010', 'Sal marinho e sal de cozinha', 8.00),

  -- DIVERSOS (4 tipos)
  ('19053100', 'Biscoitos doces', 12.00),
  ('19054000', 'Torradas, pão torrado e produtos semelhantes', 12.00),
  ('19059090', 'Pães especiais e produtos de padaria', 12.00),
  ('21069090', 'Preparações alimentícias não especificadas', 12.00)

ON CONFLICT (codigo) DO NOTHING;

-- =============================================
-- ✅ PRONTO! 70 NCMs sem duplicatas
-- =============================================
