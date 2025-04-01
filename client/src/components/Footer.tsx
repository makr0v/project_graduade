import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../context/FilterContext";

const Footer = () => {
  const navigate = useNavigate();
  const { resetFilters } = useFilters();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };
  const handleViewCategory = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    resetFilters()
    navigate(`/category/${slug}`)
  }


  return (
    <footer className="w-full bg-slate-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Детский Гардероб
            </h3>
            <p className="text-slate-600">
              Стильная и качественная одежда для детей всех возрастов
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-600 hover:text-pink-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-pink-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-pink-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-slate-600 hover:text-pink-600 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Категории</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/category/babies"
                  onClick={(e) => handleViewCategory(e, 'babies')}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Для малышей
                </a>
              </li>
              <li>
                <a
                  href="/category/girls"
                  onClick={(e) => handleViewCategory(e, 'girls')}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Для девочек
                </a>
              </li>
              <li>
                <a
                  href="/category/boys"
                  onClick={(e) => handleViewCategory(e, 'boys')}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Для мальчиков
                </a>
              </li>
              <li>
                <a
                  href="/category/school"
                  onClick={(e) => handleViewCategory(e, 'school')}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Школьная форма
                </a>
              </li>
              <li>
                <a
                  href="/category/summer"
                  onClick={(e) => handleViewCategory(e, 'summer')}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Летняя коллекция
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Информация</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                  }}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                  href="/delivery"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/delivery");
                  }}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/returns");
                  }}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Возврат и обмен
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/privacy");
                  }}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/faq");
                  }}
                  className="text-slate-600 hover:text-pink-600 transition-colors"
                >
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-slate-600" />
                <span className="text-slate-600">+7 (800) 123-45-67</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-slate-600" />
                <span className="text-slate-600">info@detskiy-garderob.ru</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-slate-600" />
                <span className="text-slate-600">
                  г. Москва, ул. Примерная, д. 123
                </span>
              </li>
            </ul>
            {subscribed ? (
              <div className="bg-green-100 text-green-700 p-3 rounded-md flex items-center gap-2 mt-4">
                <Send className="h-5 w-5" />
                Спасибо за подписку!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex mt-4">
                <Input
                  type="email"
                  placeholder="Подписаться на новости"
                  className="rounded-r-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-pink-600 hover:bg-pink-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">
            © 2023 Детский Гардероб. Все права защищены.
          </p>
          <div className="mt-4 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1580508174046-170816f65662?w=200&q=80"
              alt="Способы оплаты"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
