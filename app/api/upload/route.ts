import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 这里应该上传到云存储服务（如Cloudinary、AWS S3等）
    // 暂时返回一个模拟的URL
    const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`
    
    return NextResponse.json({ 
      success: true, 
      imageUrl: imageUrl,
      message: 'Image uploaded successfully' 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
