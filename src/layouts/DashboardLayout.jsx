import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        <Sidebar />
        <main style={{ padding: 20, flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
