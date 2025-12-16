import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Header />

        <main style={{ padding: 24 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
