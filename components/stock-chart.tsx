"use client"

import { useEffect, useRef } from "react"

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
  time?: string
}

interface StockChartProps {
  stockCode: string
  stockData?: StockData // stockData를 선택적 prop으로 변경
}

export default function StockChart({ stockCode, stockData }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate mock stock price data
  const generateMockData = () => {
    const data = []
    let price = stockData?.price || 85000 + Math.random() * 5000

    for (let i = 0; i < 30; i++) {
      price = price + (Math.random() * 2000 - 1000)
      if (price < 75000) price = 75000 + Math.random() * 2000
      if (price > 95000) price = 95000 - Math.random() * 2000

      data.push(price)
    }

    return data
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Generate data
    const priceData = generateMockData()

    // Calculate min and max for scaling
    const minPrice = Math.min(...priceData) * 0.99
    const maxPrice = Math.max(...priceData) * 1.01
    const priceRange = maxPrice - minPrice

    // Draw chart
    const drawChart = () => {
      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Draw grid lines
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 1

      // Horizontal grid lines
      const gridCount = 5
      for (let i = 0; i <= gridCount; i++) {
        const y = rect.height * (i / gridCount)

        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(rect.width, y)
        ctx.stroke()

        // Price labels
        const price = maxPrice - priceRange * (i / gridCount)
        ctx.fillStyle = "#6b7280"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(`₩${Math.round(price).toLocaleString("ko-KR")}`, 10, y - 5)
      }

      // Draw price line
      ctx.strokeStyle = "#2563eb"
      ctx.lineWidth = 2
      ctx.beginPath()

      priceData.forEach((price, index) => {
        const x = (index / (priceData.length - 1)) * rect.width
        const y = rect.height - ((price - minPrice) / priceRange) * rect.height

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Fill area under the line
      ctx.lineTo(rect.width, rect.height)
      ctx.lineTo(0, rect.height)
      ctx.closePath()
      ctx.fillStyle = "rgba(37, 99, 235, 0.1)"
      ctx.fill()

      // Draw date labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      const dateLabels = ["1일 전", "1주일 전", "2주일 전", "3주일 전", "1개월 전"]
      dateLabels.forEach((label, index) => {
        const x = rect.width * (index / (dateLabels.length - 1))
        ctx.fillText(label, x, rect.height - 10)
      })
    }

    drawChart()

    // Handle window resize
    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect()
      canvas.width = newRect.width * dpr
      canvas.height = newRect.height * dpr
      ctx.scale(dpr, dpr)

      canvas.style.width = `${newRect.width}px`
      canvas.style.height = `${newRect.height}px`

      drawChart()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [stockCode, stockData])

  return <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />
}
