import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header
      style={{
        height: 60,
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <strong>Painel</strong>

      <button onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
}
