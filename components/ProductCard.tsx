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

// Curated 3-photo mosaic gallery per product (Main UI screenshot + 2 contextual lifestyle / operational shots)
const PRODUCT_MOSAIC_GALLERY: Record<string, [string, string, string]> = {
  'pos-kuro': [
    '/products/shot-pos-kuro.png',
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1553621042-f6e147245754?w=700&auto=format&fit=crop&q=80',
  ],
  'pos-brew': [
    '/products/shot-pos-brew.png',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=80',
  ],
  'pos-medika': [
    '/products/shot-pos-medika.png',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=80',
  ],
  'pos-atelier': [
    '/products/shot-pos-atelier.png',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80',
  ],
  'pos-bengkel': [
    '/products/shot-pos-bengkel.png',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=700&auto=format&fit=crop&q=80',
  ],
  'app-pulseops': [
    '/products/shot-app-pulseops.png',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80',
  ],
  'app-splitbill': [
    '/products/shot-app-splitbill.png',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556742049-0a67e5572263?w=700&auto=format&fit=crop&q=80',
  ],
  'app-kursus': [
    '/products/shot-app-kursus.png',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80',
  ],
  'app-klinik': [
    '/products/shot-app-klinik.png',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=700&auto=format&fit=crop&q=80',
  ],
  'app-kontrak': [
    '/products/shot-app-kontrak.png',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=700&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&auto=format&fit=crop&q=80',
  ],
};

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const demoBase = product.demo_url || `/demo/${product.slug}`;
  const gallery =
    PRODUCT_MOSAIC_GALLERY[product.slug] ||
    (product.preview_images && product.preview_images.length >= 3
      ? [product.preview_images[0], product.preview_images[1], product.preview_images[2]]
      : [
          product.thumbnail_url || '/products/shot-pos-kuro.png',
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&auto=format&fit=crop&q=80',
        ]);

  const displayDomain = demoBase.startsWith('http')
    ? demoBase.replace(/^https?:\/\//, '')
    : `birumarket.web.id/demo/${product.slug}`;

  return (
    <article className="group bg-white rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between overflow-hidden border-0">
      {/* Top 3-Photo Mosaic Showcase (No Border) */}
      <div className="p-3 sm:p-3.5 pb-0">
        <div className="relative w-full aspect-[16/11] rounded-[1.6rem] overflow-hidden bg-[#0F1115]">
          {/* Asymmetrical 3-Photo Grid */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="w-full h-full grid grid-cols-12 gap-1.5 focus:outline-none text-left p-0 border-0"
            aria-label={`Lihat detail produk ${product.title}`}
          >
            {/* Primary UI Shot - Takes 7 of 12 columns */}
            <div className="col-span-7 relative h-full overflow-hidden bg-[#15181E] rounded-l-[1.4rem]">
              <img
                src={gallery[0]}
                alt={`${product.title} Antarmuka Utama`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/products/shot-pos-kuro.png';
                }}
                className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* Contextual Stacked Photos - Takes 5 of 12 columns */}
            <div className="col-span-5 grid grid-rows-2 gap-1.5 h-full">
              <div className="relative h-full overflow-hidden bg-[#1A1D24] rounded-tr-[1.4rem]">
                <img
                  src={gallery[1]}
                  alt={`${product.title} Detail Fitur 1`}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15" />
              </div>
              <div className="relative h-full overflow-hidden bg-[#1A1D24] rounded-br-[1.4rem]">
                <img
                  src={gallery[2]}
                  alt={`${product.title} Detail Fitur 2`}
                  className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15" />
              </div>
            </div>
          </button>

          {/* Floating Minimal Overlays (No Border) */}
          <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-2 z-10">
            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white/95 tracking-tight truncate max-w-[65%]">
              {displayDomain}
            </div>
            <div className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-extrabold text-[#111315] tracking-wider uppercase shadow-sm shrink-0">
              3 Pages
            </div>
          </div>

          {/* Bottom Floating Jump-Bar for 3-Page Deep Linking */}
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-black/80 backdrop-blur-md p-1.5 rounded-full flex items-center justify-between gap-1 shadow-lg">
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

      {/* Editorial Body (Zero Border) */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-3">
          {/* Category & SKU Pill (Borderless) */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="uppercase tracking-wider font-extrabold text-[#111315] px-3 py-1 rounded-full bg-[#EAE7E1]">
              {product.category}
            </span>
            <span className="font-semibold text-[11px] text-[#717882]">
              {product.sku || product.id.toUpperCase()}
            </span>
          </div>

          {/* Product Title */}
          <button
            type="button"
            onClick={() => onSelect(product)}
            className="text-left block w-full focus:outline-none"
          >
            <h3 className="font-extrabold text-lg sm:text-xl text-[#111315] group-hover:text-[#1D4ED8] transition-colors leading-snug">
              {product.title.replace(/\s*\(3 Halaman\)/gi, '')}
            </h3>
          </button>

          {/* Concise Tagline */}
          <p className="text-xs sm:text-sm text-[#555C66] line-clamp-2 leading-relaxed font-medium">
            {product.tagline || product.description}
          </p>

          {/* Tech Stack Pills (Borderless) */}
          <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px] font-medium">
            {product.tech_stack.slice(0, 4).map((stack) => (
              <span
                key={stack}
                className="px-2.5 py-1 bg-[#F4F2ED] text-[#33373D] rounded-full font-semibold"
              >
                {stack}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Price & Action Row (Zero Border) */}
        <div className="pt-4 flex items-center justify-between gap-3">
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
              className="min-h-[40px] px-4 py-2 bg-[#F4F2ED] hover:bg-[#EAE7E1] text-[#111315] rounded-full transition shadow-sm hover:shadow"
            >
              Detail
            </button>
            <a
              href={demoBase}
              target={demoBase.startsWith('http') ? '_blank' : undefined}
              rel={demoBase.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="min-h-[40px] px-4 py-2 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] inline-flex items-center gap-1.5 rounded-full transition shadow-sm hover:shadow-md hover:scale-[1.02]"
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
