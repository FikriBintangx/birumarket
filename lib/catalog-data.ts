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
      ? 'Full Source Code (3 Halaman Utuh) + Turnkey Deploy & Domain Setup'
      : 'Full Source Code (3 Halaman Utuh) + Database Schema';

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
    title: 'KuroBento · Website E-Menu Ramen, Shokuken POS & Dapur KDS (3 Halaman)',
    slug: 'pos-kuro',
    tagline: 'Website restoran Jepang 3 halaman utuh: Katalog & Preview Menu Ramen, Terminal Kasir Shokuken, serta Monitor Dapur KDS',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', '3-Page Full Web'],
    price: 950000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-kuro.png',
    preview_images: ['/products/shot-pos-kuro.png'],
    demo_url: '/demo/pos-kuro',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website operasional restoran Jepang 3 halaman lengkap. Halaman 1 menampilkan E-Menu storefront visual dengan foto mangkok ramen, komposisi kaldu, dan modal preview detail menu. Halaman 2 adalah terminal kasir Shokuken dengan kustomisasi tekstur mie & struk kertas Jepang. Halaman 3 adalah monitor Kitchen Display System (KDS) real-time dan kontrol stok bahan dapur.',
    problem:
      'Restoran ramen membutuhkan website terpadu yang menggabungkan katalog visual untuk pelanggan melihat detail komposisi menu, mesin kasir cepat per meja, dan layar antrean masak untuk koki.',
    solution:
      'Arsitektur web 3 halaman terhubung: pelanggan atau staf dapat melakukan preview produk di Katalog E-Menu, meneruskan pesanan ke Booth POS, lalu memantau tiket masak di layar KDS.',
    features: [
      'Halaman 1 (Storefront & Preview Produk): Katalog foto ramen & yakitori dengan modal anatomi komposisi kaldu, topping, kalori, dan tombol pesan langsung',
      'Halaman 2 (Terminal Kasir Shokuken): Peta 8 booth meja, kustomisasi tekstur mie (Katame/Futsu/Yawame), dan struk perforasi berstempel Hanko',
      'Halaman 3 (Monitor KDS & Gudang Dapur): Antrean tiket masak real-time (Cooking, Plating, Ready) serta pantauan liter kaldu & porsi chashu',
      'State sinkron lintas halaman: item yang dipilih dari Katalog Produk otomatis masuk ke struk POS dan diteruskan ke KDS Dapur',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Storefront',
        title: 'E-Menu Visual & Preview Komposisi Ramen',
        summary: 'Etalase menu restoran dengan foto hidangan, filter kategori, modal detail komposisi kuah 18 jam, dan tombol pilih ke meja.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Kasir POS',
        title: 'Terminal Shokuken & Struk Kertas Jepang',
        summary: 'Mesin kasir booth 01-08 dengan pengatur tingkat kematangan mie, takaran garlic oil, pajak layanan, dan cetak slip.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Dapur KDS',
        title: 'Kitchen Display System & Stok Bahan Baku',
        summary: 'Layar monitor dapur untuk memajukan status masak tiap meja serta melacak sisa stok kaldu, mie, dan chashu.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-brew',
    sku: 'BM-POS-02',
    title: 'BrewLab · Website Roastery Storefront, Barista POS & Pickup Board (3 Halaman)',
    slug: 'pos-brew',
    tagline: 'Website specialty coffee shop 3 halaman utuh: Katalog Minuman & Biji Kopi, Kasir Barista, serta Layar Pickup & Laporan',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Roastery Storefront', '3-Page Full Web'],
    price: 850000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-brew.png',
    preview_images: ['/products/shot-pos-brew.png'],
    demo_url: '/demo/pos-brew',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website coffee shop & micro-roastery 3 halaman bernuansa Warm Oat & Espresso. Halaman 1 menyajikan etalase visual minuman signature, manual brew V60, pastry, dan kemasan biji kopi Single Origin lengkap dengan preview profil sangrai & resep seduh. Halaman 2 adalah Speed-Bar POS barista dengan matriks modifier susu/gula/shot. Halaman 3 memuat layar antrean pickup pelanggan dan laporan penjualan harian.',
    problem:
      'Kedai kopi modern memerlukan etalase digital untuk memamerkan koleksi minuman dan biji kopi roastery sekaligus kasir cepat yang terhubung ke layar panggilan nama cup pelanggan.',
    solution:
      'Website 3 halaman terintegrasi mulai dari katalog preview produk kopi, register kasir barista dengan modifier instan, hingga layar antrean Bar Pickup.',
    features: [
      'Halaman 1 (Roastery Storefront & Preview): Katalog visual minuman & biji kopi 250g dengan modal profil rasa (Acidity, Body, Sweetness) dan parameter ekstraksi',
      'Halaman 2 (Barista Speed-Bar POS): Register kasir sentuh dengan pilihan susu Oat/Soy/Dairy, kadar gula, shot espresso, dan input nama di cup',
      'Halaman 3 (Layar Pickup & Analitik): Papan status pesanan (Sedang Diseduh vs Siap Diambil di Bar) beserta ringkasan omzet & konsumsi gramasi kopi',
      'Navigasi website utuh lengkap dengan header roastery, indikator keranjang aktif, dan footer jam operasional kedai',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Kopi',
        title: 'Storefront Minuman, Pastry & Single Origin Beans',
        summary: 'Galeri produk kopi dan kemasan house blend dengan modal resep ekstraksi espresso/V60 serta tasting notes.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Barista POS',
        title: 'Speed-Bar Touch Register & Cup Callout',
        summary: 'Kasir cepat untuk mengatur modifier susu, gula, es, extra shot, nama gelas, dan pembayaran QRIS.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Pickup & Laporan',
        title: 'Layar Antrean Barista & Rekap Penjualan Harian',
        summary: 'Monitor panggilan cup pelanggan yang sudah selesai diseduh serta statistik penjualan harian per kategori.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-medika',
    sku: 'BM-POS-03',
    title: 'ApotekMedika · Website Katalog Obat, Kasir SIMRS FEFO & Gudang Batch (3 Halaman)',
    slug: 'pos-medika',
    tagline: 'Website apotek & telefarmasi 3 halaman utuh: Katalog Obat/Alkes, Kasir Dispensing FEFO + Etiket, serta Kontrol Batch Expired',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', '3-Page Full Web'],
    price: 1250000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-medika.png',
    preview_images: ['/products/shot-pos-medika.png'],
    demo_url: '/demo/pos-medika',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website sistem informasi apotek dan klinik farmasi 3 halaman lengkap. Halaman 1 menampilkan katalog visual obat, vitamin, dan alat kesehatan beserta modal monografi obat (indikasi, zat aktif, dosis, nomor BPOM, & golongan obat). Halaman 2 adalah terminal kasir SIMRS FEFO dengan generator stiker Etiket Obat biru/putih. Halaman 3 adalah dashboard inventaris batch kadaluarsa dan buku defekta.',
    problem:
      'Apotek membutuhkan katalog produk kesehatan yang informatif bagi pasien/asisten apoteker sekaligus sistem kasir yang menjamin pengeluaran stok mengikuti aturan First-Expired-First-Out (FEFO).',
    solution:
      'Website farmasi 3 halaman dengan preview detail monografi tiap produk obat, kasir resep berfitur cetak etiket dosis, dan pengawasan stok per nomor batch.',
    features: [
      'Halaman 1 (Katalog Obat & Alkes): Kartu produk visual dengan penanda golongan (Obat Keras/Bebas/Alkes), harga HET, dan modal detail indikasi & dosis',
      'Halaman 2 (Kasir SIMRS & Etiket Obat): Tabel dispensing FEFO, toggle jasa racik apoteker, dan pratinjau stiker Etiket Obat standar Indonesia',
      'Halaman 3 (Gudang Batch & Buku Defekta): Pelacakan tanggal kadaluarsa per batch, peringatan stok menipis, dan log penyerahan resep harian',
      'Alur terintegrasi dari pemilihan produk di katalog langsung masuk ke daftar penebusan resep di kasir',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Obat',
        title: 'Etalase Obat, Suplemen & Alat Kesehatan',
        summary: 'Katalog visual sediaan farmasi dengan filter golongan obat serta modal informasi zat aktif, dosis, dan nomor izin edar BPOM.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Kasir FEFO',
        title: 'Terminal Dispensing Resep & Generator Etiket',
        summary: 'Kasir apotek berdensitas tinggi dengan prioritas batch kadaluarsa terdekat dan pencetak label aturan minum.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Gudang Batch',
        title: 'Monitor Kadaluarsa Batch & Buku Defekta',
        summary: 'Halaman audit stok gudang farmasi, status keaktifan batch, daftar restock prioritas, dan arsip resep.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-atelier',
    sku: 'BM-POS-04',
    title: 'AtelierLuxe · Website Fashion Lookbook, VIP Boutique POS & Client CRM (3 Halaman)',
    slug: 'pos-atelier',
    tagline: 'Website butik fashion & footwear 3 halaman utuh: Lookbook Koleksi & Preview Material, Kasir VIP, serta CRM Stok Antar Cabang',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Luxury Storefront', '3-Page Full Web'],
    price: 1100000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-atelier.png',
    preview_images: ['/products/shot-pos-atelier.png'],
    demo_url: '/demo/pos-atelier',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website e-commerce dan flagship boutique 3 halaman bertema Editorial Monochrome & Champagne Gold. Halaman 1 menyajikan Lookbook koleksi pakaian, tas kulit, dan sepatu dengan foto produk, panduan ukuran (Size Matrix), serta modal detail material. Halaman 2 adalah terminal Clienteling POS dengan kalkulasi privilege member VIP. Halaman 3 memuat buku database klien VIP dan matriks ketersediaan stok lintas butik.',
    problem:
      'Brand fashion premium membutuhkan pengalaman website lookbook yang berkelas untuk menampilkan detail potongan produk, bukan sekadar layar kasir tabel biasa.',
    solution:
      'Website butik 3 halaman yang memadukan galeri produk editorial dengan preview ukuran/material, kasir VIP clienteling, serta manajemen stok cabang.',
    features: [
      'Halaman 1 (Editorial Lookbook & Preview Produk): Galeri koleksi AW26 dengan foto visual, spesifikasi bahan (Cashmere, Box Calfskin, Silk), dan panduan ukuran',
      'Halaman 2 (Boutique Clienteling POS): Pemilihan ukuran S/M/L/EU, diskon tier VIP (Silver 5%, Gold 10%, Black 15%), dan opsi luxury gift packaging',
      'Halaman 3 (VIP Client Dossier & Multi-Boutique Stock): Direktori pelanggan prioritas beserta matriks stok real-time di cabang Senayan, Plaza Indonesia, dan Bali',
      'Desain tipografi serif editorial dengan kontras tinggi tanpa elemen generik',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Lookbook',
        title: 'Editorial Collection & Garment Detail Preview',
        summary: 'Etalase fashion dan leather goods dengan foto produk, detail jahitan/material, tabel ukuran cm, dan cek stok cabang.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Boutique POS',
        title: 'Clienteling Register & VIP Tier Privilege',
        summary: 'Kasir butik dengan selector ukuran per artikel, potongan harga member VIP otomatis, dan catatan gift box.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · VIP & Cabang',
        title: 'Private Client Book & Multi-Store Stock Matrix',
        summary: 'Manajemen profil pelanggan VIP, histori transaksi, dan transfer stok ukuran antar lokasi flagship store.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'pos-bengkel',
    sku: 'BM-POS-05',
    title: 'PitStop Pro · Website Katalog Sparepart, Kasir PKB Bengkel & Lacak Mobil (3 Halaman)',
    slug: 'pos-bengkel',
    tagline: 'Website bengkel otomotif 3 halaman utuh: Katalog Suku Cadang OEM & Paket Servis, Kasir PKB 4-Bay, serta Live Tracker Mobil',
    category: 'POS DASHBOARD',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', '3-Page Full Web'],
    price: 1350000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-pos-bengkel.png',
    preview_images: ['/products/shot-pos-bengkel.png'],
    demo_url: '/demo/pos-bengkel',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website manajemen bengkel modern dan toko suku cadang 3 halaman utuh. Halaman 1 menampilkan katalog visual suku cadang OEM (oli sintetik, kampas rem keramik, filter, busi iridium) dan paket tune-up lengkap dengan modal kecocokan tipe mobil. Halaman 2 adalah terminal kasir Perintah Kerja Bengkel (PKB) dengan pantauan 4 hydraulic lift. Halaman 3 adalah portal pelacakan progres pengerjaan mobil berdasarkan pelat nomor.',
    problem:
      'Pelanggan bengkel ingin melihat transparansi harga suku cadang asli (OEM) beserta rincian paket servis di awal, serta memantau kapan mobil mereka selesai dikerjakan.',
    solution:
      'Website bengkel 3 halaman yang menyatukan katalog preview sparepart & paket servis, kasir SPK/PKB 4-stall lift, dan layar pelacak progres pengerjaan kendaraan.',
    features: [
      'Halaman 1 (Katalog Sparepart OEM & Paket Servis): Kartu visual produk oli, rem, filter, dan paket servis dengan nomor part OEM dan modal kompatibilitas mobil',
      'Halaman 2 (Kasir PKB & 4-Bay Lift Board): Papan pelat nomor 4 stall lift aktif, pemisahan tabel Jasa Mekanik vs Suku Cadang, dan cetak dokumen PKB',
      'Halaman 3 (Live Vehicle Tracker & Buku Servis): Pelacakan 5 tahap pengerjaan mobil (Inspeksi, Lift Up, Pasang Part, Final QC, Selesai) dan riwayat kilometer',
      'Sinkronisasi langsung dari pemilihan sparepart di katalog ke dalam dokumen kerja kendaraan aktif',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Part',
        title: 'Etalase Suku Cadang OEM & Paket Tune-Up',
        summary: 'Katalog produk otomotif lengkap dengan foto komponen, kode part pabrikan, daftar mobil yang kompatibel, dan estimasi durasi.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Kasir PKB',
        title: 'Work-Order Register & 4-Bay Lift Control',
        summary: 'Terminal kasir bengkel untuk mengelola 4 bay aktif, menggabungkan biaya jasa teknisi dan sparepart ke lembar PKB.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Lacak Servis',
        title: 'Portal Progres Kendaraan & Buku Riwayat KM',
        summary: 'Halaman pemantau tahapan pengerjaan mobil secara langsung berdasarkan pelat nomor serta catatan garansi 30 hari.',
      },
    ],
    status: 'ACTIVE',
  },

  // 5 FULL 3-PAGE WEB / SAAS APPLICATIONS
  {
    id: 'app-pulseops',
    sku: 'BM-WEB-06',
    title: 'PulseOps · Website Public Status Page, NOC Telemetry & Incident SaaS (3 Halaman)',
    slug: 'app-pulseops',
    tagline: 'Website monitoring infrastruktur 3 halaman utuh: Portal Status Publik, Konsol Ping Telemetry NOC, serta Manajemen Insiden & Webhook',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Telemetry UI', '3-Page Full Web'],
    price: 900000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-pulseops.png',
    preview_images: ['/products/shot-app-pulseops.png'],
    demo_url: '/demo/app-pulseops',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website SaaS pemantau uptime dan halaman status publik 3 halaman lengkap. Halaman 1 adalah Public Status Page untuk pelanggan dengan bar uptime 30 hari per region dan modal detail arsitektur tiap node. Halaman 2 adalah konsol internal NOC dengan grafik gelombang latensi RTT dan live stream HTTP health check. Halaman 3 adalah pusat manajemen postmortem insiden dan konfigurasi webhook notifikasi.',
    problem:
      'Perusahaan SaaS memerlukan halaman status publik yang meyakinkan bagi klien sekaligus dashboard teknis internal untuk menguji latensi endpoint dan mengirim peringatan gangguan.',
    solution:
      'Website 3 halaman siap pakai yang memisahkan tampilan Public Status Page, NOC Telemetry Console, dan Incident Postmortem Manager.',
    features: [
      'Halaman 1 (Public Status Portal): Tampilan status operasional per cluster (API, Database, Payment, CDN) dengan visualisasi uptime 30 bar dan modal detail spesifikasi node',
      'Halaman 2 (NOC Telemetry Console): Tabel latensi real-time dengan grafik gelombang SVG, filter status HTTP, dan simulator Run Probe',
      'Halaman 3 (Incident Postmortem & Alert Routing): Riwayat kronologi insiden, form publikasi status baru, dan pengaturan kanal webhook Slack/Telegram',
      'Navigasi terpadu yang memudahkan tim DevOps berpindah dari halaman publik ke ruang kendali internal',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Status Publik',
        title: 'Customer-Facing Uptime Portal & Node Specs',
        summary: 'Halaman status layanan publik dengan grafik bar ketersediaan 30 hari, SLA wilayah, dan modal inspeksi kesehatan tiap server.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Konsol NOC',
        title: 'Live RTT Waveforms & HTTP Health Stream',
        summary: 'Dashboard operasi jaringan untuk memicu ping probe serentak, membaca kurva latensi ms, dan memantau log trafik.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Insiden & Alert',
        title: 'Incident Postmortem Ledger & Webhook Config',
        summary: 'Halaman publikasi laporan gangguan (Investigating, Identified, Resolved) serta integrasi notifikasi bot.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-splitbill',
    sku: 'BM-WEB-07',
    title: 'BagiRata · Website Katalog Struk Resto, Studio Split Bill & Settlement QRIS (3 Halaman)',
    slug: 'app-splitbill',
    tagline: 'Website patungan tagihan 3 halaman utuh: Galeri Template Menu Resto, Studio Stabilo Split Bill, serta Kartu Tagihan QRIS',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'WhatsApp Share', '3-Page Full Web'],
    price: 550000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-splitbill.png',
    preview_images: ['/products/shot-app-splitbill.png'],
    demo_url: '/demo/app-splitbill',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website aplikasi split bill 3 halaman bergaya Neo-Brutalist & Kertas Termal. Halaman 1 menyajikan galeri paket struk restoran populer (Izakaya Dinner, Coffee Hangout, Korean Grill, Artisan Pizza) lengkap dengan preview foto menu untuk dimuat instan. Halaman 2 adalah studio interaktif penandaan item per orang dengan stabilo warna dan kalkulasi PPN 11% + Service 5%. Halaman 3 menampilkan kartu tagihan per peserta lengkap dengan status lunas/belum dan tombol salin ke WhatsApp.',
    problem:
      'Menghitung patungan makan bersama sering merepotkan saat harus memasukkan menu satu per satu dan menagih teman yang belum transfer.',
    solution:
      'Website 3 halaman dengan galeri preset menu restoran populer, studio stabilo struk interaktif, dan papan pelacakan status bayar per teman.',
    features: [
      'Halaman 1 (Galeri Preset Resto & Preview Menu): Pilihan paket struk tempat nongkrong populer dan katalog menu tambahan lengkap dengan foto & detail porsi',
      'Halaman 2 (Studio Stabilo Split Bill): Kertas struk termal interaktif untuk menandai pemesan tiap menu dan menghitung pajak/servis secara proporsional',
      'Halaman 3 (Kartu Settlement & Pelacakan Lunas): Rincian nominal per orang dengan toggle status Sudah Bayar / Belum Bayar, info rekening/QRIS, dan salin teks WA',
      'Alur 3 langkah mulus dari pilih template menu, bagi porsi di struk, hingga pantau pelunasan teman',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Galeri Menu',
        title: 'Katalog Paket Struk Resto & Preview Hidangan',
        summary: 'Etalase template struk restoran populer dan daftar menu shareable yang dapat langsung dimuat ke meja hitung.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Studio Struk',
        title: 'Thermal Receipt Highlighter & Tax Calculator',
        summary: 'Ruang hitung interaktif dengan stabilo warna per peserta, tambah baris menu baru, dan kalkulasi PPN 11% + Service 5%.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Tagihan & QRIS',
        title: 'Kartu Settlement Peserta & Tracker Pelunasan',
        summary: 'Daftar kartu tagihan tiap teman dengan penanda Lunas/Belum Lunas serta format pesan otomatis untuk grup WhatsApp.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-kursus',
    sku: 'BM-WEB-08',
    title: 'KelasKilat · Website Katalog Bootcamp, Classroom Koding & Sertifikat LMS (3 Halaman)',
    slug: 'app-kursus',
    tagline: 'Website Learning Management System 3 halaman utuh: Katalog Kelas & Preview Silabus, Ruang Belajar Koding, serta Sertifikat Kelulusan',
    category: 'SAAS WEB',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'LMS Platform', '3-Page Full Web'],
    price: 1150000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-kursus.png',
    preview_images: ['/products/shot-app-kursus.png'],
    demo_url: '/demo/app-kursus',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website platform kursus teknologi (LMS) 3 halaman utuh. Halaman 1 adalah etalase Katalog Bootcamp (Next.js Security, AI RAG Engineering, PostgreSQL Architecture, Flutter Production) lengkap dengan modal preview kurikulum, profil mentor, dan proyek akhir. Halaman 2 adalah ruang belajar interaktif (Classroom) berisi materi bacaan, cuplikan kode bernomor baris, dan checkpoint kuis. Halaman 3 adalah rapor pencapaian siswa dan generator Sertifikat Kelulusan siap cetak.',
    problem:
      'Akademi koding dan kreator edukasi membutuhkan website utuh yang menampilkan halaman penjualan katalog kursus sekaligus ruang belajar dan halaman sertifikat resmi.',
    solution:
      'Website LMS 3 halaman yang mengintegrasikan Katalog Kursus & Preview Silabus, Interactive Code Classroom, dan halaman Verifikasi Sertifikat.',
    features: [
      'Halaman 1 (Katalog Bootcamp & Preview Silabus): Kartu program belajar dengan tingkat kesulitan, durasi, harga, dan modal rincian bab kurikulum',
      'Halaman 2 (Interactive Classroom & Quiz): Pembaca modul berdampingan dengan blok kode arsitektur dan evaluasi kuis interaktif berumpan balik instan',
      'Halaman 3 (Rapor & Generator Sertifikat): Ringkasan skor modul, input nama peserta, dan pratinjau Sertifikat Kelulusan ber-ID verifikasi',
      'Dapat langsung digunakan untuk menjual kelas mandiri tanpa bagi hasil platform pihak ketiga',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Kelas',
        title: 'Storefront Bootcamp & Preview Kurikulum',
        summary: 'Etalase kelas rekayasa perangkat lunak dengan filter topik, modal daftar modul lengkap, dan tombol Mulai Belajar.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Ruang Belajar',
        title: 'Split-Pane Code Workbook & Architecture Quiz',
        summary: 'Halaman materi teknis dengan contoh implementasi kode dan checkpoint pertanyaan ujian per modul.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Sertifikat',
        title: 'Transkrip Nilai Cohort & Sertifikat Digital',
        summary: 'Halaman rekapitulasi kelulusan modul beserta sertifikat resmi yang dapat disesuaikan nama pesertanya.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-klinik',
    sku: 'BM-WEB-09',
    title: 'AntreMed · Website Layanan Klinik, Booking Tiket Pasien & Monitor TV Poli (3 Halaman)',
    slug: 'app-klinik',
    tagline: 'Website klinik kesehatan 3 halaman utuh: Katalog Layanan MCU & Profil Dokter, Kiosk Booking Tiket, serta Layar TV Antrean Poli',
    category: 'E-COMMERCE',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Clinic Portal', '3-Page Full Web'],
    price: 800000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-klinik.png',
    preview_images: ['/products/shot-app-klinik.png'],
    demo_url: '/demo/app-klinik',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website portal klinik pratama dan reservasi dokter 3 halaman bernuansa Botanical Mint & Teal. Halaman 1 menyajikan katalog paket Medical Check-Up (MCU), tindakan gigi, vaksinasi, serta profil dokter spesialis lengkap dengan modal detail prosedur & persiapan pasien. Halaman 2 adalah formulir pendaftaran mandiri untuk memilih jam praktik dan mencetak tiket antrean digital. Halaman 3 adalah layar TV monitor antrean poliklinik real-time.',
    problem:
      'Klinik modern membutuhkan website profil layanan dan jadwal dokter untuk pasien di rumah, sekaligus sistem tiket pendaftaran dan layar monitor ruang tunggu.',
    solution:
      'Website klinik 3 halaman terpadu: Katalog Paket Medis & Dokter, Kiosk Reservasi Tiket Antrean, dan Layar Monitor TV Poliklinik.',
    features: [
      'Halaman 1 (Katalog Layanan & Dokter): Etalase paket pemeriksaan kesehatan & profil dokter lengkap dengan modal rincian tindakan medis dan tarif transparan',
      'Halaman 2 (Booking Jadwal & Tiket Pasien): Pemilihan poli, slot jam praktik tersedia, input data pasien, dan penerbitan struk tiket antrean ber-QR',
      'Halaman 3 (Monitor TV Ruang Tunggu): Layar antrean kontras tinggi untuk menampilkan nomor panggil aktif tiap ruang poli dan tombol panggil berikutnya',
      'Layanan atau dokter yang dipilih pada Halaman 1 langsung terisi otomatis pada form pendaftaran di Halaman 2',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Layanan & Dokter',
        title: 'Katalog Paket Medis, Tindakan & Jadwal Dokter',
        summary: 'Halaman depan klinik berisi daftar paket MCU, poli gigi/anak, modal prosedur pemeriksaan, dan profil tenaga medis.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Booking Tiket',
        title: 'Reservasi Slot Praktik & Cetak Slip Antrean',
        summary: 'Formulir pengambilan nomor antrean pasien berdasarkan jam praktik dokter dan pencetakan tiket digital.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Monitor TV Poli',
        title: 'Layar Panggilan Antrean Poliklinik Real-Time',
        summary: 'Tampilan layar TV rumah sakit/klinik yang memuat nomor antrean aktif per ruangan beserta riwayat tiket.',
      },
    ],
    status: 'ACTIVE',
  },
  {
    id: 'app-kontrak',
    sku: 'BM-WEB-10',
    title: 'LegalDraft ID · Website Katalog Dokumen Hukum, Studio SPK/NDA & Arsip Kontrak (3 Halaman)',
    slug: 'app-kontrak',
    tagline: 'Website legal-tech 3 halaman utuh: Katalog Template Kontrak IT, Studio Generator SPK/NDA A4, serta Brankas Arsip & Termin',
    category: 'SCRIPTS & BOTS',
    tech_stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Print CSS A4', '3-Page Full Web'],
    price: 650000,
    is_portfolio: false,
    thumbnail_url: '/products/shot-app-kontrak.png',
    preview_images: ['/products/shot-app-kontrak.png'],
    demo_url: '/demo/app-kontrak',
    github_url: 'https://github.com/FikriBintangx/birumarket',
    description:
      'Website legal-tech dan generator dokumen proyek IT 3 halaman lengkap. Halaman 1 menampilkan katalog produk template kontrak (SPK Pengembangan Software, NDA Kerahasiaan, Kontrak Maintenance Server, Perjanjian Lisensi Source Code) dengan modal preview daftar pasal. Halaman 2 adalah studio split-pane untuk mengisi nama klien, nilai proyek, dan persentase termin dengan pratinjau kertas A4 langsung. Halaman 3 adalah brankas arsip kontrak dan pemantau pembayaran termin.',
    problem:
      'Software house dan agensi digital membutuhkan katalog standar perjanjian hukum Indonesia yang rapi, mudah diedit sesuai nilai termin proyek, dan tercatat status penandatanganannya.',
    solution:
      'Website 3 halaman yang menggabungkan Katalog Template Hukum, Live A4 Contract Studio, dan Brankas Pelacakan Termin Kontrak.',
    features: [
      'Halaman 1 (Katalog Template Hukum IT): Kartu produk dokumen SPK, NDA, Retainer, dan Lisensi HAKI lengkap dengan modal ringkasan pasal perlindungan',
      'Halaman 2 (Studio Editor Kontrak A4): Editor parameter klien, ruang lingkup, kalkulator otomatis nominal DP vs Pelunasan, dan tombol cetak PDF A4',
      'Halaman 3 (Brankas Arsip & Tracker Termin): Tabel daftar kontrak yang telah diterbitkan, status tanda tangan kedua pihak, dan tombol simpan kontrak baru',
      'Dokumen yang disusun di Studio Editor dapat langsung disimpan ke Brankas Arsip di Halaman 3',
    ],
    pages: [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Katalog Dokumen',
        title: 'Etalase Template SPK, NDA & Lisensi Perangkat Lunak',
        summary: 'Katalog jenis perjanjian hukum bisnis teknologi beserta modal pratinjau pasal-pasal krusial sebelum diedit.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Studio Editor A4',
        title: 'Split-Pane Contract Builder & Kalkulator Termin',
        summary: 'Editor interaktif untuk menyusun pasal kontrak Bahasa Indonesia secara otomatis di atas lembar kertas A4 siap cetak.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Arsip & Termin',
        title: 'Brankas Dokumen Klien & Pelacak Pembayaran',
        summary: 'Tabel manajemen kontrak aktif, status pencairan Termin I/II, serta akses cepat pencetakan ulang PDF.',
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
      'Bisnis membutuhkan fondasi website multi-halaman teruji agar tidak membuang waktu membangun arsitektur dasar dari nol.',
    solution:
      matched?.solution ||
      raw.solution ||
      'Website 3 halaman siap pakai dengan katalog preview produk, aplikasi operasional utama, dan halaman manajemen.',
    features:
      matched?.features ||
      (Array.isArray(raw.features) && raw.features.length > 0
        ? raw.features
        : [
            'Website utuh 3 halaman (Storefront Katalog, Aplikasi Utama, & Backoffice)',
            'Skema database dan panduan environment variable siap deploy',
            'Desain responsif untuk desktop maupun mobile',
          ]),
    pages: matched?.pages || [
      {
        pageNumber: 1,
        label: 'Halaman 1 · Storefront',
        title: 'Katalog & Preview Produk Visual',
        summary: 'Halaman depan website dengan daftar produk, filter kategori, dan modal spesifikasi.',
      },
      {
        pageNumber: 2,
        label: 'Halaman 2 · Aplikasi Utama',
        title: 'Terminal Operasional / Workspace Interaktif',
        summary: 'Ruang kerja utama aplikasi untuk transaksi atau pemrosesan data.',
      },
      {
        pageNumber: 3,
        label: 'Halaman 3 · Manajemen',
        title: 'Monitor Antrean, Inventaris & Laporan',
        summary: 'Halaman kontrol backoffice untuk memantau status pesanan dan laporan.',
      },
    ],
    status: raw.status || 'ACTIVE',
    created_at: raw.created_at,
  };
}
