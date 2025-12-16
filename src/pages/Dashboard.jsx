import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao sistema D'GUST ERP.</p>

      <button
        onClick={handleLogout}
        style={{ marginTop: 20 }}
      >
        Sair
      </button>
    </DashboardLayout>
  );
}
