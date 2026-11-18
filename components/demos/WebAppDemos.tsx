'use client';

import { useState, type FormEvent } from 'react';
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
 * 6. PULSEOPS · BetterStack-Inspired Infrastructure Status, Telemetry & Incidents
 * ========================================================================== */
const NOC_NODES = [
  {
    id: 'edge-sin',
    name: 'Core API Gateway',
    endpoint: 'https://api.birumarket.web.id/v2/health',
    region: 'Singapore · ap-southeast-1',
    provider: 'AWS CloudFront + Envoy Edge',
    sla: '99.99%',
    lat: 24,
    p99: 42,
    status: '200 OK' as const,
    spec: 'Envoy Proxy cluster dengan Redis sliding-window rate limiter (kapasitas 12.000 req/detik, TLS 1.3 0-RTT).',
    series: [22, 24, 21, 25, 28, 23, 22, 24, 25, 24],
  },
  {
    id: 'pg-main',
    name: 'Supabase PostgreSQL Primary',
    endpoint: 'pg://soljlsbnphrdkomldckh.supabase.co:5432',
    region: 'Singapore · Dedicated NVMe',
    provider: 'Supabase Enterprise Cluster',
    sla: '100.0%',
    lat: 36,
    p99: 64,
    status: '200 OK' as const,
    spec: 'PostgreSQL 16 dengan PgBouncer transaction pooling (maks 400 koneksi konkuren) + Point-in-Time Recovery.',
    series: [35, 37, 36, 40, 39, 38, 36, 37, 38, 36],
  },
  {
    id: 'qris-hook',
    name: 'Payment QRIS Webhook Worker',
    endpoint: 'https://hooks.birumarket.web.id/qris/callback',
    region: 'Jakarta · id-cgk-edge-1',
    provider: 'Cloudflare Workers + Queue',
    sla: '99.42%',
    lat: 112,
    p99: 188,
    status: 'DEGRADED' as const,
    spec: 'Verifier tanda tangan HMAC-SHA256 idempoten dengan antrean Dead-Letter otomatis dan exponential backoff.',
    series: [48, 55, 72, 96, 118, 124, 109, 115, 114, 112],
  },
  {
    id: 'cdn-edge',
    name: 'Static Asset & Media CDN',
    endpoint: 'https://cdn.birumarket.web.id/products',
    region: 'Global Anycast · 310 PoPs',
    provider: 'Vercel Edge Network',
    sla: '99.99%',
    lat: 14,
    p99: 26,
    status: '200 OK' as const,
    spec: 'Distribusi aset HTTP/3 QUIC dengan kompresi Brotli level 11 dan optimasi gambar WebP/AVIF otomatis.',
    series: [14, 15, 13, 14, 15, 14, 13, 14, 15, 14],
  },
];

