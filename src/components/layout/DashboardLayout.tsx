import { DashboardHeader } from "../dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onAddNewProduct?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  categories?: string[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = (props) => {
  const {
    children,
    onAddNewProduct = () => {},
    searchQuery = "",
    onSearchChange = () => {},
    selectedCategory = "All",
    onCategoryChange = () => {},
    categories = ["All"],
  } = props;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        onAddNewProduct={onAddNewProduct}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
      />
      <main className="p-8 max-sm:p-3">{children}</main>
    </div>
  );
};

export default DashboardLayout;
