import React from "react";

export default function Empresa() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Configurações da Empresa</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Configurações de empresa em desenvolvimento...</p>
        <p className="text-sm text-gray-400 mt-2">
          Este módulo permitirá gerenciar as informações da empresa, incluindo dados cadastrais,
          configurações fiscais e parâmetros do sistema.
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-l-4 border-green-500 pl-4">
            <p className="font-semibold">Funcionalidades (em breve):</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Dados cadastrais da empresa</li>
              <li>Configurações fiscais</li>
              <li>Logotipo e identidade visual</li>
              <li>Parâmetros do sistema</li>
              <li>Multiempresa - gestão de múltiplas empresas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
