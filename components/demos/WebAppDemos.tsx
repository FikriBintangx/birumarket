'use client';

import { useState } from 'react';
import { MultiPageDemoProps } from './PosDemos';

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
 * 6. PULSEOPS · 3-Page Public Status Portal, NOC Telemetry & Incident Manager
 * ========================================================================== */
const NOC_NODES = [
  {
    id: 'edge-sin',
    name: 'Core API Gateway (ap-southeast-1)',
    endpoint: 'https://api.birumarket.web.id/health',
    region: 'Singapore AWS ap-southeast-1',
    sla: '99.98%',
    lat: 24,
    status: '200 OK',
    spec: 'Envoy Edge Proxy + Rate Limiter Redis Cluster (10k req/sec capacity)',
    series: [22, 24, 21, 25, 29, 23, 22, 24, 26, 24],
  },
  {
    id: 'pg-main',
    name: 'Supabase PostgreSQL Primary',
    endpoint: 'pg://soljlsbnphrdkomldckh:5432',
    region: 'Singapore Dedicated NVMe',
    sla: '100.0%',
    lat: 38,
    status: '200 OK',
    spec: 'PostgreSQL 16 + PgBouncer Connection Pooler (Max 400 connections)',
    series: [35, 37, 36, 40, 42, 39, 38, 37, 39, 38],
  },
  {
    id: 'qris-hook',
    name: 'Payment QRIS Webhook Worker',
    endpoint: 'https://hooks.birumarket.web.id/qris',
    region: 'Jakarta Edge Node',
    sla: '99.41%',
    lat: 112,
    status: 'DEGRADED',
    spec: 'Idempotent Callback Verifier HMAC-SHA256 + Dead-Letter Queue Retry',
    series: [45, 52, 68, 95, 118, 120, 108, 115, 110, 112],
  },
  {
    id: 'cdn-edge',
    name: 'Static Asset & Image CDN',
    endpoint: 'https://birumarket.web.id/products',
    region: 'Global Anycast Edge',
    sla: '99.99%',
    lat: 14,
    status: '200 OK',
    spec: 'HTTP/3 Brotli Asset Delivery + Automatic WebP Cache',
    series: [14, 15, 13, 14, 15, 14, 13, 14, 15, 14],
  },
];

