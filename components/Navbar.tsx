'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/catalog-data';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { index: '00', href: '/', label: 'Beranda' },
    { index: '01', href: '/catalog', label: 'Katalog' },
    { index: '02', href: '/about', label: 'Arsitektur' },
    { index: '03', href: '/skripsi', label: 'Joki Skripsi' },
    { index: '04', href: '/admin', label: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E4E2DD]/80 bg-[#F8F7F4]/90 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-[76px] flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6 lg:gap-10 min-w-0">
          <Link
            href="/"
            className="group relative flex items-center gap-3 shrink-0 transition [&:hover_.logo-default]:opacity-0 [&:hover_.logo-default]:scale-90 [&:hover_.logo-hover]:opacity-100 [&:hover_.logo-hover]:scale-100"
            title="BiruMarket Editorial Archive"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 border border-[#E4E2DD] bg-white rounded-2xl shadow-sm">
              <Image
                src="/logo/logo-1.webp"
                alt="BiruMarket Logo"
                width={36}
                height={36}
                className="logo-default w-7 h-7 sm:w-8 sm:h-8 object-contain transition-all duration-300"
                priority
              />
              <Image
                src="/logo/logo-2.webp"
                alt="BiruMarket Logo Active"
                width={36}
                height={36}
                className="logo-hover w-7 h-7 sm:w-8 sm:h-8 object-contain absolute transition-all duration-300 opacity-0 scale-90"
                priority
              />
            </div>
            <div className="leading-none">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-[#111315] tracking-tight">
                  BiruMarket
                </span>
                <span className="hidden xl:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAE7E1] text-[#4A5056]">
                  Archive
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#767E88] tracking-normal block mt-1">
                {CONTACT_INFO.domain}
              </span>
            </div>
          </Link>

          {/* Hairline Divider */}
          <span className="hidden md:block h-6 w-px bg-[#E4E2DD]" aria-hidden="true" />

          {/* Indexed Editorial Navigation with Soft Rounded Pills */}
          <nav
            aria-label="Navigasi utama"
            className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar"
          >
            {navLinks.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 sm:px-4 py-2 text-xs sm:text-[13px] rounded-full transition whitespace-nowrap flex items-baseline gap-1.5 ${
                    active
                      ? 'bg-[#111315] text-[#F8F7F4] font-bold shadow-sm'
                      : 'text-[#5C6269] hover:text-[#111315] hover:bg-black/5 font-semibold'
                  }`}
                >
                  <span
                    className={`text-[10px] ${
                      active ? 'text-blue-300 font-bold' : 'text-[#8C929A]'
                    }`}
                  >
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Edition Spec & Direct WhatsApp Inquiry */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 border border-[#E4E2DD] bg-white/80 rounded-full text-[11px] font-semibold text-[#525860] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>10 SISTEM · 3 HALAMAN</span>
          </div>

          <a
            href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Halo Fikri, saya ingin konsultasi akuisisi produk atau custom project di BiruMarket (${CONTACT_INFO.domain}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] px-5 py-2 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] text-xs font-bold tracking-wide inline-flex items-center gap-1.5 rounded-full transition shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Konsultasi WA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
