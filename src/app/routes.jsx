import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Produtos from "../pages/Produtos";
import Clientes from "../pages/Clientes";
import Pedidos from "../pages/Pedidos";
import Estoque from "../pages/Estoque";
import EstoqueMovimentacoes from "../pages/EstoqueMovimentacoes";
import Vendas from "../pages/Vendas";
import ContasReceber from "../pages/ContasReceber";
import ContasPagar from "../pages/ContasPagar";
import Relatorios from "../pages/Relatorios";
import Auditoria from "../pages/Auditoria";
import Empresa from "../pages/Empresa";
import Usuarios from "../pages/Usuarios";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/estoque/movimentacoes" element={<EstoqueMovimentacoes />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/contas-receber" element={<ContasReceber />} />
          <Route path="/contas-pagar" element={<ContasPagar />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/auditoria" element={<Auditoria />} />
          <Route path="/empresa" element={<Empresa />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
