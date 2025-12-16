import React from "react";

export default function Dashboard({ onLogout }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <button onClick={onLogout} style={{ marginTop: 20 }}>
        Sair
      </button>
    </div>
  );
}
