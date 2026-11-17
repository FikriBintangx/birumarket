export const CONTACT_INFO = {
  brandName: 'BiruMarket',
  domain: 'birumarket.web.id',
  fallbackDomain: 'birumarket.vercel.app',
  ownerName: 'Fikri Bintang Purnomo',
  ownerRole: 'Fullstack & Mobile UI/UX Engineer',
  location: 'Cikupa, Kab. Tangerang, Banten, Indonesia',
  whatsappNumber: '6281292870932',
  whatsappDisplay: '+62 812-9287-0932',
  email: 'fikribintangpurnomo@gmail.com',
  github: 'https://github.com/FikriBintangx',
  linkedin: 'https://www.linkedin.com/in/fikribintangpurnomo',
  instagram: 'https://instagram.com/biru.css',
  portfolio: 'https://fikribintang.web.id',
};

export interface ProductItem {
  id: string;
  sku?: string;
  title: string;
  slug: string;
  tagline: string;
  category: 'SAAS WEB' | 'E-COMMERCE' | 'MOBILE APPS' | 'SCRIPTS & BOTS' | string;
  tech_stack: string[];
  price: number;
  is_portfolio: boolean;
  thumbnail_url: string;
  preview_images: string[];
  demo_url: string;
  github_url: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  status: 'ACTIVE' | 'SOLD' | 'ARCHIVED' | string;
  created_at?: string;
}

export const TURNKEY_DEPLOY_FEE = 250000;

