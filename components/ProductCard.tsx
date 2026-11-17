'use client';

import { ProductItem } from '@/lib/catalog-data';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col group hover:border-[#0B2545] transition duration-150">
      {/* Top Architectural Meta Strip */}
      <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between gap-2 font-mono text-[11px]">
        <span className="font-bold uppercase tracking-wider text-[#0B2545]">
          {product.category}
        </span>
        <span className="text-slate-500">
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
        <div className="absolute inset-0 bg-[#0B2545]/75 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center">
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-white border border-white/50 px-3.5 py-2 bg-[#0B2545]/80">
            Lihat Arsitektur &amp; Detail →
          </span>
        </div>
      </button>

      {/* Editorial Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-left block w-full"
          >
            <h3 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#0B2545] group-hover:text-[#1D4ED8] transition leading-snug line-clamp-1">
              {product.title}
            </h3>
          </button>

          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>

          <p className="font-mono text-[11px] text-slate-500 mt-3 line-clamp-1">
            {product.tech_stack.join(' · ')}
          </p>
        </div>

        {/* Bottom Price & Text Controls */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="font-mono font-bold text-sm sm:text-base text-[#0B2545]">
            {product.is_portfolio
              ? 'Custom Quote'
              : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
          </span>

          <div className="flex items-center gap-3 text-xs font-mono font-bold">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="py-1.5 px-2.5 text-slate-700 hover:text-[#0B2545] border border-slate-200 hover:border-[#0B2545] rounded-lg transition"
            >
              Detail
            </button>
            {product.demo_url && (
              <a
                href={product.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 bg-[#0B2545] hover:bg-[#1D4ED8] text-white rounded-lg transition"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
