"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { formatPrice } from "@/lib/data";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const productHref = `/product/${product.id}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sage/20 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-sage/40 hover:shadow-card-hover">
      <Link href={productHref} className="block">
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
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={productHref} className="block">
          <h3 className="font-display line-clamp-2 text-lg font-semibold text-forest transition-colors group-hover:text-earth">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-lg font-bold text-earth">
          {formatPrice(product.price)}
        </p>
        <AddToCartButton
          product={product}
          label="Thêm vào giỏ"
          className="mt-4 w-full py-3 text-sm"
        />
      </div>
    </article>
  );
}
