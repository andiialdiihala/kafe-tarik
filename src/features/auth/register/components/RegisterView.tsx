"use client";

import Link from "next/link";
import { useRegister } from "../hooks/useRegister";

export function RegisterView() {
  const { email, name, setName, password, setPassword, error, loading, handleRegister } = useRegister();
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-stone-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display font-bold text-brand-dark">Registrasi Staf</h1>
          <p className="text-stone-500 text-sm mt-2">Daftar untuk akses sistem kasir.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <p className="text-sm text-stone-500">
            <span className="font-semibold text-brand-dark">{email}</span>
          </p>
          
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Nama Lengkap</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimal 8 karakter"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition"
            />
          </div>

          {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{error}</p>}
          
          <button
            disabled={loading}
            className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-darker transition shadow-lg shadow-brand-dark/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
          
          <p className="text-center text-sm text-stone-500 mt-4">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-brand-dark font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
