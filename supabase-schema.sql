-- ==========================================================
-- BIRUMARKET SUPABASE SCHEMA & STORAGE POLICIES
-- Jalankan script SQL ini di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/soljlsbnphrdkomldckh/sql/new
-- ==========================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  price NUMERIC DEFAULT 0,
  is_portfolio BOOLEAN DEFAULT false,
  thumbnail_url TEXT NOT NULL,
  preview_images JSONB DEFAULT '[]'::jsonb,
  demo_url TEXT DEFAULT '',
  github_url TEXT DEFAULT '',
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies for Products Table
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
CREATE POLICY "Allow public read access" ON public.products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert" ON public.products;
CREATE POLICY "Allow public insert" ON public.products
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update" ON public.products;
CREATE POLICY "Allow public update" ON public.products
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow public delete" ON public.products;
CREATE POLICY "Allow public delete" ON public.products
  FOR DELETE USING (true);

-- 4. Create Public Storage Bucket 'catalog'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('catalog', 'catalog', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 5. Storage Policies for 'catalog' Bucket
DROP POLICY IF EXISTS "Public Catalog View" ON storage.objects;
CREATE POLICY "Public Catalog View" ON storage.objects
  FOR SELECT USING (bucket_id = 'catalog');

DROP POLICY IF EXISTS "Public Catalog Upload" ON storage.objects;
CREATE POLICY "Public Catalog Upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'catalog');

DROP POLICY IF EXISTS "Public Catalog Update" ON storage.objects;
CREATE POLICY "Public Catalog Update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'catalog');

DROP POLICY IF EXISTS "Public Catalog Delete" ON storage.objects;
CREATE POLICY "Public Catalog Delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'catalog');

-- 6. Seed Default Showcase Products
INSERT INTO public.products (id, title, slug, category, tech_stack, price, is_portfolio, thumbnail_url, preview_images, demo_url, github_url, description, status)
VALUES
(
  'prod-1',
  'QRIS Digital Dropship Platform',
  'qris-digital-dropship-platform',
  'E-COMMERCE',
  '["Playwright", "Express", "Better-SQLite3", "Tailwind", "Tripay"]'::jsonb,
  650000,
  false,
  'https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80',
  '["https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80"]'::jsonb,
  'https://birumarket.web.id',
  'https://github.com/FikriBintangx',
  'Sistem marketplace auto-order dropship produk digital terintegrasi QRIS Tripay, Playwright scraping supplier SPA, dan notifikasi Telegram bot 3-way.',
  'ACTIVE'
),
(
  'prod-2',
  'AI Telegram Content Generator Bot',
  'ai-telegram-content-generator-bot',
  'SCRIPTS & BOTS',
  '["Python", "FastAPI", "OpenAI", "Telegram Bot API"]'::jsonb,
  450000,
  false,
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  '["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"]'::jsonb,
  'https://t.me/demo_ai_bot',
  'https://github.com/FikriBintangx',
  'Bot Telegram otomatis pembuat konten media sosial berbasis LLM OpenAI GPT-4, support scheduled post, auto-caption, dan gambar AI DALL-E.',
  'ACTIVE'
),
(
  'prod-3',
  'Flutter POS Kasir Multi-Store System',
  'flutter-pos-kasir-multi-store',
  'MOBILE APPS',
  '["Flutter", "Dart", "Node.js", "PostgreSQL", "Certainty Factor"]'::jsonb,
  1200000,
  true,
  'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
  '["https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80"]'::jsonb,
  'https://birumarket.web.id',
  'https://github.com/FikriBintangx',
  'Aplikasi kasir Point of Sale (POS) Android/iOS Flutter dengan fitur offline sync, manajemen cabang multi-store, cetak struk Bluetooth, dan laporan keuangan.',
  'ACTIVE'
),
(
  'prod-4',
  'Next.js 15 Micro-SaaS Boilerplate Starter',
  'nextjs-15-microsaas-boilerplate',
  'SAAS WEB',
  '["Next.js 15", "Tailwind v4", "Prisma", "Stripe", "NextAuth"]'::jsonb,
  350000,
  false,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  '["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"]'::jsonb,
  'https://birumarket.web.id',
  'https://github.com/FikriBintangx',
  'Template starter Micro-SaaS siap pakai dengan integrasi autentikasi user, langganan Stripe/Tripay, dashboard analytics, dan UI Tailwind premium.',
  'ACTIVE'
)
ON CONFLICT (id) DO NOTHING;
