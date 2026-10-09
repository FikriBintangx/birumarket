import { NextRequest, NextResponse } from 'next/server';
import client, { initDb } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    await initDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = "SELECT * FROM products WHERE status = 'ACTIVE'";
    const args: any[] = [];

    if (category && category !== 'ALL') {
      query += ' AND category = ?';
      args.push(category);
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      args.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const res = await client.execute({ sql: query, args });
    
    // Parse json fields
    const products = res.rows.map((row: any) => ({
      ...row,
      tech_stack: JSON.parse(row.tech_stack || '[]'),
      preview_images: JSON.parse(row.preview_images || '[]'),
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
    await initDb();
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
    } = body;

    // Simple security PIN check (Default PIN: 123456 or env ADMIN_PIN)
    const validPin = process.env.ADMIN_PIN || '123456';
    if (admin_pin !== validPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    if (!title || !category || !thumbnail_url) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const id = 'prod-' + Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);

    const techStackJson = JSON.stringify(Array.isArray(tech_stack) ? tech_stack : (tech_stack ? tech_stack.split(',').map((s: string) => s.trim()) : []));
    const previewImagesJson = JSON.stringify(Array.isArray(preview_images) ? preview_images : [thumbnail_url]);

    await client.execute({
      sql: `INSERT INTO products (id, title, slug, category, tech_stack, price, is_portfolio, thumbnail_url, preview_images, demo_url, github_url, description, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE')`,
      args: [
        id,
        title,
        slug,
        category,
        techStackJson,
        Number(price) || 0,
        is_portfolio ? 1 : 0,
        thumbnail_url,
        previewImagesJson,
        demo_url || '',
        github_url || '',
        description || '',
      ],
    });

    return NextResponse.json({ success: true, data: { id, slug } });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
