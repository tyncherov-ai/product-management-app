import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { privateRoutes, publicRoutes } from "./index";

export default function AppRouter() {
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  return isAuthenticated ? (
    <Routes>
      {privateRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((r) => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
