// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/api/kis-api';

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('토큰 발급 오류:', error);
    return NextResponse.json({ error: '토큰 발급 실패' }, { status: 500 });
  }
}