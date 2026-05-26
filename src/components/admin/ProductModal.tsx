"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { parseProductIdParam } from "@/lib/products";
import type { ProductRow } from "@/lib/types";

export type ProductModalMode = "create" | "edit";

interface ProductFormState {
  name: string;
  price: string;
  image_url: string;
  rating: string;
}

interface ProductModalProps {
  open: boolean;
  mode: ProductModalMode;
  product?: ProductRow | null;
  onClose: () => void;
}

const emptyForm: ProductFormState = {
  name: "",
  price: "",
  image_url: "",
  rating: "5",
};

function toFormState(product: ProductRow): ProductFormState {
  return {
    name: product.name,
    price: String(product.price),
    image_url: product.image_url,
    rating: String(product.rating),
  };
}

export default function ProductModal({
  open,
  mode,
  product,
  onClose,
}: ProductModalProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(product ? toFormState(product) : emptyForm);
  }, [open, product]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const title = mode === "create" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      image_url: form.image_url.trim(),
      rating: Number(form.rating),
    };

    if (!payload.name || !payload.image_url) {
      setError("Vui lòng nhập đầy đủ tên và link ảnh.");
      setLoading(false);
      return;
    }

    if (Number.isNaN(payload.price) || payload.price < 0) {
      setError("Giá sản phẩm không hợp lệ.");
      setLoading(false);
      return;
    }

    if (Number.isNaN(payload.rating) || payload.rating < 0 || payload.rating > 5) {
      setError("Đánh giá phải từ 0 đến 5.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    if (mode === "create") {
      const { error: insertError } = await supabase
        .from("products")
        .insert(payload);

      setLoading(false);

      if (insertError) {
        setError(insertError.message);
        return;
      }
    } else {
      if (!product) {
        setError("Không tìm thấy sản phẩm để cập nhật.");
        setLoading(false);
        return;
      }

      const id = parseProductIdParam(String(product.id));
      const { error: updateError } = await supabase
        .from("products")
        .update(payload)
        .eq("id", id);

      setLoading(false);

      if (updateError) {
        setError(updateError.message);
        return;
      }
    }

    window.alert(
      mode === "create"
        ? "Thêm sản phẩm thành công!"
        : "Cập nhật sản phẩm thành công!",
    );
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Đóng"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-sage/25 bg-page p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="product-modal-title"
            className="font-display text-xl font-bold text-forest"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-forest/60 hover:bg-sage/20 hover:text-forest"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <p
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="product-name" className="mb-1.5 block text-sm font-medium text-forest">
              Tên sản phẩm
            </label>
            <input
              id="product-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border border-sage/30 bg-white px-4 py-2.5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div>
            <label htmlFor="product-price" className="mb-1.5 block text-sm font-medium text-forest">
              Giá (VND)
            </label>
            <input
              id="product-price"
              type="number"
              min={0}
              required
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
              className="w-full rounded-xl border border-sage/30 bg-white px-4 py-2.5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div>
            <label htmlFor="product-image" className="mb-1.5 block text-sm font-medium text-forest">
              Link ảnh (image_url)
            </label>
            <input
              id="product-image"
              type="url"
              required
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              placeholder="https://..."
              className="w-full rounded-xl border border-sage/30 bg-white px-4 py-2.5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div>
            <label htmlFor="product-rating" className="mb-1.5 block text-sm font-medium text-forest">
              Đánh giá (0–5)
            </label>
            <input
              id="product-rating"
              type="number"
              min={0}
              max={5}
              step={0.1}
              required
              value={form.rating}
              onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
              className="w-full rounded-xl border border-sage/30 bg-white px-4 py-2.5 text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-forest py-3 font-semibold text-page transition-colors hover:bg-forest-light disabled:opacity-60"
            >
              {loading ? "Đang lưu…" : "Lưu sản phẩm"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-earth px-5 py-3 font-semibold text-earth transition-colors hover:bg-earth/10"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
