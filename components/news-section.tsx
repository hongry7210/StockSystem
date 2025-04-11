import Link from "next/link"
import { Newspaper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock news data
const mockNews = [
  {
    id: 1,
    title: "중앙은행, 기준금리 동결 결정",
    source: "경제신문",
    time: "1시간 전",
    url: "/news/1",
  },
  {
    id: 2,
    title: "반도체 업계, 올해 실적 전망 상향 조정",
    source: "테크뉴스",
    time: "3시간 전",
    url: "/news/2",
  },
  {
    id: 3,
    title: "글로벌 공급망 이슈, 자동차 업계 영향",
    source: "산업일보",
    time: "5시간 전",
    url: "/news/3",
  },
  {
    id: 4,
    title: "신규 상장 기업 첫날 거래량 급증",
    source: "증권정보",
    time: "6시간 전",
    url: "/news/4",
  },
  {
    id: 5,
    title: "국제 유가 상승세, 에너지주 강세",
    source: "글로벌마켓",
    time: "8시간 전",
    url: "/news/5",
  },
]

export default function NewsSection() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Newspaper className="mr-2 h-5 w-5" />
          최신 뉴스
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNews.map((news) => (
            <Link href={news.url} key={news.id} className="block rounded-md p-2 transition-colors hover:bg-muted">
              <h3 className="font-medium">{news.title}</h3>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <span>{news.time}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link href="/news" className="text-sm font-medium text-primary hover:underline">
            모든 뉴스 보기
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
