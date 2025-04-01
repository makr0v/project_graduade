import React, { useState } from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  productId: string;
}

interface ProductReviewsProps {
  productId: number;
  reviews?: Review[];
}

const defaultReviews: Review[] = [
  {
    id: "review-1",
    userId: "user-1",
    userName: "Анна К.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anna",
    rating: 5,
    comment:
      "Отличный комбинезон! Материал очень мягкий и приятный к телу. Ребенку комфортно. Размер соответствует указанному.",
    date: "15.04.2023",
    helpful: 12,
    productId: "product-1",
  },
  {
    id: "review-2",
    userId: "user-2",
    userName: "Михаил Д.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail",
    rating: 4,
    comment:
      "Хорошее качество, но немного маломерит. Лучше брать на размер больше.",
    date: "03.03.2023",
    helpful: 8,
    productId: "product-1",
  },
  {
    id: "review-3",
    userId: "user-3",
    userName: "Елена В.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    rating: 5,
    comment:
      "Платье просто восхитительное! Дочка в восторге, не хочет снимать. Качество пошива отличное.",
    date: "22.05.2023",
    helpful: 15,
    productId: "product-2",
  },
  {
    id: "review-4",
    userId: "user-4",
    userName: "Сергей Н.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sergey",
    rating: 3,
    comment:
      "Куртка неплохая, но есть недочеты в швах. За эту цену ожидал лучшего качества.",
    date: "10.09.2023",
    helpful: 5,
    productId: "product-3",
  },
  {
    id: "review-5",
    userId: "user-5",
    userName: "Ольга М.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olga",
    rating: 5,
    comment:
      "Школьная форма отличного качества! Ткань не мнется, хорошо стирается. Ребенку удобно.",
    date: "01.08.2023",
    helpful: 20,
    productId: "product-4",
  },
  {
    id: "review-6",
    userId: "user-6",
    userName: "Дмитрий К.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry",
    rating: 4,
    comment:
      "Кроссовки удобные, но немного маломерят. Сыну нравятся, носит с удовольствием.",
    date: "17.06.2023",
    helpful: 7,
    productId: "product-5",
  },
  {
    id: "review-7",
    userId: "user-7",
    userName: "Наталья П.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Natalia",
    rating: 5,
    comment: "Шапка очень теплая и красивая. Размер подошел идеально.",
    date: "05.12.2023",
    helpful: 9,
    productId: "product-6",
  },
  {
    id: "review-8",
    userId: "user-8",
    userName: "Алексей Р.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexey",
    rating: 5,
    comment:
      "Пижама мягкая и приятная к телу. Дочка в восторге от рисунка. После стирки не села и не полиняла.",
    date: "20.11.2023",
    helpful: 11,
    productId: "product-7",
  },
  {
    id: "review-9",
    userId: "user-9",
    userName: "Ирина С.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Irina",
    rating: 4,
    comment:
      "Носки хорошего качества, яркие и красивые. Единственный минус - немного скользят на ламинате.",
    date: "08.10.2023",
    helpful: 6,
    productId: "product-8",
  },
];

const ProductReviews = ({
  productId,
  reviews = defaultReviews,
}: ProductReviewsProps) => {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>(
    {},
  );

  // Filter reviews for this product
  const productReviews = reviews.filter(
    (review) => +review.productId === productId,
  );

  // Calculate average rating
  const averageRating =
    productReviews.length
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) /
        productReviews.length
      : 0;

  const handleSubmitReview = () => {
    if (newReview.trim() === "") return;

    // In a real app, this would send the review to a backend
    alert(`Спасибо за ваш отзыв! Он будет опубликован после модерации.`);

    // Reset form
    setNewReview("");
    setNewRating(5);
  };

  const handleHelpfulClick = (reviewId: string) => {
    setHelpfulClicked((prev) => ({
      ...prev,
      [reviewId]: true,
    }));

    // In a real app, this would update the helpful count in the backend
  };

  return (
    <div className="w-full bg-white py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Отзывы о товаре
        </h2>

        {/* Average rating display */}
        <div className="flex items-center mb-6">
          <div className="flex items-center mr-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500 ml-2">
            ({productReviews.length} отзывов)
          </span>
        </div>

        {/* Write a review form */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4">Оставить отзыв</h3>

          <div className="mb-4">
            <p className="mb-2">Ваша оценка:</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${star <= newRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  onClick={() => setNewRating(star)}
                />
              ))}
            </div>
          </div>

          <Textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Поделитесь своими впечатлениями о товаре..."
            className="mb-4 min-h-[100px]"
          />

          <Button
            onClick={handleSubmitReview}
            className="bg-pink-600 hover:bg-pink-700"
          >
            Отправить отзыв
          </Button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {productReviews.length > 0 ? (
          productReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>
                    {review.userName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-3">{review.comment}</p>

              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 text-sm ${helpfulClicked[review.id] ? "text-pink-600" : "text-gray-500"}`}
                onClick={() => handleHelpfulClick(review.id)}
                disabled={helpfulClicked[review.id]}
              >
                <ThumbsUp className="h-4 w-4" />
                {helpfulClicked[review.id] ? "Полезно" : "Это полезно"} (
                {helpfulClicked[review.id]
                  ? review.helpful + 1
                  : review.helpful}
                )
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              У этого товара пока нет отзывов. Будьте первым, кто оставит отзыв!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
