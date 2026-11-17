'use client';

import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
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

  const renderDemo = () => {
    switch (slug) {
      case 'pos-kuro':
        return <KuroBentoPos />;
      case 'pos-brew':
        return <BrewLabPos />;
      case 'pos-medika':
        return <ApotekMedikaPos />;
      case 'pos-atelier':
        return <AtelierLuxePos />;
      case 'pos-bengkel':
        return <PitStopBengkelPos />;
      case 'app-pulseops':
        return <PulseOpsDemo />;
      case 'app-splitbill':
        return <BagiRataDemo />;
      case 'app-kursus':
        return <KelasKilatDemo />;
      case 'app-klinik':
        return <AntreMedDemo />;
      case 'app-kontrak':
        return <LegalDraftDemo />;
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Katalog</span>
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Sandbox Top Navigation Bar */}
      <div className="bg-[#0B2545] text-white rounded-2xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 min-w-0">
          <Link
            href="/catalog"
            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5 transition shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Katalog</span>
          </Link>
          <div className="min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-200 block">
              BiruMarket Live Interactive Demo
            </span>
            <span className="font-bold text-xs sm:text-sm truncate block">
              {product ? product.title : slug}
            </span>
          </div>
        </div>

        {product && (
          <a
            href={buildWhatsAppOrderUrl(product, 'source')}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-4 py-1.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-2 transition shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>
              Beli Source Code (Rp {product.price.toLocaleString('id-ID')})
            </span>
          </a>
        )}
      </div>

      {/* Live App Frame */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
        {renderDemo()}
      </div>
    </div>
  );
}
