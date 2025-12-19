import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-8">D3</h2>

      <nav className="space-y-6">
        {/* Dashboard */}
        <Section title="Principal">
          <Item to="/dashboard">📊 Dashboard</Item>
        </Section>

        {/* Cadastros */}
        <Section title="Cadastros">
          <Item to="/produtos">📦 Produtos</Item>
          <Item to="/clientes">👥 Clientes</Item>
        </Section>

        {/* Estoque */}
        <Section title="Estoque">
          <Item to="/estoque">📋 Controle</Item>
          <Item to="/estoque/movimentacoes">🔄 Movimentações</Item>
        </Section>

        {/* Vendas */}
        <Section title="Vendas">
          <Item to="/pedidos">🛒 Pedidos</Item>
          <Item to="/vendas">💰 Vendas</Item>
        </Section>

        {/* Financeiro */}
        <Section title="Financeiro">
          <Item to="/contas-receber">📈 Contas a Receber</Item>
          <Item to="/contas-pagar">📉 Contas a Pagar</Item>
        </Section>

        {/* Relatórios */}
        <Section title="Relatórios">
          <Item to="/relatorios">📄 Relatórios</Item>
          <Item to="/auditoria">🔍 Auditoria</Item>
        </Section>

        {/* Configurações */}
        <Section title="Configurações">
          <Item to="/empresa">🏢 Empresa</Item>
          <Item to="/usuarios">👤 Usuários</Item>
        </Section>
      </nav>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-4">
        {title}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Item({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded text-sm ${
          isActive ? "bg-zinc-700" : "hover:bg-zinc-800"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
