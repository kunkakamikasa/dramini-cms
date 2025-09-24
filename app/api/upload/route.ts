import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 调用API服务的Cloudflare上传端点
    const apiResponse = await fetch(`${process.env.API_BASE_URL}/upload/image`, {
      method: 'POST',
      body: formData
    })

    if (!apiResponse.ok) {
      throw new Error('API upload failed')
    }

    const result = await apiResponse.json()
    
    return NextResponse.json({ 
      success: true, 
      imageUrl: result.imageUrl,
      message: 'Image uploaded successfully' 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
