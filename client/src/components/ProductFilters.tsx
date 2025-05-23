import React, { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFilters } from "../context/FilterContext";

const ProductFilters = () => {
  const { options, filters, setFilters, setIsFiltersApplied } = useFilters();
  const [minPriceInput, setMinPriceInput] = useState(filters.priceRange[0].toString());
  const [maxPriceInput, setMaxPriceInput] = useState(filters.priceRange[1].toString());

  // Синхронизируем значения инпутов при изменении фильтров извне
  useEffect(() => {
    setMinPriceInput(filters.priceRange[0].toString());
    setMaxPriceInput(filters.priceRange[1].toString());
  }, [filters.priceRange]);

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
    const [min, max] = value;
    setMinPriceInput(min.toString());
    setMaxPriceInput(max.toString());
    setFilters(prevState => ({
      ...prevState,
      priceRange: [min, max] as [number, number],
    }));
  };

  const handleMinPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPriceInput(value);
    if (value === '') return;
    
    const numValue = Math.max(0, parseInt(value));
    if (!isNaN(numValue)) {
      setFilters(prevState => ({
        ...prevState,
        priceRange: [
          Math.min(numValue, prevState.priceRange[1]), 
          prevState.priceRange[1]
        ] as [number, number],
      }));
    }
  };

  const handleMaxPriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPriceInput(value);
    if (value === '') return;
    
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setFilters(prevState => ({
        ...prevState,
        priceRange: [
          prevState.priceRange[0],
          Math.max(numValue, prevState.priceRange[0])
        ] as [number, number],
      }));
    }
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    setFilters(prevState => ({
      ...prevState,
      sizes: checked
          ? [...filters.sizes, size]
          : filters.sizes.filter((s) => s !== size)
    }));
  };

  const handleApplyFilters = () => {
    // Убедимся, что минимальная цена не больше максимальной
    const minPrice = Math.min(parseInt(minPriceInput), parseInt(maxPriceInput));
    const maxPrice = Math.max(parseInt(minPriceInput), parseInt(maxPriceInput));
    
    setFilters(prevState => ({
      ...prevState,
      priceRange: [minPrice, maxPrice] as [number, number],
    }));
    setIsFiltersApplied(true);
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
              <SelectItem value="all">Все возрасты</SelectItem>
              {options.ages.map(age => (
                <SelectItem key={age} value={age}>{age}</SelectItem>
              ))}
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
              <SelectItem value="all">Все сезоны</SelectItem>
              {options.seasons.map(season => (
                <SelectItem key={season} value={season}>{season}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Цена
          </label>
          <div className="flex gap-2 mb-2">
            <Input
              type="number"
              value={minPriceInput}
              onChange={handleMinPriceInput}
              min={options.priceRange[0]}
              max={filters.priceRange[1]}
              placeholder="От"
              className="w-1/2"
            />
            <Input
              type="number"
              value={maxPriceInput}
              onChange={handleMaxPriceInput}
              min={filters.priceRange[0]}
              max={options.priceRange[1]}
              placeholder="До"
              className="w-1/2"
            />
          </div>
          <Slider
            value={[filters.priceRange[0], filters.priceRange[1]]}
            max={options.priceRange[1]}
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

      {/* Apply Filters Button */}
      <div className="mt-4 flex justify-end">
        <Button onClick={handleApplyFilters} className="bg-pink-600 hover:bg-pink-700 text-white">
          Применить фильтры
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;
