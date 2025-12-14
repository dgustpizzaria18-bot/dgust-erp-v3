import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isAuth");
    navigate("/login");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>

      <p>Usuário autenticado (fake) ✅</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Sair
      </button>
    </div>
  );
}
