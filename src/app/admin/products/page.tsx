import ProductTable from "@/components/admin/ProductTable";
import { createClient } from "@/lib/supabase/server";
import type { ProductRow } from "@/lib/types";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-700">
        <h1 className="font-display text-xl font-bold">Lỗi tải dữ liệu</h1>
        <p className="mt-2 text-sm">{error.message}</p>
      </div>
    );
  }

  const products = (data ?? []) as ProductRow[];

  return <ProductTable products={products} />;
}
