import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const candidate = body?.pin;

    if (typeof candidate !== 'string' || candidate.length === 0) {
      return NextResponse.json(
        { success: false, error: 'PIN tidak valid' },
        { status: 400 }
      );
    }

    const envPin = process.env.ADMIN_PIN;
    const validPin = (envPin && envPin !== '123456') ? envPin : 'BiruMarket7F3A#Secure2026';
    const candidateDigest = crypto.createHash('sha256').update(candidate).digest();
    const validDigest = crypto.createHash('sha256').update(validPin).digest();

    const isMatch = crypto.timingSafeEqual(candidateDigest, validDigest);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, error: 'PIN Rahasia salah. Akses ditolak.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Akses terverifikasi.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
