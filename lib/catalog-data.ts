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

export interface ProductPageSpec {
  pageNumber: 1 | 2 | 3;
  label: string;
  title: string;
  summary: string;
}

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
  pages?: ProductPageSpec[];
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
      ? 'Full Source Code (Arsitektur 3 Halaman) + Turnkey Deploy & Domain Setup'
      : 'Full Source Code (Arsitektur 3 Halaman) + Database Schema';

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
  // 5 FULL 3-PAGE POS & STOREFRONT WEBSITES
  {
    id: 'pos-kuro',
    sku: 'BM-POS-01',
    title: 'KuroBento · Izakaya Storefront, Shokuken POS & Kitchen KDS',
    slug: 'pos-kuro',
    tagline:
      'Sistem operasional ramen bar & izakaya terpadu: etalase E-Menu visual, register kasir Shokuken per booth, dan monitor Kitchen Display System real-time.',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Touch POS UI'],
    price: 950000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-kuro.png',
    preview_images: ['/products/shot-pos-kuro.png'],
    demo_url: '/demo/pos-kuro',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Platform web operasional untuk restoran ramen dan izakaya modern yang menyatukan tiga alur layanan dalam satu state sinkron. Halaman pertama menyajikan katalog visual hidangan dengan rincian kaldu, profil bahan, dan pratinjau komposisi mangkok. Halaman kedua berfungsi sebagai terminal kasir sentuh bergaya Shokuken dengan pemetaan booth meja dan kustomisasi tekstur mie. Halaman ketiga menampilkan antrean tiket masak dapur (KDS) beserta pemantauan porsi bahan baku.',
    problem:
      'Operasional restoran Jepang kerap terfragmentasi antara buku menu statis, mesin kasir yang lambat menangani kustomisasi mie/kuah, serta komunikasi tiket dapur yang rawan selisih.',
    solution:
      'Arsitektur web tiga halaman yang menghubungkan pilihan menu pelanggan langsung ke keranjang meja kasir dan meneruskan instruksi masak presisi ke layar koki tanpa jeda.',
    features: [
      'Halaman 1 (Izakaya E-Menu Storefront): Katalog visual ramen & yakitori dengan modal anatomi kaldu 18 jam, rincian topping, informasi alergen, dan aksi kirim ke meja',
      'Halaman 2 (Shokuken Touch Register): Denah 8 booth meja, matriks modifier tekstur mie (Katame, Futsu, Yawame), takaran tare/garlic oil, dan struk kertas Jepang',
      'Halaman 3 (Live Kitchen KDS & Stock): Papan antrean masak per tiket (Cooking, Plating, Ready) dengan pelacakan stok liter kaldu dan porsi chashu harian',
      'Sinkronisasi state lintas halaman: pesanan yang dirakit dari etalase menu langsung terisi di terminal POS dan diteruskan ke monitor dapur',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Storefront',
        title: 'E-Menu Visual & Anatomi Komposisi Ramen',
        summary:
          'Etalase hidangan izakaya dengan fotografi menu, filter kategori, modal komposisi kuah, dan pemilihan langsung ke nomor booth.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Kasir POS',
        title: 'Terminal Shokuken & Kustomisasi Tekstur Mie',
        summary:
          'Register kasir sentuh untuk booth 01-08 dengan pengatur kematangan mie, tambahan topping, kalkulasi pajak layanan, dan cetak struk.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Dapur KDS',
        title: 'Kitchen Display System & Kontrol Bahan Baku',
        summary:
          'Layar monitor dapur untuk memperbarui tahapan masak tiap meja sekaligus memantau sisa porsi kaldu, mie segar, dan chashu.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-brew',
    sku: 'BM-POS-02',
    title: 'BrewLab · Roastery Storefront, Speed-Bar POS & Pickup Board',
    slug: 'pos-brew',
    tagline:
      'Ekosistem web specialty coffee & micro-roastery: katalog minuman & biji single origin, kasir barista berkecepatan tinggi, serta papan antrean pickup.',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Roastery Commerce', 'Speed-Bar POS'],
    price: 850000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-brew.png',
    preview_images: ['/products/shot-pos-brew.png'],
    demo_url: '/demo/pos-brew',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Aplikasi web terpadu untuk kedai kopi spesialti dan micro-roastery dengan palet visual hangat dan tipografi bersih. Halaman pertama menampilkan etalase minuman espresso, manual brew V60, artisan pastry, dan kemasan biji kopi 250g lengkap dengan catatan sangrai serta parameter ekstraksi. Halaman kedua adalah terminal Speed-Bar POS untuk barista meracik modifier susu, es, dan shot dalam hitungan detik. Halaman ketiga menyediakan layar panggilan cup pelanggan dan ringkasan penjualan harian.',
    problem:
      'Kedai kopi dengan antrean padat membutuhkan kasir yang sangat responsif terhadap modifier minuman, sekaligus etalase digital untuk mengedukasi pelanggan mengenai profil biji kopi roastery.',
    solution:
      'Sistem web tiga halaman yang menggabungkan lookbook produk kopi & parameter seduh, register kasir sentuh ergonomis, serta layar status pesanan bar secara real-time.',
    features: [
      'Halaman 1 (Roastery Storefront & Tasting Notes): Katalog minuman signature dan biji Single Origin dengan modal indikator Acidity, Body, Sweetness, serta panduan rasio seduh',
      'Halaman 2 (Barista Speed-Bar Register): Antarmuka kasir 3-zona dengan modifier susu Oat/Soy/Dairy, kadar gula, extra shot espresso, dan label nama pada cup',
      'Halaman 3 (Bar Pickup Monitor & Daily Digest): Layar antrean status pesanan (In-Bar Brewing vs Ready for Pickup) disertai metrik omzet dan pemakaian gramasi kopi',
      'Alur transaksi mulus dari eksplorasi katalog biji/minuman ke antrean produksi barista dengan kalkulasi QRIS instan',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Kopi',
        title: 'Roastery Storefront & Profil Ekstraksi Single Origin',
        summary:
          'Galeri minuman kopi, pastry, dan kemasan biji sangrai dengan modal catatan rasa serta resep seduh V60/espresso.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Barista POS',
        title: 'Speed-Bar Touch Register & Cup Callout',
        summary:
          'Kasir sentuh cepat untuk memilih modifier susu, tingkat kemanisan, jumlah shot, nama pelanggan di cup, dan penyelesaian bayar.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Pickup & Laporan',
        title: 'Layar Panggilan Bar & Analitik Penjualan Harian',
        summary:
          'Monitor status minuman yang sedang diseduh maupun siap diambil pelanggan, lengkap dengan rekapitulasi transaksi harian.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-medika',
    sku: 'BM-POS-03',
    title: 'ApotekMedika · Clinical Pharmacy Storefront, FEFO POS & Batch Vault',
    slug: 'pos-medika',
    tagline:
      'Sistem informasi apotek & farmasi klinis: direktori monografi obat BPOM, terminal kasir dispensing FEFO dengan generator etiket, dan audit batch kadaluarsa.',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Clinical POS'],
    price: 1250000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-medika.png',
    preview_images: ['/products/shot-pos-medika.png'],
    demo_url: '/demo/pos-medika',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Platform web operasional apotek modern dan klinik farmasi yang dirancang dengan presisi informasi medis. Halaman pertama menyajikan katalog obat, suplemen, dan alat kesehatan dengan modal monografi lengkap (komposisi zat aktif, indikasi, kontraindikasi, dosis, nomor izin edar BPOM, dan klasifikasi golongan). Halaman kedua adalah terminal kasir SIMRS yang mengurutkan stok secara First-Expired-First-Out (FEFO) serta mencetak stiker etiket aturan pakai. Halaman ketiga memfasilitasi pengawasan tanggal kadaluarsa per nomor batch dan buku defekta.',
    problem:
      'Apotek memerlukan sistem yang tidak hanya akurat dalam pencatatan harga dan tuslah resep, tetapi juga disiplin dalam mengeluarkan stok batch yang lebih cepat kadaluarsa (FEFO) serta mencetak etiket dosis yang jelas.',
    solution:
      'Arsitektur farmasi tiga halaman yang menyatukan referensi monografi produk kesehatan, meja kasir penebusan resep berfitur etiket otomatis, dan radar pengawasan inventaris batch.',
    features: [
      'Halaman 1 (Clinical Catalog & Drug Monograph): Katalog sediaan farmasi dengan penanda golongan obat, harga eceran tertinggi (HET), dan modal detail farmakologi',
      'Halaman 2 (FEFO Dispensing POS & Etiket): Register kasir resep & non-resep dengan alokasi batch terdekat otomatis, biaya jasa racik apoteker, dan pratinjau stiker etiket obat',
      'Halaman 3 (Batch Expiry Vault & Defekta): Dashboard audit nomor batch, indikator peringatan mendekati kadaluarsa, serta daftar prioritas pemesanan ulang (defekta)',
      'Integrasi penuh dari pencarian obat di katalog klinis langsung menuju keranjang dispensing dan pengurangan stok batch terkait',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Obat',
        title: 'Direktori Sediaan Farmasi, Alkes & Monografi BPOM',
        summary:
          'Etalase obat dan alat kesehatan dengan filter golongan medis serta modal rincian zat aktif, dosis anjuran, dan nomor registrasi.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Kasir FEFO',
        title: 'Terminal Dispensing Resep & Generator Etiket Dosis',
        summary:
          'Kasir farmasi dengan pengurutan batch kadaluarsa terdekat, kalkulasi tuslah/embalase racikan, dan pencetakan label aturan minum.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Gudang Batch',
        title: 'Kontrol Kadaluarsa Batch & Buku Defekta Apotek',
        summary:
          'Manajemen inventaris gudang farmasi untuk memantau masa berlaku tiap lot produksi dan menyusun daftar restock distributor.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-atelier',
    sku: 'BM-POS-04',
    title: 'AtelierLuxe · Editorial Lookbook, Clienteling POS & Boutique CRM',
    slug: 'pos-atelier',
    tagline:
      'Platform flagship retail & butik fashion: lookbook koleksi dengan spesifikasi material, terminal kasir VIP clienteling, dan matriks stok lintas butik.',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Luxury Retail UI', 'Multi-Store CRM'],
    price: 1100000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-atelier.png',
    preview_images: ['/products/shot-pos-atelier.png'],
    demo_url: '/demo/pos-atelier',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Sistem web retail untuk rumah mode, label pakaian independen, dan butik barang kulit dengan pendekatan visual editorial. Halaman pertama menampilkan lookbook musiman berformat galeri, lengkap dengan modal spesifikasi konstruksi bahan, instruksi perawatan, dan matriks ukuran. Halaman kedua adalah terminal Clienteling POS yang mendukung pemilihan ukuran per artikel, kalkulasi privilese member VIP, dan opsi kemasan eksklusif. Halaman ketiga memuat direktori klien pribadi (Private Client Book) serta ketersediaan ukuran di berbagai lokasi cabang.',
    problem:
      'Butik fashion kelas atas membutuhkan antarmuka kasir dan katalog yang selaras dengan estetika brand di ruang pamer, sekaligus mampu melacak ukuran produk antar cabang dan histori belanja klien VIP.',
    solution:
      'Pengalaman web tiga halaman yang menggabungkan galeri lookbook beresolusi tinggi, terminal transaksi clienteling yang elegan, dan sistem CRM inventaris multi-butik.',
    features: [
      'Halaman 1 (Seasonal Lookbook & Material Spec): Galeri koleksi pakaian, tas kulit, dan alas kaki dengan modal komposisi kain, detail pengerjaan, dan panduan ukuran (cm/EU)',
      'Halaman 2 (Boutique Clienteling Register): Kasir butik dengan pemilih ukuran per SKU, diskon otomatis berdasarkan tier keanggotaan (Silver, Gold, Black), dan catatan gift wrapping',
      'Halaman 3 (Private Client Dossier & Stock Matrix): Buku profil kolektor/pelanggan prioritas beserta tabel ketersediaan stok real-time di cabang Senayan, Plaza Indonesia, dan Seminyak',
      'Tipografi editorial dan tata letak bersih yang dirancang untuk penggunaan di tablet pramuniaga maupun layar kasir flagship store',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Lookbook',
        title: 'Editorial Collection & Spesifikasi Material Garment',
        summary:
          'Galeri koleksi fashion dan leather goods dengan fotografi produk, rincian tekstil, tabel ukuran presisi, dan status ketersediaan.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Boutique POS',
        title: 'Clienteling Register & Privilese Member VIP',
        summary:
          'Terminal kasir butik untuk memilih ukuran artikel, menerapkan diskon tier klien prioritas, dan mencetak tanda terima pembelian.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · VIP & Cabang',
        title: 'Private Client Book & Matriks Stok Lintas Butik',
        summary:
          'Direktori preferensi pelanggan VIP dan pemantauan alokasi ukuran di seluruh jaringan toko fisik.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-bengkel',
    sku: 'BM-POS-05',
    title: 'PitStop Pro · OEM Parts Storefront, Work-Order POS & Bay Tracker',
    slug: 'pos-bengkel',
    tagline:
      'Sistem manajemen bengkel modern & suku cadang: katalog komponen OEM dengan matriks kecocokan sasis, kasir PKB 4-bay, dan pelacak pengerjaan kendaraan.',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Workshop ERP'],
    price: 1350000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-bengkel.png',
    preview_images: ['/products/shot-pos-bengkel.png'],
    demo_url: '/demo/pos-bengkel',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Platform web operasional untuk bengkel perawatan mobil modern dan distributor suku cadang resmi. Halaman pertama menampilkan etalase komponen OEM (oli sintetik, sistem pengereman keramik, filter udara, busi iridium) dan paket servis berkala dengan modal kompatibilitas tipe sasis/mesin. Halaman kedua merupakan terminal Perintah Kerja Bengkel (PKB) yang mengelola 4 stall hydraulic lift aktif serta memisahkan rincian biaya jasa mekanik dari harga komponen. Halaman ketiga adalah layar pelacakan progres servis berbasis pelat nomor untuk ruang tunggu pelanggan.',
    problem:
      'Pemilik kendaraan membutuhkan transparansi nomor part OEM, estimasi biaya servis di muka, dan kepastian waktu pengerjaan tanpa harus bolak-balik bertanya ke service advisor.',
    solution:
      'Website operasional tiga halaman yang mengintegrasikan katalog suku cadang terverifikasi, register kasir Work-Order (PKB) per stall lift, dan telemetri progres servis kendaraan.',
    features: [
      'Halaman 1 (OEM Parts & Service Catalog): Kartu produk suku cadang dan paket tune-up dengan kode part pabrikan, spesifikasi teknis, dan modal daftar mobil yang kompatibel',
      'Halaman 2 (PKB Work-Order & 4-Bay Register): Manajemen 4 bay lift aktif, penggabungan item suku cadang dan tarif jasa teknisi, serta penerbitan lembar Perintah Kerja Bengkel',
      'Halaman 3 (Live Vehicle Bay Tracker): Pemantauan 5 tahap pengerjaan mobil (Inspeksi Awal, Lift Up, Penggantian Part, Final QC, Siap Serah Terima) beserta catatan riwayat kilometer',
      'Alur kerja terhubung: komponen yang dipilih dari katalog langsung masuk ke dokumen PKB kendaraan yang sedang ditangani di bay aktif',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Part',
        title: 'Etalase Suku Cadang OEM & Paket Servis Berkala',
        summary:
          'Katalog komponen otomotif dengan foto produk, nomor seri pabrikan, daftar kompatibilitas kendaraan, dan estimasi durasi pasang.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Kasir PKB',
        title: 'Work-Order Register & Kontrol 4-Bay Lift',
        summary:
          'Terminal service advisor untuk mengelola antrean bay bengkel, menghitung rincian suku cadang plus jasa kerja, dan mencetak PKB.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Lacak Servis',
        title: 'Live Bay Progress Tracker & Riwayat Kilometer',
        summary:
          'Portal pemantau tahapan pengerjaan mobil berdasarkan pelat nomor kendaraan lengkap dengan informasi garansi servis.',
      },
    ],
    status: 'ACTIVE',
  },

  // 5 FULL 3-PAGE WEB / SAAS APPLICATIONS
  {
    id: 'app-pulseops',
    sku: 'BM-WEB-06',
    title: 'PulseOps · Public Status Page, NOC Telemetry & Incident Response',
    slug: 'app-pulseops',
    tagline:
      'Platform observabilitas infrastruktur & komunikasi reliabilitas: portal status publik SLA 30-hari, konsol telemetri RTT real-time, dan manajemen postmortem insiden.',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'SVG Telemetry', 'DevOps SaaS'],
    price: 900000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-pulseops.png',
    preview_images: ['/products/shot-app-pulseops.png'],
    demo_url: '/demo/app-pulseops',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Aplikasi web SaaS untuk pemantauan ketersediaan layanan (uptime) dan manajemen komunikasi insiden teknis. Halaman pertama berfungsi sebagai Public Status Page yang bersih bagi pelanggan untuk memeriksa kesehatan klaster API, database, payment gateway, dan CDN beserta histori SLA 30 hari. Halaman kedua adalah konsol Network Operations Center (NOC) internal dengan kurva latensi RTT berbasis SVG dan simulator health-check probe. Halaman ketiga menyediakan ruang penulisan postmortem insiden dan pengaturan routing notifikasi webhook.',
    problem:
      'Tim engineering memerlukan halaman status publik yang membangun kepercayaan klien saat terjadi gangguan, sekaligus dashboard diagnostik internal untuk memverifikasi latensi endpoint secara cepat.',
    solution:
      'Arsitektur SaaS tiga halaman yang memadukan portal status berdesain tenang di sisi publik dengan konsol telemetri presisi dan buku log insiden di sisi operasional.',
    features: [
      'Halaman 1 (Customer-Facing Status Portal): Indikator kesehatan layanan per region, bar ketersediaan 30 hari, persentase SLA, dan modal arsitektur teknis tiap node',
      'Halaman 2 (NOC Latency & Probe Console): Visualisasi gelombang RTT (ms), pemantauan status HTTP 200/503, dan pemicu eksekusi health check interaktif',
      'Halaman 3 (Incident Timeline & Alert Routing): Publikasi kronologi insiden (Investigating, Identified, Monitoring, Resolved) serta manajemen kanal webhook Slack/Telegram/Email',
      'Desain kontras tinggi dengan hierarki tipografi monospasi yang memudahkan pembacaan metrik di ruang kendali maupun perangkat mobile',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Status Publik',
        title: 'Public Uptime Portal & Inspeksi Klaster Regional',
        summary:
          'Halaman status operasional untuk pelanggan dengan histori uptime 30 hari, metrik SLA, dan modal spesifikasi infrastruktur node.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Konsol NOC',
        title: 'Real-Time RTT Telemetry & HTTP Probe Runner',
        summary:
          'Ruang kendali teknis untuk menjalankan uji ping endpoint, menganalisis grafik latensi milidetik, dan menyaring log respons.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Insiden & Alert',
        title: 'Incident Postmortem Ledger & Konfigurasi Webhook',
        summary:
          'Manajemen laporan gangguan berurutan waktu beserta pengaturan distribusi peringatan ke kanal komunikasi tim.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-splitbill',
    sku: 'BM-WEB-07',
    title: 'BagiRata · Dining Preset Catalog, Receipt Splitter & QRIS Settlement',
    slug: 'app-splitbill',
    tagline:
      'Aplikasi web pembagi tagihan kuliner: galeri paket menu restoran populer, studio alokasi struk dengan kalkulasi pajak proporsional, dan kartu pelunasan QRIS.',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'WhatsApp Share', 'Consumer FinTech'],
    price: 550000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-splitbill.png',
    preview_images: ['/products/shot-app-splitbill.png'],
    demo_url: '/demo/app-splitbill',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Aplikasi web consumer fintech untuk menghitung pembagian tagihan makan bersama secara transparan dan bebas selisih. Halaman pertama menyajikan katalog preset paket restoran populer (Izakaya Dinner, Specialty Coffee Hangout, Korean BBQ, Artisan Pizzeria) lengkap dengan foto hidangan untuk simulasi instan. Halaman kedua adalah studio interaktif tempat pengguna menandai pemesan tiap item pada struk dan menghitung PPN 11% serta biaya layanan secara proporsional. Halaman ketiga menghasilkan kartu tagihan per peserta lengkap dengan pelacak status lunas dan format pesan WhatsApp siap kirim.',
    problem:
      'Membagi tagihan restoran yang memiliki pajak dan service charge berlapis secara manual sering memakan waktu, memicu salah hitung, dan menyulitkan pelacakan siapa yang sudah mentransfer.',
    solution:
      'Alur aplikasi tiga halaman yang mengotomatiskan pemuatan item menu, pembagian pajak proporsional per individu, hingga rekapitulasi pelunasan via QRIS dan WhatsApp.',
    features: [
      'Halaman 1 (Dining Preset & Dish Catalog): Galeri template struk tempat makan populer dan daftar menu tambahan dengan foto visual serta informasi porsi berbagi',
      'Halaman 2 (Interactive Receipt Studio): Editor struk taktil dengan chip penanda peserta berwarna, penambahan item kustom, dan distribusi otomatis PPN 11% + Service 5%',
      'Halaman 3 (QRIS Settlement & Payment Tracker): Kartu rincian nominal per peserta, toggle status Lunas/Belum Bayar, informasi rekening/QRIS, dan salin ringkasan tagihan ke WhatsApp',
      'Antarmuka bersih dan ramah seluler yang dirancang untuk digunakan langsung di meja makan bersama teman atau rekan kerja',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Galeri Menu',
        title: 'Katalog Preset Restoran & Pilihan Hidangan Komunal',
        summary:
          'Etalase paket menu tempat makan populer yang dapat langsung dimuat ke ruang hitung maupun ditambah item satuannya.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Studio Struk',
        title: 'Interactive Receipt Splitter & Kalkulator Pajak Proporsional',
        summary:
          'Meja hitung struk untuk menandai porsi tiap teman, menambah anggota baru, dan membagi pajak/servis secara akurat.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Tagihan & QRIS',
        title: 'Kartu Settlement Peserta & Generator Pesan WhatsApp',
        summary:
          'Papan pemantau status pembayaran tiap peserta lengkap dengan detail tujuan transfer QRIS dan tombol salin rekap grup.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-kursus',
    sku: 'BM-WEB-08',
    title: 'KelasKilat · Engineering Bootcamp Storefront, Code Classroom & Credential Vault',
    slug: 'app-kursus',
    tagline:
      'Platform Learning Management System (LMS) mandiri: katalog silabus rekayasa perangkat lunak, studio belajar split-pane interaktif, dan penerbitan sertifikat terverifikasi.',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'EdTech LMS', 'Code Workbook'],
    price: 1150000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-kursus.png',
    preview_images: ['/products/shot-app-kursus.png'],
    demo_url: '/demo/app-kursus',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Platform web edukasi teknologi dan akademi koding independen yang merangkum seluruh perjalanan siswa dalam tiga halaman terstruktur. Halaman pertama menampilkan storefront program bootcamp (Next.js App Router Security, Production RAG Engineering, High-Concurrency PostgreSQL, Flutter Clean Architecture) dengan modal silabus per bab dan profil instruktur. Halaman kedua adalah ruang belajar split-pane yang menyandingkan materi arsitektur, blok kode produksi, dan evaluasi kuis interaktif. Halaman ketiga menampilkan transkrip capaian modul serta generator sertifikat kelulusan bernomor seri.',
    problem:
      'Kreator edukasi teknis dan penyelenggara bootcamp membutuhkan platform mandiri yang menyatukan halaman penjualan kurikulum, ruang baca kode yang nyaman, serta sistem sertifikasi tanpa potongan komisi marketplace pihak ketiga.',
    solution:
      'Arsitektur LMS tiga halaman yang menggabungkan etalase kurikulum berkonversi tinggi, ruang belajar interaktif bebas distraksi, dan halaman kredensial kelulusan resmi.',
    features: [
      'Halaman 1 (Curriculum Storefront & Syllabus Preview): Katalog jalur belajar engineering dengan indikator level, estimasi jam belajar, proyek capstone, dan modal rincian kurikulum',
      'Halaman 2 (Split-Pane Code Classroom): Ruang baca modul teknis berdampingan dengan implementasi kode bernomor baris serta checkpoint ujian pemahaman berumpan balik langsung',
      'Halaman 3 (Academic Transcript & Certificate Studio): Rekapitulasi skor penyelesaian modul, kustomisasi nama lulusan, dan pratinjau sertifikat digital siap cetak',
      'Tata letak editorial bersih yang mengutamakan keterbacaan dokumentasi teknis dan cuplikan kode sumber',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Kelas',
        title: 'Bootcamp Storefront & Pratinjau Silabus Engineering',
        summary:
          'Etalase program kursus perangkat lunak dengan filter spesialisasi, modal daftar modul lengkap, dan pintasan masuk kelas.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Ruang Belajar',
        title: 'Split-Pane Technical Workbook & Evaluasi Arsitektur',
        summary:
          'Lingkungan belajar interaktif yang memadukan penjelasan konsep, referensi kode produksi, dan kuis validasi materi.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Sertifikat',
        title: 'Transkrip Kompetensi & Generator Sertifikat Digital',
        summary:
          'Halaman rekap nilai per modul dan penerbitan sertifikat kelulusan resmi lengkap dengan kode verifikasi unik.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-klinik',
    sku: 'BM-WEB-09',
    title: 'AntreMed · Outpatient Clinic Portal, Slot Booking & Polyclinic TV Board',
    slug: 'app-klinik',
    tagline:
      'Portal digital klinik pratama & poliklinik spesialis: direktori layanan medis & jadwal dokter, reservasi slot tiket ber-QR, serta layar panggil ruang tunggu.',
    category: 'E-COMMERCE',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'HealthTech UI', 'Queue Display'],
    price: 800000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-klinik.png',
    preview_images: ['/products/shot-app-klinik.png'],
    demo_url: '/demo/app-klinik',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Sistem web pelayanan pasien rawat jalan dan reservasi poliklinik dengan estetika medis yang tenang dan informatif. Halaman pertama menyajikan katalog paket Medical Check-Up (MCU), layanan poli gigi, anak, dan penyakit dalam beserta profil dokter spesialis, rincian tahapan tindakan, serta tarif transparan. Halaman kedua adalah modul pendaftaran mandiri untuk memilih slot jam praktik dan menerbitkan tiket antrean digital ber-QR. Halaman ketiga merupakan tampilan layar TV ruang tunggu yang menampilkan nomor panggilan aktif per ruang poliklinik.',
    problem:
      'Pasien sering kesulitan mengetahui rincian biaya pemeriksaan dan jadwal praktik dokter sebelum datang ke klinik, sementara ruang tunggu fisik kerap padat akibat belum adanya sistem tiket terjadwal.',
    solution:
      'Portal kesehatan tiga halaman yang menyelaraskan informasi paket medis di rumah, pendaftaran slot kedatangan mandiri, dan papan panggil antrean poliklinik secara langsung.',
    features: [
      'Halaman 1 (Medical Services & Doctor Directory): Etalase paket pemeriksaan kesehatan dan profil tenaga medis lengkap dengan modal persiapan pasien serta transparansi biaya',
      'Halaman 2 (Appointment Slot & QR Ticket Kiosk): Formulir pemilihan poliklinik, ketersediaan jam praktik dokter, input identitas pasien, dan pencetakan slip antrean digital',
      'Halaman 3 (Polyclinic Waiting Room TV): Layar monitor bervisibilitas tinggi yang menampilkan nomor antrean aktif tiap poli beserta kontrol pemanggilan pasien berikutnya',
      'Penerusan konteks otomatis: layanan atau dokter yang dipilih di katalog halaman pertama langsung mengisi formulir reservasi di halaman kedua',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Layanan & Dokter',
        title: 'Katalog Paket MCU, Tindakan Poliklinik & Jadwal Dokter',
        summary:
          'Direktori layanan kesehatan klinik dengan rincian prosedur medis, profil dokter spesialis, dan informasi tarif resmi.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Booking Tiket',
        title: 'Reservasi Slot Jam Praktik & Penerbitan Tiket Antrean QR',
        summary:
          'Modul pendaftaran pasien untuk mengamankan jadwal konsultasi dan mengunduh slip nomor antrean poliklinik.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Monitor TV Poli',
        title: 'Layar Panggilan Antrean Poliklinik Ruang Tunggu',
        summary:
          'Tampilan monitor ruang tunggu klinik yang memuat nomor panggilan aktif per ruangan serta antrean berikutnya.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-kontrak',
    sku: 'BM-WEB-10',
    title: 'LegalDraft ID · IT Contract Library, Live A4 Drafting Studio & Escrow Ledger',
    slug: 'app-kontrak',
    tagline:
      'Platform dokumen hukum bisnis teknologi: katalog template perjanjian IT standar Indonesia, studio penyusunan kontrak A4 interaktif, dan brankas pelacak termin.',
    category: 'SCRIPTS & BOTS',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Print CSS A4', 'LegalTech App'],
    price: 650000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-kontrak.png',
    preview_images: ['/products/shot-app-kontrak.png'],
    demo_url: '/demo/app-kontrak',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Aplikasi web legal-tech yang dirancang khusus untuk software house, konsultan IT, dan studio desain digital di Indonesia. Halaman pertama menyajikan perpustakaan template perjanjian komersial (Surat Perintah Kerja Pengembangan Software, Mutual NDA, Kontrak Retainer Pemeliharaan Sistem, dan Perjanjian Lisensi HAKI Source Code) dengan modal pratinjau pasal krusial. Halaman kedua adalah studio penyusunan kontrak berformat split-pane yang menghitung nilai termin pembayaran secara otomatis di atas kanvas kertas A4 siap cetak. Halaman ketiga berfungsi sebagai brankas arsip dokumen klien dan pemantau status pencairan termin.',
    problem:
      'Agensi digital dan developer independen sering menyusun kontrak proyek secara manual dari file dokumen lama yang tidak seragam, rawan salah hitung persentase termin, dan sulit dilacak status penandatanganannya.',
    solution:
      'Sistem manajemen dokumen tiga halaman yang menggabungkan pustaka pasal hukum terstandar, generator naskah A4 real-time, dan buku besar pemantauan termin kontrak.',
    features: [
      'Halaman 1 (IT Legal Template Library): Katalog produk dokumen SPK, NDA, SLA Maintenance, dan Lisensi Kode Sumber dengan modal ringkasan klausul perlindungan hukum',
      'Halaman 2 (Split-Pane A4 Contract Studio): Editor variabel pihak pertama/kedua, ruang lingkup deliverable, kalkulator otomatis nominal DP/Termin, dan pratinjau lembar A4 siap cetak PDF',
      'Halaman 3 (Contract Vault & Milestone Ledger): Tabel direktori kontrak aktif, indikator status tanda tangan basah/digital, dan pemantauan jatuh tempo pembayaran termin',
      'Naskah yang dirampungkan di Studio Editor dapat langsung diarsipkan ke dalam tabel brankas di halaman ketiga dalam satu klik',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Dokumen',
        title: 'Pustaka Template SPK, NDA & Perjanjian Lisensi IT',
        summary:
          'Etalase dokumen hukum bisnis teknologi dengan pratinjau struktur pasal, cakupan perlindungan HAKI, dan rekomendasi penggunaan.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Studio Editor A4',
        title: 'Live A4 Contract Builder & Kalkulator Termin Proyek',
        summary:
          'Studio interaktif untuk mengisi parameter klien dan nilai proyek dengan pratinjau naskah kontrak Bahasa Indonesia secara langsung.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Arsip & Termin',
        title: 'Brankas Dokumen Klien & Pelacak Pencairan Termin',
        summary:
          'Manajemen arsip perjanjian yang telah diterbitkan, status tanda tangan para pihak, dan jadwal penagihan termin.',
      },
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
    title: matched?.title || raw.title || 'Untitled Product',
    slug: raw.slug || matched?.slug || raw.id,
    tagline: matched?.tagline || raw.tagline || raw.description || '',
    category: raw.category || matched?.category || 'SAAS WEB',
    tech_stack: matched?.tech_stack || techStack,
    price: Number(raw.price) || matched?.price || 0,
    is_portfolio: Boolean(raw.is_portfolio),
    thumbnail_url:
      matched?.thumbnail_url || raw.thumbnail_url || '/products/shot-pos-kuro.png',
    preview_images:
      matched?.preview_images && matched.preview_images.length > 0
        ? matched.preview_images
        : previewImages.length > 0
          ? previewImages
          : [raw.thumbnail_url || '/products/shot-pos-kuro.png'],
    demo_url: matched?.demo_url || raw.demo_url || '',
    github_url: raw.github_url || matched?.github_url || CONTACT_INFO.github,
    description: matched?.description || raw.description || '',
    problem:
      matched?.problem ||
      raw.problem ||
      'Bisnis membutuhkan fondasi aplikasi web multi-halaman yang teruji agar tidak membuang waktu membangun arsitektur dasar dari nol.',
    solution:
      matched?.solution ||
      raw.solution ||
      'Arsitektur web tiga halaman siap pakai yang mencakup etalase produk, ruang kerja operasional utama, dan halaman manajemen backoffice.',
    features:
      matched?.features ||
      (Array.isArray(raw.features) && raw.features.length > 0
        ? raw.features
        : [
            'Arsitektur web 3 halaman terpadu (Storefront Katalog, Aplikasi Utama, dan Backoffice)',
            'Skema database PostgreSQL/SQLite dan konfigurasi environment variable siap deploy',
            'Antarmuka responsif untuk layar kasir desktop, tablet, maupun perangkat mobile',
          ]),
    pages: matched?.pages || [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Storefront',
        title: 'Katalog & Pratinjau Spesifikasi Produk',
        summary:
          'Halaman depan dengan daftar produk visual, penyaring kategori, dan modal spesifikasi mendalam.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Aplikasi Utama',
        title: 'Terminal Operasional & Workspace Interaktif',
        summary:
          'Ruang kerja utama aplikasi untuk transaksi kasir, kalkulasi data, atau penyusunan dokumen.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Manajemen',
        title: 'Monitor Antrean, Inventaris & Laporan',
        summary:
          'Halaman kontrol backoffice untuk memantau status pesanan, stok, serta ringkasan metrik harian.',
      },
    ],
    status: raw.status || 'ACTIVE',
    created_at: raw.created_at,
  };
}
