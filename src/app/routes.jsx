import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ROTA INICIAL */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD (sem proteção por enquanto) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
