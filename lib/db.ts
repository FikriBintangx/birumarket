import { createClient, Client } from '@libsql/client';

let client: Client;

const dbUrl = process.env.TURSO_DATABASE_URL || 'file:birumarket.db';
const authToken = process.env.TURSO_AUTH_TOKEN || undefined;

client = createClient({
  url: dbUrl,
  authToken: authToken,
});

export async function initDb() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      tech_stack TEXT NOT NULL, -- JSON String
      price INTEGER NOT NULL,
      is_portfolio INTEGER DEFAULT 0,
      thumbnail_url TEXT NOT NULL,
      preview_images TEXT, -- JSON String
      demo_url TEXT,
      github_url TEXT,
      description TEXT NOT NULL,
      status TEXT DEFAULT 'ACTIVE', -- ACTIVE, SOLD, ARCHIVED
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default data if database is empty
  const countRes = await client.execute('SELECT COUNT(*) as count FROM products');
  const count = Number(countRes.rows[0].count);

  if (count === 0) {
    const defaultProducts = [
      {
        id: 'prod-1',
        title: 'QRIS Digital Dropship Platform',
        slug: 'qris-digital-dropship-platform',
        category: 'E-COMMERCE',
        tech_stack: JSON.stringify(['Playwright', 'Express', 'Better-SQLite3', 'Tailwind', 'Tripay']),
        price: 650000,
        is_portfolio: 0,
        thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80',
        preview_images: JSON.stringify(['https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80']),
        demo_url: 'https://birumarket.web.id',
        github_url: 'https://github.com/FikriBintangx',
        description: 'Sistem marketplace auto-order dropship produk digital terintegrasi QRIS Tripay, Playwright scraping supplier SPA, dan notifikasi Telegram bot 3-way.',
        status: 'ACTIVE',
      },
      {
        id: 'prod-2',
        title: 'AI Telegram Content Generator Bot',
        slug: 'ai-telegram-content-generator-bot',
        category: 'SCRIPTS & BOTS',
        tech_stack: JSON.stringify(['Python', 'FastAPI', 'OpenAI', 'Telegram Bot API']),
        price: 450000,
        is_portfolio: 0,
        thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        preview_images: JSON.stringify(['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80']),
        demo_url: 'https://t.me/demo_ai_bot',
        github_url: 'https://github.com/FikriBintangx',
        description: 'Bot Telegram otomatis pembuat konten media sosial berbasis LLM OpenAI GPT-4, support scheduled post, auto-caption, dan gambar AI DALL-E.',
        status: 'ACTIVE',
      },
      {
        id: 'prod-3',
        title: 'Flutter POS Kasir Multi-Store System',
        slug: 'flutter-pos-kasir-multi-store',
        category: 'MOBILE APPS',
        tech_stack: JSON.stringify(['Flutter', 'Dart', 'Node.js', 'PostgreSQL', 'Certainty Factor']),
        price: 1200000,
        is_portfolio: 1,
        thumbnail_url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
        preview_images: JSON.stringify(['https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80']),
        demo_url: 'https://birumarket.web.id',
        github_url: 'https://github.com/FikriBintangx',
        description: 'Aplikasi kasir Point of Sale (POS) Android/iOS Flutter dengan fitur offline sync, manajemen cabang multi-store, cetak struk Bluetooth, dan laporan keuangan.',
        status: 'ACTIVE',
      },
      {
        id: 'prod-4',
        title: 'Next.js 15 Micro-SaaS Boilerplate Starter',
        slug: 'nextjs-15-microsaas-boilerplate',
        category: 'SAAS WEB',
        tech_stack: JSON.stringify(['Next.js 15', 'Tailwind v4', 'Prisma', 'Stripe', 'NextAuth']),
        price: 350000,
        is_portfolio: 0,
        thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        preview_images: JSON.stringify(['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80']),
        demo_url: 'https://birumarket.web.id',
        github_url: 'https://github.com/FikriBintangx',
        description: 'Template starter Micro-SaaS siap pakai dengan integrasi autentikasi user, langganan Stripe/Tripay, dashboard analytics, dan UI Tailwind premium.',
        status: 'ACTIVE',
      }
    ];

    for (const p of defaultProducts) {
      await client.execute({
        sql: `INSERT INTO products (id, title, slug, category, tech_stack, price, is_portfolio, thumbnail_url, preview_images, demo_url, github_url, description, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [p.id, p.title, p.slug, p.category, p.tech_stack, p.price, p.is_portfolio, p.thumbnail_url, p.preview_images, p.demo_url, p.github_url, p.description, p.status]
      });
    }
  }
}

export default client;
