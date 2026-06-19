import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';
import { NextRequest, NextResponse } from 'next/server';

const handler = NextAuth(authOptions);

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  return handler(req, context);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: NextRequest, context: any) {
  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  return handler(req, context);
}
