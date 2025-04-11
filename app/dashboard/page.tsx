import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle, Bell, Settings, LineChart, PieChart, BarChart3, ArrowUp, ArrowDown } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">대시보드</h1>
          <p className="text-muted-foreground">나만의 주식 포트폴리오를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            알림
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            설정
          </Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            종목 추가
          </Button>
        </div>
      </div>
      
      {/* Portfolio Summary */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 자산 가치</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩12,458,000</div>
            <p className="text-xs text-green-500">+2.4% 오늘</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 수익</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩1,245,600</div>
            <p className="text-xs text-green-500">+11.2% 전체</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">보유 종목 수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">다양한 업종</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Portfolio Tabs */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="holdings">보유 종목</TabsTrigger>
          <TabsTrigger value="performance">성과 분석</TabsTrigger>
          <TabsTrigger value="alerts">알림 설정</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>포트폴리오 가치 추이</CardTitle>
                <CardDescription>최근 6개월 동안의 포트폴리오 가치 변화</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg border bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">로그인하여 포트폴리오 차트를 확인하세요</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>자산 배분</CardTitle>
                <CardDescription>업종별 투자 비중</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-lg border bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex h-full items-center justify-center">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">로그인하여 자산 배분을 확인하세요</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>수익률 분석</CardTitle>
                <CardDescription>종목별 수익률 비교</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-lg border bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex h-full items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">로그인하여 수익률을 확인하세요</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="holdings">
          <Card>
            <CardHeader>
              <CardTitle>보유 종목 목록</CardTitle>
              <CardDescription>현재 보유 중인 모든 주식 종목</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b bg-muted/50 p-3 text-sm font-medium">
                  <div>종목명</div>
                  <div className="text-right">현재가</div>
                  <div className="text-right">평균단가</div>
                  <div className="text-right">수량</div>
                  <div className="text-right">수익률</div>
                </div>
                {[
                  { name: "삼성전자", code: "005930", price: 85600, avgPrice: 78400, quantity: 50, returnRate: 9.18 },
                  { name: "SK하이닉스", code: "000660", price: 176500, avgPrice: 145000, quantity: 20, returnRate: 21.72 },
                  { name: "NAVER", code: "035420", price: 216000, avgPrice: 224000, quantity: 10, returnRate: -3.57 },
                  { name: "카카오", code: "035720", price: 56800, avgPrice: 62000, quantity: 30, returnRate: -8.39 },
                  { name: "현대차", code: "005380", price: 245000, avgPrice: 210000, quantity: 15, returnRate: 16.67 }
                ].map((stock, index) => (
                  <div key={index} className="grid grid-cols-5 border-b p-3 text-sm last:border-0">
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-xs text-muted-foreground">{stock.code}</div>
                    </div>
                    <div className="text-right">₩{stock.price.toLocaleString('ko-KR')}</div>
                    <div className="text-right">₩{stock.avgPrice.toLocaleString('ko-KR')}</div>
                    <div className="text-right">{stock.quantity.toLocaleString('ko-KR')}주</div>
                    <div className={`flex items-center justify-end ${stock.returnRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.returnRate >= 0 ? (
                        <ArrowUp className="mr-1 h-3 w-3" />
                      ) : (
                        <ArrowDown className="mr-1 h-3 w-3" />
                      )}
                      {Math.abs(stock.returnRate).toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  종목 추가
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="rounded-lg border p-6 text-center">
            <LineChart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">성과 분석</h3>
            <p className="mt-2 text-muted-foreground">
              포트폴리오 성과 분석을 확인하려면 로그인이 필요합니다.
            </p>
            <Button className="mt-4">로그인</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="alerts">
          <div className="rounded-lg border p-6 text-center">
            <Bell className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">알림 설정</h3>
            <p className="mt-2 text-muted-foreground">
              가격 변동 및 특정 이벤트에 대한 알림을 설정하려면 로그인이 필요합니다.
            </p>
            <Button className="mt-4">로그인</Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Recommendations */}
      <div>
        <h2 className="mb\
