import {Product} from "@/entities/product.ts";

export enum GroupVariant {
    Category = 'category',
    Collection = 'collection',
}
export type Group = {
    id: number;
    name: string;
    slug: string;
    variant: GroupVariant;
    description: string;
    image: string;
    products: Omit<Product, 'groups'>[]
};
