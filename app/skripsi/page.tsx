'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/catalog-data';
import {
  GraduationCap,
  Code2,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Layers,
  BarChart3,
  BookOpen,
} from 'lucide-react';

interface PackageOption {
  id: string;
  name: string;
  category: string;
  desc: string;
  estPrice: string;
  estDuration: string;
  badge?: string;
}

const SERVICE_PACKAGES: PackageOption[] = [
  {
    id: 'full-bundle',
    name: 'Paket Skripsi Komplit (Bab 1-5 + Aplikasi + Jurnal)',
    category: 'All-In-One',
    desc: 'Penyusunan naskah utuh Bab 1 sampai Bab 5, pembuatan full source code aplikasi (Web/Mobile/AI), olah data pengujian, draf artikel jurnal, dan slide presentasi sidang.',
    estPrice: 'Mulai Rp 3.500.000',
    estDuration: '14 - 21 Hari',
    badge: 'Paling Populer',
  },
  {
    id: 'app-only',
    name: 'Pembuatan Aplikasi / Source Code Saja',
    category: 'Engineering',
    desc: 'Pengembangan sistem web (Next.js/React/Laravel), mobile app (Flutter/Android), model AI/Machine Learning (Python/YOLO/NLP), atau IoT lengkap dengan database & API siap demo.',
    estPrice: 'Mulai Rp 1.500.000',
    estDuration: '5 - 10 Hari',
    badge: 'Khusus IT',
  },
  {
    id: 'proposal',
    name: 'Proposal Skripsi & Seminar Proposal (Bab 1-3)',
    category: 'Academic',
    desc: 'Penyusunan Latar Belakang Masalah, Rumusan, Tinjauan Pustaka, State-of-the-Art matrix 10+ jurnal bereputasi, dan Metodologi Penelitian siap diseminarkan.',
    estPrice: 'Mulai Rp 1.200.000',
    estDuration: '5 - 7 Hari',
  },
  {
    id: 'data-bab4',
    name: 'Olah Data Statistik, Pengujian & Bab 4',
    category: 'Analisis Data',
    desc: 'Analisis data kuantitatif/kualitatif (SPSS, SmartPLS, SEM, Python data science), uji akurasi model, grafik perbandingan hasil evaluasi, dan pembahasan mendalam.',
    estPrice: 'Mulai Rp 900.000',
    estDuration: '3 - 5 Hari',
  },
  {
    id: 'turnitin-revision',
    name: 'Parafrase Lolos Turnitin (<15%) & Revisi Dosen',
    category: 'Revisi & Turnitin',
    desc: 'Parafrase kalimat ilmiah tanpa merusak konteks makna, pembersihan plagiasi hingga similarity Turnitin lolos di bawah 15%, dan penyesuaian catatan dosen penguji.',
    estPrice: 'Mulai Rp 500.000',
    estDuration: '1 - 3 Hari',
  },
  {
    id: 'defense-coaching',
    name: 'Simulasi & Bimbingan Private Sidang Skripsi',
    category: 'Mentoring',
    desc: 'Latihan presentasi 1-on-1 via Google Meet, bedah pertanyaan jebakan dosen penguji, penjelasan detail baris kode aplikasi, dan tips lolos nilai A.',
    estPrice: 'Mulai Rp 450.000',
    estDuration: 'Sesuai Jadwal',
  },
];

