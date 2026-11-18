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
  Terminal,
  Database,
  Cpu,
  Wifi,
} from 'lucide-react';

export type MajorOption =
  | 'TI_SE'   // Teknik Informatika / Software Engineering
  | 'TI_IOT'  // Teknik Informatika / IOT
  | 'SI'      // Sistem Informasi
  | 'OTHER';  // Other

export interface ServicePackage {
  id: string;
  name: string;
  category: string;
  desc: string;
  estPrice: string;
  estDuration: string;
  badge?: string;
  deliverables: string[];
}

// Packages for IT majors (Software Engineering, IoT, Sistem Informasi)
const IT_PACKAGES: Record<'TI_SE' | 'TI_IOT' | 'SI', ServicePackage[]> = {
  TI_SE: [
    {
      id: 'full-bundle-se',
      name: 'Paket Skripsi Komplit (Bab 1–5 + Aplikasi + Jurnal)',
      category: 'All-In-One',
      desc: 'Penyusunan naskah utuh Bab 1 sampai Bab 5, pembuatan full source code aplikasi (Web Next.js/React, Mobile Flutter/Android, atau AI/ML), olah data pengujian, draf artikel jurnal, dan slide presentasi sidang.',
      estPrice: 'Mulai Rp 3.500.000',
      estDuration: '14 - 21 Hari',
      badge: 'Paling Populer',
      deliverables: [
        'Naskah Bab 1 s/d Bab 5 format baku kampus',
        'Full Source Code aplikasi bergaransi siap demo',
        'Draf artikel jurnal ilmiah siap submit',
        'Slide PPT presentasi sidang + bimbingan privat 1-on-1',
      ],
    },
    {
      id: 'app-se',
      name: 'Pembuatan Aplikasi / Source Code Saja',
      category: 'Engineering Software',
      desc: 'Pengembangan sistem web modern (Next.js, React, Laravel), mobile app (Flutter/Android), model AI/Machine Learning (Python/YOLO/NLP), atau backend API siap demo di laptop mahasiswa.',
      estPrice: 'Mulai Rp 1.600.000',
      estDuration: '5 - 10 Hari',
      badge: 'Khusus SE',
      deliverables: [
        'Source Code lengkap (Frontend, Backend, Database)',
        'Dokumentasi instalasi di laptop lokal mahasiswa',
        'Panduan arsitektur & skema database',
        'Sesi bimbingan bedah arsitektur kode 1-on-1',
      ],
    },
    {
      id: 'proposal-se',
      name: 'Proposal Skripsi & Seminar Proposal (Bab 1–3)',
      category: 'Proposal',
      desc: 'Penyusunan Latar Belakang Masalah, Rumusan, Batasan Masalah, Kajian Teori, State-of-the-Art matrix 10+ jurnal acuan bereputasi (Sinta/Scopus), serta Metodologi Software Engineering.',
      estPrice: 'Mulai Rp 1.200.000',
      estDuration: '5 - 7 Hari',
      deliverables: [
        'Naskah Proposal Bab 1, 2, dan 3 rapi siap semhas',
        'Tabel matriks komparasi 10+ jurnal acuan',
        'Kutipan referensi otomatis format Mendeley/Zotero',
        'Garansi revisi dosen pembimbing',
      ],
    },
    {
      id: 'testing-se',
      name: 'Pengujian Sistem, Blackbox & Bab 4',
      category: 'Pengujian & Evaluasi',
      desc: 'Pengujian fungsionalitas Blackbox Testing puluhan skenario, evaluasi performa respon API, confusion matrix akurasi, dan penyusunan narasi Bab 4 Hasil Implementasi & Pembahasan.',
      estPrice: 'Mulai Rp 900.000',
      estDuration: '3 - 5 Hari',
      deliverables: [
        'Tabel skenario pengujian Blackbox lengkap',
        'Matriks akurasi / performa latensi',
        'Naskah Bab 4 Pembahasan Hasil Lengkap',
        'Diagram alir hasil implementasi sistem',
      ],
    },
    {
      id: 'turnitin-se',
      name: 'Parafrase Lolos Turnitin (<15%) & Revisi Dosen',
      category: 'Turnitin & Revisi',
      desc: 'Parafrase kalimat ilmiah tanpa merusak istilah teknis komputasi, pembersihan plagiasi hingga similarity Turnitin lolos di bawah 15%, dan penyesuaian cepat terhadap catatan revisi dosen.',
      estPrice: 'Mulai Rp 500.000',
      estDuration: '1 - 3 Hari',
      deliverables: [
        'File naskah bersih dari blok plagiasi',
        'Laporan resmi hasil uji Turnitin <15%',
        'Struktur kalimat ilmiah tetap tajam & koheren',
      ],
    },
    {
      id: 'coaching-se',
      name: 'Simulasi & Bimbingan Private Sidang Skripsi',
      category: 'Mentoring Sidang',
      desc: 'Latihan presentasi 1-on-1 via Google Meet, bedah pertanyaan jebakan dosen penguji (pertanyaan algoritma, database, metodologi), penjelasan detail baris kode, dan tips lolos nilai A.',
      estPrice: 'Mulai Rp 450.000',
      estDuration: 'Sesuai Jadwal',
      deliverables: [
        'Simulasi tanya jawab langsung dengan engineer',
        'Kisi-kisi 30+ pertanyaan sidang yang sering ditanyakan',
        'Pelatihan demo aplikasi tanpa panik saat error',
      ],
    },
  ],

  TI_IOT: [
    {
      id: 'full-bundle-iot',
      name: 'Paket Skripsi Komplit IoT (Bab 1–5 + Hardware/Sensor + Dashboard + Jurnal)',
      category: 'All-In-One IoT',
      desc: 'Penyusunan naskah utuh Bab 1-5, perakitan skema hardware/sensor (ESP32, Arduino, Raspberry Pi, sensor suhu/gas/ultrasonik/kamera), web/mobile dashboard monitoring IoT real-time, olah data pengujian delay/throughput, dan jurnal.',
      estPrice: 'Mulai Rp 3.800.000',
      estDuration: '14 - 21 Hari',
      badge: 'Rekomendasi IoT',
      deliverables: [
        'Naskah Bab 1 s/d Bab 5 format baku kampus',
        'Firmware micro-controller (C++/Arduino IDE/MicroPython)',
        'Dashboard Web / Mobile monitoring real-time (MQTT/Firebase)',
        'Skema wiring diagram & daftar komponen sensor',
        'Draf jurnal publikasi & slide presentasi sidang',
      ],
    },
    {
      id: 'app-iot',
      name: 'Pembuatan Sistem IoT, Firmware & Dashboard Saja',
      category: 'Engineering IoT',
      desc: 'Pembuatan kode firmware hardware (ESP32, NodeMCU, Arduino), integrasi sensor/aktuator, protokol komunikasi MQTT/HTTP REST/Websocket, serta web/mobile dashboard pemantau data sensor.',
      estPrice: 'Mulai Rp 1.800.000',
      estDuration: '7 - 12 Hari',
      badge: 'Khusus IoT',
      deliverables: [
        'Full source code firmware & dashboard web/mobile',
        'Diagram wiring interkoneksi hardware & pin mapping',
        'Dokumentasi konfigurasi MQTT Broker / Cloud DB',
        'Bimbingan pengujian hardware jarak jauh / video demo',
      ],
    },
    {
      id: 'proposal-iot',
      name: 'Proposal Skripsi & Seminar Proposal IoT (Bab 1–3)',
      category: 'Proposal',
      desc: 'Penyusunan Latar Belakang Masalah, Rumusan, Arsitektur Topologi IoT (Perception, Network, Application Layer), kajian 10+ jurnal acuan IEEE/Scopus, dan Metodologi R&D / Prototype.',
      estPrice: 'Mulai Rp 1.250.000',
      estDuration: '5 - 7 Hari',
      deliverables: [
        'Naskah Proposal Bab 1, 2, dan 3 rapi siap semhas',
        'Diagram arsitektur jaringan sensor IoT',
        'Tabel perbandingan sensor & mikrokontroler acuan',
        'Garansi revisi dosen pembimbing',
      ],
    },
    {
      id: 'testing-iot',
      name: 'Pengujian Sensor, Delay, Throughput & Bab 4',
      category: 'Pengujian Hardware',
      desc: 'Pengujian akurasi sensor fisik terhadap alat ukur standar, Quality of Service (QoS) IoT mencakup packet loss, latency/delay, throughput, serta penyusunan Bab 4 Hasil & Analisis.',
      estPrice: 'Mulai Rp 950.000',
      estDuration: '3 - 5 Hari',
      deliverables: [
        'Tabel kalibrasi sensor & persentase error (%)',
        'Grafik pengujian QoS (Delay, Jitter, Throughput)',
        'Naskah Bab 4 Pembahasan Hasil Pengujian',
      ],
    },
    {
      id: 'turnitin-iot',
      name: 'Parafrase Lolos Turnitin (<15%) & Revisi Dosen',
      category: 'Turnitin & Revisi',
      desc: 'Parafrase kalimat ilmiah tanpa merusak nomenklatur komponen elektronik/protokol IoT, pembersihan plagiasi hingga similarity Turnitin lolos di bawah 15%.',
      estPrice: 'Mulai Rp 500.000',
      estDuration: '1 - 3 Hari',
      deliverables: [
        'File naskah bersih dari blok plagiasi',
        'Laporan resmi hasil uji Turnitin <15%',
        'Garansi penyesuaian catatan dosen pembimbing',
      ],
    },
    {
      id: 'coaching-iot',
      name: 'Simulasi Sidang & Panduan Demo Hardware IoT',
      category: 'Mentoring Sidang',
      desc: 'Pelatihan private 1-on-1 simulasi demonstrasi alat di hadapan dewan penguji, trik mitigasi sensor error saat live demo, dan bedah kisi-kisi pertanyaan seputar mikrokontroler & database.',
      estPrice: 'Mulai Rp 500.000',
      estDuration: 'Sesuai Jadwal',
      deliverables: [
        'Simulasi demo hardware via Google Meet',
        'Checklist perlengkapan demonstrasi sidang',
        'Kisi-kisi 30+ pertanyaan spesifik sistem tertanam (embedded)',
      ],
    },
  ],

  SI: [
    {
      id: 'full-bundle-si',
      name: 'Paket Skripsi Komplit SI (Bab 1–5 + Sistem Informasi/SPK + Jurnal)',
      category: 'All-In-One SI',
      desc: 'Penyusunan naskah utuh Bab 1 sampai Bab 5, perancangan Sistem Informasi Bisnis / Sistem Pendukung Keputusan (SPK: TOPSIS, SAW, AHP, MOORA, SMART), analisis UML/ERD, pengujian SUS/Blackbox, draf jurnal, dan slide sidang.',
      estPrice: 'Mulai Rp 3.400.000',
      estDuration: '14 - 21 Hari',
      badge: 'Paling Populer SI',
      deliverables: [
        'Naskah Bab 1 s/d Bab 5 format baku kampus',
        'Aplikasi Web Sistem Informasi / SPK siap demo',
        'Diagram perancangan UML lengkap & tabel ERD database',
        'Draf artikel jurnal ilmiah & slide presentasi sidang',
      ],
    },
    {
      id: 'app-si',
      name: 'Pembuatan Sistem Informasi & Decision Support Saja',
      category: 'Engineering SI',
      desc: 'Pengembangan web sistem informasi manajemen, ERP, CRM, E-Commerce, atau Sistem Pendukung Keputusan (SPK) dengan kalkulasi matriks algoritma transparan siap demo di laptop dosen.',
      estPrice: 'Mulai Rp 1.500.000',
      estDuration: '5 - 10 Hari',
      badge: 'Khusus SI',
      deliverables: [
        'Aplikasi Web Sistem Informasi lengkap',
        'Perhitungan matriks algoritma SPK transparan di tabel',
        'Diagram UML (Usecase, Activity, Sequence, ERD)',
        'Dokumentasi struktur tabel database SQL',
      ],
    },
    {
      id: 'proposal-si',
      name: 'Proposal Skripsi & Semhas SI (Bab 1–3)',
      category: 'Proposal',
      desc: 'Penyusunan Latar Belakang Masalah proses bisnis, Rumusan Masalah, Tinjauan Pustaka, State-of-the-Art matrix 10+ jurnal acuan, serta Metodologi Analisis Sistem (SDLC Waterfall/Agile).',
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
      id: 'testing-si',
      name: 'Pengujian Usability SUS/TAM, Blackbox & Bab 4',
      category: 'Pengujian & Evaluasi',
      desc: 'Pengujian Blackbox Functionality, Evaluasi Usability System Usability Scale (SUS) atau Technology Acceptance Model (TAM) dengan tabulasi kuesioner, serta pembahasan implementasi Bab 4.',
      estPrice: 'Mulai Rp 900.000',
      estDuration: '3 - 5 Hari',
      deliverables: [
        'Tabel pengujian Blackbox puluhan skenario',
        'Kuesioner & koding statistik SUS / TAM',
        'Naskah Bab 4 Pembahasan Hasil Lengkap',
        'Dokumentasi antarmuka user interface sistem',
      ],
    },
    {
      id: 'turnitin-si',
      name: 'Parafrase Lolos Turnitin (<15%) & Revisi Dosen',
      category: 'Turnitin & Revisi',
      desc: 'Parafrase kalimat ilmiah tanpa merusak definisi alur bisnis dan istilah sistem informasi, pembersihan plagiasi hingga similarity Turnitin lolos di bawah 15%.',
      estPrice: 'Mulai Rp 500.000',
      estDuration: '1 - 3 Hari',
      deliverables: [
        'File naskah bersih dari blok plagiasi',
        'Laporan resmi hasil cek Turnitin <15%',
        'Garansi perbaikan cepat catatan dosen',
      ],
    },
    {
      id: 'coaching-si',
      name: 'Simulasi & Bimbingan Private Sidang Skripsi SI',
      category: 'Mentoring Sidang',
      desc: 'Latihan presentasi 1-on-1 via Google Meet, bedah pertanyaan proses bisnis, justifikasi pemilihan metode SPK/SDLC, dan tips memaparkan diagram UML dengan percaya diri di hadapan dosen penguji.',
      estPrice: 'Mulai Rp 450.000',
      estDuration: 'Sesuai Jadwal',
      deliverables: [
        'Simulasi tanya jawab langsung dengan mentor',
        'Kisi-kisi 30+ pertanyaan sidang sistem informasi',
        'Panduan pemaparan alur bisnis & demo aplikasi',
      ],
    },
  ],
};

