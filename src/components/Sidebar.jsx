import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 220,
        background: "#111",
        color: "#fff",
        padding: 20,
      }}
    >
      <h3>D'GUST ERP</h3>

      <nav style={{ marginTop: 30 }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/dashboard" style={link}>Dashboard</Link></li>
          <li><Link to="/produtos" style={link}>Produtos</Link></li>
          <li><Link to="/clientes" style={link}>Clientes</Link></li>
          <li><Link to="/pedidos" style={link}>Pedidos</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

const link = {
  display: "block",
  padding: "10px 0",
  color: "#fff",
  textDecoration: "none",
};
