import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { useFilters } from "../context/FilterContext";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import {API_URL} from "@/config";
import {Group, Product, mapServerProduct, GroupVariant} from "@/entities";

interface CategoryResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  variant: string;
  products: any[];
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { setFilters, resetFilters } = useFilters();
  const [category, setCategory] = useState<Group>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!categoryId) {
      navigate("/");
      return;
    }

    // Fetch category data and products
    fetch(`${API_URL}/v1/groups/slug/${categoryId}?variant=category`)
      .then(res => res.json())
      .then((data: CategoryResponse) => {
        setCategory({
          id: data.id,
          name: data.name,
          description: data.description,
          image: data.image,
          slug: data.slug,
          variant: data.variant as GroupVariant,
          products: []
        });

        // Map server products to client format
        const mappedProducts = data.products.map(mapServerProduct);
        setProducts(mappedProducts);

        // Reset filters first to clear any previous filters
        resetFilters();
      })
      .catch(err => {
        console.error("Error fetching category:", err);
        navigate("/");
      });

  }, [categoryId, navigate, resetFilters]);

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
            src={category.image || '/placeholder.jpg'} 
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
            products={products}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
