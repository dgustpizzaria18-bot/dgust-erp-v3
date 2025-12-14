import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // LOGIN FAKE
    navigate("/dashboard");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>LOGIN D'GUST ERP</h1>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
