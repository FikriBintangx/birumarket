'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  Database,
  X,
  ExternalLink,
  Loader2,
  Pencil,
} from 'lucide-react';
import { ProductItem } from '@/lib/catalog-data';

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('POS DASHBOARD');
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
    if (pin.trim().length >= 4) {
      localStorage.setItem('bm_admin_pin', pin.trim());
      setIsAuthenticated(true);
      setMessage(null);
      fetchProducts();
    } else {
      setMessage({
        text: 'Masukkan PIN minimal 4 karakter (default: 123456).',
        type: 'error',
      });
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Gagal mengambil data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('POS DASHBOARD');
    setTechStack('');
    setPrice('');
    setIsPortfolio(false);
    setThumbnailUrl('');
    setPreviewImages([]);
    setDemoUrl('');
    setGithubUrl('');
    setDescription('');
  };

  const startEdit = (product: ProductItem) => {
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category || 'SAAS WEB');
    setTechStack(
      Array.isArray(product.tech_stack) ? product.tech_stack.join(', ') : ''
    );
    setPrice(String(product.price || 0));
    setIsPortfolio(Boolean(product.is_portfolio));
    setThumbnailUrl(product.thumbnail_url || '');
    setPreviewImages(
      Array.isArray(product.preview_images) && product.preview_images.length > 0
        ? product.preview_images
        : product.thumbnail_url
          ? [product.thumbnail_url]
          : []
    );
    setDemoUrl(product.demo_url || '');
    setGithubUrl(product.github_url || '');
    setDescription(product.description || '');
    setMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSyncDefaultCatalog = async () => {
    setSeeding(true);
    setMessage(null);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'SEED_DEFAULTS',
          admin_pin: pin,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          text:
            data.message ||
            '10 produk default BiruMarket berhasil disinkronkan ke Supabase!',
          type: 'success',
        });
        fetchProducts();
      } else {
        setMessage({ text: data.error || 'Gagal sync katalog.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSeeding(false);
    }
  };

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
          await new Promise<void>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                uploadedUrls.push(reader.result);
              }
              resolve();
            };
            reader.onerror = () => resolve();
            reader.readAsDataURL(file);
          });
        }
      } catch {
        errorCount++;
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
          text: `${uploadedUrls.length} file berhasil diupload ke Supabase Storage.`,
          type: 'success',
        });
      } else {
        setMessage({
          text: `${uploadedUrls.length - errorCount} berhasil diupload, ${errorCount} memakai preview lokal.`,
          type: 'error',
        });
      }
    }

    setUploading(false);
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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      title,
      category,
      tech_stack: techStack,
      price: Number(price) || 0,
      is_portfolio: isPortfolio,
      thumbnail_url: thumbnailUrl || '/products/thumb-pos-kuro.svg',
      preview_images:
        previewImages.length > 0
          ? previewImages
          : [thumbnailUrl || '/products/thumb-pos-kuro.svg'],
      demo_url: demoUrl,
      github_url: githubUrl,
      description,
      admin_pin: pin,
      pin,
    };

    try {
      const endpoint = editingId
        ? `/api/products/${editingId}`
        : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({
          text: editingId
            ? 'Perubahan produk berhasil disimpan ke Supabase!'
            : 'Produk baru berhasil ditambahkan ke Supabase!',
          type: 'success',
        });
        resetForm();
        fetchProducts();
      } else {
        setMessage({ text: data.error || 'Gagal menyimpan produk.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Yakin ingin menghapus produk ini dari katalog?')) return;
    try {
      const res = await fetch(`/api/products/${id}?pin=${encodeURIComponent(pin)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Produk berhasil dihapus.', type: 'success' });
        if (editingId === id) resetForm();
        fetchProducts();
      } else {
        setMessage({ text: data.error || 'Gagal menghapus.', type: 'error' });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  if (!isAuthenticated) {
    return (
      <main>
        <Navbar />
        <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8] block mb-1">
            Restricted Area
          </span>
          <h1 className="font-['Syne',sans-serif] text-2xl font-extrabold text-[#0B2545] mb-2">
            Admin Backoffice
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Masukkan PIN Admin untuk mengelola katalog produk dan sinkronisasi Supabase BiruMarket.
          </p>

          {message && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-medium">
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-pin-input"
                className="block font-mono text-xs font-bold text-slate-700 uppercase mb-2"
              >
                PIN Rahasia
              </label>
              <input
                id="admin-pin-input"
                type="password"
                placeholder="Default: 123456"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full min-h-[46px] px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1D4ED8] focus:outline-none text-center text-xl tracking-widest font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full min-h-[46px] bg-[#0B2545] hover:bg-[#123663] text-white font-bold py-3 rounded-xl transition"
            >
              Masuk Dashboard
            </button>
          </form>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl border border-slate-200">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
            Supabase CMS &amp; Inventory
          </span>
          <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545] uppercase mt-1">
            Backoffice BiruMarket
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Kelola produk, perbarui harga/demo, upload thumbnail, dan sinkronkan 10 produk original ke Supabase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleSyncDefaultCatalog}
            disabled={seeding}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold inline-flex items-center gap-2 transition disabled:opacity-60"
          >
            {seeding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Database className="w-4 h-4" />
            )}
            <span>Sync 10 Produk Default</span>
          </button>

          <button
            type="button"
            onClick={fetchProducts}
            className="min-h-[42px] w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
            title="Refresh Katalog"
            aria-label="Refresh Katalog"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('bm_admin_pin');
              setIsAuthenticated(false);
            }}
            className="min-h-[42px] text-xs font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 hover:bg-rose-100 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-2xl mb-6 flex items-center gap-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-rose-50 text-rose-900 border border-rose-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Tambah / Edit Produk */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-5">
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#0B2545] flex items-center gap-2">
              {editingId ? (
                <>
                  <Pencil className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Edit Produk</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-[#1D4ED8]" />
                  <span>Tambah Produk Baru</span>
                </>
              )}
            </h2>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-bold text-slate-600 hover:text-[#0B2545] underline"
              >
                Batal Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div>
              <label
                htmlFor="prod-title"
                className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
              >
                Judul Aplikasi / Web
              </label>
              <input
                id="prod-title"
                type="text"
                required
                placeholder="Nama aplikasi atau boilerplate"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="prod-category"
                  className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
                >
                  Kategori
                </label>
                <select
                  id="prod-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
                >
                  <option value="POS DASHBOARD">POS DASHBOARD</option>
                  <option value="SAAS WEB">SAAS WEB</option>
                  <option value="E-COMMERCE">E-COMMERCE</option>
                  <option value="SCRIPTS & BOTS">SCRIPTS &amp; BOTS</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="prod-price"
                  className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
                >
                  Harga (Rp)
                </label>
                <input
                  id="prod-price"
                  type="number"
                  placeholder="850000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="prod-stack"
                className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
              >
                Tech Stack (pisahkan koma)
              </label>
              <input
                id="prod-stack"
                type="text"
                placeholder="Next.js, Python, Supabase, Tailwind CSS"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs font-bold text-slate-700 uppercase">
                  Upload Gambar / Thumbnail
                </span>
                <span className="font-mono text-[11px] text-[#1D4ED8] font-medium">
                  Supabase Storage
                </span>
              </div>

              <div className="space-y-2">
                <div className="relative border-2 border-dashed border-slate-200 hover:border-[#1D4ED8] rounded-2xl p-4 transition text-center bg-slate-50">
                  <input
                    type="file"
                    accept="image/*,.pdf,.zip"
                    multiple
                    onChange={handleFileUpload}
                    disabled={uploading}
                    aria-label="Upload file gambar produk"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                    {uploading ? (
                      <>
                        <Loader2 className="w-6 h-6 text-[#1D4ED8] animate-spin" />
                        <span className="text-xs font-semibold text-slate-600">
                          Mengupload ke Supabase Storage...
                        </span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">
                          Klik atau tarik foto preview ke sini
                        </span>
                        <span className="font-mono text-[10px] text-slate-500">
                          PNG, JPG, WEBP • Bucket: catalog
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Atau path/URL gambar (contoh: /products/thumb-pos-kuro.svg)"
                  value={thumbnailUrl}
                  onChange={(e) => {
                    setThumbnailUrl(e.target.value);
                    if (e.target.value && !previewImages.includes(e.target.value)) {
                      setPreviewImages((prev) => [...prev, e.target.value]);
                    }
                  }}
                  aria-label="URL gambar thumbnail"
                  className="w-full min-h-[40px] px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              {previewImages.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <span className="font-mono text-[11px] font-bold text-slate-500 uppercase">
                    Preview ({previewImages.length}):
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {previewImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-xl overflow-hidden border border-slate-200 h-20 bg-slate-100"
                      >
                        <img
                          src={img}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-rose-600 text-white p-1 rounded-full opacity-90 sm:opacity-0 group-hover:opacity-100 transition"
                          title="Hapus Gambar"
                          aria-label="Hapus Gambar"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {thumbnailUrl === img && (
                          <span className="absolute bottom-1 left-1 bg-[#0B2545] text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
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
                <label
                  htmlFor="prod-demo"
                  className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
                >
                  Demo URL
                </label>
                <input
                  id="prod-demo"
                  type="url"
                  placeholder="https://..."
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="prod-github"
                  className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
                >
                  GitHub URL
                </label>
                <input
                  id="prod-github"
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="prod-desc"
                className="block font-mono text-xs font-bold text-slate-700 uppercase mb-1"
              >
                Deskripsi Lengkap
              </label>
              <textarea
                id="prod-desc"
                rows={3}
                required
                placeholder="Jelaskan fitur utama, spesifikasi arsitektur, dan kegunaan aplikasi..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#1D4ED8] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="isPortfolio"
                checked={isPortfolio}
                onChange={(e) => setIsPortfolio(e.target.checked)}
                className="w-4 h-4 rounded text-[#1D4ED8] focus:ring-[#1D4ED8]"
              />
              <label
                htmlFor="isPortfolio"
                className="text-xs font-bold text-slate-700 cursor-pointer"
              >
                Tandai sebagai Portfolio Showcase (Custom Quote)
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || uploading}
              className="w-full min-h-[46px] bg-[#0B2545] hover:bg-[#123663] text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>
                {editingId
                  ? 'Simpan Perubahan ke Supabase'
                  : 'Simpan Produk Baru ke Supabase'}
              </span>
            </button>
          </form>
        </div>

        {/* Product List Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-['Syne',sans-serif] font-extrabold text-lg text-[#0B2545]">
              Daftar Produk Aktif ({products.length})
            </h2>
            <a
              href="/catalog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#1D4ED8] font-bold flex items-center gap-1 hover:underline"
            >
              <span>Lihat Catalog Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {loading && products.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Memuat produk...
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-slate-600">
                Belum ada produk di tabel Supabase. Klik tombol Sync 12 Produk Default di kanan atas.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-[760px] overflow-y-auto pr-1">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`py-4 flex items-start gap-4 px-2 rounded-xl transition ${
                    editingId === p.id ? 'bg-[#EFF6FF]' : ''
                  }`}
                >
                  <img
                    src={p.thumbnail_url}
                    alt={p.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/products/thumb-pos-kuro.svg';
                    }}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold uppercase text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      {p.is_portfolio ? (
                        <span className="font-mono text-[10px] font-bold text-[#0B2545] bg-slate-200 px-2 py-0.5 rounded">
                          PORTFOLIO
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          Rp {Number(p.price || 0).toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-[#0B2545] text-sm mt-1 truncate">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 truncate mt-0.5">
                      {p.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(p)}
                      className="w-9 h-9 flex items-center justify-center text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition"
                      title="Edit Produk"
                      aria-label={`Edit ${p.title}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p.id)}
                      className="w-9 h-9 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Hapus Produk"
                      aria-label={`Hapus ${p.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
