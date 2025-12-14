import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuth");
    navigate("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Usuário autenticado (fake) ✅</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
