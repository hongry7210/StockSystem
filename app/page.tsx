import Link from "next/link"
import { Search } from "lucide-react"
import MarketSummary from "@/components/market-summary"
import StockList from "@/components/stock-list"
import TrendingStocks from "@/components/trending-stocks"
import NewsSection from "@/components/news-section"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      {/* Hero Banner */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
        <h1 className="mb-2 text-3xl font-bold">실시간 주식 시장 정보</h1>
        <p className="mb-4 text-slate-300">최신 주식 데이터와 금융 정보를 한눈에 확인하세요</p>
        <div className="relative">
          <input
            type="text"
            placeholder="종목명 또는 코드 검색..."
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 pr-10 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
        </div>
      </div>

      {/* Market Summary */}
      <MarketSummary />

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Top Movers */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-bold">실시간 시장 동향</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <StockList title="상승 종목" type="gainers" />
            <StockList title="하락 종목" type="losers" />
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">거래량 상위</h2>
            <StockList title="거래량 상위" type="volume" showVolume={true} />
          </div>
        </div>

        {/* Right Column - News & Trending */}
        <div className="space-y-6">
          <TrendingStocks />
          <NewsSection />
        </div>
      </div>

      {/* Featured Section */}
      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">추천 종목</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Link
              href={`/stocks/STOCK${item}`}
              key={item}
              className="rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">추천 종목 {item}</h3>
                  <p className="text-sm text-muted-foreground">분석가 추천</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₩{(Math.random() * 100000).toFixed(0)}</p>
                  <p className={`text-sm ${Math.random() > 0.5 ? "text-green-500" : "text-red-500"}`}>
                    {Math.random() > 0.5 ? "+" : "-"}
                    {(Math.random() * 5).toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
