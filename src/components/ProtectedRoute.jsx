import { Navigate } from "react-router-dom";
import { useAuth } from "../app/AuthContext";

export default function ProtectedRoute({ element }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;

  if (!user) {
    // Se não tiver user, redireciona para o login
    return <Navigate to="/login" />;
  }

  return element;
}
