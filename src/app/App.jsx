import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function PrivateRoute({ children }) {
  const isAuth = localStorage.getItem("auth");

  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* rota padrão */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
