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

  const pages = product.pages || [
    {
      pageNumber: 1 as const,
      label: 'Halaman 1 · Storefront',
      title: 'Katalog & Preview Produk Visual',
      summary: 'Halaman depan website dengan daftar produk, filter kategori, dan modal spesifikasi.',
    },
    {
      pageNumber: 2 as const,
      label: 'Halaman 2 · Aplikasi Utama',
      title: 'Terminal Operasional / POS Interaktif',
      summary: 'Ruang kerja utama aplikasi untuk transaksi atau pemrosesan data.',
    },
    {
      pageNumber: 3 as const,
      label: 'Halaman 3 · Manajemen',
      title: 'Monitor Antrean, Inventaris & Laporan',
      summary: 'Halaman kontrol backoffice untuk memantau status pesanan dan laporan.',
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
        className="fixed inset-0 bg-[#0B2545]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Sheet */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Metadata Bar */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-slate-200 bg-slate-50/80 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0B2545] text-white">
              {product.sku || 'BM-APP'}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-[#1D4ED8] border border-blue-200">
              {product.category}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              WEBSITE UTUH 3 HALAMAN
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#0B2545] hover:text-white hover:border-[#0B2545] flex items-center justify-center transition focus-visible:outline-2 focus-visible:outline-[#1D4ED8] focus-visible:outline-offset-2 shrink-0"
            aria-label="Tutup detail produk"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-7">
          {/* Header & Title */}
          <div>
            <h2
              id="modal-product-title"
              className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] tracking-tight leading-tight"
            >
              {product.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              {product.tagline || product.description}
            </p>
          </div>

          {/* 3-Page Architecture Quick Preview Cards */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0B2545] text-white space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-300">
                ARSITEKTUR WEBSITE 3 HALAMAN (KLIK UNTUK UJI LIVE TIAP HALAMAN):
              </span>
              {product.demo_url && (
                <Link
                  href={product.demo_url}
                  className="font-mono text-xs font-bold text-white underline"
                >
                  Buka Fullscreen →
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {pages.map((pg) => (
                <div
                  key={pg.pageNumber}
                  className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase text-blue-300 block">
                      {pg.label}
                    </span>
                    <div className="font-bold text-sm text-white leading-snug">
                      {pg.title}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pg.summary}
                    </p>
                  </div>
                  {product.demo_url && (
                    <Link
                      href={`${product.demo_url}?page=${pg.pageNumber}`}
                      className="w-full py-2 px-3 rounded-lg bg-white hover:bg-blue-50 text-[#0B2545] font-mono text-xs font-bold text-center transition block"
                    >
                      Buka Halaman {pg.pageNumber} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Visual Preview Stage */}
          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={currentImage}
                alt={product.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/products/shot-pos-kuro.png';
                }}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition shrink-0 focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                      activeImageIdx === idx
                        ? 'border-[#1D4ED8]'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
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

          {/* Main 12-Col Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Left Specs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  01 / Ringkasan Sistem (3 Halaman)
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Tantangan Bisnis
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {product.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-blue-200">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] block mb-1.5">
                    Solusi Arsitektur
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {product.solution}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  02 / Fitur &amp; Kapabilitas Utama
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-md bg-blue-50 text-[#1D4ED8] border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  03 / Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tech_stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Licensing & Order Card (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-5">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  {product.is_portfolio ? 'Status Akses' : 'Pilih Paket Akuisisi'}
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
                    {product.is_portfolio
                      ? 'Custom Quote'
                      : `Rp ${computedPrice.toLocaleString('id-ID')}`}
                  </span>
                </div>
              </div>

              {!product.is_portfolio ? (
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setLicenseType('source')}
                    className={`w-full text-left p-3.5 rounded-xl border transition focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                      licenseType === 'source'
                        ? 'bg-white border-[#1D4ED8] ring-1 ring-[#1D4ED8]'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#0B2545]">
                        <FileCode2 className="w-4 h-4 text-[#1D4ED8]" />
                        <span>Source Code 3 Halaman + DB</span>
                      </div>
                      {licenseType === 'source' && (
                        <Check className="w-4 h-4 text-[#1D4ED8]" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Full Git repository (Storefront + Aplikasi POS/Studio + Backoffice), SQL/Supabase schema, dan panduan setup.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLicenseType('turnkey')}
                    className={`w-full text-left p-3.5 rounded-xl border transition focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                      licenseType === 'turnkey'
                        ? 'bg-white border-[#1D4ED8] ring-1 ring-[#1D4ED8]'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-[#0B2545]">
                        <Server className="w-4 h-4 text-[#1D4ED8]" />
                        <span>Turnkey Deploy + Domain</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#1D4ED8]">
                        +Rp {(TURNKEY_DEPLOY_FEE / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      Terima beres: deploy ke Vercel/VPS, setup database cloud, dan sambung domain Anda.
                    </p>
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                  <span>
                    Proyek ini tersedia sebagai referensi arsitektur untuk pembangunan ulang atau penyesuaian khusus kebutuhan perusahaan Anda.
                  </span>
                </div>
              )}

              <div className="space-y-2.5 pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm focus-visible:outline-2 focus-visible:outline-[#0B2545] focus-visible:outline-offset-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {product.is_portfolio
                      ? 'Diskusi Proyek via WhatsApp'
                      : 'Pesan Lisensi via WhatsApp'}
                  </span>
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  {product.demo_url && (
                    <Link
                      href={product.demo_url}
                      className="min-h-[44px] bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs px-3 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Buka Website (3 Hal)</span>
                    </Link>
                  )}
                  {product.github_url && (
                    <a
                      href={product.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`min-h-[44px] bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs px-3 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition focus-visible:outline-2 focus-visible:outline-[#1D4ED8] ${
                        !product.demo_url ? 'col-span-2' : ''
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>GitHub Repo</span>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200 pt-3">
                Serah terima kode dilakukan via akses repositori GitHub privat atau arsip ZIP terverifikasi setelah uji live demo disepakati.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
