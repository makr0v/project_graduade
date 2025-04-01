import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CatalogPage from "./pages/CatalogPage";
import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import AboutPage from "./pages/AboutPage";
import DeliveryPage from "./pages/DeliveryPage";
import ReturnPage from "./pages/ReturnPage";
import PrivacyPage from "./pages/PrivacyPage";
import FaqPage from "./pages/FaqPage";
import {CatalogProvider} from "@/context/CatalogContext.tsx";

function App() {
  return (
    <CartProvider>
      <FilterProvider>
        <CatalogProvider>
          <Suspense fallback={<p>Loading...</p>}>
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/category/:categoryId" element={<CategoryPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/returns" element={<ReturnPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/faq" element={<FaqPage />} />
              </Routes>
            </div>
          </Suspense>
        </CatalogProvider>
      </FilterProvider>
    </CartProvider>
  );
}

export default App;
