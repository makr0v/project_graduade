import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Product } from "../entities/product";

interface Group {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  variant: string;
  products: Product[];
}

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [categories, setCategories] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://185.251.91.4:9001/api/v1/groups?variant=category');
        const data = await response.json();
        setCategories(data.groups);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Parse URL parameters on component mount and when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") || "";
    setActiveCategory(category);
  }, [location.search]);

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);

    // Update URL without reloading the page
    const searchParams = new URLSearchParams();
    if (categorySlug) searchParams.set("category", categorySlug);
    navigate(`/catalog?${searchParams.toString()}`, { replace: true });
  };

  // Get active category name
  const getActiveCategoryName = () => {
    const category = categories.find(cat => cat.slug === activeCategory);
    return category ? category.name : "Все товары";
  };

  // Get products for active category
  const getActiveProducts = () => {
    if (!activeCategory) {
      return categories.flatMap(cat => cat.products);
    }
    const category = categories.find(cat => cat.slug === activeCategory);
    return category ? category.products : [];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[200px] md:h-[250px] w-full overflow-hidden bg-gradient-to-r from-blue-500 to-pink-500">
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Каталог товаров
            </h1>
            <p className="text-white text-lg mb-4 max-w-md">
              Полный ассортимент детской одежды и аксессуаров
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Вернуться назад
          </Button>

          <div className="mb-8">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button
                variant={activeCategory === "" ? "default" : "outline"}
                onClick={() => handleCategoryChange("")}
                className={`min-w-[120px] ${activeCategory === "" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Все товары
              </Button>
              
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.slug ? "default" : "outline"}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`min-w-[120px] ${activeCategory === category.slug ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            <ProductGrid
              title={getActiveCategoryName()}
              showFilters={true}
              products={getActiveProducts()}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CatalogPage;
