import {FC, MouseEvent} from "react";
import { useNavigate } from "react-router-dom";
import {Group} from "@/entities";

type CategoryItemProps = Pick<Group, 'name'|'image'|'slug'>
const CategoryItem: FC<CategoryItemProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(`/category/${props.slug}`);
  };

  return (
    <a
      href={`/category/${props.slug}`}
      onClick={handleClick}
      className="flex flex-col items-center group"
    >
      <div
        className={`bg-pink-100 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 relative overflow-hidden`}
      >
        <img src={props.name} alt={props.name} className="w-14 h-14 md:w-20 md:h-20" />
      </div>
      <span className="text-sm md:text-base font-medium text-gray-800 text-center">
        {props.name}
      </span>
    </a>
  );
};

type CategorySectionProps = {
  title?: string;
  categories?: Group[];
}
const CategorySection: FC<CategorySectionProps> = ({title, categories} = {
  title: "Популярные категории",
  categories: [],
}) => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {title}
        </h2>
        { categories.length && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              name={category.name}
              image={category.image}
              slug={category.slug}
            />
          )) }
        </div> }
      </div>
    </section>
  );
};

export default CategorySection;
