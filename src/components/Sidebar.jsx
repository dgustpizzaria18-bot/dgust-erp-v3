import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#f3f4f6",
        padding: 20,
        borderRight: "1px solid #e5e7eb",
      }}
    >
      <p><Link to="/dashboard">📊 Dashboard</Link></p>
      <p><Link to="/produtos">📦 Produtos</Link></p>
      <p><Link to="/pedidos">🧾 Pedidos</Link></p>
    </aside>
  );
}
