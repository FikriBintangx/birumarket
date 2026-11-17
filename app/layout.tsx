import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BiruMarket · Marketplace Source Code & Showcase Aplikasi Web',
  description:
    'Beli source code aplikasi web, AI SaaS, e-commerce, dan script otomasi siap pakai karya Fikri Bintang Purnomo. Uji live demo sebelum akuisisi di birumarket.web.id.',
  metadataBase: new URL('https://birumarket.web.id'),
  openGraph: {
    title: 'BiruMarket · Marketplace Source Code & Showcase Aplikasi Web',
    description:
      'Katalog aplikasi web, AI SaaS, PWA, dan otomasi siap deploy oleh Fikri Bintang Purnomo.',
    url: 'https://birumarket.web.id',
    siteName: 'BiruMarket',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="p-2.5 sm:p-5 lg:p-8 min-h-screen flex items-start justify-center font-['Plus_Jakarta_Sans',sans-serif] bg-[#E8EEF5] text-[#0F172A] overflow-x-hidden">
        <div className="w-full max-w-[1360px] bg-[#F8FAFC] rounded-[1.75rem] sm:rounded-[2.5rem] p-3.5 sm:p-6 md:p-8 shadow-xl border border-slate-200/80">
          {children}
        </div>
      </body>
    </html>
  );
}
