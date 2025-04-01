import React from "react";
import ProductGrid from "./ProductGrid";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {Product} from "@/entities/product.ts";

interface BestSellersSectionProps {
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
  products?: Array<Product>;
}

const BestSellersSection = ({
  title = "Хиты продаж",
  subtitle = "Самые популярные товары нашего магазина",
  showViewAllButton = true,
  onViewAllClick = () => {},
  products = [],
}: BestSellersSectionProps) => {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="mt-2 text-gray-600">{subtitle}</p>
          </div>

          {showViewAllButton && (
            <Button
              onClick={onViewAllClick}
              variant="outline"
              className="group flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              Смотреть все
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>

        <ProductGrid
          products={products}
          showFilters={false}
        />
      </div>
    </section>
  );
};

export default BestSellersSection;
