import React from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFilters } from "../context/FilterContext";

const ProductFilters = () => {
  const { options, filters, setFilters } = useFilters();

  const handleAgeChange = (value: string) => {
    setFilters(prevState => ({
      ...prevState,
      age: value
    }));
  };
  const handleSeasonChange = (value: string) => {
    setFilters(prevState => ({
      ...prevState,
      season: value
    }));
  };
  const handlePriceChange = (value: number[]) => {
    setFilters(prevState => ({
      ...prevState,
      priceRange: [value[0], value[1]] as [number, number],
    }));
  };
  const handleSizeChange = (size: string, checked: boolean) => {
    setFilters(prevState => ({
      ...prevState,
      sizes: checked
          ? [...filters.sizes, size]
          : filters.sizes.filter((s) => s !== size)
    }));
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Age Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Возраст
          </label>
          <Select value={filters.age} onValueChange={handleAgeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите возраст" />
            </SelectTrigger>
            <SelectContent>
              {options.ages.map(age => {
                return <SelectItem value={age}>{age}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Season Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Сезон
          </label>
          <Select value={filters.season} onValueChange={handleSeasonChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите сезон" />
            </SelectTrigger>
            <SelectContent>
              {options.seasons.map(season => {
                return <SelectItem value={season}>{season}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Цена: {filters.priceRange[0]} ₽ - {filters.priceRange[1]} ₽
          </label>
          <Slider
            value={[options.priceRange[0], options.priceRange[1]]}
            max={options.priceRange[0]}
            min={options.priceRange[0]}
            step={100}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>

        {/* Size Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Размер
          </label>
          <div className="grid grid-cols-4 gap-2">
            {options.sizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox
                  id={`size-${size}`}
                  checked={filters.sizes.includes(size)}
                  onCheckedChange={(checked) => handleSizeChange(size, checked === true)}
                />
                <label
                  htmlFor={`size-${size}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
