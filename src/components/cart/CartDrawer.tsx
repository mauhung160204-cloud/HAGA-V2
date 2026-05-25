"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice } from "@/lib/data";
import { selectTotalPrice, useCartStore } from "@/lib/store";

export default function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const closeCart = useCartStore((state) => state.closeCart);
  const totalPrice = useCartStore(selectTotalPrice);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    alert("Chức năng thanh toán đang phát triển");
  };

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ease-in-out ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-label="Đóng giỏ hàng"
        tabIndex={isOpen ? 0 : -1}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Giỏ hàng"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#faf8f3] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-forest">
            Giỏ hàng
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full p-2 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-12 w-12 text-sage/60" aria-hidden />
              <p className="mt-4 font-medium text-forest/80">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="mt-1 text-sm text-forest/55">
                Thêm sản phẩm thiên nhiên để bắt đầu mua sắm
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl border border-sage/20 bg-white/80 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sage/10">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-semibold text-forest">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-earth">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-lg border border-sage/30 bg-page">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-l-lg p-1.5 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest"
                          aria-label={`Giảm số lượng ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2rem] px-2 text-center text-sm font-semibold text-forest">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-r-lg p-1.5 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest"
                          aria-label={`Tăng số lượng ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-full p-2 text-forest/50 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label={`Xóa ${item.name} khỏi giỏ`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-forest/10 bg-[#faf8f3] px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-forest/70">Tổng tiền</span>
            <span className="font-display text-xl font-bold text-forest">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="mt-4 w-full rounded-xl bg-earth py-3.5 text-base font-semibold text-white transition-all hover:bg-earth-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Thanh Toán
          </button>
        </footer>
      </aside>
    </div>
  );
}
