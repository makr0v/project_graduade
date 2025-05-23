import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState} from "react";
import {Product} from "@/entities";

// Helper function to calculate discounted price
const getDiscountedPrice = (price: number, discount: number) => {
  return Math.round(price * (1 - (discount || 0) / 100));
};

type FilterStateParam<T> = 'all' | T;
export type FilterState = {
  priceRange: [min: number, max: number];
  age: FilterStateParam<string>;
  season: FilterStateParam<string>;
  sizes: string[];
}
const _defaultFilters: FilterState = {
  age: 'all',
  priceRange: [0, 1_000_000],
  sizes: [],
  season: 'all'
}

type FilterOptions = {
  priceRange: [min: number, max: number];
  ages: string[];
  seasons: string[];
  sizes: string[];
  colors: string[];
}
type FilterContextType = {
  options: FilterOptions;
  setOptions: Dispatch<SetStateAction<FilterOptions>>;
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
  resetFilters: () => void;
  applyFilters: (products: Product[]) => Product[];
  isFiltersApplied: boolean;
  setIsFiltersApplied: Dispatch<SetStateAction<boolean>>;
}
const FilterContext = createContext<FilterContextType | undefined>(undefined);
export const FilterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [options, setOptions] = useState<FilterOptions>({
    ages: [],
    seasons: [],
    priceRange: [0, 1_000_000],
    sizes: [],
    colors: []
  });
  const [filters, setFilters] = useState<FilterState>(_defaultFilters);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  const resetFilters = () => {
    setFilters(_defaultFilters);
    setIsFiltersApplied(false);
  };

  const applyFilters = (products: Product[]): Product[] => {
    if (!isFiltersApplied) {
      return products;
    }

    return products.filter((product) => {
      // Calculate actual price with discount
      const actualPrice = getDiscountedPrice(product.price, product.discount);

      // Filter by price range using actual discounted price
      if (actualPrice < filters.priceRange[0] || actualPrice > filters.priceRange[1]) {
        return false;
      }

      // Filter by age
      if (filters.age !== "all" && filters.age && product.age && product.age !== filters.age) {
        return false;
      }

      // Filter by season
      if (
        filters.season !== "all" &&
        filters.season &&
        product.season &&
        product.season !== filters.season
      ) {
        return false;
      }

      // Filter by size (assuming product has a sizes array)
      if (filters.sizes && filters.sizes.length) {
        const hasMatchingSize = filters.sizes.some((size) =>
          product.sizes.includes(size),
        );
        if (!hasMatchingSize) {
          return false;
        }
      }

      return true;
    });
  };

  return (
    <FilterContext.Provider
      value={{
        options,
        setOptions,
        filters,
        setFilters,
        resetFilters,
        applyFilters,
        isFiltersApplied,
        setIsFiltersApplied
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};