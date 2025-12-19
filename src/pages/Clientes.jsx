import React from "react";

export default function Clientes() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Novo Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Módulo de clientes em desenvolvimento...</p>
        <p className="text-sm text-gray-400 mt-2">
          Este módulo permitirá gerenciar o cadastro de clientes, incluindo dados de contato,
          histórico de compras e análise de relacionamento.
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="font-semibold">Funcionalidades (em breve):</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Cadastro completo de clientes (pessoa física e jurídica)</li>
              <li>Histórico de compras</li>
              <li>Análise de comportamento</li>
              <li>Gestão de crédito</li>
              <li>Segmentação de clientes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
