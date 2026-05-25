import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import CartDrawer from "@/components/cart/CartDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HAGA - Tinh Túy Từ Đất Mẹ",
  description:
    "Sản phẩm thiên nhiên organic — tinh dầu, mật ong, trà xanh và chăm sóc cơ thể từ nguồn gốc bền vững.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page font-sans text-forest">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
