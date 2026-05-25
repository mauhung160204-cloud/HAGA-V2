import ProductCard from "@/components/home/ProductCard";
import { mapProductRow } from "@/lib/data";
import { supabase } from "@/lib/supabase";
import type { ProductRow } from "@/lib/types";

export default async function ProductGrid() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  const mappedProducts =
    products?.map((row) => mapProductRow(row as ProductRow)) ?? [];

  return (
    <section id="products" className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="mt-2 max-w-xl text-forest/70">
              Sản phẩm thiên nhiên được tuyển chọn — từ tinh dầu đến thực phẩm
              organic.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-earth transition-colors hover:text-earth-dark"
          >
            Xem tất cả →
          </a>
        </div>

        {error ? (
          <p
            className="mt-12 rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-700"
            role="alert"
          >
            Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.
            {process.env.NODE_ENV === "development" && (
              <span className="mt-2 block text-xs opacity-80">
                {error.message}
              </span>
            )}
          </p>
        ) : mappedProducts.length === 0 ? (
          <p className="mt-12 rounded-xl border border-sage/30 bg-white/60 px-4 py-6 text-center text-sm text-forest/70">
            Chưa có sản phẩm nào. Hãy thêm dữ liệu vào bảng products trên
            Supabase.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mappedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
