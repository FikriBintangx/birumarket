'use client';

import { useState } from 'react';

export interface MultiPageDemoProps {
  activePage?: 1 | 2 | 3;
  onPageChange?: (page: 1 | 2 | 3) => void;
}

function useSyncedPage(
  externalPage?: 1 | 2 | 3,
  onExternalChange?: (p: 1 | 2 | 3) => void,
  initial: 1 | 2 | 3 = 1
): [1 | 2 | 3, (p: 1 | 2 | 3) => void] {
  const [internal, setInternal] = useState<1 | 2 | 3>(initial);
  const current = externalPage ?? internal;
  const setPage = (next: 1 | 2 | 3) => {
    setInternal(next);
    onExternalChange?.(next);
  };
  return [current, setPage];
}

/* ============================================================================
 * 1. KUROBENTO SHIBUYA · 3-Page Japanese Ramen Storefront, Shokuken POS & KDS
 * ========================================================================== */
interface KuroMenuItem {
  code: string;
  cat: 'RAMEN' | 'YAKITORI' | 'IZAKAYA' | 'DRINK';
  name: string;
  jp: string;
  price: number;
  kcal: string;
  broth: string;
  toppings: string[];
  desc: string;
  accent: string;
  badge?: string;
}

interface KuroTicketItem {
  code: string;
  name: string;
  jp: string;
  price: number;
  qty: number;
  spec: string;
}

interface KuroKdsTicket {
  id: string;
  booth: string;
  time: string;
  status: 'COOKING' | 'PLATING' | 'SERVED';
  items: { name: string; qty: number; spec: string }[];
}

const KURO_CATALOG: KuroMenuItem[] = [
  {
    code: '#01',
    cat: 'RAMEN',
    name: 'Kuro Garlic Tonkotsu Ramen',
    jp: '黒マー油豚骨ラーメン',
    price: 68000,
    kcal: '740 kcal',
    broth: 'Kaldu Tulang Ayam & Sapi 18 Jam + Minyak Bawang Hitam Panggang',
    toppings: ['Chashu Torch 2 Slice', 'Ajitsuke Tamago', 'Jamur Kikurage', 'Daun Bawang Kyoto', 'Nori Premium'],
    desc: 'Signature ramen dengan kaldu kolagen kental yang dimasak 18 jam tanpa henti, disiram minyak bawang putih bakar hitam khas Kumamoto.',
    accent: '#E11D48',
    badge: 'BEST SELLER',
  },
  {
    code: '#02',
    cat: 'RAMEN',
    name: 'Aka Karai Spicy Miso Tori',
    jp: '赤辛味噌鶏白湯',
    price: 64000,
    kcal: '690 kcal',
    broth: 'Tori Paitan Gurih + Pasta Cabai Fermentasi Shinshu Miso',
    toppings: ['Daging Ayam Cincang Pedas', 'Ajitsuke Tamago', 'Jagung Manis Bakar', 'Chili Threads'],
    desc: 'Perpaduan miso merah fermentasi dari Nagano dengan minyak cabai rayu buatan sendiri dan topping ayam cincang berbumbu pedas.',
    accent: '#EA580C',
    badge: 'SPICY LV.3',
  },
  {
    code: '#03',
    cat: 'RAMEN',
    name: 'Truffle Shoyu Dry Mazemen',
    jp: '黒トリュフ醤油まぜそば',
    price: 74000,
    kcal: '620 kcal',
    broth: 'Dry Tare Shoyu Kedelai Hitam + Infusi Black Truffle Oil',
    toppings: ['Sous-Vide Beef Brisket', 'Onsen Tamago 63°C', 'Crispy Shallot', 'Trufel Paste'],
    desc: 'Ramen tanpa kuah (mazesoba) dengan mie gandum tebal yang dibalut saus shoyu kedelai hitam, kuning telur onsen, dan aroma truffle.',
    accent: '#D97706',
    badge: 'CHEF SPECIAL',
  },
  {
    code: '#04',
    cat: 'RAMEN',
    name: 'Yuzu Shio Clear Broth',
    jp: '柚子塩淡麗ラーメン',
    price: 62000,
    kcal: '510 kcal',
    broth: 'Kaldu Dashi Kombu & Katsuobushi + Kulit Jeruk Yuzu Kochi',
    toppings: ['Smoked Duck Breast', 'Menma Bambu Muda', 'Yuzu Zest', 'Ajitsuke Tamago'],
    desc: 'Kuah bening ringan nan menyegarkan dengan aroma jeruk yuzu asli Jepang, cocok bagi penikmat rasa umami bersih.',
    accent: '#10B981',
  },
  {
    code: '#05',
    cat: 'YAKITORI',
    name: 'Negima Charcoal Skewer (3 Pcs)',
    jp: '炭火焼き鳥ねぎま',
    price: 38000,
    kcal: '320 kcal',
    broth: 'Panggang Arang Binchotan + Saus Tare Karamel 3 Tahun',
    toppings: ['Paha Ayam Juicy', 'Batang Daun Bawang Bakar', 'Bubuk Sansho Pepper'],
    desc: 'Sate paha ayam dan daun bawang Jepang yang dipanggang di atas bara arang putih binchotan dengan olesan saus tare manis gurih.',
    accent: '#F59E0B',
  },
  {
    code: '#06',
    cat: 'YAKITORI',
    name: 'Tsukune Meatball + Raw Yolk',
    jp: '月見つくね串',
    price: 42000,
    kcal: '380 kcal',
    broth: 'Daging Ayam Cincang Tulang Muda + Saus Tare & Kuning Telur Omega',
    toppings: ['2 Skewer Tsukune', 'Kuning Telur Omega-3', 'Wijen Sangrai'],
    desc: 'Bakso ayam panggang bertekstur renyah tulang muda yang disajikan bersama celupan kuning telur omega segar.',
    accent: '#EAB308',
  },
  {
    code: '#07',
    cat: 'IZAKAYA',
    name: 'Aburi Salmon Mentaiko Don',
    jp: '炙り明太サーモン丼',
    price: 78000,
    kcal: '590 kcal',
    broth: 'Nasi Koshihikari Hangat + Saus Cod Roe Mentaiko Torch',
    toppings: ['Norwegian Salmon Belly', 'Saus Mentaiko Bakar', 'Tobiko', 'Rumput Laut Kizami'],
    desc: 'Nasi Jepang pulen dengan irisan perut salmon segar yang di-torch bersama saus telur ikan mentaiko gurih.',
    accent: '#F43F5E',
    badge: 'FAVORITE',
  },
  {
    code: '#08',
    cat: 'DRINK',
    name: 'Cold Brew Hojicha Kyoto',
    jp: '水出し宇治ほうじ茶',
    price: 18000,
    kcal: '0 kcal',
    broth: 'Daun Teh Hijau Panggang Uji Kyoto · Cold Steep 12 Jam',
    toppings: ['Zero Sugar', 'Refillable Ocha'],
    desc: 'Teh hijau panggang dari perkebunan Uji Kyoto yang diseduh dingin selama 12 jam untuk menghasilkan aroma smoky lembut.',
    accent: '#84CC16',
  },
];

