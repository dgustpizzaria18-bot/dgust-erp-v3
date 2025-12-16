import React from "react";

export default function Login({ onLogin }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>LOGIN D'GUST ERP</h1>
      <button onClick={onLogin}>Entrar</button>
    </div>
  );
}
