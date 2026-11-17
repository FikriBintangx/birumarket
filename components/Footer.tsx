import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/catalog-data';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#0B2545] text-white rounded-[1.75rem] sm:rounded-[2.25rem] p-6 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/15">
        {/* Brand Identity (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="font-['Syne',sans-serif] text-xl font-extrabold tracking-tight">
              BiruMarket
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-white/10 text-blue-200 border border-white/15">
              {CONTACT_INFO.domain}
            </span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
            Marketplace source code aplikasi web, AI SaaS, PWA, dan portfolio engineering karya {CONTACT_INFO.ownerName}. Setiap produk memiliki live demo yang dapat diuji langsung sebelum serah terima.
          </p>
        </div>

        {/* Catalog Categories (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-200">
            Kategori Produk
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            <li>
              <Link href="/catalog?category=SAAS+WEB" className="hover:text-white transition">
                AI & SaaS Web
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=E-COMMERCE" className="hover:text-white transition">
                E-Commerce & PropTech
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=MOBILE+APPS" className="hover:text-white transition">
                Mobile PWA & Desktop
              </Link>
            </li>
            <li>
              <Link href="/catalog?category=SCRIPTS+%26+BOTS" className="hover:text-white transition">
                Scripts & Automation Bots
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Network (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-200">
            Kontak & Portofolio
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-mono">
            <li>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white inline-flex items-center gap-1 transition"
              >
                <span>WA: {CONTACT_INFO.whatsappDisplay}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="hover:text-white transition break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </li>
            <li className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <a
                href={CONTACT_INFO.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4"
              >
                Portfolio
              </a>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4"
              >
                GitHub
              </a>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4"
              >
                LinkedIn
              </a>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline underline-offset-4"
              >
                @biru.css
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono">
        <span>
          © 2026 {CONTACT_INFO.ownerName} · {CONTACT_INFO.domain}
        </span>
        <span>{CONTACT_INFO.location}</span>
      </div>
    </footer>
  );
}
