import { Link } from "react-router-dom";

export const Breadcrumbs: React.FC<{ productName?: string }> = ({
  productName,
}) => (
  <nav className="text-sm text-gray-500 mb-8">
    <Link to="/dashboard" className="hover:underline">
      Dashboard
    </Link>
    <span className="mx-2">&gt;</span>
    <span className="font-semibold text-gray-700">
      {productName || "Product Details"}
    </span>
  </nav>
);
