"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StocksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 주식 검색 함수
  const searchStocks = async () => {
    if (!searchTerm.trim()) return

    try {
      setIsSearching(true)
      setError(null)

      const response = await fetch(`/api/stocks?keyword=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setSearchResults([])
      } else if (data.output && Array.isArray(data.output.block1)) {
        setSearchResults(data.output.block1)
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.error("검색 오류:", error)
      setError("검색 중 오류가 발생했습니다.")
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // 인기 종목 목록 (예시 데이터)
  const popularStocks = [
    { code: "005930", name: "삼성전자", price: 85600, change: 3400, changePercent: 4.14 },
    { code: "000660", name: "SK하이닉스", price: 176500, change: 5500, changePercent: 3.22 },
    { code: "035420", name: "NAVER", price: 216000, change: -4000, changePercent: -1.82 },
    { code: "035720", name: "카카오", price: 56800, change: -1200, changePercent: -2.07 },
    { code: "005380", name: "현대차", price: 245000, change: 7000, changePercent: 2.94 },
    { code: "051910", name: "LG화학", price: 542000, change: 12000, changePercent: 2.26 },
    { code: "373220", name: "LG에너지솔루션", price: 412000, change: -8000, changePercent: -1.9 },
    { code: "207940", name: "삼성바이오로직스", price: 825000, change: 15000, changePercent: 1.85 },
  ]

  // 업종별 종목 (예시 데이터)
  const sectorStocks = {
    tech: [
      { code: "005930", name: "삼성전자", sector: "전자/반도체" },
      { code: "000660", name: "SK하이닉스", sector: "전자/반도체" },
      { code: "066570", name: "LG전자", sector: "전자/가전" },
    ],
    finance: [
      { code: "105560", name: "KB금융", sector: "금융" },
      { code: "055550", name: "신한지주", sector: "금융" },
      { code: "086790", name: "하나금융지주", sector: "금융" },
    ],
    bio: [
      { code: "207940", name: "삼성바이오로직스", sector: "바이오/제약" },
      { code: "068270", name: "셀트리온", sector: "바이오/제약" },
      { code: "128940", name: "한미약품", sector: "바이오/제약" },
    ],
  }

  // 엔터 키 검색 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchStocks()
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">주식 종목</h1>

      {/* 검색 섹션 */}
      <div className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="종목명 또는 코드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-10"
            />
          </div>
          <Button onClick={searchStocks} disabled={isSearching}>
            <Search className="mr-2 h-4 w-4" />
            검색
          </Button>
        </div>

        {/* 검색 결과 */}
        {isSearching && <p className="mt-4 text-center">검색 중...</p>}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {!isSearching && searchResults.length > 0 && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>검색 결과</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {searchResults.map((stock, index) => (
                  <Link
                    href={`/stocks/${stock.mksc_shrn_iscd}`}
                    key={index}
                    className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
                  >
                    <div>
                      <p className="font-medium">{stock.hts_kor_isnm}</p>
                      <p className="text-xs text-muted-foreground">{stock.mksc_shrn_iscd}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">{stock.bstp_kor_isnm}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!isSearching && searchTerm && searchResults.length === 0 && !error && (
          <p className="mt-4 text-center">검색 결과가 없습니다.</p>
        )}
      </div>

      {/* 인기 종목 */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold">인기 종목</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {popularStocks.map((stock) => (
            <Link href={`/stocks/${stock.code}`} key={stock.code}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-xs text-muted-foreground">{stock.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₩{stock.price.toLocaleString("ko-KR")}</p>
                      <div
                        className={`flex items-center justify-end text-xs ${
                          stock.changePercent >= 0 ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {stock.changePercent >= 0 ? (
                          <ArrowUp className="mr-1 h-3 w-3" />
                        ) : (
                          <ArrowDown className="mr-1 h-3 w-3" />
                        )}
                        <span>{Math.abs(stock.change).toLocaleString("ko-KR")}</span>
                        <span className="ml-1">({Math.abs(stock.changePercent).toFixed(2)}%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* 업종별 종목 */}
      <div>
        <h2 className="mb-4 text-xl font-bold">업종별 종목</h2>
        <Tabs defaultValue="tech">
          <TabsList className="mb-4">
            <TabsTrigger value="tech">전자/IT</TabsTrigger>
            <TabsTrigger value="finance">금융</TabsTrigger>
            <TabsTrigger value="bio">바이오/제약</TabsTrigger>
          </TabsList>

          <TabsContent value="tech">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sectorStocks.tech.map((stock) => (
                <Link href={`/stocks/${stock.code}`} key={stock.code}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-xs text-muted-foreground">{stock.code}</p>
                      <p className="mt-1 text-xs">{stock.sector}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="finance">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sectorStocks.finance.map((stock) => (
                <Link href={`/stocks/${stock.code}`} key={stock.code}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-xs text-muted-foreground">{stock.code}</p>
                      <p className="mt-1 text-xs">{stock.sector}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bio">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {sectorStocks.bio.map((stock) => (
                <Link href={`/stocks/${stock.code}`} key={stock.code}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-xs text-muted-foreground">{stock.code}</p>
                      <p className="mt-1 text-xs">{stock.sector}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
