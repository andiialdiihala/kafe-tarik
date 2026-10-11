"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg> },
  { href: "/admin/orders", label: "Pesanan", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { href: "/admin/menu", label: "Menu", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" strokeLinecap="round" strokeLinejoin="round" /><line x1="6" x2="6" y1="1" y2="4" /><line x1="10" x2="10" y1="1" y2="4" /><line x1="14" x2="14" y1="1" y2="4" /></svg> },
  { href: "/admin/categories", label: "Kategori", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { href: "/admin/payments", label: "Pembayaran", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { href: "/admin/reports", label: "Laporan", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { href: "/admin/staff", label: "Staf", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { href: "/admin/settings", label: "Pengaturan", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg> },
];

export default function AdminSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />}
      {/* Sidebar */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-50 w-60 bg-[#16382b] text-white flex flex-col justify-between transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div>
          <div className="px-6 pt-6 pb-6 flex items-center justify-center">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <img
                alt="Kafe Tarik Logo"
                className="h-8 w-auto object-contain brightness-0 invert drop-shadow"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbKF5aHxMm73PFgRAtpjolRIquuse8uw33RbaZYiDZdbEkEIK6w8jERb3L85PQpFTiPpZdRDCanq5yK6HZH6QwkEgtMZFm7O9RjDz5Zlj2yBuTB1IFBWxQa0k4ltBAJcwvvXXOtLHnXquPAUEK3IyNk5dR6ygjygbBUh16g8d_IS1L8KFlkSsqCHqEbd1WyN026K8yN-WyclarBijbWCAcC59OrRN-KsagNQia33wDrYCdIf7ADoF-XW3GROlgkRY4II"
              />
            </Link>
            <button className="md:hidden p-1 text-emerald-200 hover:text-white" onClick={onClose}><X className="w-5 h-5" /></button>
          </div>
          <nav className="mt-2 px-3 space-y-1">
            {nav.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link key={n.href} href={n.href} onClick={onClose} className={`flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm ${active ? "bg-[#264d3c]" : "text-emerald-100/70 hover:bg-[#1f4738]"}`}>
                  {n.icon}
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
