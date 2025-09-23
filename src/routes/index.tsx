import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsDashboardPage from "../pages/ProductsDashboardPage";

export const privateRoutes = [
  { path: "/dashboard", element: <ProductsDashboardPage /> },
];

export const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
