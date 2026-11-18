'use client';

import { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Clock,
  Sparkles,
  Flame,
  Eye,
  X,
  ArrowRight,
  Printer,
  ShieldCheck,
  Package,
  Wrench,
  Car,
  Coffee,
  UtensilsCrossed,
  Search,
  UserCheck,
  MapPin,
  CreditCard,
  QrCode,
  SlidersHorizontal,
} from 'lucide-react';

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
 * 1. KUROBENTO SHIBUYA · Izakaya Storefront, iPad Shokuken POS & Kitchen KDS
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
  image: string;
  badge?: string;
}

interface KuroTicketItem {
  code: string;
  name: string;
  jp: string;
  price: number;
  qty: number;
  spec: string;
  image: string;
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
    code: 'KB-01',
    cat: 'RAMEN',
    name: 'Kuro Garlic Tonkotsu Ramen',
    jp: '黒マー油豚骨ラーメン',
    price: 68000,
    kcal: '740 kcal',
    broth: 'Kaldu Tulang Ayam & Sapi 18 Jam + Minyak Bawang Hitam Panggang',
    toppings: ['Chashu Torch 2 Slice', 'Ajitsuke Tamago', 'Jamur Kikurage', 'Daun Bawang Kyoto', 'Nori Premium'],
    desc: 'Signature ramen dengan kaldu kolagen kental yang dimasak 18 jam tanpa henti, disiram minyak bawang putih bakar hitam khas Kumamoto.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    badge: 'Best Seller',
  },
  {
    code: 'KB-02',
    cat: 'RAMEN',
    name: 'Aka Karai Spicy Miso Tori',
    jp: '赤辛味噌鶏白湯',
    price: 64000,
    kcal: '690 kcal',
    broth: 'Tori Paitan Gurih + Pasta Cabai Fermentasi Shinshu Miso',
    toppings: ['Ayam Cincang Pedas', 'Ajitsuke Tamago', 'Jagung Manis Bakar', 'Chili Threads'],
    desc: 'Perpaduan miso merah fermentasi dari Nagano dengan minyak cabai rayu buatan sendiri dan topping ayam cincang berbumbu pedas.',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=600&q=80',
    badge: 'Spicy Lv.3',
  },
  {
    code: 'KB-03',
    cat: 'RAMEN',
    name: 'Truffle Shoyu Dry Mazemen',
    jp: '黒トリュフ醤油まぜそば',
    price: 74000,
    kcal: '620 kcal',
    broth: 'Dry Tare Shoyu Kedelai Hitam + Infusi Black Truffle Oil',
    toppings: ['Sous-Vide Beef Brisket', 'Onsen Tamago 63°C', 'Crispy Shallot', 'Truffle Paste'],
    desc: 'Ramen tanpa kuah (mazesoba) dengan mie gandum tebal yang dibalut saus shoyu kedelai hitam, kuning telur onsen, dan aroma truffle.',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80',
    badge: 'Chef Special',
  },
  {
    code: 'KB-04',
    cat: 'RAMEN',
    name: 'Yuzu Shio Clear Broth',
    jp: '柚子塩淡麗ラーメン',
    price: 62000,
    kcal: '510 kcal',
    broth: 'Kaldu Dashi Kombu & Katsuobushi + Kulit Jeruk Yuzu Kochi',
    toppings: ['Smoked Duck Breast', 'Menma Bambu Muda', 'Yuzu Zest', 'Ajitsuke Tamago'],
    desc: 'Kuah bening ringan nan menyegarkan dengan aroma jeruk yuzu asli Jepang, cocok bagi penikmat rasa umami bersih.',
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=600&q=80',
  },
  {
    code: 'KB-05',
    cat: 'YAKITORI',
    name: 'Negima Charcoal Skewer (3 Pcs)',
    jp: '炭火焼き鳥ねぎま',
    price: 38000,
    kcal: '320 kcal',
    broth: 'Panggang Arang Binchotan + Saus Tare Karamel 3 Tahun',
    toppings: ['Paha Ayam Juicy', 'Batang Daun Bawang Bakar', 'Bubuk Sansho Pepper'],
    desc: 'Sate paha ayam dan daun bawang Jepang yang dipanggang di atas bara arang putih binchotan dengan olesan saus tare manis gurih.',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80',
  },
  {
    code: 'KB-06',
    cat: 'YAKITORI',
    name: 'Tsukune Meatball + Raw Yolk',
    jp: '月見つくね串',
    price: 42000,
    kcal: '380 kcal',
    broth: 'Daging Ayam Cincang Tulang Muda + Saus Tare & Kuning Telur Omega',
    toppings: ['2 Skewer Tsukune', 'Kuning Telur Omega-3', 'Wijen Sangrai'],
    desc: 'Bakso ayam panggang bertekstur renyah tulang muda yang disajikan bersama celupan kuning telur omega segar.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
  },
  {
    code: 'KB-07',
    cat: 'IZAKAYA',
    name: 'Aburi Salmon Mentaiko Don',
    jp: '炙り明太サーモン丼',
    price: 78000,
    kcal: '590 kcal',
    broth: 'Nasi Koshihikari Hangat + Saus Cod Roe Mentaiko Torch',
    toppings: ['Norwegian Salmon Belly', 'Saus Mentaiko Bakar', 'Tobiko', 'Rumput Laut Kizami'],
    desc: 'Nasi Jepang pulen dengan irisan perut salmon segar yang di-torch bersama saus telur ikan mentaiko gurih.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
    badge: 'Favorite',
  },
  {
    code: 'KB-08',
    cat: 'DRINK',
    name: 'Cold Brew Hojicha Kyoto',
    jp: '水出し宇治ほうじ茶',
    price: 18000,
    kcal: '0 kcal',
    broth: 'Daun Teh Hijau Panggang Uji Kyoto · Cold Steep 12 Jam',
    toppings: ['Zero Sugar', 'Refillable Ocha'],
    desc: 'Teh hijau panggang dari perkebunan Uji Kyoto yang diseduh dingin selama 12 jam untuk menghasilkan aroma smoky lembut.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
  },
];

