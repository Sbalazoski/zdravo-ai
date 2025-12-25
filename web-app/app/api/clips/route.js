import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

// GET: Fetch clips
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = parseInt(searchParams.get('userId') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')
  const filter = searchParams.get('filter') // 'all', 'code', 'text'

  try {
    let result
    if (filter === 'code') {
      result = await sql`
        SELECT id, content, title, platform, url, metadata, 
               tags, is_code, language, created_at
        FROM clips
        WHERE user_id = ${userId}
          AND is_code = true
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    } else if (filter === 'text') {
      result = await sql`
        SELECT id, content, title, platform, url, metadata, 
               tags, is_code, language, created_at
        FROM clips
        WHERE user_id = ${userId}
          AND is_code = false
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    } else {
      // all clips
      result = await sql`
        SELECT id, content, title, platform, url, metadata, 
               tags, is_code, language, created_at
        FROM clips
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
    }

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
  const userId = parseInt(searchParams.get('userId') || '1')

  if (!clipId) {
    return NextResponse.json({ error: 'Clip ID required' }, { status: 400 })
  }

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
