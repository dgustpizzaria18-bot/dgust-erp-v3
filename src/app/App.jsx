import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import React, { useState } from "react";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function App() {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("logged") === "true"
  );

  function handleLogin() {
    localStorage.setItem("logged", "true");
    setIsLogged(true);
  }

  function handleLogout() {
    localStorage.removeItem("logged");
    setIsLogged(false);
  }

  return isLogged ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
