import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";

export default function App() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
