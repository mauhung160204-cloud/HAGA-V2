export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  icon: "leaf" | "shield" | "truck" | "heart";
  title: string;
  description: string;
}

/** Kiểu dùng trong UI (camelCase) */
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
}

/** Kiểu cột bảng `products` trên Supabase (snake_case) */
export interface ProductRow {
  id: string | number;
  name: string;
  price: number;
  image_url: string;
  rating: number;
}
