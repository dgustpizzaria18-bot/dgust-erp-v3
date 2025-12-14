import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
