"use client";

import { ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store";

export type AddToCartProduct = Pick<
  Product,
  "id" | "name" | "price" | "imageUrl"
>;

interface AddToCartButtonProps {
  product: AddToCartProduct;
  label?: string;
  className?: string;
}

export default function AddToCartButton({
  product,
  label = "Thêm vào giỏ hàng",
  className = "",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleClick = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-earth px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-earth-dark hover:shadow-md active:scale-[0.98] ${className}`}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {label}
    </button>
  );
}
