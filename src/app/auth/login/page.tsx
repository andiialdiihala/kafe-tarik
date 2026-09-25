"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DUMMY = { email: "admin@kafetarik.com", password: "admin123" };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DUMMY.email);
  const [password, setPassword] = useState(DUMMY.password);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DUMMY.email && password === DUMMY.password) {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Email atau password salah. Gunakan dummy di bawah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-stone-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-display font-bold text-brand-dark">Admin Login</h1>
          <p className="text-stone-500 text-sm mt-2">Selamat datang kembali, Admin.</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs">
          <p className="font-bold text-amber-800">Data Dummy:</p>
          <p className="text-amber-700 font-mono mt-1">{DUMMY.email} / {DUMMY.password}</p>
          <p className="text-amber-600 mt-1">Klik Login langsung masuk admin.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-stone-700">Password</label>
              <Link href="/auth/forgot-password" className="text-xs text-brand-dark font-medium hover:underline">Lupa Password?</Link>
            </div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition" />
          </div>
          {error && <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">{error}</p>}
          <button type="submit" className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-darker transition shadow-lg shadow-brand-dark/20">Login</button>
        </form>
      </div>
    </div>
  );
}
