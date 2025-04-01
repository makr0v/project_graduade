import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("");

  // Parse URL parameters on component mount and when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") || "";
    const subcategory = searchParams.get("subcategory") || "";

    setActiveCategory(category);
    setActiveSubcategory(subcategory);
  }, [location.search]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubcategory(""); // Reset subcategory when changing main category

    // Update URL without reloading the page
    const searchParams = new URLSearchParams();
    if (category) searchParams.set("category", category);
    navigate(`/catalog?${searchParams.toString()}`, { replace: true });

    // Log for debugging
    console.log(`Changed category to: ${category}`);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setActiveSubcategory(subcategory);

    // Update URL without reloading the page
    const searchParams = new URLSearchParams();
    if (activeCategory) searchParams.set("category", activeCategory);
    if (subcategory) searchParams.set("subcategory", subcategory);
    navigate(`/catalog?${searchParams.toString()}`, { replace: true });

    // Log for debugging
    console.log(`Changed subcategory to: ${subcategory}`);
  };

  // Function to get the title based on active category and subcategory
  const getCategoryTitle = () => {
    if (activeSubcategory) {
      // If there's a subcategory, show more specific title
      if (activeCategory === "boys") {
        switch (activeSubcategory) {
          case "tshirts":
            return "Футболки для мальчиков";
          case "pants":
            return "Брюки для мальчиков";
          case "jackets":
            return "Куртки для мальчиков";
          case "shoes":
            return "Обувь для мальчиков";
          case "accessories":
            return "Аксессуары для мальчиков";
          default:
            return "Товары для мальчиков";
        }
      } else if (activeCategory === "girls") {
        switch (activeSubcategory) {
          case "dresses":
            return "Платья для девочек";
          case "tshirts":
            return "Футболки для девочек";
          case "skirts":
            return "Юбки для девочек";
          case "shoes":
            return "Обувь для девочек";
          case "accessories":
            return "Аксессуары для девочек";
          default:
            return "Товары для девочек";
        }
      }
    }

    // If no subcategory or not a category with subcategories
    switch (activeCategory) {
      case "boys":
        return "Товары для мальчиков";
      case "girls":
        return "Товары для девочек";
      case "babies":
        return "Товары для малышей";
      case "school":
        return "Школьная форма";
      case "summer":
        return "Летняя коллекция";
      default:
        return "Все товары";
    }
  };

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
            {/* Main Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Button
                variant={activeCategory === "" ? "default" : "outline"}
                onClick={() => handleCategoryChange("")}
                className={`min-w-[120px] ${activeCategory === "" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Все товары
              </Button>
              <Button
                variant={activeCategory === "babies" ? "default" : "outline"}
                onClick={() => handleCategoryChange("babies")}
                className={`min-w-[120px] ${activeCategory === "babies" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Для малышей
              </Button>
              <Button
                variant={activeCategory === "girls" ? "default" : "outline"}
                onClick={() => handleCategoryChange("girls")}
                className={`min-w-[120px] ${activeCategory === "girls" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Для девочек
              </Button>
              <Button
                variant={activeCategory === "boys" ? "default" : "outline"}
                onClick={() => handleCategoryChange("boys")}
                className={`min-w-[120px] ${activeCategory === "boys" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Для мальчиков
              </Button>
              <Button
                variant={activeCategory === "school" ? "default" : "outline"}
                onClick={() => handleCategoryChange("school")}
                className={`min-w-[120px] ${activeCategory === "school" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Школьная форма
              </Button>
              <Button
                variant={activeCategory === "summer" ? "default" : "outline"}
                onClick={() => handleCategoryChange("summer")}
                className={`min-w-[120px] ${activeCategory === "summer" ? "bg-pink-600 hover:bg-pink-700" : "hover:border-pink-300 hover:text-pink-600"}`}
              >
                Летняя коллекция
              </Button>
            </div>

            {/* Subcategories for Boys */}
            {activeCategory === "boys" && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Button
                  variant={activeSubcategory === "" ? "secondary" : "outline"}
                  onClick={() => handleSubcategoryChange("")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Все
                </Button>
                <Button
                  variant={
                    activeSubcategory === "tshirts" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("tshirts")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "tshirts" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Футболки
                </Button>
                <Button
                  variant={
                    activeSubcategory === "pants" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("pants")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "pants" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Брюки
                </Button>
                <Button
                  variant={
                    activeSubcategory === "jackets" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("jackets")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "jackets" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Куртки
                </Button>
                <Button
                  variant={
                    activeSubcategory === "shoes" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("shoes")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "shoes" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Обувь
                </Button>
                <Button
                  variant={
                    activeSubcategory === "accessories"
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() => handleSubcategoryChange("accessories")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "accessories" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Аксессуары
                </Button>
              </div>
            )}

            {/* Subcategories for Girls */}
            {activeCategory === "girls" && (
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <Button
                  variant={activeSubcategory === "" ? "secondary" : "outline"}
                  onClick={() => handleSubcategoryChange("")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Все
                </Button>
                <Button
                  variant={
                    activeSubcategory === "dresses" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("dresses")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "dresses" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Платья
                </Button>
                <Button
                  variant={
                    activeSubcategory === "tshirts" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("tshirts")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "tshirts" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Футболки
                </Button>
                <Button
                  variant={
                    activeSubcategory === "skirts" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("skirts")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "skirts" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Юбки
                </Button>
                <Button
                  variant={
                    activeSubcategory === "shoes" ? "secondary" : "outline"
                  }
                  onClick={() => handleSubcategoryChange("shoes")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "shoes" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Обувь
                </Button>
                <Button
                  variant={
                    activeSubcategory === "accessories"
                      ? "secondary"
                      : "outline"
                  }
                  onClick={() => handleSubcategoryChange("accessories")}
                  size="sm"
                  className={`text-xs ${activeSubcategory === "accessories" ? "bg-pink-200 text-pink-800 hover:bg-pink-300" : "hover:border-pink-300 hover:text-pink-600"}`}
                >
                  Аксессуары
                </Button>
              </div>
            )}

            <ProductGrid
              title={getCategoryTitle()}
              showFilters={true}
              filterByCategoryId={+activeCategory}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CatalogPage;
