import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const bucket = (formData.get('bucket') as string) || 'catalog';

    if (!file) {
      return NextResponse.json({ success: false, error: 'File tidak ditemukan' }, { status: 400 });
    }

    // Generate safe unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${cleanFileName}`;
    const filePath = `uploads/${fileName}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type || 'image/png',
        upsert: true,
      });

    if (error) {
      console.error('Supabase Storage Upload Error:', error);
      return NextResponse.json({ 
        success: false, 
        error: `Supabase Storage error: ${error.message}. Pastikan bucket '${bucket}' sudah dibuat di Supabase.` 
      }, { status: 500 });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      path: filePath,
      fileName: file.name,
      size: file.size,
    });
  } catch (err: any) {
    console.error('Upload API Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
