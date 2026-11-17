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
    q: 'Apa saja yang didapatkan saat membeli lisensi Source Code?',
    a: 'Anda menerima repositori kode lengkap (frontend dan backend), file skema database (SQL / Supabase / Prisma), contoh .env.example, serta panduan instalasi agar proyek bisa langsung dijalankan di mesin lokal maupun cloud.',
  },
  {
    q: 'Apa perbedaan paket Source Code dengan paket Turnkey Deploy + Domain?',
    a: 'Paket Source Code cocok untuk developer atau tim internal yang ingin mengelola deployment sendiri. Paket Turnkey Deploy (+Rp 250.000) mencakup bantuan penuh pemasangan aplikasi ke Vercel atau VPS Anda, provisioning database Supabase/PostgreSQL, hingga menyambungkan domain kustom sampai aplikasi online.',
  },
  {
    q: 'Apakah saya bisa menguji aplikasi sebelum membeli?',
    a: 'Ya. Hampir semua produk di BiruMarket memiliki tautan Live Demo aktif yang dapat Anda buka dan klik langsung di browser sebelum menghubungi WhatsApp untuk transaksi.',
  },
  {
    q: 'Bisakah saya meminta modifikasi fitur atau integrasi payment gateway lokal?',
    a: 'Bisa. Anda dapat menggunakan formulir Tiket Permintaan Kustom di halaman beranda atau langsung berdiskusi via WhatsApp untuk penyesuaian fitur, penggantian branding, atau integrasi Tripay/Midtrans/WhatsApp Gateway.',
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <Navbar />

      <div className="space-y-8">
        {/* Top Profile & Brand Banner */}
        <section className="bg-white rounded-[1.75rem] sm:rounded-[2.25rem] border border-slate-200 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-start gap-5">
              <img
                src="/products/fikri-profile.jpg"
                alt={CONTACT_INFO.ownerName}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] block">
                  Founder &amp; Lead Engineer
                </span>
                <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] mt-1">
                  {CONTACT_INFO.ownerName}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {CONTACT_INFO.ownerRole} · {CONTACT_INFO.location}
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
                  Tentang {CONTACT_INFO.brandName} ({CONTACT_INFO.domain})
                </span>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mt-2">
                  <strong>BiruMarket</strong> adalah etalase resmi karya rekayasa perangkat lunak dari {CONTACT_INFO.ownerName}. Seluruh aplikasi web, AI SaaS (RAG &amp; voice pipeline), portal e-commerce, serta perangkat otomasi di katalog ini dibangun dengan arsitektur bersih dan siap diadaptasi untuk kebutuhan bisnis, UMKM, riset akademik, maupun proyek agensi.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Fikri, saya menghubungi dari halaman About BiruMarket (${CONTACT_INFO.domain}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp ({CONTACT_INFO.whatsappDisplay})</span>
                </a>
                <a
                  href={CONTACT_INFO.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#123663] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>fikribintang.web.id</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0B2545] text-[#0B2545] font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition"
                >
                  <Code2 className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow & License Structure */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-500 uppercase block">
              Tahap 01
            </span>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#0B2545]">
              Verifikasi Live Demo
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pilih aplikasi di katalog, buka pratinjau langsung di browser, dan periksa kesesuaian UI serta tech stack dengan target proyek Anda.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-500 uppercase block">
              Tahap 02
            </span>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#0B2545]">
              Pilih Paket Lisensi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tentukan apakah Anda cukup mengambil Source Code + Skema DB atau sekaligus layanan Turnkey Cloud Deploy ke domain pribadi.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
            <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <span className="font-mono text-[11px] font-bold text-slate-500 uppercase block">
              Tahap 03
            </span>
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#0B2545]">
              Serah Terima &amp; Panduan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Akses repositori Git atau arsip kode dikirim beserta panduan environment variable hingga sistem berjalan stabil.
            </p>
          </div>
        </section>

        {/* Product-specific FAQ */}
        <section className="bg-white rounded-[1.75rem] sm:rounded-[2.25rem] border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Pertanyaan Umum Akuisisi
              </span>
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] mt-1">
                Detail Lisensi &amp; Teknis
              </h2>
            </div>
            <Link
              href="/catalog"
              className="text-xs sm:text-sm font-bold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
            >
              <span>Kembali ke Katalog</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="divide-y divide-slate-200">
            {PRODUCT_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-1.5 font-bold text-sm sm:text-base text-[#0B2545] hover:text-[#1D4ED8] transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1D4ED8]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
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
