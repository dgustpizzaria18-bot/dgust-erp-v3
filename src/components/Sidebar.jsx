import React from "react";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#f5f5f5",
        padding: 20,
      }}
    >
      <p>📊 Dashboard</p>
      <p>📦 Produtos</p>
      <p>🧾 Pedidos</p>
      <p>⚙️ Configurações</p>
    </aside>
  );
}
