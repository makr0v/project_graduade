import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { useFilters } from "../context/FilterContext";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import {useCatalog} from "@/context/CatalogContext.tsx";
import {Group} from "@/entities";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { setFilters, resetFilters } = useFilters();
  const catalog = useCatalog();
  const [category, setCategory] = useState<Group>()


  useEffect(() => {
    const expectedCategory = catalog.categories.find(i => i.slug === categoryId)
    if (!categoryId || !expectedCategory) {
      navigate("/");
      return;
    }

    setCategory(expectedCategory)

    // Reset filters first to clear any previous filters
    resetFilters();

    // Apply filters based on category
    const newFilters: Record<string, any> = {};

 /*   if (categoryInfo.filterAge) {
      newFilters.age = categoryInfo.filterAge;
    }

    if (categoryInfo.filterSeason) {
      newFilters.season = categoryInfo.filterSeason;
    }

    if (categoryInfo.filterType) {
      newFilters.type = categoryInfo.filterType;
    }*/
/*
    // Apply the new filters
    setFilters(newFilters as any);

    console.log("Category page filters applied:", newFilters);*/
  }, [categoryId, navigate]);

  if (!category) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-white text-lg mb-4 max-w-md">
              {category.description}
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

          {/* Products */}
          <ProductGrid
            title={`Товары в категории "${category.name}"`}
            showFilters={true}
            filterByCategoryId={category.id}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
