import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <span className="font-semibold">Painel Administrativo</span>

      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Sair
      </button>
    </header>
  );
}
