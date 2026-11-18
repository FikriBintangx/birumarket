'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import {
  CATEGORIES,
  CONTACT_INFO,
  DEFAULT_PRODUCTS,
  ProductItem,
} from '@/lib/catalog-data';
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
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  Database,
  Globe,
  Server,
  MessageCircle,
  RefreshCw,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Interactive Live 3-Page Website Previewer State on Homepage
  const [liveSlug, setLiveSlug] = useState('pos-kuro');
  const [livePage, setLivePage] = useState<1 | 2 | 3>(1);

  // Commission / Boarding pass inquiry state
  const [inquiryScope, setInquiryScope] = useState('Custom Web / AI SaaS');
  const [inquiryNote, setInquiryNote] = useState('');

  const loadProducts = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setProducts(json.data);
      } else if (!json.success) {
        setFetchError(json.error || 'Gagal memuat katalog terbaru dari server.');
      }
    } catch {
      setFetchError('Koneksi bermasalah saat menyinkronkan katalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const currentHighlight =
    products[highlightIdx % Math.max(products.length, 1)] || DEFAULT_PRODUCTS[0];

  const activeLiveProduct =
    products.find((p) => p.slug === liveSlug) || DEFAULT_PRODUCTS[0];

  const filteredPreview =
    activeCategory === 'ALL'
      ? products.slice(0, 10)
      : products.filter((p) => p.category === activeCategory).slice(0, 10);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroSearch.trim();
    router.push(q ? `/catalog?search=${encodeURIComponent(q)}` : '/catalog');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Halo Fikri, saya mengirim Tiket Komisi dari BiruMarket (${CONTACT_INFO.domain}):`,
      `Jenis Layanan: ${inquiryScope}`,
      inquiryNote.trim() ? `Catatan / Target Stack: ${inquiryNote.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    window.open(
      `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const renderInlineWebsite = () => {
    const props = {
      activePage: livePage,
      onPageChange: (p: 1 | 2 | 3) => setLivePage(p),
    };
    switch (liveSlug) {
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
        return <KuroBentoPos {...props} />;
    }
  };

  const stagePages = activeLiveProduct.pages || [
    { pageNumber: 1 as const, label: '01 Storefront', title: 'Katalog & Preview Produk', summary: '' },
    { pageNumber: 2 as const, label: '02 POS / App', title: 'Terminal Operasional Utama', summary: '' },
    { pageNumber: 3 as const, label: '03 Backoffice', title: 'Monitor & Laporan', summary: '' },
  ];

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#111315]">
      <Navbar />

      {/* Section 1: Magazine-Spread Asymmetric Hero */}
      <section className="w-full border-b border-[#E4E2DD]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (7 cols): Editorial Positioning & Search */}
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2.5 border border-[#E4E2DD] bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#525860]">
                <span className="text-[#111315] font-bold">ISSUE 01</span>
                <span>·</span>
                <span>{CONTACT_INFO.domain}</span>
                <span>·</span>
                <span className="text-[#1D4ED8] font-semibold">10 SISTEM 3 HALAMAN</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold tracking-tight leading-[1.03] text-[#111315]">
                  ARSITEKTUR WEB &amp; TERMINAL POS{' '}
                  <span className="font-serif-editorial italic font-normal text-4xl sm:text-6xl lg:text-[4.15rem] text-[#1D4ED8] block sm:inline">
                    siap akuisisi.
                  </span>
                </h1>

                <p className="text-[#525860] text-sm sm:text-base max-w-xl leading-relaxed">
                  Katalog terkurasi berisi 10 sistem aplikasi web utuh karya{' '}
                  <strong className="text-[#111315] font-semibold">
                    {CONTACT_INFO.ownerName}
                  </strong>
                  . Setiap produk mengintegrasikan{' '}
                  <span className="text-[#111315] font-medium">
                    01 Storefront &amp; Katalog Produk
                  </span>
                  ,{' '}
                  <span className="text-[#111315] font-medium">
                    02 Terminal POS / Studio Aplikasi
                  </span>
                  , serta{' '}
                  <span className="text-[#111315] font-medium">
                    03 Monitor Backoffice
                  </span>{' '}
                  yang dapat diuji langsung sebelum serah terima source code.
                </p>
              </div>

              {/* Editorial Search Form */}
              <form
                onSubmit={handleHeroSearch}
                className="flex flex-col sm:flex-row gap-2.5 max-w-xl"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8C929A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Cari sistem (Ramen POS, Roastery, Apotek, Split Bill, Legal)..."
                    aria-label="Cari produk di katalog"
                    className="w-full min-h-[46px] pl-11 pr-4 py-2.5 bg-white border border-[#D5D2CA] text-[#111315] placeholder:text-[#8C929A] text-sm focus:border-[#111315] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-[46px] px-6 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-mono font-semibold text-xs uppercase tracking-wider transition inline-flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Telusuri Katalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>

              {/* Indexed Category Strip */}
              <div className="pt-2 border-t border-[#E4E2DD] flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#687078] mr-1">
                  Indeks Kategori:
                </span>
                {CATEGORIES.filter((c) => c !== 'ALL').map((cat, idx) => (
                  <Link
                    key={cat}
                    href={`/catalog?category=${encodeURIComponent(cat)}`}
                    className="px-3 py-1.5 bg-white hover:bg-[#111315] text-[#111315] hover:text-[#F8F7F4] border border-[#E4E2DD] font-mono text-[11px] font-medium transition inline-flex items-center gap-1.5"
                  >
                    <span className="text-[#8C929A]">0{idx + 1}</span>
                    <span>{cat}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column (5 cols): Featured Editorial Specimen Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#111315] p-4 sm:p-5 space-y-4">
                {/* Specimen Header */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E4E2DD]">
                  <div className="flex items-center gap-2 min-w-0 font-mono text-[11px]">
                    <span className="px-2 py-0.5 bg-[#111315] text-[#F8F7F4] font-bold uppercase">
                      {currentHighlight.sku || 'BM-01'}
                    </span>
                    <span className="text-[#687078] truncate">
                      SPESIMEN {String((highlightIdx % Math.max(products.length, 1)) + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setHighlightIdx(
                          (prev) => (prev - 1 + products.length) % products.length
                        )
                      }
                      className="w-8 h-8 border border-[#E4E2DD] bg-[#F8F7F4] hover:border-[#111315] text-[#111315] flex items-center justify-center transition"
                      aria-label="Spesimen sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHighlightIdx((prev) => (prev + 1) % products.length)
                      }
                      className="w-8 h-8 border border-[#E4E2DD] bg-[#F8F7F4] hover:border-[#111315] text-[#111315] flex items-center justify-center transition"
                      aria-label="Spesimen berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Browser-Framed Specimen Screenshot */}
                <div className="border border-[#E4E2DD] bg-[#F8F7F4] overflow-hidden">
                  <div className="h-7 px-3 border-b border-[#E4E2DD] bg-[#F3F1EC] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2 h-2 rounded-full bg-[#D0CDC6]" />
                      <span className="w-2 h-2 rounded-full bg-[#D0CDC6]" />
                      <span className="w-2 h-2 rounded-full bg-[#D0CDC6]" />
                    </div>
                    <span className="font-mono text-[10px] text-[#5C6269] truncate">
                      birumarket.web.id/demo/{currentHighlight.slug}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#1D4ED8]">
                      LIVE
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(currentHighlight)}
                    className="w-full aspect-[16/10] bg-[#111315] overflow-hidden block text-left"
                    aria-label={`Buka spesifikasi ${currentHighlight.title}`}
                  >
                    <img
                      src={currentHighlight.thumbnail_url}
                      alt={currentHighlight.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/products/shot-pos-kuro.png';
                      }}
                      className="w-full h-full object-cover object-top hover:scale-[1.02] transition duration-300"
                    />
                  </button>
                </div>

                {/* Specimen Info & 3-Page Deep Links */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg leading-snug text-[#111315]">
                      {currentHighlight.title.replace(/\s*\(3 Halaman\)/gi, '')}
                    </h2>
                    <span className="font-mono text-xs font-bold text-[#111315] shrink-0 pt-0.5">
                      Rp {Number(currentHighlight.price).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <p className="text-xs text-[#525860] line-clamp-2 leading-relaxed">
                    {currentHighlight.tagline || currentHighlight.description}
                  </p>

                  {/* 3-Page Index Buttons */}
                  <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                    {([
                      { num: 1, label: '01 Storefront' },
                      { num: 2, label: '02 POS / Studio' },
                      { num: 3, label: '03 Backoffice' },
                    ] as const).map((pg) => (
                      <Link
                        key={pg.num}
                        href={`${currentHighlight.demo_url || `/demo/${currentHighlight.slug}`}?page=${pg.num}`}
                        className="px-2 py-1.5 bg-[#F8F7F4] hover:bg-[#111315] text-[#111315] hover:text-[#F8F7F4] border border-[#E4E2DD] font-semibold text-center truncate transition"
                      >
                        {pg.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#E4E2DD] grid grid-cols-2 gap-2.5 font-mono text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(currentHighlight)}
                    className="min-h-[40px] px-3 py-2 border border-[#D5D2CA] bg-white hover:border-[#111315] text-[#111315] transition"
                  >
                    Spesifikasi
                  </button>
                  <Link
                    href={currentHighlight.demo_url || `/demo/${currentHighlight.slug}`}
                    className="min-h-[40px] px-3 py-2 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] inline-flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Buka Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Browser-Framed 3-Page Showcase */}
      <section className="w-full border-b border-[#E4E2DD] bg-white/60">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] block">
                01 / Interactive 3-Page System Stage
              </span>
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight">
                Uji Langsung Arsitektur 3 Halaman{' '}
                <span className="font-serif-editorial italic font-normal text-3xl sm:text-4xl text-[#525860]">
                  di dalam browser.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#525860] max-w-3xl">
                Pilih salah satu dari 10 sistem di bawah, lalu berpindah antar{' '}
                <strong className="text-[#111315]">01 Storefront</strong>,{' '}
                <strong className="text-[#111315]">02 POS / Studio Utama</strong>, dan{' '}
                <strong className="text-[#111315]">03 Monitor Backoffice</strong> secara real-time.
              </p>
            </div>

            <Link
              href={`/demo/${liveSlug}?page=${livePage}`}
              className="min-h-[40px] px-4 py-2 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-mono text-xs font-semibold inline-flex items-center gap-2 shrink-0 self-start lg:self-auto transition"
            >
              <span>Buka Layar Penuh (/demo/{liveSlug})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 10-Product Selector Index Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {products.map((p, idx) => {
              const isSelected = p.slug === liveSlug;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setLiveSlug(p.slug);
                    setLivePage(1);
                  }}
                  className={`px-3.5 py-2 font-mono text-xs font-medium whitespace-nowrap border transition shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#111315] text-[#F8F7F4] border-[#111315]'
                      : 'bg-white text-[#3B4046] border-[#E4E2DD] hover:border-[#111315]'
                  }`}
                >
                  <span className={isSelected ? 'text-blue-300' : 'text-[#8C929A]'}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{p.title.split('·')[0].trim()}</span>
                </button>
              );
            })}
          </div>

          {/* Architectural Browser Chrome Frame */}
          <div className="border border-[#111315] bg-white shadow-sm overflow-hidden">
            {/* Browser Top Address & 3-Page Switcher Bar */}
            <div className="px-4 py-3 border-b border-[#E4E2DD] bg-[#F3F1EC] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Left Dots + Address Bar */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D0CDC6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D0CDC6]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D0CDC6]" />
                </div>

                <div className="px-3 py-1.5 bg-white border border-[#E4E2DD] font-mono text-xs text-[#262A2E] truncate flex-1 max-w-md">
                  https://birumarket.web.id/demo/{liveSlug}?page={livePage}
                </div>
              </div>

              {/* Right 3-Page Segmented Switcher */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#E8E5DE] p-1 border border-[#D5D2CA]">
                {stagePages.map((pg, idx) => {
                  const pageNum = pg.pageNumber;
                  const isCurr = livePage === pageNum;
                  const shortLabels = ['01 Storefront', '02 POS / App', '03 Backoffice'];
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setLivePage(pageNum)}
                      className={`px-3 py-1.5 font-mono text-[11px] font-semibold transition text-center truncate ${
                        isCurr
                          ? 'bg-[#111315] text-[#F8F7F4]'
                          : 'text-[#3B4046] hover:text-[#111315] hover:bg-white/60'
                      }`}
                    >
                      {shortLabels[idx] || pg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Page Context Sub-bar */}
            <div className="px-4 py-2 border-b border-[#E4E2DD] bg-[#F8F7F4] flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#525860]">
              <div>
                <span className="font-bold text-[#111315]">
                  {activeLiveProduct.sku} · {activeLiveProduct.title.replace(/\s*\(3 Halaman\)/gi, '')}
                </span>
                <span className="mx-2 text-[#C4C0B8]">|</span>
                <span>
                  Menampilkan:{' '}
                  <strong className="text-[#1D4ED8]">
                    {stagePages.find((p) => p.pageNumber === livePage)?.title || `Halaman 0${livePage}`}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(activeLiveProduct)}
                className="text-[#111315] font-semibold underline underline-offset-4 hover:text-[#1D4ED8]"
              >
                Lihat Spesifikasi &amp; Harga Lisensi →
              </button>
            </div>

            {/* Live Embedded 3-Page Website */}
            <div className="bg-white overflow-hidden">
              {renderInlineWebsite()}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 2-Column Large Editorial Catalog Grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E2DD] pb-6">
          <div className="space-y-1.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] block">
              02 / Direktori Katalog Utama
            </span>
            <h2 className="font-['Syne',sans-serif] text-2xl sm:text-4xl font-extrabold text-[#111315] tracking-tight">
              10 Sistem Web 3 Halaman{' '}
              <span className="font-serif-editorial italic font-normal text-3xl sm:text-4xl text-[#525860]">
                terkurasi.
              </span>
            </h2>
          </div>

          <Link
            href="/catalog"
            className="min-h-[42px] px-5 py-2.5 bg-white border border-[#D5D2CA] hover:border-[#111315] text-[#111315] font-mono text-xs font-semibold inline-flex items-center gap-2 transition self-start md:self-auto"
          >
            <span>Buka Indeks Katalog Penuh ({products.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'ALL'
                ? products.length
                : products.filter((p) => p.category === cat).length;
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[40px] px-4 py-2 font-mono text-xs font-semibold tracking-wider transition whitespace-nowrap inline-flex items-center gap-2 shrink-0 border ${
                  active
                    ? 'bg-[#111315] text-[#F8F7F4] border-[#111315]'
                    : 'bg-white text-[#3B4046] border-[#E4E2DD] hover:border-[#111315]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F8F7F4] text-[#687078]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status Feedback */}
        {fetchError && (
          <div className="p-4 bg-amber-50/90 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950">
            <span>{fetchError} Menampilkan arsip katalog terverifikasi.</span>
            <button
              type="button"
              onClick={loadProducts}
              className="px-3.5 py-1.5 bg-white border border-amber-400 font-mono font-semibold text-xs inline-flex items-center gap-1.5 hover:bg-amber-100 transition self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkronkan Ulang</span>
            </button>
          </div>
        )}

        {/* 2-Column Large Editorial Grid */}
        {loading && products.length === 0 ? (
          <div className="py-16 text-center font-mono text-xs uppercase tracking-wider text-[#687078]">
            Memuat arsip katalog dari database...
          </div>
        ) : filteredPreview.length === 0 ? (
          <div className="bg-white border border-[#E4E2DD] p-12 text-center space-y-4">
            <p className="text-sm font-medium text-[#525860]">
              Belum ada sistem pada kategori {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className="min-h-[40px] px-4 py-2 bg-[#111315] text-[#F8F7F4] font-mono text-xs font-semibold"
            >
              Tampilkan Semua Sistem
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPreview.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Architectural Handover Matrix */}
      <section className="w-full border-y border-[#E4E2DD] bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] block">
                03 / Engineering Handover
              </span>
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight leading-tight">
                Standar Akuisisi &amp; Serah Terima{' '}
                <span className="font-serif-editorial italic font-normal text-3xl text-[#525860]">
                  kode sumber.
                </span>
              </h2>
              <p className="text-sm text-[#525860] leading-relaxed">
                Setiap sistem di BiruMarket disimpan secara persisten di Supabase PostgreSQL + Storage dan dirancang dengan arsitektur modular 3 halaman yang bersih dari kode berlebih.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="min-h-[42px] px-5 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-mono text-xs font-semibold inline-flex items-center gap-2 transition"
                >
                  <span>Pelajari Dokumentasi Lisensi</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#E4E2DD] border-t lg:border-t-0 border-[#E4E2DD]">
              <div className="py-6 first:pt-0 flex items-start gap-4">
                <div className="w-11 h-11 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase">
                    01 / Paket Source Code 3 Halaman &amp; Skema Database
                  </span>
                  <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111315] mt-0.5">
                    Storefront Katalog + Terminal POS/Studio + Monitor Backoffice
                  </h3>
                  <p className="text-sm text-[#525860] mt-1 leading-relaxed">
                    Bukan sekadar potongan tampilan tunggal: setiap repositori mencakup halaman etalase produk, ruang kerja transaksi utama, serta panel pantau operasional.
                  </p>
                </div>
              </div>

              <div className="py-6 flex items-start gap-4">
                <div className="w-11 h-11 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase">
                    02 / Inspeksi Langsung Sebelum Transaksi
                  </span>
                  <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111315] mt-0.5">
                    Simulasi Alur Lintas Halaman di Browser
                  </h3>
                  <p className="text-sm text-[#525860] mt-1 leading-relaxed">
                    Uji interaksi produk di Halaman 01, jalankan kalkulasi atau transaksi di Halaman 02, dan pantau perubahan status langsung di Halaman 03 sebelum mengakuisisi lisensi.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-start gap-4">
                <div className="w-11 h-11 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] uppercase">
                    03 / Opsi Turnkey Cloud Deployment
                  </span>
                  <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111315] mt-0.5">
                    Instalasi Penuh ke Vercel, VPS, &amp; Domain Kustom
                  </h3>
                  <p className="text-sm text-[#525860] mt-1 leading-relaxed">
                    Pilih opsi Turnkey saat memesan untuk menyerahkan proses setup hosting, konfigurasi database cloud, dan penyambungan DNS domain bisnis Anda hingga siap beroperasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Archival Commission & Bundle Order Ticket */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-20">
        <div className="bg-white border border-[#111315]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Ticket Body (8 cols) */}
            <form
              onSubmit={handleInquirySubmit}
              className="lg:col-span-8 p-6 sm:p-10 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#D5D2CA] pb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                  04 / Tiket Komisi &amp; Akuisisi Bundle
                </span>
                <span className="font-mono text-xs text-[#687078]">
                  {CONTACT_INFO.domain}
                </span>
              </div>

              <div>
                <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight">
                  Butuh Kustomisasi Arsitektur atau{' '}
                  <span className="font-serif-editorial italic font-normal text-3xl text-[#525860]">
                    paket bundle?
                  </span>
                </h2>
                <p className="text-sm text-[#525860] mt-1.5 leading-relaxed">
                  Pilih cakupan layanan di bawah untuk meneruskan spesifikasi kebutuhan langsung ke WhatsApp {CONTACT_INFO.ownerName}.
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-[#525860]">
                  Pilih Cakupan Layanan
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Custom Web / AI SaaS',
                    'Bundle 3+ Source Code',
                    'Turnkey Deploy + Domain',
                    'Modifikasi Fitur Aplikasi',
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setInquiryScope(opt)}
                      className={`min-h-[40px] px-4 py-2 font-mono text-xs font-semibold border transition ${
                        inquiryScope === opt
                          ? 'bg-[#111315] text-[#F8F7F4] border-[#111315]'
                          : 'bg-[#F8F7F4] text-[#3B4046] border-[#E4E2DD] hover:border-[#111315]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-note"
                  className="block font-mono text-xs font-bold uppercase tracking-wider text-[#525860] mb-2"
                >
                  Catatan Spesifikasi / Domain Target (Opsional)
                </label>
                <textarea
                  id="inquiry-note"
                  rows={2}
                  value={inquiryNote}
                  onChange={(e) => setInquiryNote(e.target.value)}
                  placeholder="Contoh: Akuisisi KuroBento POS + penyesuaian menu & printer termal..."
                  className="w-full px-4 py-3 border border-[#D5D2CA] bg-[#F8F7F4] text-sm text-[#111315] placeholder:text-[#8C929A] focus:bg-white focus:border-[#111315] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="min-h-[44px] px-6 py-3 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-mono font-semibold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Tiket via WhatsApp</span>
              </button>
            </form>

            {/* Right Archival Stub (4 cols) */}
            <div className="lg:col-span-4 bg-[#F8F7F4] border-t lg:border-t-0 lg:border-l border-dashed border-[#D5D2CA] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src="/products/fikri-profile.jpg"
                  alt={CONTACT_INFO.ownerName}
                  className="w-16 h-16 object-cover border border-[#111315] shrink-0"
                />
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] block">
                    Principal Engineer
                  </span>
                  <h3 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#111315]">
                    {CONTACT_INFO.ownerName}
                  </h3>
                  <p className="text-xs text-[#525860]">{CONTACT_INFO.ownerRole}</p>
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-xs border-y border-[#E4E2DD] py-4">
                <div className="flex justify-between gap-2">
                  <span className="text-[#687078]">CAKUPAN</span>
                  <span className="font-bold text-[#111315] text-right">{inquiryScope}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#687078]">WHATSAPP</span>
                  <span className="font-bold text-[#111315]">
                    {CONTACT_INFO.whatsappDisplay}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#687078]">PORTFOLIO</span>
                  <a
                    href={CONTACT_INFO.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#1D4ED8] hover:underline"
                  >
                    fikribintang.web.id
                  </a>
                </div>
              </div>

              <div className="font-mono text-[11px] text-[#687078] flex items-center justify-between">
                <span>ARCHIVE #BM-2026</span>
                <span>DIRECT HANDOVER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
