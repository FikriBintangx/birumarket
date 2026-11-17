'use client';

import { useState } from 'react';

/* ============================================================================
 * 1. KUROBENTO · Japanese Shokuken Ticket Machine & Perforated Paper Slip
 * ========================================================================== */
interface KuroTicketItem {
  code: string;
  name: string;
  jp: string;
  price: number;
  qty: number;
  spec: string;
}

const SHOKUKEN_BUTTONS = [
  { code: '#01', cat: 'RAMEN', name: 'Kuro Garlic Tonkotsu', jp: '黒マー油豚骨', price: 68000 },
  { code: '#02', cat: 'RAMEN', name: 'Aka Karai Miso Tori', jp: '赤辛味噌鶏', price: 64000 },
  { code: '#03', cat: 'RAMEN', name: 'Truffle Shoyu Mazemen', jp: 'トリュフ混ぜ麺', price: 74000 },
  { code: '#04', cat: 'RAMEN', name: 'Yuzu Shio Clear Broth', jp: '柚子塩ラーメン', price: 62000 },
  { code: '#05', cat: 'YAKITORI', name: 'Negima Charcoal Skewer', jp: 'ねぎま串焼', price: 38000 },
  { code: '#06', cat: 'YAKITORI', name: 'Tsukune Tare + Yolk', jp: '月見つくね', price: 42000 },
  { code: '#07', cat: 'IZAKAYA', name: 'Aburi Salmon Mentaiko', jp: '炙り明太サーモン', price: 78000 },
  { code: '#08', cat: 'DRINK', name: 'Cold Roasted Hojicha', jp: '冷焙じ茶', price: 18000 },
];

