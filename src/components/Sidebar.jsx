import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white p-6">
      <h2 className="text-xl font-bold mb-8">D'GUST ERP</h2>

      <nav className="space-y-2">
        <MenuItem to="/dashboard">Dashboard</MenuItem>
        <MenuItem to="/produtos">Produtos</MenuItem>
        <MenuItem to="/clientes">Clientes</MenuItem>
        <MenuItem to="/pedidos">Pedidos</MenuItem>
      </nav>
    </aside>
  );
}

function MenuItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-md transition
        ${isActive ? "bg-zinc-700" : "hover:bg-zinc-800"}`
      }
    >
      {children}
    </NavLink>
  );
}
