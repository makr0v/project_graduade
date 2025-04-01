import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Separator } from "../components/ui/separator";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            О нас
          </h1>
          <Separator className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Наша история
              </h2>
              <p className="text-gray-600 mb-4">
                Компания «Детский Гардероб» была основана в 2015 году группой
                молодых родителей, которые столкнулись с проблемой поиска
                качественной и стильной одежды для своих детей.
              </p>
              <p className="text-gray-600 mb-4">
                Начав с небольшого ассортимента, мы быстро выросли и сегодня
                предлагаем широкий выбор одежды для детей всех возрастов – от
                новорожденных до подростков.
              </p>
              <p className="text-gray-600">
                Наша миссия – делать детство ярким, комфортным и стильным,
                предлагая родителям только лучшие товары для их малышей.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&q=80"
                alt="Наша команда"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Наши ценности
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-pink-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-pink-700 mb-2">
                  Качество
                </h3>
                <p className="text-gray-600">
                  Мы тщательно отбираем поставщиков и проверяем каждую партию
                  товаров, чтобы гарантировать безопасность и долговечность
                  нашей продукции.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-blue-700 mb-2">
                  Комфорт
                </h3>
                <p className="text-gray-600">
                  Все наши изделия созданы с учетом особенностей детской
                  анатомии и активного образа жизни ребенка, обеспечивая
                  максимальное удобство.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-green-700 mb-2">
                  Экологичность
                </h3>
                <p className="text-gray-600">
                  Мы стремимся использовать натуральные материалы и сотрудничаем
                  с производителями, которые заботятся об окружающей среде.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Наша команда
            </h2>
            <p className="text-gray-600 mb-6">
              В «Детском Гардеробе» работают профессионалы, которые любят свое
              дело и понимают потребности современных детей и их родителей. Наши
              консультанты всегда готовы помочь с выбором и ответить на все
              вопросы.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anna"
                    alt="Анна Иванова"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Анна Иванова</h4>
                <p className="text-sm text-gray-500">Основатель и CEO</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail"
                    alt="Михаил Петров"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Михаил Петров</h4>
                <p className="text-sm text-gray-500">Директор по закупкам</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
                    alt="Елена Смирнова"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Елена Смирнова</h4>
                <p className="text-sm text-gray-500">Главный дизайнер</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey"
                    alt="Сергей Козлов"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium">Сергей Козлов</h4>
                <p className="text-sm text-gray-500">
                  Руководитель службы поддержки
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Наши достижения
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Более 50 000 довольных клиентов по всей России</li>
              <li>
                Награда «Лучший интернет-магазин детской одежды 2022 года»
              </li>
              <li>
                Сотрудничество с ведущими российскими и зарубежными брендами
              </li>
              <li>
                Собственная линия одежды, разработанная с учетом особенностей
                российского климата
              </li>
              <li>
                Благотворительные проекты по поддержке детских домов и
                малообеспеченных семей
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
