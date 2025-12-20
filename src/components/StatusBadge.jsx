import React from "react";

/**
 * COMPONENTE: Badge de Status
 * Exibe badges coloridos para diferentes tipos de status
 */

export function StatusBadge({ status, label }) {
  const cores = {
    green: "bg-green-100 text-green-800 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    red: "bg-red-100 text-red-800 border-red-200",
    gray: "bg-gray-100 text-gray-800 border-gray-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        cores[status] || cores.gray
      }`}
    >
      {label}
    </span>
  );
}

export function StatusEstoqueBadge({ estoqueAtual, estoqueMinimo }) {
  if (estoqueAtual <= 0) {
    return <StatusBadge status="red" label="⚠️ Crítico" />;
  }
  if (estoqueAtual <= estoqueMinimo) {
    return <StatusBadge status="yellow" label="Baixo" />;
  }
  return <StatusBadge status="green" label="Normal" />;
}

export function StatusValidadeBadge({ dataValidade }) {
  if (!dataValidade) return null;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const validade = new Date(dataValidade);
  validade.setHours(0, 0, 0, 0);
  const diffDias = Math.ceil((validade - hoje) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) {
    return <StatusBadge status="red" label={`⚠️ Vencido há ${Math.abs(diffDias)}d`} />;
  }
  if (diffDias <= 7) {
    return <StatusBadge status="red" label={`Vence em ${diffDias}d`} />;
  }
  if (diffDias <= 30) {
    return <StatusBadge status="yellow" label={`Vence em ${diffDias}d`} />;
  }
  return <StatusBadge status="green" label="Validade OK" />;
}

export function StatusLoteBadge({ status }) {
  const labels = {
    ativo: { label: "Ativo", cor: "green" },
    vencido: { label: "Vencido", cor: "red" },
    bloqueado: { label: "Bloqueado", cor: "gray" },
  };

  const config = labels[status] || labels.ativo;
  return <StatusBadge status={config.cor} label={config.label} />;
}