export function PulseOpsDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [nodes, setNodes] = useState(NOC_NODES);
  const [previewNode, setPreviewNode] = useState<(typeof NOC_NODES)[0] | null>(null);
  const [filter, setFilter] = useState<'ALL' | '200 OK' | 'DEGRADED'>('ALL');
  const [logs, setLogs] = useState([
    '[18:04:12] GET /api/products 200 OK · 24ms · edge-sin',
    '[18:04:10] POST /hooks/qris 200 OK · 112ms · queue depth=4',
    '[18:04:05] PG PING 100% · 38ms · pool idle=14/20',
  ]);
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-204',
      title: 'Elevated Latency on Payment QRIS Webhook Worker',
      state: 'INVESTIGATING',
      time: '18 Nov 2026 · 08:45 WIB',
      detail: 'Peningkatan waktu respons dari gateway callback pihak ketiga sebesar +65ms. Antrean retry tetap berjalan normal tanpa transaksi hilang.',
    },
    {
      id: 'INC-199',
      title: 'Scheduled PostgreSQL Index Maintenance',
      state: 'RESOLVED',
      time: '15 Nov 2026 · 02:00 WIB',
      detail: 'Re-indexing tabel katalog selesai dalam 4 menit dengan zero-downtime read replica.',
    },
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
    setLogs((l) => [
      `[${stamp}] PROBE ALL NODES · avg=${Math.round(next.reduce((s, x) => s + x.lat, 0) / next.length)}ms`,
      ...l.slice(0, 6),
    ]);
  };

  const addIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentInput.trim()) return;
    setIncidents((prev) => [
      {
        id: `INC-${Math.floor(205 + Math.random() * 50)}`,
        title: incidentInput.trim(),
        state: 'INVESTIGATING',
        time: 'Baru saja',
        detail: 'Dipublikasikan dari konsol operator NOC ke halaman status publik.',
      },
      ...prev,
    ]);
    setIncidentInput('');
  };

  const visible = filter === 'ALL' ? nodes : nodes.filter((n) => n.status === filter);

  return (
    <div className="min-h-[780px] bg-[#080B10] text-slate-200 font-mono text-xs flex flex-col justify-between">
      <div>
        <header className="px-5 py-3.5 bg-[#0E131B] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-400" />
            <div>
              <div className="font-bold text-white text-sm tracking-wider">
                PULSEOPS · INFRASTRUCTURE STATUS &amp; NOC
              </div>
              <div className="text-[10px] text-slate-400">
                MULTI-REGION UPTIME TELEMETRY · SLA 99.95%
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border font-bold ${
                page === 1
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-[#080B10] text-slate-300 border-slate-800'
              }`}
            >
              01 · Public Status Page
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border font-bold ${
                page === 2
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-[#080B10] text-slate-300 border-slate-800'
              }`}
            >
              02 · Konsol Ping NOC
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border font-bold ${
                page === 3
                  ? 'bg-emerald-500 text-black border-emerald-500'
                  : 'bg-[#080B10] text-slate-300 border-slate-800'
              }`}
            >
              03 · Insiden &amp; Webhook ({incidents.length})
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: PUBLIC STATUS PORTAL & NODE PREVIEW */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-6 bg-[#0E131B] border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold">
                  [ HALAMAN 1 · CUSTOMER-FACING PUBLIC STATUS PAGE ]
                </span>
                <h1 className="font-sans text-2xl font-extrabold text-white mt-1">
                  3 dari 4 Cluster Berjalan Optimal (1 Degraded Latency)
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-4 py-2.5 bg-emerald-500 text-black font-bold"
              >
                BUKA KONSOL PING NOC (HAL 2) →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nodes.map((n) => (
                <div key={n.id} className="p-5 bg-[#0E131B] border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-sans font-bold text-base text-white">{n.name}</div>
                      <div className="text-[11px] text-slate-400">{n.region}</div>
                    </div>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold ${
                        n.status === '200 OK'
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {n.status} · {n.lat}ms
                    </span>
                  </div>

                  {/* 24-Slot Uptime Bar */}
                  <div className="grid grid-cols-24 gap-1">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-6 ${
                          n.status === 'DEGRADED' && i > 20 ? 'bg-amber-400' : 'bg-emerald-500'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-slate-400">30-Day Uptime: {n.sla}</span>
                    <button
                      type="button"
                      onClick={() => setPreviewNode(n)}
                      className="px-3 py-1 border border-slate-700 hover:border-emerald-400 text-white"
                    >
                      Preview Spesifikasi Node →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {previewNode && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="bg-[#0E131B] border-2 border-emerald-500 max-w-lg w-full p-6 space-y-4">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                    <div>
                      <div className="text-emerald-400 font-bold">{previewNode.id}</div>
                      <h3 className="font-sans text-xl font-bold text-white mt-1">{previewNode.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewNode(null)}
                      className="border border-slate-700 px-2.5 py-1"
                    >
                      TUTUP ✕
                    </button>
                  </div>
                  <div className="space-y-2 text-slate-300">
                    <div><strong>ENDPOINT:</strong> {previewNode.endpoint}</div>
                    <div><strong>DATA CENTER:</strong> {previewNode.region}</div>
                    <div><strong>ARSITEKTUR:</strong> {previewNode.spec}</div>
                    <div><strong>CURRENT RTT:</strong> {previewNode.lat} ms ({previewNode.status})</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewNode(null);
                      setPage(2);
                    }}
                    className="w-full py-2.5 bg-emerald-500 text-black font-bold"
                  >
                    UJI PING NODE INI DI KONSOL NOC →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: NOC LIVE TELEMETRY & PING CONSOLE */}
        {page === 2 && (
          <div>
            <div className="px-5 py-3 bg-[#0C1017] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex gap-2">
                {(['ALL', '200 OK', 'DEGRADED'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-2.5 py-1 border ${
                      filter === f
                        ? 'border-emerald-400 bg-emerald-500/15 text-emerald-300'
                        : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={runProbe}
                className="px-3.5 py-1.5 bg-emerald-500 text-black font-bold hover:bg-emerald-400"
              >
                [ RUN LIVE PING PROBE ]
              </button>
            </div>

            <div className="overflow-x-auto border-b border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#0C1017] text-[11px] text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">SERVICE NODE</th>
                    <th className="py-2.5 px-4">ENDPOINT</th>
                    <th className="py-2.5 px-4">LATENCY WAVE (10 SAMPLES)</th>
                    <th className="py-2.5 px-4 text-right">RTT</th>
                    <th className="py-2.5 px-4 text-right">SLA</th>
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
                        <td className="py-3 px-4 text-right text-slate-300">{n.sla}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-[#06080C] space-y-2">
              <div className="text-[11px] text-slate-500 uppercase">LIVE HTTP HEALTH CHECK STREAM</div>
              {logs.map((line, i) => (
                <div key={i} className="text-slate-300 border-l-2 border-emerald-500 pl-3 py-0.5">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 3: INCIDENT POSTMORTEM & WEBHOOK ALERTS */}
        {page === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <form onSubmit={addIncident} className="bg-[#0E131B] border border-slate-800 p-5 space-y-3">
              <div className="text-emerald-400 font-bold">
                [ HALAMAN 3 · PUBLIKASI UPDATE INSIDEN &amp; NOTIFIKASI WEBHOOK ]
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={incidentInput}
                  onChange={(e) => setIncidentInput(e.target.value)}
                  placeholder="Tulis judul laporan insiden atau jadwal pemeliharaan server..."
                  className="flex-1 bg-[#080B10] border border-slate-700 px-3.5 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                />
                <button type="submit" className="px-5 py-2.5 bg-emerald-500 text-black font-bold">
                  PUBLISH INCIDENT
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-5 bg-[#0E131B] border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-bold text-base text-white">
                      {inc.id} · {inc.title}
                    </span>
                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      {inc.state}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-slate-300">{inc.detail}</p>
                  <div className="text-[10px] text-slate-500">{inc.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-800 bg-[#0E131B] px-6 py-4 flex flex-wrap justify-between gap-4 text-[11px] text-slate-400">
        <span>PULSEOPS TELEMETRY ENGINE · MULTI-REGION HEALTH MONITOR</span>
        <div className="flex gap-4 text-emerald-400 font-bold">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Status Publik</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Konsol NOC</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Log Insiden</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 7. BAGIRATA · 3-Page Receipt Preset Gallery, Split Studio & QRIS Settlement
 * ========================================================================== */
const PARTICIPANT_COLORS = ['#FEF08A', '#BBF7D0', '#BAE6FD', '#FBCFE8'];

const RECEIPT_PRESETS = [
  {
    id: 'preset-izakaya',
    venue: 'Senopati Japanese Grill & Izakaya',
    tag: 'MAKAN MALAM KANTOR',
    desc: 'Paket struk makan malam Jepang bersama teman kantor dengan 4 menu shareable & minuman.',
    items: [
      { id: '1', name: 'Wagyu Donburi Truffle Bowl', price: 145000, owners: ['Biru', 'Raka'] },
      { id: '2', name: 'Truffle Fries Shareable Platter', price: 68000, owners: ['Biru', 'Raka', 'Nabila'] },
      { id: '3', name: 'Uji Iced Matcha Latte', price: 42000, owners: ['Nabila'] },
      { id: '4', name: 'Sparkling Yuzu Highball', price: 36000, owners: ['Biru'] },
    ],
  },
  {
    id: 'preset-coffee',
    venue: 'Kemang Specialty Coffee & Brunch',
    tag: 'NONGKRONG WEEKEND',
    desc: 'Paket struk brunch akhir pekan berisi kopi susu oat, croissant, dan platter sarapan.',
    items: [
      { id: 'c1', name: '2x Iced Oat Spanish Latte', price: 88000, owners: ['Biru', 'Nabila'] },
      { id: 'c2', name: 'Smoked Beef Eggs Benedict', price: 95000, owners: ['Raka'] },
      { id: 'c3', name: 'Churros Cinnamon Sharing Basket', price: 54000, owners: ['Biru', 'Raka', 'Nabila'] },
    ],
  },
  {
    id: 'preset-bbq',
    venue: 'PIK Korean Charcoal BBQ House',
    tag: 'PATUNGAN GRUP',
    desc: 'Paket struk barbekyu Korea lengkap dengan daging shortplate, kimchi jjigae, dan ocha.',
    items: [
      { id: 'b1', name: 'Prime Karubi Shortplate Set (500g)', price: 260000, owners: ['Biru', 'Raka', 'Nabila'] },
      { id: 'b2', name: 'Hot Stone Kimchi Jjigae Stew', price: 85000, owners: ['Biru', 'Raka'] },
      { id: 'b3', name: '3x Refill Cold Corn Tea', price: 45000, owners: ['Biru', 'Raka', 'Nabila'] },
    ],
  },
];

export function BagiRataDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [people, setPeople] = useState(['Biru', 'Raka', 'Nabila']);
  const [paidStatus, setPaidStatus] = useState<Record<string, boolean>>({ Biru: true });
  const [activeMarker, setActiveMarker] = useState('Biru');
  const [newName, setNewName] = useState('');
  const [items, setItems] = useState(RECEIPT_PRESETS[0].items);
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
    const raw = items.reduce(
      (s, it) => (it.owners.includes(p) && it.owners.length ? s + it.price / it.owners.length : s),
      0
    );
    return {
      name: p,
      color: PARTICIPANT_COLORS[idx % PARTICIPANT_COLORS.length],
      raw: Math.round(raw),
      total: Math.round(raw * mult),
    };
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
    <div className="min-h-[780px] bg-[#ECE8DF] text-[#18181B] flex flex-col justify-between">
      <div>
        <header className="bg-white border-b-2 border-[#18181B] px-6 py-4 flex flex-wrap items-center justify-between gap-4 font-mono">
          <div>
            <span className="text-[10px] font-bold bg-[#FEF08A] px-2 py-0.5 border border-black">
              NEO-BRUTALIST RECEIPT SPLITTER
            </span>
            <div className="font-sans font-extrabold text-xl mt-1">
              BAGIRATA.ID · PATUNGAN TANPA RIBET
            </div>
          </div>

          <nav className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border-2 border-black ${
                page === 1 ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              01 · Galeri Struk &amp; Menu
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border-2 border-black ${
                page === 2 ? 'bg-[#FEF08A] text-black' : 'bg-white text-black'
              }`}
            >
              02 · Studio Stabilo Struk ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border-2 border-black ${
                page === 3 ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              03 · Kartu Tagihan &amp; QRIS
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: GALERI TEMPLATE STRUK RESTO */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white border-2 border-black p-6 space-y-2">
              <span className="font-mono text-xs font-bold">
                [ HALAMAN 1 · PILIH TEMPLATE STRUK RESTORAN ATAU PREVIEW MENU ]
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Pilih Paket Struk Nongkrong untuk Langsung Dihitung Proporsional.
              </h1>
              <p className="text-sm text-zinc-600">
                Setiap preset memuat daftar menu beserta harga asli. Klik <strong>Muat ke Studio Struk</strong> untuk menandai siapa makan apa dengan stabilo warna.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {RECEIPT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white border-2 border-black p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-[#BBF7D0] border border-black">
                      {preset.tag}
                    </span>
                    <h2 className="font-extrabold text-lg">{preset.venue}</h2>
                    <p className="text-xs text-zinc-600">{preset.desc}</p>
                    <div className="border-t border-dashed border-zinc-300 pt-2 space-y-1.5 font-mono text-xs">
                      {preset.items.map((it) => (
                        <div key={it.id} className="flex justify-between">
                          <span className="truncate pr-2">{it.name}</span>
                          <span className="font-bold">Rp {it.price.toLocaleString('id-ID')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setItems(preset.items);
                      setPage(2);
                    }}
                    className="w-full py-2.5 bg-black text-white font-mono text-xs font-bold hover:bg-zinc-800"
                  >
                    MUAT KE STUDIO STRUK (HAL 2) →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 2: STUDIO STABILO SPLIT BILL */}
        {page === 2 && (
          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-3 space-y-4 font-mono text-xs">
              <div className="bg-white p-4 border-2 border-black space-y-3">
                <div className="font-bold uppercase text-zinc-500">1. PILIH STABILO PESERTA</div>
                <p className="font-sans text-xs text-zinc-600">
                  Pilih nama lalu klik baris menu di struk tengah untuk menandai siapa yang ikut makan.
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
                    placeholder="Tambah teman..."
                    className="flex-1 px-2.5 py-1.5 border border-zinc-300 text-xs"
                  />
                  <button type="submit" className="px-3 py-1.5 bg-black text-white font-bold">
                    +
                  </button>
                </form>
              </div>

              <div className="bg-white p-4 border-2 border-black space-y-2">
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

            <div className="lg:col-span-5">
              <div className="bg-[#FFFDF9] border-2 border-black shadow-lg font-mono text-xs p-6 space-y-4">
                <div className="text-center border-b border-dashed border-zinc-400 pb-3">
                  <div className="text-base font-bold">BAGIRATA RECEIPT SPLITTER</div>
                  <div className="text-[11px] text-zinc-500">
                    KLIK BARIS UNTUK MARKER: {activeMarker.toUpperCase()}
                  </div>
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

            <div className="lg:col-span-4 space-y-3 font-mono text-xs">
              {settlement.map((s) => (
                <div
                  key={s.name}
                  style={{ backgroundColor: s.color }}
                  className="p-4 border-2 border-black flex items-center justify-between"
                >
                  <div>
                    <div className="font-sans font-extrabold text-base">{s.name}</div>
                    <div className="text-[11px] text-zinc-700">
                      Pokok: Rp {s.raw.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="text-base font-bold">Rp {s.total.toLocaleString('id-ID')}</div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setPage(3)}
                className="w-full py-3.5 bg-black text-white font-bold hover:bg-zinc-800 transition"
              >
                TERBITKAN KARTU TAGIHAN &amp; QRIS (HAL 3) →
              </button>
            </div>
          </div>
        )}

        {/* HALAMAN 3: KARTU SETTLEMENT & STATUS LUNAS */}
        {page === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white border-2 border-black p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold">
                  [ HALAMAN 3 · TRACKER PELUNASAN PATUNGAN &amp; WHATSAPP SHARE ]
                </span>
                <h2 className="text-2xl font-extrabold mt-1">
                  Tandai Teman yang Sudah Transfer QRIS / BCA
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  const text = settlement
                    .map((s) => `${s.name}: Rp ${s.total.toLocaleString('id-ID')} (${paidStatus[s.name] ? 'LUNAS' : 'BELUM'})`)
                    .join('\n');
                  navigator.clipboard?.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-5 py-2.5 bg-black text-white font-mono text-xs font-bold"
              >
                {copied ? 'TERSALIN KE CLIPBOARD!' : 'SALIN REKAP KE GRUP WHATSAPP'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {settlement.map((s) => {
                const isPaid = Boolean(paidStatus[s.name]);
                return (
                  <div
                    key={s.name}
                    style={{ backgroundColor: s.color }}
                    className="p-5 border-2 border-black space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-xl">{s.name}</span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white border border-black">
                        {isPaid ? 'SUDAH LUNAS ✓' : 'MENUNGGU TRANSFER'}
                      </span>
                    </div>
                    <div className="font-mono text-2xl font-bold">
                      Rp {s.total.toLocaleString('id-ID')}
                    </div>
                    <button
                      type="button"
                      onClick={() => setPaidStatus((p) => ({ ...p, [s.name]: !isPaid }))}
                      className="w-full py-2 bg-white border-2 border-black font-mono text-xs font-bold"
                    >
                      {isPaid ? 'Tandai Belum Bayar' : 'Tandai Sudah Lunas ✓'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t-2 border-black bg-white px-6 py-4 flex flex-wrap justify-between gap-4 font-mono text-[11px]">
        <span>BAGIRATA SPLIT BILL · PPN 11% &amp; SERVICE PROPORTIONAL ENGINE</span>
        <div className="flex gap-4 font-bold">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Galeri Menu</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Studio Struk</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Kartu Tagihan</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 8. KELASKILAT · 3-Page Bootcamp Catalog, Code Classroom & Certificate LMS
 * ========================================================================== */
const WORKBOOK = [
  {
    id: 'm1',
    track: 'NEXT.JS 16 SECURITY',
    level: 'Intermediate · 6 Jam',
    title: '01 · Server Actions Payload Integrity',
    syllabus: ['Threat Modeling Server Actions', 'Zod Schema Validation', 'Role Guard & Session Check'],
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
    track: 'POSTGRESQL & SUPABASE',
    level: 'Advanced · 8 Jam',
    title: '02 · PostgreSQL Row-Level Security (RLS)',
    syllabus: ['Default-Deny Policy Architecture', 'JWT Claims in SQL Policies', 'Service Role Key Isolation'],
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

export function KelasKilatDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [idx, setIdx] = useState(0);
  const [studentName, setStudentName] = useState('Fikri Bintang Purnomo');
  const [answers, setAnswers] = useState<Record<string, number>>({ m1: 0 });
  const mod = WORKBOOK[idx];
  const pick = answers[mod.id];
  const score = WORKBOOK.filter((w) => answers[w.id] === w.ans).length;

  return (
    <div className="min-h-[780px] bg-white text-slate-900 flex flex-col justify-between">
      <div>
        <header className="bg-[#0B2545] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] text-blue-300 font-bold">
              INTERACTIVE ENGINEERING COHORT &amp; LMS
            </span>
            <div className="font-['Syne',sans-serif] text-xl font-extrabold">
              KELASKILAT ACADEMY
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border ${
                page === 1 ? 'bg-white text-[#0B2545] border-white' : 'border-white/30 text-white'
              }`}
            >
              01 · Katalog Bootcamp &amp; Silabus
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border ${
                page === 2 ? 'bg-white text-[#0B2545] border-white' : 'border-white/30 text-white'
              }`}
            >
              02 · Classroom &amp; Kuis Kode
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border ${
                page === 3 ? 'bg-white text-[#0B2545] border-white' : 'border-white/30 text-white'
              }`}
            >
              03 · Sertifikat Kelulusan ({score}/{WORKBOOK.length})
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: KATALOG BOOTCAMP & PREVIEW KURIKULUM */}
        {page === 1 && (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-[#1D4ED8]">
                [ HALAMAN 1 · STOREFRONT KATALOG MODUL &amp; PREVIEW SILABUS ]
              </span>
              <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
                Kurikulum Rekayasa Perangkat Lunak Berbasis Studi Kasus Produksi.
              </h1>
              <p className="text-sm text-slate-600">
                Pilih modul di bawah untuk meninjau topik bahasan dan langsung masuk ke ruang latihan koding interaktif.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKBOOK.map((w, i) => (
                <div key={w.id} className="border border-slate-300 p-6 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="font-bold text-[#1D4ED8]">{w.track}</span>
                      <span className="text-slate-500">{w.level}</span>
                    </div>
                    <h2 className="font-['Syne',sans-serif] text-xl font-extrabold text-[#0B2545]">
                      {w.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{w.prose}</p>
                    <div className="pt-2 space-y-1">
                      <div className="font-mono text-[10px] font-bold text-slate-500 uppercase">
                        CAKUPAN SILABUS:
                      </div>
                      {w.syllabus.map((s) => (
                        <div key={s} className="font-mono text-xs text-slate-800">
                          ✓ {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIdx(i);
                      setPage(2);
                    }}
                    className="w-full py-3 bg-[#0B2545] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold transition"
                  >
                    MULAI BELAJAR DI CLASSROOM (HAL 2) →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 2: SPLIT-PANE CODE CLASSROOM */}
        {page === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div className="flex gap-2">
                  {WORKBOOK.map((w, i) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={`px-3 py-1.5 font-mono text-xs font-bold border ${
                        idx === i
                          ? 'bg-[#0B2545] text-white border-[#0B2545]'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      MODUL 0{i + 1}
                    </button>
                  ))}
                </div>
                <span className="font-mono text-xs text-slate-500">
                  SCORE: {score}/{WORKBOOK.length}
                </span>
              </div>

              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
                {mod.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{mod.prose}</p>

              <div className="bg-[#0F172A] text-slate-100 font-mono text-xs p-5 overflow-x-auto border border-slate-800">
                {mod.code.map((line, i) => (
                  <div key={i} className="flex gap-4 leading-6">
                    <span className="text-slate-500 select-none w-4 text-right">{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-50 flex flex-col justify-between gap-6">
              <div className="space-y-5">
                <span className="font-mono text-xs font-bold uppercase text-indigo-700 block">
                  ARCHITECTURE CHECKPOINT
                </span>
                <h3 className="font-bold text-lg text-[#0B2545]">{mod.q}</h3>

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
              </div>

              <button
                type="button"
                onClick={() => setPage(3)}
                className="w-full py-3 bg-[#0B2545] text-white font-mono text-xs font-bold"
              >
                LIHAT TRANSKRIP &amp; SERTIFIKAT (HAL 3) →
              </button>
            </div>
          </div>
        )}

        {/* HALAMAN 3: SERTIFIKAT KELULUSAN */}
        {page === 3 && (
          <div className="p-6 sm:p-10 space-y-6">
            <div className="max-w-3xl mx-auto border-4 border-[#0B2545] p-8 sm:p-12 bg-slate-50 text-center space-y-5">
              <div className="font-mono text-xs font-bold tracking-widest text-[#1D4ED8]">
                CERTIFICATE OF ARCHITECTURAL PROFICIENCY · ID: KK-2026-8841
              </div>
              <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#0B2545]">
                Sertifikat Kelulusan Bootcamp
              </h2>
              <p className="text-xs text-slate-600">Diberikan secara resmi kepada:</p>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="text-center font-serif text-2xl font-bold text-[#0B2545] bg-white border-b-2 border-[#0B2545] px-4 py-1"
              />
              <p className="text-sm text-slate-700 max-w-lg mx-auto">
                Telah menyelesaikan kurikulum <strong>Next.js 16 Server Security &amp; PostgreSQL RLS Architecture</strong> dengan skor evaluasi <strong>{score}/{WORKBOOK.length} Modul Terverifikasi</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-slate-500">
        <span>KELASKILAT LMS PLATFORM · SELF-HOSTED DEVELOPER ACADEMY</span>
        <div className="flex gap-4 font-bold text-[#0B2545]">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Katalog</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Classroom</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Sertifikat</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 9. ANTREMED · 3-Page Clinic Services & Doctors, Booking Kiosk & TV Queue
 * ========================================================================== */
const KLINIK_POLIS = [
  {
    id: 'UMUM',
    prefix: 'A',
    num: 14,
    room: 'Ruang Poli 02',
    doc: 'dr. Nadia Kusuma, MARS',
    spec: 'Pemeriksaan Umum, Surat Sehat & Medical Check-Up Dasar',
    tarif: 120000,
    slots: ['09:30', '10:30', '11:15'],
  },
  {
    id: 'GIGI',
    prefix: 'B',
    num: 8,
    room: 'Ruang Dental 05',
    doc: 'drg. Hendra Wijaya, Sp.KG',
    spec: 'Scaling Ultrasonic, Tambal Estetik & Perawatan Saluran Akar',
    tarif: 250000,
    slots: ['13:00', '14:00', '15:30'],
  },
  {
    id: 'ANAK',
    prefix: 'C',
    num: 5,
    room: 'Ruang Pediatri 03',
    doc: 'dr. Clarissa Putri, Sp.A',
    spec: 'Imunisasi Lengkap IDAI, Pantau Tumbuh Kembang & Konsultasi Gizi',
    tarif: 195000,
    slots: ['10:00', '11:00', '16:00'],
  },
];

export function AntreMedDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [queues, setQueues] = useState(KLINIK_POLIS);
  const [selectedId, setSelectedId] = useState('UMUM');
  const [slot, setSlot] = useState('10:30');
  const [patient, setPatient] = useState('Bintang Purnomo');
  const [slip, setSlip] = useState<string | null>('A-015');

  const activePoli = queues.find((q) => q.id === selectedId) || queues[0];

  const advancePoli = (id: string) => {
    setQueues((prev) => prev.map((q) => (q.id === id ? { ...q, num: q.num + 1 } : q)));
  };

  return (
    <div className="min-h-[780px] bg-[#F0FDFA] text-[#0F172A] flex flex-col justify-between">
      <div>
        <header className="bg-[#0F766E] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] text-teal-200 font-bold">
              PORTAL RESERVASI PASIEN &amp; DISPLAY ANTREAN POLIKLINIK
            </span>
            <div className="font-['Syne',sans-serif] text-xl font-extrabold">
              KLINIK PRATAMA ANTREMED
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 font-mono text-xs font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border ${
                page === 1 ? 'bg-white text-[#0F766E] border-white' : 'border-teal-400/40 text-white'
              }`}
            >
              01 · Layanan Medis &amp; Dokter
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border ${
                page === 2 ? 'bg-white text-[#0F766E] border-white' : 'border-teal-400/40 text-white'
              }`}
            >
              02 · Booking Jadwal &amp; Tiket
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border ${
                page === 3 ? 'bg-white text-[#0F766E] border-white' : 'border-teal-400/40 text-white'
              }`}
            >
              03 · Layar TV Ruang Tunggu
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: LAYANAN KLINIK & PROFIL DOKTER */}
        {page === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white border border-teal-200 p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-[#0F766E]">
                [ HALAMAN 1 · KATALOG POLIKLINIK, TINDAKAN MEDIS &amp; JADWAL DOKTER ]
              </span>
              <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold">
                Pilih Dokter Spesialis &amp; Lihat Estimasi Tarif Konsultasi.
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {queues.map((q) => (
                <div
                  key={q.id}
                  className="bg-white border border-teal-200 p-5 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="px-2 py-0.5 bg-teal-50 text-[#0F766E] border border-teal-200 font-bold">
                        POLI {q.id}
                      </span>
                      <span className="text-slate-500">{q.room}</span>
                    </div>
                    <h2 className="font-bold text-lg">{q.doc}</h2>
                    <p className="text-xs text-slate-600 leading-relaxed">{q.spec}</p>
                    <div className="font-mono text-xs text-slate-700 pt-2 border-t border-slate-100">
                      Slot Praktik: {q.slots.join(' · ')} WIB
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-teal-100">
                    <div className="flex justify-between font-mono text-xs">
                      <span className="text-slate-500"> Konsultasi Dasar</span>
                      <span className="font-bold text-[#0F766E]">
                        Rp {q.tarif.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(q.id);
                        setSlot(q.slots[0]);
                        setPage(2);
                      }}
                      className="w-full py-2.5 bg-[#0F766E] text-white font-mono text-xs font-bold"
                    >
                      PILIH JADWAL &amp; AMBIL TIKET →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 2: KIOSK BOOKING TIKET PASIEN */}
        {page === 2 && (
          <div className="p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
            <div className="bg-white border border-teal-200 p-6 space-y-5">
              <div>
                <span className="font-mono text-xs font-bold text-[#0F766E]">
                  HALAMAN 2 · KIOSK PENDAFTARAN MANDIRI
                </span>
                <h2 className="font-['Syne',sans-serif] text-2xl font-extrabold mt-1">
                  Reservasi Slot Jam &amp; Cetak Tiket Antrean
                </h2>
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

              <div className="space-y-3">
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
                    placeholder="Nama lengkap pasien..."
                    className="flex-1 px-3.5 py-2.5 border border-slate-300 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSlip(`${activePoli.prefix}-${String(activePoli.num + 1).padStart(3, '0')}`)
                    }
                    className="px-5 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm"
                  >
                    Terbitkan Nomor Tiket
                  </button>
                </div>
              </div>

              {slip && (
                <div className="bg-teal-50/70 border-2 border-dashed border-[#0F766E] p-5 font-mono text-xs space-y-2">
                  <div className="text-slate-500">KLINIK ANTREMED · SLIP ANTREAN RESMI</div>
                  <div className="text-3xl font-extrabold text-[#0F766E]">{slip}</div>
                  <div>Pasien: {patient}</div>
                  <div>
                    Poli {activePoli.id} ({activePoli.room}) · {activePoli.doc} · Jam {slot} WIB
                  </div>
                  <button
                    type="button"
                    onClick={() => setPage(3)}
                    className="mt-2 px-4 py-2 bg-[#0F766E] text-white font-bold inline-block"
                  >
                    LIHAT LAYAR MONITOR TV RUANG TUNGGU (HAL 3) →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* HALAMAN 3: LAYAR MONITOR TV RUANG TUNGGU */}
        {page === 3 && (
          <div className="bg-[#091514] text-teal-50 p-6 sm:p-10 min-h-[620px] space-y-6">
            <div className="flex items-center justify-between border-b border-teal-900 pb-3 font-mono text-xs">
              <span className="text-teal-400 font-bold">
                [ HALAMAN 3 · LAYAR TV MONITOR ANTREAN POLIKLINIK REAL-TIME ]
              </span>
              <span>AUDIO CALL ACTIVE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {queues.map((q) => (
                <div
                  key={q.id}
                  className="p-6 bg-[#0F2422] border border-teal-800 flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="font-mono text-xs text-teal-300">
                      POLI {q.id} · {q.room}
                    </div>
                    <div className="text-sm font-bold text-white mt-1">{q.doc}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-teal-400">NOMOR DIPANGGIL:</div>
                    <div className="font-mono text-4xl font-extrabold text-white mt-1">
                      {q.prefix}-{String(q.num).padStart(3, '0')}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => advancePoli(q.id)}
                    className="w-full py-2.5 bg-teal-500 text-black font-mono text-xs font-bold"
                  >
                    PANGGIL ANTREAN BERIKUTNYA →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-teal-200 bg-white px-6 py-4 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-slate-600">
        <span>ANTREMED CLINIC SYSTEM · BPJS &amp; ASURANSI SWASTA READY</span>
        <div className="flex gap-4 font-bold text-[#0F766E]">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Layanan &amp; Dokter</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Booking Tiket</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Monitor TV</button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 10. LEGALDRAFT ID · 3-Page Legal Template Store, A4 Studio & Contract Vault
 * ========================================================================== */
const LEGAL_TEMPLATES = [
  {
    id: 'SPK' as const,
    code: 'DOC-SPK-01',
    name: 'Surat Perjanjian Kerja (SPK) Pengembangan Software',
    desc: 'Kontrak proyek pembuatan aplikasi web/mobile lengkap dengan klausul ruang lingkup, termin DP & UAT, garansi bug 30 hari, dan penyerahan HAKI source code.',
    clauses: ['Pasal 1: Nilai Kontrak & Termin DP/UAT', 'Pasal 2: Serah Terima Source Code & HAKI', 'Pasal 3: Masa Garansi & Batas Revisi'],
  },
  {
    id: 'NDA' as const,
    code: 'DOC-NDA-02',
    name: 'Perjanjian Kerahasiaan (Mutual Non-Disclosure Agreement)',
    desc: 'Dokumen perlindungan rahasia dagang, kredensial server, arsitektur database, dan data pelanggan sebelum diskusi teknis dimulai.',
    clauses: ['Pasal 1: Definisi Informasi Rahasia', 'Pasal 2: Kewajiban Pengamanan Kredensial', 'Pasal 3: Yurisdiksi Hukum Republik Indonesia'],
  },
];

export function LegalDraftDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [docType, setDocType] = useState<'SPK' | 'NDA'>('SPK');
  const [client, setClient] = useState('PT Nusantara Digital Karya');
  const [scope, setScope] = useState('Pengembangan Aplikasi Kasir POS & Integrasi Supabase');
  const [value, setValue] = useState(25000000);
  const [dpPct, setDpPct] = useState(50);
  const [vault, setVault] = useState([
    { no: 'SPK/2026/XI/041', client: 'PT Nusantara Digital Karya', total: 25000000, status: 'DP 50% PAID' },
    { no: 'NDA/2026/XI/019', client: 'CV Kreasi Medika Utama', total: 18500000, status: 'SIGNED' },
  ]);

  const dpAmt = Math.round((value * dpPct) / 100);
  const finalAmt = Math.max(0, value - dpAmt);

  const saveToVault = () => {
    setVault((prev) => [
      {
        no: `${docType}/2026/XI/0${Math.floor(42 + Math.random() * 50)}`,
        client,
        total: value,
        status: 'DRAFT READY',
      },
      ...prev,
    ]);
    setPage(3);
  };

  return (
    <div className="min-h-[780px] bg-[#CBD5E1] text-slate-900 flex flex-col justify-between">
      <div>
        <header className="bg-[#0B2545] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-[10px] text-blue-300 font-bold">
              INDONESIAN IT CONTRACT &amp; TERMIN GENERATOR
            </span>
            <div className="font-sans font-extrabold text-lg">LEGALDRAFT ID</div>
          </div>

          <nav className="flex flex-wrap gap-1.5 font-bold">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-2 border ${
                page === 1 ? 'bg-white text-[#0B2545] border-white' : 'border-white/30 text-white'
              }`}
            >
              01 · Katalog Template Hukum
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-2 border ${
                page === 2 ? 'bg-white text-[#0B2545] border-white' : 'border-white/30 text-white'
              }`}
            >
              02 · Studio Editor A4
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-2 border ${
                page === 3 ? 'bg-white text-[#0B2545] border-white' : 'border-white/30 text-white'
              }`}
            >
              03 · Brankas Arsip ({vault.length})
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: KATALOG TEMPLATE DOKUMEN HUKUM */}
        {page === 1 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="bg-white border border-slate-300 p-6 space-y-2">
              <span className="font-mono text-xs font-bold text-[#1D4ED8]">
                [ HALAMAN 1 · KATALOG STANDAR DOKUMEN PERJANJIAN PROYEK IT ]
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
                Pilih Template Kontrak &amp; Preview Klausul Perlindungan Developer.
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEGAL_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.code}
                  className="bg-white border border-slate-300 p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-50 text-[#1D4ED8] border border-blue-200">
                      {tpl.code}
                    </span>
                    <h2 className="font-bold text-xl text-[#0B2545]">{tpl.name}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tpl.desc}</p>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs">
                      <div className="font-bold text-slate-500">STRUKTUR PASAL UTAMA:</div>
                      {tpl.clauses.map((c) => (
                        <div key={c}>✓ {c}</div>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDocType(tpl.id);
                      setPage(2);
                    }}
                    className="w-full py-3 bg-[#0B2545] hover:bg-[#1D4ED8] text-white font-mono text-xs font-bold"
                  >
                    GUNAKAN TEMPLATE DI STUDIO A4 (HAL 2) →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 2: STUDIO EDITOR A4 */}
        {page === 2 && (
          <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-6xl mx-auto w-full">
            <div className="lg:col-span-4 bg-white border border-slate-300 p-5 space-y-4 text-xs">
              <div className="font-mono font-bold text-[#0B2545] border-b border-slate-200 pb-2">
                PARAMETER KLAUSUL &amp; TERMIN
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
                <label className="block font-mono text-[10px] text-slate-500 mb-1">
                  TERMIN DP ({dpPct}%)
                </label>
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
              <div className="pt-2 space-y-2 font-mono">
                <button
                  type="button"
                  onClick={saveToVault}
                  className="w-full py-2.5 bg-[#0B2545] text-white font-bold"
                >
                  SIMPAN KE BRANKAS ARSIP (HAL 3) →
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2 border border-slate-300 font-bold"
                >
                  CETAK / SAVE PDF A4
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 bg-white shadow-xl border border-slate-300 p-8 sm:p-12 space-y-5 font-serif">
              <div className="text-center border-b-2 border-black pb-4 space-y-1">
                <h2 className="text-xl font-bold tracking-wide">
                  {docType === 'SPK'
                    ? 'SURAT PERJANJIAN KERJA (SPK)'
                    : 'PERJANJIAN KERAHASIAAN (NON-DISCLOSURE AGREEMENT)'}
                </h2>
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
                  <div>Termin I (DP {dpPct}%) : Rp {dpAmt.toLocaleString('id-ID')}</div>
                  <div>Termin II ({100 - dpPct}%) : Rp {finalAmt.toLocaleString('id-ID')}</div>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <div className="font-bold text-center">PASAL 2 · HAK KEKAYAAN INTELEKTUAL</div>
                <p className="leading-relaxed text-justify">
                  Seluruh kode sumber dan skema basis data diserahkan penuh kepada {client} setelah pembayaran Termin II dilunasi.
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
        )}

        {/* HALAMAN 3: BRANKAS ARSIP KONTRAK */}
        {page === 3 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="bg-white border border-slate-300 p-6 flex justify-between items-center">
              <div>
                <span className="font-mono text-xs font-bold text-[#1D4ED8]">
                  [ HALAMAN 3 · BRANKAS ARSIP KONTRAK &amp; STATUS TERMIN ]
                </span>
                <h2 className="text-2xl font-bold text-[#0B2545] mt-1">
                  Daftar Dokumen SPK &amp; NDA yang Telah Diterbitkan
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-4 py-2 bg-[#0B2545] text-white font-mono text-xs font-bold"
              >
                + Buat Kontrak Baru
              </button>
            </div>

            <div className="bg-white border border-slate-300 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-100 border-b border-slate-300 font-mono">
                  <tr>
                    <th className="p-3.5">NOMOR DOKUMEN</th>
                    <th className="p-3.5">NAMA KLIEN</th>
                    <th className="p-3.5 text-right">NILAI KONTRAK</th>
                    <th className="p-3.5">STATUS TERMIN</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {vault.map((v) => (
                    <tr key={v.no}>
                      <td className="p-3.5 font-mono font-bold text-[#0B2545]">{v.no}</td>
                      <td className="p-3.5 font-semibold">{v.client}</td>
                      <td className="p-3.5 font-mono text-right">
                        Rp {v.total.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5 font-mono">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {v.status}
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

      <footer className="border-t border-slate-300 bg-white px-6 py-4 flex flex-wrap justify-between gap-4 font-mono text-[11px] text-slate-600">
        <span>LEGALDRAFT ID · STANDAR DOKUMEN HUKUM INDUSTRI PERANGKAT LUNAK</span>
        <div className="flex gap-4 font-bold text-[#0B2545]">
          <button type="button" onClick={() => setPage(1)}>Hal 1: Katalog Template</button>
          <button type="button" onClick={() => setPage(2)}>Hal 2: Studio Editor A4</button>
          <button type="button" onClick={() => setPage(3)}>Hal 3: Brankas Arsip</button>
        </div>
      </footer>
    </div>
  );
}
