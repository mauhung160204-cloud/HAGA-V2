import { products } from "@/lib/data";
import ProductCard from "@/components/home/ProductCard";

export default function ProductGrid() {
  return (
    <section id="products" className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
              Sản Phẩm Nổi Bật
            </h2>
            <p className="mt-2 max-w-xl text-forest/70">
              Tuyển chọn 8 sản phẩm thiên nhiên bán chạy nhất — từ tinh dầu đến
              thực phẩm organic.
            </p>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-earth transition-colors hover:text-earth-dark"
          >
            Xem tất cả →
          </a>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
