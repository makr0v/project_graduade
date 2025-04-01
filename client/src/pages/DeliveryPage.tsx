import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Separator } from "../components/ui/separator";
import { Truck, CreditCard, Clock, MapPin } from "lucide-react";

const DeliveryPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Доставка и оплата
          </h1>
          <Separator className="mb-8" />

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Truck className="mr-2 h-6 w-6 text-pink-600" />
              Способы доставки
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Курьерская доставка
                </h3>
                <p className="text-gray-600 mb-4">
                  Доставка курьером до двери в удобное для вас время.
                  Возможность примерки перед покупкой.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Стоимость:</span> 300 ₽
                    (бесплатно при заказе от 5000 ₽)
                  </div>
                  <div>
                    <span className="font-medium">Сроки:</span> 1-2 дня в
                    Москве, 2-5 дней в регионах
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Доставка в пункты выдачи
                </h3>
                <p className="text-gray-600 mb-4">
                  Получите заказ в удобном пункте выдачи рядом с домом или
                  работой. Более 5000 пунктов выдачи по всей России.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Стоимость:</span> 200 ₽
                    (бесплатно при заказе от 3000 ₽)
                  </div>
                  <div>
                    <span className="font-medium">Сроки:</span> 1-3 дня в
                    Москве, 3-7 дней в регионах
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Почта России
                </h3>
                <p className="text-gray-600 mb-4">
                  Доставка в любой населенный пункт России. Идеально для
                  удаленных регионов.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Стоимость:</span> 250 ₽
                    (бесплатно при заказе от 4000 ₽)
                  </div>
                  <div>
                    <span className="font-medium">Сроки:</span> 5-14 дней в
                    зависимости от региона
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <CreditCard className="mr-2 h-6 w-6 text-pink-600" />
              Способы оплаты
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Онлайн-оплата
                </h3>
                <p className="text-gray-600 mb-2">
                  Оплата банковской картой на сайте (Visa, MasterCard, МИР)
                </p>
                <p className="text-gray-600">
                  Оплата через электронные кошельки (ЮMoney, WebMoney, QIWI)
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Оплата при получении
                </h3>
                <p className="text-gray-600 mb-2">
                  Наличными или картой курьеру при доставке
                </p>
                <p className="text-gray-600">
                  Наличными или картой в пункте выдачи заказов
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Clock className="mr-2 h-6 w-6 text-pink-600" />
              Сроки обработки заказа
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Мы стараемся обрабатывать все заказы максимально быстро:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  Заказы, оформленные до 14:00, обрабатываются и передаются в
                  службу доставки в тот же день
                </li>
                <li>
                  Заказы, оформленные после 14:00, обрабатываются на следующий
                  рабочий день
                </li>
                <li>
                  В период распродаж и праздников срок обработки может
                  увеличиться на 1-2 дня
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <MapPin className="mr-2 h-6 w-6 text-pink-600" />
              География доставки
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Мы доставляем товары по всей территории Российской Федерации.
                Для жителей Москвы и Санкт-Петербурга доступна экспресс-доставка
                в день заказа (при оформлении до 12:00).
              </p>
              <p className="text-gray-600">
                Для международной доставки, пожалуйста, свяжитесь с нашей
                службой поддержки клиентов для уточнения условий и стоимости.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryPage;
