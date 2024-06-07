import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderItem as CartItemType, Color, Size } from "@prisma/client";
import { FC, useEffect, useState } from "react";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem: FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(item.size || null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(
    item.color || null
  );



  return (
    <div className="flex py-6 border-b dark:border-b-gray-800">
      <div className="shrink-0 relative w-24 h-24">
        <Image
          src={item.productVariant.image?.url || "/placeholder-image.jpg"}
          alt={product?.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between text-base font-medium text-gray-900 dark:text-white">
          <h3>{product?.name}</h3>
          <Button
            type="button"
            variant={"ghost"}
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between pt-2">
          <div className="grid gap-1.5 w-full sm:w-auto sm:flex-1">
            <Select
              value={selectedSize?.value}
              onValueChange={(value) => setSelectedSize(value)}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {product?.size?.map((size) => (
                  <SelectItem key={size.value} value={size}>
                    {size.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedColor?.value}
              onValueChange={(value) => setSelectedColor(value)}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {product?.color?.map((color) => (
                  <SelectItem key={color.value} value={color}>
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-gray-900 dark:text-white">
            {formatCurrency(item.productVariant.price)}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Quantity:
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.quantity - 1)} disabled={item.quantity === 1}>-</Button>
            <span className="text-sm text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.quantity + 1)}>+</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