const SKRIPSI_FAQS = [
  {
    q: 'Apakah kerahasiaan identitas dan data kampus saya dijamin aman?',
    a: '100% aman dan terenkripsi. Kami tidak pernah mempublikasikan nama mahasiswa, nomor induk (NIM), maupun nama kampus Anda ke pihak manapun. Naskah dan source code yang dibuat menjadi hak milik eksklusif Anda sepenuhnya.',
  },
  {
    q: 'Bagaimana jika dosen pembimbing meminta revisi berulang kali?',
    a: 'Seluruh paket layanan di BiruMarket menyertakan Garansi Bebas Revisi tanpa biaya tambahan selama revisi masih berada dalam ruang lingkup judul dan metode yang disepakati di awal.',
  },
  {
    q: 'Apakah saya akan diajari cara menjalankan aplikasi dan menjawab pertanyaan dosen?',
    a: 'Pasti. Kami tidak hanya menyerahkan kode mentah, melainkan menyertakan sesi bimbingan private (Google Meet/WhatsApp call) untuk menjelaskan alur database, arsitektur kode, cara menjalankan di laptop Anda sendiri, serta kisi-kisi jawaban sidang.',
  },
  {
    q: 'Bisa bayar bertahap (sistem termin per bab)?',
    a: 'Bisa. Untuk paket komplit, pembayaran dapat dibagi menjadi 3 termin: DP awal saat mulai Bab 1-3, termin kedua saat sistem/Bab 4 selesai didemokan, dan pelunasan saat naskah siap daftar sidang.',
  },
  {
    q: 'Bagaimana jika saya belum punya judul skripsi sama sekali?',
    a: 'Cukup pilih opsi "Belum ada judul" pada formulir di bawah. Tim kami akan menyiapkan 3 rekomendasi judul penelitian terkini yang sedang diminati dosen dan relatif cepat disetujui.',
  },
];

