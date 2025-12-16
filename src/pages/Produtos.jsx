import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  listarProdutos,
  toggleProduto,
} from "../services/produtosService";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProdutos() {
    const data = await listarProdutos();
    setProdutos(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProdutos();
  }, []);

  async function handleToggle(produto) {
    await toggleProduto(produto.id, !produto.ativo);
    loadProdutos();
  }

  if (loading) {
    return (
      <DashboardLayout>
        <p>Carregando produtos...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">
        Produtos
      </h2>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Produto</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Estoque</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.nome}</td>
              <td className="p-3">
                {p.categorias?.nome ?? "-"}
              </td>
              <td className="p-3">{p.estoque_atual}</td>
              <td className="p-3">
                R$ {p.preco_venda?.toFixed(2)}
              </td>
              <td className="p-3">
                {p.ativo ? "Ativo" : "Inativo"}
              </td>
              <td className="p-3">
                <button
                  className="text-sm text-blue-600"
                  onClick={() => handleToggle(p)}
                >
                  {p.ativo ? "Desativar" : "Ativar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}
