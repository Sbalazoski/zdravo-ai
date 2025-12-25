```javascript
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

// GET: Fetch clips
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId') || 1
  const limit = parseInt(searchParams.get('limit') || '50')
  const filter = searchParams.get('filter') // 'all', 'code', 'text'
  
  try {
    let query = sql`
      SELECT id, content, title, platform, url, metadata, 
             tags, is_code, language, created_at
      FROM clips
      WHERE user_id = ${userId}
    `
    
    if (filter === 'code') {
      query = sql`${query} AND is_code = true`
    } else if (filter === 'text') {
      query = sql`${query} AND is_code = false`
    }
    
    query = sql`
      ${query}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    
    const result = await query
    
    return NextResponse.json({
      clips: result.rows,
      count: result.rows.length
    })
    
  } catch (error) {
    console.error('Fetch clips error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clips' },
      { status: 500 }
    )
  }
}

// DELETE: Remove clip
export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const clipId = searchParams.get('id')
  const userId = searchParams.get('userId') || 1
  
  try {
    await sql`
      DELETE FROM clips
      WHERE id = ${clipId} AND user_id = ${userId}
    `
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Delete clip error:', error)
    return NextResponse.json(
      { error: 'Failed to delete clip' },
      { status: 500 }
    )
  }
}
```