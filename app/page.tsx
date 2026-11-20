'use client';

import { useEffect, useState, useRef } from 'react';
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
  ArrowUp,
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
  Sparkles,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

  // Commission inquiry state
  const [inquiryScope, setInquiryScope] = useState('Custom Web / AI SaaS');
  const [inquiryNote, setInquiryNote] = useState('');

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // GSAP Animations with ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reading Progress Bar pinned at top of Navbar
      gsap.to('#navbar-scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.15,
        },
      });

      // 2. Hero Initial Entrance
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo(
          '.gsap-hero-elem',
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
        )
        .fromTo(
          '.gsap-hero-card',
          { opacity: 0, scale: 0.95, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          '-=0.45'
        );

      // 3. Hero Parallax Scrub on Scroll
      if (heroRef.current) {
        gsap.to('.gsap-hero-left', {
          y: -35,
          opacity: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to('.gsap-hero-card', {
          y: -20,
          scale: 0.98,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 4. Section 01: Interactive 3-Page System Stage Entrance
      gsap.fromTo(
        '.gsap-stage-header',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stage-section',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-stage-strip',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-stage-strip',
            start: 'top 88%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-stage-box',
        { opacity: 0, y: 55, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-stage-box',
            start: 'top 85%',
          },
        }
      );

      // 5. Section 02: Catalog Grid Header & Staggered Cards
      gsap.fromTo(
        '.gsap-grid-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-grid-container',
            start: 'top 88%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-category-strip',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-category-strip',
            start: 'top 88%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-grid-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.gsap-grid-container',
            start: 'top 80%',
          },
        }
      );

      // 6. Section 03: Architectural Handover Matrix (Timeline Progression)
      gsap.fromTo(
        '.gsap-handover-left',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-handover-section',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-handover-item',
        { opacity: 0, y: 30, x: 20 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.65,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-handover-container',
            start: 'top 80%',
          },
        }
      );

      // 7. Section 04: Commission & Order Ticket
      gsap.fromTo(
        '.gsap-ticket-box',
        { opacity: 0, y: 45, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-ticket-box',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.gsap-ticket-stub',
        { opacity: 0, x: 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.gsap-ticket-box',
            start: 'top 82%',
          },
        }
      );

      // 8. Floating Scroll to Top Pill Visibility
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'bottom top',
        onEnter: () => {
          gsap.to('#floating-scroll-top', {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to('#floating-scroll-top', {
            opacity: 0,
            y: 16,
            pointerEvents: 'none',
            duration: 0.25,
            ease: 'power2.in',
          });
        },
      });
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [products]);

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

      {/* Section 1: Modern Rounded Editorial Hero */}
      <section ref={heroRef} className="w-full border-b border-[#E4E2DD]/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column (7 cols): Editorial Positioning & Search */}
            <div className="gsap-hero-left lg:col-span-7 space-y-7">
              <div className="gsap-hero-elem inline-flex items-center gap-2.5 border border-[#E4E2DD] bg-white px-4 py-1.5 rounded-full text-xs font-semibold text-[#525860] shadow-sm">
                <span className="text-[#111315] font-extrabold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  ISSUE 01
                </span>
                <span>·</span>
                <span>{CONTACT_INFO.domain}</span>
                <span>·</span>
                <span className="text-[#1D4ED8] font-bold">10 Sistem 3 Halaman</span>
              </div>

              <div className="space-y-4">
                <h1 className="gsap-hero-elem text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight leading-[1.08] text-[#111315]">
                  Arsitektur Web &amp; Terminal POS{' '}
                  <span className="text-[#1D4ED8] underline decoration-blue-200 underline-offset-8">
                    siap akuisisi.
                  </span>
                </h1>

                <p className="gsap-hero-elem text-[#525860] text-sm sm:text-base max-w-xl leading-relaxed font-medium">
                  Katalog terkurasi berisi 10 sistem aplikasi web utuh karya{' '}
                  <strong className="text-[#111315] font-bold">
                    {CONTACT_INFO.ownerName}
                  </strong>
                  . Setiap produk mengintegrasikan{' '}
                  <span className="text-[#111315] font-semibold">
                    01 Storefront &amp; Katalog Produk
                  </span>
                  ,{' '}
                  <span className="text-[#111315] font-semibold">
                    02 Terminal POS / Studio Aplikasi
                  </span>
                  , serta{' '}
                  <span className="text-[#111315] font-semibold">
                    03 Monitor Backoffice
                  </span>{' '}
                  yang dapat diuji langsung sebelum serah terima source code.
                </p>
              </div>

              {/* Editorial Search Form */}
              <form
                onSubmit={handleHeroSearch}
                className="gsap-hero-elem flex flex-col sm:flex-row gap-2.5 max-w-xl"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8C929A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Cari sistem (Ramen POS, Roastery, Apotek, Split Bill, Legal)..."
                    aria-label="Cari produk di katalog"
                    className="w-full min-h-[48px] pl-11 pr-5 py-2.5 bg-white border border-[#D5D2CA] rounded-full text-[#111315] placeholder:text-[#8C929A] text-sm font-medium focus:border-[#111315] focus:outline-none shadow-sm transition"
                  />
                </div>
                <button
                  type="submit"
                  className="min-h-[48px] px-6 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-bold text-xs uppercase tracking-wider rounded-full transition inline-flex items-center justify-center gap-2 shrink-0 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Telusuri Katalog</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>

              {/* Indexed Category Strip */}
              <div className="gsap-hero-elem pt-2 border-t border-[#E4E2DD] flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#687078] mr-1">
                  Indeks Kategori:
                </span>
                {CATEGORIES.filter((c) => c !== 'ALL').map((cat, idx) => (
                  <Link
                    key={cat}
                    href={`/catalog?category=${encodeURIComponent(cat)}`}
                    className="px-3.5 py-1.5 bg-white hover:bg-[#111315] text-[#111315] hover:text-[#F8F7F4] border border-[#E4E2DD] rounded-full text-xs font-semibold transition inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="text-[#8C929A] font-bold">0{idx + 1}</span>
                    <span>{cat}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column (5 cols): Featured Editorial Specimen Card */}
            <div className="lg:col-span-5">
              <div className="gsap-hero-card bg-white border border-[#111315]/30 rounded-[2rem] p-5 sm:p-6 space-y-4 shadow-xl">
                {/* Specimen Header */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E4E2DD]">
                  <div className="flex items-center gap-2 min-w-0 text-xs">
                    <span className="px-3 py-1 bg-[#111315] text-[#F8F7F4] font-extrabold uppercase rounded-full">
                      {currentHighlight.sku || 'BM-01'}
                    </span>
                    <span className="text-[#687078] font-bold truncate">
                      SPESIMEN {String((highlightIdx % Math.max(products.length, 1)) + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setHighlightIdx(
                          (prev) => (prev - 1 + products.length) % products.length
                        )
                      }
                      className="w-9 h-9 border border-[#E4E2DD] bg-[#F8F7F4] hover:border-[#111315] text-[#111315] rounded-full flex items-center justify-center transition shadow-sm"
                      aria-label="Spesimen sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHighlightIdx((prev) => (prev + 1) % products.length)
                      }
                      className="w-9 h-9 border border-[#E4E2DD] bg-[#F8F7F4] hover:border-[#111315] text-[#111315] rounded-full flex items-center justify-center transition shadow-sm"
                      aria-label="Spesimen berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Browser-Framed Specimen Screenshot */}
                <div className="border border-[#E4E2DD] bg-[#F8F7F4] rounded-2xl overflow-hidden shadow-inner">
                  <div className="h-8 px-3 border-b border-[#E4E2DD] bg-[#F3F1EC] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#5C6269] truncate">
                      birumarket.web.id/demo/{currentHighlight.slug}
                    </span>
                    <span className="text-[10px] font-bold text-[#1D4ED8] px-2 py-0.5 rounded-full bg-blue-50">
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
                      className="w-full h-full object-cover object-top hover:scale-[1.03] transition duration-500 ease-out"
                    />
                  </button>
                </div>

                {/* Specimen Info & 3-Page Deep Links */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-extrabold text-base sm:text-lg leading-snug text-[#111315]">
                      {currentHighlight.title.replace(/\s*\(3 Halaman\)/gi, '')}
                    </h2>
                    <span className="text-xs font-extrabold text-[#111315] shrink-0 pt-0.5 px-2.5 py-1 rounded-full bg-[#EAE7E1]">
                      Rp {Number(currentHighlight.price).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <p className="text-xs text-[#525860] line-clamp-2 leading-relaxed font-medium">
                    {currentHighlight.tagline || currentHighlight.description}
                  </p>

                  {/* 3-Page Index Buttons */}
                  <div className="grid grid-cols-3 gap-2 text-[11px]">
                    {([
                      { num: 1, label: '01 Storefront' },
                      { num: 2, label: '02 POS / Studio' },
                      { num: 3, label: '03 Backoffice' },
                    ] as const).map((pg) => (
                      <Link
                        key={pg.num}
                        href={`${currentHighlight.demo_url || `/demo/${currentHighlight.slug}`}?page=${pg.num}`}
                        className="px-2 py-2 bg-[#F8F7F4] hover:bg-[#111315] text-[#111315] hover:text-[#F8F7F4] border border-[#E4E2DD] rounded-xl font-bold text-center truncate transition shadow-sm"
                      >
                        {pg.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#E4E2DD] grid grid-cols-2 gap-3 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(currentHighlight)}
                    className="min-h-[42px] px-3 py-2 border border-[#D5D2CA] bg-white hover:border-[#111315] text-[#111315] rounded-full transition shadow-sm hover:shadow"
                  >
                    Spesifikasi
                  </button>
                  <Link
                    href={currentHighlight.demo_url || `/demo/${currentHighlight.slug}`}
                    className="min-h-[42px] px-3 py-2 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] rounded-full inline-flex items-center justify-center gap-1.5 transition shadow-sm hover:shadow-md hover:scale-[1.02]"
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
      <section className="gsap-stage-section w-full border-b border-[#E4E2DD] bg-white/60">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-18 space-y-7">
          <div className="gsap-stage-header flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                01 / Interactive 3-Page System Stage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight">
                Uji Langsung Arsitektur 3 Halaman{' '}
                <span className="text-[#525860] font-bold">
                  di dalam browser.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#525860] max-w-3xl font-medium">
                Pilih salah satu dari 10 sistem di bawah, lalu berpindah antar{' '}
                <strong className="text-[#111315] font-bold">01 Storefront</strong>,{' '}
                <strong className="text-[#111315] font-bold">02 POS / Studio Utama</strong>, dan{' '}
                <strong className="text-[#111315] font-bold">03 Monitor Backoffice</strong> secara real-time.
              </p>
            </div>

            <Link
              href={`/demo/${liveSlug}?page=${livePage}`}
              className="min-h-[42px] px-5 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] text-xs font-bold rounded-full inline-flex items-center gap-2 shrink-0 self-start lg:self-auto transition shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <span>Buka Layar Penuh (/demo/{liveSlug})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 10-Product Selector Index Strip */}
          <div className="gsap-stage-strip flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
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
                  className={`px-4 py-2 text-xs font-bold whitespace-nowrap rounded-full border transition shrink-0 flex items-center gap-2 shadow-sm ${
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
          <div className="gsap-stage-box border border-[#111315]/20 bg-white rounded-[2rem] shadow-xl overflow-hidden">
            {/* Browser Top Address & 3-Page Switcher Bar */}
            <div className="px-5 py-3.5 border-b border-[#E4E2DD] bg-[#F3F1EC] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              {/* Left Dots + Address Bar */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFB74D]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]" />
                </div>

                <div className="px-4 py-1.5 bg-white border border-[#E4E2DD] rounded-full text-xs font-semibold text-[#262A2E] truncate flex-1 max-w-md shadow-sm">
                  https://birumarket.web.id/demo/{liveSlug}?page={livePage}
                </div>
              </div>

              {/* Right 3-Page Segmented Switcher */}
              <div className="grid grid-cols-3 gap-1.5 bg-[#E8E5DE] p-1.5 rounded-full border border-[#D5D2CA]">
                {stagePages.map((pg, idx) => {
                  const pageNum = pg.pageNumber;
                  const isCurr = livePage === pageNum;
                  const shortLabels = ['01 Storefront', '02 POS / App', '03 Backoffice'];
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setLivePage(pageNum)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition text-center truncate ${
                        isCurr
                          ? 'bg-[#111315] text-[#F8F7F4] shadow-sm'
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
            <div className="px-5 py-2.5 border-b border-[#E4E2DD] bg-[#F8F7F4] flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-[#525860]">
              <div>
                <span className="font-extrabold text-[#111315]">
                  {activeLiveProduct.sku} · {activeLiveProduct.title.replace(/\s*\(3 Halaman\)/gi, '')}
                </span>
                <span className="mx-2 text-[#C4C0B8]">|</span>
                <span>
                  Menampilkan:{' '}
                  <strong className="text-[#1D4ED8] font-bold">
                    {stagePages.find((p) => p.pageNumber === livePage)?.title || `Halaman 0${livePage}`}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(activeLiveProduct)}
                className="text-[#111315] font-bold underline underline-offset-4 hover:text-[#1D4ED8]"
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
      <section ref={gridRef} className="gsap-grid-container max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 space-y-8">
        <div className="gsap-grid-header flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E2DD] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
              02 / Direktori Katalog Utama
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111315] tracking-tight">
              10 Sistem Web 3 Halaman{' '}
              <span className="text-[#525860] font-bold">
                terkurasi.
              </span>
            </h2>
          </div>

          <Link
            href="/catalog"
            className="min-h-[44px] px-6 py-2.5 bg-white border border-[#D5D2CA] hover:border-[#111315] text-[#111315] text-xs font-bold rounded-full inline-flex items-center gap-2 transition shadow-sm hover:shadow self-start md:self-auto"
          >
            <span>Buka Indeks Katalog Penuh ({products.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="gsap-category-strip flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
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
                className={`min-h-[40px] px-4 py-2 text-xs font-bold rounded-full transition whitespace-nowrap inline-flex items-center gap-2 shrink-0 border shadow-sm ${
                  active
                    ? 'bg-[#111315] text-[#F8F7F4] border-[#111315]'
                    : 'bg-white text-[#3B4046] border-[#E4E2DD] hover:border-[#111315]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
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
          <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 font-medium">
            <span>{fetchError} Menampilkan arsip katalog terverifikasi.</span>
            <button
              type="button"
              onClick={loadProducts}
              className="px-4 py-2 bg-white border border-amber-400 font-bold text-xs rounded-full inline-flex items-center gap-1.5 hover:bg-amber-100 transition self-start sm:self-auto shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkronkan Ulang</span>
            </button>
          </div>
        )}

        {/* 2-Column Large Editorial Grid */}
        {loading && products.length === 0 ? (
          <div className="py-16 text-center text-xs font-bold uppercase tracking-wider text-[#687078]">
            Memuat arsip katalog dari database...
          </div>
        ) : filteredPreview.length === 0 ? (
          <div className="bg-white border border-[#E4E2DD] rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <p className="text-sm font-semibold text-[#525860]">
              Belum ada sistem pada kategori {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className="min-h-[42px] px-5 py-2 bg-[#111315] text-[#F8F7F4] text-xs font-bold rounded-full shadow-sm"
            >
              Tampilkan Semua Sistem
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPreview.map((product) => (
              <div key={product.id} className="gsap-grid-card">
                <ProductCard
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Architectural Handover Matrix */}
      <section className="gsap-handover-section w-full border-y border-[#E4E2DD] bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="gsap-handover-left lg:col-span-5 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                03 / Engineering Handover
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight leading-tight">
                Standar Akuisisi &amp; Serah Terima{' '}
                <span className="text-[#525860]">
                  kode sumber.
                </span>
              </h2>
              <p className="text-sm text-[#525860] leading-relaxed font-medium">
                Setiap sistem di BiruMarket disimpan secara persisten di Supabase PostgreSQL + Storage dan dirancang dengan arsitektur modular 3 halaman yang bersih dari kode berlebih.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="min-h-[44px] px-6 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] text-xs font-bold rounded-full inline-flex items-center gap-2 transition shadow-sm hover:shadow-md"
                >
                  <span>Pelajari Dokumentasi Lisensi</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="gsap-handover-container lg:col-span-7 divide-y divide-[#E4E2DD] border-t lg:border-t-0 border-[#E4E2DD]">
              <div className="gsap-handover-item py-6 first:pt-0 flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Database className="w-5 h-5 text-[#1D4ED8]" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#1D4ED8] uppercase">
                    01 / Paket Source Code 3 Halaman &amp; Skema Database
                  </span>
                  <h3 className="font-extrabold text-base text-[#111315] mt-1">
                    Storefront Katalog + Terminal POS/Studio + Monitor Backoffice
                  </h3>
                  <p className="text-sm text-[#525860] mt-1.5 leading-relaxed font-medium">
                    Bukan sekadar potongan tampilan tunggal: setiap repositori mencakup halaman etalase produk, ruang kerja transaksi utama, serta panel pantau operasional.
                  </p>
                </div>
              </div>

              <div className="gsap-handover-item py-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Globe className="w-5 h-5 text-[#1D4ED8]" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#1D4ED8] uppercase">
                    02 / Inspeksi Langsung Sebelum Transaksi
                  </span>
                  <h3 className="font-extrabold text-base text-[#111315] mt-1">
                    Simulasi Alur Lintas Halaman di Browser
                  </h3>
                  <p className="text-sm text-[#525860] mt-1.5 leading-relaxed font-medium">
                    Uji interaksi produk di Halaman 01, jalankan kalkulasi atau transaksi di Halaman 02, dan pantau perubahan status langsung di Halaman 03 sebelum mengakuisisi lisensi.
                  </p>
                </div>
              </div>

              <div className="gsap-handover-item pt-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F8F7F4] border border-[#E4E2DD] text-[#111315] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <Server className="w-5 h-5 text-[#1D4ED8]" />
                </div>
                <div>
                  <span className="text-xs font-extrabold text-[#1D4ED8] uppercase">
                    03 / Opsi Turnkey Cloud Deployment
                  </span>
                  <h3 className="font-extrabold text-base text-[#111315] mt-1">
                    Instalasi Penuh ke Vercel, VPS, &amp; Domain Kustom
                  </h3>
                  <p className="text-sm text-[#525860] mt-1.5 leading-relaxed font-medium">
                    Pilih opsi Turnkey saat memesan untuk menyerahkan proses setup hosting, konfigurasi database cloud, dan penyambungan DNS domain bisnis Anda hingga siap beroperasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Commission & Order Ticket */}
      <section className="gsap-ticket-section max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-14 sm:pt-20">
        <div className="gsap-ticket-box bg-white border border-[#111315]/20 rounded-[2.5rem] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Ticket Body (8 cols) */}
            <form
              onSubmit={handleInquirySubmit}
              className="lg:col-span-8 p-6 sm:p-10 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#D5D2CA] pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                  04 / Tiket Komisi &amp; Akuisisi Bundle
                </span>
                <span className="text-xs font-semibold text-[#687078]">
                  {CONTACT_INFO.domain}
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight">
                  Butuh Kustomisasi Arsitektur atau{' '}
                  <span className="text-[#525860]">
                    paket bundle?
                  </span>
                </h2>
                <p className="text-sm text-[#525860] mt-2 leading-relaxed font-medium">
                  Pilih cakupan layanan di bawah untuk meneruskan spesifikasi kebutuhan langsung ke WhatsApp {CONTACT_INFO.ownerName}.
                </p>
              </div>

              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#525860]">
                  Pilih Cakupan Layanan
                </span>
                <div className="flex flex-wrap gap-2.5">
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
                      className={`min-h-[42px] px-5 py-2 text-xs font-bold rounded-full border transition shadow-sm ${
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
                  className="block text-xs font-bold uppercase tracking-wider text-[#525860] mb-2"
                >
                  Catatan Spesifikasi / Domain Target (Opsional)
                </label>
                <textarea
                  id="inquiry-note"
                  rows={2}
                  value={inquiryNote}
                  onChange={(e) => setInquiryNote(e.target.value)}
                  placeholder="Contoh: Akuisisi KuroBento POS + penyesuaian menu & printer termal..."
                  className="w-full px-5 py-3.5 border border-[#D5D2CA] bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] placeholder:text-[#8C929A] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="min-h-[48px] px-7 py-3 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-bold text-xs uppercase tracking-wider rounded-full inline-flex items-center gap-2 transition shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Tiket via WhatsApp</span>
              </button>
            </form>

            {/* Right Archival Stub (4 cols) */}
            <div className="gsap-ticket-stub lg:col-span-4 bg-[#F8F7F4] border-t lg:border-t-0 lg:border-l border-dashed border-[#D5D2CA] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src="/products/fikri-profile.jpg"
                  alt={CONTACT_INFO.ownerName}
                  className="w-16 h-16 object-cover rounded-2xl border border-[#111315] shrink-0 shadow-sm"
                />
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                    Principal Engineer
                  </span>
                  <h3 className="font-extrabold text-lg text-[#111315]">
                    {CONTACT_INFO.ownerName}
                  </h3>
                  <p className="text-xs text-[#525860] font-medium">{CONTACT_INFO.ownerRole}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-y border-[#E4E2DD] py-4 font-semibold">
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

              <div className="text-xs font-bold text-[#687078] flex items-center justify-between">
                <span>ARCHIVE #BM-2026</span>
                <span>DIRECT HANDOVER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back to Top / Quick Bar */}
      <div
        id="floating-scroll-top"
        className="fixed bottom-6 right-6 z-50 opacity-0 translate-y-4 pointer-events-none"
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="h-11 px-4 bg-[#111315]/95 hover:bg-[#1D4ED8] text-[#F8F7F4] backdrop-blur-md border border-white/10 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition hover:scale-105 active:scale-95"
          aria-label="Kembali ke atas"
        >
          <ArrowUp className="w-3.5 h-3.5 text-blue-300" />
          <span>Ke Atas</span>
        </button>
      </div>

      <Footer />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
