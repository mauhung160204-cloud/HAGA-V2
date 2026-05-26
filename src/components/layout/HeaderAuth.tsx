"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { truncateEmail } from "@/lib/auth/messages";
import { createClient } from "@/lib/supabase/client";

export default function HeaderAuth() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
    router.refresh();
  };

  if (loading) {
    return (
      <div
        className="h-9 w-9 animate-pulse rounded-full bg-sage/30"
        aria-hidden
      />
    );
  }

  if (!user?.email) {
    return (
      <Link
        href="/login"
        className="rounded-full p-2 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest"
        aria-label="Đăng nhập"
      >
        <User className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <span
        className="hidden max-w-[120px] truncate text-xs font-medium text-forest/80 sm:inline md:max-w-[160px] md:text-sm"
        title={user.email}
      >
        {truncateEmail(user.email)}
      </span>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
        className="rounded-full p-2 text-forest/70 transition-colors hover:bg-sage/20 hover:text-forest disabled:opacity-50"
        aria-label="Đăng xuất"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
}
