'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { DEFAULT_PRODUCTS, ProductItem } from '@/lib/catalog-data';
import { Search, X, RefreshCw, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['ALL', 'SAAS WEB', 'E-COMMERCE', 'MOBILE APPS', 'SCRIPTS & BOTS'];

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  const initialSearch = searchParams.get('search') || '';

  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [category, setCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'ALL'
  );
  const [search, setSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SALE' | 'PORTFOLIO'>('ALL');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');
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
      setErrorMsg('Koneksi bermasalah saat mengambil katalog. Menampilkan data lokal.');
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
    if (paramCat && CATEGORIES.includes(paramCat)) {
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
    <>
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            Katalog Aplikasi &amp; Source Code
          </span>
          <h1 className="font-['Syne',sans-serif] text-2xl sm:text-4xl font-extrabold text-[#0B2545] uppercase tracking-tight mt-1">
            Eksplorasi Seluruh Produk
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Klik kartu produk untuk melihat detail arsitektur, fitur utama, opsi paket Source Code vs Turnkey Cloud Deploy, serta tautan Live Demo.
          </p>
        </div>

        <div className="font-mono text-xs bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl text-[#0B2545] shrink-0 self-start md:self-auto">
          Menampilkan <strong>{filteredProducts.length}</strong> dari{' '}
          <strong>{allProducts.length}</strong> produk
        </div>
      </div>

      {/* Filter & Controls Toolbar */}
      <div className="space-y-4 mb-8">
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

        {/* Search + Status + Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="relative md:col-span-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari nama aplikasi, fitur, atau tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari produk"
              className="w-full min-h-[44px] pl-11 pr-10 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#0B2545] placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                aria-label="Hapus kata kunci pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-3 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 min-h-[44px]">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'ALL' | 'SALE' | 'PORTFOLIO')
              }
              aria-label="Filter tipe lisensi"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#0B2545] focus:outline-none py-2"
            >
              <option value="ALL">Semua Tipe Lisensi</option>
              <option value="SALE">Siap Akuisisi (Ready)</option>
              <option value="PORTFOLIO">Portfolio Showcase</option>
            </select>
          </div>

          <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl px-3 min-h-[44px] flex items-center">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'default' | 'price_asc' | 'price_desc')
              }
              aria-label="Urutkan produk"
              className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#0B2545] focus:outline-none py-2"
            >
              <option value="default">Urutan: Terbaru</option>
              <option value="price_asc">Harga: Terendah ke Tertinggi</option>
              <option value="price_desc">Harga: Tertinggi ke Terendah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error State Banner */}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={fetchCatalog}
            className="min-h-[38px] px-4 py-1.5 rounded-xl bg-white border border-amber-300 font-bold text-xs inline-flex items-center gap-1.5 hover:bg-amber-100 transition self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang</span>
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#0B2545] border-t-transparent mx-auto" />
          <p className="text-sm font-medium text-slate-600">
            Mengambil katalog aplikasi dari Supabase...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <h2 className="font-['Syne',sans-serif] text-xl font-bold text-[#0B2545]">
            Tidak Ada Produk yang Cocok
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Filter kategori atau kata kunci pencarian Anda tidak menemukan hasil. Atur ulang filter untuk melihat semua aplikasi yang tersedia.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#123663] text-white text-xs font-bold transition"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

export default function CatalogPage() {
  return (
    <main>
      <Navbar />
      <Suspense
        fallback={
          <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center text-sm text-slate-500">
            Menyiapkan halaman katalog...
          </div>
        }
      >
        <CatalogContent />
      </Suspense>
      <Footer />
    </main>
  );
}
