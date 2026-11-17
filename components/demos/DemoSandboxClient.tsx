'use client';

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
              className="inline-block px-5 py-2.5 bg-[#0B2545] text-white text-xs font-mono font-bold"
            >
              ← Kembali ke Katalog
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Slim 38px Sandbox Navigation Bar */}
      <div className="min-h-[38px] bg-[#0B2545] text-white px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/catalog"
            className="text-blue-200 hover:text-white underline underline-offset-4 shrink-0"
          >
            ← Katalog
          </Link>
          <span className="text-white/30">|</span>
          <span className="font-bold truncate">
            {product ? product.title : slug}
          </span>
        </div>

        {product && (
          <a
            href={buildWhatsAppOrderUrl(product, 'source')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-[#1D4ED8] hover:bg-blue-600 text-white font-bold shrink-0 transition"
          >
            Beli Source Code (Rp {product.price.toLocaleString('id-ID')})
          </a>
        )}
      </div>

      {/* Full-Bleed Live App Frame */}
      <div className="border border-slate-300 shadow-lg overflow-hidden">
        {renderDemo()}
      </div>
    </div>
  );
}
