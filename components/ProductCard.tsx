'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ProductItem } from '@/lib/catalog-data';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

const SHORT_PAGE_LABELS: Record<1 | 2 | 3, string> = {
  1: '01 Storefront',
  2: '02 POS / Studio',
  3: '03 Backoffice',
};

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const demoBase = product.demo_url || `/demo/${product.slug}`;

  return (
    <article className="group bg-white border border-[#E4E2DD] hover:border-[#111315] transition-colors duration-200 flex flex-col justify-between">
      {/* Top Framed Browser Showcase */}
      <div className="p-3 sm:p-4 pb-0">
        <div className="border border-[#E4E2DD] bg-[#F8F7F4] overflow-hidden">
          {/* Minimalist Browser Window Bar */}
          <div className="h-8 px-3 border-b border-[#E4E2DD] bg-[#F3F1EC] flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-[#D0CDC6]" />
              <span className="w-2 h-2 rounded-full bg-[#D0CDC6]" />
              <span className="w-2 h-2 rounded-full bg-[#D0CDC6]" />
            </div>

            <div className="font-mono text-[10px] text-[#5C6269] truncate">
              birumarket.web.id/demo/{product.slug}
            </div>

            <span className="font-mono text-[9px] uppercase tracking-wider text-[#111315] font-semibold shrink-0">
              3 PAGES
            </span>
          </div>

          {/* 16:10 Real Application Screenshot + Subtle Bottom Glass Bar */}
          <div className="relative w-full aspect-[16/10] bg-[#111315] overflow-hidden">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="w-full h-full block text-left focus:outline-none"
              aria-label={`Lihat spesifikasi ${product.title}`}
            >
              <img
                src={product.thumbnail_url}
                alt={product.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/products/shot-pos-kuro.png';
                }}
                className="w-full h-full object-cover object-top group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              />
            </button>

            {/* Subtle Bottom Glass Bar for 3-Page Deep Jump */}
            <div className="absolute inset-x-2.5 bottom-2.5 z-10 translate-y-1 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-200 bg-[#111315]/88 backdrop-blur-md border border-white/15 p-1.5 flex items-center justify-between gap-1.5">
              {([1, 2, 3] as const).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`${demoBase}?page=${pageNum}`}
                  className="flex-1 py-1.5 px-2 text-center font-mono text-[10px] font-medium text-white/90 hover:text-white hover:bg-white/15 transition truncate"
                >
                  {SHORT_PAGE_LABELS[pageNum]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-2.5">
          {/* Category + SKU */}
          <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#687078]">
            <span className="uppercase tracking-wider font-semibold text-[#111315]">
              {product.category}
            </span>
            <span>{product.sku || product.id.toUpperCase()}</span>
          </div>

          {/* Product Title */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-left block w-full"
          >
            <h3 className="font-['Syne',sans-serif] font-bold text-lg sm:text-xl text-[#111315] group-hover:text-[#1D4ED8] transition-colors leading-snug">
              {product.title.replace(/\s*\(3 Halaman\)/gi, '')}
            </h3>
          </button>

          {/* Concise Summary */}
          <p className="text-xs sm:text-sm text-[#525860] line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>

          {/* Subtle Stack Metadata */}
          <div className="pt-1 flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-[#687078]">
            {product.tech_stack.slice(0, 4).map((stack) => (
              <span
                key={stack}
                className="px-2 py-0.5 bg-[#F8F7F4] border border-[#E4E2DD] text-[#3B4046]"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Price & Action Row */}
        <div className="pt-4 border-t border-[#E4E2DD] flex items-center justify-between gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#687078] block">
              Full 3-Page Source
            </span>
            <span className="font-mono font-bold text-sm sm:text-base text-[#111315]">
              {product.is_portfolio
                ? 'Custom Quote'
                : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-semibold">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="min-h-[38px] px-3.5 py-1.5 border border-[#D5D2CA] bg-white hover:border-[#111315] text-[#111315] transition"
            >
              Detail
            </button>
            <Link
              href={demoBase}
              className="min-h-[38px] px-3.5 py-1.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] inline-flex items-center gap-1.5 transition"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
