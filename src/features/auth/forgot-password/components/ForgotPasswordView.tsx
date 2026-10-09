"use client";

import Link from 'next/link';
import { useForgotPassword } from '../hooks/useForgotPassword';

export function ForgotPasswordView() {
  const { email, setEmail, loading, error, success, handleForgot } = useForgotPassword();
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-dark">Lupa Password</h1>
          {success ? (
            <p className="text-brand-mint text-sm mt-2">Link reset telah dikirim ke email Anda.</p>
          ) : (
            <p className="text-stone-500 text-sm mt-2">Masukkan email untuk reset password.</p>
          )}
        </div>
        {!success && (
          <form onSubmit={handleForgot} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition" />
            </div>
            {error && <p className="text-rose-600 text-xs">{error}</p>}
            <button disabled={loading} className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-darker transition shadow-lg shadow-brand-dark/20">{loading ? "Mengirim..." : "Kirim Link Reset"}</button>
          </form>
        )}
        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-xs text-stone-500 hover:text-brand-dark font-medium underline">Kembali ke Login</Link>
        </div>
      </div>
    </div>
  );
}
