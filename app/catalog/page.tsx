'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { CATEGORIES, DEFAULT_PRODUCTS, ProductItem } from '@/lib/catalog-data';
import {
  Search,
  X,
  RefreshCw,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpRight,
} from 'lucide-react';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [category, setCategory] = useState(
    (CATEGORIES as readonly string[]).includes(initialCategory)
      ? initialCategory
      : 'ALL'
  );
  const [search, setSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SALE' | 'PORTFOLIO'>('ALL');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'index'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const fetchCatalog = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/products');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAllProducts(json.data.length > 0 ? json.data : DEFAULT_PRODUCTS);
      } else {
        setErrorMsg(json.error || 'Gagal memuat produk dari database.');
        setAllProducts(DEFAULT_PRODUCTS);
      }
    } catch {
      setErrorMsg('Koneksi bermasalah saat mengambil katalog. Menampilkan arsip lokal.');
      setAllProducts(DEFAULT_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    const paramCat = searchParams.get('category');
    const paramSearch = searchParams.get('search');
    if (paramCat && (CATEGORIES as readonly string[]).includes(paramCat)) {
      setCategory(paramCat);
    }
    if (paramSearch !== null) {
      setSearch(paramSearch);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (category !== 'ALL') {
      list = list.filter((p) => p.category === category);
    }

    if (statusFilter === 'SALE') {
      list = list.filter((p) => !p.is_portfolio);
    } else if (statusFilter === 'PORTFOLIO') {
      list = list.filter((p) => p.is_portfolio);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tech_stack.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price_asc') {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [allProducts, category, statusFilter, search, sortBy]);

  const resetFilters = () => {
    setCategory('ALL');
    setSearch('');
    setStatusFilter('ALL');
    setSortBy('default');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 space-y-8">
      {/* Editorial Masthead */}
      <div className="border-b border-[#E4E2DD] pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] block">
            01 / Direktori Sistem &amp; Source Code
          </span>
          <h1 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-extrabold text-[#111315] tracking-tight">
            Katalog Sistem Web{' '}
            <span className="font-serif-editorial italic font-normal text-4xl sm:text-5xl text-[#525860]">
              3 halaman utuh.
            </span>
          </h1>
          <p className="text-[#525860] text-xs sm:text-sm max-w-2xl leading-relaxed">
            Setiap entri di bawah merupakan aplikasi 3 halaman lengkap (Storefront, Terminal POS/Studio, dan Monitor Backoffice). Gunakan mode Galeri 2-Kolom atau Indeks Arsip Ringkas.
          </p>
        </div>

        {/* View Mode Switcher + Counter */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          <div className="font-mono text-xs bg-white border border-[#E4E2DD] px-3.5 py-2 text-[#111315]">
            Menampilkan <strong>{filteredProducts.length}</strong> /{' '}
            <strong>{allProducts.length}</strong> sistem
          </div>

          <div
            className="inline-flex border border-[#111315] bg-white p-0.5"
            role="group"
            aria-label="Mode tampilan katalog"
          >
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                viewMode === 'grid'
                  ? 'bg-[#111315] text-[#F8F7F4]'
                  : 'text-[#525860] hover:text-[#111315]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>2-Col Gallery</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('index')}
              className={`px-3 py-1.5 font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                viewMode === 'index'
                  ? 'bg-[#111315] text-[#F8F7F4]'
                  : 'text-[#525860] hover:text-[#111315]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Compact Index</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Controls Toolbar */}
      <div className="space-y-4">
        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'ALL'
                ? allProducts.length
                : allProducts.filter((p) => p.category === cat).length;
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
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

        {/* Search + Status + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="relative md:col-span-6">
            <Search className="w-4 h-4 text-[#8C929A] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama sistem, modul, atau tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari produk"
              className="w-full min-h-[44px] pl-11 pr-10 py-2.5 bg-white border border-[#D5D2CA] text-sm text-[#111315] placeholder:text-[#8C929A] focus:border-[#111315] focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="w-8 h-8 text-[#8C929A] hover:text-[#111315] flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Hapus kata kunci pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-3 flex items-center gap-2 bg-white border border-[#D5D2CA] px-3 min-h-[44px]">
            <SlidersHorizontal className="w-4 h-4 text-[#8C929A] shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'ALL' | 'SALE' | 'PORTFOLIO')
              }
              aria-label="Filter tipe lisensi"
              className="w-full bg-transparent font-mono text-xs font-medium text-[#111315] focus:outline-none py-2"
            >
              <option value="ALL">Semua Tipe Lisensi</option>
              <option value="SALE">Siap Akuisisi (Ready)</option>
              <option value="PORTFOLIO">Portfolio Showcase</option>
            </select>
          </div>

          <div className="md:col-span-3 bg-white border border-[#D5D2CA] px-3 min-h-[44px] flex items-center">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'default' | 'price_asc' | 'price_desc')
              }
              aria-label="Urutkan produk"
              className="w-full bg-transparent font-mono text-xs font-medium text-[#111315] focus:outline-none py-2"
            >
              <option value="default">Urutan: Indeks Kurasi</option>
              <option value="price_asc">Harga: Terendah → Tertinggi</option>
              <option value="price_desc">Harga: Tertinggi → Terendah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {errorMsg && (
        <div className="p-4 bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950">
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={fetchCatalog}
            className="min-h-[36px] px-4 py-1.5 bg-white border border-amber-400 font-mono font-semibold text-xs inline-flex items-center gap-1.5 hover:bg-amber-100 transition self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-white border border-[#E4E2DD] p-16 text-center space-y-3">
          <div className="animate-spin h-7 w-7 border-2 border-[#111315] border-t-transparent mx-auto" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#687078]">
            Menyinkronkan arsip katalog dari Supabase...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-[#E4E2DD] p-12 text-center space-y-4">
          <h2 className="font-['Syne',sans-serif] text-xl font-bold text-[#111315]">
            Tidak Ada Sistem yang Cocok
          </h2>
          <p className="text-sm text-[#525860] max-w-md mx-auto">
            Filter kategori atau kata kunci pencarian tidak menemukan hasil. Atur ulang filter untuk menampilkan seluruh 10 sistem.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-[42px] px-5 py-2.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] font-mono text-xs font-semibold transition"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* 2-Column Large Editorial Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      ) : (
        /* Compact Archival Index List View */
        <div className="bg-white border border-[#111315] divide-y divide-[#E4E2DD]">
          {/* Table Header */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 bg-[#F3F1EC] font-mono text-[10px] font-bold uppercase tracking-wider text-[#525860]">
            <div className="col-span-1">NO / SKU</div>
            <div className="col-span-4">SISTEM &amp; DESKRIPSI</div>
            <div className="col-span-2">KATEGORI</div>
            <div className="col-span-3">TAUTAN 3 HALAMAN</div>
            <div className="col-span-2 text-right">HARGA &amp; AKSI</div>
          </div>

          {filteredProducts.map((p, idx) => {
            const demoBase = p.demo_url || `/demo/${p.slug}`;
            return (
              <div
                key={p.id}
                className="p-4 sm:p-5 lg:grid lg:grid-cols-12 gap-4 items-center hover:bg-[#F8F7F4] transition space-y-3 lg:space-y-0"
              >
                {/* Index & SKU */}
                <div className="lg:col-span-1 font-mono text-xs flex lg:block items-center justify-between">
                  <span className="text-[#8C929A] block">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-bold text-[#111315]">
                    {p.sku || p.id.toUpperCase()}
                  </span>
                </div>

                {/* Title & Summary */}
                <div className="lg:col-span-4 pr-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(p)}
                    className="text-left font-['Syne',sans-serif] font-bold text-base text-[#111315] hover:text-[#1D4ED8] transition block"
                  >
                    {p.title.replace(/\s*\(3 Halaman\)/gi, '')}
                  </button>
                  <p className="text-xs text-[#525860] line-clamp-1 mt-0.5">
                    {p.tagline || p.description}
                  </p>
                </div>

                {/* Category */}
                <div className="lg:col-span-2 font-mono text-[11px] text-[#3B4046]">
                  <span className="px-2 py-1 bg-[#F8F7F4] border border-[#E4E2DD]">
                    {p.category}
                  </span>
                </div>

                {/* 3-Page Deep Jump */}
                <div className="lg:col-span-3 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                  {([
                    { num: 1, label: '01 Storefront' },
                    { num: 2, label: '02 POS/App' },
                    { num: 3, label: '03 Backoffice' },
                  ] as const).map((pg) => (
                    <Link
                      key={pg.num}
                      href={`${demoBase}?page=${pg.num}`}
                      className="px-2 py-1 bg-white hover:bg-[#111315] text-[#111315] hover:text-[#F8F7F4] border border-[#D5D2CA] transition font-semibold"
                    >
                      {pg.label}
                    </Link>
                  ))}
                </div>

                {/* Price & Actions */}
                <div className="lg:col-span-2 flex items-center lg:justify-end justify-between gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#E4E2DD]">
                  <span className="font-mono text-xs font-bold text-[#111315]">
                    Rp {(Number(p.price) / 1000).toFixed(0)}k
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className="px-2.5 py-1.5 border border-[#D5D2CA] bg-white hover:border-[#111315] text-[#111315]"
                    >
                      Detail
                    </button>
                    <Link
                      href={demoBase}
                      className="px-2.5 py-1.5 bg-[#111315] hover:bg-[#1D4ED8] text-[#F8F7F4] inline-flex items-center gap-1"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#111315]">
      <Navbar />
      <Suspense
        fallback={
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-16 text-center font-mono text-xs uppercase tracking-wider text-[#687078]">
            Menyiapkan direktori katalog...
          </div>
        }
      >
        <CatalogContent />
      </Suspense>
      <Footer />
    </main>
  );
}
