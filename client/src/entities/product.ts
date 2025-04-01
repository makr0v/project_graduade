import {Group} from "@/entities/group.ts";

export type ServerProductColors = {
    [name: string]: string;
};
export type ServerProduct = {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    material: string;
    care: string;
    season: string;
    age: string;
    sizes: string[];
    colors: ServerProductColors;
    price: number;
    discount: number;
    groups: Omit<Group, 'products'>[]
}

export type Product = Omit<ServerProduct, 'colors'> & {
    colors: {
        name: string,
        value: string
    }[];
}

export const mapServerProduct = (serverProduct: ServerProduct): Product => {
    return {
        ...serverProduct,
        price: serverProduct.price || 1,
        discount: serverProduct.discount || 0,
        sizes: serverProduct?.sizes || [],
        colors: Object?.entries(serverProduct?.colors || {})?.map(([value, name]) => ({
            name, value
        })) || []
    }
}