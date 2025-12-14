import React from "react";
import MenuItem from "./MenuItem";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#f4f6f8",
        padding: 20,
        borderRight: "1px solid #ddd",
      }}
    >
      <MenuItem to="/dashboard" label="📊 Dashboard" />
      <MenuItem to="/produtos" label="📦 Produtos" />
      <MenuItem to="/pedidos" label="🧾 Pedidos" />
    </aside>
  );
}
