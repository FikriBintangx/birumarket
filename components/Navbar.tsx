'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
      {/* Left: Logo & Pill Navigation Links */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Circular Brand Icon with Hover Swap (1.png default -> 2.png hover) */}
        <Link 
          href="/" 
          className="group relative w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center p-2 shrink-0 border border-slate-200/70 hover:border-blue-400 hover:shadow-md transition-all duration-300 overflow-hidden [&:hover_.logo-default]:opacity-0 [&:hover_.logo-default]:scale-90 [&:hover_.logo-hover]:opacity-100 [&:hover_.logo-hover]:scale-100"
          title="BiruMarket"
        >
          {/* Default Logo (1.png) */}
          <Image
            src="/logo/logo-1.webp"
            alt="BiruMarket Logo"
            width={40}
            height={40}
            className="logo-default w-8 h-8 object-contain transition-all duration-300"
            priority
          />
          {/* Hover Inverted Logo (2.png) */}
          <Image
            src="/logo/logo-2.webp"
            alt="BiruMarket Logo Active"
            width={40}
            height={40}
            className="logo-hover w-8 h-8 object-contain absolute transition-all duration-300 opacity-0 scale-90"
            priority
          />
        </Link>

        {/* Floating Pill Menu (Home, Catalog, About Us) */}
        <nav className="bg-white px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-full shadow-sm border border-slate-200/70 flex items-center gap-0.5 sm:gap-1 overflow-x-auto max-w-full">
          <Link
            href="/"
            className={`px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide transition shadow-sm whitespace-nowrap ${
              pathname === '/'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition whitespace-nowrap ${
              pathname === '/catalog'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Catalog
          </Link>
          <Link
            href="/about"
            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition whitespace-nowrap ${
              pathname === '/about'
                ? 'bg-blue-600 text-white shadow-blue-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            About us
          </Link>
        </nav>
      </div>

      {/* Right: CTA Button */}
      <div className="w-full sm:w-auto flex items-center justify-end gap-3">
        <Link
          href="https://wa.me/6281234567890?text=Halo%20Fikri,%20saya%20tertarik%20dengan%20aplikasi%20di%20BiruMarket!"
          target="_blank"
          className="bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold px-6 py-3 rounded-full flex items-center gap-3 shadow-sm text-sm transition group"
        >
          <span className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
            <Phone className="w-3.5 h-3.5" />
          </span>
          <span>Book a call with BiruMarket</span>
        </Link>

        {/* Secret Backoffice Link */}
        <Link
          href="/admin"
          className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1 rounded transition"
          title="Backoffice Admin"
        >
          ⚙️
        </Link>
      </div>
    </header>
  );
}
