import { FC, useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFilters } from "../context/FilterContext";
import {Group} from "@/entities/group.ts";

interface BannerCarouselProps {
  banners?: Group[];
}

const BannerCarousel: FC<BannerCarouselProps> = ({
  banners = [],
}) => {
  const navigate = useNavigate();
  const { setFilters } = useFilters();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBannerClick = (
    banner: (typeof banners)[0],
    e: MouseEvent,
  ) => {
    e.preventDefault();

    // Apply filters based on banner
    const newFilters: Record<string, string> = {};

    setFilters(prevState => ({
      ...prevState,
      ...newFilters
    }));

    // Navigate to home with hash to scroll to products
    navigate("/#products");

    // Scroll to products section
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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

        {/* Carousel indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {banners.map((banner, index) => (
            <div
              key={`indicator-${banner.id}`}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${activeIndex === index ? "bg-white w-4" : "bg-white/50"}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
