import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logoutThunk } from "../../store/slices/authSlice";
import { AddIcon, SearchIcon } from "../icons/Icons";

interface DashboardHeaderProps {
  onAddNewProduct: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onAddNewProduct,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <header className="bg-white py-4 px-8 max-sm:px-3 shadow-sm">
        <div className="flex justify-between min-md:items-center max-md:flex-col gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Products Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {user && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-600 hover:bg-red-200 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center max-lg:items-start max-lg:flex-col justify-between gap-3">
          <div className="flex items-center max-lg:w-full max-lg:flex-col max-lg:items-start gap-3">
            <div className="relative max-lg:w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="border max-sm:w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select className="border max-sm:w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
              <option>All Status</option>
            </select>
          </div>
          <button
            onClick={onAddNewProduct}
            className="flex items-center max-sm:w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            <AddIcon />
            Add New Product
          </button>
        </div>
      </header>
    </>
  );
};
