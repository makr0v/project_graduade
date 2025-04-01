import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Separator } from "../components/ui/separator";
import { RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

const ReturnPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Возврат и обмен
          </h1>
          <Separator className="mb-8" />

          <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mb-8">
            <p className="text-pink-700">
              Мы заботимся о комфорте наших клиентов и предлагаем удобные
              условия возврата и обмена товаров. Вы можете вернуть товар в
              течение 14 дней с момента получения заказа без объяснения причин.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <RefreshCw className="mr-2 h-6 w-6 text-pink-600" />
              Условия возврата и обмена
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Товар надлежащего качества
                </h3>
                <p className="text-gray-600 mb-4">
                  Вы можете вернуть или обменять товар надлежащего качества в
                  течение 14 дней, не считая дня покупки, если:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Сохранены товарный вид и потребительские свойства</li>
                  <li>Сохранены фабричные ярлыки и бирки</li>
                  <li>
                    Имеется документ, подтверждающий покупку (чек или квитанция)
                  </li>
                  <li>Товар не был в употреблении</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Товар ненадлежащего качества
                </h3>
                <p className="text-gray-600 mb-4">
                  Если вы обнаружили брак или дефект товара, вы имеете право:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    Потребовать замены на товар этой же марки (модели, артикула)
                  </li>
                  <li>
                    Потребовать замены на такой же товар другой марки с
                    соответствующим перерасчетом цены
                  </li>
                  <li>Потребовать соразмерного уменьшения покупной цены</li>
                  <li>
                    Потребовать незамедлительного безвозмездного устранения
                    недостатков товара
                  </li>
                  <li>
                    Отказаться от исполнения договора купли-продажи и
                    потребовать возврата уплаченной за товар суммы
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <AlertCircle className="mr-2 h-6 w-6 text-pink-600" />
              Товары, не подлежащие возврату
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                В соответствии с законодательством РФ, следующие категории
                товаров не подлежат возврату или обмену:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Нижнее белье</li>
                <li>Чулочно-носочные изделия</li>
                <li>Предметы личной гигиены</li>
                <li>
                  Товары, имеющие индивидуально-определенные свойства, если они
                  могут быть использованы исключительно приобретающим их
                  потребителем
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <CheckCircle2 className="mr-2 h-6 w-6 text-pink-600" />
              Как оформить возврат
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <ol className="list-decimal pl-5 space-y-4 text-gray-600">
                <li>
                  <span className="font-medium">
                    Заполните заявление на возврат
                  </span>
                  <p>
                    Скачайте и заполните форму заявления на возврат с нашего
                    сайта или напишите заявление в свободной форме.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Свяжитесь с нами</span>
                  <p>
                    Сообщите о своем желании вернуть товар по телефону или
                    электронной почте. Наши специалисты подскажут дальнейшие
                    действия.
                  </p>
                </li>
                <li>
                  <span className="font-medium">Отправьте товар</span>
                  <p>
                    Упакуйте товар в оригинальную упаковку (по возможности) и
                    отправьте его вместе с заявлением и чеком по указанному
                    адресу.
                  </p>
                </li>
                <li>
                  <span className="font-medium">
                    Получите возврат денежных средств
                  </span>
                  <p>
                    После получения и проверки товара мы вернем вам деньги тем
                    же способом, которым была произведена оплата, в течение 10
                    дней.
                  </p>
                </li>
              </ol>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Контакты для вопросов по возврату
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Если у вас возникли вопросы по возврату или обмену товара, вы
                можете связаться с нашей службой поддержки:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">Телефон:</span> +7 (800)
                  123-45-67 (ежедневно с 9:00 до 21:00)
                </li>
                <li>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:returns@detskiy-garderob.ru"
                    className="text-pink-600 hover:underline"
                  >
                    returns@detskiy-garderob.ru
                  </a>
                </li>
                <li>
                  <span className="font-medium">Адрес для возврата:</span> г.
                  Москва, ул. Примерная, д. 123, офис 456, индекс 123456
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReturnPage;
