import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Separator } from "../components/ui/separator";
import { Shield, Lock, FileText } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Политика конфиденциальности
          </h1>
          <Separator className="mb-8" />

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
            <p className="text-blue-700">
              Последнее обновление: 15 мая 2023 г. Настоящая Политика
              конфиденциальности описывает, как ООО «Детский Гардероб» собирает,
              использует и раскрывает вашу информацию при использовании нашего
              веб-сайта и услуг.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FileText className="mr-2 h-6 w-6 text-pink-600" />
              Какую информацию мы собираем
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Личная информация
                </h3>
                <p className="text-gray-600 mb-4">
                  При регистрации на сайте, оформлении заказа или подписке на
                  рассылку мы можем собирать следующую информацию:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Имя и фамилию</li>
                  <li>Контактную информацию (email, номер телефона)</li>
                  <li>Адрес доставки</li>
                  <li>
                    Информацию о платежах (при этом полные данные банковских
                    карт не хранятся на наших серверах)
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  Автоматически собираемая информация
                </h3>
                <p className="text-gray-600 mb-4">
                  При посещении нашего сайта мы автоматически собираем:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>IP-адрес</li>
                  <li>Информацию о браузере и устройстве</li>
                  <li>Данные о посещенных страницах</li>
                  <li>Время и дату посещения</li>
                  <li>Информацию о взаимодействии с сайтом</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="mr-2 h-6 w-6 text-pink-600" />
              Как мы используем вашу информацию
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Мы используем собранную информацию для следующих целей:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Обработка и доставка заказов</li>
                <li>Предоставление клиентской поддержки</li>
                <li>Улучшение нашего сайта и услуг</li>
                <li>
                  Отправка информационных и рекламных материалов (с вашего
                  согласия)
                </li>
                <li>Проведение аналитики и исследований</li>
                <li>Обеспечение безопасности и предотвращение мошенничества</li>
                <li>Выполнение наших юридических обязательств</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Lock className="mr-2 h-6 w-6 text-pink-600" />
              Защита информации
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Мы принимаем разумные меры для защиты вашей личной информации от
                несанкционированного доступа, использования или раскрытия. Мы
                используем следующие меры безопасности:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Шифрование данных при передаче (SSL/TLS)</li>
                <li>Регулярное обновление систем безопасности</li>
                <li>Ограниченный доступ к личной информации</li>
                <li>
                  Физические меры безопасности для защиты серверов и баз данных
                </li>
                <li>Регулярное тестирование систем на уязвимости</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Однако, несмотря на наши усилия, ни один метод передачи через
                Интернет или метод электронного хранения не является абсолютно
                безопасным. Поэтому мы не можем гарантировать абсолютную
                безопасность вашей информации.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Раскрытие информации третьим лицам
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Мы можем раскрывать вашу информацию следующим третьим лицам:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Службам доставки для выполнения заказов</li>
                <li>Платежным системам для обработки платежей</li>
                <li>
                  Поставщикам услуг, которые помогают нам в работе сайта и
                  обслуживании клиентов
                </li>
                <li>Государственным органам, если это требуется по закону</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Мы не продаем и не сдаем в аренду вашу личную информацию третьим
                лицам для маркетинговых целей без вашего явного согласия.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Ваши права
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                В соответствии с законодательством о защите данных, вы имеете
                следующие права:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Право на доступ к вашей личной информации</li>
                <li>Право на исправление неточной или неполной информации</li>
                <li>
                  Право на удаление вашей информации при определенных
                  обстоятельствах
                </li>
                <li>Право на ограничение обработки вашей информации</li>
                <li>Право на возражение против обработки вашей информации</li>
                <li>Право на отзыв согласия в любое время</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Для реализации этих прав, пожалуйста, свяжитесь с нами по
                указанным ниже контактам.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Контактная информация
            </h2>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-4">
                Если у вас есть вопросы или предложения относительно нашей
                Политики конфиденциальности, пожалуйста, свяжитесь с нами:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <span className="font-medium">ООО «Детский Гардероб»</span>
                </li>
                <li>
                  <span className="font-medium">Адрес:</span> г. Москва, ул.
                  Примерная, д. 123, офис 456
                </li>
                <li>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:privacy@detskiy-garderob.ru"
                    className="text-pink-600 hover:underline"
                  >
                    privacy@detskiy-garderob.ru
                  </a>
                </li>
                <li>
                  <span className="font-medium">Телефон:</span> +7 (800)
                  123-45-67
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

export default PrivacyPage;
