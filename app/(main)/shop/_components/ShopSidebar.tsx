'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@prisma/client';
import { Button } from '@/components/ui/button';

const Sidebar = ({ categories = [] }:{categories:Category[]}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  useEffect(() => {
    // Extract filter values from URL search parameters
    const categoriesParam = searchParams.get('category');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const ratingParam = searchParams.get('rating');

    if (categoriesParam) setSelectedCategory(categoriesParam);
    if (minPriceParam) setMinPrice(Number(minPriceParam));
    if (maxPriceParam) setMaxPrice(Number(maxPriceParam));
    if (ratingParam) setSelectedRating(Number(ratingParam));
  }, [searchParams]);

  const updateSearchParams = (params:any) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value.toString());
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`${window.location.pathname}?${newSearchParams.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateSearchParams({ category:category });
  };

  const handleMinPriceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    updateSearchParams({ minPrice: value });
  };

  const handleMaxPriceChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    updateSearchParams({ maxPrice: value });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    updateSearchParams({ rating });
  };

  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center mb-2">
            <Checkbox
              id={category.id}
              checked={category.name === selectedCategory}
              onCheckedChange={() => handleCategoryChange(category.name)}
            />
            <Label htmlFor={category.name} className="ml-2 text-gray-900 dark:text-gray-100">
              {category.name}
            </Label>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price</h3>
        <div className="mb-2">
          <Label htmlFor="minPrice" className="block text-sm text-gray-900 dark:text-gray-100 mb-1">
            Min Price
          </Label>
          <Input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-full"
            placeholder="Min"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="maxPrice" className="block text-sm text-gray-900 dark:text-gray-100 mb-1">
            Max Price
          </Label>
          <Input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-full"
            placeholder="Max"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Rating</h3>
        <RadioGroup value={selectedRating.toString()} onValueChange={(value) => handleRatingChange(Number(value))}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <div key={rating} className="flex items-center mb-2">
              <RadioGroupItem
                id={`rating-${rating}`}
                value={rating.toString()}
                className="form-radio"
              />
              <Label htmlFor={`rating-${rating}`} className="ml-2 text-gray-900 dark:text-gray-100">
                {rating} & Up
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <Button className='w-full' onClick={() => router.push('/shop')} variant={'outline'}>Reset filter</Button>
      </div>
    </div>
  );
};

export default Sidebar;
