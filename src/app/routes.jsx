import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* rota pública */}
      <Route path="/login" element={<Login />} />

      {/* rota temporária protegida SEM auth */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* redirect padrão */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
