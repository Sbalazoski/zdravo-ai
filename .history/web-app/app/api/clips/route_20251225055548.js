import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 1

    // Query the clips table
    const result = await sql`
      SELECT 
        id, content, title, platform, url, metadata,
        tags, is_code, language, created_at
      FROM clips
      WHERE user_id = ${userId}
    `

    return NextResponse.json({ clips: result.rows })
  } catch (error) {
    console.error('Error fetching clips:', error)
    return NextResponse.error()
  }
}
