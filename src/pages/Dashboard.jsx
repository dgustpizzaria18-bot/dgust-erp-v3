export default function Dashboard({ onLogout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
}
