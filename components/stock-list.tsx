"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Generate mock stock data based on type
const generateMockStocks = (type: string) => {
  const stocks = []
  const isGainer = type === "gainers"

  for (let i = 1; i <= 5; i++) {
    const changePercent = isGainer ? (Math.random() * 10 + 1).toFixed(2) : (-Math.random() * 10 - 1).toFixed(2)

    const price = (Math.random() * 100000 + 10000).toFixed(0)
    const change = ((Number.parseFloat(price) * Number.parseFloat(changePercent)) / 100).toFixed(0)
    const volume = Math.floor(Math.random() * 10000000) + 100000

    stocks.push({
      id: i,
      code: `${isGainer ? "G" : "L"}${i.toString().padStart(3, "0")}`,
      name: `${isGainer ? "상승" : "하락"}주식 ${i}`,
      price: Number.parseFloat(price),
      change: Number.parseFloat(change),
      changePercent: Number.parseFloat(changePercent),
      volume,
    })
  }

  // For volume type, mix gainers and losers
  if (type === "volume") {
    return stocks.map((stock) => ({
      ...stock,
      code: `V${stock.id.toString().padStart(3, "0")}`,
      name: `거래량주식 ${stock.id}`,
      changePercent: Math.random() > 0.5 ? Math.abs(stock.changePercent) : -Math.abs(stock.changePercent),
      volume: stock.volume * 10,
    }))
  }

  return stocks
}

interface StockListProps {
  title?: string
  type: "gainers" | "losers" | "volume"
  showVolume?: boolean
}

export default function StockList({ title, type, showVolume = false }: StockListProps) {
  const [stocks, setStocks] = useState<any[]>([])

  // useEffect를 추가하여 클라이언트 사이드에서만 데이터를 생성
  useEffect(() => {
    setStocks(generateMockStocks(type))
  }, [type])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const isGainer = type === "gainers" || (type === "volume" && Math.random() > 0.5)
          const changePercentDelta = (Math.random() * 0.5).toFixed(2)

          let newChangePercent = Number.parseFloat(stock.changePercent.toString())

          if (isGainer) {
            newChangePercent += Number.parseFloat(changePercentDelta)
          } else {
            newChangePercent -= Number.parseFloat(changePercentDelta)
          }

          const newChange = ((stock.price * newChangePercent) / 100).toFixed(0)

          return {
            ...stock,
            change: Number.parseFloat(newChange),
            changePercent: newChangePercent,
            volume: type === "volume" ? stock.volume + Math.floor(Math.random() * 100000) : stock.volume,
          }
        }),
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [type])

  if (stocks.length === 0) {
    return (
      <Card>
        {title && (
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex animate-pulse items-center justify-between rounded-md p-2">
                <div>
                  <div className="h-5 w-24 rounded bg-muted"></div>
                  <div className="mt-1 h-3 w-16 rounded bg-muted"></div>
                </div>
                <div className="text-right">
                  <div className="h-5 w-20 rounded bg-muted"></div>
                  <div className="mt-1 h-3 w-16 rounded bg-muted"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-2">
          {stocks.map((stock) => (
            <Link
              href={`/stocks/${stock.code}`}
              key={stock.id}
              className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">{stock.name}</p>
                <p className="text-xs text-muted-foreground">{stock.code}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">₩{stock.price.toLocaleString("ko-KR")}</p>
                <div
                  className={`flex items-center justify-end text-xs ${stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {stock.changePercent >= 0 ? (
                    <ArrowUp className="mr-1 h-3 w-3" />
                  ) : (
                    <ArrowDown className="mr-1 h-3 w-3" />
                  )}
                  <span>{Math.abs(stock.change).toLocaleString("ko-KR")}</span>
                  <span className="ml-1">({Math.abs(stock.changePercent).toFixed(2)}%)</span>
                </div>
                {showVolume && (
                  <p className="mt-1 text-xs text-muted-foreground">거래량: {stock.volume.toLocaleString("ko-KR")}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
