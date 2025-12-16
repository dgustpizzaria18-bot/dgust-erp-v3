import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <div>
      {/* TOPO */}
      <header
        style={{
          padding: "16px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>D'GUST ERP</strong>

        <button onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* CONTEÚDO */}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
