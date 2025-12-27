import { sql } from '@vercel/postgres'
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// POST: Search clips
export async function POST(request) {
  try {
    const { query, userId } = await request.json()
    const uid = userId || 1

    const isPro = await checkIfPro(uid)

    let result

    if (!isPro) {
      // Free tier: Basic keyword search
      result = await sql`
        SELECT *
        FROM clips
        WHERE user_id = ${uid}
          AND (
            content ILIKE ${'%' + query + '%'}
            OR title ILIKE ${'%' + query + '%'}
          )
        ORDER BY created_at DESC
        LIMIT 20
      `

      return NextResponse.json({
        results: result.rows,
        type: 'keyword'
      })
    }

    // Pro tier: Semantic search using embeddings
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query
    })

    const embeddingArray = embeddingResponse.data[0].embedding

    // Vector similarity search using pgvector in Postgres
    result = await sql`
      SELECT *,
             embedding <-> ${embeddingArray}::vector AS distance
      FROM clips
      WHERE user_id = ${uid}
        AND embedding IS NOT NULL
      ORDER BY distance
      LIMIT 20
    `

    return NextResponse.json({
      results: result.rows,
      type: 'semantic'
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}

// Helper: Check if user is on Pro or Team plan
async function checkIfPro(userId) {
  const result = await sql`SELECT plan FROM users WHERE id = ${userId}`
  const plan = result.rows[0]?.plan || 'free'
  return plan === 'pro' || plan === 'team'
}