export function KuroBentoPos() {
  const [booth, setBooth] = useState('04');
  const [noodle, setNoodle] = useState('KATAME');
  const [oil, setOil] = useState('RICH');
  const [items, setItems] = useState<KuroTicketItem[]>([
    { code: '#01', name: 'Kuro Garlic Tonkotsu', jp: '黒マー油豚骨', price: 68000, qty: 2, spec: 'KATAME · RICH' },
    { code: '#05', name: 'Negima Charcoal Skewer', jp: 'ねぎま串焼', price: 38000, qty: 1, spec: 'CHARCOAL' },
  ]);
  const [stamped, setStamped] = useState(false);

  const pressKey = (btn: (typeof SHOKUKEN_BUTTONS)[0]) => {
    setStamped(false);
    const spec = btn.cat === 'RAMEN' ? `${noodle} · ${oil}` : btn.cat;
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.code === btn.code && i.spec === spec);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { code: btn.code, name: btn.name, jp: btn.jp, price: btn.price, qty: 1, spec }];
    });
  };

  const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);
  const serviceTax = Math.round(subtotal * 0.15);
  const grandTotal = subtotal + serviceTax;

  return (
    <div className="min-h-[720px] bg-[#0C0C0E] text-[#E4E4E7] font-mono rounded-none flex flex-col">
      {/* 36px Status Strip */}
      <div className="h-9 px-4 border-b border-[#27272A] bg-[#141418] flex items-center justify-between text-[11px] tracking-wider">
        <div className="flex items-center gap-3">
          <span className="text-[#E11D48] font-bold">[営業中]</span>
          <span>SHIBUYA RAMEN TERMINAL</span>
          <span className="text-zinc-500 hidden sm:inline">NODE: KDS-02</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">BOOTH #{booth}</span>
          <span className="text-zinc-300">19:42 JST</span>
        </div>
      </div>

      {/* Main Hairline Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Left 80px-style Vertical Booth Rail */}
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
              {b}
            </button>
          ))}
        </div>

        {/* Center Shokuken Physical Push Buttons */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-[#27272A] flex flex-col">
          {/* Noodle / Broth Selector Bar */}
          <div className="p-3 border-b border-[#27272A] bg-[#121216] flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 mr-1">NOODLE:</span>
              {['KATAME', 'FUTSU', 'YAWAME'].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNoodle(n)}
                  className={`px-2.5 py-1 border ${
                    noodle === n
                      ? 'border-[#E11D48] bg-[#E11D48]/20 text-white'
                      : 'border-[#27272A] text-zinc-400'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 mr-1">OIL:</span>
              {['LIGHT', 'RICH', 'BLACK-X'].map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOil(o)}
                  className={`px-2.5 py-1 border ${
                    oil === o
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                      : 'border-[#27272A] text-zinc-400'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* 8-Key Ticket Machine Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2">
            {SHOKUKEN_BUTTONS.map((btn, i) => (
              <button
                key={btn.code}
                type="button"
                onClick={() => pressKey(btn)}
                className={`p-5 text-left border-b border-[#27272A] ${
                  i % 2 === 0 ? 'sm:border-r' : ''
                } hover:bg-[#16161D] active:bg-[#1E1E26] transition flex flex-col justify-between gap-4`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2 py-0.5 bg-[#E11D48] text-white text-[10px] font-bold">
                    {btn.code}
                  </span>
                  <span className="text-[11px] text-zinc-500">{btn.cat}</span>
                </div>
                <div>
                  <div className="text-xs text-zinc-400">{btn.jp}</div>
                  <div className="font-sans font-bold text-base text-white mt-0.5">{btn.name}</div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#27272A]/80 text-xs">
                  <span className="text-zinc-300 font-bold">Rp {btn.price.toLocaleString('id-ID')}</span>
                  <span className="text-[#E11D48] text-[11px]">[ ISSUE TICKET ]</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Cream Perforated Thermal Paper Slip */}
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
                  title="Hanko Stamp"
                >
                  済
                </div>
              </div>

              <div className="space-y-2.5 min-h-[210px]">
                {items.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-8 text-center">
                    Tekan tombol shokuken untuk mencetak item.
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

            {/* SVG Sawtooth Tear Edge */}
            <svg viewBox="0 0 320 12" className="w-full h-3 block" preserveAspectRatio="none">
              <polygon
                points="0,0 10,12 20,0 30,12 40,0 50,12 60,0 70,12 80,0 90,12 100,0 110,12 120,0 130,12 140,0 150,12 160,0 170,12 180,0 190,12 200,0 210,12 220,0 230,12 240,0 250,12 260,0 270,12 280,0 290,12 300,0 310,12 320,0 320,0 0,0"
                fill="#141418"
                transform="scale(1,-1) translate(0,-12)"
              />
            </svg>
          </div>

          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => setStamped(true)}
            className="mt-4 w-full py-3.5 bg-[#E11D48] hover:bg-rose-600 text-white text-xs font-bold tracking-widest transition disabled:opacity-40"
          >
            {stamped ? 'DISPATCHED TO KDS (済)' : 'FIRE TICKET TO KITCHEN'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. BREWLAB · Editorial Linen Menu List + Analog Segmented Modifiers
 * ========================================================================== */
const BREW_ITEMS = [
  { id: 'br1', origin: 'CIWIDEY · WASHED', name: 'Oat Spanish Latte', price: 38000, pastry: false },
  { id: 'br2', origin: 'ETHIOPIA GUJI · NATURAL', name: 'Pour Over V60', price: 42000, pastry: false },
  { id: 'br3', origin: 'UJI KYOTO · CEREMONIAL', name: 'Dirty Matcha Shot', price: 44000, pastry: false },
  { id: 'br4', origin: 'ACEH GAYO · DOUBLE', name: 'Iced Long Black', price: 29000, pastry: false },
  { id: 'br5', origin: 'FRENCH BUTTER', name: 'Pain au Chocolat', price: 31000, pastry: true },
  { id: 'br6', origin: 'BAKED DAILY', name: 'Burnt Basque Slice', price: 39000, pastry: true },
];

export function BrewLabPos() {
  const [expandedId, setExpandedId] = useState<string>('br1');
  const [milk, setMilk] = useState<'Dairy' | 'Oat' | 'Soy'>('Oat');
  const [sweet, setSweet] = useState<'0%' | '50%' | '100%'>('50%');
  const [shot, setShot] = useState<'Single' | 'Double'>('Single');
  const [cupName, setCupName] = useState('BIRU');
  const [paidMethod, setPaidMethod] = useState<string | null>(null);
  const [orders, setOrders] = useState<
    { id: string; name: string; meta: string; price: number; qty: number }[]
  >([
    { id: 'br1-Oat-50%-Single', name: 'Oat Spanish Latte', meta: 'Oat · 50% · Single', price: 44000, qty: 1 },
  ]);

  const commitDrink = (item: (typeof BREW_ITEMS)[0]) => {
    setPaidMethod(null);
    const extra = item.pastry ? 0 : (milk === 'Oat' ? 6000 : milk === 'Soy' ? 4000 : 0) + (shot === 'Double' ? 5000 : 0);
    const meta = item.pastry ? 'Warmed' : `${milk} · ${sweet} · ${shot}`;
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
  };

  const total = orders.reduce((s, o) => s + o.price * o.qty, 0);

  return (
    <div className="min-h-[720px] bg-[#F4EFE6] text-[#1C1917] grid grid-cols-1 lg:grid-cols-12">
      {/* Left 65% Editorial Menu Table */}
      <div className="lg:col-span-8 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#1C1917]/15">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-6 border-b-2 border-[#1C1917]">
          <div>
            <span className="font-mono text-[11px] tracking-widest uppercase text-[#D94E34] font-bold">
              Barista Touch Register · No. 02
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1">
              BrewLab Roastery
            </h1>
          </div>
          <span className="font-mono text-xs text-stone-600">MORNING SHIFT · LINE 1</span>
        </div>

        <div className="divide-y divide-[#1C1917]/15">
          {BREW_ITEMS.map((item) => {
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
                      onClick={() => commitDrink(item)}
                      className="px-4 py-2 bg-[#1C1917] hover:bg-[#D94E34] text-[#F4EFE6] font-mono text-xs font-bold transition"
                    >
                      + ADD
                    </button>
                  </div>
                </div>

                {/* Inline Expanded Modifier Strip */}
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

      {/* Right 35% Full-Height Order Sheet */}
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

          <div className="space-y-3 min-h-[260px]">
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
            <div className="p-2.5 bg-[#1C1917] text-[#F4EFE6] font-mono text-xs text-center">
              SETTLED VIA {paidMethod} · CUP #{cupName || 'GUEST'} QUEUED
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPaidMethod('EXACT CASH')}
              className="py-3.5 border-2 border-[#1C1917] hover:bg-[#1C1917] hover:text-[#F4EFE6] transition"
            >
              EXACT CASH
            </button>
            <button
              type="button"
              onClick={() => setPaidMethod('QRIS TAP')}
              className="py-3.5 bg-[#D94E34] hover:bg-[#be4029] text-white transition"
            >
              QRIS TAP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. APOTEK MEDIKA · High-Density SIMRS Spreadsheet & Blue-White Etiket
 * ========================================================================== */
const SIMRS_DRUGS = [
  { code: 'OBT-001', name: 'Paracetamol 500mg Strip 10 Tab', batch: 'PCM-26A', exp: '2027-08', stock: 120, rx: false, price: 12000 },
  { code: 'OBT-014', name: 'Amoxicillin Trihydrate 500mg Kap', batch: 'AMX-991', exp: '2027-05', stock: 42, rx: true, price: 18500 },
  { code: 'OBT-029', name: 'Cetirizine HCl 10mg Tablet', batch: 'CTZ-104', exp: '2027-12', stock: 64, rx: false, price: 15000 },
  { code: 'OBT-052', name: 'Omeprazole 20mg Kapsul Lepas Lambat', batch: 'OMP-311', exp: '2027-06', stock: 28, rx: true, price: 24000 },
  { code: 'OBT-088', name: 'Cholecalciferol D3 1000 IU Softgel', batch: 'VD3-412', exp: '2028-11', stock: 85, rx: false, price: 45000 },
];

export function ApotekMedikaPos() {
  const [search, setSearch] = useState('');
  const [onlyRx, setOnlyRx] = useState(false);
  const [patient, setPatient] = useState('Tn. Hendra Wijaya');
  const [timing, setTiming] = useState<'Pagi' | 'Siang' | 'Malam'>('Pagi');
  const [mealRule, setMealRule] = useState<'Sesudah Makan' | 'Sebelum Makan'>('Sesudah Makan');
  const [doseQty, setDoseQty] = useState('3 x 1 Tablet');
  const [dispensed, setDispensed] = useState([
    { code: 'OBT-001', name: 'Paracetamol 500mg Strip 10 Tab', batch: 'PCM-26A', qty: 1, price: 12000 },
  ]);

  const rows = SIMRS_DRUGS.filter(
    (d) =>
      (!onlyRx || d.rx) &&
      (d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.code.toLowerCase().includes(search.toLowerCase()) ||
        d.batch.toLowerCase().includes(search.toLowerCase()))
  );

  const addRow = (d: (typeof SIMRS_DRUGS)[0]) => {
    setDispensed((prev) => {
      const idx = prev.findIndex((p) => p.code === d.code);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { code: d.code, name: d.name, batch: d.batch, qty: 1, price: d.price }];
    });
  };

  const subtotal = dispensed.reduce((s, d) => s + d.price * d.qty, 0);

  return (
    <div className="min-h-[720px] bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col">
      {/* Compact Desktop ERP Function Bar */}
      <div className="bg-[#064E3B] text-white px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-bold">SIMRS FARMASI v4.2</span>
          <button
            type="button"
            onClick={() => setOnlyRx(false)}
            className={`px-2 py-0.5 border border-emerald-400/40 ${!onlyRx ? 'bg-emerald-700' : ''}`}
          >
            [F1] Semua Sediaan
          </button>
          <button
            type="button"
            onClick={() => setOnlyRx((v) => !v)}
            className={`px-2 py-0.5 border border-emerald-400/40 ${onlyRx ? 'bg-amber-500 text-black font-bold' : ''}`}
          >
            [F2] Hanya Obat Resep (K)
          </button>
        </div>
        <span>APT. RAKA, S.FARM · SIPA 1998/2026</span>
      </div>

      {/* Top Search Toolbar */}
      <div className="p-3 bg-white border-b border-slate-300 flex flex-wrap items-center gap-3 text-xs">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter kode obat, nama generik, atau nomor batch FEFO..."
          className="flex-1 min-w-[240px] px-3 py-1.5 border border-slate-300 bg-slate-50 font-mono focus:border-[#065F46] focus:outline-none"
        />
        <span className="font-mono text-slate-500">URUTAN: EXP TERDEKAT (FEFO)</span>
      </div>

      {/* High-Density Spreadsheet Table */}
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
                    onClick={() => addRow(r)}
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

      {/* Bottom Split: Prescription Ledger + Indonesian Blue/White Etiket Obat */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        {/* Prescription Table */}
        <div className="lg:col-span-7 p-4 border-b lg:border-b-0 lg:border-r border-slate-300 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-mono text-xs font-bold uppercase text-slate-600">
                Rincian Penyerahan Obat
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
                    <span className="font-bold">{d.qty}x {d.name}</span>
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

          <div className="pt-4 flex flex-wrap gap-2 text-xs">
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

        {/* Authentic Indonesian Apotek Etiket Sticker (Putih/Biru) */}
        <div className="lg:col-span-5 p-4 bg-slate-100 flex flex-col justify-between gap-3">
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
            onClick={() => alert(`Etiket Obat (${patient}: ${doseQty} ${mealRule}) dikirim ke thermal label printer.`)}
            className="w-full py-2.5 bg-[#065F46] hover:bg-[#047857] text-white font-mono text-xs font-bold"
          >
            [F4] CETAK ETIKET &amp; TUTUP TRANSAKSI
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. ATELIER LUXE · Stark Monochrome Fashion Lookbook & Clienteling Dossier
 * ========================================================================== */
const LOOKBOOK = [
  { ref: 'REF. AW26-01', name: 'Double-Faced Cashmere Trench', price: 4850000, sizes: ['36', '38', '40', '42'], swatch: '#1F2937' },
  { ref: 'REF. AW26-04', name: 'Italian Suede Chelsea Boots', price: 3200000, sizes: ['40', '41', '42', '43'], swatch: '#57534E' },
  { ref: 'REF. AW26-09', name: 'Box Calfskin Atelier Tote', price: 5400000, sizes: ['OS'], swatch: '#111111' },
  { ref: 'REF. AW26-12', name: 'Raw Silk Jacquard Shirt', price: 2150000, sizes: ['36', '38', '40'], swatch: '#D6D3D1' },
];

export function AtelierLuxePos() {
  const [sizePick, setSizePick] = useState<Record<string, string>>({
    'REF. AW26-01': '38',
    'REF. AW26-04': '42',
    'REF. AW26-09': 'OS',
    'REF. AW26-12': '40',
  });
  const [vip, setVip] = useState<'REGULAR' | 'SILVER 5%' | 'BLACK 15%'>('BLACK 15%');
  const [bag, setBag] = useState<{ ref: string; name: string; size: string; price: number }[]>([
    { ref: 'REF. AW26-01', name: 'Double-Faced Cashmere Trench', size: '38', price: 4850000 },
  ]);

  const rate = vip === 'BLACK 15%' ? 0.15 : vip === 'SILVER 5%' ? 0.05 : 0;
  const gross = bag.reduce((s, b) => s + b.price, 0);
  const disc = Math.round(gross * rate);
  const net = gross - disc;

  return (
    <div className="min-h-[720px] bg-white text-[#111111] grid grid-cols-1 lg:grid-cols-12 border-t border-[#111111]">
      {/* Left Lookbook Grid */}
      <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-[#111111]">
        <div className="px-6 py-4 border-b border-[#111111] flex items-center justify-between">
          <h1 className="font-serif text-2xl tracking-[0.18em]">ATELIER LUXE</h1>
          <span className="font-mono text-[11px] uppercase tracking-widest">
            Senayan Flagship · Clienteling Terminal
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
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
                  <div
                    className="h-28 w-full border border-[#111111] flex items-end p-3"
                    style={{ backgroundColor: item.swatch }}
                  >
                    <span className="bg-white text-[#111111] px-2 py-0.5 font-mono text-[10px]">
                      SILHOUETTE {idx + 1}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <h2 className="font-serif text-lg font-medium">{item.name}</h2>
                    <span className="font-mono text-xs font-bold shrink-0">
                      IDR {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-1">
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSizePick((p) => ({ ...p, [item.ref]: s }))}
                        className={`flex-1 py-1.5 font-mono text-xs border border-[#111111] transition ${
                          activeSize === s ? 'bg-[#111111] text-white font-bold' : 'bg-white text-[#111111]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setBag((p) => [
                        ...p,
                        { ref: item.ref, name: item.name, size: activeSize, price: item.price },
                      ])
                    }
                    className="w-full py-2.5 border border-[#111111] hover:bg-[#111111] hover:text-white font-mono text-[11px] tracking-widest uppercase transition"
                  >
                    Add Size {activeSize} to Dossier
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Stark Client Dossier */}
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

          <div className="divide-y divide-neutral-300 min-h-[240px]">
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
            disabled={bag.length === 0}
            onClick={() => alert(`Transaction Authorized: IDR ${net.toLocaleString('id-ID')}`)}
            className="w-full py-4 bg-[#111111] hover:bg-neutral-800 text-white font-mono text-xs tracking-[0.2em] font-bold transition disabled:opacity-40"
          >
            AUTHORIZE TRANSACTION
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 5. PITSTOP PRO · Automotive PKB & Realistic License Plate Bay Board
 * ========================================================================== */
const BAYS = [
  { id: 'BAY-01', plate: 'B 1942 KRN', exp: '11·28', model: 'Civic Turbo RS', tech: 'Dani S.', state: 'LIFT UP' },
  { id: 'BAY-02', plate: 'B 8821 VRT', exp: '04·27', model: 'Fortuner VRZ', tech: 'Arif P.', state: 'FINAL QC' },
  { id: 'BAY-03', plate: 'B 2104 ZXA', exp: '09·29', model: 'Ioniq 5 Signature', tech: 'Reza M.', state: 'SCANNER' },
  { id: 'BAY-04', plate: 'D 404 RYZ', exp: '07·28', model: 'XMAX 250 Tech', tech: 'Budi H.', state: 'TUNE UP' },
];

const PKB_LABOR = [
  { id: 'L1', name: 'Tune Up & GDI Injector Cleaning', hours: '1.5 Jam', price: 285000 },
  { id: 'L2', name: 'Spooring 3D + Balancing 4 Roda', hours: '1.0 Jam', price: 220000 },
  { id: 'L3', name: 'Diagnostic OBD-II Fault Scan', hours: '0.5 Jam', price: 150000 },
];

const PKB_PARTS = [
  { id: 'P1', partNo: 'OEM-0W20-4L', name: 'Oli Sintetik 0W-20 API SP (4 Liter)', price: 480000 },
  { id: 'P2', partNo: 'OEM-BRK-F02', name: 'Kampas Rem Depan Keramik Set', price: 390000 },
  { id: 'P3', partNo: 'OEM-FLT-091', name: 'Filter Oli + Filter Udara Kabin', price: 165000 },
];

export function PitStopBengkelPos() {
  const [bay, setBay] = useState(BAYS[0]);
  const [odometer, setOdometer] = useState('42.580');
  const [workItems, setWorkItems] = useState<
    { id: string; section: 'JASA' | 'PART'; label: string; meta: string; price: number }[]
  >([
    { id: 'L1', section: 'JASA', label: 'Tune Up & GDI Injector Cleaning', meta: '1.5 Jam', price: 285000 },
    { id: 'P1', section: 'PART', label: 'Oli Sintetik 0W-20 API SP (4 Liter)', meta: 'OEM-0W20-4L', price: 480000 },
  ]);

  const addLine = (section: 'JASA' | 'PART', id: string, label: string, meta: string, price: number) => {
    setWorkItems((p) => [...p, { id: `${id}-${Date.now()}`, section, label, meta, price }]);
  };

  const total = workItems.reduce((s, w) => s + w.price, 0);

  return (
    <div className="min-h-[720px] bg-[#14181F] text-slate-100 font-sans flex flex-col">
      {/* Hazard Stripe Header */}
      <div
        className="h-2 w-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #F59E0B 0 12px, #111827 12px 24px)',
        }}
      />
      <div className="px-5 py-3 bg-[#1B222C] border-b border-slate-700 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <span className="font-bold text-[#F59E0B]">PITSTOP PRO · PERINTAH KERJA BENGKEL (PKB)</span>
        <span className="text-slate-300">WORKSHOP CONTROL · GARANSI SERVIS 30 HARI</span>
      </div>

      {/* 4 Lift Bay Plate Board */}
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
              {/* Realistic Indonesian Black License Plate */}
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

      {/* Main Split: Labor/Parts Catalog vs PKB Form */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-6 p-5 border-b lg:border-b-0 lg:border-r border-slate-700 space-y-5">
          <div>
            <h2 className="font-mono text-xs font-bold text-[#F59E0B] uppercase mb-2.5">
              Bagian A · Jasa Mekanik &amp; Flat-Rate
            </h2>
            <div className="border border-slate-700 divide-y divide-slate-700 bg-[#1B222C]">
              {PKB_LABOR.map((l) => (
                <div key={l.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-white">{l.name}</div>
                    <div className="font-mono text-[11px] text-slate-400">Estimasi: {l.hours}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addLine('JASA', l.id, l.name, l.hours, l.price)}
                    className="px-3 py-1.5 bg-[#F59E0B] text-black font-mono font-bold text-[11px] shrink-0"
                  >
                    + Rp {l.price.toLocaleString('id-ID')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-xs font-bold text-sky-400 uppercase mb-2.5">
              Bagian B · Suku Cadang OEM
            </h2>
            <div className="border border-slate-700 divide-y divide-slate-700 bg-[#1B222C]">
              {PKB_PARTS.map((pt) => (
                <div key={pt.id} className="p-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-white">{pt.name}</div>
                    <div className="font-mono text-[11px] text-slate-400">{pt.partNo}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => addLine('PART', pt.id, pt.name, pt.partNo, pt.price)}
                    className="px-3 py-1.5 bg-sky-500 text-black font-mono font-bold text-[11px] shrink-0"
                  >
                    + Rp {pt.price.toLocaleString('id-ID')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right PKB Document Sheet */}
        <div className="lg:col-span-6 p-5 bg-[#0F1319] flex flex-col justify-between gap-4">
          <div className="bg-white text-slate-900 p-5 border-t-4 border-[#F59E0B] space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-300 pb-3">
              <div>
                <div className="font-mono text-[10px] font-bold text-slate-500">
                  FORMULIR PERINTAH KERJA BENGKEL
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
                  <th className="py-1.5 px-2">URAIAN PEKERJAAN / PART</th>
                  <th className="py-1.5 px-2 text-right">BIAYA</th>
                  <th className="py-1.5 px-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {workItems.map((w) => (
                  <tr key={w.id}>
                    <td className="py-2 px-2 font-mono font-bold">{w.section}</td>
                    <td className="py-2 px-2">
                      <div className="font-semibold">{w.label}</div>
                      <div className="font-mono text-[10px] text-slate-500">{w.meta}</div>
                    </td>
                    <td className="py-2 px-2 font-mono text-right font-bold">
                      {w.price.toLocaleString('id-ID')}
                    </td>
                    <td className="py-2 px-1 text-right">
                      <button
                        type="button"
                        onClick={() => setWorkItems((p) => p.filter((x) => x.id !== w.id))}
                        className="text-rose-700 font-mono text-[10px] underline"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-baseline font-mono">
              <span className="text-xs font-bold">TOTAL TAGIHAN PKB</span>
              <span className="text-lg font-extrabold">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`PKB ${bay.plate} diterbitkan: Rp ${total.toLocaleString('id-ID')} (Garansi 30 Hari).`)}
            className="w-full py-3.5 bg-[#F59E0B] hover:bg-amber-400 text-black font-mono font-bold text-xs tracking-wider"
          >
            TERBITKAN INVOICE PKB + GARANSI 30 HARI
          </button>
        </div>
      </div>
    </div>
  );
}
