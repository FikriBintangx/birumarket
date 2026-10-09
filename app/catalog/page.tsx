'use client';

import { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Search, ExternalLink, MessageCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');

  const categories = ['ALL', 'E-COMMERCE', 'SAAS WEB', 'MOBILE APPS', 'SCRIPTS & BOTS'];

  useEffect(() => {
    fetchProducts();
  }, [category, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products?category=${category}&search=${search}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="font-['Syne',sans-serif] text-4xl font-extrabold text-slate-900 uppercase">
          App & Web Catalog
        </h1>
        <p className="text-slate-500 mt-2">
          Jelajahi koleksi source code, turnkey website, dan aplikasi siap pakai.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs tracking-wider transition ${
                category === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3B5763] shadow-sm text-sm"
          />
          <Search className="w-4 h-4 absolute left-4 top-3 text-slate-400" />
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B5763]"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          Tidak ada produk yang ditemukan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col group hover:shadow-lg transition duration-300">
              
              {/* Thumbnail */}
              <div className="h-48 w-full bg-slate-100 rounded-2xl overflow-hidden mb-5 relative">
                <img src={p.thumbnail_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-slate-800">
                  {p.category}
                </div>
                {p.is_portfolio ? (
                  <div className="absolute top-3 right-3 bg-purple-100/90 text-purple-700 px-3 py-1 rounded-full text-[10px] font-bold">
                    PORTFOLIO
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-emerald-100/90 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
                    FOR SALE
                  </div>
                )}
              </div>

              {/* Title & Desc */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {p.description}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.tech_stack.map((tech: string, i: number) => (
                    <span key={i} className="bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Price & Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium">Harga</span>
                  <span className="font-extrabold text-[#D9534F]">
                    {p.is_portfolio ? 'Showcase Only' : `Rp ${p.price.toLocaleString('id-ID')}`}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {p.demo_url && (
                    <Link href={p.demo_url} target="_blank" className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}
                  <Link 
                    href={`https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20${encodeURIComponent(p.title)}`} 
                    target="_blank"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function CatalogPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading catalog...</div>}>
        <CatalogContent />
      </Suspense>
    </main>
  );
}