export function PulseOpsDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [nodes, setNodes] = useState(NOC_NODES);
  const [previewNode, setPreviewNode] = useState<(typeof NOC_NODES)[0] | null>(null);
  const [filter, setFilter] = useState<'ALL' | '200 OK' | 'DEGRADED'>('ALL');
  const [logs, setLogs] = useState([
    { time: '18:04:12', node: 'edge-sin', msg: 'GET /api/products · 200 OK · 24ms · tls1.3' },
    { time: '18:04:10', node: 'qris-hook', msg: 'POST /qris/callback · 200 OK · 112ms · retry_queue=2' },
    { time: '18:04:05', node: 'pg-main', msg: 'SELECT catalog_index · 200 OK · 36ms · pool_active=14/400' },
    { time: '18:03:58', node: 'cdn-edge', msg: 'GET /products/shot-pos-kuro.png · HIT · 14ms' },
  ]);
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-204',
      title: 'Peningkatan Latensi pada Payment QRIS Webhook Worker',
      state: 'INVESTIGATING',
      component: 'Jakarta Edge Node (qris-hook)',
      time: '18 Nov 2026 · 08:45 WIB',
      detail:
        'Terdeteksi kenaikan waktu respons +64ms dari sisi gateway perbankan mitra. Seluruh payload pembayaran tetap tersimpan aman di antrean retry idempoten tanpa transaksi yang hilang.',
    },
    {
      id: 'INC-199',
      title: 'Pemeliharaan Terjadwal Indeks PostgreSQL Primary',
      state: 'RESOLVED',
      component: 'Supabase PostgreSQL (pg-main)',
      time: '15 Nov 2026 · 02:15 WIB',
      detail:
        'Re-indexing konkurensi tinggi pada tabel katalog selesai dalam 3 menit 40 detik menggunakan read-replica failover tanpa downtime.',
    },
  ]);
  const [incidentInput, setIncidentInput] = useState('');
  const [incidentComponent, setIncidentComponent] = useState('Core API Gateway (edge-sin)');

  const runProbe = () => {
    const next = nodes.map((n) => {
      const delta = Math.floor(Math.random() * 19) - 9;
      const lat = Math.max(11, n.lat + delta);
      const p99 = Math.round(lat * 1.65);
      const status = lat > 95 ? ('DEGRADED' as const) : ('200 OK' as const);
      return { ...n, lat, p99, status, series: [...n.series.slice(1), lat] };
    });
    setNodes(next);
    const stamp = new Date().toTimeString().slice(0, 8);
    const avg = Math.round(next.reduce((s, x) => s + x.lat, 0) / next.length);
    setLogs((l) => [
      {
        time: stamp,
        node: 'global-probe',
        msg: `Synthetic multi-region check selesai · rata-rata RTT ${avg}ms (${next.filter((x) => x.status === '200 OK').length}/4 sehat)`,
      },
      ...l.slice(0, 6),
    ]);
  };

  const addIncident = (e: FormEvent) => {
    e.preventDefault();
    if (!incidentInput.trim()) return;
    setIncidents((prev) => [
      {
        id: `INC-${Math.floor(205 + Math.random() * 50)}`,
        title: incidentInput.trim(),
        state: 'INVESTIGATING',
        component: incidentComponent,
        time: 'Baru saja · Live Dispatch',
        detail:
          'Pembaruan status telah dikirimkan ke halaman status publik dan diteruskan ke webhook Slack serta Telegram NOC.',
      },
      ...prev,
    ]);
    setIncidentInput('');
  };

  const visible = filter === 'ALL' ? nodes : nodes.filter((n) => n.status === filter);
  const degradedCount = nodes.filter((n) => n.status === 'DEGRADED').length;

  return (
    <div className="min-h-[780px] bg-[#0B0E14] text-slate-100 font-sans flex flex-col justify-between selection:bg-emerald-500/30">
      <div>
        {/* Top Navigation Bar ala BetterStack */}
        <header className="px-6 py-4 bg-[#111621]/90 border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm tracking-tight">PulseOps Cloud</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                  SLA 99.96%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Real-Time Infrastructure Telemetry &amp; Public Status Portal
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-1.5 bg-[#0B0E14] p-1 rounded-xl border border-white/[0.08] text-xs">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition ${
                page === 1
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Status Publik
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition ${
                page === 2
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Telemetry NOC
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition ${
                page === 3
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Insiden &amp; Webhook ({incidents.length})
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: BETTERSTACK PUBLIC STATUS PAGE */}
        {page === 1 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-[#131926] to-[#0F141E] border border-white/[0.08] p-6 sm:p-7 flex flex-wrap items-center justify-between gap-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    degradedCount === 0
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full ${
                      degradedCount === 0 ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                      Live System Health
                    </span>
                    <span className="text-xs text-slate-400">· Diperbarui otomatis setiap 15 detik</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white mt-1 tracking-tight">
                    {degradedCount === 0
                      ? 'Seluruh Cluster Produksi Berjalan Optimal'
                      : `${nodes.length - degradedCount} dari ${nodes.length} Cluster Optimal · ${degradedCount} Mengalami Kenaikan Latensi`}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Pemantauan sintetis multi-region dari Singapura, Jakarta, dan Tokyo.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={runProbe}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-medium text-white transition"
                >
                  Refresh Status
                </button>
                <button
                  type="button"
                  onClick={() => setPage(2)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition"
                >
                  Buka Konsol Telemetry →
                </button>
              </div>
            </div>

            {/* Service Node Cards with Uptime Bars & SVG Sparklines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nodes.map((n) => {
                const maxVal = Math.max(...n.series, 130);
                const sparkPoints = n.series
                  .map((v, i) => `${i * 28},${42 - Math.round((v / maxVal) * 34)}`)
                  .join(' ');
                const areaPoints = `0,42 ${sparkPoints} ${(n.series.length - 1) * 28},42`;

                return (
                  <div
                    key={n.id}
                    className="rounded-2xl bg-[#111621] border border-white/[0.08] hover:border-white/[0.16] p-5 space-y-4 transition"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold text-base text-white">{n.name}</h2>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {n.region} · <span className="font-mono text-slate-300">{n.provider}</span>
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium flex items-center gap-1.5 ${
                          n.status === '200 OK'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/25'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            n.status === '200 OK' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {n.status === '200 OK' ? 'Operational' : 'Degraded'} · {n.lat}ms
                      </span>
                    </div>

                    {/* 30-Day Uptime Strip */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Riwayat 30 Hari Terakhir</span>
                        <span className="font-mono text-slate-200">{n.sla} Uptime</span>
                      </div>
                      <div className="grid grid-cols-24 gap-1">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const isWarn = n.status === 'DEGRADED' && (i === 21 || i === 22);
                          return (
                            <div
                              key={i}
                              className={`h-6 rounded-sm transition-colors ${
                                isWarn ? 'bg-amber-400/90' : 'bg-emerald-500/80 hover:bg-emerald-400'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Mini Sparkline & Inspect Action */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <svg width="140" height="32" viewBox="0 0 252 44" className="overflow-visible">
                          <polygon
                            points={areaPoints}
                            fill={n.status === '200 OK' ? 'rgba(16,185,129,0.14)' : 'rgba(245,158,11,0.15)'}
                          />
                          <polyline
                            fill="none"
                            stroke={n.status === '200 OK' ? '#10B981' : '#F59E0B'}
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            points={sparkPoints}
                          />
                        </svg>
                        <div className="text-[11px] font-mono text-slate-400">
                          p99: <span className="text-slate-200">{n.p99}ms</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setPreviewNode(n)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-slate-200 transition"
                      >
                        Detail Arsitektur
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Arsitektur Node */}
            {previewNode && (
              <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#121722] border border-white/[0.12] rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
                  <div className="flex justify-between items-start border-b border-white/[0.08] pb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                        Spesifikasi Cluster · {previewNode.id}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">{previewNode.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewNode(null)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-slate-300"
                    >
                      Tutup ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#0B0E14] border border-white/[0.06] space-y-2 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Endpoint</span>
                        <span className="text-slate-200">{previewNode.endpoint}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Region</span>
                        <span className="text-slate-200">{previewNode.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Latency (p50 / p99)</span>
                        <span className="text-emerald-400">
                          {previewNode.lat}ms / {previewNode.p99}ms
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{previewNode.spec}</p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewNode(null);
                        setPage(2);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
                    >
                      Jalankan Ping di Konsol NOC →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: TELEMETRY NOC & LIVE PING CONSOLE */}
        {page === 2 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#111621] p-4 rounded-2xl border border-white/[0.08]">
              <div className="flex flex-wrap items-center gap-2">
                {(['ALL', '200 OK', 'DEGRADED'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      filter === f
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    {f === 'ALL' ? 'Semua Node (4)' : f === '200 OK' ? 'Sehat / 200 OK' : 'Degraded Latency'}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={runProbe}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition shadow-sm"
              >
                Jalankan Probe Sintetis Sekarang
              </button>
            </div>

            <div className="rounded-2xl bg-[#111621] border border-white/[0.08] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#0D111A] text-slate-400 font-mono text-[11px] border-b border-white/[0.08]">
                    <tr>
                      <th className="py-3.5 px-5">STATUS</th>
                      <th className="py-3.5 px-5">CLUSTER LAYANAN</th>
                      <th className="py-3.5 px-5">ENDPOINT TARGET</th>
                      <th className="py-3.5 px-5">KURVA LATENSI (10 SAMPEL)</th>
                      <th className="py-3.5 px-5 text-right">RTT P50</th>
                      <th className="py-3.5 px-5 text-right">RTT P99</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {visible.map((n) => {
                      const pts = n.series
                        .map((v, i) => `${i * 20},${38 - Math.min(34, Math.round((v / 140) * 34))}`)
                        .join(' ');
                      const area = `0,38 ${pts} ${(n.series.length - 1) * 20},38`;
                      return (
                        <tr key={n.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3.5 px-5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                                n.status === '200 OK'
                                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25'
                                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/25'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  n.status === '200 OK' ? 'bg-emerald-400' : 'bg-amber-400'
                                }`}
                              />
                              {n.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="font-semibold text-white">{n.name}</div>
                            <div className="text-[11px] text-slate-400">{n.region}</div>
                          </td>
                          <td className="py-3.5 px-5 font-mono text-slate-300">{n.endpoint}</td>
                          <td className="py-3.5 px-5">
                            <svg width="180" height="40" className="overflow-visible">
                              <polygon
                                points={area}
                                fill={
                                  n.status === '200 OK'
                                    ? 'rgba(16,185,129,0.14)'
                                    : 'rgba(245,158,11,0.14)'
                                }
                              />
                              <polyline
                                fill="none"
                                stroke={n.status === '200 OK' ? '#10B981' : '#F59E0B'}
                                strokeWidth="2"
                                strokeLinecap="round"
                                points={pts}
                              />
                            </svg>
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono font-semibold text-white">
                            {n.lat} ms
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono text-slate-400">
                            {n.p99} ms
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Stream Log */}
            <div className="rounded-2xl bg-[#080A0F] border border-white/[0.08] p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-white/[0.06] pb-2.5">
                <span>STREAM TELEMETRI HTTP LANGSUNG</span>
                <span className="text-emerald-400">● Terhubung ke Collector Singapura</span>
              </div>
              <div className="space-y-2">
                {logs.map((item, i) => (
                  <div key={i} className="flex flex-wrap items-center gap-2.5 text-slate-300">
                    <span className="text-slate-500">{item.time}</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.05] text-emerald-300 text-[10px]">
                      {item.node}
                    </span>
                    <span>{item.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: TIMELINE INSIDEN & DISPATCH WEBHOOK */}
        {page === 3 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <form
                onSubmit={addIncident}
                className="rounded-2xl bg-[#111621] border border-white/[0.08] p-5 space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-emerald-400">Incident Broadcast Studio</span>
                  <h2 className="text-lg font-bold text-white mt-0.5">
                    Publikasikan Update Status &amp; Webhook
                  </h2>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-400 block">Komponen Terdampak</label>
                  <select
                    value={incidentComponent}
                    onChange={(e) => setIncidentComponent(e.target.value)}
                    className="w-full rounded-xl bg-[#0B0E14] border border-white/[0.1] px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Core API Gateway (edge-sin)</option>
                    <option>Supabase PostgreSQL (pg-main)</option>
                    <option>Payment QRIS Webhook Worker (qris-hook)</option>
                    <option>Static Asset &amp; Media CDN (cdn-edge)</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-slate-400 block">Ringkasan Insiden / Pemeliharaan</label>
                  <input
                    type="text"
                    value={incidentInput}
                    onChange={(e) => setIncidentInput(e.target.value)}
                    placeholder="Contoh: Peningkatan latensi webhook QRIS wilayah Jakarta..."
                    className="w-full rounded-xl bg-[#0B0E14] border border-white/[0.1] px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
                >
                  Terbitkan ke Status Page &amp; Kirim Webhook
                </button>
              </form>

              <div className="rounded-2xl bg-[#111621] border border-white/[0.08] p-5 space-y-3 text-xs">
                <div className="font-semibold text-white">Subscriber Webhook Aktif (HMAC-SHA256)</div>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#0B0E14] border border-white/[0.06]">
                    <span>Slack · #infra-noc-alerts</span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#0B0E14] border border-white/[0.06]">
                    <span>Telegram · @birumarket_noc_bot</span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Insiden */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative pl-6 border-l border-white/[0.1] space-y-5">
                {incidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="relative rounded-2xl bg-[#111621] border border-white/[0.08] p-5 space-y-2.5"
                  >
                    <span
                      className={`absolute -left-[31px] top-6 w-3 h-3 rounded-full border-2 border-[#0B0E14] ${
                        inc.state === 'RESOLVED' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-slate-400">{inc.id}</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300">
                          {inc.component}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                          inc.state === 'RESOLVED'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {inc.state}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base text-white">{inc.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{inc.detail}</p>
                    <div className="text-[11px] font-mono text-slate-500">{inc.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-white/[0.08] bg-[#0E121B] px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-400">
        <span>PulseOps Telemetry · Multi-Region Uptime &amp; Incident Response</span>
        <div className="flex gap-4 text-emerald-400 font-medium">
          <button type="button" onClick={() => setPage(1)}>
            Status Publik
          </button>
          <button type="button" onClick={() => setPage(2)}>
            Telemetry NOC
          </button>
          <button type="button" onClick={() => setPage(3)}>
            Timeline Insiden
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 7. BAGIRATA · Splitwise & CashApp-Inspired Social Split-Bill & QRIS Settlement
 * ========================================================================== */
const PARTICIPANT_CHIPS = [
  { bg: '#FEF3C7', border: '#F59E0B', text: '#92400E', dot: '#D97706' },
  { bg: '#DCFCE7', border: '#10B981', text: '#065F46', dot: '#059669' },
  { bg: '#E0E7FF', border: '#6366F1', text: '#3730A3', dot: '#4F46E5' },
  { bg: '#FCE7F3', border: '#EC4899', text: '#9D174D', dot: '#DB2777' },
];

const RECEIPT_PRESETS = [
  {
    id: 'preset-izakaya',
    venue: 'Senopati Japanese Grill & Izakaya',
    tag: 'Makan Malam Tim',
    location: 'Kebayoran Baru, Jakarta Selatan',
    photo:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    desc: 'Paket makan malam Jepang bersama rekan kerja berisi wagyu donburi, yakitori platter, dan matcha.',
    items: [
      { id: '1', name: 'Wagyu Truffle Donburi Bowl', price: 145000, owners: ['Biru', 'Raka'] },
      { id: '2', name: 'Yakitori Skewers Sharing Platter', price: 88000, owners: ['Biru', 'Raka', 'Nabila'] },
      { id: '3', name: 'Uji Kyoto Iced Matcha Latte', price: 42000, owners: ['Nabila'] },
      { id: '4', name: 'Sparkling Yuzu Ginger Highball', price: 38000, owners: ['Biru'] },
    ],
  },
  {
    id: 'preset-coffee',
    venue: 'Kemang Specialty Roastery & Brunch',
    tag: 'Brunch Akhir Pekan',
    location: 'Kemang Raya, Jakarta Selatan',
    photo:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    desc: 'Tagihan nongkrong akhir pekan dengan menu kopi oat latte, croissant butter, dan eggs benedict.',
    items: [
      { id: 'c1', name: '2x Iced Oat Milk Spanish Latte', price: 88000, owners: ['Biru', 'Nabila'] },
      { id: 'c2', name: 'Smoked Brisket Eggs Benedict', price: 95000, owners: ['Raka'] },
      { id: 'c3', name: 'Almond Kouign-Amann Basket', price: 64000, owners: ['Biru', 'Raka', 'Nabila'] },
    ],
  },
  {
    id: 'preset-bbq',
    venue: 'PIK Korean Charcoal BBQ House',
    tag: 'Patungan Grup',
    location: 'Pantai Indah Kapuk, Jakarta Utara',
    photo:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    desc: 'Struk barbekyu Korea lengkap dengan karubi shortplate, sundubu jjigae hangat, dan ocha dingin.',
    items: [
      { id: 'b1', name: 'Prime Karubi Shortplate Set (500g)', price: 260000, owners: ['Biru', 'Raka', 'Nabila'] },
      { id: 'b2', name: 'Hot Stone Kimchi Jjigae Stew', price: 85000, owners: ['Biru', 'Raka'] },
      { id: 'b3', name: '3x Refill Roasted Corn Tea', price: 45000, owners: ['Biru', 'Raka', 'Nabila'] },
    ],
  },
];

export function BagiRataDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [people, setPeople] = useState(['Biru', 'Raka', 'Nabila']);
  const [paidStatus, setPaidStatus] = useState<Record<string, boolean>>({ Biru: true });
  const [activeMarker, setActiveMarker] = useState('Biru');
  const [newName, setNewName] = useState('');
  const [activeVenue, setActiveVenue] = useState(RECEIPT_PRESETS[0].venue);
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
    const chip = PARTICIPANT_CHIPS[idx % PARTICIPANT_CHIPS.length];
    return {
      name: p,
      chip,
      raw: Math.round(raw),
      taxShare: Math.round(raw * (mult - 1)),
      total: Math.round(raw * mult),
    };
  });

  const addFriend = (e: FormEvent) => {
    e.preventDefault();
    const clean = newName.trim();
    if (!clean || people.includes(clean)) return;
    setPeople((p) => [...p, clean]);
    setActiveMarker(clean);
    setNewName('');
  };

  const addReceiptLine = (e: FormEvent) => {
    e.preventDefault();
    const pr = Number(newPrice);
    if (!newItem.trim() || !pr) return;
    setItems((p) => [
      ...p,
      { id: String(Date.now()), name: newItem.trim(), price: pr, owners: [activeMarker] },
    ]);
    setNewItem('');
    setNewPrice('');
  };

  return (
    <div className="min-h-[780px] bg-[#FAF7F2] text-[#18181B] flex flex-col justify-between font-sans">
      <div>
        {/* Warm Tactile Header */}
        <header className="bg-white/90 backdrop-blur border-b border-[#E6E1D6] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#18181B] text-[#FAF7F2] flex items-center justify-center font-bold text-sm shadow-sm">
              ÷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-zinc-900">BagiRata</span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  Proporsional + QRIS
                </span>
              </div>
              <p className="text-xs text-zinc-500">
                Kalkulator Split-Bill Restoran &amp; Rekap Patungan Otomatis
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-[#F3EFE6] p-1 rounded-xl border border-[#E6E1D6] text-xs font-medium">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 1 ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Galeri Paket Resto
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 2 ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Kalkulator Struk ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 3 ? 'bg-white text-zinc-900 shadow-sm font-semibold' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Settlement QRIS
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: GALERI PAKET RESTO DENGAN FOTO MAKANAN ASLI */}
        {page === 1 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-[#E6E1D6] p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
              <div className="max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
                  Inspirasi Struk Nongkrong &amp; Makan Malam
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                  Pilih Paket Struk Restoran untuk Dihitung Proporsional.
                </h1>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Tidak perlu hitung manual pajak PPN 11% dan service charge 5%. Pilih salah satu skenario makan bersama di bawah untuk langsung membagi item per peserta.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition shadow-sm"
              >
                Buka Kalkulator Struk →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RECEIPT_PRESETS.map((preset) => {
                const subtotal = preset.items.reduce((acc, it) => acc + it.price, 0);
                return (
                  <div
                    key={preset.id}
                    className="rounded-3xl bg-white border border-[#E6E1D6] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
                  >
                    <div>
                      <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                        <img
                          src={preset.photo}
                          alt={preset.venue}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-zinc-900 shadow-sm">
                            {preset.tag}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h2 className="font-bold text-lg text-zinc-900 leading-snug">{preset.venue}</h2>
                          <p className="text-xs text-zinc-500 mt-0.5">{preset.location}</p>
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed">{preset.desc}</p>

                        <div className="rounded-2xl bg-[#FAF7F2] border border-[#ECE7DC] p-3.5 space-y-2 text-xs">
                          {preset.items.map((it) => (
                            <div key={it.id} className="flex justify-between items-center">
                              <span className="text-zinc-700 truncate pr-2">{it.name}</span>
                              <span className="font-mono font-semibold text-zinc-900 shrink-0">
                                Rp {it.price.toLocaleString('id-ID')}
                              </span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-dashed border-[#DCD5C7] flex justify-between font-semibold text-zinc-900">
                            <span>Subtotal Menu</span>
                            <span className="font-mono">Rp {subtotal.toLocaleString('id-ID')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <button
                        type="button"
                        onClick={() => {
                          setItems(preset.items);
                          setActiveVenue(preset.venue);
                          setPage(2);
                        }}
                        className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition"
                      >
                        Muat Struk ke Kalkulator →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* HALAMAN 2: KALKULATOR STRUK INTERAKTIF */}
        {page === 2 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Kolom Kiri: Peserta & Pajak */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl bg-white border border-[#E6E1D6] p-5 space-y-4 shadow-sm">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Langkah 1 · Pilih Peserta Aktif
                  </span>
                  <h3 className="font-bold text-base text-zinc-900 mt-0.5">
                    Klik Nama Lalu Tandai Menu
                  </h3>
                </div>

                <div className="space-y-2">
                  {people.map((p, i) => {
                    const chip = PARTICIPANT_CHIPS[i % PARTICIPANT_CHIPS.length];
                    const isActive = activeMarker === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setActiveMarker(p)}
                        style={{
                          backgroundColor: isActive ? chip.bg : '#FAF7F2',
                          borderColor: isActive ? chip.border : '#E6E1D6',
                        }}
                        className="w-full px-3.5 py-2.5 rounded-2xl border flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            style={{ backgroundColor: chip.dot }}
                            className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                          >
                            {p.slice(0, 1)}
                          </span>
                          <span className="font-semibold text-sm text-zinc-900">{p}</span>
                        </div>
                        {isActive && (
                          <span
                            style={{ color: chip.text }}
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/80"
                          >
                            Sedang Menandai
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={addFriend} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Tambah peserta baru..."
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#DED8CB] bg-[#FAF7F2] text-xs focus:outline-none focus:border-zinc-900"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold"
                  >
                    Tambah
                  </button>
                </form>
              </div>

              <div className="rounded-3xl bg-white border border-[#E6E1D6] p-5 space-y-3 shadow-sm text-xs">
                <div className="font-bold text-sm text-zinc-900">Komponen Pajak &amp; Layanan</div>
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] cursor-pointer">
                  <span className="font-medium text-zinc-700">PPN Restoran (11%)</span>
                  <input
                    type="checkbox"
                    checked={tax}
                    onChange={(e) => setTax(e.target.checked)}
                    className="w-4 h-4 accent-zinc-900"
                  />
                </label>
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF7F2] cursor-pointer">
                  <span className="font-medium text-zinc-700">Service Charge (5%)</span>
                  <input
                    type="checkbox"
                    checked={service}
                    onChange={(e) => setService(e.target.checked)}
                    className="w-4 h-4 accent-zinc-900"
                  />
                </label>
              </div>
            </div>

            {/* Kolom Tengah: Kertas Struk Interaktif */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white border border-[#E6E1D6] shadow-md p-6 space-y-5">
                <div className="text-center border-b border-dashed border-zinc-300 pb-4 space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                    Interactive Receipt Studio
                  </span>
                  <h2 className="text-lg font-bold text-zinc-900">{activeVenue}</h2>
                  <p className="text-xs text-zinc-500">
                    Klik baris menu untuk menambah/menghapus <strong>{activeMarker}</strong>
                  </p>
                </div>

                <div className="space-y-2.5">
                  {items.map((it) => {
                    const isMarkedByActive = it.owners.includes(activeMarker);
                    return (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => toggleItemForActiveMarker(it.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition block ${
                          isMarkedByActive
                            ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                            : 'bg-[#FAF7F2] border-[#ECE7DC] hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-semibold text-sm text-zinc-900">{it.name}</span>
                          <span className="font-mono font-bold text-sm text-zinc-900 shrink-0">
                            Rp {it.price.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                          {it.owners.length > 0 ? (
                            it.owners.map((owner) => {
                              const pIdx = Math.max(0, people.indexOf(owner));
                              const c = PARTICIPANT_CHIPS[pIdx % PARTICIPANT_CHIPS.length];
                              return (
                                <span
                                  key={owner}
                                  style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}
                                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border"
                                >
                                  {owner} (Rp {Math.round(it.price / it.owners.length).toLocaleString('id-ID')})
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-[11px] text-rose-600 font-medium">
                              Belum ada peserta yang ditandai
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={addReceiptLine} className="flex gap-2 pt-2 border-t border-dashed border-zinc-200">
                  <input
                    type="text"
                    placeholder="Nama menu tambahan..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-[#DED8CB] bg-[#FAF7F2] text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Harga (Rp)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-28 px-3 py-2 rounded-xl border border-[#DED8CB] bg-[#FAF7F2] text-xs font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold"
                  >
                    + Item
                  </button>
                </form>
              </div>
            </div>

            {/* Kolom Kanan: Ringkasan Tagihan Per Orang */}
            <div className="lg:col-span-3 space-y-3">
              <div className="rounded-3xl bg-white border border-[#E6E1D6] p-5 space-y-3 shadow-sm">
                <div className="font-bold text-sm text-zinc-900">Porsi Tagihan Proporsional</div>
                <div className="space-y-2.5">
                  {settlement.map((s) => (
                    <div
                      key={s.name}
                      style={{ backgroundColor: s.chip.bg, borderColor: s.chip.border }}
                      className="p-3.5 rounded-2xl border space-y-1"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-zinc-900">{s.name}</span>
                        <span className="font-mono font-bold text-sm text-zinc-900">
                          Rp {s.total.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-600 flex justify-between font-mono">
                        <span>Menu: Rp {s.raw.toLocaleString('id-ID')}</span>
                        <span>+Pajak: Rp {s.taxShare.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition mt-2"
                >
                  Terbitkan Kartu QRIS →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: KARTU SETTLEMENT QRIS MODERN */}
        {page === 3 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-[#E6E1D6] p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  QRIS &amp; Transfer Settlement Tracker
                </span>
                <h2 className="text-2xl font-bold text-zinc-900 mt-1.5">
                  Pantau Pelunasan Patungan &amp; Bagikan ke WhatsApp
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  const text = settlement
                    .map(
                      (s) =>
                        `• ${s.name}: Rp ${s.total.toLocaleString('id-ID')} (${
                          paidStatus[s.name] ? 'Lunas ✓' : 'Menunggu QRIS'
                        })`
                    )
                    .join('\n');
                  navigator.clipboard?.writeText(`Rekap BagiRata (${activeVenue}):\n${text}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition"
              >
                {copied ? 'Rekap Tersalin ke Clipboard ✓' : 'Salin Rekap Tagihan WhatsApp'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {settlement.map((s) => {
                const isPaid = Boolean(paidStatus[s.name]);
                return (
                  <div
                    key={s.name}
                    className="rounded-3xl bg-white border border-[#E6E1D6] p-6 flex flex-col justify-between gap-5 shadow-sm"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2.5">
                          <span
                            style={{ backgroundColor: s.chip.dot }}
                            className="w-8 h-8 rounded-full text-white font-bold text-xs flex items-center justify-center"
                          >
                            {s.name.slice(0, 1)}
                          </span>
                          <div>
                            <div className="font-bold text-base text-zinc-900">{s.name}</div>
                            <div className="text-[11px] text-zinc-500">ID Tagihan #BR-{s.name.toUpperCase()}</div>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                            isPaid
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isPaid ? 'Sudah Lunas ✓' : 'Menunggu QRIS'}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#ECE7DC] flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-zinc-500">Total Tagihan</div>
                          <div className="font-mono text-2xl font-bold text-zinc-900 mt-0.5">
                            Rp {s.total.toLocaleString('id-ID')}
                          </div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">
                            Termasuk PPN &amp; Service
                          </div>
                        </div>

                        {/* Simulated Crisp QR Matrix */}
                        <div className="w-14 h-14 rounded-xl bg-white border border-zinc-200 p-1.5 grid grid-cols-4 gap-0.5 shrink-0">
                          {Array.from({ length: 16 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={`rounded-[1px] ${
                                (idx + s.total) % 2 === 0 ? 'bg-zinc-900' : 'bg-zinc-100'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPaidStatus((p) => ({ ...p, [s.name]: !isPaid }))}
                      className={`w-full py-2.5 rounded-2xl text-xs font-semibold border transition ${
                        isPaid
                          ? 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50'
                          : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {isPaid ? 'Ubah ke Belum Bayar' : 'Konfirmasi Lunas QRIS ✓'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-[#E6E1D6] bg-white px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs text-zinc-500">
        <span>BagiRata Split-Bill Studio · Perhitungan Pajak &amp; Service Proporsional</span>
        <div className="flex gap-4 font-semibold text-zinc-900">
          <button type="button" onClick={() => setPage(1)}>
            Galeri Resto
          </button>
          <button type="button" onClick={() => setPage(2)}>
            Kalkulator Struk
          </button>
          <button type="button" onClick={() => setPage(3)}>
            Settlement QRIS
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 8. KELASKILAT · FrontendMasters & Read.cv-Inspired Engineering LMS
 * ========================================================================== */
const WORKBOOK = [
  {
    id: 'm1',
    track: 'NEXT.JS 16 ARCHITECTURE',
    level: 'Intermediate · 6 Jam · 8 Modul',
    instructor: 'Fikri Bintang · Principal Engineer',
    photo:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    title: 'Server Actions Payload Integrity & Auth Guard',
    syllabus: [
      'Threat Modeling pada Endpoint HTTP POST Server Actions',
      'Validasi Schema Ketat Menggunakan Zod & Constant-Time Auth',
      'Isolasi Mutasi Database & Revalidasi Cache Terarah',
    ],
    prose:
      'Setiap Server Action di Next.js memaparkan endpoint HTTP POST publik yang dapat dipanggil langsung di luar UI komponen. Oleh sebab itu, verifikasi sesi/kredensial dan validasi tipe payload wajib dieksekusi ulang di dalam server handler sebelum menyentuh layer database.',
    code: [
      "import { z } from 'zod';",
      "import { timingSafeEqual } from 'crypto';",
      '',
      'const PriceSchema = z.object({ id: z.string().uuid(), price: z.number().int().positive() });',
      '',
      'export async function updateProductPrice(rawInput: unknown, pinHeader: string) {',
      '  const payload = PriceSchema.parse(rawInput);',
      '  if (!verifyAdminPin(pinHeader, process.env.ADMIN_PIN)) {',
      "    throw new Error('403 Forbidden: Invalid Admin Credential');",
      '  }',
      '  return db.products.update({ where: { id: payload.id }, data: { price: payload.price } });',
      '}',
    ],
    q: 'Mengapa verifikasi otorisasi wajib dijalankan di dalam setiap fungsi Server Action?',
    opts: [
      'Karena request POST ke Server Action dapat dikirim langsung oleh klien tanpa melalui tampilan UI',
      'Agar ukuran bundle CSS di sisi browser menjadi lebih kecil saat kompilasi',
    ],
    ans: 0,
  },
  {
    id: 'm2',
    track: 'POSTGRESQL & SUPABASE',
    level: 'Advanced · 8 Jam · 10 Modul',
    instructor: 'Fikri Bintang · Database Architect',
    photo:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    title: 'PostgreSQL Row-Level Security (RLS) & Tenant Isolation',
    syllabus: [
      'Arsitektur Default-Deny pada Tabel Public Schema',
      'Evaluasi Klaim JWT (auth.uid) di Dalam Ekspresi Policy SQL',
      'Pemisahan Anon Key Klien vs Service Role Key di Server',
    ],
    prose:
      'Mengaktifkan Row-Level Security (RLS) pada tabel PostgreSQL memastikan setiap query yang masuk melalui PostgREST dievaluasi per baris data. Tanpa policy SELECT eksplisit, database secara otomatis menerapkan default-deny dan menolak akses baca.',
    code: [
      'ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;',
      '',
      'CREATE POLICY "Public can view active catalog items"',
      '  ON public.products FOR SELECT',
      "  USING (status = 'ACTIVE');",
      '',
      'CREATE POLICY "Service role full control"',
      '  ON public.products FOR ALL',
      "  USING (auth.role() = 'service_role');",
    ],
    q: 'Apa perilaku default tabel PostgreSQL saat RLS diaktifkan namun belum memiliki policy?',
    opts: [
      'Seluruh baris data terbuka secara publik untuk operasi baca saja',
      'Seluruh akses baca maupun tulis ditolak secara otomatis (default-deny)',
    ],
    ans: 1,
  },
];

export function KelasKilatDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [idx, setIdx] = useState(0);
  const [previewCourse, setPreviewCourse] = useState<(typeof WORKBOOK)[0] | null>(null);
  const [studentName, setStudentName] = useState('Fikri Bintang Purnomo');
  const [answers, setAnswers] = useState<Record<string, number>>({ m1: 0 });
  const mod = WORKBOOK[idx];
  const pick = answers[mod.id];
  const score = WORKBOOK.filter((w) => answers[w.id] === w.ans).length;

  return (
    <div className="min-h-[780px] bg-[#F8F9FB] text-[#111318] flex flex-col justify-between font-sans">
      <div>
        {/* Editorial LMS Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-white flex items-center justify-center font-mono font-bold text-xs">
              {'</>'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  KelasKilat Engineering
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Cohort 2026
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Interactive Software Engineering Curriculum &amp; Verifiable Credentials
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 1 ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Katalog Kursus
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 2 ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Studio Belajar
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 3 ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sertifikat ({score}/{WORKBOOK.length})
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: KATALOG KURSUS BERFOTO VISUAL & PREVIEW SILABUS */}
        {page === 1 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  Production Case-Study Tracks
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Kurikulum Arsitektur Sistem &amp; Keamanan Aplikasi Modern.
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Belajar langsung dari studi kasus produksi dengan editor kode split-pane interaktif, evaluasi arsitektur instan, dan sertifikat kelulusan terverifikasi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-5 py-3 rounded-2xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold transition"
              >
                Lanjutkan di Studio Belajar →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKBOOK.map((w, i) => (
                <div
                  key={w.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img src={w.photo} alt={w.title} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                          {w.track}
                        </span>
                        <span className="text-xs font-mono text-slate-200">{w.level}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <div className="text-xs text-slate-500 font-medium">{w.instructor}</div>
                        <h2 className="text-xl font-bold text-slate-900 mt-1">{w.title}</h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{w.prose}</p>

                      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-2">
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                          Pokok Bahasan Silabus
                        </div>
                        {w.syllabus.map((s) => (
                          <div key={s} className="text-xs text-slate-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPreviewCourse(w)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                    >
                      Preview Silabus
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIdx(i);
                        setPage(2);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-[#0F172A] hover:bg-blue-700 text-white text-xs font-semibold transition"
                    >
                      Mulai Modul di Studio →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {previewCourse && (
              <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 space-y-4 shadow-2xl">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-mono font-semibold text-blue-600">
                        {previewCourse.track}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-0.5">{previewCourse.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewCourse(null)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs text-slate-600"
                    >
                      Tutup ✕
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{previewCourse.prose}</p>
                  <div className="space-y-2">
                    {previewCourse.syllabus.map((item, idxNum) => (
                      <div
                        key={item}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-800"
                      >
                        0{idxNum + 1}. {item}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const targetIdx = WORKBOOK.findIndex((x) => x.id === previewCourse.id);
                      setIdx(Math.max(0, targetIdx));
                      setPreviewCourse(null);
                      setPage(2);
                    }}
                    className="w-full py-3 rounded-xl bg-[#0F172A] text-white text-xs font-semibold"
                  >
                    Buka di Studio Belajar →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HALAMAN 2: STUDIO BELAJAR SPLIT-PANE */}
        {page === 2 && (
          <div className="max-w-6xl mx-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex gap-2">
                  {WORKBOOK.map((w, i) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                        idx === i
                          ? 'bg-[#0F172A] text-white'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Modul 0{i + 1}
                    </button>
                  ))}
                </div>
                <span className="font-mono text-xs text-slate-500">
                  Progres Evaluasi: {score}/{WORKBOOK.length} Selesai
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-semibold text-blue-600">{mod.track}</span>
                <h2 className="text-2xl font-bold text-slate-900">{mod.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{mod.prose}</p>
              </div>

              {/* Clean Code Block with Window Header */}
              <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0D1117] text-slate-100 shadow-md">
                <div className="px-4 py-2.5 bg-[#161B22] border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-slate-300">
                      {mod.id === 'm1' ? 'app/actions/update-price.ts' : 'supabase/migrations/rls.sql'}
                    </span>
                  </div>
                  <span>TypeScript / SQL</span>
                </div>
                <div className="p-5 font-mono text-xs overflow-x-auto space-y-1">
                  {mod.code.map((line, i) => (
                    <div key={i} className="flex gap-4 leading-6">
                      <span className="text-slate-600 select-none w-5 text-right">{i + 1}</span>
                      <span className="text-slate-200">{line || ' '}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel Kuis Interaktif */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between gap-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                    Architecture Checkpoint
                  </span>
                  <span className="text-xs text-slate-400">Wajib Lulus</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 leading-snug">{mod.q}</h3>

                <div className="space-y-2.5">
                  {mod.opts.map((opt, i) => {
                    const isSelected = pick === i;
                    const isCorrect = i === mod.ans;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAnswers((a) => ({ ...a, [mod.id]: i }))}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-semibold'
                              : 'bg-rose-50 border-rose-400 text-rose-900'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-400 text-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono font-bold">
                            {isSelected ? (isCorrect ? '✓' : '✕') : `${String.fromCharCode(65 + i)}.`}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <button
                  type="button"
                  onClick={() => setPage(3)}
                  className="w-full py-3 rounded-2xl bg-[#0F172A] hover:bg-blue-700 text-white text-xs font-semibold transition"
                >
                  Lihat Sertifikat Editorial →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: SERTIFIKAT EDITORIAL ELEGAN */}
        {page === 3 && (
          <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 shadow-xl p-8 sm:p-12 relative overflow-hidden">
              <div className="border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-center bg-gradient-to-b from-white to-slate-50/60">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 text-xs font-mono text-slate-500">
                  <span>KELASKILAT ENGINEERING ACADEMY</span>
                  <span>CREDENTIAL ID: KK-2026-8841-VERIFIED</span>
                </div>

                <div className="space-y-2 py-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-blue-700">
                    Certificate of Architectural Proficiency
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Sertifikat Kompetensi Rekayasa Perangkat Lunak
                  </h2>
                  <p className="text-xs text-slate-500">Diberikan secara resmi kepada peserta:</p>
                </div>

                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full text-center font-sans text-2xl sm:text-3xl font-bold text-slate-900 bg-white border-b-2 border-slate-900 px-4 py-2 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Klik nama di atas untuk menyesuaikan nama pada sertifikat
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Telah menyelesaikan evaluasi studi kasus produksi pada kurikulum{' '}
                  <strong className="text-slate-900">
                    Next.js 16 Server Security &amp; PostgreSQL Row-Level Security Architecture
                  </strong>{' '}
                  dengan capaian skor verifikasi{' '}
                  <strong className="text-emerald-700">
                    {score} dari {WORKBOOK.length} modul lulus
                  </strong>
                  .
                </p>

                <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left text-xs">
                  <div>
                    <div className="text-slate-400 font-mono text-[10px]">DITERBITKAN TANGGAL</div>
                    <div className="font-semibold text-slate-800 mt-0.5">18 November 2026</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-mono text-[10px]">INSTRUKTUR PENGUJI</div>
                    <div className="font-semibold text-slate-800 mt-0.5">Fikri Bintang Purnomo</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-slate-400 font-mono text-[10px]">STATUS KREDENSIAL</div>
                    <div className="font-mono font-semibold text-emerald-700 mt-0.5">
                      SHA256 · Terverifikasi
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
        <span>KelasKilat Academy · Interactive Code Sandbox &amp; Verifiable Certificate</span>
        <div className="flex gap-4 font-semibold text-slate-900">
          <button type="button" onClick={() => setPage(1)}>
            Katalog Kursus
          </button>
          <button type="button" onClick={() => setPage(2)}>
            Studio Belajar
          </button>
          <button type="button" onClick={() => setPage(3)}>
            Sertifikat
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 9. ANTREMED · OneMedical & Halodoc-Inspired Modern Clinical Portal
 * ========================================================================== */
const KLINIK_POLIS = [
  {
    id: 'UMUM',
    name: 'Poli Kedokteran Umum & MCU',
    prefix: 'A',
    num: 14,
    room: 'Ruang Konsultasi 02',
    doc: 'dr. Nadia Kusuma, MARS',
    str: 'STR-312110049281',
    photo:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    spec: 'Pemeriksaan kesehatan menyeluruh, manajemen penyakit kronis, dan paket Medical Check-Up eksekutif.',
    mcuPackage: 'Termasuk Cek Tekanan Darah, Gula Darah Sewaktu & Konsultasi Hasil Lab',
    tarif: 120000,
    slots: ['09:30', '10:30', '11:15', '14:00'],
  },
  {
    id: 'GIGI',
    name: 'Poli Spesialis Konservasi Gigi',
    prefix: 'B',
    num: 8,
    room: 'Dental Suite 05',
    doc: 'drg. Hendra Wijaya, Sp.KG',
    str: 'STR-311220084119',
    photo:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    spec: 'Scaling ultrasonic tanpa nyeri, tambal estetik sinar UV, dan perawatan saluran akar mikroskopik.',
    mcuPackage: 'Termasuk Kamera Intraoral Digital & Pembersihan Karang Gigi 2 Rahang',
    tarif: 250000,
    slots: ['13:00', '14:00', '15:30', '16:30'],
  },
  {
    id: 'ANAK',
    name: 'Poli Spesialis Kesehatan Anak',
    prefix: 'C',
    num: 5,
    room: 'Ruang Pediatri 03',
    doc: 'dr. Clarissa Putri, Sp.A',
    str: 'STR-312140091042',
    photo:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80',
    spec: 'Imunisasi dasar & booster rekomendasi IDAI, skrining tumbuh kembang, serta konsultasi nutrisi anak.',
    mcuPackage: 'Termasuk Grafik Antropometri WHO Digital & Buku Kesehatan Anak',
    tarif: 195000,
    slots: ['10:00', '11:00', '15:00', '16:00'],
  },
];

export function AntreMedDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [queues, setQueues] = useState(KLINIK_POLIS);
  const [selectedId, setSelectedId] = useState('UMUM');
  const [slot, setSlot] = useState('10:30');
  const [patient, setPatient] = useState('Bintang Purnomo');
  const [coverage, setCoverage] = useState<'UMUM' | 'BPJS' | 'ASURANSI'>('UMUM');
  const [slip, setSlip] = useState<string | null>('A-015');

  const activePoli = queues.find((q) => q.id === selectedId) || queues[0];

  const advancePoli = (id: string) => {
    setQueues((prev) => prev.map((q) => (q.id === id ? { ...q, num: q.num + 1 } : q)));
  };

  return (
    <div className="min-h-[780px] bg-[#F5F9F8] text-[#0F172A] flex flex-col justify-between font-sans">
      <div>
        {/* OneMedical Inspired Header */}
        <header className="bg-white border-b border-teal-900/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D6E6E] text-white flex items-center justify-center font-bold text-base shadow-sm">
              +
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">AntreMed Clinic</span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0D6E6E] border border-teal-200">
                  SIMRS &amp; E-Queue
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Portal Reservasi Dokter Spesialis, Tiket QR &amp; Layar Antrean Poliklinik
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-[#EBF3F1] p-1 rounded-xl border border-teal-900/10 text-xs font-medium">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 1 ? 'bg-white text-[#0D6E6E] shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dokter &amp; Paket MCU
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 2 ? 'bg-white text-[#0D6E6E] shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Booking Jam &amp; Tiket QR
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 3 ? 'bg-white text-[#0D6E6E] shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Layar Antrean Poli
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: PROFIL DOKTER & KARTU PAKET MCU */}
        {page === 1 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-[#0D6E6E] to-[#115E59] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
              <div className="max-w-2xl space-y-2">
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-white/15 text-teal-50">
                  Reservasi Tanpa Antre Lama di Lobi
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Pilih Dokter Spesialis &amp; Jadwal Praktik Hari Ini.
                </h1>
                <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
                  Setiap reservasi langsung menerbitkan tiket QR dengan estimasi waktu panggil real-time yang terhubung ke layar ruang tunggu poliklinik.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-5 py-3 rounded-2xl bg-white text-[#0D6E6E] text-xs font-bold shadow-sm hover:bg-teal-50 transition"
              >
                Ambil Nomor Antrean →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {queues.map((q) => (
                <div
                  key={q.id}
                  className="rounded-3xl bg-white border border-teal-900/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <div className="p-5 flex items-center gap-4 border-b border-slate-100">
                      <img
                        src={q.photo}
                        alt={q.doc}
                        className="w-16 h-16 rounded-2xl object-cover border border-teal-100 shrink-0"
                      />
                      <div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0D6E6E]">
                          {q.name}
                        </span>
                        <h2 className="font-bold text-base text-slate-900 mt-1">{q.doc}</h2>
                        <p className="text-[11px] font-mono text-slate-400">{q.str}</p>
                      </div>
                    </div>

                    <div className="p-5 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed">{q.spec}</p>

                      <div className="p-3.5 rounded-2xl bg-[#F5F9F8] border border-teal-900/10 space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#0D6E6E] font-semibold">
                          Fasilitas Paket Pemeriksaan
                        </div>
                        <p className="text-xs text-slate-700">{q.mcuPackage}</p>
                      </div>

                      <div className="space-y-1.5">
                        <div className="text-[11px] text-slate-400 font-medium">
                          Jam Praktik Tersedia ({q.room}):
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {q.slots.map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs"
                            >
                              {s} WIB
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Biaya Konsultasi</span>
                      <span className="font-mono font-bold text-sm text-[#0D6E6E]">
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
                      className="w-full py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#115E59] text-white text-xs font-semibold transition"
                    >
                      Pilih Jadwal Dokter Ini →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 2: BOOKING KALENDER JAM PRAKTIK & TIKET QR */}
        {page === 2 && (
          <div className="p-6 sm:p-8 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 rounded-3xl bg-white border border-teal-900/10 p-6 space-y-5 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-[#0D6E6E] bg-teal-50 px-3 py-1 rounded-full">
                  Pendaftaran Pasien Mandiri
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1.5">
                  Atur Jadwal Kunjungan &amp; Penjamin Biaya
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {queues.map((q) => (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(q.id);
                      setSlot(q.slots[0]);
                    }}
                    className={`p-3 rounded-2xl border text-left transition ${
                      selectedId === q.id
                        ? 'bg-[#0D6E6E] text-white border-[#0D6E6E] shadow-sm'
                        : 'bg-[#F5F9F8] text-slate-700 border-teal-900/10 hover:bg-teal-50/50'
                    }`}
                  >
                    <div className="font-bold">Poli {q.id}</div>
                    <div
                      className={`text-[11px] truncate mt-0.5 ${
                        selectedId === q.id ? 'text-teal-100' : 'text-slate-500'
                      }`}
                    >
                      {q.doc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Pilih Jam Kedatangan ({activePoli.room})
                </label>
                <div className="flex flex-wrap gap-2">
                  {activePoli.slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`px-4 py-2 rounded-xl font-mono text-xs border transition ${
                        slot === s
                          ? 'bg-teal-50 text-[#0D6E6E] border-[#0D6E6E] font-bold'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {s} WIB
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nama Lengkap Pasien
                  </label>
                  <input
                    type="text"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    placeholder="Nama pasien..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#F5F9F8] text-xs focus:outline-none focus:border-[#0D6E6E]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Metode Penjamin
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['UMUM', 'BPJS', 'ASURANSI'] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCoverage(c)}
                        className={`py-2.5 rounded-xl text-[11px] font-semibold border ${
                          coverage === c
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSlip(`${activePoli.prefix}-${String(activePoli.num + 1).padStart(3, '0')}`)
                }
                className="w-full py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#115E59] text-white font-semibold text-xs transition"
              >
                Terbitkan Tiket Antrean QR
              </button>
            </div>

            {/* Boarding Pass Tiket QR Pasien */}
            <div className="lg:col-span-5">
              {slip && (
                <div className="rounded-3xl bg-white border border-teal-900/15 shadow-md overflow-hidden">
                  <div className="bg-[#0D6E6E] text-white p-5 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-teal-200">
                        Digital Boarding Pass
                      </span>
                      <div className="font-bold text-base mt-0.5">Klinik Pratama AntreMed</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-mono">
                      {coverage}
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
                      <div>
                        <div className="text-xs text-slate-400">Nomor Antrean Anda</div>
                        <div className="font-mono text-4xl font-extrabold text-[#0D6E6E] mt-0.5">
                          {slip}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-medium mt-1">
                          ● Antrean sedang berjalan ({activePoli.prefix}-
                          {String(activePoli.num).padStart(3, '0')})
                        </div>
                      </div>

                      {/* QR Box */}
                      <div className="w-16 h-16 rounded-2xl bg-[#F5F9F8] border border-teal-900/15 p-2 grid grid-cols-4 gap-1">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <span
                            key={i}
                            className={`rounded-[2px] ${
                              (i + activePoli.num) % 2 === 0 ? 'bg-[#0D6E6E]' : 'bg-teal-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Nama Pasien</span>
                        <span className="font-semibold text-slate-800">{patient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dokter Pemeriksa</span>
                        <span className="font-semibold text-slate-800">{activePoli.doc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Ruang &amp; Jadwal</span>
                        <span className="font-mono font-semibold text-slate-800">
                          {activePoli.room} · {slot} WIB
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPage(3)}
                      className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition"
                    >
                      Lihat Layar TV Ruang Tunggu →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* HALAMAN 3: LAYAR ANTREAN POLIKLINIK BERSIH */}
        {page === 3 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-teal-900/10 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Layar Panggilan Poliklinik Rawat Jalan
                  </h2>
                  <p className="text-xs text-slate-500">
                    Sinkronisasi otomatis dengan meja perawat &amp; pengeras suara ruang tunggu
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs px-3 py-1.5 rounded-xl bg-teal-50 text-[#0D6E6E] font-semibold">
                Audio Chime Active · 18 Nov 2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {queues.map((q) => (
                <div
                  key={q.id}
                  className="rounded-3xl bg-white border border-teal-900/10 p-6 flex flex-col justify-between gap-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <img
                      src={q.photo}
                      alt={q.doc}
                      className="w-12 h-12 rounded-2xl object-cover border border-teal-100"
                    />
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-[#0D6E6E]">
                        {q.room}
                      </span>
                      <div className="font-bold text-sm text-slate-900">{q.doc}</div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F5F9F8] border border-teal-900/10 text-center space-y-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      Nomor Sedang Diperiksa
                    </div>
                    <div className="font-mono text-4xl font-extrabold text-[#0D6E6E]">
                      {q.prefix}-{String(q.num).padStart(3, '0')}
                    </div>
                    <div className="text-xs text-slate-500 pt-1">
                      Berikutnya: {q.prefix}-{String(q.num + 1).padStart(3, '0')} · {q.prefix}-
                      {String(q.num + 2).padStart(3, '0')}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => advancePoli(q.id)}
                    className="w-full py-3 rounded-2xl bg-[#0D6E6E] hover:bg-[#115E59] text-white text-xs font-semibold transition"
                  >
                    Panggil Pasien Berikutnya →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-teal-900/10 bg-white px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
        <span>AntreMed Clinical Portal · Terintegrasi Rekam Medis &amp; Penjamin BPJS/Swasta</span>
        <div className="flex gap-4 font-semibold text-[#0D6E6E]">
          <button type="button" onClick={() => setPage(1)}>
            Dokter &amp; Layanan
          </button>
          <button type="button" onClick={() => setPage(2)}>
            Booking Tiket QR
          </button>
          <button type="button" onClick={() => setPage(3)}>
            Layar Antrean
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 10. LEGALDRAFT ID · Stripe Atlas & Clerky-Inspired Legal Document Studio
 * ========================================================================== */
const LEGAL_TEMPLATES = [
  {
    id: 'SPK' as const,
    code: 'DOC-SPK-01',
    badge: 'Paling Sering Dipakai',
    name: 'Surat Perjanjian Kerja (SPK) Pengembangan Software',
    desc: 'Kontrak komersial pembuatan aplikasi web/mobile lengkap dengan ruang lingkup kerja, milestone termin DP & UAT, masa garansi bug 30 hari, serta klausul serah terima HAKI kode sumber.',
    clauses: [
      'Pasal 1 · Nilai Proyek & Jadwal Pembayaran Termin DP / UAT',
      'Pasal 2 · Hak Kekayaan Intelektual & Serah Terima Repository',
      'Pasal 3 · Batas Perubahan Lingkup Kerja (Change Request) & Garansi',
    ],
  },
  {
    id: 'NDA' as const,
    code: 'DOC-NDA-02',
    badge: 'Perlindungan Rahasia Dagang',
    name: 'Perjanjian Kerahasiaan (Mutual Non-Disclosure Agreement)',
    desc: 'Dokumen perlindungan arsitektur sistem, kredensial API/database, data pengguna, dan rahasia bisnis sebelum proses audit teknis atau kolaborasi pengembangan dimulai.',
    clauses: [
      'Pasal 1 · Cakupan Informasi Rahasia & Kredensial Infrastruktur',
      'Pasal 2 · Kewajiban Non-Disclosure & Larangan Reverse Engineering',
      'Pasal 3 · Masa Berlaku Kerahasiaan & Penyelesaian Sengketa BANI/PN',
    ],
  },
];

export function LegalDraftDemo({ activePage, onPageChange }: MultiPageDemoProps) {
  const [page, setPage] = useSyncedPage(activePage, onPageChange, 1);
  const [docType, setDocType] = useState<'SPK' | 'NDA'>('SPK');
  const [client, setClient] = useState('PT Nusantara Digital Karya');
  const [scope, setScope] = useState(
    'Pengembangan Sistem Kasir POS Multi-Cabang & Integrasi Database Supabase'
  );
  const [value, setValue] = useState(25000000);
  const [dpPct, setDpPct] = useState(50);
  const [vault, setVault] = useState([
    {
      no: 'SPK/2026/XI/041',
      type: 'SPK Software',
      client: 'PT Nusantara Digital Karya',
      total: 25000000,
      status: 'DP 50% TERBAYAR',
    },
    {
      no: 'NDA/2026/XI/019',
      type: 'Mutual NDA',
      client: 'CV Kreasi Medika Utama',
      total: 18500000,
      status: 'DITANDATANGANI',
    },
    {
      no: 'SPK/2026/X/012',
      type: 'SPK Software',
      client: 'PT Kopi Roastery Nusantara',
      total: 14000000,
      status: 'LUNAS 100%',
    },
  ]);

  const dpAmt = Math.round((value * dpPct) / 100);
  const finalAmt = Math.max(0, value - dpAmt);

  const saveToVault = () => {
    setVault((prev) => [
      {
        no: `${docType}/2026/XI/0${Math.floor(42 + Math.random() * 50)}`,
        type: docType === 'SPK' ? 'SPK Software' : 'Mutual NDA',
        client,
        total: value,
        status: 'MENUNGGU TTD',
      },
      ...prev,
    ]);
    setPage(3);
  };

  return (
    <div className="min-h-[780px] bg-[#F3F4F6] text-slate-900 flex flex-col justify-between font-sans">
      <div>
        {/* Stripe Atlas Inspired Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-sans font-bold text-base shadow-sm">
              §
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900">
                  LegalDraft ID
                </span>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Hukum Perdata RI
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Otomasi Kontrak Proyek IT, Kalkulator Termin &amp; Brankas Dokumen
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 1 ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Template Dokumen
            </button>
            <button
              type="button"
              onClick={() => setPage(2)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 2 ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Live Editor A4
            </button>
            <button
              type="button"
              onClick={() => setPage(3)}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                page === 3 ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brankas Kontrak ({vault.length})
            </button>
          </nav>
        </header>

        {/* HALAMAN 1: KARTU PRODUK DOKUMEN HUKUM ALA STRIPE ATLAS */}
        {page === 1 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 shadow-sm">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                  Standar Kontrak Software House &amp; Konsultan IT
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Susun Kontrak Proyek Software &amp; Klausul Termin dalam Hitungan Detik.
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lindungi hak kekayaan intelektual dan arus kas proyek Anda dengan template perjanjian kerja berstandar hukum Republik Indonesia.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition shadow-sm"
              >
                Buka Studio Dokumen A4 →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEGAL_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.code}
                  className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between gap-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {tpl.code}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{tpl.badge}</span>
                    </div>

                    <h2 className="font-bold text-xl text-slate-900">{tpl.name}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tpl.desc}</p>

                    <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 space-y-2">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                        Pasal Perlindungan Utama
                      </div>
                      {tpl.clauses.map((c) => (
                        <div key={c} className="text-xs text-slate-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setDocType(tpl.id);
                      setPage(2);
                    }}
                    className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition"
                  >
                    Gunakan Template di Live Editor A4 →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAMAN 2: LIVE EDITOR DOKUMEN A4 BERBAYANG LEMBUT */}
        {page === 2 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200 p-5 space-y-4 shadow-sm text-xs">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 font-semibold">
                  Parameter Kontrak
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  Variabel Klausul &amp; Termin
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {(['SPK', 'NDA'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDocType(t)}
                    className={`py-2 rounded-xl font-semibold border transition ${
                      docType === t
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Dokumen {t}
                  </button>
                ))}
              </div>

              <div>
                <label className="block font-medium text-slate-600 mb-1">Entitas Klien (Pihak Pertama)</label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-600 mb-1">Ruang Lingkup Pekerjaan</label>
                <textarea
                  rows={2}
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-600 mb-1">Nilai Total Kontrak (Rp)</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-medium text-slate-600 mb-1">
                  <span>Persentase Termin I (DP)</span>
                  <span className="font-mono font-bold text-indigo-600">{dpPct}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  step={5}
                  value={dpPct}
                  onChange={(e) => setDpPct(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={saveToVault}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                >
                  Simpan ke Brankas Kontrak →
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 transition"
                >
                  Cetak / Ekspor PDF A4
                </button>
              </div>
            </div>

            {/* Lembar Kertas A4 Berbayang Lembut */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.08)] p-8 sm:p-12 space-y-6 font-sans text-slate-900">
                <div className="text-center border-b border-slate-300 pb-5 space-y-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    Dokumen Perjanjian Komersial · Standar Hukum Republik Indonesia
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {docType === 'SPK'
                      ? 'SURAT PERJANJIAN KERJA PENGEMBANGAN PERANGKAT LUNAK'
                      : 'PERJANJIAN KERAHASIAAN INFORMASI (MUTUAL NDA)'}
                  </h2>
                  <div className="font-mono text-xs text-slate-500">
                    Nomor Referensi: {docType}/2026/XI/041
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-justify text-slate-700">
                  Pada hari ini, Rabu tanggal Delapan Belas bulan November tahun Dua Ribu Dua Puluh Enam (18-11-2026), perjanjian ini dibuat dan disepakati oleh{' '}
                  <strong className="text-slate-900">{client}</strong> (selanjutnya disebut sebagai{' '}
                  <strong>Pihak Pertama</strong>) dan Studio Rekayasa Perangkat Lunak BiruMarket (selanjutnya disebut sebagai{' '}
                  <strong>Pihak Kedua</strong>) untuk pelaksanaan lingkup pekerjaan:{' '}
                  <em className="text-slate-900 font-medium">{scope}</em>.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">
                    Pasal 1 · Nilai Pekerjaan &amp; Jadwal Pembayaran Termin
                  </div>
                  <div className="font-mono text-xs rounded-xl border border-slate-200 p-4 bg-slate-50/80 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nilai Total Kontrak</span>
                      <span className="font-bold text-slate-900">Rp {value.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Termin I · Down Payment ({dpPct}%)</span>
                      <span className="font-semibold text-indigo-700">Rp {dpAmt.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2">
                      <span className="text-slate-500">Termin II · Serah Terima UAT ({100 - dpPct}%)</span>
                      <span className="font-semibold text-slate-900">Rp {finalAmt.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm">
                  <div className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900">
                    Pasal 2 · Hak Kekayaan Intelektual &amp; Serah Terima Source Code
                  </div>
                  <p className="leading-relaxed text-justify text-slate-700">
                    Seluruh hak cipta kode sumber, skema basis data, dan dokumentasi teknis diserahkan sepenuhnya kepada{' '}
                    <strong>{client}</strong> segera setelah pelunasan Termin II diterima secara penuh oleh Pihak Kedua.
                  </p>
                </div>

                <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs font-sans">
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/70">
                    <div className="text-slate-500 mb-10">Pihak Pertama (Klien)</div>
                    <div className="border-t border-slate-300 pt-2 font-bold text-slate-900">
                      {client}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/70">
                    <div className="text-slate-500 mb-10">Pihak Kedua (Pelaksana)</div>
                    <div className="border-t border-slate-300 pt-2 font-bold text-slate-900">
                      Fikri Bintang Purnomo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HALAMAN 3: TABEL BRANKAS KONTRAK */}
        {page === 3 && (
          <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-wrap justify-between items-center gap-4 shadow-sm">
              <div>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                  Contract Repository &amp; Milestone Ledger
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1.5">
                  Brankas Arsip SPK, NDA &amp; Status Pembayaran Termin
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPage(2)}
                className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                + Buat Dokumen Kontrak Baru
              </button>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                    <tr>
                      <th className="py-3.5 px-5">NOMOR DOKUMEN</th>
                      <th className="py-3.5 px-5">JENIS PERJANJIAN</th>
                      <th className="py-3.5 px-5">ENTITAS KLIEN</th>
                      <th className="py-3.5 px-5 text-right">NILAI KONTRAK</th>
                      <th className="py-3.5 px-5">STATUS TERMIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80">
                    {vault.map((v) => (
                      <tr key={v.no} className="hover:bg-slate-50/70 transition">
                        <td className="py-4 px-5 font-mono font-bold text-indigo-700">{v.no}</td>
                        <td className="py-4 px-5 text-slate-600">{v.type}</td>
                        <td className="py-4 px-5 font-semibold text-slate-900">{v.client}</td>
                        <td className="py-4 px-5 font-mono font-semibold text-right text-slate-900">
                          Rp {v.total.toLocaleString('id-ID')}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                            {v.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-200 bg-white px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
        <span>LegalDraft ID · Otomasi Dokumen Kontrak Proyek Perangkat Lunak</span>
        <div className="flex gap-4 font-semibold text-slate-900">
          <button type="button" onClick={() => setPage(1)}>
            Template Dokumen
          </button>
          <button type="button" onClick={() => setPage(2)}>
            Live Editor A4
          </button>
          <button type="button" onClick={() => setPage(3)}>
            Brankas Kontrak
          </button>
        </div>
      </footer>
    </div>
  );
}
