'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MessageCircle, Settings } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/catalog-data';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/catalog', label: 'Catalog' },
    { href: '/about', label: 'About & Lisensi' },
  ];

  return (
    <header className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 md:mb-8">
      {/* Left: Brand Logo + Navigation */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start gap-3 sm:gap-4">
        <Link
          href="/"
          className="group relative flex items-center gap-3 shrink-0 rounded-xl p-1 pr-2 transition [&:hover_.logo-default]:opacity-0 [&:hover_.logo-default]:scale-90 [&:hover_.logo-hover]:opacity-100 [&:hover_.logo-hover]:scale-100"
          title="BiruMarket Home"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
            <Image
              src="/logo/logo-1.webp"
              alt="BiruMarket Logo"
              width={44}
              height={44}
              className="logo-default w-10 h-10 object-contain transition-all duration-300"
              priority
            />
            <Image
              src="/logo/logo-2.webp"
              alt="BiruMarket Logo Active"
              width={44}
              height={44}
              className="logo-hover w-10 h-10 object-contain absolute transition-all duration-300 opacity-0 scale-90"
              priority
            />
          </div>
          <div className="leading-none">
            <span className="font-['Syne',sans-serif] font-extrabold text-base sm:text-lg text-[#0B2545] tracking-tight block">
              BiruMarket
            </span>
            <span className="font-mono text-[10px] font-medium text-slate-500 tracking-wide">
              {CONTACT_INFO.domain}
            </span>
          </div>
        </Link>

        {/* Pill Menu */}
        <nav
          aria-label="Navigasi utama"
          className="bg-white p-1 rounded-full border border-slate-200 flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar"
        >
          {navLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-[40px] px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm tracking-wide transition whitespace-nowrap flex items-center ${
                  active
                    ? 'bg-[#0B2545] text-white'
                    : 'text-slate-600 hover:text-[#0B2545] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            className={`min-h-[40px] px-3.5 py-2 rounded-full font-semibold text-xs transition whitespace-nowrap flex items-center gap-1.5 ${
              pathname === '/admin'
                ? 'bg-[#1D4ED8] text-white'
                : 'text-slate-500 hover:text-[#0B2545] hover:bg-slate-50'
            }`}
            title="Admin Backoffice"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </nav>
      </div>

      {/* Right: Direct WhatsApp CTA */}
      <div className="flex items-center justify-end gap-2.5">
        <a
          href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
            `Halo Fikri, saya ingin konsultasi produk atau custom project di BiruMarket (${CONTACT_INFO.domain}).`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-h-[44px] bg-white hover:bg-slate-50 border border-slate-200 text-[#0B2545] font-bold px-4 sm:px-5 py-2.5 rounded-full flex items-center justify-center gap-2.5 text-xs sm:text-sm transition group"
        >
          <span className="w-7 h-7 rounded-full bg-blue-50 text-[#1D4ED8] flex items-center justify-center group-hover:bg-[#1D4ED8] group-hover:text-white transition shrink-0">
            <MessageCircle className="w-3.5 h-3.5" />
          </span>
          <span>Konsultasi WA</span>
          <span className="hidden md:inline font-mono text-[11px] text-slate-500">
            {CONTACT_INFO.whatsappDisplay}
          </span>
        </a>
      </div>
    </header>
  );
}
