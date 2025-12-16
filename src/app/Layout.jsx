import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* MENU LATERAL */}
      <aside
        style={{
          width: "220px",
          background: "#111",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>D'GUST ERP</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <NavLink to="/dashboard" style={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/pedidos" style={linkStyle}>
            Pedidos
          </NavLink>

          <NavLink to="/clientes" style={linkStyle}>
            Clientes
          </NavLink>

          <NavLink to="/produtos" style={linkStyle}>
            Produtos
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "40px",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main style={{ flex: 1, padding: "30px" }}>
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#FFD700" : "#fff",
  textDecoration: "none",
  fontWeight: isActive ? "bold" : "normal",
});

