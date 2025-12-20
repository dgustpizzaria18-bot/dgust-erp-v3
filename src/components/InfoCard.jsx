import React from "react";

/**
 * COMPONENTE: Card de Informação
 * Exibe informações em formato de card compacto
 */

export default function InfoCard({ label, value, icon, color = "blue", sublabel = null }) {
  const cores = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    green: "bg-green-50 border-green-200 text-green-900",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-900",
    red: "bg-red-50 border-red-200 text-red-900",
    gray: "bg-gray-50 border-gray-200 text-gray-900",
  };

  return (
    <div className={`border rounded-lg p-4 ${cores[color] || cores.blue}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium opacity-75 mb-1">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
          {sublabel && <p className="text-xs opacity-75 mt-1">{sublabel}</p>}
        </div>
        {icon && <div className="text-3xl opacity-50 ml-3">{icon}</div>}
      </div>
    </div>
  );
}
