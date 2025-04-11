"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StockChart from "@/components/stock-chart"

interface StockData {
  code: string
  price: number
  change: number
  changeRate: number
  high: number
  low: number
  open: number
  preClose: number
  volume: number
  time: string
}

export default function StockDetailPage({ params }: { params: { code: string } }) {
  const { code } = params
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 임시 데이터 생성 (실제로는 API에서 가져와야 함)
  useEffect(() => {
    // 실제 API 연동 시 이 부분을 API 호출로 대체
    setTimeout(() => {
      setStockData({
        code: code,
        price: 85600,
        change: 3400,
        changeRate: 4.14,
        high: 86200,
        low: 82100,
        open: 82400,
        preClose: 82200,
        volume: 1245678,
        time: new Date().toISOString(),
      })
      setLoading(false)
    }, 500)
  }, [code])

  if (loading) {
    return <div className="container mx-auto px-4 py-6">로딩 중...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-6 text-red-500">{error}</div>
  }

  if (!stockData) {
    return <div className="container mx-auto px-4 py-6">주식 데이터를 찾을 수 없습니다.</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 주식 헤더 */}
      <div className="mb-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{code} 주식</h1>
            <p className="text-muted-foreground">
              {code} • 최종 업데이트: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div className="text-2xl font-bold md:text-3xl">₩{stockData.price.toLocaleString("ko-KR")}</div>
            <div className={`flex items-center text-sm ${stockData.change >= 0 ? "text-green-500" : "text-red-500"}`}>
              {stockData.change >= 0 ? <ArrowUp className="mr-1 h-4 w-4" /> : <ArrowDown className="mr-1 h-4 w-4" />}
              <span>{Math.abs(stockData.change).toLocaleString("ko-KR")}</span>
              <span className="ml-1">({Math.abs(stockData.changeRate).toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 주식 정보 카드 */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">시가</p>
            <p className="font-medium">₩{stockData.open.toLocaleString("ko-KR")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">고가</p>
            <p className="font-medium">₩{stockData.high.toLocaleString("ko-KR")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">저가</p>
            <p className="font-medium">₩{stockData.low.toLocaleString("ko-KR")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">전일 종가</p>
            <p className="font-medium">₩{stockData.preClose.toLocaleString("ko-KR")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">거래량</p>
            <p className="font-medium">{stockData.volume.toLocaleString("ko-KR")}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">실시간</p>
            <p className="flex items-center font-medium text-green-500">
              <Clock className="mr-1 h-3 w-3" /> 활성화됨
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 차트 및 정보 탭 */}
      <Tabs defaultValue="chart" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="chart">차트</TabsTrigger>
          <TabsTrigger value="news">뉴스</TabsTrigger>
          <TabsTrigger value="financials">재무정보</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">
          <div className="h-[400px] w-full rounded-lg border">
            <StockChart stockCode={code} stockData={stockData} />
          </div>
        </TabsContent>
        <TabsContent value="news">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">관련 뉴스</h3>
            <p className="mt-2 text-muted-foreground">이 종목에 대한 최신 뉴스가 여기에 표시됩니다.</p>
          </div>
        </TabsContent>
        <TabsContent value="financials">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-medium">재무정보</h3>
            <p className="mt-2 text-muted-foreground">이 종목의 재무정보가 여기에 표시됩니다.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
