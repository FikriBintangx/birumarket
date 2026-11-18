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
  AlertCircle,
  Terminal,
  Database,
  Cpu,
} from 'lucide-react';

type MajorCategory = 'TI' | 'SI' | 'OTHER';

interface ServicePackage {
  id: string;
  name: string;
  category: string;
  applicableMajors: ('TI' | 'SI')[];
  desc: string;
  estPrice: string;
  estDuration: string;
  badge?: string;
  deliverables: string[];
}

const ALL_PACKAGES: ServicePackage[] = [
  {
    id: 'full-bundle',
    name: 'Paket Skripsi Komplit (Bab 1-5 + Aplikasi + Jurnal)',
    category: 'All-In-One',
    applicableMajors: ['TI', 'SI'],
    desc: 'Penyusunan naskah utuh Bab 1 sampai Bab 5, pembuatan full source code aplikasi (Web/Mobile/AI), olah data pengujian, draf artikel jurnal, dan slide presentasi sidang.',
    estPrice: 'Mulai Rp 3.500.000',
    estDuration: '14 - 21 Hari',
    badge: 'Paling Populer',
    deliverables: [
      'Naskah Bab 1 s/d Bab 5 format baku kampus',
      'Full Source Code aplikasi bergaransi siap demo',
      'Draf artikel jurnal ilmiah siap submit',
      'Slide PPT presentasi sidang + bimbingan privat',
    ],
  },
  {
    id: 'app-ti',
    name: 'Aplikasi Teknik Informatika (AI/ML, Mobile Flutter, Web Architecture)',
    category: 'Engineering TI',
    applicableMajors: ['TI'],
    desc: 'Pengembangan sistem komputasi mendalam: Model AI/Machine Learning (YOLO, CNN, NLP), Web Next.js/React, Mobile App Flutter/Android, Kriptografi, atau IoT hardware dengan integrasi API backend siap demo.',
    estPrice: 'Mulai Rp 1.600.000',
    estDuration: '5 - 10 Hari',
    badge: 'Spesialis TI',
    deliverables: [
      'Source Code lengkap (Frontend, Backend, Database)',
      'Dataset & Script Training Model AI (jika AI/ML)',
      'Dokumentasi instalasi di laptop lokal mahasiswa',
      'Sesi bimbingan bedah arsitektur kode 1-on-1',
    ],
  },
  {
    id: 'app-si',
    name: 'Sistem Informasi & Decision Support (SPK, ERP, E-Commerce, CRM)',
    category: 'Engineering SI',
    applicableMajors: ['SI'],
    desc: 'Pengembangan sistem informasi bisnis & manajemen: Sistem Pendukung Keputusan (Metode TOPSIS, SAW, AHP, SMART, WP, MOORA), E-Commerce terintegrasi, Point of Sale (POS), atau Sistem Informasi Manajemen (SIM) berbasis Web.',
    estPrice: 'Mulai Rp 1.500.000',
    estDuration: '5 - 10 Hari',
    badge: 'Spesialis SI',
    deliverables: [
      'Aplikasi Web Sistem Informasi lengkap',
      'Perhitungan matriks algoritma SPK transparan di tabel',
      'Diagram UML (Usecase, Activity, Sequence, ERD)',
      'Dokumentasi struktur tabel database SQL',
    ],
  },
  {
    id: 'proposal-it',
    name: 'Proposal Skripsi & Semhas IT/SI (Bab 1-3)',
    category: 'Proposal',
    applicableMajors: ['TI', 'SI'],
    desc: 'Penyusunan Latar Belakang Masalah, Rumusan Masalah, Batasan Masalah, Tinjauan Pustaka, State-of-the-Art matrix 10+ jurnal acuan bereputasi (Sinta/Scopus), serta Metodologi Penelitian siap diseminarkan.',
    estPrice: 'Mulai Rp 1.200.000',
    estDuration: '5 - 7 Hari',
    deliverables: [
      'Naskah Proposal Bab 1, 2, dan 3 rapi',
      'Tabel matriks komparasi 10+ jurnal acuan',
      'Kutipan referensi otomatis format Mendeley/Zotero',
      'Garansi revisi dosen pembimbing',
    ],
  },
  {
    id: 'data-testing-it',
    name: 'Pengujian Sistem, Blackbox, SUS & Bab 4',
    category: 'Bab 4 & Evaluasi',
    applicableMajors: ['TI', 'SI'],
    desc: 'Pengujian sistem mendalam: Pengujian Blackbox Functionality, Evaluasi Usability System Usability Scale (SUS), matriks Confusion Matrix (Akurasi, Presisi, Recall untuk TI), dan pembahasan hasil implementasi Bab 4.',
    estPrice: 'Mulai Rp 900.000',
    estDuration: '3 - 5 Hari',
    deliverables: [
      'Tabel pengujian Blackbox puluhan skenario',
      'Kuesioner & koding statistik SUS / TAM (untuk SI)',
      'Grafik akurasi & ROC curve (untuk TI)',
      'Naskah Bab 4 Pembahasan Hasil Lengkap',
    ],
  },
  {
    id: 'turnitin-revision',
    name: 'Parafrase Lolos Turnitin (<15%) & Revisi Dosen',
    category: 'Turnitin & Revisi',
    applicableMajors: ['TI', 'SI'],
    desc: 'Parafrase kalimat ilmiah tanpa merusak istilah teknis komputasi, pembersihan plagiasi hingga similarity Turnitin lolos di bawah 15%, dan penyesuaian cepat terhadap catatan dosen penguji.',
    estPrice: 'Mulai Rp 500.000',
    estDuration: '1 - 3 Hari',
    deliverables: [
      'File naskah bersih dari blok plagiasi',
      'Laporan resmi hasil cek Turnitin &lt;15%',
      'Struktur kalimat ilmiah tetap tajam & koheren',
    ],
  },
  {
    id: 'defense-coaching',
    name: 'Simulasi & Bimbingan Private Sidang Skripsi',
    category: 'Mentoring Sidang',
    applicableMajors: ['TI', 'SI'],
    desc: 'Latihan presentasi 1-on-1 via Google Meet, bedah pertanyaan jebakan dosen penguji (pertanyaan algoritma, database, metodologi), penjelasan detail cara kerja kode aplikasi, dan tips lolos nilai A.',
    estPrice: 'Mulai Rp 450.000',
    estDuration: 'Sesuai Jadwal',
    deliverables: [
      'Simulasi tanya jawab langsung dengan engineer',
      'Kisi-kisi 30+ pertanyaan sidang yang sering ditanyakan',
      'Pelatihan demo aplikasi tanpa panik saat error',
    ],
  },
];

