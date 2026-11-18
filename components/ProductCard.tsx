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
    <article className="group bg-white border border-[#E4E2DD]/90 hover:border-[#111315]/40 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Framed Browser Showcase */}
      <div className="p-3.5 sm:p-4 pb-0">
        <div className="border border-[#E4E2DD] bg-[#F8F7F4] rounded-2xl overflow-hidden shadow-inner">
          {/* Minimalist Browser Window Bar */}
          <div className="h-8 px-3 border-b border-[#E4E2DD] bg-[#F3F1EC] flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
            </div>

            <div className="text-[11px] font-semibold text-[#5C6269] truncate">
              {demoBase.startsWith('http')
                ? demoBase.replace(/^https?:\/\//, '')
                : `birumarket.web.id/demo/${product.slug}`}
            </div>

            <span className="text-[10px] uppercase tracking-wider text-[#111315] font-bold px-2 py-0.5 rounded-full bg-white/70 border border-[#E4E2DD] shrink-0">
              3 Pages
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
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              />
            </button>

            {/* Bottom Glass Bar for 3-Page Deep Jump */}
            <div className="absolute inset-x-3 bottom-3 z-10 translate-y-1 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 bg-[#111315]/85 backdrop-blur-md border border-white/20 p-1.5 rounded-full flex items-center justify-between gap-1 shadow-lg">
              {([1, 2, 3] as const).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`${demoBase}?page=${pageNum}`}
                  className="flex-1 py-1.5 px-2 text-center text-[10px] font-bold text-white/90 hover:text-white hover:bg-white/20 rounded-full transition truncate"
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
        <div className="space-y-3">
          {/* Category + SKU */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#687078]">
            <span className="uppercase tracking-wider font-extrabold text-[#111315] px-2.5 py-0.5 rounded-full bg-[#EAE7E1]">
              {product.category}
            </span>
            <span className="font-semibold text-[11px]">{product.sku || product.id.toUpperCase()}</span>
          </div>

          {/* Product Title */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-left block w-full"
          >
            <h3 className="font-extrabold text-lg sm:text-xl text-[#111315] group-hover:text-[#1D4ED8] transition-colors leading-snug">
              {product.title.replace(/\s*\(3 Halaman\)/gi, '')}
            </h3>
          </button>

          {/* Concise Summary */}
          <p className="text-xs sm:text-sm text-[#525860] line-clamp-2 leading-relaxed font-medium">
            {product.tagline || product.description}
          </p>

          {/* Subtle Stack Metadata */}
          <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[#687078]">
            {product.tech_stack.slice(0, 4).map((stack) => (
              <span
                key={stack}
                className="px-2.5 py-1 bg-[#F4F2ED] border border-[#E4E2DD] text-[#3B4046] rounded-full font-semibold"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Price & Action Row */}
        <div className="pt-4 border-t border-[#EAE7E1] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#767E88] block">
              Full 3-Page Source
            </span>
            <span className="font-extrabold text-sm sm:text-base text-[#111315]">
              {product.is_portfolio
                ? 'Custom Quote'
                : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="min-h-[38px] px-4 py-2 border border-[#D5D2CA] bg-white hover:border-[#111315] text-[#111315] rounded-full transition shadow-sm hover:shadow"
            >
              Detail
            </button>
            <a
              href={demoBase}
              target={demoBase.startsWith('http') ? '_blank' : undefined}
              rel={demoBase.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="min-h-[38px] px-4 py-2 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] inline-flex items-center gap-1.5 rounded-full transition shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
