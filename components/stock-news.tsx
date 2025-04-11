import { Card, CardContent } from "@/components/ui/card"

interface StockNewsProps {
  stockCode: string
}

// Mock news data related to a specific stock
const generateMockNews = (stockCode: string) => {
  return [
    {
      id: 1,
      title: `${stockCode} 주식회사, 신규 사업 진출 발표`,
      content: `${stockCode} 주식회사가 신규 사업 진출을 발표했습니다. 이번 발표는 회사의 장기적인 성장 전략의 일환으로, 기존 사업과의 시너지 효과가 기대됩니다.`,
      source: "경제신문",
      date: "2023-04-10",
      time: "09:30",
    },
    {
      id: 2,
      title: `${stockCode} 주식회사, 분기 실적 발표 예정`,
      content: `${stockCode} 주식회사가 다음 주 분기 실적을 발표할 예정입니다. 시장 전문가들은 전년 동기 대비 매출 증가를 예상하고 있습니다.`,
      source: "증권정보",
      date: "2023-04-09",
      time: "14:15",
    },
    {
      id: 3,
      title: `${stockCode} 주식회사, 신제품 출시로 주가 상승`,
      content: `${stockCode} 주식회사가 혁신적인 신제품을 출시하면서 주가가 상승했습니다. 이번 제품은 시장에서 큰 관심을 받고 있으며, 회사의 경쟁력 강화에 기여할 것으로 보입니다.`,
      source: "테크뉴스",
      date: "2023-04-08",
      time: "11:45",
    },
    {
      id: 4,
      title: `${stockCode} 주식회사, 해외 시장 진출 확대`,
      content: `${stockCode} 주식회사가 해외 시장 진출을 확대한다고 발표했습니다. 이번 결정은 글로벌 시장에서의 입지를 강화하기 위한 전략적 움직임으로 평가받고 있습니다.`,
      source: "글로벌마켓",
      date: "2023-04-07",
      time: "16:20",
    },
    {
      id: 5,
      title: `${stockCode} 주식회사, 신규 임원 영입`,
      content: `${stockCode} 주식회사가 업계 전문가를 신규 임원으로 영입했습니다. 이번 인사는 회사의 혁신 역량을 강화하고 새로운 성장 동력을 확보하기 위한 조치로 해석됩니다.`,
      source: "비즈니스저널",
      date: "2023-04-06",
      time: "10:00",
    },
  ]
}

export default function StockNews({ stockCode }: StockNewsProps) {
  const news = generateMockNews(stockCode)

  return (
    <div className="space-y-4">
      {news.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.content}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.source}</span>
              <span>
                {item.date} {item.time}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
