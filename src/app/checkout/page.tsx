"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// Chú ý: Hãy sửa lại đường dẫn useCart nếu file store của bạn nằm ở vị trí khác
import { useCart } from "@/store/useCart"; 
import { createBrowserClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    customer_name: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Tính tổng tiền giỏ hàng
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsLoading(true);
    const supabase = createBrowserClient();

    try {
      // 1. Lưu thông tin đơn hàng vào bảng orders
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: formData.customer_name,
            phone: formData.phone,
            address: formData.address,
            total_price: totalPrice,
          },
        ])
        .select("id")
        .single();

      if (orderError) throw orderError;

      // 2. Chuẩn bị dữ liệu chi tiết đơn hàng
      const orderItemsData = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      // 3. Lưu vào bảng order_items
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);

      if (itemsError) throw itemsError;

      // 4. Thành công -> Xóa giỏ hàng và chuyển hướng
      alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại LALA FISH.");
      clearCart();
      router.push("/");
      router.refresh();

    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Giao diện khi giỏ hàng trống
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 text-emerald-900">Giỏ hàng của bạn đang trống</h1>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 transition-colors"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  // Giao diện thanh toán
  return (
    <div className="min-h-screen bg-[#faf8f3] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">Thanh toán</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cột trái: Form thông tin */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
            <h2 className="text-xl font-semibold mb-4 text-emerald-800">Thông tin giao hàng</h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  name="customer_name"
                  required
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nhập họ và tên..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nhập số điện thoại..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ chi tiết</label>
                <textarea
                  name="address"
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nhập địa chỉ nhận hàng..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 px-6 py-3 bg-emerald-700 text-white font-semibold rounded-md hover:bg-emerald-800 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </button>
            </form>
          </div>

          {/* Cột phải: Tổng quan đơn hàng */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-emerald-800">Tổng quan đơn hàng</h2>
            <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  {item.image_url && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-orange-700">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t flex justify-between items-center text-xl font-bold text-emerald-900">
              <span>Tổng cộng:</span>
              <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}