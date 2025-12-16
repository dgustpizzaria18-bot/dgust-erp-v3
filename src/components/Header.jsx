import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="font-semibold">Painel Administrativo</h1>
      <button
        onClick={handleLogout}
        className="text-red-600 text-sm"
      >
        Sair
      </button>
    </header>
  );
}
