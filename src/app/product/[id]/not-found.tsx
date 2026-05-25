import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ProductNotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center bg-page px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-forest">
          Không tìm thấy sản phẩm
        </h1>
        <p className="mt-4 max-w-md text-forest/70">
          Sản phẩm bạn tìm có thể đã bị gỡ hoặc đường dẫn không hợp lệ.
        </p>
        <Link
          href="/#products"
          className="mt-8 rounded-xl bg-earth px-6 py-3 font-semibold text-white transition-colors hover:bg-earth-dark"
        >
          Xem tất cả sản phẩm
        </Link>
      </main>
      <Footer />
    </>
  );
}
