"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderAuth from "@/components/layout/HeaderAuth";
import { selectTotalQuantity, useCartStore } from "@/lib/store";

const navLinks = [
  { label: "Trang chủ", href: "#" },
  { label: "Sản phẩm", href: "#products" },
  { label: "Về HAGA", href: "#about" },
  { label: "Liên hệ", href: "#contact" },
] as const;

interface HeaderClientProps {
  adminEmails: string[];
}

export default function HeaderClient({ adminEmails }: HeaderClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = useCartStore(selectTotalQuantity);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-forest/10 bg-page/80 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="HAGA logo"
            width={50}
            height={50}
            className="rounded-full object-cover ring-2 ring-sage/40"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight text-forest sm:text-2xl">
            HAGA
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Điều hướng chính"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forest/80 transition-colors hover:text-earth"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="rounded-full p-2 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest"
            aria-label="Tìm kiếm"
          >
            <Search className="h-5 w-5" />
          </button>
          <HeaderAuth adminEmails={adminEmails} />
          <button
            type="button"
            onClick={openCart}
            className="relative rounded-full p-2 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest"
            aria-label={
              totalQuantity > 0
                ? `Giỏ hàng, ${totalQuantity} sản phẩm`
                : "Giỏ hàng"
            }
          >
            <ShoppingCart className="h-5 w-5" />
            {totalQuantity > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-page"
                aria-hidden
              >
                {totalQuantity > 99 ? "99+" : totalQuantity}
              </span>
            )}
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-forest md:hidden"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-forest/10 bg-page/95 px-4 py-4 backdrop-blur-md md:hidden"
          aria-label="Menu di động"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 text-base font-medium text-forest/90 hover:text-earth"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
