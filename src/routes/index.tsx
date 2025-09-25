import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsDashboardPage from "../pages/ProductsDashboardPage";
import ProductDetailPage from "../pages/ProductDetailPage";

export const privateRoutes = [
  { path: "/dashboard", element: <ProductsDashboardPage /> },
  { path: "/products/:productId", element: <ProductDetailPage /> },
];

export const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
