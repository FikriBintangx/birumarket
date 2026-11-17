'use client';

import { ExternalLink, MessageCircle, ArrowUpRight } from 'lucide-react';
import { ProductItem, buildWhatsAppOrderUrl } from '@/lib/catalog-data';

interface ProductCardProps {
  product: ProductItem;
  onSelect: (product: ProductItem) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col group hover:border-[#1D4ED8]/50 hover:shadow-md transition duration-200">
      {/* Preview Image */}
      <button
        type="button"
        onClick={() => onSelect(product)}
        className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden text-left block focus-visible:outline-2 focus-visible:outline-[#1D4ED8]"
        aria-label={`Lihat spesifikasi ${product.title}`}
      >
        <img
          src={product.thumbnail_url}
          alt={product.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/products/p-jurnalku.png';
          }}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0B2545]/90 text-white">
            {product.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
              product.is_portfolio
                ? 'bg-slate-900/85 text-slate-100'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {product.is_portfolio ? 'Showcase' : 'Ready'}
          </span>
        </div>
      </button>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-mono text-[11px] font-semibold text-slate-500">
            {product.sku || 'BM-APP'}
          </span>
          {product.demo_url && (
            <a
              href={product.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-1"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => onSelect(product)}
          className="text-left group/title focus-visible:outline-2 focus-visible:outline-[#1D4ED8] rounded"
        >
          <h3 className="font-['Syne',sans-serif] font-bold text-lg text-[#0B2545] group-hover/title:text-[#1D4ED8] transition leading-snug line-clamp-1">
            {product.title}
          </h3>
        </button>

        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 line-clamp-2 leading-relaxed flex-1">
          {product.tagline || product.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {product.tech_stack.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="font-mono bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium"
            >
              {tech}
            </span>
          ))}
          {product.tech_stack.length > 3 && (
            <span className="font-mono bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded text-[10px]">
              +{product.tech_stack.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-slate-500">
              {product.is_portfolio ? 'Lisensi' : 'Source Code'}
            </span>
            <span className="font-['Syne',sans-serif] font-extrabold text-base text-[#0B2545]">
              {product.is_portfolio
                ? 'Custom Quote'
                : `Rp ${Number(product.price).toLocaleString('id-ID')}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(product)}
              className="min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0B2545] font-bold text-xs inline-flex items-center gap-1 transition"
            >
              <span>Detail</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={buildWhatsAppOrderUrl(product, 'source')}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] w-10 h-10 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white flex items-center justify-center transition shrink-0"
              title={`Pesan ${product.title} via WhatsApp`}
              aria-label={`Pesan ${product.title} via WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
