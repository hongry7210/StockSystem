// lib/api/websocket.ts
import CryptoJS from 'crypto-js';

// 환경 변수에서 API 키 가져오기
const APP_KEY = process.env.NEXT_PUBLIC_KIS_APP_KEY;
const APP_SECRET = process.env.NEXT_PUBLIC_KIS_APP_SECRET;
const WS_URL = process.env.NEXT_PUBLIC_KIS_WS_URL || 'ws://ops.koreainvestment.com:21000';

// WebSocket 연결 상태 및 데이터 저장
let socket: WebSocket | null = null;
let encryptKey: string | null = null;
let encryptIv: string | null = null;

// WebSocket 연결 함수
export function connectWebSocket(accessToken: string, onMessage: (data: any) => void) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log('WebSocket이 이미 연결되어 있습니다.');
    return socket;
  }
  
  // WebSocket 연결
  socket = new WebSocket(WS_URL);
  
  // 연결 이벤트 처리
  socket.onopen = () => {
    console.log('WebSocket 연결 성공');
  };
  
  // 메시지 수신 이벤트 처리
  socket.onmessage = (event) => {
    const data = event.data;
    const parsedData = parseWebSocketData(data);
    onMessage(parsedData);
  };
  
  // 오류 처리
  socket.onerror = (error) => {
    console.error('WebSocket 오류:', error);
  };
  
  // 연결 종료 처리
  socket.onclose = () => {
    console.log('WebSocket 연결 종료');
    socket = null;
  };
  
  return socket;
}

// 실시간 주식 시세 등록 함수
export function subscribeStockPrice(stockCode: string, accessToken: string) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('WebSocket이 연결되어 있지 않습니다.');
    return;
  }
  
  // 요청 데이터 생성
  const requestData = {
    header: {
      'content-type': 'text/plain',
      authorization: `Bearer ${accessToken}`,
      appkey: APP_KEY,
      appsecret: APP_SECRET,
      tr_id: 'H0STCNT0', // 국내주식 실시간체결가 TR ID
    },
    body: {
      input: {
        tr_id: 'H0STCNT0',
        tr_type: '1', // 1: 등록
        tr_count: '1', // 종목 개수
        tr_cont: 'N', // 연속 여부 (N: 일반)
        symbol_list: stockCode, // 종목코드
      }
    }
  };
  
  // WebSocket으로 데이터 전송
  socket.send(JSON.stringify(requestData));
}

// 실시간 주식 시세 해제 함수
export function unsubscribeStockPrice(stockCode: string, accessToken: string) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.error('WebSocket이 연결되어 있지 않습니다.');
    return;
  }
  
  // 요청 데이터 생성
  const requestData = {
    header: {
      'content-type': 'text/plain',
      authorization: `Bearer ${accessToken}`,
      appkey: APP_KEY,
      appsecret: APP_SECRET,
      tr_id: 'H0STCNT0',
    },
    body: {
      input: {
        tr_id: 'H0STCNT0',
        tr_type: '2', // 2: 해제
        tr_count: '1',
        tr_cont: 'N',
        symbol_list: stockCode,
      }
    }
  };
  
  // WebSocket으로 데이터 전송
  socket.send(JSON.stringify(requestData));
}

// WebSocket 연결 종료 함수
export function closeWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}

// WebSocket 데이터 파싱 함수
function parseWebSocketData(data: string) {
  try {
    // 초기 응답 처리 (JSON 형식)
    if (data.startsWith('{')) {
      const jsonData = JSON.parse(data);
      
      // 암호화 키와 IV 저장
      if (jsonData.body && jsonData.body.output) {
        encryptKey = jsonData.body.output.key;
        encryptIv = jsonData.body.output.iv;
      }
      
      return {
        type: 'init',
        data: jsonData
      };
    }
    
    // 실시간 데이터 처리 (|로 구분된 형식)
    const parts = data.split('|');
    
    // 암호화 여부 확인
    const isEncrypted = parts[0] === '1';
    const trId = parts[1]; // TR ID
    const dataCount = parseInt(parts[2], 10); // 데이터 건수
    
    // 데이터 파싱
    if (parts.length >= 4) {
      const rawData = parts[3];
      
      // 암호화된 데이터 복호화
      let processedData;
      if (isEncrypted && encryptKey && encryptIv) {
        processedData = decryptData(rawData, encryptKey, encryptIv);
      } else {
        processedData = rawData;
      }
      
      // 데이터 분할 (^로 구분)
      const dataItems = processedData.split('^');
      
      // 체결 데이터 처리 (H0STCNT0)
      if (trId === 'H0STCNT0') {
        const stockDataList = [];
        
        for (let i = 0; i < dataCount; i++) {
          const offset = i * 16; // 각 체결 데이터는 16개 필드로 구성
          
          if (dataItems.length >= offset + 16) {
            const stockData = {
              code: dataItems[offset + 0], // 종목코드
              time: dataItems[offset + 1], // 체결시간
              price: parseInt(dataItems[offset + 2], 10), // 현재가
              sign: dataItems[offset + 3], // 전일대비구분
              change: parseInt(dataItems[offset + 4], 10), // 전일대비
              changeRate: parseFloat(dataItems[offset + 5]), // 등락율
              volume: parseInt(dataItems[offset + 6], 10), // 체결량
              cumulativeVolume: parseInt(dataItems[offset + 7], 10), // 누적체결량
              marketStatus: dataItems[offset + 8], // 장구분
              marketStatusName: dataItems[offset + 9], // 장구분명
              high: parseInt(dataItems[offset + 10], 10), // 고가
              low: parseInt(dataItems[offset + 11], 10), // 저가
              open: parseInt(dataItems[offset + 12], 10), // 시가
              preClose: parseInt(dataItems[offset + 13], 10), // 전일종가
              askPrice: parseInt(dataItems[offset + 14], 10), // 매도호가
              bidPrice: parseInt(dataItems[offset + 15], 10), // 매수호가
            };
            
            stockDataList.push(stockData);
          }
        }
        
        return {
          type: 'stockPrice',
          trId,
          count: dataCount,
          data: stockDataList
        };
      }
    }
    
    return {
      type: 'unknown',
      rawData: data
    };
  } catch (error) {
    console.error('메시지 처리 오류:', error);
    return {
      type: 'error',
      error
    };
  }
}

// 암호화된 데이터 복호화 함수 (수정 버전)
function decryptData(encryptedData: string, key: string, iv: string) {
    // 키와 IV를 Base64 형식으로 파싱하여 WordArray로 변환
    const keyBytes = CryptoJS.enc.Base64.parse(key);
    const ivBytes = CryptoJS.enc.Base64.parse(iv);
    
    // 암호문(Base64 문자열)을 파싱 후, 완전한 CipherParams 객체 생성
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(encryptedData)
    });
    
    // 완전한 CipherParams 객체를 전달하여 복호화 수행
    const decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      keyBytes,
      { iv: ivBytes }
    );
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  