import Link from 'next/link';

export function ResetPasswordView() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-dark">Reset Password</h1>
          <p className="text-stone-500 text-sm mt-2">Buat password baru akunmu.</p>
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password Baru</label>
            <input type="password" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">Konfirmasi Password</label>
            <input type="password" className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-brand-mint focus:border-brand-mint outline-none transition" />
          </div>
          <button className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-brand-darker transition shadow-lg shadow-brand-dark/20">Reset Password</button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/auth/login" className="text-xs text-stone-500 hover:text-brand-dark font-medium underline">Kembali ke Login</Link>
        </div>
      </div>
    </div>
  );
}
