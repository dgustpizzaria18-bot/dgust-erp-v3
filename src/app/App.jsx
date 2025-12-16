import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* DASHBOARD PROTEGIDO */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ROTA PADRÃO */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

