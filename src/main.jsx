import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App";
import { AuthProvider } from "./app/AuthContext";
import { ToastProvider } from "./components/ToastNotifications";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ToastProvider />
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
