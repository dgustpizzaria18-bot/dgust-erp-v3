import { supabase } from "../services/supabaseClient";

export default function Dashboard() {
  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard - D'GUST ERP</h1>
      <p>Usuário autenticado com sucesso ✅</p>

      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
