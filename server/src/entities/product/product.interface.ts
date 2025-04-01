import { BaseDomain } from '../../types';

export type ProductColors = {
  [name: string]: string;
};
export type Product = BaseDomain & {
  name: string;
  slug: string;
  image: string;
  description: string;
  material: string;
  care: string;
  season: string;
  age: string;
  sizes: string[];
  colors: ProductColors;
  price: number;
  discount: number;
};
