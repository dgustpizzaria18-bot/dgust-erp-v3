import { supabase } from "../services/supabaseClient";

export default function Dashboard() {
  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
