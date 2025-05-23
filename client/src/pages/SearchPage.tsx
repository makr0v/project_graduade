import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { API_URL } from '@/config';
import { Product, mapServerProduct } from '@/entities';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/v1/products`);
        const data = await response.json();
        const allProducts = data.products.map(mapServerProduct);
        
        if (query.trim()) {
          // Фильтруем продукты на клиенте, если есть поисковый запрос
          const filtered = allProducts.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.material?.toLowerCase().includes(query.toLowerCase()) ||
            product.season?.toLowerCase().includes(query.toLowerCase()) ||
            product.age?.toLowerCase().includes(query.toLowerCase())
          );
          setProducts(filtered);
        } else {
          // Показываем все продукты, если поисковый запрос пуст
          setProducts(allProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться назад
        </Button>

        <ProductGrid
          title={query.trim() ? `Результаты поиска: ${query}` : "Все товары"}
          showFilters={true}
          products={products}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage; 