import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Separator } from "../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredFaqs, setFilteredFaqs] = React.useState<any[]>([]);

  const faqs = [
    {
      category: "Заказы и доставка",
      questions: [
        {
          question: "Как отследить мой заказ?",
          answer:
            "После отправки заказа вы получите email с номером для отслеживания. Также вы можете проверить статус заказа в личном кабинете на нашем сайте или связаться с нашей службой поддержки.",
        },
        {
          question: "Сколько времени занимает доставка?",
          answer:
            "Сроки доставки зависят от вашего местоположения и выбранного способа доставки. В среднем доставка по Москве занимает 1-2 дня, по России — от 3 до 14 дней. Точные сроки указываются при оформлении заказа.",
        },
        {
          question: "Можно ли изменить адрес доставки после оформления заказа?",
          answer:
            "Да, вы можете изменить адрес доставки, если заказ еще не передан в службу доставки. Для этого свяжитесь с нашей службой поддержки как можно скорее.",
        },
        {
          question: "Доставляете ли вы за границу?",
          answer:
            "В настоящее время мы осуществляем доставку только по территории Российской Федерации. Для международной доставки, пожалуйста, свяжитесь с нашей службой поддержки для обсуждения индивидуальных условий.",
        },
      ],
    },
    {
      category: "Оплата",
      questions: [
        {
          question: "Какие способы оплаты вы принимаете?",
          answer:
            "Мы принимаем оплату банковскими картами (Visa, MasterCard, МИР), электронными кошельками (ЮMoney, WebMoney, QIWI), а также наличными при получении (для курьерской доставки и в пунктах выдачи).",
        },
        {
          question: "Безопасно ли оплачивать заказ на вашем сайте?",
          answer:
            "Да, все платежи на нашем сайте защищены. Мы используем современные технологии шифрования для защиты ваших данных. Мы не храним полные данные банковских карт на наших серверах.",
        },
        {
          question: "Когда происходит списание средств при оплате картой?",
          answer:
            "При оплате банковской картой списание средств происходит сразу после подтверждения заказа. Если товар отсутствует на складе или заказ не может быть выполнен по другим причинам, мы вернем вам полную сумму.",
        },
      ],
    },
    {
      category: "Возврат и обмен",
      questions: [
        {
          question: "Как вернуть товар?",
          answer:
            "Для возврата товара заполните заявление на возврат на нашем сайте или напишите заявление в свободной форме. Свяжитесь с нашей службой поддержки, чтобы сообщить о возврате. Упакуйте товар и отправьте его по указанному адресу вместе с заявлением и чеком.",
        },
        {
          question: "В течение какого срока можно вернуть товар?",
          answer:
            "Вы можете вернуть товар надлежащего качества в течение 14 дней с момента получения заказа. Товар ненадлежащего качества можно вернуть в течение гарантийного срока или срока годности.",
        },
        {
          question: "Как долго ждать возврата денег?",
          answer:
            "После получения и проверки возвращенного товара мы вернем вам деньги в течение 10 дней. Срок зачисления средств на ваш счет зависит от банка и может занять от 1 до 30 дней.",
        },
      ],
    },
    {
      category: "Товары и размеры",
      questions: [
        {
          question: "Как выбрать правильный размер одежды для ребенка?",
          answer:
            "На странице каждого товара есть таблица размеров с указанием возраста и роста ребенка. Для более точного подбора рекомендуем измерить рост, обхват груди и талии ребенка и сверить с нашей таблицей размеров.",
        },
        {
          question: "Из каких материалов изготовлена ваша одежда?",
          answer:
            "Мы используем преимущественно натуральные материалы: хлопок, лен, шерсть. Информация о составе материала указана в описании каждого товара. Все материалы проходят проверку на безопасность и соответствуют стандартам качества.",
        },
        {
          question: "Есть ли у вас одежда для детей с особыми потребностями?",
          answer:
            "Да, в нашем ассортименте есть специальная линейка одежды для детей с особыми потребностями. Эта одежда разработана с учетом комфорта и удобства использования. Для получения дополнительной информации, пожалуйста, свяжитесь с нашей службой поддержки.",
        },
      ],
    },
    {
      category: "Акции и скидки",
      questions: [
        {
          question: "Как узнать о текущих акциях и скидках?",
          answer:
            "Информация о текущих акциях и скидках публикуется на главной странице нашего сайта, в разделе 'Акции', а также рассылается подписчикам по email. Подпишитесь на нашу рассылку, чтобы не пропустить выгодные предложения.",
        },
        {
          question: "Можно ли использовать несколько промокодов одновременно?",
          answer:
            "Нет, к сожалению, одновременное использование нескольких промокодов невозможно. При оформлении заказа вы можете применить только один промокод.",
        },
        {
          question: "У меня есть бонусные баллы. Как их использовать?",
          answer:
            "Бонусные баллы можно использовать при оформлении заказа. На странице оформления заказа выберите опцию 'Оплатить бонусными баллами' и укажите количество баллов, которое хотите списать. 1 бонусный балл = 1 рубль.",
        },
      ],
    },
  ];

  // Flatten all FAQs for search
  const allFaqs = faqs.flatMap((category) =>
    category.questions.map((q) => ({
      ...q,
      category: category.category,
    })),
  );

  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = allFaqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term),
    );
    setFilteredFaqs(filtered);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center">
            <HelpCircle className="mr-2 h-8 w-8 text-pink-600" />
            Вопросы и ответы
          </h1>
          <Separator className="mb-8" />

          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Поиск по вопросам..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700">
                Найти
              </Button>
            </form>
          </div>

          {searchTerm.trim() !== "" && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Результаты поиска{" "}
                {filteredFaqs.length > 0
                  ? `(${filteredFaqs.length})`
                  : "(нет результатов)"}
              </h2>

              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={`search-${index}`}
                      value={`search-${index}`}
                    >
                      <AccordionTrigger className="text-left">
                        <div>
                          <div className="font-medium">{faq.question}</div>
                          <div className="text-sm text-gray-500">
                            Категория: {faq.category}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : searchTerm.trim() !== "" ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    По вашему запросу ничего не найдено. Попробуйте изменить
                    запрос или задайте вопрос нашей службе поддержки.
                  </p>
                </div>
              ) : null}
            </div>
          )}

          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={`${categoryIndex}-${faqIndex}`}
                      value={`${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-pink-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-gray-600 mb-4">
              Свяжитесь с нашей службой поддержки, и мы с радостью поможем вам
              решить любой вопрос.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700">
                Написать в поддержку
              </Button>
              <Button variant="outline">Позвонить: +7 (800) 123-45-67</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;
