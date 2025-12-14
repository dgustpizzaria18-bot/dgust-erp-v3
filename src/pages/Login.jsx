import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>D’GUST ERP</h1>
      <button onClick={() => navigate("/")}>Entrar</button>
    </div>
  );
}
