import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import {API_URL} from "@/config";
import {Group, Product, mapServerProduct, GroupVariant} from "@/entities";

interface CollectionResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  slug: string;
  variant: string;
  products: any[];
}

const CollectionPage: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Group>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      if (!collectionId) {
        navigate("/");
        return;
      }

      try {
        // Fetch collection data and products
        const response = await fetch(`${API_URL}/v1/groups/slug/${collectionId}?variant=collection`);
        if (!response.ok) {
          throw new Error('Collection not found');
        }

        const data: CollectionResponse = await response.json();
        
        setCollection({
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
      } catch (err) {
        console.error("Error fetching collection:", err);
        navigate("/catalog");
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-xl text-gray-600">Загрузка коллекции...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!collection) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
          <img
            src={collection.image || '/placeholder.jpg'} 
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {collection.name}
            </h1>
            <p className="text-white text-lg mb-4 max-w-md">
              {collection.description}
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
            title={`Товары из коллекции "${collection.name}"`}
            showFilters={true}
            products={products}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollectionPage; 