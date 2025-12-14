import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>D´GUST ERP</h1>
      <p>Tela de Login</p>

      <button onClick={() => navigate("/dashboard")}>
        Entrar
      </button>
    </div>
  );
}
