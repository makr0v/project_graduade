import React, {FC, useState, useEffect} from "react";
import {
  ChevronDown,
  Grid,
  Search,
  ShoppingCart,
  Shirt,
  User,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CartDrawer from "./CartDrawer";
import ProfileDrawer from "./ProfileDrawer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import {useCatalog} from "@/context/CatalogContext.tsx";
import {API_URL} from "@/config";
import { Product } from "@/entities";

type Props = {
  logoText?: string;
  isLoggedIn?: boolean;
}

const Header: FC<Props> = ({
  logoText = "Детский Гардероб",
  isLoggedIn = false,
}) => {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const catalog = useCatalog();

  // Поиск товаров при вводе
  useEffect(() => {
    const searchProducts = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/v1/products`);
        const data = await response.json();
        const filtered = data.products.filter((product: Product) => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.material?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.season?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.age?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5)); // Показываем только первые 5 результатов
      } catch (error) {
        console.error('Error searching products:', error);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowResults(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(true);
    if (!value.trim()) {
      setShowResults(false);
    }
  };

  // Закрываем результаты при клике вне поиска
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById('search-container');
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              {logoText}
            </a>
          </div>

          {/* Catalog Dropdown */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 font-medium"
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Каталог
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Категории</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {catalog.categories.map(c => (
                  <DropdownMenuItem
                    key={c.id}
                    onClick={() => navigate(`/category/${c.slug}`)}
                  >
                    <Shirt className="h-4 w-4 mr-2" />
                    <span>{c.name}</span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/catalog")}>
                  <Grid className="h-4 w-4 mr-2" />
                  <span>Весь каталог</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4" id="search-container">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Поиск детской одежды..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* Выпадающий список результатов */}
              {showResults && searchTerm.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border shadow-lg z-50 max-h-[400px] overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Ничего не найдено
                    </div>
                  ) : (
                    <>
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            navigate(`/product/${product.slug}`);
                            setSearchTerm("");
                            setShowResults(false);
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              {product.price} ₽
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        className="p-2 text-center text-blue-600 hover:bg-gray-50 cursor-pointer border-t"
                        onClick={() => {
                          navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                          setSearchTerm("");
                          setShowResults(false);
                        }}
                      >
                        Показать все результаты
                      </div>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="icon" onClick={() => setIsProfileOpen(true)}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full mb-2" id="mobile-search-container">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <Input
                type="text"
                placeholder="Поиск детской одежды..."
                className="pr-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {/* Мобильный выпадающий список результатов */}
            {showResults && searchTerm.trim() && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg border shadow-lg z-50 max-h-[400px] overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Ничего не найдено
                  </div>
                ) : (
                  <>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          navigate(`/product/${product.slug}`);
                          setSearchTerm("");
                          setShowResults(false);
                        }}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            {product.price} ₽
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className="p-2 text-center text-blue-600 hover:bg-gray-50 cursor-pointer border-t"
                      onClick={() => {
                        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                        setSearchTerm("");
                        setShowResults(false);
                      }}
                    >
                      Показать все результаты
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Catalog Button */}
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate("/catalog")}
          >
            <Grid className="h-4 w-4" />
            Каталог товаров
          </Button>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate("/checkout");
        }}
      />

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsProfileOpen(false);
          navigate("/");
        }}
      />
    </>
  );
};

export default Header;
