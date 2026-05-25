/** Chuẩn hóa `id` từ URL cho truy vấn Supabase (cột id số hoặc chuỗi). */
export function parseProductIdParam(id: string): string | number {
  const numericId = Number(id);
  if (!Number.isNaN(numericId) && String(numericId) === id) {
    return numericId;
  }
  return id;
}
