# BiruMarket (`birumarket.web.id`)

Marketplace produk digital, source code aplikasi web siap pakai, sistem Point of Sale (POS), dan aplikasi SaaS multi-halaman oleh **Fikri Bintang Purnomo**.

## Arsitektur Produk 3-Halaman

Setiap produk di dalam katalog BiruMarket dirancang sebagai aplikasi web utuh yang terdiri atas 3 halaman operasional yang saling terhubung dalam satu state aplikasi:

1. **Halaman 1 · Storefront & Product Preview**: Etalase menghadap pelanggan dengan fotografi produk, penyaring kategori, dan modal spesifikasi mendalam.
2. **Halaman 2 · Core Application / Touch POS Register**: Ruang kerja utama untuk staf atau pengguna (terminal kasir sentuh 3-zona, studio kalkulasi, ruang kelas koding, atau editor dokumen A4).
3. **Halaman 3 · Backoffice, KDS & Operations Monitor**: Layar pemantauan antrean dapur (KDS), papan panggilan bar, audit batch inventaris, buku besar kontrak, atau konsol telemetri insiden.

## Katalog 10 Aplikasi Utama

### POS & Retail Storefront Systems
| SKU | Nama Produk | Slug Demo | Fokus Industri |
| :--- | :--- | :--- | :--- |
| `BM-POS-01` | **KuroBento · Izakaya Storefront, Shokuken POS & Kitchen KDS** | `/demo/pos-kuro` | Restoran Jepang, Ramen Bar & Izakaya |
| `BM-POS-02` | **BrewLab · Roastery Storefront, Speed-Bar POS & Pickup Board** | `/demo/pos-brew` | Specialty Coffee Shop & Micro-Roastery |
| `BM-POS-03` | **ApotekMedika · Clinical Pharmacy Storefront, FEFO POS & Batch Vault** | `/demo/pos-medika` | Apotek, Farmasi Klinis & Toko Alkes |
| `BM-POS-04` | **AtelierLuxe · Editorial Lookbook, Clienteling POS & Boutique CRM** | `/demo/pos-atelier` | Flagship Fashion Boutique & Leather Goods |
| `BM-POS-05` | **PitStop Pro · OEM Parts Storefront, Work-Order POS & Bay Tracker** | `/demo/pos-bengkel` | Bengkel Otomotif Modern & Suku Cadang OEM |

### Web & SaaS Applications
| SKU | Nama Produk | Slug Demo | Fokus Industri |
| :--- | :--- | :--- | :--- |
| `BM-WEB-06` | **PulseOps · Public Status Page, NOC Telemetry & Incident Response** | `/demo/app-pulseops` | DevOps Uptime Monitoring & Status Portal |
| `BM-WEB-07` | **BagiRata · Dining Preset Catalog, Receipt Splitter & QRIS Settlement** | `/demo/app-splitbill` | Consumer FinTech & Group Expense Splitter |
| `BM-WEB-08` | **KelasKilat · Engineering Bootcamp Storefront, Code Classroom & Credential Vault** | `/demo/app-kursus` | EdTech Learning Management System (LMS) |
| `BM-WEB-09` | **AntreMed · Outpatient Clinic Portal, Slot Booking & Polyclinic TV Board** | `/demo/app-klinik` | Klinik Rawat Jalan & Reservasi Dokter |
| `BM-WEB-10` | **LegalDraft ID · IT Contract Library, Live A4 Drafting Studio & Escrow Ledger** | `/demo/app-kontrak` | LegalTech Generator SPK, NDA & Lisensi IT |

## Spesifikasi Teknis & Struktur Proyek

- **Framework**: Next.js 16.4.6 (App Router) + React 19.3.0 + TypeScript
- **Styling & Tipografi**: Tailwind CSS v4, *Instrument Serif*, *Syne*, *Plus Jakarta Sans*, dan *JetBrains Mono*
- **Database & Persistensi**:
  - **Primary**: Supabase PostgreSQL (`lib/supabase.ts` & `supabase-schema.sql`)
  - **Local / Edge Fallback**: LibSQL / SQLite (`lib/db.ts`) serta katalog terstruktur (`lib/catalog-data.ts`)
- **Rute Aplikasi**:
  - `/` : Halaman utama editorial dengan Interactive Multi-Page Showcase & Katalog Produk
  - `/catalog` : Direktori pencarian dan penyaringan seluruh produk berdasarkan kategori
  - `/demo/[slug]` : Lingkup simulasi interaktif 3 halaman penuh dengan pengatur viewport (`Desktop`, `Tablet`, `Mobile`)
  - `/about` : Arsitektur sistem, standar serah terima kode (Engineering Handover), dan profil engineer
  - `/admin` : Panel manajemen katalog dan sinkronisasi database
  - `/api/products` & `/api/products/[id]` : Endpoint REST untuk pembacaan, pencarian, dan pembaruan katalog

## Menjalankan di Lingkungan Lokal

```bash
# 1. Instal dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Verifikasi build produksi
npm run build
```

Buka `http://localhost:3000` pada peramban untuk melihat halaman utama atau kunjungi langsung `/demo/pos-kuro` untuk mencoba simulasi interaktif 3 halaman.

## Kontak & Lisensi

Dikembangkan dan dikelola oleh **Fikri Bintang Purnomo** (`birumarket.web.id` / `fikribintang.web.id`).
