import React, {FC, useState} from "react";
import {useCart} from "@/context/CartContext.tsx";
import {useNavigate} from "react-router-dom";
import {useCatalog} from "@/context/CatalogContext.tsx";
import {API_URL} from "@/config";

type Props = {
  logoText?: string;
  onSearchSubmit?: (searchTerm: string) => void;
  isLoggedIn?: boolean;
}

export const Header: FC<Props> = ({
  logoText = "Детский Гардероб",
  isLoggedIn = false,
}) => {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const catalog = useCatalog();

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/v1/products?search=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return null; // Replace this with your actual JSX return
}; 