import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f3] px-4 py-12">
      <LoginForm />
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-forest/70 transition-colors hover:text-earth"
      >
        ← Về trang chủ
      </Link>
    </main>
  );
}