// Packages for OTHER (Non-IT: Manajemen, Akuntansi, Hukum, dll) -> 3 distinct packages: Parafrase, Bab 1 - Bab 3, Full
const OTHER_PACKAGES: ServicePackage[] = [
  {
    id: 'other-turnitin',
    name: 'Parafrase Lolos Turnitin (<15%) & Perbaikan Format',
    category: 'Parafrase',
    desc: 'Penyuntingan dan parafrase kalimat ilmiah profesional tanpa mengubah substansi penelitian, menurunkan similarity skor Turnitin secara signifikan hingga di bawah 15%, dan perbaikan format daftar pustaka.',
    estPrice: 'Mulai Rp 450.000',
    estDuration: '1 - 2 Hari',
    badge: 'Cepat & Akurat',
    deliverables: [
      'Naskah bersih bebas indikasi plagiasi Turnitin <15%',
      'Laporan resmi PDF hasil uji similarity Turnitin terbaru',
      'Penyusunan kalimat akademik baku, lugas & koheren',
      'Garansi pengerjaan ulang bila skor belum memenuhi syarat',
    ],
  },
  {
    id: 'other-proposal',
    name: 'Proposal Skripsi & Seminar Proposal (Bab 1 – Bab 3)',
    category: 'Bab 1 - Bab 3',
    desc: 'Penyusunan naskah proposal ilmiah lengkap: Bab 1 (Latar Belakang Fenomena, Masalah, Tujuan), Bab 2 (Tinjauan Teori, Kerangka Pemikiran, Hipotesis), dan Bab 3 (Metodologi Penelitian, Populasi, Sampel, Analisis Data) siap diseminarkan.',
    estPrice: 'Mulai Rp 1.100.000',
    estDuration: '4 - 6 Hari',
    badge: 'Siap Semhas',
    deliverables: [
      'Naskah Bab 1, Bab 2, dan Bab 3 rapi sesuai pedoman kampus',
      'Sitasi referensi 10+ jurnal bereputasi via Mendeley/Zotero',
      'Matriks kerangka pemikiran / bagan alir metodologi',
      'Garansi revisi dosen pembimbing sampai disetujui semhas',
    ],
  },
  {
    id: 'other-full',
    name: 'Paket Skripsi Full (Bab 1 – Bab 5 Komplit + Olah Data + Jurnal)',
    category: 'Full Skripsi',
    desc: 'Penyusunan naskah utuh dari Bab 1 sampai Bab 5 lengkap, pengolahan data statistik atau kualitatif (SPSS, SmartPLS, regresi, uji validitas reliabilitas, atau studi pustaka hukum/sosial), draf artikel jurnal publikasi, dan materi slide presentasi sidang.',
    estPrice: 'Mulai Rp 2.500.000',
    estDuration: '10 - 15 Hari',
    badge: 'Paling Komplit',
    deliverables: [
      'Naskah lengkap Bab 1 sampai Bab 5 utuh siap jilid',
      'Pengolahan data statistik / kuesioner + interpretasi data Bab 4',
      'Draf artikel jurnal ilmiah siap publikasi',
      'Slide PPT presentasi sidang + ringkasan tanya jawab penguji',
      'Garansi revisi dosen pembimbing sampai lulus sidang',
    ],
  },
];

