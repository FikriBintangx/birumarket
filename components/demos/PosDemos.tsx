'use client';

import { useState } from 'react';
import {
  Flame,
  Coffee,
  Pill,
  ShoppingBag,
  Wrench,
  Plus,
  Minus,
  Trash2,
  Printer,
  CheckCircle2,
  Search,
  Sparkles,
} from 'lucide-react';

/* ============================================================================
 * 1. KUROBENTO · Izakaya & Ramen Table POS + KDS (Dark Charcoal & Vermilion)
 * ========================================================================== */
interface KuroCartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  note: string;
}

const KURO_TABLES = [
  { id: 'T-01', seats: 2, status: 'Available' },
  { id: 'T-02', seats: 4, status: 'Occupied' },
  { id: 'T-03', seats: 2, status: 'Available' },
  { id: 'T-04', seats: 4, status: 'Occupied' },
  { id: 'T-05', seats: 6, status: 'Billing' },
  { id: 'T-06', seats: 4, status: 'Available' },
  { id: 'T-07', seats: 2, status: 'Occupied' },
  { id: 'T-08', seats: 8, status: 'Available' },
];

const KURO_MENU = [
  { id: 'k1', cat: 'Ramen', name: 'Kuro Tonkotsu Ramen', price: 68000, desc: 'Kaldu tulang 12 jam · Black garlic oil' },
  { id: 'k2', cat: 'Ramen', name: 'Spicy Miso Tori Ramen', price: 62000, desc: 'Kaldu ayam pedas · Ajitama egg' },
  { id: 'k3', cat: 'Ramen', name: 'Truffle Shoyu Mazemen', price: 74000, desc: 'Dry ramen · Menma · Chashu bakar' },
  { id: 'k4', cat: 'Yakitori', name: 'Negima Chicken Skewer', price: 38000, desc: '2 tusuk paha ayam · Saus tare arang' },
  { id: 'k5', cat: 'Yakitori', name: 'Tsukune Egg Yolk', price: 42000, desc: 'Bakso ayam panggang · Kuning telur' },
  { id: 'k6', cat: 'Izakaya', name: 'Salmon Aburi Mentaiko', price: 78000, desc: '6 pcs roll · Saus mentai bakar' },
  { id: 'k7', cat: 'Izakaya', name: 'Crispy Tori Karaage', price: 46000, desc: 'Mayo yuzu · Jeruk nipis segar' },
  { id: 'k8', cat: 'Ocha', name: 'Cold Roasted Hojicha', price: 18000, desc: 'Refillable · Tanpa gula' },
];

