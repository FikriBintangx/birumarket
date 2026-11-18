'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DEFAULT_PRODUCTS, buildWhatsAppOrderUrl } from '@/lib/catalog-data';
import {
  KuroBentoPos,
  BrewLabPos,
  ApotekMedikaPos,
  AtelierLuxePos,
  PitStopBengkelPos,
} from '@/components/demos/PosDemos';
import {
  PulseOpsDemo,
  BagiRataDemo,
  KelasKilatDemo,
  AntreMedDemo,
  LegalDraftDemo,
} from '@/components/demos/WebAppDemos';

interface DemoSandboxClientProps {
  slug: string;
}

export default function DemoSandboxClient({ slug }: DemoSandboxClientProps) {
  const product = DEFAULT_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  const [activePage, setActivePage] = useState<1 | 2 | 3>(1);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = Number(params.get('page'));
      if (p === 1 || p === 2 || p === 3) {
        setActivePage(p);
      }
    }
  }, []);

  const renderDemo = () => {
    const props = {
      activePage,
      onPageChange: (p: 1 | 2 | 3) => setActivePage(p),
    };

    switch (slug) {
      case 'pos-kuro':
        return <KuroBentoPos {...props} />;
      case 'pos-brew':
        return <BrewLabPos {...props} />;
      case 'pos-medika':
        return <ApotekMedikaPos {...props} />;
      case 'pos-atelier':
        return <AtelierLuxePos {...props} />;
      case 'pos-bengkel':
        return <PitStopBengkelPos {...props} />;
      case 'app-pulseops':
        return <PulseOpsDemo {...props} />;
      case 'app-splitbill':
        return <BagiRataDemo {...props} />;
      case 'app-kursus':
        return <KelasKilatDemo {...props} />;
      case 'app-klinik':
        return <AntreMedDemo {...props} />;
      case 'app-kontrak':
        return <LegalDraftDemo {...props} />;
      default:
        return (
          <div className="bg-white p-12 text-center space-y-4">
            <h1 className="font-['Syne',sans-serif] text-2xl font-extrabold text-[#0B2545]">
              Demo Sandbox Tidak Ditemukan
            </h1>
            <p className="text-sm text-slate-600">
              Slug demo <code className="font-mono bg-slate-100 px-2 py-0.5 rounded">{slug}</code> belum terdaftar.
            </p>
            <Link
              href="/catalog"
              className="inline-block px-5 py-2.5 bg-[#0B2545] text-white text-xs font-mono font-bold"
            >
              ← Kembali ke Katalog
            </Link>
          </div>
        );
    }
  };

  const pages = product?.pages || [
    { pageNumber: 1 as const, label: 'Halaman 1 · Storefront', title: 'Katalog & Preview Produk', summary: '' },
    { pageNumber: 2 as const, label: 'Halaman 2 · Aplikasi Utama', title: 'Terminal POS / Studio', summary: '' },
    { pageNumber: 3 as const, label: 'Halaman 3 · Manajemen', title: 'Monitor / Backoffice', summary: '' },
  ];

  return (
    <div className="space-y-3">
      {/* Top Multi-Page Sandbox Control Bar */}
      <div className="bg-[#0B2545] text-white p-3 sm:px-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/catalog"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg shrink-0 transition"
            >
              ← Katalog BiruMarket
            </Link>
            <div className="min-w-0">
              <span className="text-[10px] text-blue-300 block">
                LIVE MULTI-PAGE WEBSITE PREVIEW · {product?.sku || slug.toUpperCase()}
              </span>
              <span className="font-bold text-sm truncate block">
                {product ? product.title : slug}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Viewport Switcher */}
            <div className="hidden md:flex items-center bg-black/30 p-1 rounded-lg border border-white/10 text-[11px]">
              {(['desktop', 'tablet', 'mobile'] as const).map((vp) => (
                <button
                  key={vp}
                  type="button"
                  onClick={() => setViewport(vp)}
                  className={`px-2.5 py-1 rounded font-bold uppercase transition ${
                    viewport === vp ? 'bg-white text-[#0B2545]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {vp}
                </button>
              ))}
            </div>

            {product && (
              <a
                href={buildWhatsAppOrderUrl(product, 'source')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1D4ED8] hover:bg-blue-600 text-white font-bold rounded-lg shrink-0 transition"
              >
                Akuisisi Website 3 Halaman (Rp {product.price.toLocaleString('id-ID')})
              </a>
            )}
          </div>
        </div>

        {/* 3-Page Quick Switcher Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10">
          {pages.map((pg) => {
            const isCurrent = activePage === pg.pageNumber;
            return (
              <button
                key={pg.pageNumber}
                type="button"
                onClick={() => setActivePage(pg.pageNumber)}
                className={`p-2.5 rounded-xl text-left transition border flex items-center justify-between gap-2 ${
                  isCurrent
                    ? 'bg-white text-[#0B2545] border-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/15'
                }`}
              >
                <div className="min-w-0">
                  <div
                    className={`font-mono text-[10px] font-bold uppercase ${
                      isCurrent ? 'text-[#1D4ED8]' : 'text-blue-300'
                    }`}
                  >
                    {pg.label}
                  </div>
                  <div className="font-bold text-xs truncate mt-0.5">{pg.title}</div>
                </div>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${
                    isCurrent ? 'bg-[#0B2545] text-white' : 'bg-white/10 text-white'
                  }`}
                >
                  {isCurrent ? 'AKTIF' : `Buka Hal ${pg.pageNumber}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Website Viewport Container */}
      <div
        className={`mx-auto transition-all duration-200 border border-slate-300 shadow-xl overflow-hidden rounded-xl ${
          viewport === 'mobile'
            ? 'max-w-[412px]'
            : viewport === 'tablet'
              ? 'max-w-[820px]'
              : 'w-full'
        }`}
      >
        {renderDemo()}
      </div>
    </div>
  );
}
