import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/catalog-data';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 sm:mt-28 w-full border-t border-[#E4E2DD] bg-[#111315] text-[#F8F7F4]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        {/* Top Editorial Masthead Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Colophon & Identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-['Syne',sans-serif] text-2xl font-extrabold tracking-tight text-white">
                BiruMarket
              </span>
              <span className="font-mono text-[11px] px-2.5 py-0.5 bg-white/10 text-white/80 border border-white/15">
                {CONTACT_INFO.domain}
              </span>
            </div>
            <p className="font-serif-editorial italic text-xl sm:text-2xl text-white/85 leading-snug max-w-md">
              Curated repository of 3-page web architectures, touch POS terminals, and SaaS systems.
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md">
              Dirancang dan dikembangkan oleh {CONTACT_INFO.ownerName}. Setiap sistem hadir utuh dengan halaman etalase produk, terminal operasional, dan monitor backoffice yang dapat diuji langsung.
            </p>
          </div>

          {/* Index & Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/50">
              01 / Direktori Sistem
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/80">
              <li>
                <Link
                  href="/catalog?category=POS+DASHBOARD"
                  className="hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] text-white/40">01.A</span>
                  <span>POS Dashboards (5 Sistem)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=SAAS+WEB"
                  className="hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] text-white/40">01.B</span>
                  <span>SaaS &amp; Web Applications</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=E-COMMERCE"
                  className="hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] text-white/40">01.C</span>
                  <span>Clinical &amp; Service Portals</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=SCRIPTS+%26+BOTS"
                  className="hover:text-white transition inline-flex items-center gap-1.5"
                >
                  <span className="font-mono text-[10px] text-white/40">01.D</span>
                  <span>Legal &amp; Document Generators</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Colophon (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-white/50">
              02 / Komisaris &amp; Kontak Langsung
            </h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-white/80 font-mono">
              <div>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1.5 transition"
                >
                  <span>WHATSAPP: {CONTACT_INFO.whatsappDisplay}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-2 text-xs">
                <a
                  href={CONTACT_INFO.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline underline-offset-4"
                >
                  fikribintang.web.id
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
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Archival Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-white/50 font-mono">
          <span>
            © 2026 {CONTACT_INFO.ownerName} · {CONTACT_INFO.domain} · ALL RIGHTS RESERVED
          </span>
          <span>EDISI ARSIP 2026 · {CONTACT_INFO.location.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
