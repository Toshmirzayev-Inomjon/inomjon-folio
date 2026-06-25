"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

const BACKEND = "";

type Props = { onLogin: (token: string) => void };

export function AdminLogin({ onLogin }: Props) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Email va parolni to'ldiring.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (!res.ok || !data.access_token) {
        setError("Email yoki parol noto'g'ri.");
        return;
      }
      onLogin(data.access_token);
    } catch {
      setError("Server bilan aloqa yo'q. Backend ishlaayotganini tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white " +
    "placeholder:text-zinc-600 outline-none transition focus:border-zinc-600 focus:bg-zinc-800/60";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-sm">
        {/* Logo mark */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
            <span className="font-serif text-xl font-bold text-white">A</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Admin Panel</h1>
          <p className="mt-1.5 text-sm text-zinc-600">Portfolio boshqaruvi</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#111111] p-7 shadow-2xl">
          <div className="flex flex-col gap-3.5">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email manzili"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={inputCls}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Parol"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className={`${inputCls} pr-12`}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs font-medium text-red-400">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-100 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <>
                  Kirish <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-zinc-700">
          Faqat ruxsat etilgan foydalanuvchi uchun
        </p>
      </div>
    </div>
  );
}
