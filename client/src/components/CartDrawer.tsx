import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X, Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

const CartDrawer = ({
  isOpen = false,
  onClose = () => {},
  onCheckout = () => {},
}: CartDrawerProps) => {
  const { items, removeFromCart, updateQuantity, totalItems, subtotal, total } =
    useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(isOpen);
  }, [isOpen]);

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(open) => {
        setIsDrawerOpen(open);
        if (!open) onClose();
      }}
    >
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle className="text-xl font-bold">
            Корзина ({totalItems})
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 overflow-y-auto max-h-[60vh]">
          {items.length === 0 ? (
            <DrawerDescription className="text-center py-8">
              Ваша корзина пуста
            </DrawerDescription>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="text-sm text-gray-500">
                      <span>Размер: {item.size}</span>; <span>Цвет: {item.color}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="font-medium">{item.price} ₽</div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)
                        }
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DrawerFooter className="border-t">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Подытог:</span>
              <span className="font-medium">{subtotal} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span className="font-medium">
                {subtotal > 5000 ? "Бесплатно" : "300 ₽"}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Итого:</span>
              <span>{total} ₽</span>
            </div>
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              size="lg"
              onClick={onCheckout}
              disabled={items.length === 0}
            >
              Оформить заказ
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Продолжить покупки
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
