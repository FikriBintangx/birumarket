'use client';

import Link from 'next/link';
import { ProductItem } from '@/lib/catalog-data';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const pages = product.pages || [
    { pageNumber: 1 as const, label: 'Hal 1 · Katalog', title: 'Storefront & Preview Produk', summary: '' },
    { pageNumber: 2 as const, label: 'Hal 2 · Aplikasi', title: 'Terminal POS / Studio Utama', summary: '' },
    { pageNumber: 3 as const, label: 'Hal 3 · Backoffice', title: 'Monitor & Laporan', summary: '' },
  ];

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col group hover:border-[#0B2545] transition duration-150 shadow-sm hover:shadow-md">
      {/* Top Architectural Meta Strip */}
      <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between gap-2 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[#0B2545]">
            {product.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-50 text-[#1D4ED8] border border-blue-200 font-bold text-[10px]">
            3 HALAMAN UTUH
          </span>
        </div>
        <span className="text-slate-500 font-semibold">
          {product.sku || product.id.toUpperCase()}
        </span>
      </div>

      {/* Crisp 16:10 Real App Screenshot */}
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden block text-left border-b border-slate-200"
        aria-label={`Lihat spesifikasi ${product.title}`}
      >
        <img
          src={product.thumbnail_url}
          alt={product.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/products/shot-pos-kuro.png';
          }}
          className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition duration-300"
        />
        <div className="absolute inset-0 bg-[#0B2545]/80 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col items-center justify-center p-4 text-center gap-2">
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-white border border-white/50 px-3.5 py-2 bg-[#0B2545]/90">
            Preview Produk &amp; Arsitektur 3 Halaman
          </span>
          <span className="font-mono text-[10px] text-blue-200">
            Storefront Katalog + Aplikasi POS/Studio + Monitor Backoffice
          </span>
        </div>
      </button>

      {/* Editorial Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-left block w-full"
          >
            <h3 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#0B2545] group-hover:text-[#1D4ED8] transition leading-snug line-clamp-2">
              {product.title}
            </h3>
          </button>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Interactive 3-Page Deep-Link Strip */}
          {product.demo_url && (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>ISI PAKET WEBSITE (KLIK HALAMAN):</span>
                <span className="text-[#1D4ED8]">LIVE</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                {pages.map((pg) => (
                  <Link
                    key={pg.pageNumber}
                    href={`${product.demo_url}?page=${pg.pageNumber}`}
                    className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#0B2545] text-[#0B2545] hover:text-white border border-slate-200 transition truncate font-bold text-center"
                    title={pg.title}
                  >
                    {pg.label.replace('Halaman ', 'Hal ')}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="font-mono text-[11px] text-slate-500 line-clamp-1">
            {product.tech_stack.join(' · ')}
          </p>
        </div>

        {/* Bottom Price & Action Controls */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] text-slate-400 block">FULL SOURCE (3 HAL)</span>
            <span className="font-mono font-bold text-sm sm:text-base text-[#0B2545]">
              {product.is_portfolio
                ? 'Custom Quote'
                : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="min-h-[38px] py-1.5 px-3 text-slate-700 hover:text-[#0B2545] border border-slate-200 hover:border-[#0B2545] rounded-xl transition"
            >
              Preview
            </button>
            {product.demo_url && (
              <Link
                href={product.demo_url}
                className="min-h-[38px] py-1.5 px-3.5 bg-[#0B2545] hover:bg-[#1D4ED8] text-white rounded-xl inline-flex items-center transition"
              >
                Buka Web
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
