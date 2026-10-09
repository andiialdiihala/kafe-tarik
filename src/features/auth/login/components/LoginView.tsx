"use client";

import Link from "next/link";
import { useLogin } from "../hooks/useLogin";

export function LoginView() {
  const { email, setEmail, password, setPassword, error, loading, handleLogin } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-stone-100">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-display font-bold text-brand-dark">Login Staf / Kasir</h1>
            <p className="text-stone-500 text-sm mt-2">Masuk untuk mengelola pesanan.</p>
          </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="admin@kafetarik.com"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-stone-700">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-brand-dark font-medium hover:underline">Lupa Password?</Link>
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="Masukkan password"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition"
            />
          </div>
          {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-darker transition shadow-lg shadow-brand-dark/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
          <p className="text-center text-sm text-stone-500">
            Tidak punya akun?{" "}
            <Link href="/auth/register" className="text-brand-dark font-semibold hover:underline">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
