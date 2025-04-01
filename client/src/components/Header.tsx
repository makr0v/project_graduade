import React, {FC, useState} from "react";
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import {useCatalog} from "@/context/CatalogContext.tsx";

type Props = {
  logoText?: string;
  onSearchSubmit?: (searchTerm: string) => void;
  isLoggedIn?: boolean;
}

const Header: FC<Props> = ({
  logoText = "Детский Гардероб",
  onSearchSubmit = () => {},
  isLoggedIn = false,
}) => {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const catalog = useCatalog()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleLogout = () => {
    // In a real app, you would call your logout API here
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      onSearchSubmit("");
    }
  };

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

                {catalog.categories.map(c => {
                  return <DropdownMenuSub key={c.id}>
                    <DropdownMenuSubTrigger>
                      <Shirt className="h-4 w-4 mr-2" />
                      <span>{c.name}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-48">
                      <DropdownMenuItem
                          onClick={() => navigate(`/category/${c.slug}`)}
                      >
                        {c.name}
                      </DropdownMenuItem>
{/*
                      <DropdownMenuSeparator />
*/}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/catalog")}>
                  <Grid className="h-4 w-4 mr-2" />
                  <span>Весь каталог</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
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
          </form>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCartClick}
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
            <Button variant="ghost" size="icon" onClick={handleProfileClick}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search and Categories */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="flex w-full mb-3">
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
          </form>

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
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
