"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { parseProductIdParam } from "@/lib/products";

interface DeleteProductButtonProps {
  productId: string | number;
  productName: string;
}

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa sản phẩm "${productName}"? Hành động này không thể hoàn tác.`,
    );
    if (!confirmed) return;

    setLoading(true);
    const supabase = createClient();
    const id = parseProductIdParam(String(productId));

    const { error } = await supabase.from("products").delete().eq("id", id);

    setLoading(false);

    if (error) {
      window.alert(`Không thể xóa sản phẩm: ${error.message}`);
      return;
    }

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:opacity-50"
      aria-label={`Xóa ${productName}`}
    >
      <Trash2 className="h-4 w-4" aria-hidden />
      {loading ? "Đang xóa…" : "Xóa"}
    </button>
  );
}
