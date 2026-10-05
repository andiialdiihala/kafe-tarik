"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth-client";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", active: true, icon: (
    <svg className="w-5 h-5 opacity-90" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
  )},
  { href: "/admin/orders", label: "Pesanan", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )},
  { href: "/admin/menu", label: "Menu", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" strokeLinecap="round" strokeLinejoin="round" /><line x1="6" x2="6" y1="1" y2="4" /><line x1="10" x2="10" y1="1" y2="4" /><line x1="14" x2="14" y1="1" y2="4" /></svg>
  )},
  { href: "/admin/categories", label: "Kategori", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )},
  { href: "/admin/payments", label: "Pembayaran", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )},
  { href: "/admin/reports", label: "Laporan", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )},
  { href: "/admin/staff", label: "Staf", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )},
  { href: "/admin/settings", label: "Pengaturan", icon: (
    <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )},
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
    router.refresh();
  };
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream font-sans antialiased text-stone-800">
      <div className="flex flex-1 w-full">
        <aside className="hidden md:flex w-60 bg-[#16382b] text-white flex-col justify-between shrink-0 min-h-screen relative z-20">
          <div>
            <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center">
              <h1 className="text-3xl font-black tracking-tight leading-none text-white lowercase" style={{ fontFamily: 'var(--font-display)', letterSpacing: "-0.02em" }}>
                kafe<br />tarik
              </h1>
              <span className="text-[10px] tracking-widest text-emerald-300/80 font-medium uppercase mt-1">est. 2025</span>
            </div>
            <nav className="mt-2 px-3 space-y-1">
              {nav.map((n) => {
                const active = pathname === n.href || pathname.startsWith(n.href + "/");
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${active ? "bg-[#264d3c] text-white shadow-sm" : "text-emerald-100/70 hover:bg-[#1f4738] hover:text-white"}`}
                  >
                    {n.icon}
                    <span>{n.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 bg-brand-cream">
          <div className="md:hidden sticky top-0 z-20 bg-[#16382b] text-white px-3 py-3 flex gap-2 overflow-x-auto border-b border-white/10">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold border transition ${active ? "bg-white text-[#16382b] border-white" : "bg-white/10 text-white/80 border-white/10"}`}
                >
                  {n.icon}
                  {n.label}
                </Link>
              );
            })}
          </div>

          <header className="bg-[#143125] text-white px-8 py-3.5 hidden md:flex items-center justify-between border-b border-[#1b3d2f] shadow-sm">
            <div className="relative w-96 max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-emerald-300/60">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input className="w-full bg-[#1b3e30] text-xs text-emerald-100 placeholder-emerald-300/50 pl-10 pr-4 py-2 rounded-lg border border-transparent focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" placeholder="Cari pesanan, menu, atau pelanggan..." type="text" />
            </div>
            <div className="flex items-center gap-5">
              <button aria-label="Notifications" className="relative text-emerald-200 hover:text-white transition-colors" type="button">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute top-0 right-0.5 w-2 h-2 bg-emerald-400 rounded-full" />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2.5 pl-2 text-left focus:outline-none" type="button">
                  <div className="w-8 h-8 rounded-full bg-white text-[#16382b] flex items-center justify-center font-bold text-xs shadow-inner">
                    <svg className="w-5 h-5 text-[#16382b]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-white leading-tight">{sessionData?.user?.name || "Admin"}</span>
                    <span className="text-[10px] text-emerald-300/70 font-normal">{sessionData?.user?.email || "Administrator"}</span>
                  </div>
                  <svg className={`w-3.5 h-3.5 text-emerald-300/60 ml-1 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {open && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-100 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-800">{sessionData?.user?.name || "Admin Kafe"}</p>
                      <p className="text-[10px] text-stone-400">{sessionData?.user?.email || "-"}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="p-4 md:p-8 max-w-7xl w-full mx-auto flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
