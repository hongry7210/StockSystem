// components/stock-websocket.tsx
"use client"

import { useEffect, useState } from 'react';
import { connectWebSocket, subscribeStockPrice, unsubscribeStockPrice, closeWebSocket } from '@/lib/api/websocket';

interface StockWebSocketProps {
  stockCode: string;
  onStockUpdate: (stockData: any) => void;
}

export default function StockWebSocket({ stockCode, onStockUpdate }: StockWebSocketProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // 접근 토큰 가져오기
  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch('/api/auth');
        const data = await response.json();
        
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        } else {
          setError('토큰을 가져올 수 없습니다.');
        }
      } catch (error) {
        console.error('토큰 가져오기 오류:', error);
        setError('토큰 가져오기 실패');
      }
    }
    
    fetchAccessToken();
  }, []);
  
  // WebSocket 연결 및 구독
  useEffect(() => {
    if (!accessToken || !stockCode) return;
    
    // WebSocket 메시지 처리 함수
    const handleWebSocketMessage = (data: any) => {
      if (data.type === 'stockPrice' && data.data && data.data.length > 0) {
        // 주식 데이터 업데이트
        onStockUpdate(data.data[0]);
      }
    };
    
    // WebSocket 연결
    const socket = connectWebSocket(accessToken, handleWebSocketMessage);
    
    if (socket) {
      // 연결 상태 업데이트
      setIsConnected(true);
      
      // 주식 시세 구독
      subscribeStockPrice(stockCode, accessToken);
    }
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      if (accessToken && stockCode) {
        unsubscribeStockPrice(stockCode, accessToken);
      }
      closeWebSocket();
      setIsConnected(false);
    };
  }, [accessToken, stockCode, onStockUpdate]);
  
  return (
    <div className="hidden">
      {/* 상태 표시 (필요시 UI에 표시) */}
      {isConnected ? '연결됨' : '연결 중...'}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}