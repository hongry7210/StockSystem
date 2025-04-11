import axios from "axios"

// 환경 변수에서 API 키 가져오기
const APP_KEY = process.env.NEXT_PUBLIC_KIS_APP_KEY
const APP_SECRET = process.env.NEXT_PUBLIC_KIS_APP_SECRET
const BASE_URL = process.env.NEXT_PUBLIC_KIS_API_URL || "https://openapi.koreainvestment.com:9443"

// API 클라이언트 생성
const kisClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// 접근 토큰 발급 함수
export async function getAccessToken() {
  try {
    const response = await kisClient.post("/oauth2/tokenP", {
      grant_type: "client_credentials",
      appkey: APP_KEY,
      appsecret: APP_SECRET,
    })

    return response.data.access_token
  } catch (error) {
    console.error("토큰 발급 오류:", error)
    throw error
  }
}

// 주식 시세 조회 함수 (REST API)
export async function getStockPrice(stockCode: string) {
  try {
    const token = await getAccessToken()

    const response = await kisClient.get("/uapi/domestic-stock/v1/quotations/inquire-price", {
      headers: {
        Authorization: `Bearer ${token}`,
        appkey: APP_KEY,
        appsecret: APP_SECRET,
        tr_id: "FHKST01010100", // 주식 현재가 시세 조회 TR
      },
      params: {
        fid_cond_mrkt_div_code: "J", // 시장 구분 (J: 주식)
        fid_input_iscd: stockCode, // 종목코드
      },
    })

    return response.data
  } catch (error) {
    console.error("주식 시세 조회 오류:", error)
    throw error
  }
}

// 주식 종목 검색 함수
export async function searchStocks(keyword: string) {
  try {
    const token = await getAccessToken()

    const response = await kisClient.get("/uapi/domestic-stock/v1/quotations/search-stock", {
      headers: {
        Authorization: `Bearer ${token}`,
        appkey: APP_KEY,
        appsecret: APP_SECRET,
        tr_id: "CTPF1002R", // 종목 검색 TR
      },
      params: {
        search_text: keyword,
      },
    })

    return response.data
  } catch (error) {
    console.error("종목 검색 오류:", error)
    throw error
  }
}

export default {
  getAccessToken,
  getStockPrice,
  searchStocks,
}
