"use client";

import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import { useState } from "react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ProductModal, { type ProductModalMode } from "@/components/admin/ProductModal";
import { formatPrice } from "@/lib/data";
import type { ProductRow } from "@/lib/types";

interface ProductTableProps {
  products: ProductRow[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ProductModalMode>("create");
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);

  const openCreateModal = () => {
    setModalMode("create");
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: ProductRow) => {
    setModalMode("edit");
    setEditingProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest sm:text-3xl">
            Quản lý Sản phẩm
          </h1>
          <p className="mt-1 text-sm text-forest/65">
            {products.length} sản phẩm trong hệ thống
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-earth px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-earth-dark"
        >
          <Plus className="h-5 w-5" aria-hidden />
          Thêm sản phẩm mới
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-sage/25 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-sage/20 bg-page/80">
                <th className="px-4 py-3 font-semibold text-forest">ID</th>
                <th className="px-4 py-3 font-semibold text-forest">Ảnh</th>
                <th className="px-4 py-3 font-semibold text-forest">Tên</th>
                <th className="px-4 py-3 font-semibold text-forest">Giá</th>
                <th className="px-4 py-3 font-semibold text-forest">Đánh giá</th>
                <th className="px-4 py-3 font-semibold text-forest">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-forest/60"
                  >
                    Chưa có sản phẩm. Nhấn &quot;Thêm sản phẩm mới&quot; để bắt đầu.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={String(product.id)}
                    className="border-b border-sage/10 last:border-0 hover:bg-page/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-forest/70">
                      {product.id}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-sage/10">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="max-w-[200px] px-4 py-3 font-medium text-forest">
                      <span className="line-clamp-2">{product.name}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-earth">
                      {formatPrice(Number(product.price))}
                    </td>
                    <td className="px-4 py-3 text-forest/80">
                      {Number(product.rating).toFixed(1)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(product)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-sage/30 bg-page px-3 py-1.5 text-sm font-medium text-forest transition-colors hover:border-forest/30 hover:bg-sage/10"
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                          Sửa
                        </button>
                        <DeleteProductButton
                          productId={product.id}
                          productName={product.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        mode={modalMode}
        product={editingProduct}
        onClose={closeModal}
      />
    </>
  );
}
