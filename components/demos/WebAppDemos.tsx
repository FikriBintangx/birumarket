'use client';

import { useState } from 'react';

/* ============================================================================
 * 6. PULSEOPS · NOC Telemetry Table, SVG Latency Wave & HTTP Log Stream
 * ========================================================================== */
const NOC_NODES = [
  { id: 'edge-sin', name: 'Core API Gateway (ap-southeast-1)', endpoint: 'https://api.birumarket.web.id/health', lat: 24, status: '200 OK', up: '99.98%', series: [22, 24, 21, 25, 29, 23, 22, 24, 26, 24] },
  { id: 'pg-main', name: 'Supabase Postgres Primary', endpoint: 'pg://soljlsbnphrdkomldckh:5432', lat: 38, status: '200 OK', up: '100.0%', series: [35, 37, 36, 40, 42, 39, 38, 37, 39, 38] },
  { id: 'qris-hook', name: 'Payment Webhook Worker', endpoint: 'https://hooks.birumarket.web.id/qris', lat: 112, status: 'DEGRADED', up: '99.41%', series: [45, 52, 68, 95, 118, 120, 108, 115, 110, 112] },
  { id: 'cdn-edge', name: 'Static Asset Edge Cache', endpoint: 'https://birumarket.web.id/products', lat: 14, status: '200 OK', up: '99.99%', series: [14, 15, 13, 14, 15, 14, 13, 14, 15, 14] },
];

