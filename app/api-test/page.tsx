"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testApiConnection = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/test")
      const data = await response.json()

      setResult(data)
    } catch (err: any) {
      console.error("API 테스트 오류:", err)
      setError(err.message || "알 수 없는 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">한국투자증권 API 테스트</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API 연결 테스트</CardTitle>
          <CardDescription>
            한국투자증권 API 연결을 테스트합니다. 토큰 발급이 성공하면 API가 정상적으로 작동하는 것입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={testApiConnection} disabled={loading}>
            {loading ? "테스트 중..." : "API 연결 테스트"}
          </Button>

          {result && (
            <div className="mt-4 rounded-md bg-slate-100 p-4 dark:bg-slate-800">
              <h3 className="mb-2 font-medium">테스트 결과:</h3>
              <pre className="overflow-auto text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-red-100 p-4 text-red-800 dark:bg-red-900 dark:text-red-200">
              <h3 className="mb-2 font-medium">오류 발생:</h3>
              <p>{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API 연동 가이드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">1. API 키 설정</h3>
            <p>
              프로젝트 루트에 <code>.env.local</code> 파일을 생성하고 다음 내용을 추가하세요:
            </p>
            <pre className="mt-2 overflow-auto rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">
              {`NEXT_PUBLIC_KIS_APP_KEY=your_app_key_here
NEXT_PUBLIC_KIS_APP_SECRET=your_app_secret_here
NEXT_PUBLIC_KIS_API_URL=https://openapi.koreainvestment.com:9443
NEXT_PUBLIC_KIS_WS_URL=ws://ops.koreainvestment.com:21000`}
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-medium">2. 필요한 패키지 설치</h3>
            <pre className="overflow-auto rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">
              {`npm install axios crypto-js
npm install --save-dev @types/crypto-js`}
            </pre>
          </div>

          <div>
            <h3 className="mb-2 font-medium">3. API 사용 예시</h3>
            <p>
              <code>lib/api/kis-api.ts</code> 파일에 있는 함수들을 사용하여 API를 호출할 수 있습니다.
            </p>
            <pre className="mt-2 overflow-auto rounded-md bg-slate-100 p-3 text-sm dark:bg-slate-800">
              {`// 토큰 발급
const token = await getAccessToken();

// 주식 시세 조회
const stockData = await getStockPrice('005930'); // 삼성전자

// 종목 검색
const searchResults = await searchStocks('삼성');`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