const SKRIPSI_FAQS = [
  {
    q: 'Bagaimana alur pemesanan dan bimbingan skripsi di BiruMarket?',
    a: 'Pilih Program Studi Anda di formulir, tentukan paket layanan yang dibutuhkan, dan klik tombol konsultasi WhatsApp. Kami akan langsung mengonfirmasi rincian judul, timeline pengerjaan, dan skema termin pembayaran. Setelah DP disepakati, pengerjaan langsung dimulai dengan progres yang dilaporkan secara berkala.',
  },
  {
    q: 'Apakah kerahasiaan identitas dan data kampus saya dijamin aman?',
    a: '100% aman dan terenkripsi. Kami tidak pernah mempublikasikan nama mahasiswa, nomor induk (NIM), maupun nama kampus Anda ke pihak manapun. Naskah dan source code yang dibuat menjadi hak milik eksklusif Anda sepenuhnya.',
  },
  {
    q: 'Bagaimana jika dosen pembimbing meminta revisi berkali-kali?',
    a: 'Seluruh paket layanan di BiruMarket menyertakan Garansi Bebas Revisi tanpa biaya tambahan selama revisi masih berada dalam ruang lingkup judul dan metode yang disepakati di awal.',
  },
  {
    q: 'Apakah bisa bayar bertahap (sistem termin)?',
    a: 'Bisa. Untuk paket komplit / full, pembayaran dapat dibagi menjadi 3 termin: DP awal saat mulai pengerjaan Bab 1-3, termin kedua saat pengujian/sistem Bab 4 selesai, dan pelunasan saat naskah siap didaftarkan ke sidang.',
  },
  {
    q: 'Bagaimana jika saya belum punya judul sama sekali?',
    a: 'Cukup pilih opsi "Belum ada judul" pada formulir. Tim akademisi & engineer kami akan merumuskan 3 rekomendasi judul penelitian terkini yang relevan dengan tren saat ini dan cepat disetujui dosen.',
  },
];

