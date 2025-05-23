import  {createContext, useContext, useState, useEffect, PropsWithChildren, FC} from "react";
import {Group, mapServerProduct, Product, ServerProduct} from "@/entities";
import {API_URL} from "@/config.ts";
import {useFilters} from "@/context/FilterContext.tsx";

// Helper function to calculate discounted price
const getDiscountedPrice = (price: number, discount: number) => {
  return Math.round(price * (1 - discount / 100));
};

interface CatalogContext {
  products: Product[];
  categories: Group[];
  collections: Group[]
}
const CatalogContext = createContext<CatalogContext | undefined>(undefined);

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CatalogProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [products, setProducts] = useState<CatalogContext['products']>([]);
  const [collections, setCollections] = useState<CatalogContext['collections']>([]);
  const [categories, setCategories] = useState<CatalogContext['categories']>([]);
  const { setOptions, setFilters } = useFilters();

  // Load catalog on initial render
  useEffect(() => {
    Promise.all([
      fetch(API_URL + `/v1/products`)
          .then(data => data.json() as Promise<{ products: ServerProduct[] }>)
          .then(data => {
            let max = -1_000_000_000;
            let min = 1_000_000_000;
            let ages: string[] = [];
            let seasons: string[] = [];
            let sizes: string[][] = [];
            let colors: string[][] = [];

            data.products.forEach(i => {
              const discountedPrice = getDiscountedPrice(i.price, i.discount || 0);
              if (discountedPrice > max) {
                max = discountedPrice;
              }
              if (discountedPrice < min) {
                min = discountedPrice;
              }
              if (i.age) {
                ages.push(i.age)
              }
              if (i.season) {
                seasons.push(i.season)
              }
              if (i.sizes) {
                sizes.push(i.sizes)
              }
              if (i.colors) {
                colors.push(Object.entries(i.colors).map(([_, color]) => color as string))
              }
            })

            setOptions({
              ages: Array.from(new Set(ages)),
              seasons: Array.from(new Set(seasons)),
              sizes: Array.from(new Set(sizes.flatMap(i => i))),
              colors: Array.from(new Set(colors.flatMap(i => i))),
              priceRange: [min, max],
            })
            setFilters(prev => ({
              ...prev,
              priceRange: [min, max]
            }))
            setProducts(data.products.map(mapServerProduct))
          }),
      fetch(API_URL + `/v1/groups?variant=category`)
          .then(data => data.json() as Promise<{ groups: Group[] }>)
          .then(data => { setCategories(data.groups) }),
      fetch(API_URL + `/v1/groups?variant=collection`)
          .then(data => data.json() as Promise<{ groups: Group[] }>)
          .then(data => { setCollections(data.groups) }),
    ])
  }, []);


  return (
    <CatalogContext.Provider
      value={{
        products,
        categories,
        collections
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};
