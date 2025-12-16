import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