export default function SkripsiPage() {
  const [name, setName] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [major, setMajor] = useState('Teknik Informatika');
  const [degree, setDegree] = useState('S1');
  const [university, setUniversity] = useState('');
  const [hasTitle, setHasTitle] = useState<'yes' | 'no'>('yes');
  const [title, setTitle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string>('full-bundle');
  const [techStack, setTechStack] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activePkg = SERVICE_PACKAGES.find((p) => p.id === selectedPackage) || SERVICE_PACKAGES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleText =
      hasTitle === 'yes'
        ? title.trim() || 'Judul belum diisi'
        : 'Belum Ada Judul (Mohon Rekomendasikan 3 Ide Judul Skripsi)';

    const textLines = [
      `Halo Mas Fikri, saya ingin konsultasi pengerjaan skripsi melalui BiruMarket (${CONTACT_INFO.domain}):`,
      ``,
      `*Nama Mahasiswa:* ${name.trim() || 'Mahasiswa'}`,
      `*No. WhatsApp:* ${waNumber.trim() || '-'}`,
      `*Jenjang & Jurusan:* ${degree} - ${major}`,
      university.trim() ? `*Universitas:* ${university.trim()}` : '',
      ``,
      `*Paket Layanan:* ${activePkg.name}`,
      `*Judul Skripsi:* ${titleText}`,
      techStack.trim() ? `*Metode / Tech Stack:* ${techStack.trim()}` : '',
      deadline ? `*Target Deadline Sidang:* ${deadline}` : '',
      notes.trim() ? `*Catatan Dosen / Permintaan Khusus:* ${notes.trim()}` : '',
      ``,
      `Mohon info ketersediaan slot pengerjaan dan rincian pembagian termin pembayarannya. Terima kasih!`,
    ].filter(Boolean);

    const fullMessage = textLines.join('\n');
    const waUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#111315]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-14">
        {/* Top Hero Banner */}
        <section className="bg-white border border-[#111315]/20 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-extrabold text-[#1D4ED8] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
              <span>Layanan Bimbingan & Joki Skripsi Bergaransi Lulus 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08] text-[#111315]">
              Selesaikan Skripsi Tepat Waktu{' '}
              <span className="text-[#1D4ED8] underline decoration-blue-200 underline-offset-8">
                tanpa stres & revisi ribet.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#525860] leading-relaxed font-medium">
              Didampingi langsung oleh Principal Engineer & Academic Researcher. Layanan terstruktur mulai dari penentuan judul, naskah Bab 1 sampai Bab 5, perancangan full source code aplikasi (Web, Mobile, AI/Machine Learning, IoT), olah data statistik, hingga simulasi tanya-jawab sidang kelulusan.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-[#111315]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Garansi Bebas Revisi Dosen</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Lolos Turnitin Plagiasi &lt;15%</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Source Code Asli Siap Demo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Consultation & Order Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form (7 cols) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white border border-[#111315]/15 rounded-[2.5rem] p-6 sm:p-10 shadow-lg space-y-8"
          >
            <div className="border-b border-[#E4E2DD] pb-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                Langkah 01 / Formulir Spesifikasi Skripsi
              </span>
              <h2 className="text-2xl font-extrabold text-[#111315] mt-1">
                Kebutuhan &amp; Data Penelitian Anda
              </h2>
              <p className="text-xs text-[#525860] mt-1 font-medium">
                Isi formulir singkat di bawah. Privasi Anda 100% rahasia dan aman bersama tim BiruMarket.
              </p>
            </div>

            {/* 1. Identitas & Kontak */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">1</span>
                <span>Data Mahasiswa &amp; Kontak</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Nama Lengkap / Panggilan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bintang / Anonim"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Jenjang Studi
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-xs font-bold text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  >
                    <option value="D3">Diploma (D3)</option>
                    <option value="S1">Sarjana (S1 / Terapan)</option>
                    <option value="S2">Magister / Master (S2)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Jurusan / Program Studi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Teknik Informatika / Sistem Informasi / Manajemen"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#525860] mb-1.5">
                  Kampus / Universitas (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Universitas Budi Luhur, Gunadarma, Mercu Buana, UI, Binus..."
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            {/* 2. Pemilihan Paket */}
            <div className="space-y-4 pt-4 border-t border-[#E4E2DD]">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">2</span>
                <span>Pilih Paket Layanan yang Dibutuhkan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SERVICE_PACKAGES.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-sm ${
                        isSelected
                          ? 'bg-[#111315] text-white border-[#111315] ring-2 ring-[#111315]'
                          : 'bg-[#F8F7F4] hover:bg-white border-[#D5D2CA] text-[#111315]'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-[#EAE7E1] text-[#525860]'
                            }`}
                          >
                            {pkg.category}
                          </span>
                          {pkg.badge && (
                            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                              {pkg.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-sm leading-snug">{pkg.name}</h4>
                        <p
                          className={`text-xs leading-relaxed font-medium line-clamp-3 ${
                            isSelected ? 'text-white/70' : 'text-[#687078]'
                          }`}
                        >
                          {pkg.desc}
                        </p>
                      </div>

                      <div
                        className={`pt-2.5 border-t text-xs font-bold flex items-center justify-between ${
                          isSelected ? 'border-white/15 text-white' : 'border-[#E4E2DD] text-[#111315]'
                        }`}
                      >
                        <span className="text-[#1D4ED8]">{pkg.estPrice}</span>
                        <span className="flex items-center gap-1 text-[11px] opacity-80">
                          <Clock className="w-3 h-3" />
                          <span>{pkg.estDuration}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Judul & Ruang Lingkup Penelitian */}
            <div className="space-y-4 pt-4 border-t border-[#E4E2DD]">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">3</span>
                <span>Judul &amp; Topik Penelitian</span>
              </h3>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs font-bold text-[#111315] cursor-pointer">
                  <input
                    type="radio"
                    name="hasTitle"
                    checked={hasTitle === 'yes'}
                    onChange={() => setHasTitle('yes')}
                    className="accent-[#111315]"
                  />
                  <span>Sudah Ada Judul Skripsi</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-[#111315] cursor-pointer">
                  <input
                    type="radio"
                    name="hasTitle"
                    checked={hasTitle === 'no'}
                    onChange={() => setHasTitle('no')}
                    className="accent-[#111315]"
                  />
                  <span>Belum Ada Judul (Bantu Buatkan Rekomendasi)</span>
                </label>
              </div>

              {hasTitle === 'yes' ? (
                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Judul Skripsi Saat Ini
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Sistem Pendukung Keputusan Pemilihan Supplier Terbaik Menggunakan Metode TOPSIS Berbasis Web..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-medium text-blue-900 leading-relaxed">
                  Tim kami akan menyiapkan 3 opsi judul skripsi terbaru yang relevan dengan tren industri saat ini dan mudah disetujui dosen pembimbing.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Metode / Algoritma / Stack Target
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Laravel, Flutter, SAW, YOLOv8, CNN, K-Means..."
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Target Batas Waktu / Deadline Sidang
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-xs font-bold text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#525860] mb-1.5">
                  Catatan Tambahan / Permintaan Khusus Dosen
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Dosen minta sistem bisa export laporan PDF, ada pengujian blackbox & SUS, dan uji plagiasi Turnitin wajib di bawah 15%..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#111315] hover:bg-[#1D4ED8] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Konsultasikan Spesifikasi via WhatsApp</span>
            </button>
          </form>

          {/* Right: Sticky Summary & Assurance (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {/* Live Order Summary Card */}
            <div className="bg-white border border-[#111315]/20 rounded-[2.5rem] p-6 sm:p-8 shadow-xl space-y-6">
              <div className="border-b border-[#E4E2DD] pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                  Ringkasan Pemesanan
                </span>
                <h3 className="text-xl font-extrabold text-[#111315] mt-1">
                  {activePkg.name}
                </h3>
                <span className="text-xs font-bold text-[#687078] mt-1 block">
                  Kategori: {activePkg.category}
                </span>
              </div>

              <div className="space-y-3 text-xs font-medium text-[#525860]">
                <div className="flex justify-between py-1 border-b border-[#F0EEEA]">
                  <span>Estimasi Biaya</span>
                  <span className="font-extrabold text-sm text-[#111315]">{activePkg.estPrice}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EEEA]">
                  <span>Estimasi Pengerjaan</span>
                  <span className="font-extrabold text-sm text-[#111315]">{activePkg.estDuration}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0EEEA]">
                  <span>Garansi Revisi Dosen</span>
                  <span className="font-bold text-emerald-600">Gratis Sampai Sidang</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sistem Pembayaran</span>
                  <span className="font-bold text-[#111315]">Bisa Dicicil 3 Termin</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E4E2DD] space-y-2 text-xs">
                <span className="font-extrabold text-[#111315] block">Cakupan yang Anda Dapatkan:</span>
                <ul className="space-y-1.5 text-[#525860] font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Naskah laporan format baku kampus (Margin, Bab, Daftar Pustaka IEEE/APA).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Source code bersih, bergaransi jalan, dan ada panduan instalasi lokal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Hasil cek Turnitin resmi &amp; bebas AI indicator berlebih.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>Mentoring teknis privat agar Anda siap hadapi dosen penguji.</span>
                  </li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Halo Fikri, saya ingin tanya slot pengerjaan untuk ${activePkg.name} di BiruMarket.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#111315] hover:bg-[#1D4ED8] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tanya Jadwal via WhatsApp</span>
              </a>
            </div>

            {/* Principal Mentor Profile */}
            <div className="bg-white border border-[#E4E2DD] rounded-3xl p-6 shadow-sm flex items-center gap-4">
              <img
                src="/products/fikri-profile.jpg"
                alt={CONTACT_INFO.ownerName}
                className="w-16 h-16 rounded-2xl object-cover border border-[#111315] shrink-0 shadow-sm"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                  Lead Academic Mentor
                </span>
                <h4 className="font-extrabold text-base text-[#111315] truncate">
                  {CONTACT_INFO.ownerName}
                </h4>
                <p className="text-xs text-[#525860] font-medium truncate">
                  Fullstack Engineer &amp; Academic Advisor
                </p>
                <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                  ● Slot Pengerjaan Bulan Ini Terbuka
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Step Workflow */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
              Alur Transparan &amp; Terstruktur
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
              Cara Kerja Pengerjaan Skripsi di BiruMarket
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                01
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Konsultasi &amp; Deal Scope</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Kirim data judul dan target deadline. Kami tentukan ruang lingkup pengerjaan dan estimasi termin pembayaran.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                02
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Pengerjaan Bertahap</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Penyusunan naskah bab per bab dan coding sistem aplikasi dengan update progres berkala via WhatsApp.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                03
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Demo &amp; Uji Turnitin</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Demo aplikasi langsung di laptop Anda, pengecekan kesesuaian data, dan lampiran hasil uji Turnitin lolos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                04
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Bimbingan Sidang &amp; Lulus</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Simulasi presentasi sidang private, pendampingan revisi dosen sampai lembar pengesahan ditandatangani.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white border border-[#E4E2DD] rounded-[2.5rem] p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="border-b border-[#E4E2DD] pb-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
              Tanya Jawab Layanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315] mt-1">
              Pertanyaan yang Sering Diajukan Mahasiswa
            </h2>
          </div>

          <div className="divide-y divide-[#E4E2DD]">
            {SKRIPSI_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left py-2 font-bold text-sm sm:text-base text-[#111315] hover:text-[#1D4ED8] transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1D4ED8]' : 'text-[#8C929A]'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-[#525860] leading-relaxed pr-6 font-medium">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
