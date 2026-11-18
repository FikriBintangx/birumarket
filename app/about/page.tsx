'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/catalog-data';
import {
  ArrowUpRight,
  Globe,
  MessageCircle,
  Code2,
  Database,
  Server,
  ChevronDown,
} from 'lucide-react';

const PRODUCT_FAQS = [
  {
    q: 'Apa saja yang didapatkan saat mengakuisisi lisensi Source Code?',
    a: 'Anda menerima repositori kode utuh 3 halaman (Storefront Katalog, Terminal POS/Studio Utama, dan Monitor Backoffice), file skema database (SQL / Supabase PostgreSQL), contoh konfigurasi .env.example, serta panduan instalasi lokal maupun cloud.',
  },
  {
    q: 'Apa perbedaan paket Source Code dengan paket Turnkey Deploy + Domain?',
    a: 'Paket Source Code ditujukan bagi engineer atau tim internal yang ingin mengelola deployment secara mandiri. Paket Turnkey Deploy (+Rp 250.000) mencakup instalasi penuh ke Vercel atau VPS Anda, provisioning database Supabase/PostgreSQL, hingga penyambungan domain kustom sampai aplikasi siap diakses publik.',
  },
  {
    q: 'Apakah saya bisa menguji ke-3 halaman setiap produk sebelum membeli?',
    a: 'Ya. Seluruh 10 produk di BiruMarket memiliki Live Demo interaktif yang dapat Anda uji langsung di browser (Halaman 01 Storefront, Halaman 02 POS/Studio, dan Halaman 03 Backoffice) sebelum menghubungi WhatsApp.',
  },
  {
    q: 'Bisakah saya memesan kustomisasi fitur atau integrasi payment gateway lokal?',
    a: 'Tentu. Gunakan formulir Tiket Komisi di beranda atau hubungi langsung melalui WhatsApp untuk penyesuaian identitas brand, penambahan modul, maupun integrasi QRIS/Midtrans/Tripay dan printer termal.',
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#111315]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-14">
        {/* Top Editorial Profile & Brand Colophon */}
        <section className="bg-white border border-[#111315] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-5 border-b lg:border-b-0 lg:border-r border-[#E4E2DD] pb-6 lg:pb-0 lg:pr-8">
              <img
                src="/products/fikri-profile.jpg"
                alt={CONTACT_INFO.ownerName}
                className="w-28 h-28 sm:w-32 sm:h-32 object-cover border border-[#111315] shrink-0"
              />
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] block">
                  Founder &amp; Principal Engineer
                </span>
                <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#111315] mt-1">
                  {CONTACT_INFO.ownerName}
                </h1>
                <p className="font-mono text-xs text-[#525860] mt-1">
                  {CONTACT_INFO.ownerRole} · {CONTACT_INFO.location}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#687078] block">
                  01 / Arsitektur &amp; Manifesto Produk ({CONTACT_INFO.domain})
                </span>
                <h2 className="font-['Syne',sans-serif] text-2xl sm:text-4xl font-extrabold text-[#111315] tracking-tight">
                  Rekayasa Sistem Web Utuh,{' '}
                  <span className="font-serif-editorial italic font-normal text-3xl sm:text-4xl text-[#525860]">
                    bukan sekadar template.
                  </span>
                </h2>
                <p className="text-[#3B4046] text-sm sm:text-base leading-relaxed pt-1">
                  <strong>BiruMarket</strong> adalah direktori produk digital dan source code karya{' '}
                  {CONTACT_INFO.ownerName}. Setiap sistem dibangun dengan standar arsitektur 3 halaman penuh: halaman depan etalase produk, ruang kerja operasional (POS atau aplikasi SaaS), serta layar pemantauan backoffice.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-xs font-semibold">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Fikri, saya menghubungi dari halaman Arsitektur BiruMarket (${CONTACT_INFO.domain}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-5 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] inline-flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                </a>
                <a
                  href={CONTACT_INFO.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-5 py-2.5 bg-[#F8F7F4] hover:bg-[#ECEAE4] border border-[#D5D2CA] text-[#111315] inline-flex items-center gap-2 transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>fikribintang.web.id</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] px-5 py-2.5 bg-white border border-[#D5D2CA] hover:border-[#111315] text-[#111315] inline-flex items-center gap-2 transition"
                >
                  <Code2 className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow & License Structure */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E4E2DD] p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase block">
              Tahap 01
            </span>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#111315]">
              Inspeksi Live Demo 3 Halaman
            </h2>
            <p className="text-xs sm:text-sm text-[#525860] leading-relaxed">
              Pilih sistem di katalog, uji alur Storefront, POS/Studio, dan Backoffice secara langsung di browser untuk memastikan kesesuaian dengan kebutuhan operasional Anda.
            </p>
          </div>

          <div className="bg-white border border-[#E4E2DD] p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase block">
              Tahap 02
            </span>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#111315]">
              Pilih Cakupan Lisensi
            </h2>
            <p className="text-xs sm:text-sm text-[#525860] leading-relaxed">
              Tentukan apakah tim Anda mengambil paket Source Code + Skema Database, atau menambahkan opsi Turnkey Cloud Deploy ke domain bisnis Anda.
            </p>
          </div>

          <div className="bg-white border border-[#E4E2DD] p-6 sm:p-7 space-y-3">
            <div className="w-10 h-10 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase block">
              Tahap 03
            </span>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#111315]">
              Serah Terima Repositori
            </h2>
            <p className="text-xs sm:text-sm text-[#525860] leading-relaxed">
              Akses repositori Git atau paket arsip kode dikirim beserta dokumentasi environment variable hingga sistem siap digunakan di produksi.
            </p>
          </div>
        </section>

        {/* Product-specific FAQ */}
        <section className="bg-white border border-[#E4E2DD] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E4E2DD] pb-5">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                02 / Dokumentasi &amp; Tanya Jawab
              </span>
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#111315] mt-1">
                Ketentuan Lisensi &amp; Serah Terima
              </h2>
            </div>
            <Link
              href="/catalog"
              className="font-mono text-xs font-semibold text-[#111315] hover:text-[#1D4ED8] underline underline-offset-4 inline-flex items-center gap-1"
            >
              <span>Buka Direktori Katalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-[#E4E2DD]">
            {PRODUCT_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-1.5 font-['Syne',sans-serif] font-bold text-sm sm:text-base text-[#111315] hover:text-[#1D4ED8] transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1D4ED8]' : 'text-[#8C929A]'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-[#525860] leading-relaxed pr-6">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
