import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ to, label }) {
  return (
    <Link
      to={to}
      style={{
        display: "block",
        padding: "10px 0",
        color: "#333",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      {label}
    </Link>
  );
}
