"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/features/cart/store/cart.store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { items } = useCartStore();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Cara Pesan", href: "/cara-pesan" },
    { name: "Tentang Kami", href: "/tentang" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className="relative z-50 w-full bg-brand-dark text-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* LOGO - KIRI */}
        <div className="flex min-w-0 items-center justify-start">
          <Link
            href="/"
            aria-label="Kafe Tarik - Beranda"
            className="flex shrink-0 items-center"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbKF5aHxMm73PFgRAtpjolRIquuse8uw33RbaZYiDZdbEkEIK6w8jERb3L85PQpFTiPpZdRDCanq5yK6HZH6QwkEgtMZFm7O9RjDz5Zlj2yBuTB1IFBWxQa0k4ltBAJcwvvXXOtLHnXquPAUEK3IyNk5dR6ygjygbBUh16g8d_IS1L8KFlkSsqCHqEbd1WyN026K8yN-WyclarBijbWCAcC59OrRN-KsagNQia33wDrYCdIf7ADoF-XW3GROlgkRY4II"
              alt="Kafe Tarik Logo"
              className="h-8 w-auto object-contain brightness-0 invert sm:h-10"
            />
          </Link>
        </div>

        {/* NAVIGASI - TEPAT DI TENGAH */}
        <nav
          aria-label="Navigasi utama"
          className="flex items-center justify-center gap-5 whitespace-nowrap lg:gap-8"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-white"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {item.name}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-mint transition-all duration-200 ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* AKSI NAVBAR - KANAN */}
        <div className="flex items-center justify-end gap-2">

          {/* KERANJANG */}
          <Link
            href="/cart"
            aria-label={`Keranjang, ${totalItems} item`}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-stone-300 transition hover:bg-white/10 hover:text-white"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>

            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-mint px-1 text-[10px] font-bold text-brand-darker">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* LOGIN ADMIN */}
          <Link
            href="/auth/login"
            className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/20 px-3 py-2.5 text-xs font-semibold text-stone-200 transition hover:bg-white/10 xl:px-5"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>

            Login Admin
          </Link>
        </div>
      </div>
    </header>
  );
};
