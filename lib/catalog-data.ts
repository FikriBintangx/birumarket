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

export const CATEGORIES = [
  'ALL',
  'POS DASHBOARD',
  'SAAS WEB',
  'E-COMMERCE',
  'SCRIPTS & BOTS',
] as const;

export interface ProductItem {
  id: string;
  sku?: string;
  title: string;
  slug: string;
  tagline: string;
  category: string;
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
    `SKU: ${product.sku || product.id}`,
    `Kategori: ${product.category}`,
    `Paket: ${packageLabel}`,
    `Estimasi Biaya: ${priceText}`,
    product.demo_url
      ? `Live Demo: https://${CONTACT_INFO.domain}${product.demo_url.startsWith('/') ? product.demo_url : ''}`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const DEFAULT_PRODUCTS: ProductItem[] = [
  // 5 POS DASHBOARDS (Radically distinct UIs)
  {
    id: 'pos-kuro',
    sku: 'BM-POS-01',
    title: 'KuroBento · Izakaya & Ramen Table POS + KDS',
    slug: 'pos-kuro',
    tagline: 'POS meja restoran Jepang tema Tokyo Dark Charcoal & Vermilion lengkap dengan Kitchen Display System',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'KDS Queue'],
    price: 950000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-pos-kuro.svg',
    preview_images: ['/products/thumb-pos-kuro.svg'],
    demo_url: '/demo/pos-kuro',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Sistem kasir restoran Jepang dengan layout 3-kolom gelap anti-silau untuk shift malam. Dilengkapi peta meja interaktif (T-01 s.d. T-08), modifikasi tekstur mie & tingkat kuah ramen, serta jalur tiket KDS langsung ke dapur.',
    problem:
      'Restoran ramen & izakaya kesulitan meneruskan detail kustomisasi pesanan (tingkat kematangan mie, kuah, topping) secara cepat dari meja ke dapur saat jam ramai.',
    solution:
      'Antarmuka dark charcoal kontras tinggi (#111315 + #E11D48) dengan alur ketuk 2 langkah per meja dan antrean tiket Kitchen Display System real-time.',
    features: [
      'Peta meja interaktif 8 slot (Available, Occupied, Billing) dengan kapasitas tamu',
      'Kustomisasi ramen per item: pilihan kuah & tekstur mie (Katame / Futsu / Yawame)',
      'Panel Kitchen Display System (KDS) untuk melacak status masak tiap tiket meja',
      'Kalkulasi PPN & Service Charge otomatis serta fitur Fire to Kitchen',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-brew',
    sku: 'BM-POS-02',
    title: 'BrewLab · Specialty Coffee & Barista Touch POS',
    slug: 'pos-brew',
    tagline: 'POS kedai kopi tema Warm Oat & Espresso dengan matriks modifier susu, gula, es, dan cup ticket',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Receipt Builder', 'QRIS UI'],
    price: 850000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-pos-brew.svg',
    preview_images: ['/products/thumb-pos-brew.svg'],
    demo_url: '/demo/pos-brew',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Dashboard kasir speed-bar khusus specialty coffee shop bernuansa Warm Oat (#FAF6F0) dan Espresso (#2C1A11). Dirancang untuk input cepat nama pelanggan di gelas serta opsi modifier minuman sekali sentuh.',
    problem:
      'Kasir coffee shop sering memperlambat antrean karena submenu modifier (Oatmilk, Less Ice, Extra Shot, Sugar Level) terlalu tersembunyi.',
    solution:
      'Matriks modifier permanen di kolom tengah sehingga barista dapat mengatur milk base, kadar gula, es, shot espresso, dan nama gelas dalam satu layar.',
    features: [
      'Matriks modifier minuman instan: Oat/Soy/Dairy, 0%-100% Sugar, Ice, Extra Shot',
      'Input nama pelanggan langsung tercetak di Cup Ticket & Thermal Struk',
      'Kategori cepat Signature Espresso, Manual Brew V60, Non-Coffee, & Pastry',
      'Preview struk termal siap cetak dan kode QRIS nominal otomatis',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-medika',
    sku: 'BM-POS-03',
    title: 'ApotekMedika · Pharmacy FEFO & Etiket Obat POS',
    slug: 'pos-medika',
    tagline: 'POS farmasi klinis berdensitas tinggi dengan pelacakan Batch FEFO, stok kadaluarsa, & cetak etiket dosis',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'FEFO Engine'],
    price: 1250000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-pos-medika.svg',
    preview_images: ['/products/thumb-pos-medika.svg'],
    demo_url: '/demo/pos-medika',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Terminal dispensing apotek dan klinik bernuansa klinis steril (#F8FAFC + Emerald #065F46). Fokus pada akurasi pengeluaran batch obat First-Expired-First-Out (FEFO), peringatan resep, dan generator label etiket dosis otomatis.',
    problem:
      'Kesalahan pembacaan tanggal kadaluarsa batch obat dan penulisan aturan minum manual di plastik klip memicu risiko fatal bagi pasien.',
    solution:
      'Tabel inventaris klinis dengan indikator batch FEFO otomatis, toggle jasa tuslah resep, serta generator label etiket aturan pakai per obat.',
    features: [
      'Pencarian cepat obat berdasarkan nama dagang, zat aktif, maupun nomor batch',
      'Indikator prioritas FEFO (First Expired First Out) & peringatan stok menipis',
      'Kalkulator & preview Etiket Obat (3x1 Sesudah Makan / Sebelum Makan / Luar)',
      'Toggle biaya jasa racik / tuslah apoteker dan penomoran resep otomatis',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-atelier',
    sku: 'BM-POS-04',
    title: 'AtelierLuxe · Boutique Size-Matrix & VIP Clienteling POS',
    slug: 'pos-atelier',
    tagline: 'POS butik fashion & sneaker tema Obsidian Gold dengan matriks stok ukuran dan diskon VIP tier',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Clienteling CRM'],
    price: 1100000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-pos-atelier.svg',
    preview_images: ['/products/thumb-pos-atelier.svg'],
    demo_url: '/demo/pos-atelier',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Antarmuka kasir retail fashion premium bertema Obsidian Monochrome (#09090B) dan Champagne Gold (#D4AF37). Mendukung pemilihan varian ukuran per item (S/M/L/XL maupun EU Shoe Size), level member VIP, dan opsi gift box packaging.',
    problem:
      'Kasir toko retail kasual generik tidak cocok dipakai di butik high-ticket yang membutuhkan pengecekan stok lintas ukuran dan diskon privilege member.',
    solution:
      'Editorial lookbook POS dengan matriks stok ukuran real-time per lokasi butik serta modul clienteling VIP (Silver, Gold, Black Tier).',
    features: [
      'Selector varian ukuran interaktif langsung di kartu koleksi produk',
      'Pantauan ketersediaan stok ukuran antar cabang butik secara langsung',
      'Kalkulasi privilege member VIP otomatis (Silver 5%, Gold 10%, Black 15%)',
      'Opsi complimentary luxury gift box & personal note pada Client Bag',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-bengkel',
    sku: 'BM-POS-05',
    title: 'PitStop Pro · Auto Service Bay & Sparepart Work-Order POS',
    slug: 'pos-bengkel',
    tagline: 'POS bengkel otomotif tema Gunmetal Amber dengan pemantau 4-Bay Lift, jasa mekanik, & SPK Invoice',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'SPK Engine'],
    price: 1350000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-pos-bengkel.svg',
    preview_images: ['/products/thumb-pos-bengkel.svg'],
    demo_url: '/demo/pos-bengkel',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Dashboard manajemen bengkel mobil & motor bertema industrial Gunmetal (#0F172A) dan Safety Amber (#F59E0B). Menggabungkan monitoring 4 bay hydraulic lift, pencatatan pelat nomor & mekanik, serta pemisahan tagihan Jasa Servis vs Suku Cadang OEM.',
    problem:
      'Bengkel sering kewalahan melacak kendaraan mana yang sedang ditangani di tiap stall lift beserta rincian suku cadang yang sudah terpasang.',
    solution:
      'Panel Service Bay visual di baris atas untuk beralih antar kendaraan aktif, dipadukan katalog Jasa & Sparepart untuk menerbitkan Invoice SPK instan.',
    features: [
      'Monitoring 4 Bay Service aktif lengkap dengan pelat nomor, unit, & mekanik',
      'Pemisahan tagihan Jasa Mekanik (Labor) dan Suku Cadang (OEM Parts)',
      'Input catatan inspeksi kilometer & keluhan langsung ke Work Order (SPK)',
      'Penerbitan Invoice SPK Bengkel dengan keterangan garansi servis 30 hari',
    ],
    status: 'ACTIVE',
  },

  // 5 ORIGINAL WEB / SAAS APPLICATIONS
  {
    id: 'app-pulseops',
    sku: 'BM-WEB-06',
    title: 'PulseOps · Uptime Monitor & Incident Status Page SaaS',
    slug: 'app-pulseops',
    tagline: 'Platform pemantau uptime API, simulasi ping latency multi-node, dan log insiden layanan real-time',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Telemetry UI'],
    price: 900000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-app-pulseops.svg',
    preview_images: ['/products/thumb-app-pulseops.svg'],
    demo_url: '/demo/app-pulseops',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Halaman status layanan dan dashboard monitoring endpoint untuk tim SaaS atau agensi IT. Menampilkan visualisasi bar uptime 30 slot per service, uji ping latensi real-time, serta log kronologi insiden.',
    problem:
      'Tim teknis membutuhkan halaman status independen yang jernih untuk menginformasikan kondisi server tanpa mengandalkan layanan mahal pihak ketiga.',
    solution:
      'Dashboard dark telemetry ringan dengan simulator ping check, filter status node (Operational / Degraded), dan formulir publikasi update insiden.',
    features: [
      'Monitor multi-service dengan riwayat bar status harian yang responsif',
      'Tombol Run Ping Check interaktif untuk mengukur variasi latensi tiap node',
      'Filter status layanan (Semua, Sehat, Gangguan) secara instan',
      'Composer publikasi laporan insiden baru ke timeline publik',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-splitbill',
    sku: 'BM-WEB-07',
    title: 'BagiRata · Smart Receipt Splitter & Tax/Service Calculator',
    slug: 'app-splitbill',
    tagline: 'Aplikasi split bill patungan tema Neo-Brutalist dengan pembagian per item, PPN 11%, & Service 5%',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'WhatsApp Share'],
    price: 550000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-app-splitbill.svg',
    preview_images: ['/products/thumb-app-splitbill.svg'],
    demo_url: '/demo/app-splitbill',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Alat hitung patungan tagihan nongkrong atau makan kantor bergaya Neo-Brutalist kontras tinggi. Pengguna cukup menambah nama teman, mencentang siapa saja yang memesan tiap menu, lalu menghitung pajak & servis secara proporsional.',
    problem:
      'Membagi struk restoran secara merata sering tidak adil ketika harga menu tiap orang berbeda dan ada pajak PPN serta service charge.',
    solution:
      'Kalkulator alokasi item per peserta dengan pembobotan proporsional otomatis untuk PPN 11% dan Service Charge 5%, siap salin ke chat WhatsApp.',
    features: [
      'Tambah & hapus peserta patungan secara dinamis dalam satu layar',
      'Assign beberapa orang sekaligus untuk menu shareable (pembagian otomatis)',
      'Toggle PPN 11% dan Service Charge 5% yang dihitung proporsional per orang',
      'Ekspor ringkasan tagihan per orang siap kirim ke grup WhatsApp',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-kursus',
    sku: 'BM-WEB-08',
    title: 'KelasKilat · Interactive Cohort Bootcamp & Quiz LMS',
    slug: 'app-kursus',
    tagline: 'Platform Learning Management System dengan silabus modular, kuis interaktif, & progres kelulusan',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase Auth'],
    price: 1150000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-app-kursus.svg',
    preview_images: ['/products/thumb-app-kursus.svg'],
    demo_url: '/demo/app-kursus',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Aplikasi web kursus online dan bootcamp developer dengan antarmuka studio belajar yang bersih. Dilengkapi navigasi kurikulum bertahap, ringkasan materi kode, kuis evaluasi instan, serta pelacakan persentase penyelesaian.',
    problem:
      'Kreator kursus teknis sering terbebani biaya komisi tinggi platform LMS SaaS dan kurang leluasa menyesuaikan pengalaman belajar interaktif.',
    solution:
      'LMS mandiri siap deploy dengan sidebar modul, pemutar materi terstruktur, checkpoint kuis otomatis, dan pratinjau sertifikat kelulusan.',
    features: [
      'Navigasi silabus antar modul dengan indikator progres selesai (checklist)',
      'Pemutar materi dilengkapi ringkasan poin kunci & cuplikan arsitektur',
      'Checkpoint quiz interaktif dengan umpan balik jawaban benar/salah instan',
      'Generator pratinjau sertifikat kelulusan setelah seluruh modul tuntas',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-klinik',
    sku: 'BM-WEB-09',
    title: 'AntreMed · Clinic Live Queue & Doctor Slot Booking Portal',
    slug: 'app-klinik',
    tagline: 'Portal pendaftaran pasien & monitor antrean poli real-time tema Botanical Mint dengan tiket digital',
    category: 'E-COMMERCE',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'WhatsApp Ticket'],
    price: 800000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-app-klinik.svg',
    preview_images: ['/products/thumb-app-klinik.svg'],
    demo_url: '/demo/app-klinik',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Portal reservasi jadwal dokter dan pemantau antrean klinik pratama/gigi bernuansa Botanical Mint (#F0FDFA + Teal #0F766E). Pasien dapat memfilter poli, memilih jam praktik yang masih tersedia, dan mencetak nomor antrean digital.',
    problem:
      'Pasien menumpuk di ruang tunggu klinik karena tidak mengetahui nomor antrean aktif dan ketersediaan slot jam dokter.',
    solution:
      'Display antrean aktif real-time berdampingan dengan pemilih slot jam dokter sehingga pasien cukup datang mendekati estimasi waktu panggil.',
    features: [
      'Display nomor antrean berjalan real-time lengkap dengan ruang poli aktif',
      'Filter spesialisasi (Poli Umum, Poli Gigi, Poli Anak) dan daftar dokter',
      'Booking slot jam praktik langsung mengeluarkan nomor tiket antrean digital',
      'Tombol kirim bukti antrean ke WhatsApp pasien dalam satu klik',
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-kontrak',
    sku: 'BM-WEB-10',
    title: 'LegalDraft ID · Generator SPK, NDA & Invoice Termin Otomatis',
    slug: 'app-kontrak',
    tagline: 'Alat pembuat Surat Perjanjian Kerja (SPK) & rincian termin pembayaran proyek IT siap cetak PDF',
    category: 'SCRIPTS & BOTS',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Print CSS A4'],
    price: 650000,
    is_portfolio: false,
    thumbnail_url: '/products/thumb-app-kontrak.svg',
    preview_images: ['/products/thumb-app-kontrak.svg'],
    demo_url: '/demo/app-kontrak',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Aplikasi utilitas produktivitas untuk freelancer, studio software, dan agensi di Indonesia. Mengisi parameter klien, nilai kontrak, dan persentase termin akan langsung menyusun draf pasal hukum SPK beserta rincian nominal DP & pelunasan.',
    problem:
      'Developer freelance sering menunda atau mengabaikan kontrak kerja tertulis karena repot mengedit format dokumen Word dan menghitung ulang termin.',
    solution:
      'Editor split-pane live preview dengan template pasal SPK Bahasa Indonesia, kalkulasi otomatis nominal DP vs Termin Pelunasan, dan dukungan Print/Save PDF A4.',
    features: [
      'Pemilihan cepat jenis dokumen: SPK Pengembangan Software, NDA, & Maintenance',
      'Kalkulasi otomatis nominal DP dan Pelunasan dari nilai kontrak total',
      'Live preview dokumen formal berpasal siap tanda tangan kedua pihak',
      'Dukungan cetak langsung ke PDF (Print A4) atau salin teks kontrak',
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
    sku:
      raw.sku ||
      matched?.sku ||
      `BM-${String(raw.category || 'APP').slice(0, 3).toUpperCase()}`,
    title: raw.title || matched?.title || 'Untitled Product',
    slug: raw.slug || matched?.slug || raw.id,
    tagline: raw.tagline || matched?.tagline || raw.description || '',
    category: raw.category || matched?.category || 'SAAS WEB',
    tech_stack: techStack,
    price: Number(raw.price) || 0,
    is_portfolio: Boolean(raw.is_portfolio),
    thumbnail_url:
      raw.thumbnail_url || matched?.thumbnail_url || '/products/thumb-pos-kuro.svg',
    preview_images:
      previewImages.length > 0
        ? previewImages
        : [raw.thumbnail_url || '/products/thumb-pos-kuro.svg'],
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
