import type { Product, ProductRow } from "@/lib/types";

export function mapProductRow(row: ProductRow): Product {
  return {
    id: String(row.id),
    name: row.name,
    price: Number(row.price),
    imageUrl: row.image_url,
    rating: Number(row.rating),
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