export function KuroBentoPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [catFilter, setCatFilter] = useState<'ALL' | KuroMenuItem['cat']>('ALL');
  const [previewItem, setPreviewItem] = useState<KuroMenuItem | null>(null);

  const [booth, setBooth] = useState('04');
  const [noodle, setNoodle] = useState<'KATAME' | 'FUTSU' | 'YAWARAKAME'>('KATAME');
  const [oil, setOil] = useState<'RICH' | 'NORMAL' | 'LIGHT'>('RICH');
  const [items, setItems] = useState<KuroTicketItem[]>([
    {
      code: 'KB-01',
      name: 'Kuro Garlic Tonkotsu Ramen',
      jp: '黒マー油豚骨ラーメン',
      price: 68000,
      qty: 2,
      spec: 'KATAME · RICH',
      image: KURO_CATALOG[0].image,
    },
    {
      code: 'KB-05',
      name: 'Negima Charcoal Skewer (3 Pcs)',
      jp: '炭火焼き鳥ねぎま',
      price: 38000,
      qty: 1,
      spec: 'YAKITORI',
      image: KURO_CATALOG[4].image,
    },
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
      return [
        ...prev,
        {
          code: menu.code,
          name: menu.name,
          jp: menu.jp,
          price: menu.price,
          qty: 1,
          spec,
          image: menu.image,
        },
      ];
    });
    if (goPos) {
      setPreviewItem(null);
      setPage(2);
    }
  };

  const adjustItemQty = (code: string, spec: string, delta: number) => {
    setStamped(false);
    setItems((prev) =>
      prev
        .map((item) =>
          item.code === code && item.spec === spec ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
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
    <div className="min-h-[820px] bg-[#0D0E11] text-zinc-100 font-sans flex flex-col justify-between">
      <div>
        {/* Brand Top Navigation */}
        <header className="border-b border-white/10 bg-[#121318]/95 backdrop-blur-md sticky top-0 z-30">
          <div className="px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-white flex items-center justify-center font-serif font-bold text-xl shadow-lg shadow-[#E11D48]/25">
                黒
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-bold text-base tracking-tight text-white">
                    KuroBento Shibuya
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Senopati Flagship
                  </span>
                </div>
                <p className="text-xs text-zinc-400">
                  Craft Tonkotsu Ramen &amp; Binchotan Charcoal Izakaya
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setPage(1)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition ${
                  page === 1
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                01 · Storefront &amp; Menu
              </button>
              <button
                type="button"
                onClick={() => setPage(2)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                  page === 2
                    ? 'bg-[#E11D48] text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>02 · Touch POS Register</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30 text-white font-mono">
                  {totalCartQty}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPage(3)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                  page === 3
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>03 · Kitchen KDS</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                  {kdsQueue.filter((k) => k.status !== 'SERVED').length}
                </span>
              </button>
            </nav>
          </div>
        </header>

        {/* HALAMAN 1: BRAND STOREFRONT & PRODUCT PREVIEW */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Editorial Storefront Hero */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#15171E] grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E11D48]/15 border border-[#E11D48]/30 text-[#FB7185] text-xs font-medium">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Kaldu Kolagen 18 Jam · Arang Putih Binchotan</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Semangkuk Presisi Kuliner Malam Shibuya di Jantung Jakarta.
                  </h1>
                  <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                    Pilih hidangan dari katalog visual di bawah untuk meninjau komposisi kaldu, daftar topping autentik, serta kustomisasi tekstur mie sebelum dikirim ke terminal kasir.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPage(2)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold transition shadow-lg shadow-[#E11D48]/25"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buka Terminal Kasir ({totalCartQty} Item · Rp {grandTotal.toLocaleString('id-ID')})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage(3)}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-200 text-xs font-medium transition"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-zinc-400" />
                    <span>Monitor Dapur KDS</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[260px]">
                <img
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80"
                  alt="Kuro Garlic Tonkotsu Ramen"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#15171E] lg:via-transparent lg:to-transparent" />
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 text-xs">
                  <div className="font-mono text-[10px] text-[#FB7185] font-semibold">SIGNATURE BOWL</div>
                  <div className="font-bold text-white mt-0.5">Kuro Garlic Tonkotsu</div>
                  <div className="font-mono text-zinc-300 mt-0.5">Rp 68.000 · 740 kcal</div>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'ALL', label: 'Semua Menu' },
                    { id: 'RAMEN', label: 'Craft Ramen' },
                    { id: 'YAKITORI', label: 'Binchotan Yakitori' },
                    { id: 'IZAKAYA', label: 'Donburi & Izakaya' },
                    { id: 'DRINK', label: 'Cold Brew Ocha' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCatFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                      catFilter === cat.id
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'bg-[#171921] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <span className="font-mono text-xs text-zinc-400">
                Menampilkan {filteredCatalog.length} hidangan autentik
              </span>
            </div>

            {/* Visual Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredCatalog.map((menu) => (
                <div
                  key={menu.code}
                  className="group rounded-2xl bg-[#15171E] border border-white/10 hover:border-white/25 overflow-hidden flex flex-col justify-between transition duration-200"
                >
                  <div>
                    <div
                      onClick={() => setPreviewItem(menu)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 cursor-pointer"
                    >
                      <img
                        src={menu.image}
                        alt={menu.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      {menu.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#E11D48] text-white shadow">
                          {menu.badge}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 backdrop-blur-sm text-zinc-200 border border-white/15">
                        {menu.kcal}
                      </span>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                        <span className="text-xs text-zinc-300 font-medium">{menu.jp}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-white/90 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15">
                          <Eye className="w-3 h-3" />
                          <span>Detail</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span>{menu.cat}</span>
                        <span>{menu.code}</span>
                      </div>
                      <h2 className="font-bold text-base text-white leading-snug">{menu.name}</h2>
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{menu.desc}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="font-mono text-sm font-bold text-white">
                      Rp {menu.price.toLocaleString('id-ID')}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPreviewItem(menu)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-200 text-xs font-medium transition"
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => addMenuToPos(menu, false)}
                        className="px-3 py-1.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold transition inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Preview Modal */}
            {previewItem && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#161821] border border-white/15 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/9] w-full bg-zinc-900">
                    <img
                      src={previewItem.image}
                      alt={previewItem.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161821] via-black/25 to-transparent" />
                    <button
                      type="button"
                      onClick={() => setPreviewItem(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/15 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-4 left-6 right-6">
                      <span className="font-mono text-xs text-[#FB7185] font-semibold">
                        {previewItem.code} · {previewItem.jp}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-0.5">{previewItem.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    <p className="text-sm text-zinc-300 leading-relaxed">{previewItem.desc}</p>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 text-xs">
                      <div className="text-zinc-400 font-mono uppercase text-[10px]">
                        Basis Kaldu &amp; Teknik Masak
                      </div>
                      <div className="text-white font-medium">{previewItem.broth}</div>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono uppercase text-zinc-400 mb-2">
                        Komposisi Topping Standar
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {previewItem.toppings.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-zinc-400 block">Harga Per Porsi</span>
                        <span className="font-mono text-xl font-bold text-white">
                          Rp {previewItem.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            addMenuToPos(previewItem, false);
                            setPreviewItem(null);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
                        >
                          + Tambah ke Keranjang
                        </button>
                        <button
                          type="button"
                          onClick={() => addMenuToPos(previewItem, true)}
                          className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold transition inline-flex items-center gap-1.5"
                        >
                          <span>Proses di Kasir POS</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: 3-ZONE TOUCH POS REGISTER (iPad POS Layout) */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* Zone 1: Left Category & Booth Rail */}
            <div className="lg:col-span-2 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#111319] p-4 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-2">
                    Kategori Menu
                  </span>
                  <div className="flex lg:flex-col gap-1.5 overflow-x-auto">
                    {(
                      [
                        { id: 'ALL', label: 'Semua Hidangan', count: KURO_CATALOG.length },
                        { id: 'RAMEN', label: 'Ramen Bar', count: 4 },
                        { id: 'YAKITORI', label: 'Yakitori Grill', count: 2 },
                        { id: 'IZAKAYA', label: 'Donburi Bowl', count: 1 },
                        { id: 'DRINK', label: 'Cold Ocha', count: 1 },
                      ] as const
                    ).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCatFilter(c.id)}
                        className={`px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition flex items-center justify-between gap-2 shrink-0 ${
                          catFilter === c.id
                            ? 'bg-[#E11D48] text-white shadow-sm'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] text-zinc-300'
                        }`}
                      >
                        <span>{c.label}</span>
                        <span className="font-mono text-[10px] opacity-80">{c.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-2">
                    Pilih Nomor Booth
                  </span>
                  <div className="grid grid-cols-4 lg:grid-cols-2 gap-1.5 font-mono text-xs">
                    {['01', '02', '04', '07', '09', '12'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBooth(b)}
                        className={`py-2 rounded-lg font-bold border transition ${
                          booth === b
                            ? 'bg-white text-zinc-950 border-white'
                            : 'bg-white/[0.03] text-zinc-400 border-white/10 hover:text-white'
                        }`}
                      >
                        B-{b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-zinc-400 space-y-1">
                <div className="text-white font-semibold">Terminal #01 · Kasir Utama</div>
                <div>Printer Thermal: Terhubung</div>
              </div>
            </div>

            {/* Zone 2: Center Visual Product Grid + Tactile Modifiers */}
            <div className="lg:col-span-6 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10 space-y-5">
              {/* Ramen Customization Bar */}
              <div className="p-4 rounded-2xl bg-[#161821] border border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FB7185] font-semibold block">
                    Preset Kustomisasi Ramen
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-zinc-400">Tekstur Mie:</span>
                    {(['KATAME', 'FUTSU', 'YAWARAKAME'] as const).map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNoodle(n)}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition ${
                          noodle === n
                            ? 'bg-white text-zinc-950'
                            : 'bg-black/40 text-zinc-400 hover:text-white border border-white/10'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Kaldu:</span>
                  {(['RICH', 'NORMAL', 'LIGHT'] as const).map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setOil(o)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition ${
                        oil === o
                          ? 'bg-[#E11D48] text-white'
                          : 'bg-black/40 text-zinc-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              {/* Touch Product Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredCatalog.map((menu) => (
                  <button
                    key={menu.code}
                    type="button"
                    onClick={() => addMenuToPos(menu, false)}
                    className="group text-left p-3 rounded-2xl bg-[#15171E] hover:bg-[#1B1E28] border border-white/10 hover:border-[#E11D48]/50 transition flex items-center gap-3.5 active:scale-[0.99]"
                  >
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 bg-zinc-900"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 font-mono text-[10px] text-zinc-400">
                        <span>{menu.code}</span>
                        <span className="text-[#FB7185]">{menu.cat}</span>
                      </div>
                      <div className="font-bold text-sm text-white truncate mt-0.5">{menu.name}</div>
                      <div className="text-[11px] text-zinc-400 truncate">{menu.jp}</div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white">
                          Rp {menu.price.toLocaleString('id-ID')}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#E11D48]/20 text-[#FB7185] font-mono text-[10px] font-semibold group-hover:bg-[#E11D48] group-hover:text-white transition">
                          + Tap
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone 3: Right Floating Order Cart */}
            <div className="lg:col-span-4 bg-[#12141B] p-5 sm:p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block">
                      Active Order Ticket
                    </span>
                    <h2 className="text-lg font-bold text-white">Booth #{booth} · Dine-In</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 font-mono text-xs font-bold text-white">
                    {totalCartQty} Item
                  </span>
                </div>

                {/* Cart Items with - 1 + Stepper */}
                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {items.length === 0 ? (
                    <div className="py-12 text-center text-xs text-zinc-500">
                      Belum ada menu dipilih. Ketuk kartu menu di tengah untuk menambahkan.
                    </div>
                  ) : (
                    items.map((item) => (
                      <div
                        key={`${item.code}-${item.spec}`}
                        className="p-3 rounded-xl bg-[#181B24] border border-white/10 flex items-center justify-between gap-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs text-white truncate">{item.name}</div>
                          <div className="font-mono text-[10px] text-[#FB7185] mt-0.5">{item.spec}</div>
                          <div className="font-mono text-xs text-zinc-300 mt-1">
                            Rp {(item.price * item.qty).toLocaleString('id-ID')}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10">
                          <button
                            type="button"
                            onClick={() => adjustItemQty(item.code, item.spec, -1)}
                            className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs font-bold w-5 text-center text-white">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => adjustItemQty(item.code, item.spec, 1)}
                            className="w-6 h-6 rounded-md bg-white/5 hover:bg-white/15 flex items-center justify-center text-zinc-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Totals & Charge Button */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal Hidangan</span>
                    <span className="font-mono">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Service &amp; PB1 (15%)</span>
                    <span className="font-mono">Rp {serviceTax.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Tagihan</span>
                    <span className="font-mono text-lg text-[#FB7185]">
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {stamped && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between gap-2">
                    <span>Tiket Booth #{booth} terkirim ke KDS Dapur!</span>
                    <button
                      type="button"
                      onClick={() => setPage(3)}
                      className="font-semibold underline text-white shrink-0"
                    >
                      Lihat KDS →
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={fireToKitchen}
                    className="py-3.5 px-4 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold text-xs transition shadow-lg shadow-[#E11D48]/25 flex items-center justify-center gap-1.5"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Charge &amp; Kirim KDS</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      fireToKitchen();
                      setPage(3);
                    }}
                    className="py-3.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <span>Layar KDS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: LIVE KITCHEN KDS & STOCK TELEMETRY */}
        {page === 3 && (
          <div className="p-6 sm:p-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-[#FB7185] font-semibold uppercase tracking-wider">
                  Kitchen Display System · Real-Time Queue
                </span>
                <h2 className="text-2xl font-bold text-white mt-0.5">
                  Monitor Antrean Masak Ramen &amp; Binchotan Grill
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition"
              >
                ← Kembali ke Kasir POS
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {kdsQueue.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-2xl bg-[#15171E] border border-white/10 p-5 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="font-mono text-xs text-zinc-400">{ticket.id}</span>
                        <div className="text-lg font-bold text-white">Booth #{ticket.booth}</div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                            ticket.status === 'COOKING'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : ticket.status === 'PLATING'
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {ticket.status}
                        </span>
                        <div className="font-mono text-[11px] text-zinc-400 mt-1">{ticket.time}</div>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {ticket.items.map((it, idx) => (
                        <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                          <div>
                            <span className="font-bold text-white">
                              {it.qty}x {it.name}
                            </span>
                            <div className="font-mono text-[10px] text-zinc-400">{it.spec}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {ticket.status !== 'SERVED' ? (
                    <button
                      type="button"
                      onClick={() => advanceKds(ticket.id)}
                      className="w-full py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold transition"
                    >
                      {ticket.status === 'COOKING' ? 'Lanjut ke Plating →' : 'Tandai Selesai Saji ✓'}
                    </button>
                  ) : (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-500/10 text-emerald-300 text-center text-xs font-mono font-semibold">
                      Hidangan Telah Disajikan
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Kitchen Stock Gauge */}
            <div className="rounded-2xl border border-white/10 bg-[#15171E] p-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Stok Bahan Baku Dapur Shift Malam
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Kaldu Tonkotsu 18-Jam', val: '42 Liter', pct: 78, status: 'Optimal' },
                  { label: 'Mie Gandum Hakata Fresh', val: '115 Porsi', pct: 64, status: 'Optimal' },
                  { label: 'Chashu Belly Roll', val: '19 Slice', pct: 24, status: 'Re-Prep' },
                  { label: 'Ajitsuke Tamago 63°C', val: '54 Butir', pct: 82, status: 'Optimal' },
                ].map((st) => (
                  <div key={st.label} className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">{st.label}</span>
                      <span
                        className={
                          st.status === 'Re-Prep'
                            ? 'text-[#FB7185] font-semibold'
                            : 'text-emerald-400 font-medium'
                        }
                      >
                        {st.status}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white font-mono">{st.val}</div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          st.status === 'Re-Prep' ? 'bg-[#E11D48]' : 'bg-emerald-500'
                        }`}
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

      <footer className="border-t border-white/10 bg-[#090A0D] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
        <div>KuroBento Shibuya Indonesia · Jl. Senopati No. 48 Jakarta Selatan</div>
        <div className="flex items-center gap-4 text-zinc-400">
          <button type="button" onClick={() => setPage(1)} className="hover:text-white">
            01 Storefront
          </button>
          <button type="button" onClick={() => setPage(2)} className="hover:text-white">
            02 Touch POS
          </button>
          <button type="button" onClick={() => setPage(3)} className="hover:text-white">
            03 Kitchen KDS
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 2. BREWLAB ROASTERY · Coffee Storefront, iPad Barista POS & Pickup Board
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
  image: string;
}

const BREW_CATALOG: BrewCatalogItem[] = [
  {
    id: 'br1',
    cat: 'ESPRESSO BAR',
    origin: 'Ciwidey · Washed Process',
    name: 'Oat Spanish Cortado Latte',
    price: 38000,
    pastry: false,
    notes: ['Caramel', 'Roasted Hazelnut', 'Creamy Oat'],
    roast: 'Medium-Dark Espresso Omni',
    recipe: 'Dose 18.5g · Yield 36g · 93°C · 27 dtk + 140ml Minor Figures Oat',
    desc: 'Double ristretto dari biji kopi Ciwidey Jawa Barat yang dipadukan susu gandum barista grade dan sentuhan susu kental manis organik.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'br2',
    cat: 'MANUAL BREW',
    origin: 'Ethiopia Guji · Natural',
    name: 'Pour Over V60 Seasonal Filter',
    price: 42000,
    pastry: false,
    notes: ['White Peach', 'Jasmine Tea', 'Bergamot'],
    roast: 'Light Nordic Filter',
    recipe: 'Dose 15g · Air 240ml (91°C) · 3x Pouring · Total 02:25',
    desc: 'Seduhan manual V60 dengan profil floral dan buah persik segar dari dataran tinggi Guji, Ethiopia (2.100 mdpl).',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'br3',
    cat: 'ESPRESSO BAR',
    origin: 'Uji Kyoto · Ceremonial',
    name: 'Dirty Matcha Espresso Fusion',
    price: 44000,
    pastry: false,
    notes: ['Umami Matcha', 'Dark Chocolate', 'Velvety'],
    roast: 'Ceremonial First-Harvest + House Blend',
    recipe: '3g Uji Matcha Whisked + Cold Milk + 1 Shot Hot Espresso Float',
    desc: 'Lapisan matcha seremonial Jepang kental di dasar gelas, susu dingin segar, dan tuangan shot espresso panas di bagian atas.',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'br4',
    cat: 'ESPRESSO BAR',
    origin: 'Aceh Gayo · Pantan Musara',
    name: 'Iced Sparkling Yuzu Americano',
    price: 36000,
    pastry: false,
    notes: ['Citrus Yuzu', 'Crisp Apple', 'Clean Finish'],
    roast: 'Medium Roast',
    recipe: 'Double Espresso Aceh Gayo + Yuzu Puree 20ml + Soda Water',
    desc: 'Kombinasi menyegarkan antara double shot espresso Aceh Gayo dengan bulir jeruk yuzu asli dan air soda dingin.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'br5',
    cat: 'PASTRY',
    origin: 'French Elle & Vire Butter',
    name: 'Artisan Pain au Chocolat',
    price: 31000,
    pastry: true,
    notes: ['70% Valrhona Dark', 'Flaky 27 Layers', 'Warm Butter'],
    roast: 'Baked Fresh 06:30 WIB',
    recipe: 'Laminasi 72 Jam · Panggang Konveksi 195°C selama 16 Menit',
    desc: 'Pastry berlapis renyah dengan mentega Prancis dan dua batang cokelat hitam Valrhona 70% yang meleleh saat disajikan hangat.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'br6',
    cat: 'ROASTERY BEANS',
    origin: 'Flores Bajawa · Honey 250g',
    name: 'Kemasan Biji Kopi Flores 250g',
    price: 115000,
    pastry: true,
    notes: ['Brown Spice', 'Sweet Molasses', 'Milk Chocolate'],
    roast: 'Whole Bean / Grind on Request',
    recipe: 'Kemasan Valve One-Way 250g · Tanggal Sangrai Pekan Ini',
    desc: 'Biji kopi arabika Flores Bajawa olahan madu (honey process) dalam kemasan 250 gram untuk seduhan rumahan.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
  },
];

export function BrewLabPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [catFilter, setCatFilter] = useState<'ALL' | BrewCatalogItem['cat']>('ALL');
  const [previewBean, setPreviewBean] = useState<BrewCatalogItem | null>(null);

  const [milk, setMilk] = useState<'Dairy' | 'Oat' | 'Soy'>('Oat');
  const [sweet, setSweet] = useState<'0%' | '50%' | '100%'>('50%');
  const [shot, setShot] = useState<'Single' | 'Double'>('Single');
  const [cupName, setCupName] = useState('BIRU');
  const [paidMethod, setPaidMethod] = useState<string | null>(null);
  const [orders, setOrders] = useState<
    { id: string; name: string; meta: string; price: number; qty: number; image: string }[]
  >([
    {
      id: 'br1-Oat-50%-Single',
      name: 'Oat Spanish Cortado Latte',
      meta: 'Oat · 50% · Single',
      price: 44000,
      qty: 1,
      image: BREW_CATALOG[0].image,
    },
  ]);

  const [pickupBoard, setPickupBoard] = useState([
    { code: 'CUP-041', guest: 'NADILA', drink: 'Pour Over V60 Seasonal Filter', state: 'READY' as const },
    { code: 'CUP-042', guest: 'RAKA', drink: 'Dirty Matcha Espresso Fusion (Oat)', state: 'BREWING' as const },
  ]);

  const commitDrink = (item: BrewCatalogItem, goPos = false) => {
    setPaidMethod(null);
    const extra = item.pastry
      ? 0
      : (milk === 'Oat' ? 6000 : milk === 'Soy' ? 4000 : 0) + (shot === 'Double' ? 5000 : 0);
    const meta = item.pastry ? 'Fresh Serve' : `${milk} · ${sweet} · ${shot}`;
    const key = `${item.id}-${meta}`;
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === key);
      if (idx >= 0) {
        const c = [...prev];
        c[idx] = { ...c[idx], qty: c[idx].qty + 1 };
        return c;
      }
      return [...prev, { id: key, name: item.name, meta, price: item.price + extra, qty: 1, image: item.image }];
    });
    if (goPos) {
      setPreviewBean(null);
      setPage(2);
    }
  };

  const adjustOrderQty = (id: string, delta: number) => {
    setPaidMethod(null);
    setOrders((prev) =>
      prev
        .map((o) => (o.id === id ? { ...o, qty: o.qty + delta } : o))
        .filter((o) => o.qty > 0)
    );
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
  const totalCups = orders.reduce((s, o) => s + o.qty, 0);
  const filtered = catFilter === 'ALL' ? BREW_CATALOG : BREW_CATALOG.filter((i) => i.cat === catFilter);

  return (
    <div className="min-h-[820px] bg-[#FBF9F5] text-[#1C1917] flex flex-col justify-between">
      <div>
        {/* Clean Blue Bottle / Nordic Roastery Header */}
        <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#C85A32] text-white flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#C85A32] font-semibold block">
                Small-Batch Roastery &amp; Espresso Bar
              </span>
              <div className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                BrewLab Roastery · Bandung
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 1 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              01 · Storefront &amp; Beans
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
                page === 2 ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>02 · Barista iPad POS</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/15 font-mono">
                {totalCups}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 3 ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              03 · Pickup &amp; Telemetry
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: STOREFRONT & ROASTERY CATALOG */}
        {page === 1 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="rounded-3xl border border-stone-200 bg-[#F3EFE6] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#C85A32] text-xs font-semibold border border-stone-200">
                  Sangrai Segar Tiap Pekan · La Marzocco KB90
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                  Ekstraksi Presisi dari Petani Hulu ke Cangkir Pagi Anda.
                </h1>
                <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
                  Telusuri kurasi espresso single-origin, manual brew V60, viennoiserie Prancis, hingga biji kopi sangrai 250g. Ketuk kartu untuk membaca profil sangrai dan resep seduh barista.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setPage(2)}
                    className="px-5 py-3 rounded-xl bg-stone-900 hover:bg-[#C85A32] text-white text-xs font-semibold transition inline-flex items-center gap-2"
                  >
                    <span>Buka Barista Register ({totalCups} Cup · Rp {total.toLocaleString('id-ID')})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 h-full min-h-[250px] relative">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
                  alt="Specialty Pour Over Coffee"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['ALL', 'ESPRESSO BAR', 'MANUAL BREW', 'ROASTERY BEANS', 'PASTRY'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCatFilter(c)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                    catFilter === c
                      ? 'bg-stone-900 text-white'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
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
                  className="group rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setPreviewBean(item)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/90 backdrop-blur-sm text-stone-900">
                        {item.cat}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="font-mono text-[11px] text-[#C85A32] font-semibold">
                        {item.origin}
                      </div>
                      <h2 className="font-serif text-xl font-bold text-stone-900">{item.name}</h2>
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.notes.map((n) => (
                          <span
                            key={n}
                            className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F3EFE6] text-stone-700 font-medium"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-stone-900">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewBean(item)}
                        className="px-3 py-1.5 rounded-lg border border-stone-200 hover:border-stone-900 text-xs font-medium transition"
                      >
                        Resep
                      </button>
                      <button
                        type="button"
                        onClick={() => commitDrink(item, false)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#C85A32] hover:bg-[#b04b25] text-white text-xs font-semibold transition"
                      >
                        + Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewBean && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
                  <div className="relative aspect-[16/9] bg-stone-100">
                    <img
                      src={previewBean.image}
                      alt={previewBean.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewBean(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#C85A32]">
                        {previewBean.origin}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-stone-900 mt-0.5">
                        {previewBean.name}
                      </h3>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">{previewBean.desc}</p>
                    <div className="p-4 rounded-2xl bg-[#F3EFE6] space-y-1.5 text-xs">
                      <div>
                        <span className="font-semibold text-stone-900">Profil Sangrai:</span>{' '}
                        <span className="text-stone-700">{previewBean.roast}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Resep Ekstraksi:</span>{' '}
                        <span className="text-stone-700">{previewBean.recipe}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-stone-900">Tasting Notes:</span>{' '}
                        <span className="text-stone-700">{previewBean.notes.join(' · ')}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-mono text-xl font-bold text-stone-900">
                        Rp {previewBean.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => commitDrink(previewBean, true)}
                        className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-[#C85A32] text-white text-xs font-semibold transition"
                      >
                        Masukkan ke Register Barista →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: 3-ZONE TOUCH BARISTA POS */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* Zone 1: Left Category & Modifier Rail */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-stone-200 bg-[#F3EFE6]/70 p-5 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 font-semibold block mb-2.5">
                  Stasiun Bar
                </span>
                <div className="space-y-1.5">
                  {(['ALL', 'ESPRESSO BAR', 'MANUAL BREW', 'ROASTERY BEANS', 'PASTRY'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCatFilter(c)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition flex items-center justify-between ${
                        catFilter === c
                          ? 'bg-stone-900 text-white shadow-sm'
                          : 'bg-white/80 hover:bg-white text-stone-700 border border-stone-200/70'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="font-mono text-[10px] opacity-75">→</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tactile Cup Modifiers */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-4">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Modifier Minuman Aktif</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-stone-500 block">Pilihan Susu</span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {(['Dairy', 'Oat', 'Soy'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMilk(m)}
                        className={`py-1.5 rounded-lg font-medium border transition ${
                          milk === m
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-stone-500 block">Tingkat Manis</span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {(['0%', '50%', '100%'] as const).map((sw) => (
                      <button
                        key={sw}
                        type="button"
                        onClick={() => setSweet(sw)}
                        className={`py-1.5 rounded-lg font-medium border transition ${
                          sweet === sw
                            ? 'bg-[#C85A32] text-white border-[#C85A32]'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {sw}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] text-stone-500 block">Espresso Shot</span>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {(['Single', 'Double'] as const).map((sh) => (
                      <button
                        key={sh}
                        type="button"
                        onClick={() => setShot(sh)}
                        className={`py-1.5 rounded-lg font-medium border transition ${
                          shot === sh
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {sh}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Zone 2: Center Visual Product Grid */}
            <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => commitDrink(item, false)}
                    className="group text-left rounded-2xl bg-white border border-stone-200 hover:border-[#C85A32] overflow-hidden shadow-sm transition active:scale-[0.99]"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="font-mono text-[10px] text-[#C85A32] font-semibold truncate">
                        {item.origin}
                      </div>
                      <div className="font-serif font-bold text-sm text-stone-900 truncate">
                        {item.name}
                      </div>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-stone-900">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[11px] font-semibold text-[#C85A32]">+ Tambah</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone 3: Right Floating Order Cart */}
            <div className="lg:col-span-4 bg-white p-5 sm:p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <label htmlFor="brew-cup-call" className="font-mono text-[10px] uppercase text-stone-500 block">
                      Nama Panggilan Cup
                    </label>
                    <input
                      id="brew-cup-call"
                      type="text"
                      value={cupName}
                      onChange={(e) => setCupName(e.target.value.toUpperCase())}
                      className="font-serif font-bold text-lg text-stone-900 bg-transparent border-b border-stone-300 focus:border-[#C85A32] focus:outline-none w-40"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#F3EFE6] font-mono text-xs font-bold text-stone-800">
                    {totalCups} Cup
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="p-3 rounded-xl bg-[#FBF9F5] border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <img
                        src={o.image}
                        alt={o.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-serif font-bold text-xs text-stone-900 truncate">
                          {o.name}
                        </div>
                        <div className="font-mono text-[10px] text-stone-500">{o.meta}</div>
                        <div className="font-mono text-xs font-bold text-stone-900 mt-0.5">
                          Rp {(o.price * o.qty).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200">
                        <button
                          type="button"
                          onClick={() => adjustOrderQty(o.id, -1)}
                          className="w-6 h-6 rounded hover:bg-stone-100 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center">{o.qty}</span>
                        <button
                          type="button"
                          onClick={() => adjustOrderQty(o.id, 1)}
                          className="w-6 h-6 rounded hover:bg-stone-100 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-stone-500 font-medium">Total Pembayaran</span>
                  <span className="font-serif text-2xl font-bold text-stone-900">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>

                {paidMethod && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <span>Dibayar via {paidMethod} · Masuk antrean bar!</span>
                    <button
                      type="button"
                      onClick={() => setPage(3)}
                      className="font-bold underline"
                    >
                      Layar Pickup →
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => settleOrder('Tunai Pas')}
                    className="py-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-900 transition"
                  >
                    Tunai Pas
                  </button>
                  <button
                    type="button"
                    onClick={() => settleOrder('QRIS Tap')}
                    className="py-3 rounded-xl bg-[#C85A32] hover:bg-[#b04b25] text-white transition"
                  >
                    Charge QRIS Tap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: PICKUP BOARD & ROASTERY TELEMETRY */}
        {page === 3 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C85A32] font-semibold">
                      Live Espresso Bar Display
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-stone-900">
                      Status Panggilan Cup Pelanggan
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-semibold">
                    Real-Time
                  </span>
                </div>

                <div className="space-y-3">
                  {pickupBoard.map((c) => (
                    <div
                      key={c.code}
                      className="p-4 rounded-xl border border-stone-200 bg-[#FBF9F5] flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="font-mono text-xs text-stone-500">{c.code}</div>
                        <div className="font-serif text-xl font-bold text-stone-900">{c.guest}</div>
                        <div className="text-xs text-stone-600">{c.drink}</div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            c.state === 'READY'
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#C85A32] text-white'
                          }`}
                        >
                          {c.state === 'READY' ? 'Siap Diambil di Bar' : 'Sedang Diseduh'}
                        </span>
                        {c.state === 'BREWING' && (
                          <button
                            type="button"
                            onClick={() =>
                              setPickupBoard((prev) =>
                                prev.map((x) => (x.code === c.code ? { ...x, state: 'READY' } : x))
                              )
                            }
                            className="block text-xs text-stone-600 hover:text-stone-900 underline mt-1.5 ml-auto"
                          >
                            Tandai Selesai Seduh →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-[#F3EFE6] p-6 space-y-4">
                <div className="border-b border-stone-300 pb-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#C85A32] font-semibold">
                    Roastery Telemetry
                  </div>
                  <div className="font-serif text-xl font-bold text-stone-900">
                    Gramasi Hopper &amp; Rekap Shift
                  </div>
                </div>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                    <span className="text-stone-600">Hopper 1 (Ciwidey Espresso)</span>
                    <span className="font-mono font-bold text-stone-900">1.840 g tersisa</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                    <span className="text-stone-600">Hopper 2 (Ethiopia Guji Filter)</span>
                    <span className="font-mono font-bold text-stone-900">620 g tersisa</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex justify-between">
                    <span className="text-stone-600">Stok Susu Oat Barista</span>
                    <span className="font-mono font-bold text-stone-900">18 Karton</span>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-900 text-white flex justify-between items-center">
                    <span>Total Penjualan Shift Pagi</span>
                    <span className="font-mono font-bold text-sm">84 Cups · Rp 3.420.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-stone-200 bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
        <span>BrewLab Roastery · Jl. Progo No. 19 Bandung · 07:00 s/d 22:00 WIB</span>
        <div className="flex gap-4 font-semibold text-stone-800">
          <button type="button" onClick={() => setPage(1)}>01 Storefront</button>
          <button type="button" onClick={() => setPage(2)}>02 Barista POS</button>
          <button type="button" onClick={() => setPage(3)}>03 Pickup Board</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 3. APOTEK MEDIKA · Clinical Pharmacy Storefront, FEFO POS & Batch Warehouse
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
    indikasi: 'Meredakan demam serta nyeri ringan hingga sedang seperti sakit kepala dan nyeri otot.',
    dosis: 'Dewasa: 1 sampai 2 kaplet, 3 sampai 4 kali sehari sesudah makan.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
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
    indikasi: 'Terapi infeksi saluran pernapasan, saluran kemih, dan jaringan lunak dengan resep dokter.',
    dosis: 'Dewasa: 500 mg tiap 8 jam, wajib dihabiskan seluruh strip.',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
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
    indikasi: 'Meredakan rinitis alergi musiman, bersin, serta urtikaria dan gatal alergi kulit.',
    dosis: 'Dewasa: 1 tablet sekali sehari pada malam hari.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
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
    indikasi: 'Penanganan refluks gastroesofageal (GERD), tukak lambung, dan hipersekresi asam lambung.',
    dosis: '1 kapsul sekali sehari 30 menit sebelum makan pagi.',
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80',
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
    indikasi: 'Memenuhi kebutuhan Vitamin D harian untuk menjaga daya tahan tubuh dan penyerapan kalsium tulang.',
    dosis: '1 kapsul lunak sehari sesudah makan.',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=600&q=80',
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
    indikasi: 'Pemantauan tekanan darah sistolik, diastolik, dan indikator detak jantung mandiri di rumah.',
    dosis: 'Gunakan dalam posisi duduk tenang selama 5 menit.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80',
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
    {
      code: 'OBT-001',
      name: 'Paracetamol 500mg Strip 10 Kaplet',
      batch: 'PCM-26A',
      qty: 1,
      price: 12000,
      image: SIMRS_DRUGS[0].image,
    },
  ]);

  const addRow = (d: (typeof SIMRS_DRUGS)[0], goPos = false) => {
    setDispensed((prev) => {
      const idx = prev.findIndex((p) => p.code === d.code);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { code: d.code, name: d.name, batch: d.batch, qty: 1, price: d.price, image: d.image }];
    });
    if (goPos) {
      setPreviewDrug(null);
      setPage(2);
    }
  };

  const adjustDrugQty = (code: string, delta: number) => {
    setDispensed((prev) =>
      prev
        .map((item) => (item.code === code ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
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
    <div className="min-h-[820px] bg-[#F6F8F7] text-slate-900 flex flex-col justify-between">
      <div>
        <header className="bg-[#064E3B] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-emerald-300 font-semibold uppercase tracking-wider">
                SIMRS &amp; Telefarmasi Terpadu · SIPA 1998/2026
              </div>
              <div className="font-bold text-xl tracking-tight">Apotek Medika Farma</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-[#04392B] p-1.5 rounded-xl border border-emerald-700/60 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 1 ? 'bg-white text-[#064E3B]' : 'text-emerald-100 hover:text-white'
              }`}
            >
              01 · Katalog Obat &amp; Alkes
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 2 ? 'bg-emerald-400 text-[#04392B] font-bold' : 'text-emerald-100 hover:text-white'
              }`}
            >
              02 · Kasir FEFO &amp; Etiket ({dispensed.reduce((s, i) => s + i.qty, 0)})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 3 ? 'bg-white text-[#064E3B]' : 'text-emerald-100 hover:text-white'
              }`}
            >
              03 · Gudang Batch &amp; Defekta
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: CLINICAL STOREFRONT & PRODUCT PREVIEW */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-sm">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#065F46] text-xs font-semibold border border-emerald-200">
                  Terverifikasi BPOM RI · Sistem Batch FEFO Otomatis
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  Transparansi Zat Aktif, Nomor Izin Edar, dan Ketersediaan Batch Real-Time.
                </h1>
                <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Setiap sediaan farmasi dan alat kesehatan menampilkan foto kemasan, komposisi zat aktif, nomor registrasi BPOM, serta tanggal kadaluarsa terdekat untuk menjamin keselamatan pasien.
                </p>
              </div>
              <div className="lg:col-span-4 bg-[#F0FDF4] rounded-2xl border border-emerald-200 p-5 space-y-3 text-xs">
                <div className="font-mono text-[11px] text-emerald-800 font-semibold">
                  RESEP PASIEN AKTIF
                </div>
                <div className="font-bold text-base text-slate-900">{patient}</div>
                <div className="text-slate-600">
                  {dispensed.length} jenis sediaan · Total Rp {subtotal.toLocaleString('id-ID')}
                </div>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="w-full py-2.5 rounded-xl bg-[#065F46] hover:bg-[#047857] text-white font-semibold transition"
                >
                  Proses Penebusan &amp; Cetak Etiket →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SIMRS_DRUGS.map((d) => (
                <div
                  key={d.code}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div
                      onClick={() => setPreviewDrug(d)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
                    >
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                          d.rx
                            ? 'bg-rose-600 text-white'
                            : 'bg-emerald-700 text-white'
                        }`}
                      >
                        {d.cat}
                      </span>
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm font-mono text-[10px] font-semibold text-slate-800">
                        Exp {d.exp}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex justify-between font-mono text-[11px] text-slate-500">
                        <span>{d.code} · Batch {d.batch}</span>
                        <span>Stok {d.stock}</span>
                      </div>
                      <h2 className="font-bold text-base text-slate-900">{d.name}</h2>
                      <div className="text-xs font-medium text-[#065F46]">{d.zat}</div>
                      <p className="text-xs text-slate-600 line-clamp-2">{d.indikasi}</p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-slate-900">
                      Rp {d.price.toLocaleString('id-ID')}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewDrug(d)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-800 text-xs font-medium transition"
                      >
                        Monografi
                      </button>
                      <button
                        type="button"
                        onClick={() => addRow(d, false)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#065F46] hover:bg-[#047857] text-white text-xs font-semibold transition"
                      >
                        + Tebus
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewDrug && (
              <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
                  <div className="relative aspect-[16/9] bg-slate-100">
                    <img
                      src={previewDrug.image}
                      alt={previewDrug.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewDrug(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#065F46]">
                        {previewDrug.code} · {previewDrug.bpom}
                      </span>
                      <h3 className="font-bold text-xl text-slate-900 mt-0.5">{previewDrug.name}</h3>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                        <div className="font-mono text-[10px] uppercase text-emerald-800 font-semibold">
                          Komposisi Zat Aktif
                        </div>
                        <div className="font-semibold text-sm text-slate-900 mt-0.5">
                          {previewDrug.zat}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Indikasi Klinis</div>
                        <p className="text-slate-600 mt-0.5">{previewDrug.indikasi}</p>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Aturan Pakai Standar</div>
                        <p className="text-slate-600 mt-0.5">{previewDrug.dosis}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className="font-mono text-lg font-bold text-slate-900">
                        HET Rp {previewDrug.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => addRow(previewDrug, true)}
                        className="px-5 py-2.5 rounded-xl bg-[#065F46] text-white text-xs font-semibold"
                      >
                        Masukkan ke Kasir &amp; Etiket →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: 3-ZONE TOUCH PHARMACY POS & E-ETIKET */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* Zone 1: Left Filter & E-Etiket Configurator */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white p-5 space-y-5">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold block">
                  Cari Sediaan / Batch FEFO
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Nama obat atau batch..."
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:border-[#065F46]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setOnlyRx((v) => !v)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold border transition ${
                    onlyRx
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {onlyRx ? 'Menampilkan: Wajib Resep (K)' : 'Semua Golongan Obat'}
                </button>
              </div>

              {/* Live Etiket Preview Card */}
              <div className="rounded-2xl border-2 border-[#1E40AF] bg-white overflow-hidden shadow-sm">
                <div className="bg-[#1E40AF] text-white px-3.5 py-2 text-center">
                  <div className="font-bold text-xs">ETIKET OBAT DALAM</div>
                  <div className="text-[10px] text-blue-200">Apotek Medika Farma · SIPA 1998/2026</div>
                </div>
                <div className="p-3.5 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Nama Pasien</span>
                    <input
                      type="text"
                      value={patient}
                      onChange={(e) => setPatient(e.target.value)}
                      className="w-full font-bold text-slate-900 border-b border-slate-300 py-0.5 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {(['Pagi', 'Siang', 'Malam'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTiming(t)}
                        className={`py-1 rounded-md font-mono text-[11px] border ${
                          timing === t
                            ? 'bg-[#1E40AF] text-white border-[#1E40AF] font-bold'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {(['Sebelum Makan', 'Sesudah Makan'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMealRule(m)}
                        className={`py-1 rounded-md text-[10px] font-medium border ${
                          mealRule === m
                            ? 'bg-blue-50 text-[#1E40AF] border-[#1E40AF] font-bold'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                  <select
                    value={doseQty}
                    onChange={(e) => setDoseQty(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 font-mono text-xs font-semibold text-center text-[#1E40AF]"
                  >
                    <option>3 x 1 Tablet</option>
                    <option>2 x 1 Kapsul</option>
                    <option>1 x 1 Malam</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Zone 2: Center Visual Product Grid */}
            <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {rows.map((r) => (
                  <button
                    key={r.code}
                    type="button"
                    onClick={() => addRow(r, false)}
                    className="group text-left rounded-2xl bg-white border border-slate-200 hover:border-[#065F46] p-3 transition shadow-sm flex items-center gap-3 active:scale-[0.99]"
                  >
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between font-mono text-[10px] text-slate-500">
                        <span>{r.batch}</span>
                        <span className="text-[#065F46] font-bold">Exp {r.exp}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 truncate mt-0.5">{r.name}</div>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-slate-900">
                          Rp {r.price.toLocaleString('id-ID')}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#065F46] font-mono text-[10px] font-bold">
                          + Dispense
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone 3: Right Floating Dispensing Cart */}
            <div className="lg:col-span-4 bg-white p-5 sm:p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-500 block">
                      Keranjang Tebus Resep
                    </span>
                    <h2 className="font-bold text-base text-slate-900">{patient}</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#065F46] font-mono text-xs font-bold">
                    FEFO Active
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
                  {dispensed.map((d) => (
                    <div
                      key={d.code}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <img
                        src={d.image}
                        alt={d.name}
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-slate-900 truncate">{d.name}</div>
                        <div className="font-mono text-[10px] text-slate-500">Batch {d.batch}</div>
                        <div className="font-mono text-xs font-bold text-[#065F46]">
                          Rp {(d.price * d.qty).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                        <button
                          type="button"
                          onClick={() => adjustDrugQty(d.code, -1)}
                          className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center">{d.qty}</span>
                        <button
                          type="button"
                          onClick={() => adjustDrugQty(d.code, 1)}
                          className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-500 font-medium">Total Penebusan Resep</span>
                  <span className="font-mono text-xl font-bold text-slate-900">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-3.5 rounded-xl bg-[#065F46] hover:bg-[#047857] text-white text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Etiket &amp; Lihat Gudang Batch →</span>
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
                <span className="font-mono text-xs font-semibold text-[#065F46] uppercase">
                  Warehouse FEFO Ledger &amp; Defekta
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                  Urutan Pengeluaran Batch &amp; Peringatan Stok Kritis
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
              >
                ← Kembali ke Kasir FEFO
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...SIMRS_DRUGS]
                .sort((a, b) => a.exp.localeCompare(b.exp))
                .map((d, idx) => (
                  <div
                    key={d.code}
                    className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm"
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="font-bold text-[#065F46]">FEFO #{idx + 1} · {d.batch}</span>
                        <span className="text-slate-500">Exp {d.exp}</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 truncate">{d.name}</div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="font-mono text-xs text-slate-700">{d.stock} Unit</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold ${
                            d.stock < 20
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {d.stock < 20 ? 'Re-Order SP' : 'Stok Aman'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
        <span>Apotek Medika Farma · Layanan Resep 24 Jam · Terintegrasi BPOM &amp; SIMRS</span>
        <div className="flex gap-4 font-semibold text-[#065F46]">
          <button type="button" onClick={() => setPage(1)}>01 Katalog</button>
          <button type="button" onClick={() => setPage(2)}>02 Kasir FEFO</button>
          <button type="button" onClick={() => setPage(3)}>03 Gudang Batch</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 4. ATELIER LUXE · SSENSE Editorial Lookbook, Boutique POS & VIP Client CRM
 * ========================================================================== */
const LOOKBOOK = [
  {
    ref: 'AW26-01',
    cat: 'OUTERWEAR',
    name: 'Double-Faced Cashmere Trench',
    price: 4850000,
    sizes: ['36', '38', '40', '42'],
    fabric: '100% Inner Mongolian Cashmere (480 gsm) · Hand-finished lapel',
    origin: 'Tailored in Milan, Italy',
    stockMatrix: { senayan: 3, plazaId: 2, bali: 1 },
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
  },
  {
    ref: 'AW26-04',
    cat: 'FOOTWEAR',
    name: 'Goodyear-Welted Suede Chelsea Boots',
    price: 3200000,
    sizes: ['40', '41', '42', '43'],
    fabric: 'Tuscan Calf Suede · Vibram Commando Sole · Full Leather Lining',
    origin: 'Handcrafted in Florence, Italy',
    stockMatrix: { senayan: 4, plazaId: 1, bali: 2 },
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80',
  },
  {
    ref: 'AW26-09',
    cat: 'LEATHER GOODS',
    name: 'Box Calfskin Architectural Tote',
    price: 5400000,
    sizes: ['OS'],
    fabric: 'Full-Grain French Box Calfskin · Brushed Brass Hardware',
    origin: 'Atelier Paris / Jakarta Flagship',
    stockMatrix: { senayan: 2, plazaId: 2, bali: 0 },
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    ref: 'AW26-12',
    cat: 'SILK SHIRTING',
    name: 'Mulberry Raw Silk Jacquard Shirt',
    price: 2150000,
    sizes: ['36', '38', '40'],
    fabric: '22-Momme Mulberry Silk · Mother-of-Pearl Buttons',
    origin: 'Woven in Como, Italy',
    stockMatrix: { senayan: 5, plazaId: 4, bali: 3 },
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
  },
];

export function AtelierLuxePos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [previewPiece, setPreviewPiece] = useState<(typeof LOOKBOOK)[0] | null>(null);
  const [catFilter, setCatFilter] = useState<string>('ALL');
  const [sizePick, setSizePick] = useState<Record<string, string>>({
    'AW26-01': '38',
    'AW26-04': '42',
    'AW26-09': 'OS',
    'AW26-12': '38',
  });
  const [vip, setVip] = useState<'REGULAR' | 'SILVER 5%' | 'BLACK 15%'>('BLACK 15%');
  const [bag, setBag] = useState<
    { ref: string; name: string; size: string; price: number; qty: number; image: string }[]
  >([
    {
      ref: 'AW26-01',
      name: 'Double-Faced Cashmere Trench',
      size: '38',
      price: 4850000,
      qty: 1,
      image: LOOKBOOK[0].image,
    },
  ]);

  const rate = vip === 'BLACK 15%' ? 0.15 : vip === 'SILVER 5%' ? 0.05 : 0;
  const gross = bag.reduce((s, b) => s + b.price * b.qty, 0);
  const disc = Math.round(gross * rate);
  const net = gross - disc;
  const totalPieces = bag.reduce((s, b) => s + b.qty, 0);

  const addToBag = (item: (typeof LOOKBOOK)[0], goPos = false) => {
    const activeSize = sizePick[item.ref] || item.sizes[0];
    setBag((prev) => {
      const idx = prev.findIndex((b) => b.ref === item.ref && b.size === activeSize);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        { ref: item.ref, name: item.name, size: activeSize, price: item.price, qty: 1, image: item.image },
      ];
    });
    if (goPos) {
      setPreviewPiece(null);
      setPage(2);
    }
  };

  const adjustBagQty = (ref: string, size: string, delta: number) => {
    setBag((prev) =>
      prev
        .map((b) => (b.ref === ref && b.size === size ? { ...b, qty: b.qty + delta } : b))
        .filter((b) => b.qty > 0)
    );
  };

  const filteredPieces =
    catFilter === 'ALL' ? LOOKBOOK : LOOKBOOK.filter((i) => i.cat === catFilter);

  return (
    <div className="min-h-[820px] bg-[#FAF9F6] text-[#111111] flex flex-col justify-between">
      <div>
        <header className="px-6 sm:px-8 py-5 border-b border-stone-200 bg-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl tracking-[0.24em] text-stone-950">ATELIER LUXE</h1>
            <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
              Autumn / Winter 2026 Archive · Senayan &amp; Plaza Indonesia
            </span>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-4 py-2 rounded-lg transition ${
                page === 1 ? 'bg-stone-950 text-white' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              01 · Editorial Lookbook
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-4 py-2 rounded-lg transition ${
                page === 2 ? 'bg-stone-950 text-white' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              02 · Clienteling POS ({totalPieces})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-4 py-2 rounded-lg transition ${
                page === 3 ? 'bg-stone-950 text-white' : 'text-stone-600 hover:text-stone-950'
              }`}
            >
              03 · VIP Client Book
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: SSENSE / TOTEME EDITORIAL LOOKBOOK */}
        {page === 1 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <span className="font-mono text-[11px] tracking-widest uppercase text-stone-500">
                  Autumn / Winter 2026 Ready-to-Wear &amp; Leather Goods
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-950 leading-tight">
                  Siluet Monokrom Arsitektural &amp; Cashmere Terbaik dari Milan.
                </h2>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Pilih setiap artikel untuk memeriksa asal tekstil, ketersediaan stok lintas butik, serta memilih ukuran sebelum memasukkannya ke dalam Dossier Klien.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-6 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-mono text-xs tracking-wider uppercase shrink-0"
              >
                Buka Clienteling Bag ({totalPieces}) →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {LOOKBOOK.map((item) => {
                const activeSize = sizePick[item.ref] || item.sizes[0];
                return (
                  <div
                    key={item.ref}
                    className="group bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between transition hover:shadow-md"
                  >
                    <div>
                      <div
                        onClick={() => setPreviewPiece(item)}
                        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm font-mono text-[10px] text-stone-900 font-semibold">
                          {item.ref}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                          {item.cat} · {item.origin}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-stone-950">{item.name}</h3>
                        <p className="text-xs text-stone-600 line-clamp-2">{item.fabric}</p>
                        <div className="font-mono text-sm font-bold text-stone-950 pt-1">
                          IDR {item.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 space-y-3">
                      <div className="flex gap-1">
                        {item.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSizePick((p) => ({ ...p, [item.ref]: s }))}
                            className={`flex-1 py-1.5 rounded-lg font-mono text-xs border transition ${
                              activeSize === s
                                ? 'bg-stone-950 text-white border-stone-950 font-bold'
                                : 'bg-white text-stone-700 border-stone-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setPreviewPiece(item)}
                          className="py-2 rounded-lg border border-stone-200 hover:border-stone-950 font-medium"
                        >
                          Dossier
                        </button>
                        <button
                          type="button"
                          onClick={() => addToBag(item, false)}
                          className="py-2 rounded-lg bg-stone-950 text-white font-semibold"
                        >
                          + Size {activeSize}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {previewPiece && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200">
                  <div className="relative aspect-[16/10] bg-stone-100">
                    <img
                      src={previewPiece.image}
                      alt={previewPiece.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewPiece(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-stone-950 flex items-center justify-center shadow"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="font-mono text-xs text-stone-500">
                        {previewPiece.ref} · {previewPiece.origin}
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-stone-950 mt-0.5">
                        {previewPiece.name}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{previewPiece.fabric}</p>
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 font-mono text-xs space-y-1">
                      <div className="font-bold text-stone-900">Alokasi Stok Butik:</div>
                      <div>Senayan City Flagship: {previewPiece.stockMatrix.senayan} pcs</div>
                      <div>Plaza Indonesia Level 1: {previewPiece.stockMatrix.plazaId} pcs</div>
                      <div>Seminyak Resort Bali: {previewPiece.stockMatrix.bali} pcs</div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-mono font-bold text-base">
                        IDR {previewPiece.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => addToBag(previewPiece, true)}
                        className="px-5 py-2.5 rounded-xl bg-stone-950 text-white text-xs font-semibold"
                      >
                        Masukkan ke Clienteling POS →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: 3-ZONE BOUTIQUE CLIENTELING POS */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* Zone 1: Left Category & VIP Tier Rail */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white p-5 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 block mb-2.5">
                  Kategori Koleksi
                </span>
                <div className="space-y-1.5">
                  {['ALL', 'OUTERWEAR', 'FOOTWEAR', 'LEATHER GOODS', 'SILK SHIRTING'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCatFilter(c)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition ${
                        catFilter === c
                          ? 'bg-stone-950 text-white'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-stone-200 space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                  Private Client Tier
                </div>
                <div className="font-serif text-lg font-bold">Clarissa V. · #0841</div>
                <div className="space-y-1.5">
                  {(['REGULAR', 'SILVER 5%', 'BLACK 15%'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setVip(tier)}
                      className={`w-full py-2 px-3 rounded-lg font-mono text-xs text-left transition ${
                        vip === tier
                          ? 'bg-stone-950 text-white font-bold'
                          : 'bg-white text-stone-700 border border-stone-200'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Zone 2: Center Visual Garment Grid */}
            <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPieces.map((item) => {
                  const activeSize = sizePick[item.ref] || item.sizes[0];
                  return (
                    <div
                      key={item.ref}
                      className="rounded-2xl bg-white border border-stone-200 overflow-hidden p-3.5 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full aspect-[4/3] rounded-xl object-cover bg-stone-100"
                          loading="lazy"
                        />
                        <div className="mt-3 space-y-1">
                          <div className="font-mono text-[10px] text-stone-500">{item.ref}</div>
                          <div className="font-serif font-bold text-sm text-stone-950">{item.name}</div>
                          <div className="font-mono text-xs font-bold">
                            IDR {item.price.toLocaleString('id-ID')}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {item.sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSizePick((p) => ({ ...p, [item.ref]: s }))}
                              className={`flex-1 py-1 rounded font-mono text-[11px] border ${
                                activeSize === s
                                  ? 'bg-stone-950 text-white border-stone-950 font-bold'
                                  : 'border-stone-200 text-stone-700'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => addToBag(item, false)}
                          className="w-full py-2 rounded-lg bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold transition"
                        >
                          + Add Size {activeSize}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Zone 3: Right Floating Client Bag */}
            <div className="lg:col-span-4 bg-white p-5 sm:p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-stone-500 block">
                      Clienteling Bag
                    </span>
                    <h2 className="font-serif text-xl font-bold">Clarissa V.</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-stone-950 text-white font-mono text-xs">
                    {vip}
                  </span>
                </div>

                <div className="space-y-3 max-h-[340px] overflow-y-auto">
                  {bag.map((b) => (
                    <div
                      key={`${b.ref}-${b.size}`}
                      className="p-3 rounded-xl bg-[#FAF9F6] border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <img
                        src={b.image}
                        alt={b.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-serif font-bold text-xs text-stone-950 truncate">
                          {b.name}
                        </div>
                        <div className="font-mono text-[10px] text-stone-500">
                          {b.ref} · Size {b.size}
                        </div>
                        <div className="font-mono text-xs font-bold mt-0.5">
                          IDR {(b.price * b.qty).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200">
                        <button
                          type="button"
                          onClick={() => adjustBagQty(b.ref, b.size, -1)}
                          className="w-6 h-6 rounded hover:bg-stone-100 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center">{b.qty}</span>
                        <button
                          type="button"
                          onClick={() => adjustBagQty(b.ref, b.size, 1)}
                          className="w-6 h-6 rounded hover:bg-stone-100 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Gross Subtotal</span>
                    <span>IDR {gross.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Privilege ({vip})</span>
                    <span>- IDR {disc.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t border-stone-200 text-stone-950">
                    <span>Net Total</span>
                    <span>IDR {net.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold tracking-wider uppercase transition"
                >
                  Authorize &amp; Open VIP Book →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: VIP CLIENT BOOK & MULTI-BOUTIQUE STOCK */}
        {page === 3 && (
          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-3">
                  Direktori Private Client (VIP CRM)
                </div>
                {[
                  { name: 'Clarissa V.', tier: 'BLACK 15%', spend: 'IDR 64.200.000', size: '38 / EU 39', stylist: 'Nadia' },
                  { name: 'Rendra Kusuma', tier: 'BLACK 15%', spend: 'IDR 41.850.000', size: '42 / EU 42', stylist: 'Dion' },
                  { name: 'Aurelia Tan', tier: 'SILVER 5%', spend: 'IDR 18.400.000', size: '36 / OS', stylist: 'Nadia' },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="p-4 rounded-xl border border-stone-200 bg-[#FAF9F6] flex justify-between items-center text-xs"
                  >
                    <div>
                      <div className="font-serif text-lg font-bold">{c.name}</div>
                      <div className="font-mono text-[11px] text-stone-500">
                        Size: {c.size} · Advisor: {c.stylist}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-950 text-white text-[10px] font-bold">
                        {c.tier}
                      </span>
                      <div className="font-bold mt-1.5">{c.spend}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-6 bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-stone-500 border-b border-stone-200 pb-3">
                  Matriks Stok Lintas Butik Flagship
                </div>
                <div className="space-y-3">
                  {LOOKBOOK.map((item) => (
                    <div
                      key={item.ref}
                      className="p-3.5 rounded-xl border border-stone-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-stone-950 truncate">{item.name}</div>
                          <div className="font-mono text-[10px] text-stone-500">{item.ref}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-[11px] shrink-0">
                        <span className="px-2 py-1 rounded bg-stone-100">SNY: {item.stockMatrix.senayan}</span>
                        <span className="px-2 py-1 rounded bg-stone-100">PLZ: {item.stockMatrix.plazaId}</span>
                        <span className="px-2 py-1 rounded bg-stone-100">BALI: {item.stockMatrix.bali}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-stone-200 bg-white px-6 py-4 flex flex-wrap justify-between gap-4 text-xs text-stone-500">
        <span>Atelier Luxe Flagship · Senayan City &amp; Plaza Indonesia Jakarta</span>
        <div className="flex gap-4 text-stone-950 font-semibold">
          <button type="button" onClick={() => setPage(1)}>01 Lookbook</button>
          <button type="button" onClick={() => setPage(2)}>02 Clienteling POS</button>
          <button type="button" onClick={() => setPage(3)}>03 VIP Book</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 5. PITSTOP PRO · Sparepart Storefront, 3-Zone PKB POS & Vehicle Tracker
 * ========================================================================== */
const BAYS = [
  {
    id: 'BAY-01',
    plate: 'B 1942 KRN',
    exp: '11·28',
    model: 'Honda Civic RS Turbo',
    tech: 'Dani S.',
    state: 'LIFT UP',
    step: 3,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'BAY-02',
    plate: 'B 8821 VRT',
    exp: '04·27',
    model: 'Toyota Fortuner GR Sport',
    tech: 'Arif P.',
    state: 'FINAL QC',
    step: 4,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'BAY-03',
    plate: 'B 2104 ZXA',
    exp: '09·29',
    model: 'Hyundai Ioniq 5 Signature',
    tech: 'Reza M.',
    state: 'SCANNER',
    step: 2,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'BAY-04',
    plate: 'D 404 RYZ',
    exp: '07·28',
    model: 'Innova Zenix Hybrid Q',
    tech: 'Budi H.',
    state: 'READY',
    step: 5,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
  },
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
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1635784063388-1ff609e12d7c?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=600&q=80',
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
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
  },
];

export function PitStopBengkelPos({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [previewPart, setPreviewPart] = useState<(typeof WORKSHOP_CATALOG)[0] | null>(null);
  const [sectionFilter, setSectionFilter] = useState<'ALL' | 'JASA' | 'PART'>('ALL');
  const [bay, setBay] = useState(BAYS[0]);
  const [odometer, setOdometer] = useState('42.580');
  const [workItems, setWorkItems] = useState<
    { id: string; section: 'JASA' | 'PART'; label: string; meta: string; price: number; qty: number; image: string }[]
  >([
    {
      id: 'L1',
      section: 'JASA',
      label: 'Paket Tune Up Carbon Clean & GDI Injector',
      meta: 'Estimasi 1.5 Jam',
      price: 285000,
      qty: 1,
      image: WORKSHOP_CATALOG[0].image,
    },
    {
      id: 'P1',
      section: 'PART',
      label: 'Oli Mesin Full Synthetic 0W-20 API SP (Galon 4L)',
      meta: 'OEM-0W20-4L',
      price: 480000,
      qty: 1,
      image: WORKSHOP_CATALOG[2].image,
    },
  ]);

  const addLine = (item: (typeof WORKSHOP_CATALOG)[0], goPos = false) => {
    setWorkItems((prev) => {
      const idx = prev.findIndex((w) => w.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        {
          id: item.id,
          section: item.section,
          label: item.name,
          meta: item.meta,
          price: item.price,
          qty: 1,
          image: item.image,
        },
      ];
    });
    if (goPos) {
      setPreviewPart(null);
      setPage(2);
    }
  };

  const adjustWorkQty = (id: string, delta: number) => {
    setWorkItems((prev) =>
      prev
        .map((w) => (w.id === id ? { ...w, qty: w.qty + delta } : w))
        .filter((w) => w.qty > 0)
    );
  };

  const total = workItems.reduce((s, w) => s + w.price * w.qty, 0);
  const filteredCatalog =
    sectionFilter === 'ALL'
      ? WORKSHOP_CATALOG
      : WORKSHOP_CATALOG.filter((i) => i.section === sectionFilter);

  return (
    <div className="min-h-[820px] bg-[#11141A] text-slate-100 font-sans flex flex-col justify-between">
      <div>
        <header className="px-6 py-4 bg-[#161B24] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-slate-950 flex items-center justify-center font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#F59E0B] block">
                Auto Performance Workshop &amp; OEM Parts Center
              </span>
              <div className="font-bold text-xl tracking-tight text-white">
                PitStop Pro Motorsport
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 1 ? 'bg-[#F59E0B] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              01 · Katalog Part &amp; Paket Servis
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 2 ? 'bg-[#F59E0B] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              02 · Kasir PKB &amp; Bay Lift ({workItems.reduce((s, w) => s + w.qty, 0)})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 rounded-lg transition ${
                page === 3 ? 'bg-[#F59E0B] text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
            >
              03 · Lacak Progres Mobil
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: SPAREPART OEM & SERVICE STOREFRONT */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-8">
            <div className="rounded-3xl bg-[#181E29] border border-white/10 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-semibold">
                  Suku Cadang Bergaransi Resmi · Telemetri OBD-II
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Transparansi Kode Part OEM &amp; Estimasi Jam Kerja Mekanik.
                </h1>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Pilih paket servis berkala atau suku cadang asli untuk memeriksa kompatibilitas tipe mobil dan memasukkannya langsung ke Perintah Kerja Bengkel (PKB).
                </p>
              </div>
              <div className="lg:col-span-4 bg-[#11141A] rounded-2xl border border-white/10 p-5 space-y-3 text-xs">
                <div className="font-mono text-[10px] text-[#F59E0B] font-semibold uppercase">
                  Kendaraan Aktif di {bay.id}
                </div>
                <div className="font-bold text-base text-white">
                  {bay.plate} · {bay.model}
                </div>
                <div className="text-slate-400">
                  Total Estimasi PKB: Rp {total.toLocaleString('id-ID')}
                </div>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="w-full py-2.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-slate-950 font-bold transition"
                >
                  Buka Lembar Kerja PKB →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WORKSHOP_CATALOG.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#181E29] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#F59E0B]/50 transition"
                >
                  <div>
                    <div
                      onClick={() => setPreviewPart(item)}
                      className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <span
                        className={`absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-[10px] font-bold ${
                          item.section === 'JASA'
                            ? 'bg-[#F59E0B] text-slate-950'
                            : 'bg-sky-500 text-slate-950'
                        }`}
                      >
                        {item.section === 'JASA' ? 'Jasa Mekanik' : 'Suku Cadang OEM'}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="font-mono text-[11px] text-slate-400">{item.code}</div>
                      <h2 className="font-bold text-base text-white">{item.name}</h2>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{item.spec}</p>
                      <div className="font-mono text-[11px] text-slate-400 pt-1">
                        Kompatibel: {item.compat}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-white">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewPart(item)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200"
                      >
                        Detail
                      </button>
                      <button
                        type="button"
                        onClick={() => addLine(item, false)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F59E0B] hover:bg-amber-400 text-slate-950 text-xs font-bold"
                      >
                        + PKB
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {previewPart && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#181E29] border border-white/15 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl">
                  <div className="relative aspect-[16/9] bg-slate-900">
                    <img
                      src={previewPart.image}
                      alt={previewPart.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setPreviewPart(null)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#F59E0B]">
                        {previewPart.code}
                      </span>
                      <h3 className="font-bold text-xl text-white mt-0.5">{previewPart.name}</h3>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{previewPart.spec}</p>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs space-y-1">
                      <div className="text-[#F59E0B] font-bold">Kompatibilitas Kendaraan:</div>
                      <div className="text-slate-200">{previewPart.compat}</div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-mono text-lg font-bold text-white">
                        Rp {previewPart.price.toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => addLine(previewPart, true)}
                        className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-slate-950 text-xs font-bold"
                      >
                        Masukkan ke PKB {bay.plate} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: 3-ZONE PKB SERVICE POS & BAY SELECTOR */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
            {/* Zone 1: Left 4-Bay Lift Selector & Category Rail */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#141821] p-5 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-2.5">
                  Pilih Bay Lift Aktif
                </span>
                <div className="space-y-2">
                  {BAYS.map((b) => {
                    const active = bay.id === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBay(b)}
                        className={`w-full p-3 rounded-xl text-left border transition flex items-center gap-3 ${
                          active
                            ? 'bg-[#1E2636] border-[#F59E0B] shadow-sm'
                            : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                        }`}
                      >
                        <img
                          src={b.image}
                          alt={b.model}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between font-mono text-[10px]">
                            <span className="text-[#F59E0B] font-bold">{b.id}</span>
                            <span className="text-slate-400">{b.state}</span>
                          </div>
                          <div className="font-mono text-xs font-bold text-white">{b.plate}</div>
                          <div className="text-[11px] text-slate-400 truncate">{b.model}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-2">
                  Filter Katalog PKB
                </span>
                {(['ALL', 'JASA', 'PART'] as const).map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setSectionFilter(sec)}
                    className={`w-full px-3.5 py-2 rounded-xl text-left text-xs font-semibold transition ${
                      sectionFilter === sec
                        ? 'bg-[#F59E0B] text-slate-950 font-bold'
                        : 'bg-white/[0.03] text-slate-300 hover:text-white'
                    }`}
                  >
                    {sec === 'ALL' ? 'Semua Jasa & Suku Cadang' : sec === 'JASA' ? 'Jasa Mekanik' : 'Suku Cadang OEM'}
                  </button>
                ))}
              </div>
            </div>

            {/* Zone 2: Center Visual Service & Parts Grid */}
            <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredCatalog.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addLine(item, false)}
                    className="group text-left rounded-2xl bg-[#181E29] border border-white/10 hover:border-[#F59E0B] overflow-hidden transition active:scale-[0.99]"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="font-mono text-[10px] text-[#F59E0B] font-semibold">
                        {item.code}
                      </div>
                      <div className="font-bold text-xs text-white line-clamp-1">{item.name}</div>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[11px] font-bold text-[#F59E0B]">+ PKB</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Zone 3: Right Floating PKB Work Order Cart */}
            <div className="lg:col-span-4 bg-[#141821] p-5 sm:p-6 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#F59E0B] block">
                      Perintah Kerja Bengkel (PKB)
                    </span>
                    <h2 className="font-bold text-base text-white">
                      {bay.plate} · {bay.model}
                    </h2>
                  </div>
                  <div className="font-mono text-xs text-slate-300">
                    KM:{' '}
                    <input
                      type="text"
                      value={odometer}
                      onChange={(e) => setOdometer(e.target.value)}
                      className="w-16 bg-black/40 border border-white/15 rounded px-1.5 py-0.5 text-right text-white font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
                  {workItems.map((w) => (
                    <div
                      key={w.id}
                      className="p-3 rounded-xl bg-[#181E29] border border-white/10 flex items-center justify-between gap-3"
                    >
                      <img
                        src={w.image}
                        alt={w.label}
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-xs text-white truncate">{w.label}</div>
                        <div className="font-mono text-[10px] text-slate-400">
                          {w.section} · {w.meta}
                        </div>
                        <div className="font-mono text-xs font-bold text-[#F59E0B] mt-0.5">
                          Rp {(w.price * w.qty).toLocaleString('id-ID')}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                        <button
                          type="button"
                          onClick={() => adjustWorkQty(w.id, -1)}
                          className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold w-5 text-center">{w.qty}</span>
                        <button
                          type="button"
                          onClick={() => adjustWorkQty(w.id, 1)}
                          className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Total Estimasi PKB</span>
                  <span className="font-mono text-xl font-bold text-white">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-3.5 rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                >
                  Terbitkan PKB &amp; Pantau Progres Mobil →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: LIVE VEHICLE SERVICE TRACKER */}
        {page === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#F59E0B] uppercase">
                Live Workshop Telemetry · 4-Bay Tracker
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">
                Status Pengerjaan Kendaraan Real-Time per Pelat Nomor
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BAYS.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-[#181E29] border border-white/10 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={b.image}
                        alt={b.model}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded bg-black border border-white/30 font-mono text-xs font-bold text-white">
                          {b.plate}
                        </span>
                        <div className="font-bold text-base text-white mt-1">{b.model}</div>
                        <div className="font-mono text-xs text-slate-400">
                          {b.id} · Mekanik: {b.tech}
                        </div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 font-mono text-xs font-bold">
                      {b.state}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 font-mono text-[10px]">
                    {['Inspeksi', 'Bongkar', 'Part OEM', 'Final QC', 'Selesai'].map((st, idx) => (
                      <div
                        key={st}
                        className={`py-2 px-1 rounded-lg text-center border ${
                          idx + 1 <= b.step
                            ? 'bg-[#F59E0B] text-slate-950 border-[#F59E0B] font-bold'
                            : 'bg-black/30 text-slate-500 border-white/5'
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

      <footer className="border-t border-white/10 bg-[#0D1015] px-6 py-4 flex flex-wrap justify-between gap-4 text-xs text-slate-400">
        <span>PitStop Pro Workshop · Garansi Servis 30 Hari / 1.000 KM</span>
        <div className="flex gap-4 text-[#F59E0B] font-semibold">
          <button type="button" onClick={() => setPage(1)}>01 Katalog Part</button>
          <button type="button" onClick={() => setPage(2)}>02 Kasir PKB</button>
          <button type="button" onClick={() => setPage(3)}>03 Lacak Mobil</button>
        </div>
      </footer>
    </div>
  );
}
