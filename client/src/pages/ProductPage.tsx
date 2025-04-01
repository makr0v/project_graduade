import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import ProductReviews from "../components/ProductReviews";
import {useCatalog} from "@/context/CatalogContext.tsx";
import {Product} from "@/entities";

// Sample product database

// Map category to product IDs

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const catalog = useCatalog()
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const expectedProduct = catalog.products.find(i => i.slug === productId)
    if (!productId || !expectedProduct) {
      navigate("/");
      return;
    }

    setProduct(expectedProduct);

    // Set default selected size and color
    if (expectedProduct.sizes.length) {
      setSelectedSize(expectedProduct.sizes[0]);
    }

    if (expectedProduct.colors.length) {
      setSelectedColor(expectedProduct.colors[0].name);
    }

    // Find related products (from the same category or with the same age/season)
    const related: Product[] = [];

    // Find which categories this product belongs to
    const productGroupIds = expectedProduct?.groups?.map(i => i.id) || []
    const allRelatedProducts = catalog.products
        .filter(i => i.id !== expectedProduct.id && i.groups.filter(i => productGroupIds.includes(i.id)).length)
    setRelatedProducts(allRelatedProducts)
  }, [productId, navigate]);

  if (!product) {
    return null;
  }

  const discountedPrice =
    product.discount && product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      size: selectedSize,
      color: selectedColor,
      imageUrl: product.image,
    });

    // Show added confirmation
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden bg-gray-50 relative">
            {product.discount && product.discount > 0 && (
              <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1.5 text-sm font-bold text-white z-10">
                -{product.discount}%
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover aspect-square"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-4">
              {product.discount && product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    {discountedPrice} ₽
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    {product.price} ₽
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  {product.price} ₽
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.sizes.length && <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Размер
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes?.map((size, idx) => (
                      <SelectItem key={size + idx} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> }

              { product.colors.length && <div>
                <label className="text-sm text-gray-500 mb-1 block">Цвет</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите цвет" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors?.map((color, idx) => (
                      <SelectItem key={color.value + idx} value={color.name}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> }
            </div>

            <Button
              onClick={handleAddToCart}
              className={`w-full ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-pink-600 hover:bg-pink-700"} transition-all duration-300 transform hover:scale-105 rounded-full py-6 text-lg mb-6`}
              disabled={isAdded}
              size="lg"
            >
              {isAdded ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Добавлено в корзину
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Добавить в корзину
                </>
              )}
            </Button>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Описание</TabsTrigger>
                <TabsTrigger value="details">Характеристики</TabsTrigger>
                <TabsTrigger value="care">Уход</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4 text-gray-700">
                <p>{product.description || 'Не задано'}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-2">
                  { product.age && <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Возраст</span>
                    <span className="font-medium">{product.age}</span>
                  </div> }
                  {product.season && <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Сезон</span>
                    <span className="font-medium">
                      {product.season === "winter" && "Зима"}
                      {product.season === "summer" && "Лето"}
                      {product.season === "autumn" && "Осень"}
                      {product.season === "spring" && "Весна"}
                      {product.season === "demi" && "Демисезон"}
                      {product.season === "all" && "Всесезонный"}
                    </span>
                  </div> }
                  { product.material && <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Материал</span>
                    <span className="font-medium">{product.material}</span>
                  </div> }
                </div>
              </TabsContent>
              <TabsContent value="care" className="mt-4 text-gray-700">
                <p>{product.care || 'Не задано'}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mb-12">
          <ProductReviews productId={product.id} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="flex justify-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  >
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-cover rounded-lg mb-2"
                    />
                    <h3 className="font-medium text-gray-800">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-primary font-bold">
                      {relatedProduct.price} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
