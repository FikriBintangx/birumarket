import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import ChatWidget, { type Product } from '@/components/ChatWidget';
import { supabase } from '@/lib/supabase';
import './globals.css';

const chatProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'QRIS Digital Dropship Platform',
    price: 650000,
    kind: 'codingan',
  },
  {
    id: 'prod-2',
    name: 'AI Telegram Content Generator Bot',
    price: 450000,
    kind: 'codingan',
  },
  {
    id: 'prod-3',
    name: 'Modern SaaS Landing Page & Dashboard',
    price: 350000,
    kind: 'project',
  },
  {
    id: 'prod-4',
    name: 'Creative Brand Identity & Canva Pitch Deck',
    price: 150000,
    kind: 'canva',
  },
];

type ChatProductRow = {
  id: string | number;
  title: string;
  price: number;
  category: string | null;
};

function isChatProductRow(value: unknown): value is ChatProductRow {
  if (!value || typeof value !== 'object') {
    return false;
  }

  if (
    !('id' in value) ||
    !('title' in value) ||
    !('price' in value) ||
    !('category' in value)
  ) {
    return false;
  }

  const { id, title, price, category } = value;
  return (
    (typeof id === 'string' || typeof id === 'number') &&
    typeof title === 'string' &&
    typeof price === 'number' &&
    (typeof category === 'string' || category === null)
  );
}

async function getChatProducts(): Promise<Product[]> {
  'use cache';
  cacheLife('hours');

  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, title, price, category')
      .eq('status', 'ACTIVE');

    if (error || !Array.isArray(data)) {
      return chatProducts;
    }

    const products = data
      .filter(isChatProductRow)
      .map((product) => {
        const category = product.category?.toLowerCase() ?? '';
        const kind: Product['kind'] =
          category.includes('canva') || category.includes('design')
            ? 'canva'
            : category.includes('project') ||
                category.includes('landing') ||
                category.includes('template')
              ? 'project'
              : 'codingan';

        return {
          id: String(product.id),
          name: product.title,
          price: product.price,
          kind,
        };
      });

    return products.length > 0 ? products : chatProducts;
  } catch {
    return chatProducts;
  }
}

export const metadata: Metadata = {
  title: 'BiruMarket — Marketplace & Showcase Aplikasi / Web',
  description: 'Beli aplikasi, website siap pakai, dan showcase karya developer oleh Fikri Bintang.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getChatProducts();

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
        <ChatWidget products={products} qrisImageUrl="/qris.png" />
      </body>
    </html>
  );
}
