import { NextResponse } from "next/server"
import { getAccessToken } from "@/lib/api/kis-api"

export async function GET() {
  try {
    // 토큰 발급 테스트
    const accessToken = await getAccessToken()

    return NextResponse.json({
      success: true,
      message: "API 연결 성공",
      accessToken: accessToken.substring(0, 10) + "...", // 보안을 위해 일부만 표시
    })
  } catch (error: any) {
    console.error("API 테스트 오류:", error)
    return NextResponse.json(
      {
        success: false,
        message: "API 연결 실패",
        error: error.message || "알 수 없는 오류",
      },
      { status: 500 },
    )
  }
}
