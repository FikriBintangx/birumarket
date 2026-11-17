'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import {
  CONTACT_INFO,
  DEFAULT_PRODUCTS,
  ProductItem,
} from '@/lib/catalog-data';
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

const CATEGORIES = ['ALL', 'SAAS WEB', 'E-COMMERCE', 'MOBILE APPS', 'SCRIPTS & BOTS'];

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Boarding pass inquiry state
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

  const filteredPreview =
    activeCategory === 'ALL'
      ? products.slice(0, 6)
      : products.filter((p) => p.category === activeCategory).slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroSearch.trim();
    router.push(q ? `/catalog?search=${encodeURIComponent(q)}` : '/catalog');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `Halo Fikri, saya mengirim Tiket Request dari BiruMarket (${CONTACT_INFO.domain}):`,
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

  return (
    <main>
      <Navbar />

      {/* Section 1: Architectural Hero & Interactive App Stage */}
      <section className="hero-navy-canvas rounded-[1.75rem] sm:rounded-[2.25rem] p-5 sm:p-8 lg:p-11 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column (7 cols): Positioning & Instant Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-blue-200">
                {CONTACT_INFO.domain} · Katalog Resmi {CONTACT_INFO.ownerName}
              </span>
            </div>

            <h1 className="font-['Syne',sans-serif] text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold uppercase tracking-tight leading-[1.06]">
              SOURCE CODE &amp; APLIKASI{' '}
              <span className="text-blue-300">SIAP DEPLOY</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed">
              Koleksi web app, AI SaaS, e-commerce, dan otomasi yang dirancang dan dibangun langsung oleh {CONTACT_INFO.ownerName}. Uji setiap live demo di browser sebelum melakukan akuisisi source code.
            </p>

            {/* Quick Search Bar */}
            <form
              onSubmit={handleHeroSearch}
              className="flex flex-col sm:flex-row gap-2.5 max-w-xl"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Cari produk atau tech stack (contoh: Next.js, RAG, Laravel)..."
                  aria-label="Cari produk di katalog"
                  className="w-full min-h-[46px] pl-11 pr-4 py-2.5 rounded-xl bg-white text-[#0B2545] placeholder:text-slate-400 text-sm font-medium border border-transparent focus:border-blue-300 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#1D4ED8] hover:bg-blue-600 text-white font-bold text-sm transition inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Cari Katalog</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>

            {/* Category Quick Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.filter((c) => c !== 'ALL').map((cat) => (
                <Link
                  key={cat}
                  href={`/catalog?category=${encodeURIComponent(cat)}`}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#0B2545] border border-white/20 font-mono text-xs font-bold tracking-wider transition whitespace-nowrap inline-flex items-center shrink-0"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Live Featured App Stage */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[#0B2545] rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xl">
              {/* Stage Header */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0B2545] text-white shrink-0">
                    {currentHighlight.sku || 'FEATURED'}
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[#1D4ED8] truncate">
                    {currentHighlight.category}
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
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition"
                    aria-label="Produk unggulan sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setHighlightIdx((prev) => (prev + 1) % products.length)
                    }
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition"
                    aria-label="Produk unggulan berikutnya"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Screenshot */}
              <button
                type="button"
                onClick={() => setSelectedProduct(currentHighlight)}
                className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 block text-left"
                aria-label={`Buka detail ${currentHighlight.title}`}
              >
                <img
                  src={currentHighlight.thumbnail_url}
                  alt={currentHighlight.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/products/p-jurnalku.png';
                  }}
                  className="w-full h-full object-cover hover:scale-[1.02] transition duration-300"
                />
              </button>

              {/* Details */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-['Syne',sans-serif] font-extrabold text-lg leading-snug text-[#0B2545]">
                    {currentHighlight.title}
                  </h2>
                  <span className="font-mono text-xs font-bold text-[#1D4ED8] shrink-0 pt-0.5">
                    {currentHighlight.is_portfolio
                      ? 'Showcase'
                      : `Rp ${Number(currentHighlight.price).toLocaleString('id-ID')}`}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {currentHighlight.tagline || currentHighlight.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentHighlight.tech_stack.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(currentHighlight)}
                  className="min-h-[42px] px-3 py-2 rounded-xl bg-[#0B2545] hover:bg-[#123663] text-white font-bold text-xs transition"
                >
                  Spesifikasi Lengkap
                </button>
                {currentHighlight.demo_url ? (
                  <a
                    href={currentHighlight.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[42px] px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0B2545] font-bold text-xs inline-flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Uji Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href="/catalog"
                    className="min-h-[42px] px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[#0B2545] font-bold text-xs inline-flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Buka Katalog</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Curated Marketplace Catalog Preview */}
      <section className="mt-10 sm:mt-14 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              Katalog Aplikasi &amp; Source Code
            </span>
            <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] uppercase tracking-tight mt-1">
              Produk Unggulan Siap Pakai
            </h2>
          </div>

          <Link
            href="/catalog"
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-[#0B2545] text-[#0B2545] font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition self-start md:self-auto"
          >
            <span>Lihat Semua {products.length} Produk</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
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
                className={`min-h-[42px] px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition whitespace-nowrap inline-flex items-center gap-2 shrink-0 border ${
                  active
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500'
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
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
            <span>{fetchError} Menampilkan katalog bawaan yang terverifikasi.</span>
            <button
              type="button"
              onClick={loadProducts}
              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-amber-100 transition self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sinkronkan Ulang</span>
            </button>
          </div>
        )}

        {/* Grid State */}
        {loading && products.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-600">
            Memuat katalog produk dari database...
          </div>
        ) : filteredPreview.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
            <p className="text-sm font-semibold text-slate-700">
              Belum ada produk di kategori {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('ALL')}
              className="min-h-[40px] px-4 py-2 rounded-xl bg-[#0B2545] text-white text-xs font-bold"
            >
              Tampilkan Semua Kategori
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Section 3: Standar Serah Terima & Lisensi Kode */}
      <section className="mt-12 sm:mt-16 bg-white rounded-[1.75rem] sm:rounded-[2.25rem] border border-slate-200 p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              Engineering Handover
            </span>
            <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] uppercase tracking-tight leading-tight">
              Standar Serah Terima &amp; Lisensi Kode
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transaksi di BiruMarket dirancang transparan layaknya penyerahan proyek rekayasa perangkat lunak profesional. Anda tahu persis apa yang diterima sebelum membayar.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#123663] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition"
              >
                <span>Pelajari Alur Lisensi</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-slate-200">
            <div className="pb-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                  01 / Source Code &amp; Database Migration
                </span>
                <h3 className="font-bold text-base text-[#0B2545] mt-0.5">
                  Repositori Penuh + Skema SQL / Supabase
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Setiap paket mencakup seluruh kode sumber frontend &amp; backend, file migration atau <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">supabase-schema.sql</code>, serta daftar environment variables agar dapat dijalankan lokal tanpa menebak.
                </p>
              </div>
            </div>

            <div className="py-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                  02 / Verifikasi Live Demo Sebelum Pembelian
                </span>
                <h3 className="font-bold text-base text-[#0B2545] mt-0.5">
                  Uji Alur &amp; Responsivitas Langsung di Browser
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Tautan Live Demo pada setiap kartu produk mengarah ke deployment aktif sehingga Anda dapat menguji UI, fitur utama, dan kecepatan aplikasi sebelum memutuskan akuisisi.
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-blue-200 text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                  03 / Opsi Turnkey Cloud Deployment
                </span>
                <h3 className="font-bold text-base text-[#0B2545] mt-0.5">
                  Terima Beres ke Vercel, VPS, &amp; Domain Kustom
                </h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  Butuh sistem langsung tayang di domain perusahaan Anda? Pilih paket Turnkey saat memesan untuk dibantu setup hosting, database cloud, dan konfigurasi DNS sampai live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Custom Project & Bundle Boarding Pass */}
      <section className="mt-10 sm:mt-14 bg-white rounded-[1.75rem] sm:rounded-[2.25rem] border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Ticket Body (8 cols) */}
          <form
            onSubmit={handleInquirySubmit}
            className="lg:col-span-8 p-6 sm:p-10 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-slate-300 pb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                Tiket Permintaan Kustom · Boarding Pass
              </span>
              <span className="font-mono text-xs text-slate-500">
                {CONTACT_INFO.domain}
              </span>
            </div>

            <div>
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] uppercase tracking-tight">
                Butuh Kustomisasi Fitur atau Paket Bundle?
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                Pilih kebutuhan Anda untuk langsung mengirim ringkasan spesifikasi ke WhatsApp {CONTACT_INFO.ownerName}.
              </p>
            </div>

            <div className="space-y-3">
              <span className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-600">
                Pilih Tipe Layanan
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
                    className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      inquiryScope === opt
                        ? 'bg-[#0B2545] text-white border-[#0B2545]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
                className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-600 mb-2"
              >
                Catatan Kebutuhan / Domain Target (Opsional)
              </label>
              <textarea
                id="inquiry-note"
                rows={2}
                value={inquiryNote}
                onChange={(e) => setInquiryNote(e.target.value)}
                placeholder="Contoh: Mau beli JurnalKu + setup di domain kampus.ac.id, atau butuh tambahan integrasi Midtrans..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#0B2545] placeholder:text-slate-400 focus:bg-white focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="min-h-[46px] px-6 py-3 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-sm inline-flex items-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Kirim Tiket via WhatsApp</span>
            </button>
          </form>

          {/* Right Boarding Stub (4 cols) */}
          <div className="lg:col-span-4 bg-slate-50 border-t lg:border-t-0 lg:border-l border-dashed border-slate-300 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/products/fikri-profile.jpg"
                alt={CONTACT_INFO.ownerName}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] block">
                  Lead Engineer
                </span>
                <h3 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#0B2545]">
                  {CONTACT_INFO.ownerName}
                </h3>
                <p className="text-xs text-slate-600">{CONTACT_INFO.ownerRole}</p>
              </div>
            </div>

            <div className="space-y-2.5 font-mono text-xs border-y border-slate-200 py-4">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">LAYANAN</span>
                <span className="font-bold text-[#0B2545] text-right">{inquiryScope}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">WHATSAPP</span>
                <span className="font-bold text-[#0B2545]">
                  {CONTACT_INFO.whatsappDisplay}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500">PORTFOLIO</span>
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

            <div className="font-mono text-[11px] text-slate-500 flex items-center justify-between">
              <span>CODE #BM-2026</span>
              <span>DIRECT HANDOVER</span>
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
