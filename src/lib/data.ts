export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Tinh dầu Bạc Hà Hữu Cơ",
    price: 189000,
    imageUrl:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Mật Ong Rừng U Minh",
    price: 320000,
    imageUrl:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Trà Xanh Shan Tuyết",
    price: 245000,
    imageUrl:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9de35?w=600&h=600&fit=crop",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Tinh bột Nghệ Vàng",
    price: 156000,
    imageUrl:
      "https://images.unsplash.com/photo-1615485500908-99c6240898be?w=600&h=600&fit=crop",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Dầu Dừa Nguyên Chất",
    price: 98000,
    imageUrl:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
    rating: 4.8,
  },
  {
    id: "6",
    name: "Muối Hồng Himalaya",
    price: 75000,
    imageUrl:
      "https://images.unsplash.com/photo-1609501676725-e2123a8b8d6e?w=600&h=600&fit=crop",
    rating: 4.5,
  },
  {
    id: "7",
    name: "Sữa Rửa Mặt Trà Xanh",
    price: 210000,
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Tinh dầu Lavender",
    price: 175000,
    imageUrl:
      "https://images.unsplash.com/photo-1596755389378-c5c7fd0d5e46?w=600&h=600&fit=crop",
    rating: 4.9,
  },
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
