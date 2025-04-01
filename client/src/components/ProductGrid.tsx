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
  const { filters, resetFilters, applyFilters } = useFilters();

  // Apply filters and search whenever they change
  useEffect(() => {

    setFilteredProducts(filterByCategoryId
        ? products
            .filter(i => i.groups.filter(i => i.variant === GroupVariant.Category && i.id === filterByCategoryId).length)
        : products
    )
  }, [products])
  useEffect(() => {
    let filtered = applyFilters(products);

    // Apply category filter if specified
    if (filterByCategoryId) {
      filtered = filtered.filter((product) => {
        // Filter for boys products (either explicitly marked or by category)
        return product.groups
          .filter(i => i.id === filterByCategoryId)
          .length > 0
      });

    }

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


  }, [
    filters,
    products,
    searchTerm,
    filterByCategoryId,
  ]);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleResetFilters = () => {
    resetFilters();
    setFilteredProducts(products);
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
            <div key={product.id} className="flex justify-center">
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
          <div className="my-12 text-center">
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