export function PulseOpsDemo() {
  const [nodes, setNodes] = useState(NOC_NODES);
  const [filter, setFilter] = useState<'ALL' | '200 OK' | 'DEGRADED'>('ALL');
  const [logs, setLogs] = useState([
    '[18:04:12] GET /api/products 200 OK · 24ms · edge-sin',
    '[18:04:10] POST /hooks/qris 200 OK · 112ms · queue depth=4',
    '[18:04:05] PG PING 100% · 38ms · pool idle=14/20',
  ]);
  const [incidentInput, setIncidentInput] = useState('');

  const runProbe = () => {
    const next = nodes.map((n) => {
      const delta = Math.floor(Math.random() * 19) - 9;
      const lat = Math.max(10, n.lat + delta);
      const status = lat > 95 ? ('DEGRADED' as const) : ('200 OK' as const);
      return { ...n, lat, status, series: [...n.series.slice(1), lat] };
    });
    setNodes(next);
    const stamp = new Date().toTimeString().slice(0, 8);
    setLogs((l) => [`[${stamp}] PROBE ALL NODES · avg=${Math.round(next.reduce((s, x) => s + x.lat, 0) / next.length)}ms`, ...l.slice(0, 6)]);
  };

  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentInput.trim()) return;
    const stamp = new Date().toTimeString().slice(0, 8);
    setLogs((l) => [`[${stamp}] NOTICE: ${incidentInput.trim()}`, ...l]);
    setIncidentInput('');
  };

  const visible = filter === 'ALL' ? nodes : nodes.filter((n) => n.status === filter);

  return (
    <div className="min-h-[720px] bg-[#080B10] text-slate-200 font-mono text-xs flex flex-col">
      {/* Top Telemetry Bar */}
      <div className="px-5 py-3 bg-[#0E131B] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-emerald-400" />
          <span className="font-bold text-white tracking-wider">PULSEOPS · NOC TELEMETRY CONSOLE</span>
        </div>
        <div className="flex items-center gap-2">
          {(['ALL', '200 OK', 'DEGRADED'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 border ${
                filter === f ? 'border-emerald-400 bg-emerald-500/15 text-emerald-300' : 'border-slate-800 text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
          <button
            type="button"
            onClick={runProbe}
            className="px-3 py-1 bg-emerald-500 text-black font-bold hover:bg-emerald-400"
          >
            [ RUN PROBE ]
          </button>
        </div>
      </div>

      {/* Dense NOC Table */}
      <div className="overflow-x-auto border-b border-slate-800">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#0C1017] text-[11px] text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-4">STATUS</th>
              <th className="py-2.5 px-4">SERVICE NODE</th>
              <th className="py-2.5 px-4">ENDPOINT</th>
              <th className="py-2.5 px-4">LATENCY WAVE (10 SAMPLES)</th>
              <th className="py-2.5 px-4 text-right">RTT</th>
              <th className="py-2.5 px-4 text-right">UPTIME</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {visible.map((n) => {
              const pts = n.series
                .map((v, i) => `${i * 18},${40 - Math.min(36, Math.round((v / 140) * 36))}`)
                .join(' ');
              return (
                <tr key={n.id} className="hover:bg-[#0E131B]">
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold ${
                        n.status === '200 OK'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans font-semibold text-white">{n.name}</td>
                  <td className="py-3 px-4 text-slate-400">{n.endpoint}</td>
                  <td className="py-3 px-4">
                    <svg width="165" height="42" className="overflow-visible">
                      <polyline
                        fill="none"
                        stroke={n.status === '200 OK' ? '#10B981' : '#F59E0B'}
                        strokeWidth="2"
                        points={pts}
                      />
                    </svg>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-white">{n.lat} ms</td>
                  <td className="py-3 px-4 text-right text-slate-300">{n.up}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live Stream Console + Inline Incident Bar */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-4 bg-[#06080C]">
        <div className="space-y-1.5">
          <div className="text-[11px] text-slate-500 uppercase mb-2">LIVE HTTP HEALTH CHECK STREAM</div>
          {logs.map((line, i) => (
            <div key={i} className="text-slate-300 border-l-2 border-slate-700 pl-3 py-0.5">
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={addLog} className="flex gap-2 border-t border-slate-800 pt-4">
          <input
            type="text"
            value={incidentInput}
            onChange={(e) => setIncidentInput(e.target.value)}
            placeholder="Publish incident note or maintenance log..."
            className="flex-1 bg-[#0E131B] border border-slate-700 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none"
          />
          <button type="submit" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold">
            APPEND LOG
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
 * 7. BAGIRATA · Thermal Receipt Paper Splitter with Highlight Markers
 * ========================================================================== */
const PARTICIPANT_COLORS = ['#FEF08A', '#BBF7D0', '#BAE6FD', '#FBCFE8'];

export function BagiRataDemo() {
  const [people, setPeople] = useState(['Biru', 'Raka', 'Nabila']);
  const [activeMarker, setActiveMarker] = useState('Biru');
  const [newName, setNewName] = useState('');
  const [items, setItems] = useState([
    { id: '1', name: 'Wagyu Donburi Bowl', price: 145000, owners: ['Biru', 'Raka'] },
    { id: '2', name: 'Truffle Fries Shareable', price: 68000, owners: ['Biru', 'Raka', 'Nabila'] },
    { id: '3', name: 'Iced Matcha Latte', price: 42000, owners: ['Nabila'] },
    { id: '4', name: 'Sparkling Yuzu Tonic', price: 36000, owners: ['Biru'] },
  ]);
  const [tax, setTax] = useState(true);
  const [service, setService] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleItemForActiveMarker = (itemId: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        const has = it.owners.includes(activeMarker);
        return {
          ...it,
          owners: has ? it.owners.filter((o) => o !== activeMarker) : [...it.owners, activeMarker],
        };
      })
    );
  };

  const mult = 1 + (tax ? 0.11 : 0) + (service ? 0.05 : 0);

  const settlement = people.map((p, idx) => {
    const raw = items.reduce((s, it) => (it.owners.includes(p) && it.owners.length ? s + it.price / it.owners.length : s), 0);
    return { name: p, color: PARTICIPANT_COLORS[idx % PARTICIPANT_COLORS.length], raw: Math.round(raw), total: Math.round(raw * mult) };
  });

  const addFriend = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newName.trim();
    if (!clean || people.includes(clean)) return;
    setPeople((p) => [...p, clean]);
    setActiveMarker(clean);
    setNewName('');
  };

  const addReceiptLine = (e: React.FormEvent) => {
    e.preventDefault();
    const pr = Number(newPrice);
    if (!newItem.trim() || !pr) return;
    setItems((p) => [...p, { id: String(Date.now()), name: newItem.trim(), price: pr, owners: [activeMarker] }]);
    setNewItem('');
    setNewPrice('');
  };

  return (
    <div className="min-h-[720px] bg-[#ECE8DF] text-[#18181B] p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Highlighter Pen Controls */}
      <div className="lg:col-span-3 space-y-4 font-mono text-xs">
        <div className="bg-white p-4 border border-zinc-300 space-y-3">
          <div className="font-bold uppercase text-zinc-500">1. PILIH STABILO PESERTA</div>
          <p className="font-sans text-xs text-zinc-600">
            Pilih nama lalu klik baris menu di struk untuk menandai siapa yang ikut makan.
          </p>
          <div className="space-y-1.5">
            {people.map((p, i) => {
              const col = PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length];
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setActiveMarker(p)}
                  style={{ backgroundColor: activeMarker === p ? col : '#FFFFFF' }}
                  className={`w-full px-3 py-2 text-left border flex items-center justify-between transition ${
                    activeMarker === p ? 'border-black font-bold' : 'border-zinc-300'
                  }`}
                >
                  <span>{p}</span>
                  {activeMarker === p && <span>[ AKTIF ]</span>}
                </button>
              );
            })}
          </div>
          <form onSubmit={addFriend} className="flex gap-1.5 pt-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Tambah nama..."
              className="flex-1 px-2.5 py-1.5 border border-zinc-300 text-xs"
            />
            <button type="submit" className="px-3 py-1.5 bg-black text-white font-bold">
              +
            </button>
          </form>
        </div>

        <div className="bg-white p-4 border border-zinc-300 space-y-2">
          <div className="font-bold uppercase text-zinc-500">2. PAJAK &amp; SERVIS</div>
          <label className="flex items-center justify-between cursor-pointer">
            <span>PPN 11%</span>
            <input type="checkbox" checked={tax} onChange={(e) => setTax(e.target.checked)} />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Service Charge 5%</span>
            <input type="checkbox" checked={service} onChange={(e) => setService(e.target.checked)} />
          </label>
        </div>
      </div>

      {/* Center: Physical Thermal Restaurant Receipt */}
      <div className="lg:col-span-5">
        <div className="bg-[#FFFDF9] border-x border-zinc-300 shadow-lg font-mono text-xs">
          <svg viewBox="0 0 320 10" className="w-full h-2.5 block" preserveAspectRatio="none">
            <polygon
              points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10 110,0 120,10 130,0 140,10 150,0 160,10 170,0 180,10 190,0 200,10 210,0 220,10 230,0 240,10 250,0 260,10 270,0 280,10 290,0 300,10 310,0 320,10 320,10 0,10"
              fill="#ECE8DF"
              transform="scale(1,-1) translate(0,-10)"
            />
          </svg>

          <div className="p-6 space-y-4">
            <div className="text-center border-b border-dashed border-zinc-400 pb-3">
              <div className="text-base font-bold">BAGIRATA RECEIPT SPLITTER</div>
              <div className="text-[11px] text-zinc-500">KLIK BARIS UNTUK MARKER: {activeMarker.toUpperCase()}</div>
            </div>

            <div className="space-y-2">
              {items.map((it) => {
                const isMarkedByActive = it.owners.includes(activeMarker);
                const activeIdx = people.indexOf(activeMarker);
                const markColor = PARTICIPANT_COLORS[Math.max(0, activeIdx) % PARTICIPANT_COLORS.length];
                return (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => toggleItemForActiveMarker(it.id)}
                    style={{ backgroundColor: isMarkedByActive ? markColor : 'transparent' }}
                    className="w-full text-left p-2.5 border-b border-dashed border-zinc-300 transition block"
                  >
                    <div className="flex justify-between font-bold">
                      <span>{it.name}</span>
                      <span>Rp {it.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-1">
                      Dibagi: {it.owners.length > 0 ? it.owners.join(', ') : 'Belum dipilih'}
                    </div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={addReceiptLine} className="flex gap-1.5 pt-2">
              <input
                type="text"
                placeholder="Tambah item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-1 px-2 py-1.5 border border-zinc-300 bg-white"
              />
              <input
                type="number"
                placeholder="Harga"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-24 px-2 py-1.5 border border-zinc-300 bg-white"
              />
              <button type="submit" className="px-3 py-1.5 bg-zinc-900 text-white font-bold">
                +
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right: Sticky Settlement Notes */}
      <div className="lg:col-span-4 space-y-3 font-mono text-xs">
        {settlement.map((s) => (
          <div
            key={s.name}
            style={{ borderLeftColor: '#18181B', backgroundColor: s.color }}
            className="p-4 border border-zinc-800 shadow-sm flex items-center justify-between"
          >
            <div>
              <div className="font-sans font-extrabold text-base">{s.name}</div>
              <div className="text-[11px] text-zinc-700">Menu: Rp {s.raw.toLocaleString('id-ID')}</div>
            </div>
            <div className="text-base font-bold">Rp {s.total.toLocaleString('id-ID')}</div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            const text = settlement.map((s) => `${s.name}: Rp ${s.total.toLocaleString('id-ID')}`).join('\n');
            navigator.clipboard?.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="w-full py-3.5 bg-[#18181B] text-white font-bold hover:bg-zinc-800 transition"
        >
          {copied ? 'RINGKASAN TERSALIN!' : 'SALIN RINGKASAN KE WHATSAPP'}
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
 * 8. KELASKILAT · Split-Pane Interactive Developer Workbook & Quiz
 * ========================================================================== */
const WORKBOOK = [
  {
    id: 'm1',
    title: '01 · Server Actions Payload Integrity',
    prose:
      'Setiap Server Action di Next.js memaparkan endpoint HTTP POST. Karena payload request datang langsung dari browser klien, verifikasi role dan validasi schema wajib dilakukan ulang di dalam server handler.',
    code: [
      'export async function updatePrice(id: string, pin: string) {',
      '  if (pin !== process.env.ADMIN_PIN) {',
      '    throw new Error("Unauthorized");',
      '  }',
      '  return db.products.update({ where: { id } });',
      '}',
    ],
    q: 'Mengapa validasi role harus dijalankan ulang di Server Action?',
    opts: [
      'Payload HTTP request dari browser dapat dimodifikasi oleh attacker',
      'Supaya bundle CSS menjadi lebih kecil',
    ],
    ans: 0,
  },
  {
    id: 'm2',
    title: '02 · PostgreSQL Row-Level Security (RLS)',
    prose:
      'Mengaktifkan RLS pada tabel Supabase memastikan akses API key publik tetap terisolasi per baris data. Tanpa policy SELECT yang eksplisit, database menolak seluruh query baca secara default.',
    code: [
      'ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;',
      'CREATE POLICY "Owner read only" ON public.orders',
      '  FOR SELECT USING (auth.uid() = user_id);',
    ],
    q: 'Apa perilaku default tabel ketika RLS aktif tanpa policy apa pun?',
    opts: [
      'Semua baris terbuka ke publik',
      'Semua akses baca/tulis diblokir (default-deny)',
    ],
    ans: 1,
  },
];

export function KelasKilatDemo() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const mod = WORKBOOK[idx];
  const pick = answers[mod.id];
  const score = WORKBOOK.filter((w) => answers[w.id] === w.ans).length;

  return (
    <div className="min-h-[720px] bg-white text-slate-900 grid grid-cols-1 lg:grid-cols-12">
      {/* Left: Engineering Prose & Code Block */}
      <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex gap-2">
            {WORKBOOK.map((w, i) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setIdx(i)}
                className={`px-3 py-1.5 font-mono text-xs font-bold border ${
                  idx === i ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                MODUL 0{i + 1}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-slate-500">SCORE: {score}/{WORKBOOK.length}</span>
        </div>

        <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
          {mod.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{mod.prose}</p>

        {/* Line-numbered Code Specimen */}
        <div className="bg-[#0F172A] text-slate-100 font-mono text-xs p-5 overflow-x-auto border border-slate-800">
          {mod.code.map((line, i) => (
            <div key={i} className="flex gap-4 leading-6">
              <span className="text-slate-500 select-none w-4 text-right">{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Architecture Checkpoint */}
      <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50 flex flex-col justify-between">
        <div className="space-y-5">
          <span className="font-mono text-xs font-bold uppercase text-indigo-700 block">
            ARCHITECTURE CHECKPOINT
          </span>
          <h2 className="font-bold text-lg text-[#0B2545]">{mod.q}</h2>

          <div className="space-y-3">
            {mod.opts.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setAnswers((a) => ({ ...a, [mod.id]: i }))}
                className={`w-full text-left p-4 border text-sm transition ${
                  pick === i
                    ? i === mod.ans
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                      : 'bg-rose-50 border-rose-500 text-rose-900'
                    : 'bg-white border-slate-300 hover:border-indigo-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {pick !== undefined && (
            <div className={`p-3 font-mono text-xs ${pick === mod.ans ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
              {pick === mod.ans ? 'VERIFIED: Jawaban tepat.' : 'RETRY: Cek ulang penjelasan di kiri.'}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-slate-200 font-mono text-xs text-slate-600 flex justify-between">
          <span>COHORT PROGRESS</span>
          <span>{Math.round((score / WORKBOOK.length) * 100)}% PASSED</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 9. ANTREMED · Hospital TV Queue Board + Touch Kiosk Dispenser
 * ========================================================================== */
const KLINIK_POLIS = [
  { id: 'UMUM', prefix: 'A', num: 14, room: 'Ruang 02', doc: 'dr. Nadia Kusuma, MARS', slots: ['09:30', '10:30', '11:15'] },
  { id: 'GIGI', prefix: 'B', num: 8, room: 'Ruang 05', doc: 'drg. Hendra Wijaya', slots: ['13:00', '14:00', '15:30'] },
  { id: 'ANAK', prefix: 'C', num: 5, room: 'Ruang 03', doc: 'dr. Clarissa Putri, Sp.A', slots: ['10:00', '11:00', '16:00'] },
];

export function AntreMedDemo() {
  const [queues, setQueues] = useState(KLINIK_POLIS);
  const [selectedId, setSelectedId] = useState('UMUM');
  const [slot, setSlot] = useState('10:30');
  const [patient, setPatient] = useState('Bintang Purnomo');
  const [slip, setSlip] = useState<string | null>(null);

  const activePoli = queues.find((q) => q.id === selectedId) || queues[0];

  const advancePoli = (id: string) => {
    setQueues((prev) => prev.map((q) => (q.id === id ? { ...q, num: q.num + 1 } : q)));
  };

  return (
    <div className="min-h-[720px] grid grid-cols-1 lg:grid-cols-12">
      {/* Left: Dark Hospital TV Queue Display */}
      <div className="lg:col-span-5 bg-[#091514] text-teal-50 p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-teal-900 pb-3 font-mono text-xs">
            <span className="text-teal-400 font-bold">MONITOR ANTREAN POLIKLINIK</span>
            <span>LIVE BOARD</span>
          </div>

          <div className="space-y-3">
            {queues.map((q) => (
              <div key={q.id} className="p-4 bg-[#0F2422] border border-teal-800 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-teal-300">POLI {q.id} · {q.room}</div>
                  <div className="text-xs text-teal-100/80 mt-0.5">{q.doc}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-3xl font-extrabold text-white">
                    {q.prefix}-{String(q.num).padStart(3, '0')}
                  </div>
                  <button
                    type="button"
                    onClick={() => advancePoli(q.id)}
                    className="font-mono text-[10px] text-teal-300 underline mt-1"
                  >
                    Panggil Berikutnya
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="font-mono text-[11px] text-teal-300/70 border-t border-teal-900 pt-3">
          Harap menuju ruang pemeriksaan saat nomor tiket Anda muncul pada layar monitor.
        </div>
      </div>

      {/* Right: Touch Kiosk Ticket Dispenser */}
      <div className="lg:col-span-7 bg-[#F0FDFA] text-[#0F172A] p-6 sm:p-8 flex flex-col justify-between gap-6">
        <div className="space-y-5">
          <div>
            <span className="font-mono text-xs font-bold text-[#0F766E]">KIOSK PENDAFTARAN MANDIRI</span>
            <h1 className="font-['Syne',sans-serif] text-2xl font-extrabold mt-1">
              Ambil Tiket Antrean Klinik
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            {queues.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setSelectedId(q.id);
                  setSlot(q.slots[0]);
                }}
                className={`py-3 border font-bold transition ${
                  selectedId === q.id
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-white text-slate-700 border-teal-200'
                }`}
              >
                POLI {q.id}
              </button>
            ))}
          </div>

          <div className="bg-white border border-teal-200 p-5 space-y-3">
            <div className="font-bold text-sm">{activePoli.doc}</div>
            <div className="flex flex-wrap gap-2">
              {activePoli.slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={`px-3.5 py-2 font-mono text-xs border ${
                    slot === s
                      ? 'bg-[#0F766E] text-white border-[#0F766E] font-bold'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {s} WIB
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                placeholder="Nama pasien..."
                className="flex-1 px-3.5 py-2.5 border border-slate-300 text-sm"
              />
              <button
                type="button"
                onClick={() =>
                  setSlip(`${activePoli.prefix}-${String(activePoli.num + 1).padStart(3, '0')}`)
                }
                className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm"
              >
                Cetak Tiket
              </button>
            </div>
          </div>

          {slip && (
            <div className="bg-white border-2 border-dashed border-[#0F766E] p-5 font-mono text-xs space-y-1 max-w-sm">
              <div className="text-slate-500">KLINIK ANTREMED · TIKET PASIEN</div>
              <div className="text-3xl font-extrabold text-[#0F766E] py-1">{slip}</div>
              <div>Pasien: {patient}</div>
              <div>
                Poli {activePoli.id} · {activePoli.doc} · {slot} WIB
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 10. LEGALDRAFT ID · Document Toolbar + Formal A4 Indonesian SPK Paper
 * ========================================================================== */
export function LegalDraftDemo() {
  const [docType, setDocType] = useState<'SPK' | 'NDA'>('SPK');
  const [client, setClient] = useState('PT Nusantara Digital Karya');
  const [scope, setScope] = useState('Pengembangan Aplikasi Kasir POS & Integrasi Supabase');
  const [value, setValue] = useState(25000000);
  const [dpPct, setDpPct] = useState(50);

  const dpAmt = Math.round((value * dpPct) / 100);
  const finalAmt = Math.max(0, value - dpAmt);

  return (
    <div className="min-h-[720px] bg-[#CBD5E1] text-slate-900 flex flex-col">
      {/* Compact Document Toolbar */}
      <div className="bg-[#0B2545] text-white px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold">LEGALDRAFT ID</span>
          {(['SPK', 'NDA'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setDocType(t)}
              className={`px-2.5 py-1 border ${docType === t ? 'bg-white text-[#0B2545] font-bold border-white' : 'border-white/30 text-slate-200'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="px-3.5 py-1 bg-[#1D4ED8] hover:bg-blue-600 text-white font-bold"
        >
          PRINT / SAVE PDF
        </button>
      </div>

      <div className="flex-1 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto w-full">
        {/* Compact Parameter Inspector */}
        <div className="lg:col-span-4 bg-white border border-slate-300 p-4 space-y-3 text-xs">
          <div className="font-mono font-bold text-[#0B2545] border-b border-slate-200 pb-2">
            PARAMETER KLAUSUL
          </div>
          <div>
            <label className="block font-mono text-[10px] text-slate-500 mb-1">NAMA KLIEN</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-slate-500 mb-1">LINGKUP KERJA</label>
            <textarea
              rows={2}
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full px-2.5 py-1.5 border border-slate-300"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-slate-500 mb-1">NILAI KONTRAK (RP)</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value) || 0)}
              className="w-full px-2.5 py-1.5 border border-slate-300 font-mono"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-slate-500 mb-1">TERMIN DP ({dpPct}%)</label>
            <input
              type="range"
              min={20}
              max={80}
              step={5}
              value={dpPct}
              onChange={(e) => setDpPct(Number(e.target.value))}
              className="w-full accent-[#0B2545]"
            />
          </div>
        </div>

        {/* Realistic A4 Paper Sheet */}
        <div className="lg:col-span-8 bg-white shadow-xl border border-slate-300 p-8 sm:p-12 space-y-5 font-serif">
          <div className="text-center border-b-2 border-black pb-4 space-y-1">
            <h1 className="text-xl font-bold tracking-wide">
              {docType === 'SPK'
                ? 'SURAT PERJANJIAN KERJA (SPK)'
                : 'PERJANJIAN KERAHASIAAN (NON-DISCLOSURE AGREEMENT)'}
            </h1>
            <div className="font-mono text-[11px] text-slate-600">
              NOMOR: {docType}/2026/XI/041 · YURISDIKSI REPUBLIK INDONESIA
            </div>
          </div>

          <p className="text-sm leading-relaxed text-justify">
            Perjanjian ini dibuat dan ditandatangani oleh <strong>{client}</strong> (selanjutnya disebut sebagai <strong>Pihak Pertama</strong>) dan Penyedia Jasa Rekayasa Perangkat Lunak (selanjutnya disebut sebagai <strong>Pihak Kedua</strong>) untuk pelaksanaan pekerjaan: <em>{scope}</em>.
          </p>

          <div className="space-y-2 text-sm">
            <div className="font-bold text-center">PASAL 1 · NILAI KONTRAK &amp; TERMIN</div>
            <div className="font-mono text-xs border border-slate-300 p-3.5 bg-slate-50 space-y-1">
              <div>Total Nilai Pekerjaan : Rp {value.toLocaleString('id-ID')}</div>
              <div>Termin I (DP {dpPct}%) : Rp {dpAmt.toLocaleString('id-ID')} (Dibayar saat SPK disepakati)</div>
              <div>Termin II ({100 - dpPct}%) : Rp {finalAmt.toLocaleString('id-ID')} (Dibayar saat UAT &amp; serah terima)</div>
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div className="font-bold text-center">PASAL 2 · HAK KEKAYAAN INTELEKTUAL</div>
            <p className="leading-relaxed text-justify">
              Seluruh kode sumber dan skema basis data diserahkan penuh kepada {client} setelah pembayaran Termin II dilunasi. Kedua pihak wajib menjaga kerahasiaan kredensial sistem selama dan sesudah masa kontrak.
            </p>
          </div>

          <div className="pt-10 grid grid-cols-2 gap-10 text-center text-xs font-sans">
            <div>
              <div className="mb-12">Pihak Pertama,</div>
              <div className="border-t border-black pt-1 font-bold">{client}</div>
            </div>
            <div>
              <div className="mb-12">Pihak Kedua,</div>
              <div className="border-t border-black pt-1 font-bold">Lead Software Engineer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
