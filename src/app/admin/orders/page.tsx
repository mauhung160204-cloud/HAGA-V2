"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const supabase = createBrowserClient();

  useEffect(() => {
    const fetchOrders = async () => {
      // Lấy toàn bộ đơn hàng từ Supabase, sắp xếp đơn mới nhất lên đầu
      const { data } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (data) setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-emerald-900 mb-8">Quản lý Đơn Hàng</h1>
      <div className="bg-white rounded-lg shadow-sm border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50 border-b border-emerald-100">
                <th className="p-4 font-semibold text-emerald-900 whitespace-nowrap">Mã đơn</th>
                <th className="p-4 font-semibold text-emerald-900 whitespace-nowrap">Khách hàng</th>
                <th className="p-4 font-semibold text-emerald-900 whitespace-nowrap">Số điện thoại</th>
                <th className="p-4 font-semibold text-emerald-900 min-w-[200px]">Địa chỉ</th>
                <th className="p-4 font-semibold text-emerald-900 whitespace-nowrap">Tổng tiền</th>
                <th className="p-4 font-semibold text-emerald-900 whitespace-nowrap">Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Chưa có đơn hàng nào
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-mono text-gray-500">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="p-4 font-medium text-gray-900">{order.customer_name}</td>
                    <td className="p-4 text-gray-700">{order.phone}</td>
                    <td className="p-4 text-sm text-gray-600">{order.address}</td>
                    <td className="p-4 text-orange-700 font-bold whitespace-nowrap">
                      {Number(order.total_price).toLocaleString("vi-VN")}đ
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}