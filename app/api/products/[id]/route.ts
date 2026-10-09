import { NextRequest, NextResponse } from 'next/server';
import client from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const pin = searchParams.get('pin');

    const validPin = process.env.ADMIN_PIN || '123456';
    if (pin !== validPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    await client.execute({
      sql: 'DELETE FROM products WHERE id = ?',
      args: [id],
    });

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      category,
      tech_stack,
      price,
      is_portfolio,
      thumbnail_url,
      demo_url,
      github_url,
      description,
      status,
      admin_pin,
    } = body;

    const validPin = process.env.ADMIN_PIN || '123456';
    if (admin_pin !== validPin) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid Admin PIN' }, { status: 401 });
    }

    const techStackJson = JSON.stringify(Array.isArray(tech_stack) ? tech_stack : (tech_stack ? tech_stack.split(',').map((s: string) => s.trim()) : []));

    await client.execute({
      sql: `UPDATE products SET 
              title = ?, category = ?, tech_stack = ?, price = ?, is_portfolio = ?,
              thumbnail_url = ?, demo_url = ?, github_url = ?, description = ?, status = ?
            WHERE id = ?`,
      args: [
        title,
        category,
        techStackJson,
        Number(price) || 0,
        is_portfolio ? 1 : 0,
        thumbnail_url,
        demo_url,
        github_url,
        description,
        status || 'ACTIVE',
        id,
      ],
    });

    return NextResponse.json({ success: true, message: 'Product updated' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
