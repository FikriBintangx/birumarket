'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  Code2,
  Check,
  MessageCircle,
  Layers,
  Server,
  FileCode2,
  ArrowUpRight,
} from 'lucide-react';
import {
  ProductItem,
  TURNKEY_DEPLOY_FEE,
  buildWhatsAppOrderUrl,
} from '@/lib/catalog-data';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const [licenseType, setLicenseType] = useState<'source' | 'turnkey'>('source');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setLicenseType('source');
    setActiveImageIdx(0);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const images =
    product.preview_images && product.preview_images.length > 0
      ? product.preview_images
      : [product.thumbnail_url];
  const currentImage = images[activeImageIdx] || product.thumbnail_url;

  const computedPrice = product.is_portfolio
    ? 0
    : licenseType === 'turnkey'
      ? product.price + TURNKEY_DEPLOY_FEE
      : product.price;

  const waUrl = buildWhatsAppOrderUrl(product, licenseType);
  const demoBase = product.demo_url || `/demo/${product.slug}`;

  const pages = product.pages || [
    {
      pageNumber: 1 as const,
      label: '01 · Storefront',
      title: 'Katalog & Preview Produk Visual',
      summary: 'Halaman depan website dengan daftar produk, filter kategori, dan modal spesifikasi.',
    },
    {
      pageNumber: 2 as const,
      label: '02 · POS / Studio',
      title: 'Terminal Operasional Interaktif',
      summary: 'Ruang kerja utama aplikasi untuk transaksi kasir atau pemrosesan data.',
    },
    {
      pageNumber: 3 as const,
      label: '03 · Backoffice',
      title: 'Monitor Antrean, Inventaris & Laporan',
      summary: 'Halaman kontrol backoffice untuk memantau status pesanan dan metrik bisnis.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111315]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Archival Specification Sheet with Soft Rounded Aesthetic */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-[#F8F7F4] border border-[#111315]/20 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden">
        {/* Top Metadata Bar */}
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b border-[#E4E2DD] bg-white shrink-0">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="font-extrabold uppercase tracking-wider px-3 py-1 bg-[#111315] text-[#F8F7F4] rounded-full">
              {product.sku || 'BM-APP'}
            </span>
            <span className="font-bold uppercase tracking-wider px-3 py-1 border border-[#E4E2DD] bg-[#F8F7F4] text-[#111315] rounded-full">
              {product.category}
            </span>
            <span className="font-bold uppercase tracking-wider px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200 rounded-full">
              3-Page Web Architecture
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 border border-[#E4E2DD] bg-white text-[#111315] hover:bg-[#111315] hover:text-white rounded-full flex items-center justify-center transition shrink-0 shadow-sm"
            aria-label="Tutup detail produk"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header & Title */}
          <div className="space-y-2">
            <h2
              id="modal-product-title"
              className="text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight leading-tight"
            >
              {product.title.replace(/\s*\(3 Halaman\)/gi, '')}
            </h2>
            <p className="text-[#525860] text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
              {product.tagline || product.description}
            </p>
          </div>

          {/* Browser-Framed Visual Preview Stage */}
          <div className="space-y-3">
            <div className="border border-[#E4E2DD] bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="h-9 px-4 border-b border-[#E4E2DD] bg-[#F3F1EC] flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
                </div>
                <span className="text-xs font-semibold text-[#525860] truncate">
                  {demoBase.startsWith('http') ? demoBase : `https://birumarket.web.id${demoBase}`}
                </span>
                <a
                  href={demoBase}
                  target={demoBase.startsWith('http') ? '_blank' : undefined}
                  rel={demoBase.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-xs font-bold uppercase text-[#1D4ED8] hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  <span>Fullscreen</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative w-full aspect-[16/9] bg-[#111315] overflow-hidden">
                <img
                  src={currentImage}
                  alt={product.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/products/shot-pos-kuro.png';
                  }}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-22 h-14 rounded-xl overflow-hidden border transition shrink-0 ${
                      activeImageIdx === idx
                        ? 'border-[#111315] ring-2 ring-[#111315]'
                        : 'border-[#E4E2DD] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3-Page Architecture Quick-Jump Index */}
          <div className="bg-white border border-[#E4E2DD] rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E2DD] pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#111315]">
                Indeks Arsitektur 3 Halaman · Klik untuk Uji Langsung
              </span>
              <Link
                href={demoBase}
                className="text-xs font-bold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
              >
                <span>Buka Mode Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pages.map((pg, i) => (
                <div
                  key={pg.pageNumber}
                  className="p-5 bg-[#F8F7F4] border border-[#E4E2DD] rounded-2xl flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                      0{i + 1} / {pg.label.replace(/^Halaman \d+ · /i, '')}
                    </span>
                    <div className="font-bold text-sm text-[#111315] leading-snug">
                      {pg.title}
                    </div>
                    <p className="text-xs text-[#525860] leading-relaxed font-medium">
                      {pg.summary}
                    </p>
                  </div>
                  <Link
                    href={`${demoBase}?page=${pg.pageNumber}`}
                    className="w-full py-2.5 px-3 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] text-xs font-bold text-center rounded-full transition inline-flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Uji Halaman 0{pg.pageNumber}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Main 12-Col Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Left Specs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#687078] mb-2">
                  01 / Deskripsi Sistem
                </h3>
                <p className="text-sm text-[#262A2E] leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-[#E4E2DD] rounded-2xl shadow-sm">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#687078] block mb-1.5">
                    Tantangan Operasional
                  </span>
                  <p className="text-xs sm:text-sm text-[#262A2E] leading-relaxed font-medium">
                    {product.problem}
                  </p>
                </div>

                <div className="p-5 bg-white border border-[#111315] rounded-2xl shadow-sm">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block mb-1.5">
                    Solusi Rekayasa
                  </span>
                  <p className="text-xs sm:text-sm text-[#111315] leading-relaxed font-medium">
                    {product.solution}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#687078] mb-3">
                  02 / Kapabilitas &amp; Modul
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#262A2E] font-medium"
                    >
                      <span className="w-6 h-6 bg-white text-[#111315] border border-[#E4E2DD] rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold shadow-sm">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#687078] mb-2.5">
                  03 / Spesifikasi Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3.5 py-1.5 bg-white text-[#111315] border border-[#E4E2DD] rounded-full shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Licensing & Order Card (5 Cols) */}
            <div className="lg:col-span-5 bg-white p-6 border border-[#E4E2DD] rounded-3xl shadow-sm space-y-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#687078] block">
                  {product.is_portfolio ? 'Status Akses' : 'Lisensi & Serah Terima'}
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
                    {product.is_portfolio
                      ? 'Custom Quote'
                      : `Rp ${computedPrice.toLocaleString('id-ID')}`}
                  </span>
                </div>
              </div>

              {!product.is_portfolio ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setLicenseType('source')}
                    className={`w-full text-left p-4 rounded-2xl border transition ${
                      licenseType === 'source'
                        ? 'bg-[#F8F7F4] border-[#111315] ring-1 ring-[#111315]'
                        : 'bg-white border-[#E4E2DD] hover:border-[#9CA3AF]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#111315]">
                        <FileCode2 className="w-4 h-4 text-[#1D4ED8]" />
                        <span>Source Code 3 Halaman + DB</span>
                      </div>
                      {licenseType === 'source' && (
                        <Check className="w-4 h-4 text-[#111315]" />
                      )}
                    </div>
                    <p className="text-xs text-[#525860] mt-1.5 leading-relaxed font-medium">
                      Full Git repository (Storefront + Aplikasi POS/Studio + Backoffice), skema SQL/Supabase, dan dokumentasi setup.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLicenseType('turnkey')}
                    className={`w-full text-left p-4 rounded-2xl border transition ${
                      licenseType === 'turnkey'
                        ? 'bg-[#F8F7F4] border-[#111315] ring-1 ring-[#111315]'
                        : 'bg-white border-[#E4E2DD] hover:border-[#9CA3AF]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#111315]">
                        <Server className="w-4 h-4 text-[#1D4ED8]" />
                        <span>Turnkey Deploy + Domain</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#1D4ED8]">
                        +Rp {(TURNKEY_DEPLOY_FEE / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <p className="text-xs text-[#525860] mt-1.5 leading-relaxed font-medium">
                      Terima beres: instalasi ke Vercel/VPS, provisioning database cloud, dan konfigurasi domain kustom Anda.
                    </p>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-[#F8F7F4] border border-[#E4E2DD] rounded-2xl text-xs text-[#262A2E] leading-relaxed flex items-start gap-2.5 font-medium">
                  <Layers className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                  <span>
                    Sistem ini tersedia sebagai referensi arsitektur untuk pembangunan ulang atau kustomisasi perusahaan Anda.
                  </span>
                </div>
              )}

              <div className="space-y-3 pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {product.is_portfolio
                      ? 'Diskusi Proyek via WhatsApp'
                      : 'Akuisisi Lisensi via WhatsApp'}
                  </span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={demoBase}
                    target={demoBase.startsWith('http') ? '_blank' : undefined}
                    rel={demoBase.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="min-h-[42px] bg-[#F8F7F4] hover:bg-[#ECEAE4] border border-[#E4E2DD] text-[#111315] font-bold text-xs px-3 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                  {product.github_url && (
                    <a
                      href={product.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] bg-[#F8F7F4] hover:bg-[#ECEAE4] border border-[#E4E2DD] text-[#111315] font-bold text-xs px-3 py-2.5 rounded-full flex items-center justify-center gap-1.5 transition shadow-sm"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>GitHub Repo</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-[#687078] leading-relaxed border-t border-[#E4E2DD] pt-3 font-medium">
                Serah terima kode dilakukan via repositori GitHub privat atau arsip terverifikasi setelah verifikasi live demo selesai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
