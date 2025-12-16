import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    localStorage.setItem("auth", "true");
    navigate("/dashboard");
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>D’GUST ERP</h1>
        <p style={styles.subtitle}>Acesso ao sistema</p>

        <button style={styles.button} onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f4f7",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "5px",
    fontSize: "26px",
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#555",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