export function KuroBentoPos() {
  const [selectedTable, setSelectedTable] = useState('T-04');
  const [activeCat, setActiveCat] = useState('All');
  const [firmness, setFirmness] = useState('Katame (Firm)');
  const [brothLevel, setBrothLevel] = useState('Rich Garlic');
  const [cart, setCart] = useState<KuroCartItem[]>([
    { id: 'k1-Katame', name: 'Kuro Tonkotsu Ramen', price: 68000, qty: 2, note: 'Katame (Firm) · Rich Garlic' },
    { id: 'k4-Std', name: 'Negima Chicken Skewer', price: 38000, qty: 1, note: 'Standard Tare' },
  ]);
  const [kdsQueue, setKdsQueue] = useState([
    { id: '#KDS-108', table: 'T-02', items: '2x Spicy Miso Tori, 1x Karaage', status: 'Cooking' },
    { id: '#KDS-107', table: 'T-05', items: '1x Salmon Aburi Mentaiko', status: 'Ready' },
  ]);
  const [firedMessage, setFiredMessage] = useState<string | null>(null);

  const visibleMenu = activeCat === 'All' ? KURO_MENU : KURO_MENU.filter((m) => m.cat === activeCat);

  const addItem = (item: (typeof KURO_MENU)[0]) => {
    const note = item.cat === 'Ramen' ? `${firmness} · ${brothLevel}` : 'Standard Prep';
    const key = `${item.id}-${note}`;
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.id === key);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: key, name: item.name, price: item.price, qty: 1, note }];
    });
  };

  const subtotal = cart.reduce((acc, c) => acc + c.price * c.qty, 0);
  const serviceTax = Math.round(subtotal * 0.15);
  const grandTotal = subtotal + serviceTax;

  const fireToKitchen = () => {
    if (cart.length === 0) return;
    const summary = cart.map((c) => `${c.qty}x ${c.name}`).join(', ');
    const code = `#KDS-${109 + kdsQueue.length}`;
    setKdsQueue((prev) => [{ id: code, table: selectedTable, items: summary, status: 'Cooking' }, ...prev]);
    setFiredMessage(`Tiket ${code} untuk meja ${selectedTable} dikirim ke Kitchen Display!`);
    setTimeout(() => setFiredMessage(null), 3500);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#111315] text-zinc-100 p-4 sm:p-6">
      {/* Top Bar */}
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 pb-5 mb-5 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E11D48] flex items-center justify-center text-white">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-base sm:text-lg tracking-wider text-white">
              KUROBENTO · IZAKAYA POS + KDS
            </h1>
            <p className="text-xs text-zinc-400">Night Shift Terminal · Tokyo Charcoal Theme</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-rose-300">
            ACTIVE TABLE: {selectedTable}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
            KDS ONLINE
          </span>
        </div>
      </div>

      {firedMessage && (
        <div className="max-w-[1440px] mx-auto mb-4 p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/60 text-rose-100 text-xs sm:text-sm font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{firedMessage}</span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Table Floor Map & Live KDS Rail */}
        <div className="lg:col-span-3 space-y-5">
          <div className="bg-[#181B20] border border-zinc-800 rounded-2xl p-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Floor Map (Pilih Meja)
            </h2>
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
              {KURO_TABLES.map((t) => {
                const active = selectedTable === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTable(t.id)}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      active
                        ? 'bg-[#E11D48] border-[#E11D48] text-white'
                        : t.status === 'Occupied'
                          ? 'bg-zinc-900 border-rose-900/60 text-zinc-200 hover:border-rose-500'
                          : t.status === 'Billing'
                            ? 'bg-amber-950/30 border-amber-700/50 text-amber-200'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    <div className="font-mono text-xs font-bold">{t.id}</div>
                    <div className="text-[10px] opacity-80">{t.seats} Seats · {t.status}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-[#181B20] border border-zinc-800 rounded-2xl p-4">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              Live KDS Kitchen Queue
            </h2>
            <div className="space-y-2.5">
              {kdsQueue.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-3 rounded-xl border ${
                    ticket.status === 'Ready'
                      ? 'bg-emerald-950/30 border-emerald-700/50'
                      : 'bg-zinc-900 border-amber-700/50'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[11px] font-bold">
                    <span className={ticket.status === 'Ready' ? 'text-emerald-400' : 'text-amber-400'}>
                      {ticket.id} · {ticket.table}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setKdsQueue((q) =>
                          q.map((item) =>
                            item.id === ticket.id
                              ? { ...item, status: item.status === 'Cooking' ? 'Ready' : 'Cooking' }
                              : item
                          )
                        )
                      }
                      className="underline text-[10px] text-zinc-300"
                    >
                      {ticket.status}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1">{ticket.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Menu & Ramen Customizer */}
        <div className="lg:col-span-5 bg-[#181B20] border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {['All', 'Ramen', 'Yakitori', 'Izakaya', 'Ocha'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition ${
                  activeCat === cat
                    ? 'bg-[#E11D48] text-white'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {visibleMenu.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => addItem(item)}
                className="p-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-rose-500/70 text-left transition flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="font-mono text-[10px] text-rose-400 uppercase">{item.cat}</span>
                  <h3 className="font-bold text-sm text-white mt-0.5">{item.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="font-mono text-xs font-bold text-rose-300">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  <span className="w-6 h-6 rounded-md bg-rose-600/20 text-rose-400 flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Ramen Modifier Strip */}
          <div className="p-3.5 rounded-xl bg-[#111315] border border-zinc-800 space-y-2.5">
            <span className="font-mono text-[11px] font-bold uppercase text-zinc-400 block">
              Ramen Customizer (Berlaku saat klik item Ramen)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Katame (Firm)', 'Futsu (Normal)', 'Yawame (Soft)'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFirmness(f)}
                  className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-semibold transition ${
                    firmness === f ? 'bg-[#E11D48] text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Rich Garlic', 'Light Shoyu', 'Extra Spicy Oil'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBrothLevel(b)}
                  className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-semibold transition ${
                    brothLevel === b ? 'bg-amber-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Table Ticket */}
        <div className="lg:col-span-4 bg-[#181B20] border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h2 className="font-mono text-sm font-bold text-white">
              CHECK MEJA {selectedTable}
            </h2>
            <button
              type="button"
              onClick={() => setCart([])}
              className="text-xs font-mono text-zinc-400 hover:text-rose-400"
            >
              Clear
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="py-10 text-center text-xs text-zinc-500 font-mono">
              Klik menu di tengah untuk mengisi pesanan meja {selectedTable}.
            </p>
          ) : (
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {cart.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{c.name}</h4>
                    <p className="text-[10px] font-mono text-zinc-400 truncate">{c.note}</p>
                    <p className="text-xs font-mono text-rose-300 mt-1">
                      Rp {(c.price * c.qty).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        setCart((prev) =>
                          prev
                            .map((x) => (x.id === c.id ? { ...x, qty: x.qty - 1 } : x))
                            .filter((x) => x.qty > 0)
                        )
                      }
                      className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs w-5 text-center">{c.qty}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setCart((prev) =>
                          prev.map((x) => (x.id === c.id ? { ...x, qty: x.qty + 1 } : x))
                        )
                      }
                      className="w-7 h-7 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-zinc-800 space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Tax + Service (15%)</span>
              <span>Rp {serviceTax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
              <span>GRAND TOTAL</span>
              <span className="text-rose-400">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={fireToKitchen}
            disabled={cart.length === 0}
            className="w-full min-h-[46px] rounded-xl bg-[#E11D48] hover:bg-rose-600 text-white font-mono font-bold text-sm transition disabled:opacity-40"
          >
            FIRE TO KITCHEN (KDS)
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. BREWLAB · Specialty Coffee & Barista POS (Warm Oat & Terracotta)
 * ========================================================================== */
const BREW_MENU = [
  { id: 'b1', cat: 'Espresso', name: 'Oat Spanish Latte', basePrice: 38000 },
  { id: 'b2', cat: 'Manual Brew', name: 'Ethiopia Guji V60', basePrice: 42000 },
  { id: 'b3', cat: 'Signature', name: 'Dirty Matcha Kyoto', basePrice: 44000 },
  { id: 'b4', cat: 'Espresso', name: 'Iced Americano Single Origin', basePrice: 29000 },
  { id: 'b5', cat: 'Pastry', name: 'French Butter Croissant', basePrice: 28000 },
  { id: 'b6', cat: 'Pastry', name: 'Burnt Basque Cheesecake', basePrice: 39000 },
];

export function BrewLabPos() {
  const [milk, setMilk] = useState<'Fresh Milk' | 'Oatside (+6k)' | 'Soy Milk (+4k)'>('Oatside (+6k)');
  const [sugar, setSugar] = useState('50% Less');
  const [ice, setIce] = useState('Less Ice');
  const [shots, setShots] = useState<'Single' | 'Double (+5k)'>('Single');
  const [cupName, setCupName] = useState('Biru');
  const [ticket, setTicket] = useState<
    { id: string; name: string; price: number; qty: number; mods: string }[]
  >([
    {
      id: 'init-1',
      name: 'Oat Spanish Latte',
      price: 44000,
      qty: 1,
      mods: 'Oatside (+6k) · 50% Less · Less Ice',
    },
  ]);
  const [showReceipt, setShowReceipt] = useState(false);

  const milkFee = milk.includes('+6k') ? 6000 : milk.includes('+4k') ? 4000 : 0;
  const shotFee = shots.includes('+5k') ? 5000 : 0;

  const addDrink = (item: (typeof BREW_MENU)[0]) => {
    const isPastry = item.cat === 'Pastry';
    const unitPrice = isPastry ? item.basePrice : item.basePrice + milkFee + shotFee;
    const mods = isPastry ? 'Warm Served' : `${milk} · ${sugar} · ${ice} · ${shots}`;
    const key = `${item.id}-${mods}`;
    setTicket((prev) => {
      const idx = prev.findIndex((x) => x.id === key);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: key, name: item.name, price: unitPrice, qty: 1, mods }];
    });
  };

  const total = ticket.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#FAF6F0] text-[#2C1A11] p-4 sm:p-6">
      <div className="max-w-[1440px] mx-auto bg-[#2C1A11] text-[#FAF6F0] rounded-2xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C86D51] flex items-center justify-center text-white">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">BREWLAB · BARISTA SPEED POS</h1>
            <p className="text-xs text-[#D6C7B8]">Warm Oat Craft Interface · Modifier Matrix Ready</p>
          </div>
        </div>
        <span className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#C86D51] text-white font-bold">
          CUP LABEL: {cupName || 'GUEST'}
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Column 1: Drink Grid */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E7DDD3] p-5 space-y-4">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#78716C]">
            1. Pilih Menu Bar &amp; Pastry
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BREW_MENU.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => addDrink(m)}
                className="p-4 rounded-2xl bg-[#FAF6F0] hover:bg-[#F3EBE0] border border-[#E7DDD3] hover:border-[#C86D51] text-left transition flex flex-col justify-between gap-2"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase text-[#C86D51]">
                    {m.cat}
                  </span>
                  <h3 className="font-bold text-sm text-[#2C1A11] mt-1">{m.name}</h3>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-xs font-bold text-[#6F4E37]">
                    Rp {m.basePrice.toLocaleString('id-ID')}
                  </span>
                  <span className="text-xs font-bold text-[#C86D51]">+ Tambah</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Permanent Barista Modifier Matrix */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-[#E7DDD3] p-5 space-y-5">
          <h2 className="font-bold text-sm uppercase tracking-wider text-[#78716C]">
            2. Barista Modifiers
          </h2>

          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold text-[#78716C] block">MILK BASE</span>
            <div className="grid grid-cols-1 gap-1.5">
              {(['Fresh Milk', 'Oatside (+6k)', 'Soy Milk (+4k)'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMilk(m)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition ${
                    milk === m
                      ? 'bg-[#2C1A11] text-[#FAF6F0] border-[#2C1A11]'
                      : 'bg-[#FAF6F0] text-[#2C1A11] border-[#E7DDD3]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold text-[#78716C] block">SUGAR LEVEL</span>
            <div className="grid grid-cols-3 gap-1.5">
              {['0% No Sugar', '50% Less', '100% Normal'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSugar(s)}
                  className={`px-2 py-2 rounded-xl text-[11px] font-bold border transition ${
                    sugar === s
                      ? 'bg-[#C86D51] text-white border-[#C86D51]'
                      : 'bg-[#FAF6F0] text-[#2C1A11] border-[#E7DDD3]'
                  }`}
                >
                  {s.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] font-bold text-[#78716C] block">ICE &amp; ESPRESSO</span>
            <div className="grid grid-cols-2 gap-1.5">
              {['Less Ice', 'Normal Ice'].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIce(i)}
                  className={`px-2 py-2 rounded-xl text-xs font-bold border transition ${
                    ice === i
                      ? 'bg-[#2C1A11] text-[#FAF6F0] border-[#2C1A11]'
                      : 'bg-[#FAF6F0] text-[#2C1A11] border-[#E7DDD3]'
                  }`}
                >
                  {i}
                </button>
              ))}
              {(['Single', 'Double (+5k)'] as const).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => setShots(sh)}
                  className={`px-2 py-2 rounded-xl text-xs font-bold border transition ${
                    shots === sh
                      ? 'bg-[#C86D51] text-white border-[#C86D51]'
                      : 'bg-[#FAF6F0] text-[#2C1A11] border-[#E7DDD3]'
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="cup-name" className="font-mono text-[11px] font-bold text-[#78716C] block mb-1.5">
              NAMA DI GELAS (CUP NAME)
            </label>
            <input
              id="cup-name"
              type="text"
              value={cupName}
              onChange={(e) => setCupName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#D6C7B8] text-sm font-bold text-[#2C1A11]"
            />
          </div>
        </div>

        {/* Column 3: Cup Ticket & Thermal Struk */}
        <div className="lg:col-span-4 bg-[#2C1A11] text-[#FAF6F0] rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono font-bold text-sm">CUP TICKET · {cupName || 'GUEST'}</h2>
            <button
              type="button"
              onClick={() => {
                setTicket([]);
                setShowReceipt(false);
              }}
              className="text-xs text-[#D6C7B8] hover:text-white underline"
            >
              Reset
            </button>
          </div>

          <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
            {ticket.length === 0 ? (
              <p className="py-10 text-center text-xs text-[#D6C7B8]">
                Pilih minuman di sebelah kiri untuk membuat pesanan.
              </p>
            ) : (
              ticket.map((t) => (
                <div
                  key={t.id}
                  className="p-3 rounded-2xl bg-[#3D261A] flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-sm">
                      {t.qty}x {t.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#D6C7B8] mt-0.5">{t.mods}</div>
                    <div className="font-mono text-xs font-bold text-[#FDBA74] mt-1">
                      Rp {(t.price * t.qty).toLocaleString('id-ID')}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTicket((prev) => prev.filter((x) => x.id !== t.id))}
                    className="p-1.5 text-[#D6C7B8] hover:text-white"
                    aria-label="Hapus item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="font-mono text-xs text-[#D6C7B8]">TOTAL BAYAR</span>
            <span className="font-mono text-xl font-bold">
              Rp {total.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            type="button"
            disabled={ticket.length === 0}
            onClick={() => setShowReceipt((v) => !v)}
            className="w-full min-h-[46px] rounded-2xl bg-[#C86D51] hover:bg-[#b55e43] text-white font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-40"
          >
            <Printer className="w-4 h-4" />
            <span>{showReceipt ? 'Tutup Preview Struk' : 'Cetak Struk & QRIS'}</span>
          </button>

          {showReceipt && ticket.length > 0 && (
            <div className="bg-[#FAF6F0] text-[#2C1A11] rounded-2xl p-4 font-mono text-xs space-y-2 border-2 border-dashed border-[#C86D51]">
              <div className="text-center font-bold border-b border-dashed border-[#2C1A11]/30 pb-2">
                BREWLAB ROASTERY · CUP #{cupName || 'GUEST'}
              </div>
              {ticket.map((t) => (
                <div key={t.id} className="flex justify-between">
                  <span>
                    {t.qty}x {t.name}
                  </span>
                  <span>{(t.price * t.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold border-t border-dashed border-[#2C1A11]/30 pt-2">
                <span>QRIS PAID</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. APOTEK MEDIKA · Pharmacy FEFO & Etiket Obat POS (Sterile Emerald)
 * ========================================================================== */
const PHARMACY_DRUGS = [
  { id: 'd1', name: 'Paracetamol 500mg Strip (10 Tab)', batch: 'PCM-26A', exp: '08/2027', stock: 120, rx: false, price: 12000 },
  { id: 'd2', name: 'Amoxicillin 500mg Strip (10 Kap)', batch: 'AMX-991', exp: '05/2027', stock: 42, rx: true, price: 18500 },
  { id: 'd3', name: 'Cetirizine 10mg Anti-Alergi', batch: 'CTZ-104', exp: '12/2027', stock: 64, rx: false, price: 15000 },
  { id: 'd4', name: 'Vitamin D3 1000 IU Softgel', batch: 'VD3-412', exp: '11/2028', stock: 85, rx: false, price: 45000 },
  { id: 'd5', name: 'Omeprazole 20mg Kapsul', batch: 'OMP-311', exp: '06/2027', stock: 28, rx: true, price: 24000 },
];

export function ApotekMedikaPos() {
  const [query, setQuery] = useState('');
  const [selectedDose, setSelectedDose] = useState('3 x 1 Tablet Sesudah Makan');
  const [patientName, setPatientName] = useState('Tn. Hendra');
  const [tuslahFee, setTuslahFee] = useState(true);
  const [cart, setCart] = useState<
    { id: string; name: string; batch: string; dose: string; price: number; qty: number }[]
  >([
    {
      id: 'd1',
      name: 'Paracetamol 500mg Strip (10 Tab)',
      batch: 'PCM-26A',
      dose: '3 x 1 Tablet Sesudah Makan',
      price: 12000,
      qty: 1,
    },
  ]);

  const filteredDrugs = PHARMACY_DRUGS.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.batch.toLowerCase().includes(query.toLowerCase())
  );

  const addDrug = (drug: (typeof PHARMACY_DRUGS)[0]) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.id === drug.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [
        ...prev,
        { id: drug.id, name: drug.name, batch: drug.batch, dose: selectedDose, price: drug.price, qty: 1 },
      ];
    });
  };

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const serviceCost = tuslahFee && cart.length > 0 ? 5000 : 0;
  const total = subtotal + serviceCost;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#F1F5F9] text-[#0F172A] p-4 sm:p-6">
      <div className="max-w-[1440px] mx-auto bg-[#065F46] text-white rounded-2xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg">
              APOTEK MEDIKA · CLINICAL DISPENSING &amp; FEFO POS
            </h1>
            <p className="text-xs text-emerald-100">Sterile Lab Interface · Batch Expiration Guard</p>
          </div>
        </div>
        <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#047857] border border-emerald-400/30">
          APOTEKER: APT. RAKA, S.FARM
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: High-Density FEFO Drug Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari obat, kode batch FEFO..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-[#065F46] focus:outline-none"
              />
            </div>
            <select
              value={selectedDose}
              onChange={(e) => setSelectedDose(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#065F46]"
            >
              <option>3 x 1 Tablet Sesudah Makan</option>
              <option>2 x 1 Tablet Sebelum Makan</option>
              <option>1 x 1 Malam Sebelum Tidur</option>
              <option>Pemakaian Luar (Oles)</option>
            </select>
          </div>

          <div className="space-y-2.5">
            {filteredDrugs.map((d, idx) => (
              <div
                key={d.id}
                className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  idx === 0 ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm text-[#0F172A]">{d.name}</span>
                    {d.rx && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                        RESEP (K)
                      </span>
                    )}
                    {idx === 0 && (
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#065F46] text-white">
                        FEFO #1
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[11px] text-slate-600 mt-1">
                    BATCH: {d.batch} · EXP: {d.exp} · STOK: {d.stock}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <span className="font-mono font-bold text-sm text-[#065F46]">
                    Rp {d.price.toLocaleString('id-ID')}
                  </span>
                  <button
                    type="button"
                    onClick={() => addDrug(d)}
                    className="px-3.5 py-2 rounded-lg bg-[#065F46] hover:bg-[#047857] text-white text-xs font-bold transition"
                  >
                    + Dispense
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Etiket Preview & Checkout */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#065F46]">
              Generator Etiket Obat &amp; Kasir
            </h2>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Nama Pasien"
              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold w-36 text-right"
            />
          </div>

          <div className="space-y-2.5 max-h-[260px] overflow-y-auto">
            {cart.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500">
                Pilih obat dari daftar FEFO di sebelah kiri.
              </p>
            ) : (
              cart.map((c) => (
                <div key={c.id} className="p-3 rounded-xl bg-[#F0FDF4] border border-emerald-200 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-xs text-[#064E3B]">
                      {c.qty}x {c.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCart((p) => p.filter((x) => x.id !== c.id))}
                      className="text-rose-600 text-xs font-bold"
                    >
                      Hapus
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-[#047857]">
                    ETIKET ({patientName}): {c.dose} · Batch {c.batch}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#065F46]">
                    Rp {(c.price * c.qty).toLocaleString('id-ID')}
                  </div>
                </div>
              ))
            )}
          </div>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer text-xs font-semibold">
            <span>Tambahkan Biaya Jasa Racik / Tuslah Apoteker</span>
            <input
              type="checkbox"
              checked={tuslahFee}
              onChange={(e) => setTuslahFee(e.target.checked)}
              className="w-4 h-4 accent-[#065F46]"
            />
          </label>

          <div className="pt-2 border-t border-slate-200 space-y-1 font-mono text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal Obat</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Jasa Tuslah</span>
              <span>Rp {serviceCost.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#065F46] pt-2">
              <span>TOTAL RESEP</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`Struk & Etiket Obat untuk ${patientName} senilai Rp ${total.toLocaleString('id-ID')} siap dicetak.`)}
            className="w-full min-h-[46px] rounded-xl bg-[#065F46] hover:bg-[#047857] text-white font-bold text-sm transition"
          >
            Terbitkan Struk &amp; Cetak Etiket
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. ATELIER LUXE · Luxury Boutique Size-Matrix POS (Obsidian & Champagne Gold)
 * ========================================================================== */
const BOUTIQUE_ITEMS = [
  { id: 'a1', name: 'Cashmere Wool Trench Coat', sku: 'AT-CT-01', price: 4850000, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 'a2', name: 'Italian Suede Chelsea Boots', sku: 'AT-FT-04', price: 3200000, sizes: ['EU40', 'EU41', 'EU42', 'EU43'] },
  { id: 'a3', name: 'Structured Calfskin Tote Bag', sku: 'AT-BG-09', price: 5400000, sizes: ['ONE SIZE'] },
  { id: 'a4', name: 'Silk Jacquard Overshirt', sku: 'AT-SH-12', price: 2150000, sizes: ['S', 'M', 'L'] },
];

export function AtelierLuxePos() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    a1: 'M',
    a2: 'EU42',
    a3: 'ONE SIZE',
    a4: 'L',
  });
  const [vipTier, setVipTier] = useState<'NONE' | 'SILVER' | 'GOLD' | 'BLACK'>('BLACK');
  const [giftBox, setGiftBox] = useState(true);
  const [bag, setBag] = useState<{ key: string; name: string; size: string; price: number; qty: number }[]>([
    { key: 'a1-M', name: 'Cashmere Wool Trench Coat', size: 'M', price: 4850000, qty: 1 },
  ]);

  const discountRate = vipTier === 'BLACK' ? 0.15 : vipTier === 'GOLD' ? 0.1 : vipTier === 'SILVER' ? 0.05 : 0;
  const subtotal = bag.reduce((s, b) => s + b.price * b.qty, 0);
  const discount = Math.round(subtotal * discountRate);
  const netTotal = subtotal - discount;

  const addToBag = (item: (typeof BOUTIQUE_ITEMS)[0]) => {
    const size = selectedSizes[item.id] || item.sizes[0];
    const key = `${item.id}-${size}`;
    setBag((prev) => {
      const idx = prev.findIndex((x) => x.key === key);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { key, name: item.name, size, price: item.price, qty: 1 }];
    });
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#09090B] text-zinc-100 p-4 sm:p-6">
      <div className="max-w-[1440px] mx-auto pb-5 mb-6 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-xl tracking-[0.2em] text-white">ATELIER LUXE</h1>
            <p className="font-mono text-[11px] text-zinc-400">Obsidian Size-Matrix &amp; VIP Clienteling POS</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['NONE', 'SILVER', 'GOLD', 'BLACK'] as const).map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setVipTier(tier)}
              className={`px-3 py-1.5 font-mono text-[11px] font-bold border transition ${
                vipTier === tier
                  ? 'bg-[#D4AF37] text-[#09090B] border-[#D4AF37]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              VIP {tier}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOUTIQUE_ITEMS.map((item) => {
            const currentSize = selectedSizes[item.id] || item.sizes[0];
            return (
              <div key={item.id} className="bg-[#121215] border border-zinc-800 p-5 space-y-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500">{item.sku}</span>
                    <h2 className="font-semibold text-base text-white mt-0.5">{item.name}</h2>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D4AF37]">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-zinc-500 block mb-2">
                    Select Size Matrix
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSizes((p) => ({ ...p, [item.id]: sz }))}
                        className={`px-3 py-1.5 font-mono text-xs border transition ${
                          currentSize === sz
                            ? 'bg-[#D4AF37] text-[#09090B] border-[#D4AF37] font-bold'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addToBag(item)}
                  className="w-full py-2.5 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#09090B] font-mono text-xs font-bold transition"
                >
                  ADD SIZE ({currentSize}) TO CLIENT BAG
                </button>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-4 bg-[#121215] border border-[#D4AF37]/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="font-serif text-lg tracking-wider text-white">CLIENT BAG</h2>
            <span className="font-mono text-[11px] text-[#D4AF37]">
              TIER: {vipTier} ({Math.round(discountRate * 100)}% OFF)
            </span>
          </div>

          <div className="space-y-3 max-h-[260px] overflow-y-auto">
            {bag.length === 0 ? (
              <p className="py-8 text-center font-mono text-xs text-zinc-500">Client bag empty.</p>
            ) : (
              bag.map((b) => (
                <div key={b.key} className="pb-3 border-b border-zinc-800/80 flex justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {b.qty}x {b.name}
                    </div>
                    <div className="font-mono text-[11px] text-zinc-400">Size: {b.size}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-[#D4AF37]">
                      Rp {(b.price * b.qty).toLocaleString('id-ID')}
                    </div>
                    <button
                      type="button"
                      onClick={() => setBag((p) => p.filter((x) => x.key !== b.key))}
                      className="font-mono text-[10px] text-zinc-500 hover:text-rose-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <label className="flex items-center justify-between text-xs text-zinc-300 border border-zinc-800 p-3 bg-zinc-900/50 cursor-pointer">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Complimentary Signature Ribbon Box
            </span>
            <input
              type="checkbox"
              checked={giftBox}
              onChange={(e) => setGiftBox(e.target.checked)}
              className="accent-[#D4AF37]"
            />
          </label>

          <div className="space-y-1.5 font-mono text-xs pt-2 border-t border-zinc-800">
            <div className="flex justify-between text-zinc-400">
              <span>GROSS</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>VIP PRIVILEGE</span>
              <span>- Rp {discount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#D4AF37] pt-2">
              <span>NET SETTLEMENT</span>
              <span>Rp {netTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={bag.length === 0}
            onClick={() =>
              alert(
                `VIP Settlement Rp ${netTotal.toLocaleString('id-ID')} recorded${giftBox ? ' with Signature Gift Box' : ''}.`
              )
            }
            className="w-full min-h-[46px] bg-[#D4AF37] hover:bg-[#c5a12e] text-[#09090B] font-mono font-bold text-xs tracking-wider transition disabled:opacity-40"
          >
            COMPLETE VIP SALE
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 5. PITSTOP PRO · Auto Service Bay & Work Order POS (Gunmetal & Safety Amber)
 * ========================================================================== */
const SERVICE_BAYS = [
  { id: 'BAY 01', plate: 'B 1942 KRN', car: 'Honda Civic Turbo 2023', mechanic: 'Dani', status: 'In Service' },
  { id: 'BAY 02', plate: 'B 8821 VRT', car: 'Toyota Fortuner VRZ', mechanic: 'Arif', status: 'Ready Pickup' },
  { id: 'BAY 03', plate: 'B 2104 ZXA', car: 'Hyundai Ioniq 5', mechanic: 'Reza', status: 'Inspection' },
  { id: 'BAY 04', plate: 'D 404 RYZ', car: 'Yamaha XMAX 250', mechanic: 'Budi', status: 'Tune Up' },
];

const WORKSHOP_CATALOG = [
  { id: 'w1', kind: 'JASA', name: 'Tune Up & Injector Cleaning', price: 285000 },
  { id: 'w2', kind: 'PART', name: 'Oli Mesin Full Synthetic 0W-20 (4L)', price: 480000 },
  { id: 'w3', kind: 'JASA', name: 'Spooring + Balancing 4 Roda', price: 220000 },
  { id: 'w4', kind: 'PART', name: 'Kampas Rem Depan OEM Set', price: 390000 },
  { id: 'w5', kind: 'PART', name: 'Filter Oli + Filter Udara OEM', price: 165000 },
  { id: 'w6', kind: 'JASA', name: 'Diagnostic OBD-II Scanner Check', price: 150000 },
];

export function PitStopBengkelPos() {
  const [activeBay, setActiveBay] = useState(SERVICE_BAYS[0]);
  const [kmInput, setKmInput] = useState('42.500 km');
  const [woItems, setWoItems] = useState<
    { id: string; kind: string; name: string; price: number; qty: number }[]
  >([
    { id: 'w1', kind: 'JASA', name: 'Tune Up & Injector Cleaning', price: 285000, qty: 1 },
    { id: 'w2', kind: 'PART', name: 'Oli Mesin Full Synthetic 0W-20 (4L)', price: 480000, qty: 1 },
  ]);

  const addWoItem = (item: (typeof WORKSHOP_CATALOG)[0]) => {
    setWoItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const laborTotal = woItems.filter((i) => i.kind === 'JASA').reduce((s, i) => s + i.price * i.qty, 0);
  const partsTotal = woItems.filter((i) => i.kind === 'PART').reduce((s, i) => s + i.price * i.qty, 0);
  const total = laborTotal + partsTotal;

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#0F172A] text-slate-100 p-4 sm:p-6">
      <div className="max-w-[1440px] mx-auto bg-[#1E293B] border border-slate-700 rounded-2xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B] text-[#0F172A] flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-mono font-bold text-base sm:text-lg text-white">
              PITSTOP PRO · AUTO SERVICE BAY &amp; SPK POS
            </h1>
            <p className="text-xs text-slate-400">Gunmetal Amber Industrial · Labor vs Parts Split</p>
          </div>
        </div>
        <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-[#0F172A] border border-amber-500/40 text-[#F59E0B]">
          ACTIVE: {activeBay.id} ({activeBay.plate})
        </span>
      </div>

      {/* 4 Hydraulic Service Bays */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {SERVICE_BAYS.map((bay) => {
          const active = activeBay.id === bay.id;
          return (
            <button
              key={bay.id}
              type="button"
              onClick={() => setActiveBay(bay)}
              className={`p-4 rounded-xl border text-left transition ${
                active
                  ? 'bg-[#1E293B] border-[#F59E0B] ring-1 ring-[#F59E0B]'
                  : 'bg-[#1E293B]/60 border-slate-700 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] font-bold">
                <span className="text-[#F59E0B]">{bay.id}</span>
                <span className="text-slate-400">{bay.status}</span>
              </div>
              <div className="font-mono text-base font-bold text-white mt-1">{bay.plate}</div>
              <div className="text-xs text-slate-300 mt-0.5">{bay.car}</div>
              <div className="font-mono text-[10px] text-slate-400 mt-1">Mekanik: {bay.mechanic}</div>
            </button>
          );
        })}
      </div>

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700 rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-mono text-xs font-bold uppercase text-[#F59E0B]">
              Tambah Jasa Mekanik &amp; Suku Cadang OEM
            </h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-slate-400">Odometer:</span>
              <input
                type="text"
                value={kmInput}
                onChange={(e) => setKmInput(e.target.value)}
                className="px-2.5 py-1 rounded bg-[#0F172A] border border-slate-700 font-mono text-xs w-28"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WORKSHOP_CATALOG.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => addWoItem(w)}
                className="p-3.5 rounded-xl bg-[#0F172A] hover:bg-slate-900 border border-slate-700 hover:border-[#F59E0B] text-left transition flex flex-col justify-between gap-2"
              >
                <div>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      w.kind === 'JASA'
                        ? 'bg-amber-500/20 text-[#F59E0B]'
                        : 'bg-sky-500/20 text-sky-300'
                    }`}
                  >
                    {w.kind}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-2">{w.name}</h3>
                </div>
                <span className="font-mono text-xs font-bold text-slate-200">
                  Rp {w.price.toLocaleString('id-ID')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Work Order SPK */}
        <div className="lg:col-span-5 bg-[#1E293B] border border-[#F59E0B]/50 rounded-2xl p-5 space-y-4">
          <div className="border-b border-slate-700 pb-3">
            <div className="font-mono text-xs font-bold text-[#F59E0B]">
              WORK ORDER SPK · {activeBay.plate}
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {activeBay.car} ({kmInput}) · Mekanik: {activeBay.mechanic}
            </div>
          </div>

          <div className="space-y-2 max-h-[260px] overflow-y-auto">
            {woItems.map((i) => (
              <div
                key={i.id}
                className="p-3 rounded-xl bg-[#0F172A] border border-slate-700 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-mono text-[10px] text-[#F59E0B]">{i.kind}</span>
                  <div className="text-xs font-bold text-white">
                    {i.qty}x {i.name}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-slate-200">
                    Rp {(i.price * i.qty).toLocaleString('id-ID')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWoItems((p) => p.filter((x) => x.id !== i.id))}
                    className="text-xs text-rose-400 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5 font-mono text-xs pt-3 border-t border-slate-700">
            <div className="flex justify-between text-slate-400">
              <span>Total Jasa Mekanik</span>
              <span>Rp {laborTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Total Suku Cadang OEM</span>
              <span>Rp {partsTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#F59E0B] pt-2">
              <span>ESTIMASI INVOICE SPK</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={woItems.length === 0}
            onClick={() =>
              alert(
                `Invoice SPK untuk ${activeBay.plate} (${activeBay.car}) senilai Rp ${total.toLocaleString('id-ID')} siap diserahkan (Garansi 30 Hari).`
              )
            }
            className="w-full min-h-[46px] rounded-xl bg-[#F59E0B] hover:bg-amber-400 text-[#0F172A] font-mono font-bold text-sm transition disabled:opacity-40"
          >
            TERBITKAN INVOICE SPK + GARANSI 30 HARI
          </button>
        </div>
      </div>
    </div>
  );
}
