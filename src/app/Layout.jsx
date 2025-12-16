import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <div style={styles.container}>
      {/* MENU */}
      <aside style={styles.sidebar}>
        <div>
          <h2 style={styles.logo}>D’GUST ERP</h2>

          <nav style={styles.nav}>
            <NavLink to="/dashboard" style={navLink}>
              📊 Dashboard
            </NavLink>

            <NavLink to="/pedidos" style={navLink}>
              🧾 Pedidos
            </NavLink>

            <NavLink to="/clientes" style={navLink}>
              👥 Clientes
            </NavLink>

            <NavLink to="/produtos" style={navLink}>
              🍕 Produtos
            </NavLink>
          </nav>
        </div>

        <button onClick={handleLogout} style={styles.logout}>
          🚪 Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

const navLink = ({ isActive }) => ({
  padding: "12px 16px",
  borderRadius: "6px",
  color: isActive ? "#111" : "#fff",
  background: isActive ? "#FFD700" : "transparent",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "0.2s",
});

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  sidebar: {
    width: "240px",
    background: "#0f0f0f",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
  },

  logo: {
    marginBottom: "30px",
    textAlign: "center",
    letterSpacing: "1px",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  content: {
    flex: 1,
    background: "#f5f5f5",
    padding: "30px",
  },

  logout: {
    background: "#e53935

