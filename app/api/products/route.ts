import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const defaultFallbackProducts = [
  {
    id: 'prod-1',
    title: 'QRIS Digital Dropship Platform',
    slug: 'qris-digital-dropship-platform',
    category: 'E-COMMERCE',
    tech_stack: ['Playwright', 'Express', 'Better-SQLite3', 'Tailwind', 'Tripay'],
    price: 650000,
    is_portfolio: false,
    thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1556742049-0a67daf4002a?auto=format&fit=crop&w=800&q=80'],
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
    tech_stack: ['Python', 'FastAPI', 'OpenAI', 'Telegram Bot API'],
    price: 450000,
    is_portfolio: false,
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'],
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
    tech_stack: ['Flutter', 'Dart', 'Node.js', 'PostgreSQL', 'Certainty Factor'],
    price: 1200000,
    is_portfolio: true,
    thumbnail_url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80'],
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
    tech_stack: ['Next.js 15', 'Tailwind v4', 'Prisma', 'Stripe', 'NextAuth'],
    price: 350000,
    is_portfolio: false,
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    preview_images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'],
    demo_url: 'https://birumarket.web.id',
    github_url: 'https://github.com/FikriBintangx',
    description: 'Template starter Micro-SaaS siap pakai dengan integrasi autentikasi user, langganan Stripe/Tripay, dashboard analytics, dan UI Tailwind premium.',
    status: 'ACTIVE',
  }
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = supabase
      .from('products')
      .select('*')
      .eq('status', 'ACTIVE');

    if (category && category !== 'ALL') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.warn('Supabase products fetch warning (fallback active):', error.message);
      // Fallback if table does not exist yet or connection fails
      let filtered = defaultFallbackProducts;
      if (category && category !== 'ALL') {
        filtered = filtered.filter(p => p.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(p => p.title.toLowerCase().includes(s) || p.description.toLowerCase().includes(s));
      }
      return NextResponse.json({ success: true, data: filtered, is_fallback: true });
    }

    const products = (data || []).map((row: any) => ({
      ...row,
      tech_stack: typeof row.tech_stack === 'string' ? JSON.parse(row.tech_stack || '[]') : (row.tech_stack || []),
      preview_images: typeof row.preview_images === 'string' ? JSON.parse(row.preview_images || '[]') : (row.preview_images || []),
      is_portfolio: Boolean(row.is_portfolio),
    }));

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      title,
      category,
      tech_stack,
      price,
      is_portfolio,
      thumbnail_url,
      preview_images,
      demo_url,
      github_url,
      description,
      admin_pin,
      pin,
    } = body;

    // PIN check
    const validPin = process.env.ADMIN_PIN || '123456';
    if ((admin_pin || pin) !== validPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    if (!title || !category || !thumbnail_url) {
      return NextResponse.json({ success: false, error: 'Field judul, kategori, dan gambar thumbnail wajib diisi' }, { status: 400 });
    }

    const id = 'prod-' + Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);

    const techStackArray = Array.isArray(tech_stack) 
      ? tech_stack 
      : (tech_stack ? tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean) : []);

    const previewImagesArray = Array.isArray(preview_images) && preview_images.length > 0
      ? preview_images
      : [thumbnail_url];

    const { data, error } = await supabase.from('products').insert([
      {
        id,
        title,
        slug,
        category,
        tech_stack: techStackArray,
        price: Number(price) || 0,
        is_portfolio: Boolean(is_portfolio),
        thumbnail_url,
        preview_images: previewImagesArray,
        demo_url: demo_url || '',
        github_url: github_url || '',
        description: description || '',
        status: 'ACTIVE',
      }
    ]).select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json({ 
        success: false, 
        error: `Supabase Error: ${error.message}. Pastikan table 'products' sudah dibuat di Supabase.` 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: { id, slug } });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
