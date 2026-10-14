'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Plus, Trash2, Upload, CheckCircle2, AlertCircle, RefreshCw, Image as ImageIcon, Database, X, ExternalLink, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('E-COMMERCE');
  const [techStack, setTechStack] = useState('');
  const [price, setPrice] = useState('');
  const [isPortfolio, setIsPortfolio] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
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

  // Upload file / photo directly to Supabase Storage via /api/upload (supports multiple files)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage(null);

    const uploadedUrls: string[] = [];
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', 'catalog');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          errorCount++;
          // Fallback local reader for preview
          await new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const localUrl = reader.result as string;
              uploadedUrls.push(localUrl);
              resolve();
            };
            reader.onerror = () => resolve();
            reader.readAsDataURL(file);
          });
        }
      } catch (err: any) {
        errorCount++;
        await new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const localUrl = reader.result as string;
            uploadedUrls.push(localUrl);
            resolve();
          };
          reader.onerror = () => resolve();
          reader.readAsDataURL(file);
        });
      }
    }

    if (uploadedUrls.length > 0) {
      setPreviewImages((prev) => {
        const combined = [...prev, ...uploadedUrls];
        if (!thumbnailUrl && combined.length > 0) {
          setThumbnailUrl(combined[0]);
        }
        return combined;
      });

      if (!thumbnailUrl) {
        setThumbnailUrl(uploadedUrls[0]);
      }

      if (errorCount === 0) {
        setMessage({
          text: `${uploadedUrls.length} file/foto berhasil diupload ke Supabase Storage!`,
          type: 'success',
        });
      } else {
        setMessage({
          text: `${uploadedUrls.length - errorCount} berhasil, ${errorCount} file menggunakan preview lokal.`,
          type: 'error',
        });
      }
    }

    setUploading(false);
    // Reset file input value so user can upload the same files again if needed
    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setPreviewImages((prev) => {
      const updated = prev.filter((_, idx) => idx !== indexToRemove);
      if (updated.length > 0 && thumbnailUrl === prev[indexToRemove]) {
        setThumbnailUrl(updated[0]);
      } else if (updated.length === 0) {
        setThumbnailUrl('');
      }
      return updated;
    });
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
          preview_images: previewImages.length > 0 ? previewImages : [thumbnailUrl],
          demo_url: demoUrl,
          github_url: githubUrl,
          description,
          admin_pin: pin,
          pin: pin,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Produk berhasil ditambahkan ke Supabase!', type: 'success' });
        // Reset form
        setTitle('');
        setTechStack('');
        setPrice('');
        setThumbnailUrl('');
        setPreviewImages([]);
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

            {/* Upload File / Gambar ke Supabase Storage */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase">Upload Gambar / File</label>
                <span className="text-[11px] text-[#3B5763] font-medium">Supabase Storage</span>
              </div>
              
              <div className="space-y-2">
                <div className="relative border-2 border-dashed border-slate-200 hover:border-[#3B5763] rounded-2xl p-4 transition text-center bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*,.pdf,.zip"
                    multiple
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                    {uploading ? (
                      <>
                        <Loader2 className="w-6 h-6 text-[#3B5763] animate-spin" />
                        <span className="text-xs font-semibold text-slate-600">Mengupload ke Supabase Storage...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">Klik atau Drag satu / beberapa foto ke sini</span>
                        <span className="text-[10px] text-slate-400">Pilih multi-file (PNG, JPG, WEBP, ZIP) • Bucket: catalog</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="Atau tempel Link URL Gambar..."
                    value={thumbnailUrl}
                    onChange={(e) => {
                      setThumbnailUrl(e.target.value);
                      if (e.target.value && !previewImages.includes(e.target.value)) {
                        setPreviewImages(prev => [...prev, e.target.value]);
                      }
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#3B5763]"
                  />
                </div>
              </div>

              {/* Preview List Gallery */}
              {previewImages.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Preview Foto Catalog ({previewImages.length}):</span>
                  <div className="grid grid-cols-3 gap-2">
                    {previewImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 h-20 bg-slate-100">
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-black/60 hover:bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                          title="Hapus Gambar"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {thumbnailUrl === img && (
                          <span className="absolute bottom-1 left-1 bg-[#3B5763] text-white text-[9px] px-1.5 py-0.5 rounded font-black">
                            MAIN
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
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
              disabled={loading || uploading}
              className="w-full bg-[#3B5763] hover:bg-[#2F4752] text-white font-bold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Simpan ke Database Supabase</span>
            </button>
          </form>
        </div>

        {/* Tabel / Card List Produk */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-900">
                Daftar Produk di Supabase ({products.length})
              </h3>
              <a
                href="/catalog"
                target="_blank"
                className="text-xs text-[#3B5763] font-bold flex items-center gap-1 hover:underline"
              >
                <span>Lihat Catalog Live</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

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
