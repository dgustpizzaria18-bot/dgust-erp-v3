import React from "react";

export default function Usuarios() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Gestão de Usuários</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Módulo de gestão de usuários em desenvolvimento...</p>
        <p className="text-sm text-gray-400 mt-2">
          Este módulo permitirá gerenciar usuários do sistema, incluindo permissões,
          perfis de acesso e controle de segurança via RLS (Row Level Security).
        </p>
        <div className="mt-4 space-y-2">
          <div className="border-l-4 border-purple-500 pl-4">
            <p className="font-semibold">Recursos de Segurança (em breve):</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
              <li>Cadastro de usuários</li>
              <li>Perfis de acesso (Admin, Gerente, Operador)</li>
              <li>Permissões granulares por módulo</li>
              <li>Row Level Security (RLS) via Supabase</li>
              <li>Log de atividades por usuário</li>
              <li>Autenticação de dois fatores (2FA)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
