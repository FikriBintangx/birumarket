import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BiruMarket — Marketplace & Showcase Aplikasi / Web',
  description: 'Beli aplikasi, website siap pakai, dan showcase karya developer oleh Fikri Bintang.',
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="p-3 md:p-6 lg:p-10 min-h-screen flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
        <div className="w-full max-w-[1360px] bg-[#F1F4F5] rounded-[2.5rem] md:rounded-[3.2rem] p-4 md:p-8 shadow-2xl border border-white/60">
          {children}
        </div>
      </body>
    </html>
  );
}
