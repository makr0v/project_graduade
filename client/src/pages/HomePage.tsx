import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "@/components/BannerCarousel.tsx";
import Header from "@/components/Header.tsx";
import CategorySection from "@/components/CategorySection.tsx";
import ProductGrid from "@/components/ProductGrid.tsx";
import Footer from "@/components/Footer.tsx";
import {useCatalog} from "@/context/CatalogContext.tsx";

const HomePage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const navigate = useNavigate();
    const { products, collections, categories } = useCatalog();

    // Scroll to hash on load
    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, []);

    const handleSearchSubmit = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        // Scroll to products section
        const productsSection = document.getElementById("products");
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleSummerCollectionClick = () => {
        navigate("/category/summer");
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header onSearchSubmit={handleSearchSubmit} />

            <main className="flex-grow">
                {/* Hero Banner Carousel */}
                <BannerCarousel banners={collections.slice(0, Math.min(collections.length, 3))}  />

                {/* Popular Categories */}
                <CategorySection categories={categories} />

                {/* Best Sellers */}
                <ProductGrid
                    products={products}
                    title="Хиты продаж"
                    showFilters={true}
                    searchTerm={searchTerm}
                />

                {/* Seasonal Group */}
                <div className="w-full py-10 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-6 md:mb-0 md:mr-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                                    Новая летняя коллекция
                                </h2>
                                <p className="text-gray-700 mb-4 max-w-md">
                                    Легкие и яркие наряды для самых активных летних приключений
                                    вашего ребенка.
                                </p>
                                <button
                                    onClick={handleSummerCollectionClick}
                                    className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
                                >
                                    Смотреть коллекцию
                                </button>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3">
                                <img
                                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80"
                                    alt="Летняя коллекция"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Arrivals */}
                <ProductGrid
                    title="Новинки"
                    showFilters={false}
                    searchTerm={searchTerm}
                    products={products.slice(0, Math.min(products.length, 4))}
                />

                {/* Advantages Section */}
                <section className="w-full py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                            Почему выбирают нас
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-blue-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">
                                    Качественные материалы
                                </h3>
                                <p className="text-gray-600">
                                    Мы используем только безопасные и гипоаллергенные материалы
                                    для детской одежды
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
                                <p className="text-gray-600">
                                    Доставляем заказы по всей России в течение 1-3 рабочих дней
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-pink-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Удобный возврат</h3>
                                <p className="text-gray-600">
                                    Возврат и обмен товара в течение 14 дней без объяснения причин
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Newsletter Subscription */}
                <section className="w-full py-12 bg-pink-600">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Подпишитесь на наши новости
                        </h2>
                        <p className="text-white text-opacity-90 mb-6 max-w-xl mx-auto">
                            Получайте информацию о новых коллекциях, акциях и специальных
                            предложениях первыми
                        </p>
                        <div className="flex flex-col md:flex-row max-w-md mx-auto md:max-w-xl gap-2">
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="px-4 py-3 rounded-lg flex-grow"
                            />
                            <button className="bg-white text-pink-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                Подписаться
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
