import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Produtos from "../pages/Produtos";
import Clientes from "../pages/Clientes";
import Pedidos from "../pages/Pedidos";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "produtos", element: <Produtos /> },
          { path: "clientes", element: <Clientes /> },
          { path: "pedidos", element: <Pedidos /> },
        ],
      },
    ],
  },
];

export default routes;