const SKRIPSI_FAQS = [
  {
    q: 'Mengapa BiruMarket mengkhususkan layanan ini hanya untuk Teknik Informatika dan Sistem Informasi?',
    a: 'Karena fokus kompetensi utama tim kami adalah Software Engineering, Rekayasa Algoritma, Artificial Intelligence, dan Perancangan Sistem Basis Data. Dengan fokus eksklusif pada Teknik Informatika dan Sistem Informasi, kami menjamin kualitas kode berstandar industri dan metodologi penelitian yang akurat di depan dosen penguji.',
  },
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
  const [selectedMajor, setSelectedMajor] = useState<MajorCategory>('TI');
  const [name, setName] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [degree, setDegree] = useState('S1');
  const [university, setUniversity] = useState('');
  const [hasTitle, setHasTitle] = useState<'yes' | 'no'>('yes');
  const [title, setTitle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string>('full-bundle');
  const [techStack, setTechStack] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter packages based on major
  const availablePackages = ALL_PACKAGES.filter((p) => {
    if (selectedMajor === 'TI') return p.applicableMajors.includes('TI');
    if (selectedMajor === 'SI') return p.applicableMajors.includes('SI');
    return false;
  });

  const activePkg =
    availablePackages.find((p) => p.id === selectedPackage) ||
    availablePackages[0] ||
    ALL_PACKAGES[0];

  const majorLabel =
    selectedMajor === 'TI'
      ? 'Teknik Informatika (Computer Science)'
      : selectedMajor === 'SI'
        ? 'Sistem Informasi (Information Systems)'
        : 'Program Studi Non-IT';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMajor === 'OTHER') {
      const otherMsg = [
        `Halo Mas Fikri, saya ingin konsultasi kebutuhan pembuatan sistem/software untuk tugas akhir/skripsi saya dari BiruMarket:`,
        `Nama: ${name.trim() || 'Mahasiswa'}`,
        `Kampus: ${university.trim() || '-'}`,
        `Keterangan: ${notes.trim() || 'Butuh diskusi sistem pendukung.'}`,
      ].join('\n');
      window.open(
        `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(otherMsg)}`,
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }

    const titleText =
      hasTitle === 'yes'
        ? title.trim() || 'Judul belum diisi'
        : 'Belum Ada Judul (Mohon Rekomendasikan 3 Ide Judul Skripsi)';

    const textLines = [
      `Halo Mas Fikri, saya ingin konsultasi pengerjaan skripsi melalui BiruMarket (${CONTACT_INFO.domain}):`,
      ``,
      `*Nama Mahasiswa:* ${name.trim() || 'Mahasiswa'}`,
      `*No. WhatsApp:* ${waNumber.trim() || '-'}`,
      `*Jenjang:* ${degree}`,
      `*Program Studi:* ${majorLabel}`,
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
              <span>Khusus Program Studi Teknik Informatika &amp; Sistem Informasi</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08] text-[#111315]">
              Bimbingan &amp; Pengerjaan Skripsi{' '}
              <span className="text-[#1D4ED8] underline decoration-blue-200 underline-offset-8">
                Teknik Informatika &amp; SI.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#525860] leading-relaxed font-medium">
              Layanan rekayasa naskah dan software skripsi yang didedikasikan secara eksklusif bagi mahasiswa <strong>Teknik Informatika</strong> dan <strong>Sistem Informasi</strong>. Mulai dari penentuan judul ACC dosen, penulisan Bab 1-5, coding full source code aplikasi (Web, Mobile, AI/ML, SPK/Decision Support), olah data pengujian, hingga mentoring simulasi sidang private sampai lulus wisuda.
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

        {/* Step 1: Filter Program Studi Selector */}
        <section className="bg-white border border-[#111315]/15 rounded-[2.5rem] p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4E2DD] pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                Pilih Program Studi Anda
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111315] mt-1">
                Layanan Disesuaikan Berdasarkan Rumpun Jurusan
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] border border-blue-200 self-start sm:self-auto">
              Terverifikasi Akademik IT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* TI Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedMajor('TI');
                setSelectedPackage('full-bundle');
              }}
              className={`p-5 rounded-3xl text-left border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                selectedMajor === 'TI'
                  ? 'bg-[#111315] text-white border-[#111315] ring-2 ring-[#111315] shadow-lg scale-[1.01]'
                  : 'bg-[#F8F7F4] hover:bg-white border-[#D5D2CA] text-[#111315]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    selectedMajor === 'TI'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-[#111315] border border-[#E4E2DD]'
                  }`}
                >
                  <Cpu className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    selectedMajor === 'TI'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EAE7E1] text-[#525860]'
                  }`}
                >
                  Rumpun TI
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base sm:text-lg">Teknik Informatika</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed font-medium ${
                    selectedMajor === 'TI' ? 'text-white/70' : 'text-[#687078]'
                  }`}
                >
                  Fokus: AI / Machine Learning, Computer Vision, Fullstack Web Next.js, Mobile Flutter, Algoritma, Kriptografi &amp; IoT.
                </p>
              </div>

              <div
                className={`pt-2 border-t text-xs font-bold flex items-center gap-1.5 ${
                  selectedMajor === 'TI' ? 'border-white/15 text-blue-300' : 'border-[#E4E2DD] text-[#1D4ED8]'
                }`}
              >
                <span>{selectedMajor === 'TI' ? '✓ Pilihan Aktif' : 'Pilih Teknik Informatika →'}</span>
              </div>
            </button>

            {/* SI Option */}
            <button
              type="button"
              onClick={() => {
                setSelectedMajor('SI');
                setSelectedPackage('full-bundle');
              }}
              className={`p-5 rounded-3xl text-left border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                selectedMajor === 'SI'
                  ? 'bg-[#111315] text-white border-[#111315] ring-2 ring-[#111315] shadow-lg scale-[1.01]'
                  : 'bg-[#F8F7F4] hover:bg-white border-[#D5D2CA] text-[#111315]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    selectedMajor === 'SI'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-[#111315] border border-[#E4E2DD]'
                  }`}
                >
                  <Database className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    selectedMajor === 'SI'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EAE7E1] text-[#525860]'
                  }`}
                >
                  Rumpun SI
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base sm:text-lg">Sistem Informasi (SI)</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed font-medium ${
                    selectedMajor === 'SI' ? 'text-white/70' : 'text-[#687078]'
                  }`}
                >
                  Fokus: Sistem Pendukung Keputusan (SPK: TOPSIS, SAW, AHP, MOORA), Sistem Informasi Manajemen, E-Commerce, ERP &amp; UI/UX.
                </p>
              </div>

              <div
                className={`pt-2 border-t text-xs font-bold flex items-center gap-1.5 ${
                  selectedMajor === 'SI' ? 'border-white/15 text-emerald-300' : 'border-[#E4E2DD] text-emerald-600'
                }`}
              >
                <span>{selectedMajor === 'SI' ? '✓ Pilihan Aktif' : 'Pilih Sistem Informasi →'}</span>
              </div>
            </button>

            {/* Other / Non-IT Option */}
            <button
              type="button"
              onClick={() => setSelectedMajor('OTHER')}
              className={`p-5 rounded-3xl text-left border transition-all flex flex-col justify-between gap-3 shadow-sm ${
                selectedMajor === 'OTHER'
                  ? 'bg-[#111315] text-white border-[#111315] ring-2 ring-[#111315] shadow-lg scale-[1.01]'
                  : 'bg-[#F8F7F4] hover:bg-white border-[#D5D2CA] text-[#111315]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    selectedMajor === 'OTHER'
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-[#111315] border border-[#E4E2DD]'
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    selectedMajor === 'OTHER'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#EAE7E1] text-[#525860]'
                  }`}
                >
                  Lainnya
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base sm:text-lg">Program Studi Lain (Non-IT)</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed font-medium ${
                    selectedMajor === 'OTHER' ? 'text-white/70' : 'text-[#687078]'
                  }`}
                >
                  Manajemen, Hukum, Akuntansi, Teknik Non-Komputer, dll.
                </p>
              </div>

              <div
                className={`pt-2 border-t text-xs font-bold flex items-center gap-1.5 ${
                  selectedMajor === 'OTHER' ? 'border-white/15 text-amber-300' : 'border-[#E4E2DD] text-[#687078]'
                }`}
              >
                <span>{selectedMajor === 'OTHER' ? '✓ Pilihan Aktif' : 'Pilih Rumpun Lain →'}</span>
              </div>
            </button>
          </div>
        </section>

        {/* Conditional View: When Major is OTHER */}
        {selectedMajor === 'OTHER' ? (
          <section className="bg-white border border-amber-300 rounded-[2.5rem] p-8 sm:p-12 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 px-3 py-1 rounded-full bg-amber-100">
                Spesialisasi Akademik Terfokus
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
                Layanan Skripsi Ini Dikhususkan untuk Teknik Informatika &amp; Sistem Informasi
              </h2>
              <p className="text-sm text-[#525860] leading-relaxed font-medium">
                Saat ini BiruMarket mendedikasikan pengerjaan naskah dan source code aplikasi secara <strong>eksklusif hanya untuk mahasiswa Program Studi Teknik Informatika dan Sistem Informasi</strong> agar kualitas software, arsitektur basis data, algoritma pengujian, dan garansi nilai sidang A tetap terjaga mutlak.
              </p>
              <p className="text-xs text-[#687078]">
                Namun bila penelitian Anda membutuhkan pembuatan aplikasi pendukung atau otomasi software, Anda tetap dapat berkonsultasi langsung dengan Principal Engineer kami.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedMajor('TI')}
                className="px-6 py-3 rounded-full bg-[#111315] hover:bg-[#1D4ED8] text-white text-xs font-bold transition shadow-sm"
              >
                Pilih Teknik Informatika
              </button>
              <button
                type="button"
                onClick={() => setSelectedMajor('SI')}
                className="px-6 py-3 rounded-full bg-[#111315] hover:bg-[#1D4ED8] text-white text-xs font-bold transition shadow-sm"
              >
                Pilih Sistem Informasi (SI)
              </button>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Halo Mas Fikri, saya mahasiswa non-TI/SI dan ingin konsultasi pembuatan software/sistem pendukung penelitian di BiruMarket.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition inline-flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi Software via WhatsApp</span>
              </a>
            </div>
          </section>
        ) : (
          /* Form Pengerjaan Skripsi untuk TI & SI */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Form (7 cols) */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 bg-white border border-[#111315]/15 rounded-[2.5rem] p-6 sm:p-10 shadow-lg space-y-8"
            >
              <div className="border-b border-[#E4E2DD] pb-4">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                  <span>Formulir Skripsi {selectedMajor === 'TI' ? 'Teknik Informatika' : 'Sistem Informasi (SI)'}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#111315] mt-1">
                  Spesifikasi Penelitian &amp; Kebutuhan Sistem
                </h2>
                <p className="text-xs text-[#525860] mt-1 font-medium">
                  Paket layanan di bawah telah disesuaikan dengan kurikulum &amp; standar sidang <strong>{majorLabel}</strong>.
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
                      Kampus / Universitas
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Budi Luhur, Gunadarma, Mercu Buana, UI, Binus, Telkom..."
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Pemilihan Paket (Filtered to TI or SI) */}
              <div className="space-y-4 pt-4 border-t border-[#E4E2DD]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">2</span>
                    <span>Pilih Paket Layanan ({availablePackages.length} Paket Relevan)</span>
                  </h3>
                  <span className="text-[11px] font-bold text-[#1D4ED8]">{majorLabel}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {availablePackages.map((pkg) => {
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
                    <span>Belum Ada Judul (Bantu Rekomendasikan 3 Ide)</span>
                  </label>
                </div>

                {hasTitle === 'yes' ? (
                  <div>
                    <label className="block text-xs font-bold text-[#525860] mb-1.5">
                      Judul Skripsi Saat Ini
                    </label>
                    <textarea
                      rows={2}
                      placeholder={
                        selectedMajor === 'TI'
                          ? 'Contoh: Klasifikasi Kematangan Buah Kelapa Sawit Menggunakan Algoritma Convolutional Neural Network (CNN) Berbasis Web...'
                          : 'Contoh: Sistem Pendukung Keputusan Pemilihan Karyawan Terbaik Menggunakan Metode TOPSIS Berbasis Web pada PT ABC...'
                      }
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#F8F7F4] border border-[#D5D2CA] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:border-[#111315] focus:outline-none transition shadow-inner"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-medium text-blue-900 leading-relaxed">
                    Tim kami akan menyiapkan 3 opsi judul skripsi <strong>{selectedMajor === 'TI' ? 'Teknik Informatika' : 'Sistem Informasi'}</strong> terbaru yang relevan dengan tren industri saat ini dan mudah disetujui dosen pembimbing.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#525860] mb-1.5">
                      Metode / Algoritma / Stack Target
                    </label>
                    <input
                      type="text"
                      placeholder={
                        selectedMajor === 'TI'
                          ? 'Contoh: YOLOv8, CNN, Flutter, Next.js, AES-256...'
                          : 'Contoh: TOPSIS, AHP, SAW, Laravel, MySQL, UML...'
                      }
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
                    placeholder="Contoh: Dosen minta sistem bisa export laporan PDF, ada pengujian blackbox & SUS, dan similarity Turnitin wajib di bawah 15%..."
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
                <span>Konsultasikan Skripsi {selectedMajor} via WhatsApp</span>
              </button>
            </form>

            {/* Right: Sticky Summary & Assurance (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Live Order Summary Card */}
              <div className="bg-white border border-[#111315]/20 rounded-[2.5rem] p-6 sm:p-8 shadow-xl space-y-6">
                <div className="border-b border-[#E4E2DD] pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                      Ringkasan Pemesanan
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Prodi: {selectedMajor}
                    </span>
                  </div>
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
                    <span className="font-bold text-emerald-600">Gratis Sampai Lulus Sidang</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sistem Pembayaran</span>
                    <span className="font-bold text-[#111315]">Bisa Dicicil 3 Termin</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E4E2DD] space-y-2 text-xs">
                  <span className="font-extrabold text-[#111315] block">Cakupan yang Anda Dapatkan:</span>
                  <ul className="space-y-1.5 text-[#525860] font-medium">
                    {activePkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Halo Fikri, saya mahasiswa ${majorLabel} ingin tanya slot pengerjaan untuk ${activePkg.name} di BiruMarket.`
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
                    Lead Academic Mentor (TI &amp; SI)
                  </span>
                  <h4 className="font-extrabold text-base text-[#111315] truncate">
                    {CONTACT_INFO.ownerName}
                  </h4>
                  <p className="text-xs text-[#525860] font-medium truncate">
                    Fullstack &amp; AI Systems Engineer
                  </p>
                  <span className="text-[11px] font-bold text-emerald-600 block mt-1">
                    ● Slot Pengerjaan Bulan Ini Terbuka
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4 Step Workflow */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
              Alur Transparan &amp; Terstruktur
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315]">
              Cara Kerja Pengerjaan Skripsi TI &amp; SI
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                01
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Konsultasi &amp; Scope Judul</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Pilih prodi TI atau SI. Kirim data judul dan target deadline sidang. Kami tentukan ruang lingkup metode &amp; termin pembayaran.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                02
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Pengerjaan Naskah &amp; Coding</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Penyusunan naskah bab per bab dan pembuatan sistem software (Web/Mobile/AI/SPK) dengan laporan kemajuan berkala.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                03
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Demo Laptop &amp; Turnitin</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Demo aplikasi langsung di laptop Anda, pengecekan database/algoritma, dan lampiran resmi hasil uji Turnitin lolos di bawah 15%.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E4E2DD] shadow-sm space-y-3">
              <span className="w-10 h-10 rounded-2xl bg-blue-50 text-[#1D4ED8] font-extrabold flex items-center justify-center text-sm">
                04
              </span>
              <h3 className="font-extrabold text-base text-[#111315]">Simulasi Sidang &amp; Lulus A</h3>
              <p className="text-xs text-[#525860] leading-relaxed font-medium">
                Simulasi presentasi sidang private, bedah pertanyaan dosen penguji, dan pendampingan revisi sampai wisuda resmi.
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
              Pertanyaan yang Sering Diajukan Mahasiswa TI &amp; SI
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
