import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsAuth(auth === "true");
  }, []);

  if (isAuth === null) return null; // evita flicker

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onLogin={() => {
                  localStorage.setItem("auth", "true");
                  setIsAuth(true);
                }}
              />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            isAuth ? (
              <Dashboard
                onLogout={() => {
                  localStorage.removeItem("auth");
                  setIsAuth(false);
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to={isAuth ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

