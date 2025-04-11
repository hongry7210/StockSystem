"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Mock market indices data
const mockIndices = [
  { id: 1, name: "KOSPI", value: 2950.32, change: 15.23, changePercent: 0.52 },
  { id: 2, name: "KOSDAQ", value: 950.18, change: -5.67, changePercent: -0.59 },
  { id: 3, name: "S&P 500", value: 4780.94, change: 23.45, changePercent: 0.49 },
  { id: 4, name: "NASDAQ", value: 16832.78, change: 120.87, changePercent: 0.72 },
  { id: 5, name: "DOW", value: 38450.45, change: -78.32, changePercent: -0.2 },
]

export default function MarketSummary() {
  const [indices, setIndices] = useState<any[]>([])

  // useEffect를 추가하여 클라이언트 사이드에서만 데이터를 생성
  useEffect(() => {
    setIndices(mockIndices)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prevIndices) =>
        prevIndices.map((index) => {
          const changeValue = (Math.random() * 10 - 5).toFixed(2)
          const newValue = (Number.parseFloat(index.value) + Number.parseFloat(changeValue)).toFixed(2)
          const newChangePercent = ((Number.parseFloat(changeValue) / Number.parseFloat(index.value)) * 100).toFixed(2)

          return {
            ...index,
            value: Number.parseFloat(newValue),
            change: Number.parseFloat(changeValue),
            changePercent: Number.parseFloat(newChangePercent),
          }
        }),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  if (indices.length === 0) {
    return (
      <div className="overflow-x-auto">
        <div className="flex min-w-max space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="w-48 flex-shrink-0">
              <CardContent className="p-4">
                <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
                <div className="mt-1 h-6 w-24 animate-pulse rounded bg-muted"></div>
                <div className="mt-1 h-4 w-20 animate-pulse rounded bg-muted"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max space-x-4">
        {indices.map((index) => (
          <Card key={index.id} className="w-48 flex-shrink-0">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground">{index.name}</h3>
              <p className="mt-1 text-xl font-bold">
                {index.value.toLocaleString("ko-KR", { minimumFractionDigits: 2 })}
              </p>
              <div
                className={`mt-1 flex items-center text-sm ${index.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {index.change >= 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                <span>{Math.abs(index.change).toLocaleString("ko-KR", { minimumFractionDigits: 2 })}</span>
                <span className="ml-1">({Math.abs(index.changePercent).toFixed(2)}%)</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
