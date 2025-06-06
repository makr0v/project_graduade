import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Group } from "@/entities";

interface BannerCarouselProps {
  banners: Group[];
}

const BannerCarousel: FC<BannerCarouselProps> = ({
  banners = [],
}) => {
  const navigate = useNavigate();

  const handleBannerClick = (banner: Group, e: React.MouseEvent) => {
    e.preventDefault();
    if (banner.variant === 'collection') {
      navigate(`/collection/${banner.slug}`);
    } else if (banner.variant === 'category') {
      navigate(`/category/${banner.slug}`);
    }
  };

  if (!banners.length) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white">
      <Carousel
        className="relative"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
                <img
                  src={banner.image}
                  alt={banner.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {banner.name}
                  </h2>
                  <p className="text-white text-lg mb-4 max-w-md">
                    {banner.description}
                  </p>
                  <Button
                    className="w-fit bg-primary hover:bg-primary/90 text-white"
                    onClick={(e) => handleBannerClick(banner, e)}
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/80 hover:bg-white">
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext className="right-4 bg-white/80 hover:bg-white">
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
