import React from "react";

export default function Auditoria() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Auditoria</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Módulo de auditoria em desenvolvimento...</p>
        <p className="text-sm text-gray-400 mt-2">
          Este módulo permitirá rastrear todas as ações realizadas no sistema,
          incluindo alterações de dados, acessos e operações críticas.
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-l-4 border-yellow-500 pl-4">
            <p className="font-semibold">Recursos de Auditoria (em breve):</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Log de alterações em produtos</li>
              <li>Log de movimentações de estoque</li>
              <li>Log de vendas e pedidos</li>
              <li>Log de acessos ao sistema</li>
              <li>Histórico de alterações por usuário</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
