import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { X, User, Package, Heart, LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

const ProfileDrawer = ({
  isOpen = false,
  onClose = () => {},
  isLoggedIn = false,
  userName = "Анна Иванова",
  userEmail = "anna@example.com",
  onLogout = () => {},
}: ProfileDrawerProps) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(isOpen);
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(open) => {
        setIsDrawerOpen(open);
        if (!open) onClose();
      }}
    >
      <DrawerContent>
        <DrawerHeader className="flex justify-between items-center">
          <DrawerTitle className="text-xl font-bold">
            Личный кабинет
          </DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4">
          {!isLoggedIn ? (
            <div className="py-6 text-center">
              <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <DrawerDescription className="mb-4">
                Войдите в аккаунт, чтобы видеть историю заказов и сохранять
                избранные товары
              </DrawerDescription>
              <div className="space-y-2">
                <Button
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  onClick={() => handleNavigate("/login")}
                >
                  Войти
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigate("/register")}
                >
                  Зарегистрироваться
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{userName}</h3>
                  <p className="text-gray-500">{userEmail}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigate("/profile")}
                >
                  <User className="mr-2 h-5 w-5" />
                  Мой профиль
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigate("/orders")}
                >
                  <Package className="mr-2 h-5 w-5" />
                  Мои заказы
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigate("/favorites")}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Избранное
                </Button>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Выйти
                </Button>
              </div>
            </div>
          )}
        </div>

        <DrawerFooter>
          <Button variant="outline" className="w-full" onClick={onClose}>
            Закрыть
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
