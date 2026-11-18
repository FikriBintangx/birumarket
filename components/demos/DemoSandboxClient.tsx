'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Lock,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
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
  const [prevPage, setPrevPage] = useState<1 | 2 | 3>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handlePageSwitch = useCallback(
    (nextPage: 1 | 2 | 3) => {
      if (nextPage === activePage) return;
      setPrevPage(activePage);
      setIsAnimating(true);
      setActivePage(nextPage);

      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('page', String(nextPage));
        window.history.replaceState({}, '', url.toString());
      }

      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 220);
      return () => clearTimeout(timer);
    },
    [activePage]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = Number(params.get('page'));
      if (p === 1 || p === 2 || p === 3) {
        setActivePage(p);
        setPrevPage(p);
      }
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === '1' || e.key === '2' || e.key === '3')) {
        e.preventDefault();
        handlePageSwitch(Number(e.key) as 1 | 2 | 3);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePageSwitch]);

  const previewUrl = `https://birumarket.web.id/demo/${slug}?page=${activePage}`;

  const handleCopyUrl = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(previewUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 1800);
    }
  };

  const renderDemo = () => {
    const props = {
      activePage,
      onPageChange: (p: 1 | 2 | 3) => handlePageSwitch(p),
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
          <div className="bg-white p-14 text-center space-y-4">
            <h1 className="font-serif text-3xl font-bold text-slate-900">
              Demo Sandbox Tidak Ditemukan
            </h1>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Slug demo <code className="font-mono bg-slate-100 px-2 py-0.5 rounded">{slug}</code> belum terdaftar di katalog aktif.
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-mono font-semibold rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Katalog
            </Link>
          </div>
        );
    }
  };

  const pages = product?.pages || [
    {
      pageNumber: 1 as const,
      label: 'Halaman 1 · Storefront',
      title: 'Katalog & Preview Produk',
      summary: 'Etalase publik dengan foto produk dan modal spesifikasi.',
    },
    {
      pageNumber: 2 as const,
      label: 'Halaman 2 · Aplikasi Utama',
      title: 'Terminal POS / Studio Kerja',
      summary: 'Ruang kerja interaktif untuk kasir dan operasional.',
    },
    {
      pageNumber: 3 as const,
      label: 'Halaman 3 · Manajemen',
      title: 'Monitor Antrean & Backoffice',
      summary: 'Panel pantau real-time, stok gudang, dan laporan.',
    },
  ];

  const slideDirectionClass = isAnimating
    ? activePage > prevPage
      ? 'opacity-90 translate-x-1.5 scale-[0.997]'
      : 'opacity-90 -translate-x-1.5 scale-[0.997]'
    : 'opacity-100 translate-x-0 scale-100';

  return (
    <div className="space-y-4">
      {/* Modern Browser Studio Top Bar */}
      <div className="bg-[#111315] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Row 1: Browser Chrome, Address Bar & Viewport Controls */}
        <div className="px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#16181B]">
          {/* Left: Back Link & Window Dots */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium text-zinc-200 hover:text-white transition shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Katalog</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 px-1" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>

            <div className="hidden lg:block min-w-0 pl-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/20 font-semibold">
                  {product?.sku || slug.toUpperCase()}
                </span>
                <span className="text-xs font-semibold text-zinc-100 truncate max-w-[220px]">
                  {product ? product.title : slug}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Interactive Browser Address Bar */}
          <div className="flex-1 max-w-xl min-w-[240px] mx-auto">
            <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 font-mono text-[11px] text-zinc-300">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate text-zinc-400">
                  https://birumarket.web.id/demo/
                  <span className="text-white font-semibold">{slug}</span>
                  <span className="text-blue-400 font-semibold">?page={activePage}</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 text-[10px] text-zinc-300 hover:text-white transition shrink-0"
                title="Salin URL halaman demo"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-300">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Viewport Switcher & Acquisition Button */}
          <div className="flex items-center gap-2.5">
            <div
              className="hidden md:flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-[11px] font-mono"
              role="group"
              aria-label="Pilih ukuran layar preview"
            >
              {(
                [
                  { id: 'desktop', label: 'Desktop', icon: Monitor },
                  { id: 'tablet', label: 'Tablet', icon: Tablet },
                  { id: 'mobile', label: 'Mobile', icon: Smartphone },
                ] as const
              ).map((vp) => {
                const Icon = vp.icon;
                const active = viewport === vp.id;
                return (
                  <button
                    key={vp.id}
                    type="button"
                    onClick={() => setViewport(vp.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition ${
                      active
                        ? 'bg-white text-[#111315] shadow-sm font-semibold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{vp.label}</span>
                  </button>
                );
              })}
            </div>

            {product && (
              <a
                href={buildWhatsAppOrderUrl(product, 'source')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white text-xs font-semibold transition shadow-sm shrink-0"
              >
                <span>Akuisisi Rp {product.price.toLocaleString('id-ID')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Row 2: Segmented 3-Page Pill Switcher */}
        <div className="px-4 sm:px-5 py-3 bg-[#111315] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
            {pages.map((pg) => {
              const isCurrent = activePage === pg.pageNumber;
              return (
                <button
                  key={pg.pageNumber}
                  type="button"
                  onClick={() => handlePageSwitch(pg.pageNumber)}
                  className={`group relative px-3.5 py-2.5 rounded-xl text-left transition-all duration-200 border flex items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-white text-[#111315] border-white shadow-md scale-[1.005]'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 transition ${
                        isCurrent
                          ? 'bg-[#111315] text-white'
                          : 'bg-white/10 text-zinc-300 group-hover:bg-white/20'
                      }`}
                    >
                      0{pg.pageNumber}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={`font-mono text-[10px] font-semibold uppercase tracking-wider truncate ${
                          isCurrent ? 'text-[#1D4ED8]' : 'text-zinc-400'
                        }`}
                      >
                        {pg.label}
                      </div>
                      <div className="font-semibold text-xs truncate mt-0.5">
                        {pg.title}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                      isCurrent
                        ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30'
                        : 'text-zinc-400 group-hover:text-white'
                    }`}
                  >
                    {isCurrent ? (
                      'Aktif'
                    ) : (
                      <>
                        <span>Buka</span>
                        <ChevronRight className="w-3 h-3" />
                      </>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-2 pl-2 text-[11px] font-mono text-zinc-400 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Pintasan: Alt+1 / Alt+2 / Alt+3</span>
          </div>
        </div>
      </div>

      {/* Live Website Viewport Frame with Smooth Directional Motion */}
      <div
        className={`mx-auto transition-all duration-300 ease-out border border-slate-200/90 shadow-2xl overflow-hidden rounded-2xl bg-white ${
          viewport === 'mobile'
            ? 'max-w-[420px]'
            : viewport === 'tablet'
              ? 'max-w-[840px]'
              : 'w-full'
        }`}
      >
        <div
          className={`transition-all duration-200 ease-out will-change-transform ${slideDirectionClass}`}
        >
          {renderDemo()}
        </div>
      </div>
    </div>
  );
}
