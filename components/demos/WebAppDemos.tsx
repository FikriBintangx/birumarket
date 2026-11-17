'use client';

import { useState } from 'react';
import {
  Activity,
  RefreshCw,
  Plus,
  Copy,
  Check,
  BookOpen,
  Award,
  Stethoscope,
  FileText,
  Printer,
  Send,
} from 'lucide-react';

/* ============================================================================
 * 6. PULSEOPS · Uptime Monitor & Incident Status Page SaaS
 * ========================================================================== */
const INITIAL_NODES = [
  { id: 'n1', name: 'Core API Gateway (ap-southeast-1)', url: 'https://api.birumarket.web.id', latency: 24, status: 'Operational' as const, history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { id: 'n2', name: 'Supabase Auth & Postgres Cluster', url: 'https://db.birumarket.web.id', latency: 38, status: 'Operational' as const, history: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1] },
  { id: 'n3', name: 'Payment Webhook Worker (QRIS)', url: 'https://hooks.birumarket.web.id', latency: 112, status: 'Degraded' as const, history: [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1] },
  { id: 'n4', name: 'CDN Edge Asset Delivery', url: 'https://cdn.birumarket.web.id', latency: 14, status: 'Operational' as const, history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
];

export function PulseOpsDemo() {
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [filter, setFilter] = useState<'All' | 'Operational' | 'Degraded'>('All');
  const [incidents, setIncidents] = useState([
    { id: 'inc-1', title: 'Elevated webhook queue latency (12m)', status: 'Resolved', time: 'Hari ini · 14:20 WIB' },
    { id: 'inc-2', title: 'Scheduled TLS certificate rotation', status: 'Completed', time: 'Kemarin · 02:00 WIB' },
  ]);
  const [newIncident, setNewIncident] = useState('');

  const runPingCheck = () => {
    setNodes((prev) =>
      prev.map((n) => {
        const nextLat = Math.max(11, n.latency + Math.floor(Math.random() * 21) - 10);
        const nextStatus = nextLat > 95 ? ('Degraded' as const) : ('Operational' as const);
        return {
          ...n,
          latency: nextLat,
          status: nextStatus,
          history: [...n.history.slice(1), nextStatus === 'Operational' ? 1 : 0],
        };
      })
    );
  };

  const addIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.trim()) return;
    setIncidents((p) => [
      { id: 'inc-' + Date.now(), title: newIncident.trim(), status: 'Investigating', time: 'Baru saja' },
      ...p,
    ]);
    setNewIncident('');
  };

  const visibleNodes = filter === 'All' ? nodes : nodes.filter((n) => n.status === filter);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#070B14] text-slate-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-base sm:text-lg text-white">
                PULSEOPS · REAL-TIME STATUS &amp; UPTIME MONITOR
              </h1>
              <p className="text-xs text-slate-400">Multi-Node Telemetry · Incident Timeline Publisher</p>
            </div>
          </div>

          <button
            type="button"
            onClick={runPingCheck}
            className="min-h-[42px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#022C22] font-mono font-bold text-xs inline-flex items-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RUN PING CHECK</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['All', 'Operational', 'Degraded'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold border transition ${
                filter === f
                  ? 'bg-emerald-500 text-[#022C22] border-emerald-500'
                  : 'bg-[#0F172A] text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {visibleNodes.map((n) => (
            <div
              key={n.id}
              className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      n.status === 'Operational' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                  <h2 className="font-bold text-sm sm:text-base text-white">{n.name}</h2>
                </div>
                <p className="font-mono text-xs text-slate-400 mt-1">{n.url}</p>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className={n.status === 'Operational' ? 'text-emerald-400' : 'text-amber-400'}>
                    {n.status}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold">
                    {n.latency} ms
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {n.history.map((ok, i) => (
                    <span
                      key={i}
                      className={`w-3 h-5 rounded-sm ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            Incident Timeline &amp; Post Update
          </h2>
          <form onSubmit={addIncident} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              placeholder="Publikasikan update insiden baru (misal: Redis cache failover selesai)..."
              value={newIncident}
              onChange={(e) => setNewIncident(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#070B14] border border-slate-700 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold"
            >
              POST UPDATE
            </button>
          </form>

          <div className="divide-y divide-slate-800">
            {incidents.map((inc) => (
              <div key={inc.id} className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-mono text-amber-300 font-bold mr-2">[{inc.status}]</span>
                  <span className="text-slate-200">{inc.title}</span>
                </div>
                <span className="font-mono text-slate-500">{inc.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 7. BAGIRATA · Neo-Brutalist Smart Receipt Splitter
 * ========================================================================== */
interface ReceiptEntry {
  id: string;
  name: string;
  price: number;
  assigned: string[];
}

export function BagiRataDemo() {
  const [people, setPeople] = useState<string[]>(['Biru', 'Raka', 'Nabila']);
  const [newPerson, setNewPerson] = useState('');
  const [items, setItems] = useState<ReceiptEntry[]>([
    { id: 'r1', name: 'Wagyu Donburi Bowl', price: 145000, assigned: ['Biru', 'Raka'] },
    { id: 'r2', name: 'Truffle Fries Shareable', price: 68000, assigned: ['Biru', 'Raka', 'Nabila'] },
    { id: 'r3', name: 'Iced Matcha Latte', price: 42000, assigned: ['Nabila'] },
    { id: 'r4', name: 'Sparkling Yuzu', price: 36000, assigned: ['Biru'] },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [applyTax, setApplyTax] = useState(true);
  const [applyService, setApplyService] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleAssign = (itemId: string, person: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== itemId) return it;
        const exists = it.assigned.includes(person);
        return {
          ...it,
          assigned: exists ? it.assigned.filter((p) => p !== person) : [...it.assigned, person],
        };
      })
    );
  };

  const addPerson = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newPerson.trim();
    if (!clean || people.includes(clean)) return;
    setPeople((p) => [...p, clean]);
    setNewPerson('');
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const pr = Number(newItemPrice);
    if (!newItemName.trim() || !pr || pr <= 0) return;
    setItems((p) => [
      ...p,
      { id: 'r-' + Date.now(), name: newItemName.trim(), price: pr, assigned: [...people] },
    ]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const multiplier = (applyTax ? 0.11 : 0) + (applyService ? 0.05 : 0) + 1;

  const totalsPerPerson = people.map((person) => {
    const rawShare = items.reduce((sum, item) => {
      if (!item.assigned.includes(person) || item.assigned.length === 0) return sum;
      return sum + item.price / item.assigned.length;
    }, 0);
    return {
      person,
      raw: Math.round(rawShare),
      final: Math.round(rawShare * multiplier),
    };
  });

  const copySummary = () => {
    const lines = [
      'Ringkasan Split Bill (BagiRata):',
      ...totalsPerPerson.map((t) => `- ${t.person}: Rp ${t.final.toLocaleString('id-ID')}`),
    ].join('\n');
    navigator.clipboard?.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#FFFDF7] text-[#0F172A] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-[#FFE66D] border-2 border-[#0F172A] rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_#0F172A] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-mono font-bold text-lg sm:text-xl">
              BAGIRATA · SMART RECEIPT SPLITTER
            </h1>
            <p className="text-xs font-semibold">Neo-Brutalist Bill Calculator · Proporsional PPN 11% + Service 5%</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold font-mono">
            <label className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border-2 border-[#0F172A]">
              <input type="checkbox" checked={applyTax} onChange={(e) => setApplyTax(e.target.checked)} />
              PPN 11%
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-lg border-2 border-[#0F172A]">
              <input type="checkbox" checked={applyService} onChange={(e) => setApplyService(e.target.checked)} />
              SVC 5%
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Receipt Items */}
          <div className="lg:col-span-7 bg-white border-2 border-[#0F172A] rounded-2xl p-5 shadow-[4px_4px_0px_#0F172A] space-y-4">
            <form onSubmit={addPerson} className="flex gap-2">
              <input
                type="text"
                placeholder="Tambah nama teman..."
                value={newPerson}
                onChange={(e) => setNewPerson(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border-2 border-[#0F172A] text-sm font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0F172A] text-white font-mono text-xs font-bold"
              >
                + ORANG
              </button>
            </form>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl border-2 border-[#0F172A] bg-[#F8FAFC] space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="font-mono text-sm font-bold text-[#1D4ED8]">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {people.map((p) => {
                      const active = item.assigned.includes(p);
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => toggleAssign(item.id, p)}
                          className={`px-3 py-1 rounded-lg font-mono text-xs font-bold border-2 border-[#0F172A] transition ${
                            active ? 'bg-[#FFE66D] text-[#0F172A]' : 'bg-white text-slate-400'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={addItem} className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-2 border-t-2 border-dashed border-slate-300">
              <input
                type="text"
                placeholder="Nama menu baru..."
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="sm:col-span-6 px-3 py-2 rounded-xl border-2 border-[#0F172A] text-xs font-medium"
              />
              <input
                type="number"
                placeholder="Harga (Rp)"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                className="sm:col-span-4 px-3 py-2 rounded-xl border-2 border-[#0F172A] text-xs font-mono"
              />
              <button
                type="submit"
                className="sm:col-span-2 px-3 py-2 rounded-xl bg-[#10B981] border-2 border-[#0F172A] font-mono text-xs font-bold flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Breakdown */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl p-5 border-2 border-[#0F172A] shadow-[4px_4px_0px_#1D4ED8] space-y-4">
            <h2 className="font-mono text-sm font-bold text-[#FFE66D]">RINCIAN PER ORANG</h2>
            <div className="space-y-3">
              {totalsPerPerson.map((t) => (
                <div key={t.person} className="p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-base">{t.person}</div>
                    <div className="font-mono text-[11px] text-slate-400">
                      Subtotal menu: Rp {t.raw.toLocaleString('id-ID')}
                    </div>
                  </div>
                  <div className="font-mono text-base font-bold text-[#FFE66D]">
                    Rp {t.final.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={copySummary}
              className="w-full min-h-[46px] rounded-xl bg-[#10B981] hover:bg-emerald-400 text-[#022C22] font-mono font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'DISALIN KE CLIPBOARD!' : 'SALIN RINGKASAN TAGIHAN WA'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 8. KELASKILAT · Interactive Cohort Bootcamp & Quiz LMS
 * ========================================================================== */
const LESSONS = [
  {
    id: 'm1',
    title: '01. Arsitektur Next.js App Router & Server Actions',
    duration: '18 Menit',
    summary:
      'Memisahkan Server Components untuk fetching database berlatensi rendah dan Client Components khusus untuk interaksi browser.',
    question: 'Mengapa setiap Server Action tetap wajib memvalidasi izin user di backend?',
    options: [
      'Payload HTTP client dapat dimanipulasi oleh penyerang sebelum mencapai server',
      'Supaya file CSS terkompilasi lebih cepat saat development',
    ],
    answerIdx: 0,
  },
  {
    id: 'm2',
    title: '02. Row-Level Security (RLS) pada PostgreSQL & Supabase',
    duration: '24 Menit',
    summary:
      'Menerapkan policy otorisasi berbasis JWT langsung di level baris tabel SQL untuk mencegah IDOR lintas pengguna.',
    question: 'Apa akibatnya jika tabel Supabase memiliki RLS aktif namun tidak ada policy SELECT?',
    options: [
      'Semua data otomatis bisa dibaca publik tanpa login',
      'Query client mengembalikan array kosong karena default-deny',
    ],
    answerIdx: 1,
  },
  {
    id: 'm3',
    title: '03. Verifikasi Signature Webhook Payment Gateway',
    duration: '21 Menit',
    summary:
      'Memverifikasi HMAC-SHA256 pada header callback Tripay atau Midtrans sebelum memperbarui status pesanan menjadi PAID.',
    question: 'Header atau algoritma apa yang umum dipakai memvalidasi integritas callback webhook?',
    options: [
      'HMAC-SHA256 menggunakan private callback secret',
      'Base64 encode pada nama pelanggan',
    ],
    answerIdx: 0,
  },
];

export function KelasKilatDemo() {
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const lesson = LESSONS[activeLessonIdx];
  const chosen = selectedAnswers[lesson.id];
  const isCorrect = chosen === lesson.answerIdx;
  const progressPct = Math.round((completedIds.length / LESSONS.length) * 100);

  const submitQuiz = (idx: number) => {
    setSelectedAnswers((p) => ({ ...p, [lesson.id]: idx }));
    if (idx === lesson.answerIdx && !completedIds.includes(lesson.id)) {
      setCompletedIds((p) => [...p, lesson.id]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#F8FAFC] text-[#0F172A] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Syllabus */}
        <aside className="lg:col-span-4 bg-[#1E1B4B] text-white rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base">KELASKILAT LMS</h1>
              <p className="font-mono text-[11px] text-indigo-200">Progres Cohort: {progressPct}%</p>
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-indigo-950 overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all" style={{ width: `${progressPct}%` }} />
          </div>

          <div className="space-y-2">
            {LESSONS.map((l, idx) => {
              const active = idx === activeLessonIdx;
              const done = completedIds.includes(l.id);
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setActiveLessonIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition ${
                    active
                      ? 'bg-indigo-600 border-indigo-400 text-white'
                      : 'bg-indigo-950/60 border-indigo-900 text-indigo-200 hover:bg-indigo-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-bold">
                    <span className="line-clamp-1">{l.title}</span>
                    {done && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <span className="font-mono text-[10px] opacity-75">{l.duration}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Lesson & Quiz Stage */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <span className="font-mono text-xs text-indigo-300 uppercase">
              MATERI AKTIF · {lesson.duration}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold">{lesson.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{lesson.summary}</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <span className="font-mono text-xs font-bold uppercase text-indigo-600">
              CHECKPOINT QUIZ INTERAKTIF
            </span>
            <h3 className="font-bold text-base text-[#0F172A]">{lesson.question}</h3>

            <div className="space-y-2.5">
              {lesson.options.map((opt, idx) => {
                const isPicked = chosen === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => submitQuiz(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition ${
                      isPicked
                        ? idx === lesson.answerIdx
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'bg-slate-50 border-slate-200 hover:border-indigo-400'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {chosen !== undefined && (
              <div
                className={`p-3.5 rounded-xl text-xs font-bold ${
                  isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}
              >
                {isCorrect
                  ? 'Benar! Modul ditandai selesai dan ditambahkan ke progres kelulusan.'
                  : 'Kurang tepat. Coba pilih opsi lain untuk menuntaskan modul ini.'}
              </div>
            )}
          </div>

          {progressPct === 100 && (
            <div className="bg-indigo-50 border-2 border-indigo-600 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-indigo-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-indigo-950">Sertifikat Kelulusan Terbuka!</h4>
                  <p className="text-xs text-indigo-800">Seluruh 3 modul dan kuis telah diselesaikan.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 9. ANTREMED · Clinic Live Queue & Doctor Slot Booking Portal
 * ========================================================================== */
const DOCTORS = [
  { id: 'doc1', poli: 'Poli Umum', name: 'dr. Nadia Kusuma, MARS', slots: ['09:30', '10:30', '11:15'] },
  { id: 'doc2', poli: 'Poli Gigi', name: 'drg. Hendra Wijaya', slots: ['13:00', '14:00', '15:30'] },
  { id: 'doc3', poli: 'Poli Anak', name: 'dr. Clarissa Putri, Sp.A', slots: ['10:00', '11:00', '16:00'] },
];

export function AntreMedDemo() {
  const [currentNumber, setCurrentNumber] = useState(14);
  const [poliFilter, setPoliFilter] = useState('Semua');
  const [selectedDoc, setSelectedDoc] = useState(DOCTORS[0]);
  const [selectedSlot, setSelectedSlot] = useState('10:30');
  const [patientName, setPatientName] = useState('Bintang Purnomo');
  const [ticketNo, setTicketNo] = useState<string | null>(null);

  const visibleDocs = poliFilter === 'Semua' ? DOCTORS : DOCTORS.filter((d) => d.poli === poliFilter);

  const bookSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    setTicketNo(`A-0${currentNumber + 1}`);
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#F0FDFA] text-[#0F172A] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-[#0F766E] text-white rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg">ANTREMED · LIVE CLINIC QUEUE &amp; BOOKING</h1>
              <p className="text-xs text-teal-100">Botanical Mint Portal · Real-Time Counter &amp; Slot Jadwal</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCurrentNumber((n) => n + 1)}
            className="px-4 py-2 rounded-xl bg-white text-[#0F766E] font-mono text-xs font-bold hover:bg-teal-50 transition"
          >
            Simulasi Panggil Antrian Berikutnya
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Live Queue Counter */}
          <div className="lg:col-span-5 bg-white border border-teal-200 rounded-2xl p-6 space-y-4">
            <span className="font-mono text-xs font-bold uppercase text-[#0F766E]">
              ANTRIAN SEDANG DILAYANI
            </span>
            <div className="bg-[#CCFBF1] rounded-2xl p-6 text-center">
              <div className="font-mono text-5xl font-extrabold text-[#0F766E]">
                A-0{currentNumber}
              </div>
              <div className="text-xs font-bold text-[#115E59] mt-2">
                {selectedDoc.poli} · Ruang Konsultasi 02
              </div>
            </div>

            {ticketNo && (
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-[#0F766E] space-y-1.5">
                <div className="font-mono text-xs font-bold text-[#0F766E]">TIKET DIGITAL TERBIT</div>
                <div className="font-mono text-2xl font-extrabold text-[#0F172A]">{ticketNo}</div>
                <div className="text-xs text-slate-700">
                  Pasien: <strong>{patientName}</strong> · {selectedDoc.name} ({selectedSlot} WIB)
                </div>
              </div>
            )}
          </div>

          {/* Right: Slot Booking */}
          <form onSubmit={bookSlot} className="lg:col-span-7 bg-white border border-teal-200 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {['Semua', 'Poli Umum', 'Poli Gigi', 'Poli Anak'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPoliFilter(p)}
                  className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold border transition ${
                    poliFilter === p
                      ? 'bg-[#0F766E] text-white border-[#0F766E]'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {visibleDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedDoc.id === doc.id
                      ? 'bg-[#F0FDFA] border-[#0F766E] ring-1 ring-[#0F766E]'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#0F172A]">{doc.name}</span>
                    <span className="font-mono text-[11px] font-bold text-[#0F766E]">{doc.poli}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {doc.slots.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoc(doc);
                          setSelectedSlot(s);
                        }}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition ${
                          selectedDoc.id === doc.id && selectedSlot === s
                            ? 'bg-[#0F766E] text-white border-[#0F766E]'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {s} WIB
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <input
                type="text"
                required
                placeholder="Nama lengkap pasien..."
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm inline-flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Ambil Nomor Antrian</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 10. LEGALDRAFT ID · Generator SPK, NDA & Invoice Termin Otomatis
 * ========================================================================== */
export function LegalDraftDemo() {
  const [docType, setDocType] = useState<'SPK' | 'NDA'>('SPK');
  const [clientName, setClientName] = useState('PT Nusantara Digital Karya');
  const [projectScope, setProjectScope] = useState('Pengembangan Aplikasi Kasir POS & Integrasi Supabase');
  const [contractValue, setContractValue] = useState(25000000);
  const [dpPercent, setDpPercent] = useState(50);

  const dpAmount = Math.round((contractValue * dpPercent) / 100);
  const finalAmount = Math.max(0, contractValue - dpAmount);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#E2E8F0] text-[#0F172A] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-300 p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
            <FileText className="w-5 h-5 text-[#1D4ED8]" />
            <h1 className="font-mono font-bold text-sm uppercase text-[#0B2545]">
              LEGALDRAFT ID · PARAMETER KONTRAK
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(['SPK', 'NDA'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setDocType(t)}
                className={`py-2 rounded-xl font-mono text-xs font-bold border transition ${
                  docType === t ? 'bg-[#0B2545] text-white border-[#0B2545]' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {t === 'SPK' ? 'Surat Perjanjian (SPK)' : 'Perjanjian Kerahasiaan (NDA)'}
              </button>
            ))}
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-600 uppercase mb-1">
              Nama Klien / Perusahaan
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] font-bold text-slate-600 uppercase mb-1">
              Ruang Lingkup Proyek
            </label>
            <textarea
              rows={2}
              value={projectScope}
              onChange={(e) => setProjectScope(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] font-bold text-slate-600 uppercase mb-1">
                Nilai Kontrak (Rp)
              </label>
              <input
                type="number"
                value={contractValue}
                onChange={(e) => setContractValue(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] font-bold text-slate-600 uppercase mb-1">
                Persentase DP ({dpPercent}%)
              </label>
              <input
                type="range"
                min={20}
                max={80}
                step={5}
                value={dpPercent}
                onChange={(e) => setDpPercent(Number(e.target.value))}
                className="w-full mt-3 accent-[#1D4ED8]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full min-h-[46px] rounded-xl bg-[#0B2545] hover:bg-[#123663] text-white font-bold text-sm flex items-center justify-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF (A4)</span>
          </button>
        </div>

        {/* Live A4 Document Preview */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-300 shadow-lg p-7 sm:p-10 space-y-5 font-serif">
          <div className="border-b-2 border-[#0B2545] pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
              {docType === 'SPK' ? 'SURAT PERJANJIAN KERJA (SPK)' : 'PERJANJIAN KERAHASIAAN (NDA)'}
            </h2>
            <p className="font-mono text-xs text-slate-500 mt-1">
              NOMOR: {docType}/2026/XI/041 · HUKUM REPUBLIK INDONESIA
            </p>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 font-sans">
            Pada hari ini disepakati perjanjian antara <strong>{clientName}</strong> (selaku Pihak Pertama) dan Penyedia Jasa Rekayasa Perangkat Lunak (selaku Pihak Kedua) untuk pelaksanaan pekerjaan: <strong>{projectScope}</strong>.
          </p>

          <div className="space-y-3 font-sans text-sm text-slate-700">
            <div>
              <h3 className="font-bold text-[#0B2545]">PASAL 1 · NILAI KONTRAK &amp; TERMIN PEMBAYARAN</h3>
              <ul className="mt-1.5 space-y-1 font-mono text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <li>Total Nilai Kontrak : Rp {contractValue.toLocaleString('id-ID')}</li>
                <li>Termin I (DP {dpPercent}%) : Rp {dpAmount.toLocaleString('id-ID')} (Saat kontrak ditandatangani)</li>
                <li>Termin II ({100 - dpPercent}%) : Rp {finalAmount.toLocaleString('id-ID')} (Saat UAT &amp; serah terima kode)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#0B2545]">PASAL 2 · KEPEMILIKAN KODE SUMBER &amp; KERAHASIAAN</h3>
              <p className="mt-1 leading-relaxed">
                Seluruh repositori kode sumber, skema basis data, serta kredensial teknis yang berkaitan dengan pekerjaan ini dijaga kerahasiaannya oleh kedua belah pihak. Hak kepemilikan komersial kode beralih penuh kepada {clientName} setelah pelunasan Termin II diterima.
              </p>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-6 text-center text-xs font-sans">
            <div className="border-t border-slate-300 pt-2">Pihak Pertama ({clientName})</div>
            <div className="border-t border-slate-300 pt-2">Pihak Kedua (Lead Engineer)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
