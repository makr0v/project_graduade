import React, {FC, useEffect, useState} from "react";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import {Button} from "./ui/button";
import {Filter, RefreshCw} from "lucide-react";
import {useFilters} from "../context/FilterContext";
import {Product} from "@/entities/product.ts";
import {GroupVariant} from "@/entities";


type Props = {
  title?: string;
  products?: Product[];
  showFilters?: boolean;
  searchTerm?: string;
  filterByCategoryId?: number;
}
const ProductGrid: FC<Props> = ({
  title = "Хиты продаж",
  products = [],
  showFilters = true,
  filterByCategoryId,
  searchTerm,
}) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isAnimating, setIsAnimating] = useState(false);
  const { filters, resetFilters, applyFilters } = useFilters();

  // Apply all filters whenever they change
  useEffect(() => {
    setIsAnimating(true);
    
    // Небольшая задержка перед применением фильтров для плавной анимации исчезновения
    setTimeout(() => {
      // Start with the base products
      let filtered = products;

      // Apply category filter if specified
      if (filterByCategoryId) {
        filtered = filtered.filter((product) =>
          product.groups.some(group => 
            group.variant === GroupVariant.Category && 
            group.id === filterByCategoryId
          )
        );
      }

      // Apply user-selected filters (price, age, season, size)
      filtered = applyFilters(filtered);

      // Apply search filter if searchTerm exists
      if (searchTerm && searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase().trim();
        filtered = filtered.filter(
          (product) =>
            (product.name.toLowerCase().includes(term)) ||
            (product.season && product.season.toLowerCase().includes(term)) ||
            (product.age && product.age.toLowerCase().includes(term)),
        );
      }

      setFilteredProducts(filtered);
      
      // Задержка перед появлением новых товаров
      setTimeout(() => {
        setIsAnimating(false);
      }, 150);
    }, 150);
  }, [
    filters,
    products,
    searchTerm,
    filterByCategoryId,
    applyFilters
  ]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleResetFilters = () => {
    resetFilters();
  };

  return (
    <div id="products" className="w-full bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {showFilters && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={toggleFilters}
                className="flex items-center gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-700 transition-all duration-300"
              >
                <Filter className="h-4 w-4" />
                {filtersVisible ? "Скрыть фильтры" : "Показать фильтры"}
              </Button>
              <Button
                variant="ghost"
                onClick={handleResetFilters}
                className="flex items-center gap-2 hover:text-pink-700 transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4" />
                Сбросить
              </Button>
            </div>
          )}
        </div>

        {showFilters && filtersVisible && (
          <div className="mb-6">
            <ProductFilters />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className={`flex justify-center transition-all duration-300 ease-in-out transform
                ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              <ProductCard
                slug={product.slug}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                discount={product.discount}
                sizes={product.sizes}
                colors={product.colors}
                season={product.season}
                age={product.age}
              />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={`my-12 text-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <p className="text-lg text-gray-500">
              По вашему запросу ничего не найдено. Попробуйте изменить параметры
              фильтрации.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