export function KuroBentoPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [catFilter, setCatFilter] = useState<'ALL' | KuroMenuItem['cat']>('ALL');
  const [previewItem, setPreviewItem] = useState<KuroMenuItem | null>(null);

  const [booth, setBooth] = useState('04');
  const [noodle, setNoodle] = useState('KATAME');
  const [oil, setOil] = useState('RICH');
  const [items, setItems] = useState<KuroTicketItem[]>([
    { code: '#01', name: 'Kuro Garlic Tonkotsu Ramen', jp: '黒マー油豚骨ラーメン', price: 68000, qty: 2, spec: 'KATAME · RICH' },
    { code: '#05', name: 'Negima Charcoal Skewer (3 Pcs)', jp: '炭火焼き鳥ねぎま', price: 38000, qty: 1, spec: 'YAKITORI' },
  ]);
  const [stamped, setStamped] = useState(false);

  const [kdsQueue, setKdsQueue] = useState<KuroKdsTicket[]>([
    {
      id: 'KDS-891',
      booth: '02',
      time: '4 mnt lalu',
      status: 'COOKING',
      items: [
        { name: 'Aka Karai Spicy Miso Tori', qty: 1, spec: 'KATAME · RICH' },
        { name: 'Tsukune Meatball + Raw Yolk', qty: 2, spec: 'YAKITORI' },
      ],
    },
    {
      id: 'KDS-890',
      booth: '07',
      time: '8 mnt lalu',
      status: 'PLATING',
      items: [{ name: 'Truffle Shoyu Dry Mazemen', qty: 2, spec: 'FUTSU · LIGHT' }],
    },
  ]);

  const addMenuToPos = (menu: KuroMenuItem, goPos = false) => {
    setStamped(false);
    const spec = menu.cat === 'RAMEN' ? `${noodle} · ${oil}` : menu.cat;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.code === menu.code && i.spec === spec);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { code: menu.code, name: menu.name, jp: menu.jp, price: menu.price, qty: 1, spec }];
    });
    if (goPos) {
      setPreviewItem(null);
      setPage(2);
    }
  };

  const fireToKitchen = () => {
    if (items.length === 0) return;
    setStamped(true);
    const newTicket: KuroKdsTicket = {
      id: `KDS-${Math.floor(900 + Math.random() * 90)}`,
      booth,
      time: 'Baru saja',
      status: 'COOKING',
      items: items.map((i) => ({ name: i.name, qty: i.qty, spec: i.spec })),
    };
    setKdsQueue((prev) => [newTicket, ...prev]);
  };

  const advanceKds = (id: string) => {
    setKdsQueue((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus = t.status === 'COOKING' ? 'PLATING' : 'SERVED';
        return { ...t, status: nextStatus };
      })
    );
  };

  const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);
  const serviceTax = Math.round(subtotal * 0.15);
  const grandTotal = subtotal + serviceTax;
  const totalCartQty = items.reduce((s, x) => s + x.qty, 0);

  const filteredCatalog =
    catFilter === 'ALL' ? KURO_CATALOG : KURO_CATALOG.filter((m) => m.cat === catFilter);

  return (
    <div className="min-h-[780px] bg-[#0C0C0E] text-[#E4E4E7] font-mono flex flex-col justify-between">
      {/* FULL WEBSITE HEADER & 3-PAGE NAVIGATION */}
      <div>
        <header className="border-b border-[#27272A] bg-[#121216]">
          <div className="px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#E11D48] text-white flex items-center justify-center font-serif font-bold text-lg">
                黒
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans font-extrabold text-base tracking-tight text-white">
                    KUROBENTO SHIBUYA
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#E11D48]/20 text-[#E11D48] border border-[#E11D48]/40 font-bold">
                    営業中 · OPEN
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Craft Ramen &amp; Binchotan Izakaya · Senopati Flagship
                </p>
              </div>
            </div>

            {/* 3-Page Website Navigation Bar */}
            <nav className="flex flex-wrap items-center gap-1.5" aria-label="Navigasi Website KuroBento">
              <button
                type="button"
                onClick={() => setPage(1)}
                className={`px-3.5 py-2 text-xs font-bold transition border ${
                  page === 1
                    ? 'bg-[#E11D48] text-white border-[#E11D48]'
                    : 'bg-[#18181E] text-zinc-300 border-[#27272A] hover:text-white'
                }`}
              >
                01 · Katalog &amp; Preview Menu
              </button>
              <button
                type="button"
                onClick={() => setPage(2)}
                className={`px-3.5 py-2 text-xs font-bold transition border flex items-center gap-2 ${
                  page === 2
                    ? 'bg-[#E11D48] text-white border-[#E11D48]'
                    : 'bg-[#18181E] text-zinc-300 border-[#27272A] hover:text-white'
                }`}
              >
                <span>02 · Kasir Shokuken POS</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-black/40 text-amber-300">
                  {totalCartQty}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPage(3)}
                className={`px-3.5 py-2 text-xs font-bold transition border flex items-center gap-2 ${
                  page === 3
                    ? 'bg-[#E11D48] text-white border-[#E11D48]'
                    : 'bg-[#18181E] text-zinc-300 border-[#27272A] hover:text-white'
                }`}
              >
                <span>03 · Monitor Dapur KDS</span>
                <span className="px-1.5 py-0.5 text-[10px] bg-black/40 text-emerald-300">
                  {kdsQueue.filter((k) => k.status !== 'SERVED').length} Aktif
                </span>
              </button>
            </nav>
          </div>
        </header>

        {/* ===================================================================
         * HALAMAN 1: STOREFRONT E-MENU & VISUAL PRODUCT PREVIEW
         * ================================================================= */}
        {page === 1 && (
          <div className="p-5 sm:p-8 space-y-7">
            {/* Storefront Hero Banner */}
            <div className="border border-[#27272A] bg-[#14141A] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-[11px] text-[#E11D48] font-bold">
                  <span>[ HALAMAN 1 · DIGITAL STOREFRONT &amp; MENU PREVIEW ]</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-amber-400">SUHU KALDU KETTLE: 96.4°C</span>
                </div>
                <h1 className="font-sans text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Kaldu Kolagen 18 Jam &amp; Mie Hakata Gandum Utuh.
                </h1>
                <p className="font-sans text-sm text-zinc-300 max-w-2xl leading-relaxed">
                  Klik kartu hidangan di bawah untuk membuka <strong>Preview Komposisi &amp; Anatomi Bowl</strong> (kaldu, potongan chashu, tingkat kematangan mie), atau langsung tambahkan ke pesanan Booth #{booth}.
                </p>
              </div>
              <div className="lg:col-span-4 bg-[#0C0C0E] border border-[#27272A] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#27272A] pb-2">
                  <span className="text-zinc-400">MEJA AKTIF SAAT INI</span>
                  <span className="text-[#E11D48] font-bold">BOOTH #{booth}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Item di Slip Pesanan:</span>
                  <span className="text-white font-bold">{totalCartQty} Porsi (Rp {subtotal.toLocaleString('id-ID')})</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="w-full py-2.5 bg-[#E11D48] hover:bg-rose-600 text-white text-xs font-bold tracking-wider transition"
                >
                  LANJUT KE TERMINAL KASIR POS →
                </button>
              </div>
            </div>

            {/* Category Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#27272A] pb-4">
              <div className="flex flex-wrap gap-2">
                {(['ALL', 'RAMEN', 'YAKITORI', 'IZAKAYA', 'DRINK'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCatFilter(cat)}
                    className={`px-3.5 py-2 text-xs font-bold border transition ${
                      catFilter === cat
                        ? 'border-[#E11D48] bg-[#E11D48]/15 text-white'
                        : 'border-[#27272A] bg-[#141418] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat === 'ALL' ? 'SEMUA HIDANGAN (8)' : cat}
                  </button>
                ))}
              </div>
              <span className="text-xs text-zinc-400">
                Klik <strong>[ PREVIEW PRODUK ]</strong> untuk melihat rincian komposisi
              </span>
            </div>

            {/* Visual Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCatalog.map((item) => (
                <div
                  key={item.code}
                  className="border border-[#27272A] bg-[#141419] flex flex-col justify-between hover:border-zinc-500 transition group"
                >
                  <div>
                    {/* Visual Culinary Artwork Header */}
                    <div
                      onClick={() => setPreviewItem(item)}
                      className="h-40 bg-[#09090B] border-b border-[#27272A] p-4 flex flex-col justify-between relative overflow-hidden cursor-pointer"
                    >
                      <div
                        className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-20 group-hover:scale-110 transition"
                        style={{ backgroundColor: item.accent }}
                      />
                      <div className="flex items-center justify-between z-10">
                        <span className="px-2 py-0.5 bg-[#E11D48] text-white text-[10px] font-bold">
                          {item.code} · {item.cat}
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Stylized Ramen Bowl / Dish Visual Illustration */}
                      <div className="z-10 my-auto flex items-center gap-3">
                        <div
                          className="w-14 h-14 rounded-full border-2 flex items-center justify-center font-serif text-xl font-bold shrink-0"
                          style={{ borderColor: item.accent, color: item.accent, backgroundColor: '#121216' }}
                        >
                          {item.jp.slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] text-zinc-400 truncate">{item.jp}</div>
                          <div className="font-sans font-bold text-sm text-white leading-snug line-clamp-2">
                            {item.name}
                          </div>
                        </div>
                      </div>

                      <div className="z-10 flex items-center justify-between text-[10px] text-zinc-400">
                        <span>{item.kcal}</span>
                        <span className="text-amber-300 underline">Klik untuk Preview →</span>
                      </div>
                    </div>

                    {/* Product Card Body */}
                    <div className="p-4 space-y-3">
                      <p className="font-sans text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.toppings.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 bg-[#0C0C0E] border border-[#27272A] text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Price & Actions */}
                  <div className="p-4 pt-3 border-t border-[#27272A] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">HARGA PORSI</span>
                      <span className="text-sm font-bold text-white">
                        Rp {item.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewItem(item)}
                        className="py-2 border border-[#27272A] bg-[#0C0C0E] hover:border-white text-zinc-200 text-[11px] font-bold transition"
                      >
                        PREVIEW
                      </button>
                      <button
                        type="button"
                        onClick={() => addMenuToPos(item, false)}
                        className="py-2 bg-[#E11D48] hover:bg-rose-600 text-white text-[11px] font-bold transition"
                      >
                        + PESAN
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PRODUCT PREVIEW MODAL (Inside Page 1) */}
            {previewItem && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#141419] border-2 border-[#E11D48] max-w-xl w-full p-6 space-y-5 shadow-2xl">
                  <div className="flex items-start justify-between gap-4 border-b border-[#27272A] pb-4">
                    <div>
                      <span className="px-2 py-0.5 bg-[#E11D48] text-white text-[10px] font-bold">
                        {previewItem.code} · {previewItem.cat} · {previewItem.kcal}
                      </span>
                      <h2 className="font-sans text-xl font-extrabold text-white mt-2">
                        {previewItem.name}
                      </h2>
                      <div className="text-xs text-zinc-400">{previewItem.jp}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewItem(null)}
                      className="px-2.5 py-1 border border-[#27272A] text-zinc-300 hover:text-white text-xs"
                    >
                      [ TUTUP ✕ ]
                    </button>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <p className="text-zinc-200 leading-relaxed text-sm">{previewItem.desc}</p>

                    <div className="p-3.5 bg-[#0C0C0E] border border-[#27272A] space-y-1">
                      <div className="font-mono text-[10px] text-[#E11D48] font-bold uppercase">
                        BASIS KALDU &amp; TEKNIK MASAK
                      </div>
                      <div className="text-zinc-200 font-medium">{previewItem.broth}</div>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] text-zinc-400 uppercase mb-2">
                        KOMPOSISI TOPPING DALAM PORSI:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {previewItem.toppings.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[11px] px-2.5 py-1 bg-[#1C1C24] border border-zinc-700 text-white"
                          >
                            ✓ {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {previewItem.cat === 'RAMEN' && (
                      <div className="p-3.5 bg-[#0C0C0E] border border-[#27272A] space-y-2 font-mono">
                        <div className="text-[10px] text-zinc-400">PILIH TEKSTUR MIE SEBELUM MASUK POS:</div>
                        <div className="flex gap-2">
                          {(['KATAME', 'FUTSU', 'YAWAME'] as const).map((n) => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => setNoodle(n)}
                              className={`px-3 py-1.5 text-xs border ${
                                noodle === n
                                  ? 'border-[#E11D48] bg-[#E11D48] text-white font-bold'
                                  : 'border-[#27272A] text-zinc-400'
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#27272A] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-zinc-400">HARGA SATUAN</div>
                      <div className="text-lg font-bold text-white">
                        Rp {previewItem.price.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          addMenuToPos(previewItem, false);
                          setPreviewItem(null);
                        }}
                        className="px-4 py-2.5 border border-zinc-600 hover:border-white text-white text-xs font-bold"
                      >
                        + TAMBAH KE SLIP
                      </button>
                      <button
                        type="button"
                        onClick={() => addMenuToPos(previewItem, true)}
                        className="px-4 py-2.5 bg-[#E11D48] hover:bg-rose-600 text-white text-xs font-bold"
                      >
                        PESAN &amp; BUKA KASIR POS →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
         * HALAMAN 2: SHOKUKEN POS TERMINAL & PERFORATED RECEIPT SLIP
         * ================================================================= */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Vertical Booth Selector */}
            <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-[#27272A] flex lg:flex-col">
              {['01', '02', '03', '04', '05', '06', '07', '08'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBooth(b)}
                  className={`flex-1 py-3 px-2 text-xs font-bold border-r lg:border-r-0 lg:border-b border-[#27272A] transition ${
                    booth === b
                      ? 'bg-[#E11D48] text-white'
                      : 'bg-[#0C0C0E] text-zinc-500 hover:text-white hover:bg-[#16161B]'
                  }`}
                >
                  #{b}
                </button>
              ))}
            </div>

            {/* Center Shokuken Machine Buttons */}
            <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#27272A] flex flex-col">
              <div className="p-3 border-b border-[#27272A] bg-[#121216] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1">
                  <span className="text-zinc-400 mr-1">NOODLE:</span>
                  {['KATAME', 'FUTSU', 'YAWAME'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNoodle(n)}
                      className={`px-2.5 py-1 border ${
                        noodle === n
                          ? 'border-[#E11D48] bg-[#E11D48]/20 text-white font-bold'
                          : 'border-[#27272A] text-zinc-400'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-zinc-400 mr-1">GARLIC OIL:</span>
                  {['LIGHT', 'RICH', 'BLACK-X'].map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setOil(o)}
                      className={`px-2.5 py-1 border ${
                        oil === o
                          ? 'border-amber-500 bg-amber-500/20 text-amber-200 font-bold'
                          : 'border-[#27272A] text-zinc-400'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2">
                {KURO_CATALOG.map((btn, i) => (
                  <div
                    key={btn.code}
                    className={`p-4 border-b border-[#27272A] ${
                      i % 2 === 0 ? 'sm:border-r' : ''
                    } hover:bg-[#16161D] transition flex flex-col justify-between gap-3`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 bg-[#E11D48] text-white text-[10px] font-bold">
                        {btn.code}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewItem(btn);
                          setPage(1);
                        }}
                        className="text-[10px] text-zinc-400 hover:text-white underline"
                      >
                        Detail Menu
                      </button>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400">{btn.jp}</div>
                      <div className="font-sans font-bold text-sm sm:text-base text-white mt-0.5">
                        {btn.name}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#27272A]/80 text-xs">
                      <span className="text-zinc-200 font-bold">
                        Rp {btn.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => addMenuToPos(btn, false)}
                        className="px-3 py-1 bg-[#E11D48] hover:bg-rose-600 text-white text-[11px] font-bold"
                      >
                        + CETAK TIKET
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Perforated Thermal Slip */}
            <div className="lg:col-span-4 bg-[#141418] p-5 flex flex-col justify-between">
              <div className="bg-[#F4F1EA] text-[#18181B] relative shadow-xl">
                <div className="p-5 pb-6 space-y-4">
                  <div className="flex items-start justify-between border-b border-dashed border-zinc-400 pb-3">
                    <div>
                      <div className="text-[10px] tracking-widest text-zinc-500">SHOKUKEN SLIP</div>
                      <div className="font-bold text-base tracking-tight">KUROBENTO SHIBUYA</div>
                      <div className="text-[11px] text-zinc-600">BOOTH #{booth} · KDS SYNC</div>
                    </div>
                    <div
                      className={`w-10 h-10 border-2 flex items-center justify-center font-serif text-lg font-bold transition ${
                        stamped
                          ? 'border-[#E11D48] text-[#E11D48] rotate-[-8deg] opacity-100'
                          : 'border-zinc-300 text-zinc-300 opacity-50'
                      }`}
                    >
                      済
                    </div>
                  </div>

                  <div className="space-y-2.5 min-h-[210px]">
                    {items.length === 0 ? (
                      <p className="text-xs text-zinc-500 py-8 text-center">
                        Belum ada item. Pilih dari Katalog (Hal 1) atau tombol mesin di kiri.
                      </p>
                    ) : (
                      items.map((it, idx) => (
                        <div key={`${it.code}-${idx}`} className="text-xs border-b border-zinc-300/60 pb-2">
                          <div className="flex justify-between font-bold">
                            <span>
                              {it.qty}x {it.name}
                            </span>
                            <span>{(it.price * it.qty).toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between text-[10px] text-zinc-600 mt-0.5">
                            <span>
                              {it.jp} · {it.spec}
                            </span>
                            <button
                              type="button"
                              onClick={() => setItems((p) => p.filter((_, i) => i !== idx))}
                              className="text-rose-700 underline"
                            >
                              VOID
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-dashed border-zinc-400 pt-3 space-y-1 text-xs">
                    <div className="flex justify-between text-zinc-600">
                      <span>SUBTOTAL</span>
                      <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>TAX &amp; SVC 15%</span>
                      <span>Rp {serviceTax.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-1.5 border-t border-zinc-400">
                      <span>TOTAL</span>
                      <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={fireToKitchen}
                  className="w-full py-3.5 bg-[#E11D48] hover:bg-rose-600 text-white text-xs font-bold tracking-widest transition disabled:opacity-40"
                >
                  {stamped ? 'TERKIRIM KE KDS DAPUR (済)' : 'FIRE TICKET TO KITCHEN (KDS)'}
                </button>
                {stamped && (
                  <button
                    type="button"
                    onClick={() => setPage(3)}
                    className="w-full py-2.5 border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 text-xs font-bold"
                  >
                    LIHAT TIKET DI LAYAR KDS (HALAMAN 3) →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
         * HALAMAN 3: KITCHEN DISPLAY SYSTEM (KDS) & STOK BAHAN DAPUR
         * ================================================================= */}
        {page === 3 && (
          <div className="p-5 sm:p-8 space-y-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#27272A] pb-4">
              <div>
                <span className="text-[11px] text-[#E11D48] font-bold">
                  [ HALAMAN 3 · KITCHEN DISPLAY SYSTEM &amp; BROTH TELEMETRY ]
                </span>
                <h2 className="font-sans text-2xl font-extrabold text-white mt-1">
                  Monitor Antrean Masak Dapur &amp; Inventaris Harian
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-4 py-2 border border-[#27272A] bg-[#141419] hover:border-white text-xs font-bold"
              >
                ← Input Pesanan Baru di POS
              </button>
            </div>

            {/* Active KDS Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kdsQueue.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`border p-5 flex flex-col justify-between gap-4 ${
                    ticket.status === 'COOKING'
                      ? 'border-[#E11D48] bg-[#161215]'
                      : ticket.status === 'PLATING'
                        ? 'border-amber-500 bg-[#171510]'
                        : 'border-emerald-700 bg-[#0F1714] opacity-75'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#27272A] pb-2.5">
                      <div>
                        <span className="text-xs font-bold text-white">{ticket.id}</span>
                        <span className="ml-2 px-2 py-0.5 bg-white/10 text-white text-[11px] font-bold">
                          BOOTH #{ticket.booth}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">{ticket.time}</span>
                    </div>

                    <div className="space-y-2">
                      {ticket.items.map((it, idx) => (
                        <div key={idx} className="text-xs border-b border-zinc-800 pb-1.5">
                          <div className="font-sans font-bold text-white">
                            {it.qty}x {it.name}
                          </div>
                          <div className="text-[10px] text-amber-300">{it.spec}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-1 bg-black/50 text-zinc-200">
                      STATUS: {ticket.status}
                    </span>
                    {ticket.status !== 'SERVED' && (
                      <button
                        type="button"
                        onClick={() => advanceKds(ticket.id)}
                        className="px-3 py-1.5 bg-white text-black text-[11px] font-bold hover:bg-zinc-200"
                      >
                        {ticket.status === 'COOKING' ? 'LANJUT PLATING →' : 'TANDAI SAJI ✓'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Kitchen Stock Gauge Table */}
            <div className="border border-[#27272A] bg-[#121216] p-5 space-y-4">
              <div className="text-xs font-bold text-zinc-300 uppercase">
                STOK BAHAN BAKU SHIFT MALAM (REAL-TIME)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Kaldu Tonkotsu 18-Jam', val: '42 Liter', pct: 78, status: 'NORMAL' },
                  { label: 'Mie Gandum Hakata Fresh', val: '115 Porsi', pct: 64, status: 'NORMAL' },
                  { label: 'Chashu Belly Roll', val: '19 Slice', pct: 24, status: 'RE-PREP' },
                  { label: 'Ajitsuke Tamago 63°C', val: '54 Butir', pct: 82, status: 'NORMAL' },
                ].map((st) => (
                  <div key={st.label} className="p-4 bg-[#0C0C0E] border border-[#27272A] space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400">{st.label}</span>
                      <span className={st.status === 'RE-PREP' ? 'text-[#E11D48] font-bold' : 'text-emerald-400'}>
                        {st.status}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white">{st.val}</div>
                    <div className="w-full h-1.5 bg-zinc-800">
                      <div
                        className={`h-full ${st.status === 'RE-PREP' ? 'bg-[#E11D48]' : 'bg-emerald-500'}`}
                        style={{ width: `${st.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FULL WEBSITE FOOTER */}
      <footer className="border-t border-[#27272A] bg-[#09090B] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-[11px] text-zinc-500">
        <div>KUROBENTO SHIBUYA INDONESIA · JL. SENOPATI NO. 48 JAKARTA SELATAN</div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setPage(1)} className="hover:text-white">
            Hal 1: Katalog Menu
          </button>
          <button type="button" onClick={() => setPage(2)} className="hover:text-white">
            Hal 2: Kasir POS
          </button>
          <button type="button" onClick={() => setPage(3)} className="hover:text-white">
            Hal 3: Dapur KDS
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 2. BREWLAB ROASTERY · 3-Page Coffee Storefront, Barista POS & Pickup Board
 * ========================================================================== */
interface BrewCatalogItem {
  id: string;
  cat: 'ESPRESSO BAR' | 'MANUAL BREW' | 'ROASTERY BEANS' | 'PASTRY';
  origin: string;
  name: string;
  price: number;
  pastry: boolean;
  notes: string[];
  roast: string;
  recipe: string;
  desc: string;
}

const BREW_CATALOG: BrewCatalogItem[] = [
  {
    id: 'br1',
    cat: 'ESPRESSO BAR',
    origin: 'CIWIDEY · WASHED PROCESS',
    name: 'Oat Spanish Cortado Latte',
    price: 38000,
    pastry: false,
    notes: ['Caramel', 'Roasted Hazelnut', 'Creamy Oat'],
    roast: 'Medium-Dark Espresso Omni',
    recipe: 'Dose 18.5g · Yield 36g · 93°C · 27 dtk + 140ml Minor Figures Oat',
    desc: 'Double ristretto dari biji kopi Ciwidey Jawa Barat yang dipadukan susu gandum barista grade dan sentuhan susu kental manis organik.',
  },
  {
    id: 'br2',
    cat: 'MANUAL BREW',
    origin: 'ETHIOPIA GUJI · NATURAL',
    name: 'Pour Over V60 Seasonal Filter',
    price: 42000,
    pastry: false,
    notes: ['White Peach', 'Jasmine Tea', 'Bergamot'],
    roast: 'Light Nordic Filter',
    recipe: 'Dose 15g · Air 240ml (91°C) · 3x Pouring · Total 02:25',
    desc: 'Seduhan manual V60 dengan profil floral dan buah persik segar dari dataran tinggi Guji, Ethiopia (2.100 mdpl).',
  },
  {
    id: 'br3',
    cat: 'ESPRESSO BAR',
    origin: 'UJI KYOTO · CEREMONIAL',
    name: 'Dirty Matcha Espresso Fusion',
    price: 44000,
    pastry: false,
    notes: ['Umami Matcha', 'Dark Chocolate', 'Velvety'],
    roast: 'Ceremonial First-Harvest + House Blend',
    recipe: '3g Uji Matcha Whisked + Cold Milk + 1 Shot Hot Espresso Float',
    desc: 'Lapisan matcha seremonial Jepang kental di dasar gelas, susu dingin segar, dan tuangan shot espresso panas di bagian atas.',
  },
  {
    id: 'br4',
    cat: 'ESPRESSO BAR',
    origin: 'ACEH GAYO · PANTAN MUSARA',
    name: 'Iced Sparkling Yuzu Americano',
    price: 36000,
    pastry: false,
    notes: ['Citrus Yuzu', 'Crisp Apple', 'Clean Finish'],
    roast: 'Medium Roast',
    recipe: 'Double Espresso Aceh Gayo + Yuzu Puree 20ml + Soda Water',
    desc: 'Kombinasi menyegarkan antara double shot espresso Aceh Gayo dengan bulir jeruk yuzu asli dan air soda dingin.',
  },
  {
    id: 'br5',
    cat: 'PASTRY',
    origin: 'FRENCH ELLE & VIRE BUTTER',
    name: 'Artisan Pain au Chocolat',
    price: 31000,
    pastry: true,
    notes: ['70% Valrhona Dark', 'Flaky 27 Layers', 'Warm Butter'],
    roast: 'Baked Fresh 06:30 WIB',
    recipe: 'Laminasi 72 Jam · Panggang Konveksi 195°C selama 16 Menit',
    desc: 'Pastry berlapis renyah dengan mentega Prancis dan dua batang cokelat hitam Valrhona 70% yang meleleh saat disajikan hangat.',
  },
  {
    id: 'br6',
    cat: 'ROASTERY BEANS',
    origin: 'FLORES BAJAWA · HONEY 250G',
    name: 'Kemasan Biji Kopi Flores 250g',
    price: 115000,
    pastry: true,
    notes: ['Brown Spice', 'Sweet Molasses', 'Milk Chocolate'],
    roast: 'Whole Bean / Grind on Request',
    recipe: 'Kemasan Valve One-Way 250g · Tanggal Sangrai Pekan Ini',
    desc: 'Biji kopi arabika Flores Bajawa olahan madu (honey process) dalam kemasan 250 gram untuk seduhan rumahan.',
  },
];

export function BrewLabPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [catFilter, setCatFilter] = useState<'ALL' | BrewCatalogItem['cat']>('ALL');
  const [previewBean, setPreviewBean] = useState<BrewCatalogItem | null>(null);

  const [expandedId, setExpandedId] = useState<string>('br1');
  const [milk, setMilk] = useState<'Dairy' | 'Oat' | 'Soy'>('Oat');
  const [sweet, setSweet] = useState<'0%' | '50%' | '100%'>('50%');
  const [shot, setShot] = useState<'Single' | 'Double'>('Single');
  const [cupName, setCupName] = useState('BIRU');
  const [paidMethod, setPaidMethod] = useState<string | null>(null);
  const [orders, setOrders] = useState<
    { id: string; name: string; meta: string; price: number; qty: number }[]
  >([
    { id: 'br1-Oat-50%-Single', name: 'Oat Spanish Cortado Latte', meta: 'Oat · 50% · Single', price: 44000, qty: 1 },
  ]);

  const [pickupBoard, setPickupBoard] = useState([
    { code: 'CUP-041', guest: 'NADILA', drink: 'Pour Over V60 Seasonal Filter', state: 'READY' as const },
    { code: 'CUP-042', guest: 'RAKA', drink: 'Dirty Matcha Espresso Fusion (Oat)', state: 'BREWING' as const },
  ]);

  const commitDrink = (item: BrewCatalogItem, goPos = false) => {
    setPaidMethod(null);
    const extra = item.pastry ? 0 : (milk === 'Oat' ? 6000 : milk === 'Soy' ? 4000 : 0) + (shot === 'Double' ? 5000 : 0);
    const meta = item.pastry ? 'Fresh Serve' : `${milk} · ${sweet} · ${shot}`;
    const key = `${item.id}-${meta}`;
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === key);
      if (idx >= 0) {
        const c = [...prev];
        c[idx] = { ...c[idx], qty: c[idx].qty + 1 };
        return c;
      }
      return [...prev, { id: key, name: item.name, meta, price: item.price + extra, qty: 1 }];
    });
    if (goPos) {
      setPreviewBean(null);
      setPage(2);
    }
  };

  const settleOrder = (method: string) => {
    if (orders.length === 0) return;
    setPaidMethod(method);
    const newCup = {
      code: `CUP-0${Math.floor(43 + Math.random() * 50)}`,
      guest: cupName || 'GUEST',
      drink: `${orders[0].name}${orders.length > 1 ? ` (+${orders.length - 1} item)` : ''}`,
      state: 'BREWING' as const,
    };
    setPickupBoard((prev) => [newCup, ...prev]);
  };

  const total = orders.reduce((s, o) => s + o.price * o.qty, 0);
  const filtered = catFilter === 'ALL' ? BREW_CATALOG : BREW_CATALOG.filter((i) => i.cat === catFilter);

  return (
    <div className="min-h-[780px] bg-[#F4EFE6] text-[#1C1917] flex flex-col justify-between">
      <div>
        {/* FULL WEBSITE HEADER */}
        <header className="border-b-2 border-[#1C1917] bg-[#EAE2D3] px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#D94E34] font-bold block">
              SMALL-BATCH MICRO ROASTERY &amp; ESPRESSO BAR
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              BrewLab Roastery · Bandung
            </div>
          </div>

          <nav className="flex flex-wrap gap-2 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border border-[#1C1917] transition ${
                page === 1 ? 'bg-[#1C1917] text-[#F4EFE6]' : 'bg-[#F4EFE6] text-[#1C1917]'
              }`}
            >
              01 · Katalog Kopi &amp; Beans
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border border-[#1C1917] transition ${
                page === 2 ? 'bg-[#D94E34] text-white border-[#D94E34]' : 'bg-[#F4EFE6] text-[#1C1917]'
              }`}
            >
              02 · Kasir Barista POS ({orders.reduce((s, o) => s + o.qty, 0)})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border border-[#1C1917] transition ${
                page === 3 ? 'bg-[#1C1917] text-[#F4EFE6]' : 'bg-[#F4EFE6] text-[#1C1917]'
              }`}
            >
              03 · Layar Pickup &amp; Laporan
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: COFFEE & ROASTERY PRODUCT CATALOG */}
        {page === 1 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="border-2 border-[#1C1917] bg-[#EAE2D3] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="font-mono text-xs font-bold uppercase text-[#D94E34]">
                  [ HALAMAN 1 · STOREFRONT KATALOG MINUMAN &amp; BIJI KOPI ]
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold">
                  Sangrai Segar Tiap Pekan, Diseduh Presisi di Bar.
                </h1>
                <p className="text-sm text-stone-700 max-w-2xl leading-relaxed">
                  Eksplorasi menu espresso, seduhan manual V60, pastry Prancis, dan kemasan biji kopi 250g. Klik kartu produk untuk melihat <strong>Resep Ekstraksi &amp; Tasting Notes</strong>.
                </p>
              </div>
              <div className="lg:col-span-4 bg-[#F4EFE6] border border-[#1C1917] p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span>PESANAN AKTIF ({cupName}):</span>
                  <span className="font-bold">Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="w-full py-2.5 bg-[#1C1917] hover:bg-[#D94E34] text-[#F4EFE6] font-bold transition"
                >
                  BUKA KASIR BARISTA (HAL 2) →
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {(['ALL', 'ESPRESSO BAR', 'MANUAL BREW', 'ROASTERY BEANS', 'PASTRY'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCatFilter(c)}
                  className={`px-3.5 py-2 border border-[#1C1917] font-bold ${
                    catFilter === c ? 'bg-[#1C1917] text-[#F4EFE6]' : 'bg-white/60 text-[#1C1917]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="border-2 border-[#1C1917] bg-[#FAF6F0] flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setPreviewBean(item)}
                      className="p-5 bg-[#EAE2D3] border-b border-[#1C1917] cursor-pointer space-y-3"
                    >
                      <div className="flex justify-between font-mono text-[10px] font-bold">
                        <span className="text-[#D94E34]">{item.cat}</span>
                        <span>{item.origin}</span>
                      </div>
                      <h2 className="font-serif text-2xl font-bold leading-snug">{item.name}</h2>
                      <div className="flex flex-wrap gap-1.5">
                        {item.notes.map((n) => (
                          <span
                            key={n}
                            className="font-mono text-[10px] px-2 py-0.5 bg-[#F4EFE6] border border-[#1C1917]"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs text-stone-700 leading-relaxed">{item.desc}</p>
                      <div className="font-mono text-[11px] text-stone-600 border-t border-dashed border-[#1C1917]/30 pt-2">
                        Resep: {item.recipe}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-[#1C1917] flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="font-bold text-sm">Rp {item.price.toLocaleString('id-ID')}</span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewBean(item)}
                        className="px-3 py-1.5 border border-[#1C1917] hover:bg-[#1C1917] hover:text-white font-bold transition"
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => commitDrink(item, false)}
                        className="px-3 py-1.5 bg-[#D94E34] text-white font-bold"
                      >
                        + Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewBean && (
              <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <div className="bg-[#FAF6F0] border-2 border-[#1C1917] max-w-lg w-full p-6 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-start border-b border-[#1C1917] pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#D94E34]">
                        {previewBean.origin}
                      </span>
                      <h3 className="font-serif text-2xl font-bold mt-1">{previewBean.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewBean(null)}
                      className="font-mono text-xs border border-[#1C1917] px-2.5 py-1"
                    >
                      TUTUP ✕
                    </button>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">{previewBean.desc}</p>
                  <div className="p-4 bg-[#EAE2D3] border border-[#1C1917] font-mono text-xs space-y-1.5">
                    <div><strong>ROAST PROFILE:</strong> {previewBean.roast}</div>
                    <div><strong>PARAMETER BARISTA:</strong> {previewBean.recipe}</div>
                    <div><strong>TASTING NOTES:</strong> {previewBean.notes.join(' · ')}</div>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-serif text-2xl font-bold">
                      Rp {previewBean.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      type="button"
                      onClick={() => commitDrink(previewBean, true)}
                      className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#D94E34] text-white font-mono text-xs font-bold"
                    >
                      MASUKKAN KE REGISTER BARISTA →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: BARISTA TOUCH POS */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#1C1917]/20">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b-2 border-[#1C1917]">
                <div>
                  <span className="font-mono text-[11px] tracking-widest uppercase text-[#D94E34] font-bold">
                    HALAMAN 2 · SPEED-BAR BARISTA TOUCH REGISTER
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                    Modifier Susu, Gula &amp; Espresso Shot
                  </h2>
                </div>
                <span className="font-mono text-xs text-stone-600">LINE 1 · LA MARZOCCO KB90</span>
              </div>

              <div className="divide-y divide-[#1C1917]/15">
                {BREW_CATALOG.map((item) => {
                  const isOpen = expandedId === item.id;
                  return (
                    <div key={item.id} className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setExpandedId(item.id)}
                          className="text-left flex-1 group"
                        >
                          <span className="font-mono text-[10px] tracking-widest text-stone-500 block">
                            {item.origin}
                          </span>
                          <span className="font-serif text-xl font-bold group-hover:text-[#D94E34] transition">
                            {item.name}
                          </span>
                        </button>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-mono text-sm font-bold">
                            Rp {item.price.toLocaleString('id-ID')}
                          </span>
                          <button
                            type="button"
                            onClick={() => commitDrink(item, false)}
                            className="px-4 py-2 bg-[#1C1917] hover:bg-[#D94E34] text-[#F4EFE6] font-mono text-xs font-bold transition"
                          >
                            + ADD
                          </button>
                        </div>
                      </div>

                      {isOpen && !item.pastry && (
                        <div className="mt-4 pt-3 border-t border-dashed border-[#1C1917]/20 flex flex-wrap items-center gap-4 text-xs font-mono">
                          <div className="flex items-center border border-[#1C1917]">
                            {(['Dairy', 'Oat', 'Soy'] as const).map((m) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setMilk(m)}
                                className={`px-3 py-1.5 ${milk === m ? 'bg-[#1C1917] text-[#F4EFE6]' : 'bg-transparent'}`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center border border-[#1C1917]">
                            {(['0%', '50%', '100%'] as const).map((sw) => (
                              <button
                                key={sw}
                                type="button"
                                onClick={() => setSweet(sw)}
                                className={`px-3 py-1.5 ${sweet === sw ? 'bg-[#D94E34] text-white' : 'bg-transparent'}`}
                              >
                                {sw}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center border border-[#1C1917]">
                            {(['Single', 'Double'] as const).map((sh) => (
                              <button
                                key={sh}
                                type="button"
                                onClick={() => setShot(sh)}
                                className={`px-3 py-1.5 ${shot === sh ? 'bg-[#1C1917] text-[#F4EFE6]' : 'bg-transparent'}`}
                              >
                                {sh}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#EAE2D3] p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b-2 border-[#1C1917] pb-3">
                  <label htmlFor="brew-cup-call" className="font-mono text-xs font-bold">
                    [ CUP CALLOUT ]
                  </label>
                  <input
                    id="brew-cup-call"
                    type="text"
                    value={cupName}
                    onChange={(e) => setCupName(e.target.value.toUpperCase())}
                    className="w-32 text-right font-mono font-bold text-sm bg-transparent border-b border-[#1C1917] focus:outline-none text-[#D94E34]"
                  />
                </div>

                <div className="space-y-3 min-h-[240px]">
                  {orders.map((o) => (
                    <div key={o.id} className="flex justify-between items-start gap-2 pb-3 border-b border-[#1C1917]/15">
                      <div>
                        <div className="font-serif font-bold text-base">
                          {o.qty}x {o.name}
                        </div>
                        <div className="font-mono text-[11px] text-stone-600">{o.meta}</div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <div className="font-bold">Rp {(o.price * o.qty).toLocaleString('id-ID')}</div>
                        <button
                          type="button"
                          onClick={() => setOrders((p) => p.filter((x) => x.id !== o.id))}
                          className="text-[#D94E34] underline mt-0.5"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t-2 border-[#1C1917]">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs font-bold">AMOUNT DUE</span>
                  <span className="font-serif text-3xl font-bold">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>

                {paidMethod && (
                  <div className="p-2.5 bg-[#1C1917] text-[#F4EFE6] font-mono text-xs text-center space-y-1">
                    <div>SETTLED VIA {paidMethod} · CUP #{cupName || 'GUEST'} MASUK ANTREAN</div>
                    <button
                      type="button"
                      onClick={() => setPage(3)}
                      className="underline text-amber-300 block w-full"
                    >
                      Lihat Layar Pickup Pelanggan (Hal 3) →
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => settleOrder('EXACT CASH')}
                    className="py-3.5 border-2 border-[#1C1917] hover:bg-[#1C1917] hover:text-[#F4EFE6] transition"
                  >
                    EXACT CASH
                  </button>
                  <button
                    type="button"
                    onClick={() => settleOrder('QRIS TAP')}
                    className="py-3.5 bg-[#D94E34] hover:bg-[#be4029] text-white transition"
                  >
                    QRIS TAP
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: CUSTOMER PICKUP BOARD & ROASTERY DAILY REPORT */}
        {page === 3 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 border-2 border-[#1C1917] bg-[#FAF6F0] p-6 space-y-4">
                <div className="flex justify-between items-center border-b-2 border-[#1C1917] pb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold text-[#D94E34]">
                      HALAMAN 3 · BAR PICKUP MONITOR
                    </span>
                    <h2 className="font-serif text-2xl font-bold">Status Panggilan Cup Pelanggan</h2>
                  </div>
                  <span className="font-mono text-xs">LIVE BAR DISPLAY</span>
                </div>

                <div className="space-y-3">
                  {pickupBoard.map((c) => (
                    <div
                      key={c.code}
                      className="p-4 border border-[#1C1917] bg-[#F4EFE6] flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-mono text-xs text-stone-500">{c.code}</div>
                        <div className="font-serif text-xl font-bold">{c.guest}</div>
                        <div className="text-xs text-stone-700">{c.drink}</div>
                      </div>
                      <div className="text-right font-mono">
                        <span
                          className={`px-3 py-1 text-xs font-bold inline-block ${
                            c.state === 'READY'
                              ? 'bg-emerald-800 text-white'
                              : 'bg-[#D94E34] text-white'
                          }`}
                        >
                          {c.state === 'READY' ? 'SIAP DIAMBIL DI BAR' : 'SEDANG DISEDUH'}
                        </span>
                        {c.state === 'BREWING' && (
                          <button
                            type="button"
                            onClick={() =>
                              setPickupBoard((prev) =>
                                prev.map((x) => (x.code === c.code ? { ...x, state: 'READY' } : x))
                              )
                            }
                            className="block text-[11px] underline mt-1.5 ml-auto"
                          >
                            Tandai Selesai Seduh →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 border-2 border-[#1C1917] bg-[#EAE2D3] p-6 space-y-5 font-mono text-xs">
                <div className="border-b-2 border-[#1C1917] pb-3">
                  <div className="text-[10px] text-[#D94E34] font-bold">ROASTERY TELEMETRY</div>
                  <div className="font-serif text-xl font-bold text-[#1C1917]">
                    Rekap Shift &amp; Gramasi Hopper
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-[#F4EFE6] border border-[#1C1917] flex justify-between">
                    <span>Hopper 1 (Ciwidey Espresso)</span>
                    <span className="font-bold">1.840 g tersisa</span>
                  </div>
                  <div className="p-3 bg-[#F4EFE6] border border-[#1C1917] flex justify-between">
                    <span>Hopper 2 (Ethiopia Guji Filter)</span>
                    <span className="font-bold">620 g tersisa</span>
                  </div>
                  <div className="p-3 bg-[#F4EFE6] border border-[#1C1917] flex justify-between">
                    <span>Susu Oat Barista Stock</span>
                    <span className="font-bold">18 Karton</span>
                  </div>
                  <div className="p-3 bg-[#1C1917] text-[#F4EFE6] flex justify-between">
                    <span>Total Cup Terjual Shift Pagi</span>
                    <span className="font-bold">84 Cups · Rp 3.420.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t-2 border-[#1C1917] bg-[#EAE2D3] px-6 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
        <span>BREWLAB ROASTERY · JL. PROGO NO. 19 BANDUNG · BUKA 07:00 - 22:00 WIB</span>
        <div className="flex gap-4 font-bold">
          <button type="button" onClick={() => setPage(1)} className="underline">Hal 1: Katalog</button>
          <button type="button" onClick={() => setPage(2)} className="underline">Hal 2: Kasir POS</button>
          <button type="button" onClick={() => setPage(3)} className="underline">Hal 3: Pickup</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 3. APOTEK MEDIKA · 3-Page Pharmacy Catalog, SIMRS FEFO POS & Batch Warehouse
 * ========================================================================== */
const SIMRS_DRUGS = [
  {
    code: 'OBT-001',
    name: 'Paracetamol 500mg Strip 10 Kaplet',
    cat: 'OBAT BEBAS',
    batch: 'PCM-26A',
    exp: '2027-08',
    stock: 120,
    rx: false,
    price: 12000,
    bpom: 'DBL7801900110A1',
    zat: 'Paracetamol Micronized 500 mg',
    indikasi: 'Meredakan demam serta nyeri ringan hingga sedang (sakit kepala, sakit gigi).',
    dosis: 'Dewasa: 1-2 kaplet, 3-4 kali sehari sesudah makan.',
  },
  {
    code: 'OBT-014',
    name: 'Amoxicillin Trihydrate 500mg Kapsul',
    cat: 'OBAT KERAS (K)',
    batch: 'AMX-991',
    exp: '2027-05',
    stock: 42,
    rx: true,
    price: 18500,
    bpom: 'GKL8912004401A1',
    zat: 'Amoxicillin Trihydrate setara 500 mg',
    indikasi: 'Infeksi saluran pernapasan, saluran kemih, dan jaringan lunak (Wajib Resep Dokter).',
    dosis: 'Dewasa: 500 mg tiap 8 jam (habiskan seluruh strip).',
  },
  {
    code: 'OBT-029',
    name: 'Cetirizine HCl 10mg Antihistamin',
    cat: 'BEBAS TERBATAS',
    batch: 'CTZ-104',
    exp: '2027-12',
    stock: 64,
    rx: false,
    price: 15000,
    bpom: 'DTL0422101917A1',
    zat: 'Cetirizine Dihydrochloride 10 mg',
    indikasi: 'Rinitis alergi musiman, urtikaria kronis, dan gatal alergi kulit.',
    dosis: '1 tablet sekali sehari pada malam hari.',
  },
  {
    code: 'OBT-052',
    name: 'Omeprazole 20mg Kapsul Lepas Lambat',
    cat: 'OBAT KERAS (K)',
    batch: 'OMP-311',
    exp: '2027-06',
    stock: 14,
    rx: true,
    price: 24000,
    bpom: 'GKL9904511203A1',
    zat: 'Omeprazole Enteric-Coated Pellets 20 mg',
    indikasi: 'Terapi GERD, tukak lambung, dan hipersekresi asam lambung.',
    dosis: '1 kapsul sekali sehari 30 menit sebelum makan pagi.',
  },
  {
    code: 'OBT-088',
    name: 'Cholecalciferol Vitamin D3 1000 IU',
    cat: 'VITAMIN & IMUN',
    batch: 'VD3-412',
    exp: '2028-11',
    stock: 85,
    rx: false,
    price: 45000,
    bpom: 'SD201356111',
    zat: 'Vitamin D3 (Cholecalciferol) 1000 IU (25 mcg)',
    indikasi: 'Memenuhi kebutuhan Vitamin D harian untuk imunitas dan kepadatan tulang.',
    dosis: '1 kapsul lunak sehari sesudah makan.',
  },
  {
    code: 'OBT-095',
    name: 'Tensimeter Digital Lengan Otomatis',
    cat: 'ALAT KESEHATAN',
    batch: 'ALK-702',
    exp: '2030-01',
    stock: 9,
    rx: false,
    price: 345000,
    bpom: 'AKL 20501912440',
    zat: 'Manset Lengan Universal 22-42 cm + Sensor Intellisense',
    indikasi: 'Pemantauan tekanan darah sistolik/diastolik dan detak jantung mandiri di rumah.',
    dosis: 'Gunakan dalam posisi duduk tenang selama 5 menit.',
  },
];

export function ApotekMedikaPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [previewDrug, setPreviewDrug] = useState<(typeof SIMRS_DRUGS)[0] | null>(null);
  const [search, setSearch] = useState('');
  const [onlyRx, setOnlyRx] = useState(false);
  const [patient, setPatient] = useState('Tn. Hendra Wijaya');
  const [timing, setTiming] = useState<'Pagi' | 'Siang' | 'Malam'>('Pagi');
  const [mealRule, setMealRule] = useState<'Sesudah Makan' | 'Sebelum Makan'>('Sesudah Makan');
  const [doseQty, setDoseQty] = useState('3 x 1 Tablet');
  const [dispensed, setDispensed] = useState([
    { code: 'OBT-001', name: 'Paracetamol 500mg Strip 10 Kaplet', batch: 'PCM-26A', qty: 1, price: 12000 },
  ]);

  const addRow = (d: (typeof SIMRS_DRUGS)[0], goPos = false) => {
    setDispensed((prev) => {
      const idx = prev.findIndex((p) => p.code === d.code);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { code: d.code, name: d.name, batch: d.batch, qty: 1, price: d.price }];
    });
    if (goPos) {
      setPreviewDrug(null);
      setPage(2);
    }
  };

  const rows = SIMRS_DRUGS.filter(
    (d) =>
      (!onlyRx || d.rx) &&
      (d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.code.toLowerCase().includes(search.toLowerCase()) ||
        d.batch.toLowerCase().includes(search.toLowerCase()))
  );

  const subtotal = dispensed.reduce((s, d) => s + d.price * d.qty, 0);

  return (
    <div className="min-h-[780px] bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col justify-between">
      <div>
        {/* FULL WEBSITE HEADER */}
        <header className="bg-[#064E3B] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] text-emerald-300 font-bold">
              SIMRS &amp; TELEFARMASI TERPADU · SIPA 1998/2026
            </div>
            <div className="font-bold text-xl tracking-tight">
              APOTEK MEDIKA FARMA
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border transition ${
                page === 1
                  ? 'bg-white text-[#064E3B] border-white'
                  : 'bg-[#065F46] text-emerald-100 border-emerald-500/40'
              }`}
            >
              01 · E-Katalog Obat &amp; Alkes
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border transition ${
                page === 2
                  ? 'bg-white text-[#064E3B] border-white'
                  : 'bg-[#065F46] text-emerald-100 border-emerald-500/40'
              }`}
            >
              02 · Kasir FEFO &amp; Etiket ({dispensed.length})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border transition ${
                page === 3
                  ? 'bg-white text-[#064E3B] border-white'
                  : 'bg-[#065F46] text-emerald-100 border-emerald-500/40'
              }`}
            >
              03 · Gudang Batch &amp; Defekta
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: E-KATALOG OBAT & MONOGRAFI */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white border border-slate-300 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="font-mono text-xs font-bold text-[#065F46]">
                  [ HALAMAN 1 · KATALOG SEDIAAN FARMASI &amp; ALAT KESEHATAN ]
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Cek Komposisi Zat Aktif, Nomor BPOM &amp; Ketersediaan Batch FEFO.
                </h1>
                <p className="text-sm text-slate-600">
                  Klik <strong>Preview Indikasi &amp; Dosis</strong> pada kartu obat untuk membaca monografi klinis lengkap sebelum memasukkan ke daftar penebusan kasir.
                </p>
              </div>
              <div className="lg:col-span-4 bg-emerald-50 border border-emerald-200 p-4 space-y-2 font-mono text-xs">
                <div className="font-bold text-[#064E3B]">RESEP AKTIF: {patient}</div>
                <div>Total Sediaan: {dispensed.length} Item (Rp {subtotal.toLocaleString('id-ID')})</div>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="w-full py-2.5 bg-[#065F46] text-white font-bold"
                >
                  PROSES DI KASIR &amp; CETAK ETIKET →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SIMRS_DRUGS.map((d) => (
                <div key={d.code} className="bg-white border border-slate-300 flex flex-col justify-between">
                  <div>
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-mono text-[11px]">
                      <span className="font-bold text-slate-700">{d.code} · BATCH {d.batch}</span>
                      <span
                        className={`px-2 py-0.5 font-bold ${
                          d.rx
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        }`}
                      >
                        {d.cat}
                      </span>
                    </div>
                    <div className="p-5 space-y-2.5">
                      <h2 className="font-bold text-base text-slate-900">{d.name}</h2>
                      <div className="font-mono text-xs text-[#065F46] font-semibold">
                        Zat Aktif: {d.zat}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{d.indikasi}</p>
                      <div className="font-mono text-[11px] text-slate-500 pt-1">
                        Izin Edar: {d.bpom} · Exp: {d.exp}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-200 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-sm text-slate-900">
                      Rp {d.price.toLocaleString('id-ID')}
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewDrug(d)}
                        className="px-3 py-1.5 border border-slate-300 hover:border-slate-800 font-bold"
                      >
                        Monografi
                      </button>
                      <button
                        type="button"
                        onClick={() => addRow(d, false)}
                        className="px-3 py-1.5 bg-[#065F46] text-white font-bold"
                      >
                        + Tebus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewDrug && (
              <div className="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4">
                <div className="bg-white border-2 border-[#065F46] max-w-lg w-full p-6 space-y-4 shadow-2xl">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#065F46]">
                        {previewDrug.code} · {previewDrug.bpom}
                      </span>
                      <h3 className="font-bold text-xl mt-1">{previewDrug.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewDrug(null)}
                      className="font-mono text-xs border border-slate-300 px-2.5 py-1"
                    >
                      TUTUP ✕
                    </button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200">
                      <div className="font-mono font-bold text-slate-500">KOMPOSISI ZAT AKTIF</div>
                      <div className="font-semibold text-sm mt-0.5">{previewDrug.zat}</div>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-slate-500">INDIKASI KLINIS</div>
                      <p className="text-slate-700 mt-0.5">{previewDrug.indikasi}</p>
                    </div>
                    <div>
                      <div className="font-mono font-bold text-slate-500">ATURAN PAKAI STANDAR</div>
                      <p className="text-slate-700 mt-0.5">{previewDrug.dosis}</p>
                    </div>
                    <div className="font-mono text-[11px] text-slate-600 flex justify-between pt-2 border-t border-slate-200">
                      <span>BATCH FEFO: {previewDrug.batch} (EXP {previewDrug.exp})</span>
                      <span>STOK: {previewDrug.stock} UNIT</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                    <span className="font-mono text-lg font-bold">
                      HET Rp {previewDrug.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      type="button"
                      onClick={() => addRow(previewDrug, true)}
                      className="px-4 py-2.5 bg-[#065F46] text-white font-mono text-xs font-bold"
                    >
                      MASUKKAN KE KASIR &amp; CETAK ETIKET →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: SIMRS FEFO POS & ETIKET OBAT */}
        {page === 2 && (
          <div>
            <div className="p-3 bg-white border-b border-slate-300 flex flex-wrap items-center gap-3 text-xs">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter kode obat, nama generik, atau nomor batch FEFO..."
                className="flex-1 min-w-[240px] px-3 py-1.5 border border-slate-300 bg-slate-50 font-mono focus:border-[#065F46] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOnlyRx((v) => !v)}
                className={`px-3 py-1.5 font-mono font-bold border ${
                  onlyRx ? 'bg-rose-700 text-white border-rose-700' : 'bg-white border-slate-300'
                }`}
              >
                {onlyRx ? 'Filter: Hanya Obat Resep (K)' : 'Filter: Semua Golongan'}
              </button>
            </div>

            <div className="overflow-x-auto bg-white border-b border-slate-300">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 border-b border-slate-300 font-mono text-[11px] text-slate-700">
                  <tr>
                    <th className="py-2 px-3 border-r border-slate-200">KODE</th>
                    <th className="py-2 px-3 border-r border-slate-200">NAMA OBAT &amp; SEDIAAN</th>
                    <th className="py-2 px-3 border-r border-slate-200">BATCH</th>
                    <th className="py-2 px-3 border-r border-slate-200">EXP (FEFO)</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-right">STOK</th>
                    <th className="py-2 px-3 border-r border-slate-200 text-right">HARGA HET</th>
                    <th className="py-2 px-3 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {rows.map((r, i) => (
                    <tr key={r.code} className={i % 2 === 1 ? 'bg-slate-50/70' : 'bg-white'}>
                      <td className="py-2 px-3 font-mono border-r border-slate-200">{r.code}</td>
                      <td className="py-2 px-3 font-semibold border-r border-slate-200">
                        {r.name}{' '}
                        {r.rx && (
                          <span className="ml-1 font-mono text-[10px] px-1 bg-rose-100 text-rose-800 border border-rose-300">
                            K
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-mono border-r border-slate-200">{r.batch}</td>
                      <td className="py-2 px-3 font-mono border-r border-slate-200 text-[#065F46] font-bold">
                        {r.exp}
                      </td>
                      <td className="py-2 px-3 font-mono border-r border-slate-200 text-right">{r.stock}</td>
                      <td className="py-2 px-3 font-mono border-r border-slate-200 text-right">
                        Rp {r.price.toLocaleString('id-ID')}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => addRow(r, false)}
                          className="px-2.5 py-1 bg-[#065F46] hover:bg-[#047857] text-white font-mono text-[11px] font-bold"
                        >
                          + DISPENSE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-5 border-b lg:border-b-0 lg:border-r border-slate-300 bg-white flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-mono text-xs font-bold uppercase text-slate-600">
                      Rincian Penyerahan Obat Pasien
                    </h2>
                    <span className="font-mono text-sm font-bold text-[#065F46]">
                      TOTAL: Rp {subtotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="border border-slate-200 divide-y divide-slate-200 text-xs">
                    {dispensed.map((d) => (
                      <div key={d.code} className="p-2.5 flex items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-slate-500 mr-2">[{d.batch}]</span>
                          <span className="font-bold">
                            {d.qty}x {d.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono">
                          <span>Rp {(d.price * d.qty).toLocaleString('id-ID')}</span>
                          <button
                            type="button"
                            onClick={() => setDispensed((p) => p.filter((x) => x.code !== d.code))}
                            className="text-rose-700 underline"
                          >
                            Del
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <input
                    type="text"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    placeholder="Nama Pasien"
                    className="px-3 py-1.5 border border-slate-300 flex-1"
                  />
                  <select
                    value={doseQty}
                    onChange={(e) => setDoseQty(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 bg-white font-mono"
                  >
                    <option>3 x 1 Tablet</option>
                    <option>2 x 1 Kapsul</option>
                    <option>1 x 1 Malam</option>
                  </select>
                </div>
              </div>

              <div className="lg:col-span-5 p-5 bg-slate-100 flex flex-col justify-between gap-3">
                <div className="bg-white border-2 border-[#1E40AF] shadow-sm">
                  <div className="bg-[#1E40AF] text-white px-3 py-1.5 text-center">
                    <div className="font-bold text-xs tracking-wide">APOTEK MEDIKA FARMA</div>
                    <div className="text-[10px]">APA: Apt. Raka Pratama, S.Farm · SIPA 1998/2026</div>
                  </div>
                  <div className="p-3.5 text-xs space-y-2.5">
                    <div className="flex justify-between font-mono text-[11px] border-b border-slate-200 pb-1.5">
                      <span>No. R/: 0182/XI</span>
                      <span>Tgl: 18/11/2026</span>
                    </div>
                    <div className="font-bold">
                      Nama Pasien: <span className="underline">{patient}</span>
                    </div>
                    <div className="font-mono text-sm font-bold text-[#1E40AF] text-center py-1 bg-blue-50 border border-blue-200">
                      {doseQty} · {mealRule}
                    </div>
                    <div className="flex justify-center gap-4 text-[11px] font-mono pt-1">
                      {(['Pagi', 'Siang', 'Malam'] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTiming(t)}
                          className="flex items-center gap-1"
                        >
                          <span className="w-3.5 h-3.5 border border-[#1E40AF] inline-flex items-center justify-center text-[10px] font-bold">
                            {timing === t ? '✓' : ''}
                          </span>
                          <span>{t}</span>
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-center gap-4 text-[11px] pt-1">
                      {(['Sebelum Makan', 'Sesudah Makan'] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMealRule(m)}
                          className={`px-2 py-0.5 border text-[10px] ${
                            mealRule === m ? 'border-[#1E40AF] bg-blue-50 font-bold' : 'border-slate-300'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-2.5 bg-[#065F46] hover:bg-[#047857] text-white font-mono text-xs font-bold"
                >
                  CETAK ETIKET &amp; AUDIT GUDANG BATCH (HAL 3) →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: GUDANG BATCH FEFO & BUKU DEFEKTA */}
        {page === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#065F46]">
                  [ HALAMAN 3 · AUDIT STOK GUDANG FEFO &amp; BUKU DEFEKTA ]
                </span>
                <h2 className="text-2xl font-bold mt-1">
                  Prioritas Pengeluaran Batch &amp; Peringatan Stok Kritis
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPage(1)}
                className="px-4 py-2 border border-slate-300 bg-white font-mono text-xs font-bold"
              >
                ← Kembali ke Katalog Obat
              </button>
            </div>

            <div className="bg-white border border-slate-300 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 border-b border-slate-300 font-mono">
                  <tr>
                    <th className="p-3">URUTAN FEFO</th>
                    <th className="p-3">NOMOR BATCH</th>
                    <th className="p-3">NAMA SEDIAAN</th>
                    <th className="p-3">TGL KADALUARSA</th>
                    <th className="p-3 text-right">SISA STOK</th>
                    <th className="p-3">STATUS DEFEKTA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[...SIMRS_DRUGS]
                    .sort((a, b) => a.exp.localeCompare(b.exp))
                    .map((d, idx) => (
                      <tr key={d.code}>
                        <td className="p-3 font-mono font-bold text-[#065F46]">PRIORITAS #{idx + 1}</td>
                        <td className="p-3 font-mono">{d.batch}</td>
                        <td className="p-3 font-semibold">{d.name}</td>
                        <td className="p-3 font-mono font-bold">{d.exp}</td>
                        <td className="p-3 font-mono text-right">{d.stock} Unit</td>
                        <td className="p-3 font-mono">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold ${
                              d.stock < 20
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-emerald-100 text-emerald-900'
                            }`}
                          >
                            {d.stock < 20 ? 'RE-ORDER SP (STOK TIPIS)' : 'STOK AMAN'}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-300 bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-600">
        <span>APOTEK MEDIKA FARMA · LAYANAN RESEP 24 JAM · TERINTEGRASI BPOM &amp; SIMRS</span>
        <div className="flex gap-4 font-bold text-[#065F46]">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Katalog</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Kasir FEFO</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Gudang Batch</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 4. ATELIER LUXE · 3-Page Editorial Lookbook, Boutique POS & VIP Client CRM
 * ========================================================================== */
const LOOKBOOK = [
  {
    ref: 'REF. AW26-01',
    cat: 'OUTERWEAR',
    name: 'Double-Faced Cashmere Trench',
    price: 4850000,
    sizes: ['36', '38', '40', '42'],
    swatch: '#1F2937',
    fabric: '100% Inner Mongolian Cashmere (480 gsm) · Hand-finished lapel',
    origin: 'Tailored in Milan, Italy',
    stockMatrix: { senayan: 3, plazaId: 2, bali: 1 },
  },
  {
    ref: 'REF. AW26-04',
    cat: 'FOOTWEAR',
    name: 'Goodyear-Welted Suede Chelsea Boots',
    price: 3200000,
    sizes: ['40', '41', '42', '43'],
    swatch: '#57534E',
    fabric: 'Tuscan Calf Suede · Vibram Commando Sole · Full Leather Lining',
    origin: 'Handcrafted in Florence, Italy',
    stockMatrix: { senayan: 4, plazaId: 1, bali: 2 },
  },
  {
    ref: 'REF. AW26-09',
    cat: 'LEATHER GOODS',
    name: 'Box Calfskin Architectural Tote',
    price: 5400000,
    sizes: ['OS'],
    swatch: '#111111',
    fabric: 'Full-Grain French Box Calfskin · Brushed Brass Hardware',
    origin: 'Atelier Paris / Jakarta Flagship',
    stockMatrix: { senayan: 2, plazaId: 2, bali: 0 },
  },
  {
    ref: 'REF. AW26-12',
    cat: 'SILK SHIRTING',
    name: 'Mulberry Raw Silk Jacquard Shirt',
    price: 2150000,
    sizes: ['36', '38', '40'],
    swatch: '#78716C',
    fabric: '22-Momme Mulberry Silk · Mother-of-Pearl Buttons',
    origin: 'Woven in Como, Italy',
    stockMatrix: { senayan: 5, plazaId: 4, bali: 3 },
  },
];

export function AtelierLuxePos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [previewPiece, setPreviewPiece] = useState<(typeof LOOKBOOK)[0] | null>(null);
  const [sizePick, setSizePick] = useState<Record<string, string>>({
    'REF. AW26-01': '38',
    'REF. AW26-04': '42',
    'REF. AW26-09': 'OS',
    'REF. AW26-12': '38',
  });
  const [vip, setVip] = useState<'REGULAR' | 'SILVER 5%' | 'BLACK 15%'>('BLACK 15%');
  const [bag, setBag] = useState<{ ref: string; name: string; size: string; price: number }[]>([
    { ref: 'REF. AW26-01', name: 'Double-Faced Cashmere Trench', size: '38', price: 4850000 },
  ]);

  const rate = vip === 'BLACK 15%' ? 0.15 : vip === 'SILVER 5%' ? 0.05 : 0;
  const gross = bag.reduce((s, b) => s + b.price, 0);
  const disc = Math.round(gross * rate);
  const net = gross - disc;

  const addToBag = (item: (typeof LOOKBOOK)[0], goPos = false) => {
    const activeSize = sizePick[item.ref] || item.sizes[0];
    setBag((p) => [...p, { ref: item.ref, name: item.name, size: activeSize, price: item.price }]);
    if (goPos) {
      setPreviewPiece(null);
      setPage(2);
    }
  };

  return (
    <div className="min-h-[780px] bg-white text-[#111111] flex flex-col justify-between border-t border-[#111111]">
      <div>
        {/* FULL WEBSITE HEADER */}
        <header className="px-6 py-4 border-b border-[#111111] flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl tracking-[0.22em]">ATELIER LUXE</h1>
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              AUTUMN / WINTER 2026 ARCHIVE · SENAYAN &amp; PLAZA INDONESIA
            </span>
          </div>

          <nav className="flex flex-wrap gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-4 py-2 border border-[#111111] transition ${
                page === 1 ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
              }`}
            >
              01 · Lookbook &amp; Preview Koleksi
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-4 py-2 border border-[#111111] transition ${
                page === 2 ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
              }`}
            >
              02 · Clienteling POS ({bag.length})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-4 py-2 border border-[#111111] transition ${
                page === 3 ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
              }`}
            >
              03 · VIP Client Book &amp; Stok Cabang
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: EDITORIAL LOOKBOOK & GARMENT PREVIEW */}
        {page === 1 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="border border-[#111111] bg-[#FAF9F6] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                  [ HALAMAN 1 · DIGITAL LOOKBOOK &amp; GARMENT SPECIFICATION ]
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl">
                  Siluet Monokrom &amp; Material Cashmere Italia.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Klik setiap artikel untuk membuka <strong>Dossier Material, Dimensi Ukuran, dan Stok Antar Butik</strong> sebelum memasukkannya ke Client Bag.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-6 py-3.5 bg-[#111111] text-white font-mono text-xs tracking-widest uppercase self-start lg:self-auto"
              >
                Buka Clienteling Bag ({bag.length}) →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LOOKBOOK.map((item, idx) => {
                const activeSize = sizePick[item.ref] || item.sizes[0];
                return (
                  <div key={item.ref} className="border border-[#111111] p-6 flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                      <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                        <span>{item.ref} · {item.cat}</span>
                        <span>{item.origin}</span>
                      </div>

                      <div
                        onClick={() => setPreviewPiece(item)}
                        className="h-44 w-full border border-[#111111] p-4 flex flex-col justify-between cursor-pointer text-white"
                        style={{ backgroundColor: item.swatch }}
                      >
                        <div className="flex justify-between font-mono text-[10px]">
                          <span className="bg-black/60 px-2 py-0.5">ARCHIVE PIECE 0{idx + 1}</span>
                          <span className="underline">INSPECT MATERIAL →</span>
                        </div>
                        <div>
                          <div className="font-serif text-2xl">{item.name}</div>
                          <div className="font-mono text-[11px] text-neutral-200 mt-1">{item.fabric}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-baseline">
                        <span className="font-mono text-xs text-neutral-500">RETAIL PRICE</span>
                        <span className="font-mono text-sm font-bold">
                          IDR {item.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-1.5">
                        {item.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSizePick((p) => ({ ...p, [item.ref]: s }))}
                            className={`flex-1 py-1.5 font-mono text-xs border border-[#111111] ${
                              activeSize === s ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        <button
                          type="button"
                          onClick={() => setPreviewPiece(item)}
                          className="py-2.5 border border-[#111111] hover:bg-neutral-100 uppercase tracking-wider"
                        >
                          Preview Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => addToBag(item, false)}
                          className="py-2.5 bg-[#111111] text-white uppercase tracking-wider font-bold"
                        >
                          + Add Size {activeSize}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {previewPiece && (
              <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
                <div className="bg-white border-2 border-[#111111] max-w-lg w-full p-6 space-y-5">
                  <div className="flex justify-between items-start border-b border-[#111111] pb-3">
                    <div>
                      <span className="font-mono text-[10px] text-neutral-500">{previewPiece.ref}</span>
                      <h3 className="font-serif text-2xl mt-1">{previewPiece.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewPiece(null)}
                      className="font-mono text-xs border border-[#111111] px-2.5 py-1"
                    >
                      CLOSE ✕
                    </button>
                  </div>
                  <div className="space-y-3 font-mono text-xs">
                    <div><strong>KOMPOSISI MATERIAL:</strong> {previewPiece.fabric}</div>
                    <div><strong>ATELIER ORIGIN:</strong> {previewPiece.origin}</div>
                    <div className="p-3 bg-neutral-100 border border-[#111111] space-y-1">
                      <div className="font-bold">KETERSEDIAAN STOK BUTIK:</div>
                      <div>Senayan City Flagship: {previewPiece.stockMatrix.senayan} pcs</div>
                      <div>Plaza Indonesia Level 1: {previewPiece.stockMatrix.plazaId} pcs</div>
                      <div>Seminyak Resort Bali: {previewPiece.stockMatrix.bali} pcs</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#111111]">
                    <span className="font-mono font-bold text-base">
                      IDR {previewPiece.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToBag(previewPiece, true)}
                      className="px-5 py-2.5 bg-[#111111] text-white font-mono text-xs font-bold uppercase tracking-wider"
                    >
                      MASUKKAN KE CLIENTELING POS →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: BOUTIQUE CLIENTELING POS */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#111111] grid grid-cols-1 sm:grid-cols-2">
              {LOOKBOOK.map((item, idx) => {
                const activeSize = sizePick[item.ref] || item.sizes[0];
                return (
                  <div
                    key={item.ref}
                    className={`p-6 border-b border-[#111111] ${idx % 2 === 0 ? 'sm:border-r' : ''} flex flex-col justify-between gap-5`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                        <span>{item.ref}</span>
                        <span>IN STOCK</span>
                      </div>
                      <h2 className="font-serif text-xl">{item.name}</h2>
                      <p className="font-mono text-[11px] text-neutral-600">{item.fabric}</p>
                      <div className="font-mono text-xs font-bold">
                        IDR {item.price.toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-1">
                        {item.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSizePick((p) => ({ ...p, [item.ref]: s }))}
                            className={`flex-1 py-1.5 font-mono text-xs border border-[#111111] ${
                              activeSize === s ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => addToBag(item, false)}
                        className="w-full py-2.5 border border-[#111111] hover:bg-[#111111] hover:text-white font-mono text-[11px] tracking-widest uppercase transition"
                      >
                        Add Size {activeSize} to Dossier
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#FAFAFA]">
              <div className="space-y-5">
                <div className="border-b border-[#111111] pb-3">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 block">
                    Client Dossier
                  </span>
                  <div className="font-serif text-xl mt-0.5">Clarissa V. · No. 0841</div>
                </div>

                <div className="grid grid-cols-3 border border-[#111111] font-mono text-[10px]">
                  {(['REGULAR', 'SILVER 5%', 'BLACK 15%'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setVip(tier)}
                      className={`py-2 border-r last:border-r-0 border-[#111111] ${
                        vip === tier ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-neutral-300 min-h-[220px]">
                  {bag.map((b, i) => (
                    <div key={`${b.ref}-${i}`} className="py-3 flex justify-between items-start text-xs">
                      <div>
                        <div className="font-serif text-sm">{b.name}</div>
                        <div className="font-mono text-[10px] text-neutral-500">
                          {b.ref} · SIZE {b.size}
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <div>{b.price.toLocaleString('id-ID')}</div>
                        <button
                          type="button"
                          onClick={() => setBag((p) => p.filter((_, idx) => idx !== i))}
                          className="text-[10px] underline text-neutral-500"
                        >
                          Void
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#111111]">
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>GROSS</span>
                    <span>IDR {gross.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>PRIVILEGE ({vip})</span>
                    <span>- IDR {disc.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-[#111111]">
                    <span>NET TOTAL</span>
                    <span>IDR {net.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-4 bg-[#111111] hover:bg-neutral-800 text-white font-mono text-xs tracking-[0.18em] font-bold transition"
                >
                  AUTHORIZE &amp; OPEN VIP BOOK →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: VIP CLIENT BOOK & MULTI-BOUTIQUE STOCK */}
        {page === 3 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 border border-[#111111] p-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[#111111] pb-2">
                  DIREKTORI PRIVATE CLIENT (VIP CRM)
                </div>
                {[
                  { name: 'Clarissa V.', tier: 'BLACK 15%', spend: 'IDR 64.200.000', size: '38 / EU 39', stylist: 'Nadia' },
                  { name: 'Rendra Kusuma', tier: 'BLACK 15%', spend: 'IDR 41.850.000', size: '42 / EU 42', stylist: 'Dion' },
                  { name: 'Aurelia Tan', tier: 'SILVER 5%', spend: 'IDR 18.400.000', size: '36 / OS', stylist: 'Nadia' },
                ].map((c) => (
                  <div key={c.name} className="p-4 border border-neutral-300 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-serif text-lg">{c.name}</div>
                      <div className="font-mono text-[11px] text-neutral-500">
                        Size Profile: {c.size} · Advisor: {c.stylist}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="px-2 py-0.5 bg-[#111111] text-white text-[10px] font-bold">{c.tier}</span>
                      <div className="font-bold mt-1">{c.spend}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-6 border border-[#111111] p-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-widest border-b border-[#111111] pb-2">
                  MATRIKS STOK LINTAS BUTIK FLAGSHIP
                </div>
                <table className="w-full text-xs font-mono text-left border-collapse">
                  <thead className="border-b border-[#111111]">
                    <tr>
                      <th className="py-2">ARTIKEL</th>
                      <th className="py-2 text-center">SENAYAN</th>
                      <th className="py-2 text-center">PLAZA ID</th>
                      <th className="py-2 text-center">BALI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {LOOKBOOK.map((item) => (
                      <tr key={item.ref}>
                        <td className="py-3 font-sans font-semibold">{item.name}</td>
                        <td className="py-3 text-center">{item.stockMatrix.senayan}</td>
                        <td className="py-3 text-center">{item.stockMatrix.plazaId}</td>
                        <td className="py-3 text-center">{item.stockMatrix.bali}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-[#111111] px-6 py-4 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-neutral-500">
        <span>ATELIER LUXE FLAGSHIP · SENAYAN CITY &amp; PLAZA INDONESIA JAKARTA</span>
        <div className="flex gap-4 text-[#111111] font-bold">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Lookbook</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Clienteling POS</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: VIP &amp; Cabang</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 5. PITSTOP PRO · 3-Page Sparepart Catalog, 4-Bay PKB POS & Vehicle Tracker
 * ========================================================================== */
const BAYS = [
  { id: 'BAY-01', plate: 'B 1942 KRN', exp: '11·28', model: 'Civic Turbo RS', tech: 'Dani S.', state: 'LIFT UP', step: 3 },
  { id: 'BAY-02', plate: 'B 8821 VRT', exp: '04·27', model: 'Fortuner VRZ', tech: 'Arif P.', state: 'FINAL QC', step: 4 },
  { id: 'BAY-03', plate: 'B 2104 ZXA', exp: '09·29', model: 'Ioniq 5 Signature', tech: 'Reza M.', state: 'SCANNER', step: 2 },
  { id: 'BAY-04', plate: 'D 404 RYZ', exp: '07·28', model: 'Innova Zenix Hybrid', tech: 'Budi H.', state: 'READY', step: 5 },
];

const WORKSHOP_CATALOG = [
  {
    id: 'L1',
    section: 'JASA' as const,
    code: 'SRV-TUNE-01',
    name: 'Paket Tune Up Carbon Clean & GDI Injector',
    meta: 'Estimasi 1.5 Jam',
    compat: 'Semua Mesin Bensin Direct Injection (Honda Turbo, Toyota, Mazda SkyActiv)',
    spec: 'Pembersihan ruang bakar dengan cairan decarbonizer, kalibrasi ulang bukaan throttle body, dan uji semprotan injektor.',
    price: 285000,
  },
  {
    id: 'L2',
    section: 'JASA' as const,
    code: 'SRV-ALGN-02',
    name: 'Spooring 3D Hawkeye + Balancing 4 Roda',
    meta: 'Estimasi 1.0 Jam',
    compat: 'Sedan, SUV, MPV Ring 15 s/d Ring 21',
    spec: 'Penyelarasan sudut Camber, Caster, dan Toe dengan sensor kamera 3D serta timah tempel presisi.',
    price: 220000,
  },
  {
    id: 'P1',
    section: 'PART' as const,
    code: 'OEM-0W20-4L',
    name: 'Oli Mesin Full Synthetic 0W-20 API SP (Galon 4L)',
    meta: 'OEM-0W20-4L',
    compat: 'Civic RS, CR-V Turbo, Raize, Innova Zenix, HR-V',
    spec: 'Pelumas ester-fortified viskositas rendah untuk perlindungan turbocharger dan efisiensi bahan bakar hingga 10.000 KM.',
    price: 480000,
  },
  {
    id: 'P2',
    section: 'PART' as const,
    code: 'OEM-BRK-F02',
    name: 'Kampas Rem Depan Low-Metallic Ceramic Set',
    meta: 'OEM-BRK-F02',
    compat: 'Fortuner VRZ, Pajero Sport, Kijang Innova',
    spec: 'Kompon keramik tahan suhu 650°C, bebas bunyi decit, dan minim residu debu hitam pada velg.',
    price: 390000,
  },
  {
    id: 'P3',
    section: 'PART' as const,
    code: 'OEM-FLT-091',
    name: 'Paket Filter Oli + Filter Udara Kabin HEPA Carbon',
    meta: 'OEM-FLT-091',
    compat: 'Universal Honda / Toyota / Hyundai',
    spec: 'Saringan oli berkatup anti-drainback ditambah filter kabin karbon aktif penyaring polusi PM2.5.',
    price: 165000,
  },
  {
    id: 'P4',
    section: 'PART' as const,
    code: 'OEM-SPK-IR4',
    name: 'Busi Laser Iridium Set (4 Pcs)',
    meta: 'OEM-SPK-IR4',
    compat: 'Mesin 4-Silinder DOHC Turbo & Naturally Aspirated',
    spec: 'Elektroda pusat iridium 0.6mm untuk pengapian stabil dan usia pakai hingga 80.000 KM.',
    price: 520000,
  },
];

export function PitStopBengkelPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [previewPart, setPreviewPart] = useState<(typeof WORKSHOP_CATALOG)[0] | null>(null);
  const [bay, setBay] = useState(BAYS[0]);
  const [odometer, setOdometer] = useState('42.580');
  const [workItems, setWorkItems] = useState<
    { id: string; section: 'JASA' | 'PART'; label: string; meta: string; price: number }[]
  >([
    { id: 'L1', section: 'JASA', label: 'Paket Tune Up Carbon Clean & GDI Injector', meta: 'Estimasi 1.5 Jam', price: 285000 },
    { id: 'P1', section: 'PART', label: 'Oli Mesin Full Synthetic 0W-20 API SP (Galon 4L)', meta: 'OEM-0W20-4L', price: 480000 },
  ]);

  const addLine = (item: (typeof WORKSHOP_CATALOG)[0], goPos = false) => {
    setWorkItems((p) => [
      ...p,
      { id: `${item.id}-${Date.now()}`, section: item.section, label: item.name, meta: item.meta, price: item.price },
    ]);
    if (goPos) {
      setPreviewPart(null);
      setPage(2);
    }
  };

  const total = workItems.reduce((s, w) => s + w.price, 0);

  return (
    <div className="min-h-[780px] bg-[#14181F] text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <div
          className="h-2 w-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #F59E0B 0 12px, #111827 12px 24px)',
          }}
        />
        <header className="px-5 py-3.5 bg-[#1B222C] border-b border-slate-700 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] font-bold text-[#F59E0B]">
              AUTO PERFORMANCE WORKSHOP &amp; OEM PARTS CENTER
            </span>
            <div className="font-bold text-xl tracking-tight text-white">
              PITSTOP PRO MOTORSPORT
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border transition ${
                page === 1
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                  : 'bg-[#14181F] text-slate-300 border-slate-700'
              }`}
            >
              01 · Katalog Part &amp; Paket Servis
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border transition ${
                page === 2
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                  : 'bg-[#14181F] text-slate-300 border-slate-700'
              }`}
            >
              02 · Kasir PKB &amp; 4-Bay Lift ({workItems.length})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border transition ${
                page === 3
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                  : 'bg-[#14181F] text-slate-300 border-slate-700'
              }`}
            >
              03 · Lacak Progres Mobil
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: KATALOG SUKU CADANG OEM & PAKET SERVIS */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-[#1B222C] border border-slate-700 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="font-mono text-xs font-bold text-[#F59E0B]">
                  [ HALAMAN 1 · ETALASE SUKU CADANG OEM &amp; PAKET SERVIS BERKALA ]
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Transparansi Kode Part OEM &amp; Estimasi Jam Kerja Mekanik.
                </h1>
                <p className="text-sm text-slate-300">
                  Klik setiap item untuk mengecek <strong>Kompatibilitas Tipe Mobil &amp; Spesifikasi Teknis</strong>, lalu tambahkan ke Perintah Kerja Bengkel (PKB) kendaraan aktif.
                </p>
              </div>
              <div className="lg:col-span-4 bg-[#14181F] border border-slate-700 p-4 space-y-2 font-mono text-xs">
                <div className="text-[#F59E0B] font-bold">UNIT AKTIF: {bay.plate} ({bay.model})</div>
                <div>Total Estimasi PKB: Rp {total.toLocaleString('id-ID')}</div>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="w-full py-2.5 bg-[#F59E0B] text-black font-bold"
                >
                  BUKA LEMBAR KERJA PKB (HAL 2) →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WORKSHOP_CATALOG.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1B222C] border border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-4 bg-[#0F1319] border-b border-slate-700 flex justify-between font-mono text-[11px]">
                      <span className={item.section === 'JASA' ? 'text-[#F59E0B] font-bold' : 'text-sky-400 font-bold'}>
                        {item.section === 'JASA' ? 'JASA MEKANIK' : 'SUKU CADANG OEM'}
                      </span>
                      <span className="text-slate-400">{item.code}</span>
                    </div>
                    <div className="p-5 space-y-2.5">
                      <h2 className="font-bold text-base text-white">{item.name}</h2>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.spec}</p>
                      <div className="font-mono text-[11px] text-slate-400 pt-1">
                        Cocok: {item.compat}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-700 flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-white">Rp {item.price.toLocaleString('id-ID')}</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewPart(item)}
                        className="px-3 py-1.5 border border-slate-600 hover:border-white text-slate-200"
                      >
                        Spesifikasi
                      </button>
                      <button
                        type="button"
                        onClick={() => addLine(item, false)}
                        className="px-3 py-1.5 bg-[#F59E0B] text-black font-bold"
                      >
                        + PKB
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewPart && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#1B222C] border-2 border-[#F59E0B] max-w-lg w-full p-6 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-700 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#F59E0B]">{previewPart.code}</span>
                      <h3 className="font-bold text-xl text-white mt-1">{previewPart.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewPart(null)}
                      className="font-mono text-xs border border-slate-600 px-2.5 py-1"
                    >
                      TUTUP ✕
                    </button>
                  </div>
                  <div className="space-y-3 text-xs">
                    <p className="text-slate-200 leading-relaxed">{previewPart.spec}</p>
                    <div className="p-3 bg-[#0F1319] border border-slate-700 font-mono space-y-1">
                      <div className="text-[#F59E0B] font-bold">KOMPATIBILITAS KENDARAAN:</div>
                      <div>{previewPart.compat}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-700 font-mono">
                    <span className="text-lg font-bold text-white">
                      Rp {previewPart.price.toLocaleString('id-ID')}
                    </span>
                    <button
                      type="button"
                      onClick={() => addLine(previewPart, true)}
                      className="px-4 py-2.5 bg-[#F59E0B] text-black text-xs font-bold"
                    >
                      MASUKKAN KE PKB {bay.plate} →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: KASIR PKB & 4-BAY LIFT */}
        {page === 2 && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-700 bg-[#0F1319]">
              {BAYS.map((b) => {
                const active = bay.id === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBay(b)}
                    className={`p-4 text-left border-b lg:border-b-0 border-r border-slate-700 last:border-r-0 transition ${
                      active ? 'bg-[#1F2733] ring-2 ring-inset ring-[#F59E0B]' : 'hover:bg-[#181E27]'
                    }`}
                  >
                    <div className="flex justify-between font-mono text-[10px] mb-2">
                      <span className="text-[#F59E0B] font-bold">{b.id}</span>
                      <span className="text-slate-400">{b.state}</span>
                    </div>
                    <div className="inline-block bg-black border-2 border-white px-3 py-1 rounded-sm font-mono text-white text-center">
                      <div className="text-sm font-bold tracking-widest leading-none">{b.plate}</div>
                      <div className="text-[9px] text-slate-300 mt-0.5 tracking-widest">{b.exp}</div>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 mt-2">{b.model}</div>
                    <div className="font-mono text-[10px] text-slate-400">Teknisi: {b.tech}</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 p-5 border-b lg:border-b-0 lg:border-r border-slate-700 space-y-4">
                <h2 className="font-mono text-xs font-bold text-[#F59E0B] uppercase">
                  Tambah Cepat Jasa &amp; Part ke PKB
                </h2>
                <div className="border border-slate-700 divide-y divide-slate-700 bg-[#1B222C]">
                  {WORKSHOP_CATALOG.map((item) => (
                    <div key={item.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-white">{item.name}</div>
                        <div className="font-mono text-[11px] text-slate-400">{item.code} · {item.meta}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => addLine(item, false)}
                        className={`px-3 py-1.5 font-mono font-bold text-[11px] text-black shrink-0 ${
                          item.section === 'JASA' ? 'bg-[#F59E0B]' : 'bg-sky-400'
                        }`}
                      >
                        + Rp {item.price.toLocaleString('id-ID')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 p-5 bg-[#0F1319] flex flex-col justify-between gap-4">
                <div className="bg-white text-slate-900 p-5 border-t-4 border-[#F59E0B] space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-300 pb-3">
                    <div>
                      <div className="font-mono text-[10px] font-bold text-slate-500">
                        FORMULIR PERINTAH KERJA BENGKEL (PKB)
                      </div>
                      <div className="font-bold text-lg">
                        {bay.plate} · {bay.model}
                      </div>
                    </div>
                    <div className="font-mono text-xs">
                      <span>KM: </span>
                      <input
                        type="text"
                        value={odometer}
                        onChange={(e) => setOdometer(e.target.value)}
                        className="w-20 border-b border-slate-400 font-bold text-right focus:outline-none"
                      />
                    </div>
                  </div>

                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-100 font-mono text-[10px] border-y border-slate-300">
                      <tr>
                        <th className="py-1.5 px-2">TIPE</th>
                        <th className="py-1.5 px-2">DESKRIPSI PEKERJAAN / PART</th>
                        <th className="py-1.5 px-2 text-right">BIAYA</th>
                        <th className="py-1.5 px-2" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {workItems.map((w) => (
                        <tr key={w.id}>
                          <td className="py-2 px-2 font-mono text-[10px] font-bold">{w.section}</td>
                          <td className="py-2 px-2">
                            <div className="font-semibold">{w.label}</div>
                            <div className="font-mono text-[10px] text-slate-500">{w.meta}</div>
                          </td>
                          <td className="py-2 px-2 font-mono text-right">
                            Rp {w.price.toLocaleString('id-ID')}
                          </td>
                          <td className="py-2 px-2 text-right">
                            <button
                              type="button"
                              onClick={() => setWorkItems((p) => p.filter((x) => x.id !== w.id))}
                              className="text-rose-600 underline font-mono text-[10px]"
                            >
                              X
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="border-t-2 border-slate-900 pt-3 flex justify-between items-baseline font-mono">
                    <span className="text-xs font-bold">TOTAL ESTIMASI PKB</span>
                    <span className="text-lg font-extrabold">Rp {total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-400 text-black font-mono text-xs font-bold tracking-wider"
                >
                  TERBITKAN PKB &amp; PANTAU PROGRES MOBIL (HAL 3) →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: LIVE VEHICLE SERVICE TRACKER */}
        {page === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#F59E0B]">
                [ HALAMAN 3 · PORTAL PELACAKAN PROGRES KENDARAAN PELANGGAN ]
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Status Pengerjaan Real-Time per Pelat Nomor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BAYS.map((b) => (
                <div key={b.id} className="bg-[#1B222C] border border-slate-700 p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="inline-block bg-black border border-white px-2.5 py-1 font-mono text-xs font-bold">
                        {b.plate}
                      </div>
                      <div className="font-bold text-lg text-white mt-2">{b.model}</div>
                      <div className="font-mono text-xs text-slate-400">
                        {b.id} · Mekanik: {b.tech}
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 font-mono text-xs font-bold">
                      {b.state}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1 font-mono text-[10px]">
                    {['Inspeksi', 'Bongkar', 'Part OEM', 'Final QC', 'Selesai'].map((st, idx) => (
                      <div
                        key={st}
                        className={`p-2 text-center border ${
                          idx + 1 <= b.step
                            ? 'bg-[#F59E0B] text-black border-[#F59E0B] font-bold'
                            : 'bg-[#0F1319] text-slate-500 border-slate-800'
                        }`}
                      >
                        {idx + 1}. {st}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-800 bg-[#0F1319] px-6 py-4 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-slate-400">
        <span>PITSTOP PRO WORKSHOP · GARANSI SERVIS 30 HARI / 1.000 KM</span>
        <div className="flex gap-4 text-[#F59E0B] font-bold">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Katalog Part</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Kasir PKB</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Lacak Mobil</button>
        </div>
      </footer>
    </div>
  );
}
