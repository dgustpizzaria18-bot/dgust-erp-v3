import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("auth");
    navigate("/login");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p><strong>Usuário:</strong> Admin (fake)</p>

      <button onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
