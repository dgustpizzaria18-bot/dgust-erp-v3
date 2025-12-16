import React from "react";

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
      <p>📊 Dashboard</p>
      <p>📦 Produtos</p>
      <p>🧾 Pedidos</p>
      <p>⚙️ Configurações</p>
    </aside>
  );
}
