"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/auth/messages";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<"signin" | "signup" | null>(null);

  const handleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setLoading("signin");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(null);

    if (signInError) {
      setError(getAuthErrorMessage(signInError.message));
      return;
    }

    router.push("/");
    router.refresh();
  };

  const handleSignUp = async () => {
    setError(null);
    setSuccess(null);
    setLoading("signup");

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    setLoading(null);

    if (signUpError) {
      setError(getAuthErrorMessage(signUpError.message));
      return;
    }

    setSuccess(
      "Đăng ký thành công! Kiểm tra email để xác nhận tài khoản (nếu bật xác thực email).",
    );
  };

  const isBusy = loading !== null;

  return (
    <form
      className="w-full max-w-md rounded-2xl border border-sage/25 bg-white p-8 shadow-card"
      onSubmit={(event) => event.preventDefault()}
    >
      <h1 className="font-display text-center text-2xl font-bold text-forest">
        Chào mừng đến HAGA
      </h1>
      <p className="mt-2 text-center text-sm text-forest/65">
        Đăng nhập hoặc tạo tài khoản để mua sắm thuận tiện hơn
      </p>

      {error && (
        <p
          className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          className="mt-6 rounded-lg border border-sage/40 bg-sage/10 px-4 py-3 text-sm text-forest"
          role="status"
        >
          {success}
        </p>
      )}

      <div className={`space-y-4 ${error || success ? "mt-4" : "mt-8"}`}>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-forest"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-sage/30 bg-page px-4 py-3 text-forest outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            placeholder="ban@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-forest"
          >
            Mật khẩu
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-sage/30 bg-page px-4 py-3 text-forest outline-none transition-colors focus:border-forest focus:ring-2 focus:ring-forest/20"
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={isBusy}
          onClick={handleSignIn}
          className="flex-1 rounded-xl bg-forest py-3 font-semibold text-page transition-colors hover:bg-forest-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "signin" ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
        <button
          type="button"
          disabled={isBusy}
          onClick={handleSignUp}
          className="flex-1 rounded-xl border-2 border-earth bg-transparent py-3 font-semibold text-earth transition-colors hover:bg-earth/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading === "signup" ? "Đang đăng ký…" : "Đăng ký"}
        </button>
      </div>
    </form>
  );
}
