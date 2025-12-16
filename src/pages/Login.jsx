import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>LOGIN D'GUST ERP</h1>

      <button onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}