export function buildWhatsAppOrderUrl(
  product: ProductItem,
  licenseType: 'source' | 'turnkey' = 'source'
): string {
  const totalPrice = product.is_portfolio
    ? 0
    : licenseType === 'turnkey'
      ? product.price + TURNKEY_DEPLOY_FEE
      : product.price;

  const packageLabel = product.is_portfolio
    ? 'Diskusi Proyek Custom Serupa'
    : licenseType === 'turnkey'
      ? 'Full Source Code + Turnkey Deploy & Domain Setup'
      : 'Full Source Code + Database Schema';

  const priceText = product.is_portfolio
    ? 'Custom Quote'
    : `Rp ${totalPrice.toLocaleString('id-ID')}`;

  const text = [
    `Halo Fikri, saya ingin memesan dari BiruMarket (${CONTACT_INFO.domain}):`,
    `Produk: ${product.title}`,
    `Kategori: ${product.category}`,
    `Paket: ${packageLabel}`,
    `Estimasi Biaya: ${priceText}`,
    product.demo_url ? `Live Demo: ${product.demo_url}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-jurnalku',
    sku: 'BM-SAAS-01',
    title: 'JurnalKu AI Literature & RAG Suite',
    slug: 'jurnalku-ai-literature-rag-suite',
    tagline: 'Workspace riset akademik berbasis RAG dengan sitasi visual PDF dan matriks literatur otomatis',
    category: 'SAAS WEB',
    tech_stack: ['Next.js', 'Python', 'Supabase Vector', 'TypeScript', 'Tailwind CSS'],
    price: 1450000,
    is_portfolio: false,
    thumbnail_url: '/products/p-jurnalku.png',
    preview_images: ['/products/p-jurnalku.png'],
    demo_url: 'https://dejurnal.vercel.app',
    github_url: 'https://github.com/FikriBintangx/JURNALKU',
    description:
      'Platform riset akademik berbasis Retrieval-Augmented Generation (RAG) yang mengekstrak temuan inti, matriks perbandingan metodologi, serta sitasi halaman PDF secara presisi.',
    problem:
      'Peneliti dan mahasiswa menghabiskan puluhan jam membaca manual ratusan halaman jurnal hanya untuk menyusun matriks literatur.',
    solution:
      'Pipeline RAG berbasis Supabase pgvector yang mengindeks halaman PDF secara terstruktur dengan highlight sitasi interaktif dan ekspor BibTeX / APA.',
    features: [
      'Analisis komparatif multi-dokumen dan generator matriks literatur otomatis',
      'Highlighter sitasi visual langsung menunjuk ke halaman PDF sumber',
      'Ekspor referensi siap pakai ke format BibTeX, Mendeley, dan APA 7th',
      'Pencarian semantik lintas dokumen dengan ground-truth verification',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-marimatcha',
    sku: 'BM-ECM-02',
    title: 'MariMatcha Artisanal E-Commerce',
    slug: 'marimatcha-artisanal-ecommerce',
    tagline: 'Platform e-commerce kurasi matcha ceremonial dengan filter profil rasa dan manajemen inventaris',
    category: 'E-COMMERCE',
    tech_stack: ['Next.js', 'React', 'Tailwind CSS', 'PHP / Laravel', 'MySQL'],
    price: 850000,
    is_portfolio: false,
    thumbnail_url: '/products/p-marimatcha.png',
    preview_images: ['/products/p-marimatcha.png'],
    demo_url: 'https://marimatcha.vercel.app',
    github_url: 'https://github.com/FikriBintangx/Macha',
    description:
      'Website toko online modern untuk brand F&B atau UMKM artisan. Dilengkapi filter grade produk, keranjang belanja responsif, kalkulator pengiriman, dan dashboard merchant.',
    problem:
      'Toko UMKM konvensional sering kehilangan konversi akibat tampilan generik dan proses checkout yang lambat di perangkat mobile.',
    solution:
      'Antarmuka editorial berkecepatan tinggi dengan state keranjang instan, filter atribut produk, dan panel admin manajemen pesanan terpusat.',
    features: [
      'Katalog interaktif dengan filter grade ceremonial vs culinary',
      'Keranjang dan checkout cepat dengan kalkulasi subtotal real-time',
      'Panel manajemen stok produk dan status pesanan merchant',
      'Desain mobile-first responsif dengan skor performa optimal',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-prepmaster',
    sku: 'BM-SAAS-03',
    title: 'PrepMaster AI Voice Mock Interview',
    slug: 'prepmaster-ai-voice-mock-interview',
    tagline: 'Simulator wawancara kerja berbasis rubrik STAR dengan analisis suara real-time dan laporan PDF',
    category: 'SAAS WEB',
    tech_stack: ['Next.js', 'Web Speech API', 'Recharts', 'TypeScript', 'Tailwind CSS'],
    price: 1250000,
    is_portfolio: false,
    thumbnail_url: '/products/p-prepmaster.png',
    preview_images: ['/products/p-prepmaster.png'],
    demo_url: 'https://prepmaster-ai-sandy.vercel.app',
    github_url: 'https://github.com/FikriBintangx',
    description:
      'Aplikasi latihan wawancara kerja berbasis browser yang membedah CV PDF pelamar, menjalankan sesi tanya-jawab suara dua arah, lalu menghasilkan skor rubrik STAR dan laporan debrief PDF.',
    problem:
      'Kandidat sering gagal di tahap wawancara teknis dan behavioral karena tidak memiliki umpan balik terstruktur sebelum hari H.',
    solution:
      'Pipeline Web Speech API dengan waveform audio visualizer, parser CV PDF otomatis, serta mesin evaluasi berbasis metrik Situation, Task, Action, Result.',
    features: [
      'Ekstraksi profil dan kompetensi otomatis dari unggahan CV PDF',
      'Interaksi tanya-jawab suara real-time dengan visualizer waveform',
      'Penilaian kuantitatif dan grafik radar kompetensi per kategori',
      'Unduh laporan evaluasi wawancara lengkap dalam format PDF',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-notesbrain',
    sku: 'BM-SAAS-04',
    title: 'NotesBrain Multi-Doc RAG & Flashcards',
    slug: 'notesbrain-multidoc-rag-flashcards',
    tagline: 'Ruang belajar cerdas anti-halusinasi dengan jump-to-citation dan algoritma SuperMemo-2',
    category: 'SAAS WEB',
    tech_stack: ['Next.js', 'pgvector', 'SuperMemo-2', 'IndexedDB', 'TypeScript'],
    price: 950000,
    is_portfolio: false,
    thumbnail_url: '/products/p-notesbrain.png',
    preview_images: ['/products/p-notesbrain.png'],
    demo_url: 'https://02-notesbrain.vercel.app',
    github_url: 'https://github.com/FikriBintangx',
    description:
      'Workspace pembelajaran multi-PDF yang menggabungkan Q&A berbasis konteks dokumen ketat (grounded RAG), penanda halaman sumber, dan generator flashcard 3D spaced repetition.',
    problem:
      'Materi kuliah yang tersebar di banyak file PDF sulit dipelajari ulang dan chatbot AI biasa kerap mengarang jawaban di luar materi.',
    solution:
      'Chunking dokumen deterministik dengan vector embeddings serta penjadwalan pengulangan memori menggunakan algoritma SuperMemo-2 dan penyimpanan offline IndexedDB.',
    features: [
      'Grounded Q&A yang hanya menjawab berdasarkan dokumen yang diunggah',
      'Klik sitasi untuk langsung melompat ke koordinat halaman PDF terkait',
      'Generator flashcard interaktif dengan jadwal review SuperMemo-2',
      'Persistensi catatan offline-first di browser menggunakan IndexedDB',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-pantrychef',
    sku: 'BM-APP-05',
    title: 'PantryChef Vision Smart Kitchen PWA',
    slug: 'pantrychef-vision-smart-kitchen-pwa',
    tagline: 'Aplikasi PWA asisten dapur: scan bahan kulkas, hitung kalori, dan timer masak audio',
    category: 'MOBILE APPS',
    tech_stack: ['Next.js', 'PWA', 'Web Audio API', 'IndexedDB', 'Tailwind CSS'],
    price: 750000,
    is_portfolio: false,
    thumbnail_url: '/products/p-pantrychef.png',
    preview_images: ['/products/p-pantrychef.png'],
    demo_url: 'https://03-pantrychef.vercel.app',
    github_url: 'https://github.com/FikriBintangx',
    description:
      'Progressive Web App (PWA) yang dapat diinstal di Android/iOS untuk mengidentifikasi bahan makanan tersisa di kulkas, menyusun resep adaptif, dan memandu langkah masak dengan audio timer.',
    problem:
      'Bahan makanan rumah tangga kerap terbuang karena pengguna bingung mengolah sisa bahan yang tersedia dengan waktu terbatas.',
    solution:
      'Klasifikasi bahan via kamera perangkat yang dipadukan dengan kalkulator nutrisi otomatis dan multi-stage audio chime berbasis Web Audio API.',
    features: [
      'Pemindaian bahan makanan langsung dari kamera smartphone',
      'Kalkulasi estimasi kalori dan makronutrisi per porsi resep',
      'Audio timer bertingkat untuk tiap langkah memasak tanpa menyentuh layar',
      'Dapat diinstal sebagai aplikasi mobile offline-capable (PWA)',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-estatemate',
    sku: 'BM-ECM-06',
    title: 'EstateMate PropTech & KPR Simulator',
    slug: 'estatemate-proptech-kpr-simulator',
    tagline: 'Portal listing properti komersial dengan kalkulator amortisasi KPR dan perbandingan unit',
    category: 'E-COMMERCE',
    tech_stack: ['React', 'Next.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    price: 1100000,
    is_portfolio: false,
    thumbnail_url: '/products/p-estatemate.png',
    preview_images: ['/products/p-estatemate.png'],
    demo_url: 'https://04-estatemate.vercel.app',
    github_url: 'https://github.com/FikriBintangx',
    description:
      'Platform pemasaran properti untuk developer atau agen real estate. Dilengkapi simulasi cicilan KPR real-time, komparasi matriks multi-unit, peta lokasi, dan booking jadwal survei.',
    problem:
      'Calon pembeli properti kesulitan membandingkan skema cicilan, bunga efektif, dan spesifikasi antar unit dalam satu portal yang jernih.',
    solution:
      'Mesin kalkulasi amortisasi hipotek interaktif di sisi klien beserta fitur perbandingan unit side-by-side dan formulir penjadwalan survei agen.',
    features: [
      'Kalkulator simulasi KPR interaktif dengan rincian pokok dan bunga',
      'Komparasi spesifikasi serta estimasi ROI antar properti secara paralel',
      'Sistem penjadwalan kunjungan lokasi langsung dengan agen properti',
      'Filter lokasi, tipe bangunan, dan rentang harga secara instan',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-spendsense',
    sku: 'BM-SAAS-07',
    title: 'SpendSense Personal Finance Tracker',
    slug: 'spendsense-personal-finance-tracker',
    tagline: 'Dashboard manajemen arus kas pribadi dengan kontrol budget kategori dan ekspor CSV',
    category: 'SAAS WEB',
    tech_stack: ['React', 'Chart.js', 'TypeScript', 'Tailwind CSS'],
    price: 550000,
    is_portfolio: false,
    thumbnail_url: '/products/p-spendsense.png',
    preview_images: ['/products/p-spendsense.png'],
    demo_url: 'https://05-spendsense.vercel.app',
    github_url: 'https://github.com/FikriBintangx',
    description:
      'Aplikasi web pencatatan keuangan harian berfokus pada kecepatan input (< 5 detik per transaksi), peringatan batas anggaran per kategori, dan ekspor laporan bulanan ke CSV/Excel.',
    problem:
      'Banyak pengguna berhenti mencatat pengeluaran karena aplikasi keuangan dipenuhi menu rumit dan grafik yang membingungkan.',
    solution:
      'Desain dashboard kontras tinggi dengan alur entri transaksi ringkas, visualisasi arus kas yang langsung terbaca, dan penyimpanan data terenkripsi.',
    features: [
      'Input pemasukan dan pengeluaran cepat dengan kategori kustom',
      'Visualisasi grafik tren pengeluaran bulanan berbasis Chart.js',
      'Peringatan proaktif saat pengeluaran mendekati batas budget kategori',
      'Ekspor laporan transaksi bersih ke format CSV dan Excel',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-mobilku',
    sku: 'BM-ECM-08',
    title: 'Mobilku.id Auto Marketplace & CRM',
    slug: 'mobilkuid-auto-marketplace-crm',
    tagline: 'Showroom jual beli mobil dengan laporan inspeksi unit, simulasi kredit, dan integrasi sales',
    category: 'E-COMMERCE',
    tech_stack: ['Laravel', 'PostgreSQL', 'JavaScript', 'Tailwind CSS'],
    price: 900000,
    is_portfolio: false,
    thumbnail_url: '/products/p-mobilku.png',
    preview_images: ['/products/p-mobilku.png'],
    demo_url: 'https://october-app.vercel.app',
    github_url: 'https://github.com/FikriBintangx/MOBILKU.ID',
    description:
      'Platform katalog otomotif siap pakai untuk showroom mobil bekas maupun dealer resmi. Menyediakan filter detail kendaraan, kalkulator DP/tenor kredit, lembar inspeksi, dan lead WhatsApp otomatis.',
    problem:
      'Pembeli kendaraan sering ragu terhadap transparansi kondisi unit dan simulasi skema angsuran yang tidak jelas di situs showroom konvensional.',
    solution:
      'Kartu inspeksi kondisi eksterior/interior terstruktur, kalkulator tenor kredit fleksibel, serta routing pesan WhatsApp dengan SKU unit terisi otomatis.',
    features: [
      'Pencarian detail berdasarkan merek, tahun produksi, transmisi, dan harga',
      'Kalkulator simulasi uang muka (DP) dan cicilan bulanan interaktif',
      'Skor lembar inspeksi teknis kendaraan yang transparan bagi pembeli',
      'Tombol konsultasi sales WhatsApp dengan template detail kendaraan',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-tiarafinn',
    sku: 'BM-SAAS-09',
    title: 'TiaraFinn RT/RW Civic Billing Suite',
    slug: 'tiarafinn-rtrw-civic-billing-suite',
    tagline: 'Sistem informasi kas warga, penagihan iuran bulanan, dan kwitansi WhatsApp otomatis',
    category: 'SAAS WEB',
    tech_stack: ['Laravel', 'PHP', 'MySQL', 'Bootstrap 5', 'WhatsApp Gateway'],
    price: 700000,
    is_portfolio: false,
    thumbnail_url: '/products/p-tiarafinn.png',
    preview_images: ['/products/p-tiarafinn.png'],
    demo_url: 'https://tiarafin-portfolio.vercel.app',
    github_url: 'https://github.com/FikriBintangx/TiaraFinance',
    description:
      'Aplikasi administrasi lingkungan perumahan dan RT/RW untuk mencatat iuran kebersihan, keamanan, data warga per blok rumah, serta menyajikan laporan kas masuk-keluar transparan.',
    problem:
      'Pembukuan iuran warga berbasis buku tulis atau spreadsheet terpisah rawan selisih hitungan dan menurunkan transparansi pengurus.',
    solution:
      'Portal terpusat dengan pembukuan otomatis per blok rumah, generator kwitansi digital, dan rekap saldo yang dapat diaudit warga kapan saja.',
    features: [
      'Pencatatan iuran keamanan, sampah, dan kas sosial per blok rumah',
      'Pembuatan kwitansi pembayaran digital yang siap dikirim ke WhatsApp warga',
      'Laporan arus kas masuk dan pengeluaran bulanan yang transparan',
      'Database sensus data kepala keluarga dan status hunian warga',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-ourscontent',
    sku: 'BM-SAAS-10',
    title: 'OursContent Editorial Publishing CMS',
    slug: 'ourscontent-editorial-publishing-cms',
    tagline: 'CMS multi-penulis dengan alur moderasi Draft-Review-Publish dan Role-Based Access Control',
    category: 'SAAS WEB',
    tech_stack: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Tailwind CSS'],
    price: 650000,
    is_portfolio: false,
    thumbnail_url: '/products/p-ourscontent.png',
    preview_images: ['/products/p-ourscontent.png'],
    demo_url: 'https://alargenbackoffice.vercel.app',
    github_url: 'https://github.com/FikriBintangx/OursContent',
    description:
      'Sistem manajemen publikasi artikel dan aset media untuk tim redaksi atau portal berita mandiri. Bebas plugin pihak ketiga yang berat, dilengkapi kontrol akses penulis, editor, dan admin.',
    problem:
      'Tim konten membutuhkan alur kurasi artikel sebelum tayang yang ringan dan aman tanpa ketergantungan pada CMS konvensional yang rentan celah plugin.',
    solution:
      'Arsitektur Node.js + MongoDB dengan Role-Based Access Control (RBAC), editor artikel live preview, serta kompresi aset gambar otomatis.',
    features: [
      'Editor artikel rich-text dengan mode pratinjau langsung',
      'Alur kerja moderasi terstruktur (Draft, Review, Published)',
      'Pemisahan hak akses ketat antara kontributor, editor, dan admin',
      'Pemantauan statistik pembaca dan topik artikel terpopuler',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-siabsensi',
    sku: 'BM-APP-11',
    title: 'SiAbsensi Biometric Desktop HRMS',
    slug: 'siabsensi-biometric-desktop-hrms',
    tagline: 'Suite presensi karyawan desktop terhubung mesin fingerprint LAN dan kalkulasi lembur HR',
    category: 'MOBILE APPS',
    tech_stack: ['Java', 'JavaFX', 'MySQL', 'JasperReports'],
    price: 1500000,
    is_portfolio: true,
    thumbnail_url: '/products/p-siabsensi.png',
    preview_images: ['/products/p-siabsensi.png'],
    demo_url: 'https://fikribintang.web.id',
    github_url: 'https://github.com/FikriBintangx/SIABSENSI',
    description:
      'Aplikasi desktop HRMS performa tinggi untuk menarik log mesin fingerprint via jaringan lokal LAN, menghitung jam kerja, keterlambatan, cuti, serta mencetak rekap penggajian.',
    problem:
      'Rekonsiliasi log mesin absensi ke spreadsheet gaji secara manual setiap akhir bulan memakan waktu lama dan rentan human error.',
    solution:
      'Koneksi socket langsung ke perangkat biometrik di LAN dengan mesin kalkulasi aturan shift otomatis dan ekspor laporan siap cetak JasperReports.',
    features: [
      'Sinkronisasi log presensi langsung dari mesin fingerprint via LAN',
      'Kalkulasi otomatis jam kerja reguler, keterlambatan, dan lembur',
      'Modul pengajuan dan persetujuan cuti serta izin karyawan',
      'Ekspor laporan kehadiran siap cetak untuk divisi HR & Finance',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'prod-qris-bot',
    sku: 'BM-BOT-12',
    title: 'QRIS Auto-Dropship & Telegram Bot Engine',
    slug: 'qris-auto-dropship-telegram-bot-engine',
    tagline: 'Automasi transaksi produk digital terintegrasi QRIS gateway, browser worker, dan notifikasi Telegram',
    category: 'SCRIPTS & BOTS',
    tech_stack: ['Playwright', 'Express', 'SQLite / Supabase', 'Tripay QRIS', 'Telegram Bot API'],
    price: 650000,
    is_portfolio: false,
    thumbnail_url: '/products/p-ourscontent.png',
    preview_images: ['/products/p-ourscontent.png'],
    demo_url: 'https://birumarket.web.id',
    github_url: 'https://github.com/FikriBintangx',
    description:
      'Mesin otomasi order produk digital end-to-end. Menerima pembayaran QRIS dinamis melalui webhook, mengeksekusi fulfillment supplier via headless Playwright worker, dan mengirim status ke Telegram.',
    problem:
      'Pemrosesan order produk digital secara manual tidak skalabel saat volume transaksi meningkat di luar jam kerja.',
    solution:
      'Arsitektur event-driven dengan verifikasi signature webhook pembayaran, antrean worker Playwright tahan error, dan pelaporan instan ke bot Telegram admin & buyer.',
    features: [
      'Checkout QRIS dinamis dengan verifikasi callback pembayaran otomatis',
      'Headless browser worker (Playwright) untuk eksekusi fulfillment supplier SPA',
      'Notifikasi status transaksi real-time 3-arah via Telegram Bot API',
      'Logging transaksi lengkap dan mekanisme retry saat koneksi supplier terputus',
    ],
    status: 'ACTIVE',
  },
];

export function enrichProduct(raw: any): ProductItem {
  const matched = DEFAULT_PRODUCTS.find(
    (d) => d.id === raw.id || d.slug === raw.slug
  );

  const techStack = Array.isArray(raw.tech_stack)
    ? raw.tech_stack
    : typeof raw.tech_stack === 'string'
      ? (() => {
          try {
            return JSON.parse(raw.tech_stack);
          } catch {
            return raw.tech_stack
              .split(',')
              .map((s: string) => s.trim())
              .filter(Boolean);
          }
        })()
      : matched?.tech_stack || [];

  const previewImages = Array.isArray(raw.preview_images)
    ? raw.preview_images
    : typeof raw.preview_images === 'string'
      ? (() => {
          try {
            return JSON.parse(raw.preview_images);
          } catch {
            return raw.thumbnail_url ? [raw.thumbnail_url] : [];
          }
        })()
      : matched?.preview_images || (raw.thumbnail_url ? [raw.thumbnail_url] : []);

  return {
    id: raw.id,
    sku: raw.sku || matched?.sku || `BM-${String(raw.category || 'APP').slice(0, 3).toUpperCase()}`,
    title: raw.title || matched?.title || 'Untitled Product',
    slug: raw.slug || matched?.slug || raw.id,
    tagline: raw.tagline || matched?.tagline || raw.description || '',
    category: raw.category || matched?.category || 'SAAS WEB',
    tech_stack: techStack,
    price: Number(raw.price) || 0,
    is_portfolio: Boolean(raw.is_portfolio),
    thumbnail_url: raw.thumbnail_url || matched?.thumbnail_url || '/products/p-jurnalku.png',
    preview_images: previewImages.length > 0 ? previewImages : [raw.thumbnail_url || '/products/p-jurnalku.png'],
    demo_url: raw.demo_url || matched?.demo_url || '',
    github_url: raw.github_url || matched?.github_url || CONTACT_INFO.github,
    description: raw.description || matched?.description || '',
    problem:
      raw.problem ||
      matched?.problem ||
      'Bisnis membutuhkan fondasi aplikasi teruji agar tidak membuang waktu membangun arsitektur dasar dari nol.',
    solution:
      raw.solution ||
      matched?.solution ||
      'Source code siap pakai dengan struktur modular, skema database lengkap, dan dokumentasi setup cepat.',
    features:
      Array.isArray(raw.features) && raw.features.length > 0
        ? raw.features
        : matched?.features || [
            'Source code lengkap dan terstruktur rapi untuk kustomisasi lanjutan',
            'Skema database dan panduan environment variable siap deploy',
            'Desain responsif untuk desktop maupun mobile',
          ],
    status: raw.status || 'ACTIVE',
    created_at: raw.created_at,
  };
}
