import React from "react";

export default function Relatorios() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Módulo de relatórios em desenvolvimento...</p>
        <p className="text-sm text-gray-400 mt-2">
          Este módulo permitirá gerar relatórios personalizados de vendas, estoque,
          financeiro e muito mais.
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Relatórios Disponíveis (em breve):</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Relatório de Vendas por Período</li>
              <li>Relatório de Estoque</li>
              <li>Relatório Financeiro</li>
              <li>Relatório de Produtos Mais Vendidos</li>
              <li>Relatório de Movimentação de Estoque</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
