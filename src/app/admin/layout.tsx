import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-page">
      <aside className="flex w-64 shrink-0 flex-col border-r border-forest/10 bg-forest text-page">
        <div className="border-b border-page/10 px-5 py-6">
          <Link href="/admin/products" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="HAGA"
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-sage/50"
            />
            <div>
              <span className="font-display block text-lg font-semibold leading-tight">
                HAGA
              </span>
              <span className="text-xs uppercase tracking-widest text-sage-light">
                Admin
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4" aria-label="Admin">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 rounded-lg bg-page/10 px-3 py-2.5 text-sm font-medium text-page transition-colors hover:bg-page/15"
          >
            <Package className="h-4 w-4" aria-hidden />
            Quản lý Sản phẩm
          </Link>
        </nav>

        <div className="border-t border-page/10 px-5 py-4">
          <Link
            href="/"
            className="text-xs text-sage-light transition-colors hover:text-page"
          >
            ← Về cửa hàng
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
