import React from "react";

export default function Pedidos() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Novo Pedido
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Módulo de pedidos em desenvolvimento...</p>
        <p className="text-sm text-gray-400 mt-2">
          Este módulo permitirá gerenciar todos os pedidos, desde a criação até a entrega,
          incluindo controle de status e integração com o estoque.
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-l-4 border-orange-500 pl-4">
            <p className="font-semibold">Funcionalidades (em breve):</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Criação e gestão de pedidos</li>
              <li>Status do pedido (Pendente, Em Produção, Entregue, etc.)</li>
              <li>Integração automática com estoque</li>
              <li>Histórico de pedidos por cliente</li>
              <li>Impressão de pedidos e notas</li>
              <li>Rastreamento de entregas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
