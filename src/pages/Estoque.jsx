import React, { useEffect, useState } from "react";
import { listarProdutos } from "../services/produtosService";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProdutos();
  }, []);

  async function loadProdutos() {
    try {
      setLoading(true);
      const data = await listarProdutos();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar estoque:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Carregando estoque...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Controle de Estoque</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Estoque Atual
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {produtos.map((produto) => (
              <tr key={produto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{produto.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`${
                      produto.estoque_atual <= 5
                        ? "text-red-600 font-semibold"
                        : produto.estoque_atual <= 10
                        ? "text-yellow-600 font-semibold"
                        : "text-green-600"
                    }`}
                  >
                    {produto.estoque_atual} unidades
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {produto.estoque_atual <= 5 ? (
                    <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">
                      Estoque Baixo
                    </span>
                  ) : produto.estoque_atual <= 10 ? (
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                      Atenção
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                      Normal
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {produtos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum produto cadastrado
          </div>
        )}
      </div>
    </div>
  );
}
