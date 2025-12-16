import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
