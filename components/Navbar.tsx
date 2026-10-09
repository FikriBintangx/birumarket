'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
      {/* Left: Logo & Pill Navigation Links */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Circular Brand Icon */}
        <Link href="/" className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center p-2 shrink-0 border border-slate-200/70 hover:scale-105 transition">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="38" fill="none" stroke="url(#logoGrad)" strokeWidth="14" strokeLinecap="round" strokeDasharray="190" strokeDashoffset="40" />
            <circle cx="50" cy="50" r="14" fill="#2563EB" />
          </svg>
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
