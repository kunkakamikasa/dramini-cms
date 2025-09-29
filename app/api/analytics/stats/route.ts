import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'https://dramini-api.onrender.com/api/v1'
    const { searchParams } = new URL(req.url)
    
    // 验证必需参数
    if (!searchParams.get('startDate') || !searchParams.get('endDate')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required parameters',
          message: 'startDate and endDate are required' 
        },
        { status: 400 }
      )
    }

    const response = await fetch(`${apiBase}/analytics/stats?${searchParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-analytics-key': 'dramini2025'
      }
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Analytics stats API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics stats data',
        message: (error as Error).message 
      },
      { status: 500 }
    )
  }
}
