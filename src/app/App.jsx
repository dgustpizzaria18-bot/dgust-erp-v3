import { Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>D'GUST ERP</h1>
      <p>Projeto rodando com sucesso 🚀</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
