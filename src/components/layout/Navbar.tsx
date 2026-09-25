"use client";
import { useState } from "react";
import { useCartStore } from "@/features/cart/store/cart.store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCartStore();
  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Cara Pesan", href: "/cara-pesan" },
    { name: "Tentang Kami", href: "/tentang" },
  ];

  return (
    <header className="bg-brand-dark text-white relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="/">
            <img alt="Kafe Tarik Logo" className="h-8 md:h-10 w-auto object-contain brightness-0 invert drop-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbKF5aHxMm73PFgRAtpjolRIquuse8uw33RbaZYiDZdbEkEIK6w8jERb3L85PQpFTiPpZdRDCanq5yK6HZH6QwkEgtMZFm7O9RjDz5Zlj2yBuTB1IFBWxQa0k4ltBAJcwvvXXOtLHnXquPAUEK3IyNk5dR6ygjygbBUh16g8d_IS1L8KFlkSsqCHqEbd1WyN026K8yN-WyclarBijbWCAcC59OrRN-KsagNQia33wDrYCdIf7ADoF-XW3GROlgkRY4II" />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} className={`relative group text-stone-300 hover:text-white transition-colors ${isActive ? "text-white" : ""}`} href={item.href}>
                {item.name}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-brand-mint transition-all ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link className="relative inline-flex p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition" href="/cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-brand-mint text-brand-darker font-bold text-[8px] rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </Link>
          <Link className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold hover:bg-white/10 transition backdrop-blur-sm text-stone-200" href="/auth/login"><svg className="w-3.5 h-3.5 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Login Admin</Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-md text-stone-300 hover:text-white hover:bg-white/10" aria-label="Toggle Menu">{isOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}</button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-darker px-6 py-4 space-y-3 border-t border-white/10">
          {navItems.map((item) => (
            <Link key={item.name} onClick={() => setIsOpen(false)} className="block text-stone-300 hover:text-white py-1" href={item.href}>{item.name}</Link>
          ))}
           <Link onClick={() => setIsOpen(false)} className="flex items-center gap-2 pt-3 mt-3 border-t border-white/10 text-brand-mint font-semibold text-sm" href="/auth/login"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>Login Admin</Link>
        </div>
      )}
    </header>
  );
};
