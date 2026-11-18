import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BiruMarket · Editorial Marketplace Source Code & Sistem Web 3 Halaman',
    template: '%s · BiruMarket',
  },
  description:
    'BiruMarket adalah katalog produk digital, source code aplikasi web 3 halaman, POS interaktif, dan SaaS siap pakai karya Fikri Bintang Purnomo. Uji langsung live demo di birumarket.web.id.',
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
    title: 'BiruMarket · Editorial Marketplace Source Code & Sistem Web 3 Halaman',
    description:
      'Katalog terkurasi untuk source code aplikasi web 3 halaman, terminal POS modern, dan sistem SaaS siap deploy oleh Fikri Bintang Purnomo.',
    url: 'https://birumarket.web.id',
    siteName: 'BiruMarket',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://birumarket.web.id/products/shot-pos-kuro.png',
        width: 1200,
        height: 630,
        alt: 'BiruMarket · Editorial Marketplace Source Code & Showcase Web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BiruMarket · Editorial Marketplace Source Code & Sistem Web 3 Halaman',
    description:
      'Akuisisi source code aplikasi web dan sistem POS 3 halaman siap pakai karya Fikri Bintang Purnomo.',
    images: ['https://birumarket.web.id/products/shot-pos-kuro.png'],
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
        'Katalog resmi source code aplikasi web 3 halaman, terminal POS, dan SaaS siap deploy.',
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F7F4] text-[#111315] font-['Plus_Jakarta_Sans',sans-serif] antialiased selection:bg-[#111315] selection:text-[#F8F7F4] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
