import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Đồi núi xanh thiên nhiên"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/50 to-forest/20"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-sage-light text-shadow-hero">
          Sản phẩm thiên nhiên organic
        </p>
        <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight text-page text-shadow-hero sm:text-5xl md:text-6xl lg:text-7xl">
          HAGA - Tinh Túy Từ Đất Mẹ
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-page/90 text-shadow-hero sm:text-xl">
          Khám phá bộ sưu tập tinh dầu, mật ong và thảo mộc được tuyển chọn từ
          vùng đất trong lành — an toàn, bền vững, trọn vẹn hương vị tự nhiên.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="#products"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-earth px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-earth-dark hover:shadow-xl"
          >
            Khám phá ngay
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center justify-center rounded-full border-2 border-page/60 px-8 py-3.5 text-base font-semibold text-page transition-all hover:border-page hover:bg-page/10"
          >
            Tìm hiểu thêm
          </Link>
        </div>
      </div>
    </section>
  );
}
