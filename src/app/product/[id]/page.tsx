import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { formatPrice, mapProductRow } from "@/lib/data";
import { parseProductIdParam } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/types";

const PLACEHOLDER_DESCRIPTION =
  "Sản phẩm chiết xuất 100% từ thiên nhiên, an toàn và lành tính. Không chất bảo quản, không hương liệu nhân tạo — phù hợp cho gia đình yêu thích lối sống xanh và bền vững.";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = parseProductIdParam(id);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error || !data) {
    notFound();
  }

  const product = mapProductRow(data as ProductRow);

  return (
    <>
      <Header />
      <main className="bg-page py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#products"
            className="mb-8 inline-flex text-sm font-medium text-forest/70 transition-colors hover:text-earth"
          >
            ← Quay lại sản phẩm
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-sage/20 bg-white shadow-card">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="font-display text-3xl font-bold text-forest sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.round(product.rating)
                          ? "fill-earth text-earth"
                          : "fill-sage/30 text-sage/30"
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-forest/80">
                  {product.rating.toFixed(1)} / 5
                </span>
              </div>

              <p className="mt-6 font-display text-3xl font-bold text-earth">
                {formatPrice(product.price)}
              </p>

              <p className="mt-6 leading-relaxed text-forest/75">
                {PLACEHOLDER_DESCRIPTION}
              </p>

              <div className="mt-8">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
