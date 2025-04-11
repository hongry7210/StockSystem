// app/api/stocks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getStockPrice, searchStocks } from '@/lib/api/kis-api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const keyword = searchParams.get('keyword');
  
  try {
    if (code) {
      // 종목 코드로 주식 시세 조회
      const stockData = await getStockPrice(code);
      return NextResponse.json(stockData);
    } else if (keyword) {
      // 키워드로 종목 검색
      const searchResults = await searchStocks(keyword);
      return NextResponse.json(searchResults);
    } else {
      return NextResponse.json({ error: '코드 또는 키워드가 필요합니다.' }, { status: 400 });
    }
  } catch (error) {
    console.error('주식 정보 조회 오류:', error);
    return NextResponse.json({ error: '주식 정보 조회 실패' }, { status: 500 });
  }
}