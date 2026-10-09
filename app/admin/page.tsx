'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Plus, Trash2, Edit, Upload, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('E-COMMERCE');
  const [techStack, setTechStack] = useState('');
  const [price, setPrice] = useState('');
  const [isPortfolio, setIsPortfolio] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const savedPin = localStorage.getItem('bm_admin_pin');
    if (savedPin) {
      setPin(savedPin);
      setIsAuthenticated(true);
      fetchProducts();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '123456' || pin.length >= 4) {
      localStorage.setItem('bm_admin_pin', pin);
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      setMessage({ text: 'PIN salah! Coba default PIN: 123456', type: 'error' });
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
    setLoading(false);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          tech_stack: techStack,
          price: Number(price) || 0,
          is_portfolio: isPortfolio,
          thumbnail_url: thumbnailUrl,
          demo_url: demoUrl,
          github_url: githubUrl,
          description,
          admin_pin: pin,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Produk berhasil ditambahkan!', type: 'success' });
        // Reset form
        setTitle('');
        setTechStack('');
        setPrice('');
        setThumbnailUrl('');
        setDemoUrl('');
        setGithubUrl('');
        setDescription('');
        setIsPortfolio(false);
        fetchProducts();
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`/api/products/${id}?pin=${pin}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Produk berhasil dihapus!', type: 'success' });
        fetchProducts();
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  if (!isAuthenticated) {
    return (
      <main>
        <Navbar />
        <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Admin Backoffice</h2>
          <p className="text-sm text-slate-500 mb-6">Masukkan PIN Admin untuk mengelola katalog BiruMarket.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">PIN Rahasia</label>
              <input
                type="password"
                placeholder="Default: 123456"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#3B5763] focus:outline-none text-center text-xl tracking-widest"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1C2024] hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition shadow"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-['Syne',sans-serif] text-3xl font-extrabold text-slate-900 uppercase">
            Backoffice BiruMarket
          </h1>
          <p className="text-slate-500 text-sm">Kelola produk, upload preview, dan showcase portofolio Fikri Bintang.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('bm_admin_pin');
              setIsAuthenticated(false);
            }}
            className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-2.5 rounded-full border border-rose-100 hover:bg-rose-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Grid: Form Tambah (Left) & List Produk (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Tambah Produk */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl shadow-sm border border-slate-200/80">
          <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#3B5763]" />
            Tambah Produk / Portfolio Baru
          </h3>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Judul Aplikasi / Web</label>
              <input
                type="text"
                required
                placeholder="Misal: AI Dropship Store"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
                >
                  <option value="E-COMMERCE">E-COMMERCE</option>
                  <option value="SAAS WEB">SAAS WEB</option>
                  <option value="MOBILE APPS">MOBILE APPS</option>
                  <option value="SCRIPTS & BOTS">SCRIPTS & BOTS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  placeholder="650000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tech Stack (pisahkan koma)</label>
              <input
                type="text"
                placeholder="Next.js, Python, PostgreSQL, Flutter"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
              />
            </div>

            {/* Upload Gambar Preview */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Upload Gambar Preview</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
                <input
                  type="url"
                  placeholder="Atau tempel Link URL Gambar..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
                />
              </div>

              {thumbnailUrl && (
                <div className="mt-2 h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Demo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">GitHub URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Deskripsi Lengkap</label>
              <textarea
                rows={3}
                required
                placeholder="Jelaskan fitur utama, spesifikasi, dan keunggulan aplikasi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
              ></textarea>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="isPortfolio"
                checked={isPortfolio}
                onChange={(e) => setIsPortfolio(e.target.checked)}
                className="w-4 h-4 rounded text-[#3B5763] focus:ring-[#3B5763]"
              />
              <label htmlFor="isPortfolio" className="text-xs font-bold text-slate-700 cursor-pointer">
                Tandai sebagai Portfolio Showcase (Bukan untuk dijual langsung)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3B5763] hover:bg-[#2F4752] text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Simpan ke Database SQLite</span>
            </button>
          </form>
        </div>

        {/* Tabel / Card List Produk */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">
            <h3 className="font-bold text-lg text-slate-900 mb-4">
              Daftar Produk di Database ({products.length})
            </h3>

            <div className="divide-y divide-slate-100 max-h-[700px] overflow-y-auto pr-2">
              {products.map((p) => (
                <div key={p.id} className="py-4 flex items-start gap-4">
                  <img
                    src={p.thumbnail_url}
                    alt={p.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      {p.is_portfolio ? (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                          PORTFOLIO
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Rp {p.price?.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mt-1 truncate">{p.title}</h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{p.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition shrink-0"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