export default function SkripsiPage() {
  const [major, setMajor] = useState<MajorOption>('TI_SE');
  const [customMajor, setCustomMajor] = useState('');
  const [name, setName] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [degree, setDegree] = useState('S1');
  const [university, setUniversity] = useState('');
  const [hasTitle, setHasTitle] = useState<'yes' | 'no'>('yes');
  const [title, setTitle] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string>('full-bundle-se');
  const [methodOrStack, setMethodOrStack] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Get active packages based on selected major dropdown
  const currentPackages: ServicePackage[] =
    major === 'OTHER' ? OTHER_PACKAGES : IT_PACKAGES[major];

  // Resolve currently selected package
  const activePkg =
    currentPackages.find((p) => p.id === selectedPackage) || currentPackages[0];

  // Readable major label
  const getMajorDisplayLabel = () => {
    switch (major) {
      case 'TI_SE':
        return 'Teknik Informatika / Software Engineering';
      case 'TI_IOT':
        return 'Teknik Informatika / IOT';
      case 'SI':
        return 'Sistem Informasi';
      case 'OTHER':
        return customMajor.trim() ? `Jurusan ${customMajor.trim()}` : 'Program Studi Lainnya (Non-IT)';
    }
  };

  const handleMajorChange = (newMajor: MajorOption) => {
    setMajor(newMajor);
    if (newMajor === 'OTHER') {
      setSelectedPackage(OTHER_PACKAGES[0].id);
    } else {
      setSelectedPackage(IT_PACKAGES[newMajor][0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleText =
      hasTitle === 'yes'
        ? title.trim() || 'Judul belum diisi'
        : 'Belum Ada Judul (Mohon Rekomendasikan 3 Opsi Judul Skripsi)';

    const majorName =
      major === 'OTHER'
        ? `Jurusan Lain: ${customMajor.trim() || 'Tidak disebutkan'}`
        : getMajorDisplayLabel();

    const textLines = [
      `Halo Mas Fikri, saya ingin konsultasi pengerjaan skripsi melalui BiruMarket (${CONTACT_INFO.domain}):`,
      ``,
      `*Nama Mahasiswa:* ${name.trim() || 'Mahasiswa'}`,
      `*No. WhatsApp:* ${waNumber.trim() || '-'}`,
      `*Jenjang:* ${degree}`,
      `*Program Studi:* ${majorName}`,
      university.trim() ? `*Universitas:* ${university.trim()}` : '',
      ``,
      `*Paket Layanan:* ${activePkg.name}`,
      `*Kategori:* ${activePkg.category}`,
      `*Judul Skripsi:* ${titleText}`,
      methodOrStack.trim()
        ? `*Metode / Tech Stack / Alat Analisis:* ${methodOrStack.trim()}`
        : '',
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-12">
        {/* Top Hero Banner */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative overflow-hidden border-0">
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-xs font-extrabold text-[#1D4ED8]">
              <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
              <span>Bimbingan &amp; Layanan Akademik Skripsi Profesional</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.08] text-[#111315]">
              Layanan Pengerjaan Skripsi{' '}
              <span className="text-[#1D4ED8]">
                IT &amp; Akademik Terpadu.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#525860] leading-relaxed font-medium">
              Solusi tuntas pengerjaan naskah dan implementasi tugas akhir. Menyediakan pengembangan sistem komputasi berstandar industri untuk <strong>Teknik Informatika (Software Engineering &amp; IoT)</strong>, <strong>Sistem Informasi</strong>, serta layanan akademik <strong>Parafrase Turnitin, Proposal Bab 1–3, dan Skripsi Full</strong> untuk berbagai jurusan.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-bold text-[#111315]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Garansi Bebas Revisi Dosen</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Lolos Turnitin Similarity &lt;15%</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Bimbingan Privat 1-on-1 Sampai Sidang</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid: Form (7 cols) + Sticky Summary (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-8 border-0"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                <span>Formulir Konsultasi Skripsi</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#111315] mt-1">
                Data Mahasiswa &amp; Kebutuhan Layanan
              </h2>
              <p className="text-xs text-[#525860] mt-1 font-medium">
                Pilih program studi Anda pada dropdown di bawah untuk melihat pilihan paket yang sesuai.
              </p>
            </div>

            {/* 1. Identitas & Dropdown Program Studi */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">
                  1
                </span>
                <span>Data Mahasiswa &amp; Program Studi</span>
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
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
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
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
                  />
                </div>
              </div>

              {/* Jenjang Studi + Jurusan Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Jenjang Studi
                  </label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-xs font-bold text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
                  >
                    <option value="D3">Diploma (D3)</option>
                    <option value="S1">Sarjana (S1 / Terapan)</option>
                    <option value="S2">Magister / Master (S2)</option>
                  </select>
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    Jurusan / Program Studi <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={major}
                    onChange={(e) => handleMajorChange(e.target.value as MajorOption)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-xs font-bold text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0 cursor-pointer"
                  >
                    <option value="TI_SE">Teknik Informatika / Software Engineering</option>
                    <option value="TI_IOT">Teknik Informatika / IOT</option>
                    <option value="SI">Sistem Informasi</option>
                    <option value="OTHER">Other (Jurusan Lainnya)</option>
                  </select>
                </div>
              </div>

              {/* Conditional Input for "OTHER" Major */}
              {major === 'OTHER' && (
                <div className="p-4 rounded-2xl bg-amber-50/70 space-y-2 border-0">
                  <label className="block text-xs font-extrabold text-amber-900">
                    Tuliskan Nama Jurusan / Program Studi Anda <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Manajemen, Akuntansi, Hukum, Kedokteran, Psikologi, Teknik Sipil..."
                    value={customMajor}
                    onChange={(e) => setCustomMajor(e.target.value)}
                    className="w-full px-4 py-3 bg-white rounded-xl text-sm font-semibold text-[#111315] focus:outline-none shadow-sm border-0"
                  />
                  <p className="text-[11px] text-amber-800 font-medium">
                    Untuk program studi non-IT, tersedia 3 paket layanan: <strong>Parafrase Lolos Turnitin</strong>, <strong>Proposal (Bab 1–Bab 3)</strong>, dan <strong>Paket Skripsi Full (Bab 1–5 Komplit)</strong>.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#525860] mb-1.5">
                  Kampus / Universitas (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Universitas Budi Luhur, Gunadarma, Mercu Buana, UI, Binus, Telkom..."
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
                />
              </div>
            </div>

            {/* 2. Pemilihan Paket Layanan */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Pilih Paket Layanan yang Dibutuhkan</span>
                </h3>
                <span className="text-[11px] font-bold text-[#1D4ED8]">
                  {major === 'OTHER' ? 'Paket Akademik' : getMajorDisplayLabel()}
                </span>
              </div>

              {/* Grid Cards Paket */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentPackages.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-4 rounded-2xl transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-sm border-0 ${
                        isSelected
                          ? 'bg-[#111315] text-white shadow-md scale-[1.01]'
                          : 'bg-[#F8F7F4] hover:bg-white text-[#111315]'
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
                        className={`pt-2.5 text-xs font-bold flex items-center justify-between ${
                          isSelected ? 'text-white' : 'text-[#111315]'
                        }`}
                      >
                        <span className={isSelected ? 'text-blue-300' : 'text-[#1D4ED8]'}>
                          {pkg.estPrice}
                        </span>
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
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#111315] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#111315] text-white flex items-center justify-center text-xs">
                  3
                </span>
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
                  <span>Sudah Ada Judul</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-[#111315] cursor-pointer">
                  <input
                    type="radio"
                    name="hasTitle"
                    checked={hasTitle === 'no'}
                    onChange={() => setHasTitle('no')}
                    className="accent-[#111315]"
                  />
                  <span>Belum Ada Judul (Bantu Buatkan 3 Opsi)</span>
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
                      major === 'TI_SE'
                        ? 'Contoh: Klasifikasi Penyakit Daun Teh Menggunakan Algoritma Convolutional Neural Network (CNN) Berbasis Web...'
                        : major === 'TI_IOT'
                          ? 'Contoh: Sistem Monitoring Kualitas Udara & Kebocoran Gas Berbasis IoT Menggunakan ESP32 dan Protokol MQTT...'
                          : major === 'SI'
                            ? 'Contoh: Sistem Pendukung Keputusan Pemilihan Karyawan Teladan Menggunakan Metode TOPSIS Berbasis Web pada PT ABC...'
                            : 'Contoh: Pengaruh Beban Kerja dan Kompensasi Terhadap Kinerja Karyawan Melalui Kepuasan Kerja...'
                    }
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-blue-50/80 text-xs font-medium text-blue-900 leading-relaxed border-0">
                  Tim kami akan merumuskan 3 opsi judul skripsi untuk <strong>{getMajorDisplayLabel()}</strong> yang sesuai dengan studi kasus terbaru, cepat disetujui dosen pembimbing, dan metodologinya jelas.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#525860] mb-1.5">
                    {major === 'OTHER'
                      ? 'Metode / Alat Analisis (Opsional)'
                      : 'Metode / Algoritma / Stack Target'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      major === 'TI_SE'
                        ? 'Contoh: YOLOv8, CNN, Flutter, Next.js, AES-256...'
                        : major === 'TI_IOT'
                          ? 'Contoh: ESP32, MQ-2, DHT22, MQTT, Firebase...'
                          : major === 'SI'
                            ? 'Contoh: TOPSIS, AHP, SAW, Laravel, MySQL, UML...'
                            : 'Contoh: SPSS, SmartPLS, Regresi Linier, Kualitatif...'
                    }
                    value={methodOrStack}
                    onChange={(e) => setMethodOrStack(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
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
                    className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-xs font-bold text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#525860] mb-1.5">
                  Catatan Tambahan / Permintaan Khusus Dosen
                </label>
                <textarea
                  rows={3}
                  placeholder="Contoh: Dosen minta sitasi jurnal 5 tahun terakhir, similarity Turnitin wajib di bawah 15%, dan ada sesi bimbingan persiapan sidang..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8F7F4] rounded-2xl text-sm font-medium text-[#111315] focus:bg-white focus:outline-none transition shadow-inner border-0"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#111315] hover:bg-[#1D4ED8] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] border-0"
            >
              <Send className="w-4 h-4" />
              <span>Konsultasikan Skripsi via WhatsApp</span>
            </button>
          </form>

          {/* Right: Sticky Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 border-0">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8]">
                    Ringkasan Pemesanan
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {major === 'OTHER' ? 'Jurusan Lain' : major.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#111315] pt-1">
                  {activePkg.name}
                </h3>
                <span className="text-xs font-bold text-[#687078] block">
                  Kategori: {activePkg.category}
                </span>
              </div>

              <div className="space-y-3 text-xs font-medium text-[#525860]">
                <div className="flex justify-between py-1">
                  <span>Estimasi Biaya</span>
                  <span className="font-extrabold text-sm text-[#111315]">{activePkg.estPrice}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Estimasi Pengerjaan</span>
                  <span className="font-extrabold text-sm text-[#111315]">{activePkg.estDuration}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Garansi Revisi Dosen</span>
                  <span className="font-bold text-emerald-600">Gratis Sampai Lulus Sidang</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sistem Pembayaran</span>
                  <span className="font-bold text-[#111315]">Bisa Dicicil Bertahap / Termin</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F7F4] space-y-2 text-xs border-0">
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
                  `Halo Fikri, saya mahasiswa ${getMajorDisplayLabel()} ingin tanya ketersediaan slot untuk ${activePkg.name} di BiruMarket.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#111315] hover:bg-[#1D4ED8] text-white text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition shadow-md border-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Mas Fikri Sekarang</span>
              </a>
            </div>

            {/* Academic Assurance Card */}
            <div className="bg-[#111315] text-white rounded-[2.5rem] p-6 sm:p-8 space-y-4 shadow-xl border-0">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-400 block">
                Standard Akademik Teruji
              </span>
              <h4 className="text-lg font-extrabold leading-snug">
                Bukan Sekadar Joki Naskah, Ini Rekayasa Akademik Tuntas.
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                Setiap naskah ditulis mengikuti standar pedoman penulisan skripsi kampus Anda, didukung rujukan jurnal bereputasi terbaru, dan diuji Turnitin resmi dengan similarity &lt;15%.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.04)] space-y-6 border-0">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111315] mt-1">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-3">
            {SKRIPSI_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#F8F7F4] overflow-hidden transition border-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-[#111315] focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#525860] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1D4ED8]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#525860] leading-relaxed font-medium">
                      {faq.a}
                    </div>
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
