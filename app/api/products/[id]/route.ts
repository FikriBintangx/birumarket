import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

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
      preview_images,
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

    const techStackArray = Array.isArray(tech_stack)
      ? tech_stack
      : (tech_stack ? tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean) : []);

    const updateData: any = {
      title,
      category,
      tech_stack: techStackArray,
      price: Number(price) || 0,
      is_portfolio: Boolean(is_portfolio),
      thumbnail_url,
      demo_url: demo_url || '',
      github_url: github_url || '',
      description: description || '',
      status: status || 'ACTIVE',
      updated_at: new Date().toISOString(),
    };

    if (preview_images) {
      updateData.preview_images = Array.isArray(preview_images) ? preview_images : [thumbnail_url];
    }

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Product updated' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
