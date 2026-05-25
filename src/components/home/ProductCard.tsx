"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import { useCartStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sage/20 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-sage/40 hover:shadow-card-hover">
      <div className="relative aspect-square overflow-hidden bg-sage/10">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-page/90 px-2.5 py-1 text-xs font-semibold text-forest shadow-sm">
          <Star className="h-3.5 w-3.5 fill-earth text-earth" aria-hidden />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display line-clamp-2 text-lg font-semibold text-forest">
          {product.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-earth">
          {formatPrice(product.price)}
        </p>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-earth px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-earth-dark hover:shadow-md active:scale-[0.98]"
        >
          <ShoppingCart className="h-4 w-4" aria-hidden />
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
