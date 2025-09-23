import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Please upload image files only' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size cannot exceed 5MB' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Date.now()
    const ext = path.extname(file.name)
    const filename = `upload-${timestamp}${ext}`
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'general')
    await mkdir(uploadDir, { recursive: true })
    
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)
    
    const imageUrl = `/uploads/general/${filename}`
    
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
