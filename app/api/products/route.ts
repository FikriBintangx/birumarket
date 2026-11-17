import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { DEFAULT_PRODUCTS, enrichProduct, ProductItem } from '@/lib/catalog-data';

function toSupabaseRows(items: ProductItem[]) {
  return items.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    tech_stack: p.tech_stack,
    price: Number(p.price) || 0,
    is_portfolio: Boolean(p.is_portfolio),
    thumbnail_url: p.thumbnail_url,
    preview_images: p.preview_images,
    demo_url: p.demo_url || '',
    github_url: p.github_url || '',
    description: p.description || '',
    status: p.status || 'ACTIVE',
  }));
}

function filterDefaults(category: string | null, search: string | null): ProductItem[] {
  let filtered = [...DEFAULT_PRODUCTS];
  if (category && category !== 'ALL') {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.tagline.toLowerCase().includes(s) ||
        p.tech_stack.some((t) => t.toLowerCase().includes(s))
    );
  }
  return filtered;
}

async function replaceLegacyWithDefaults(): Promise<ProductItem[] | null> {
  await supabase.from('products').delete().like('id', 'prod-%');
  const { data: seededData, error: seedError } = await supabase
    .from('products')
    .upsert(toSupabaseRows(DEFAULT_PRODUCTS), { onConflict: 'id' })
    .select();

  if (seedError || !seededData || seededData.length === 0) {
    return null;
  }
  return seededData.map(enrichProduct);
}

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
      return NextResponse.json({
        success: true,
        data: filterDefaults(category, search),
        is_fallback: true,
      });
    }

    const hasLegacyRows =
      Array.isArray(data) &&
      data.some((row: any) => typeof row.id === 'string' && row.id.startsWith('prod-'));

    if (hasLegacyRows) {
      const migrated = await replaceLegacyWithDefaults();
      if (migrated) {
        const filteredMigrated = migrated.filter((p) => {
          const catMatch = !category || category === 'ALL' || p.category === category;
          const s = search?.toLowerCase();
          const searchMatch =
            !s ||
            p.title.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s);
          return catMatch && searchMatch;
        });
        return NextResponse.json({
          success: true,
          data: filteredMigrated,
          auto_migrated: true,
        });
      }
    }

    if (!data || data.length === 0) {
      if ((!category || category === 'ALL') && !search) {
        const seeded = await replaceLegacyWithDefaults();
        if (seeded) {
          return NextResponse.json({
            success: true,
            data: seeded,
            auto_seeded: true,
          });
        }
      }

      const { count } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true });

      if (!count || count === 0) {
        return NextResponse.json({
          success: true,
          data: filterDefaults(category, search),
          is_fallback: true,
        });
      }
    }

    const products = (data || []).map(enrichProduct);
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: true,
      data: DEFAULT_PRODUCTS,
      is_fallback: true,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      action,
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

    const validPin = process.env.ADMIN_PIN || '123456';
    if ((admin_pin || pin) !== validPin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid Admin PIN' },
        { status: 401 }
      );
    }

    if (action === 'SEED_DEFAULTS') {
      await supabase.from('products').delete().like('id', 'prod-%');
      const { data: seeded, error: seedError } = await supabase
        .from('products')
        .upsert(toSupabaseRows(DEFAULT_PRODUCTS), { onConflict: 'id' })
        .select();

      if (seedError) {
        return NextResponse.json(
          {
            success: false,
            error: `Supabase Seed Error: ${seedError.message}`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        seeded_count: seeded?.length || DEFAULT_PRODUCTS.length,
        message: `${seeded?.length || DEFAULT_PRODUCTS.length} produk original berhasil disinkronkan ke Supabase.`,
      });
    }

    if (!title || !category || !thumbnail_url) {
      return NextResponse.json(
        {
          success: false,
          error: 'Field judul, kategori, dan gambar thumbnail wajib diisi',
        },
        { status: 400 }
      );
    }

    const id = 'custom-' + Date.now();
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Math.floor(Math.random() * 1000);

    const techStackArray = Array.isArray(tech_stack)
      ? tech_stack
      : tech_stack
        ? tech_stack
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean)
        : [];

    const previewImagesArray =
      Array.isArray(preview_images) && preview_images.length > 0
        ? preview_images
        : [thumbnail_url];

    const { error } = await supabase
      .from('products')
      .insert([
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
        },
      ])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return NextResponse.json(
        {
          success: false,
          error: `Supabase Error: ${error.message}. Pastikan table 'products' sudah dibuat di Supabase.`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: { id, slug } });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
