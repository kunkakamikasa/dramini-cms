import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import FormData from 'form-data'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // 直接上传到Cloudflare，绕过API服务
    const buffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)
    
    const cloudflareFormData = new FormData()
    cloudflareFormData.append('file', fileBuffer, {
      filename: file.name,
      contentType: file.type
    })

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN
    
    if (!accountId || !apiToken) {
      throw new Error('Cloudflare credentials not configured')
    }

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`,
      cloudflareFormData,
      {
        headers: {
          ...cloudflareFormData.getHeaders(),
          'Authorization': `Bearer ${apiToken}`,
        },
        timeout: 30000, // 30秒超时
        // 绕过代理
        proxy: false,
        httpsAgent: false,
        httpAgent: false
      }
    )

    if (response.data.success) {
      const imageUrl = response.data.result.variants[0]
      return NextResponse.json({ 
        success: true, 
        imageUrl: imageUrl,
        message: 'Image uploaded successfully' 
      })
    } else {
      throw new Error('Cloudflare upload failed')
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
