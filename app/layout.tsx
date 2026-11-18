import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BiruMarket · Marketplace Source Code & Showcase Aplikasi Web',
    template: '%s · BiruMarket',
  },
  description:
    'BiruMarket adalah marketplace resmi source code aplikasi web, POS dashboard, AI SaaS, micro-tools, dan workflow otomasi siap pakai karya Fikri Bintang Purnomo. Live interactive demo tersedia di birumarket.web.id.',
  metadataBase: new URL('https://birumarket.web.id'),
  alternates: {
    canonical: 'https://birumarket.web.id',
  },
  keywords: [
    'birumarket',
    'birumarket.web.id',
    'biru market',
    'marketplace source code indonesia',
    'beli source code web',
    'dashboard pos nextjs',
    'fikri bintang purnomo',
    'fikribintang',
    'pos resto cafe bakery',
    'ai saas source code',
    'aplikasi web siap pakai',
    'react tailwind supabase source code',
  ],
  authors: [{ name: 'Fikri Bintang Purnomo', url: 'https://fikribintang.web.id' }],
  creator: 'Fikri Bintang Purnomo',
  publisher: 'BiruMarket',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BiruMarket · Marketplace Source Code & Showcase Aplikasi Web',
    description:
      'Katalog source code aplikasi web, dashboard POS modern, AI SaaS, dan otomasi siap deploy oleh Fikri Bintang Purnomo.',
    url: 'https://birumarket.web.id',
    siteName: 'BiruMarket',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://birumarket.web.id/products/shot-omnipos.png',
        width: 1200,
        height: 630,
        alt: 'BiruMarket · Marketplace Source Code & Showcase Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BiruMarket · Marketplace Source Code & Showcase Aplikasi Web',
    description:
      'Beli source code aplikasi web dan dashboard POS siap pakai karya Fikri Bintang Purnomo.',
    images: ['https://birumarket.web.id/products/shot-omnipos.png'],
    creator: '@fikribintang',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-placeholder',
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://birumarket.web.id/#website',
      url: 'https://birumarket.web.id',
      name: 'BiruMarket',
      description:
        'Marketplace resmi source code aplikasi web, POS dashboard, AI SaaS, dan otomasi siap deploy.',
      publisher: {
        '@id': 'https://birumarket.web.id/#organization',
      },
      inLanguage: 'id-ID',
    },
    {
      '@type': 'Organization',
      '@id': 'https://birumarket.web.id/#organization',
      name: 'BiruMarket',
      url: 'https://birumarket.web.id',
      logo: 'https://birumarket.web.id/icon.png',
      founder: {
        '@type': 'Person',
        name: 'Fikri Bintang Purnomo',
        url: 'https://fikribintang.web.id',
      },
      sameAs: [
        'https://github.com/FikriBintangx',
        'https://fikribintang.web.id',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-9287-0932',
        contactType: 'customer service',
        availableLanguage: ['Indonesian', 'English'],
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
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
