"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { TrendingUp, ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock trending stocks data
const mockTrendingStocks = [
  { id: 1, code: "T001", name: "인기주식 1", price: 85000, change: 3400, changePercent: 4.17 },
  { id: 2, code: "T002", name: "인기주식 2", price: 45600, change: -1200, changePercent: -2.56 },
  { id: 3, code: "T003", name: "인기주식 3", price: 128900, change: 5600, changePercent: 4.54 },
  { id: 4, code: "T004", name: "인기주식 4", price: 32100, change: -800, changePercent: -2.43 },
  { id: 5, code: "T005", name: "인기주식 5", price: 67800, change: 2100, changePercent: 3.19 },
]

export default function TrendingStocks() {
  const [trendingStocks, setTrendingStocks] = useState<any[]>([])

  useEffect(() => {
    setTrendingStocks(mockTrendingStocks)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendingStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const changePercentDelta = (Math.random() * 1 - 0.5).toFixed(2)
          const newChangePercent = (
            Number.parseFloat(stock.changePercent) + Number.parseFloat(changePercentDelta)
          ).toFixed(2)
          const newChange = ((stock.price * Number.parseFloat(newChangePercent)) / 100).toFixed(0)

          return {
            ...stock,
            change: Number.parseFloat(newChange),
            changePercent: Number.parseFloat(newChangePercent),
          }
        }),
      )
    }, 7000) // Update every 7 seconds

    return () => clearInterval(interval)
  }, [])

  if (trendingStocks.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="mr-2 h-5 w-5" />
            인기 종목
          </CardTitle>
        </CardHeader>
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
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="mr-2 h-5 w-5" />
          인기 종목
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {trendingStocks.map((stock) => (
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
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
