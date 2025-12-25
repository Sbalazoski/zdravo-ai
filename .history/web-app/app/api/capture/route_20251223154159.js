## FILE 4: app/api/capture/route.js
```javascript
import { sql } from '@vercel/postgres'
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const { content, platform, url, timestamp, metadata, userId } = await request.json()
    
    // For MVP, use anonymous user if no userId
    const effectiveUserId = userId || 1 // Default anonymous user
    
    // Check usage limits based on plan
    const canCapture = await checkUsageLimit(effectiveUserId)
    if (!canCapture) {
      return NextResponse.json(
        { error: 'Usage limit reached. Upgrade to Pro!' },
        { status: 429 }
      )
    }
    
    // AI-powered title generation (Free tier: simple, Pro: AI)
    const title = await generateTitle(content, effectiveUserId)
    
    // AI-powered tagging (Pro feature)
    const tags = await generateTags(content, effectiveUserId)
    
    // Generate embeddings for semantic search (Pro feature)
    let embedding = null
    if (await isPro(effectiveUserId)) {
      embedding = await generateEmbedding(content)
    }
    
    // Save to database
    const result = await sql`
      INSERT INTO clips (
        user_id, content, title, platform, url, 
        metadata, tags, embedding, is_code, language
      ) VALUES (
        ${effectiveUserId},
        ${content},
        ${title},
        ${platform},
        ${url},
        ${JSON.stringify(metadata)},
        ${tags},
        ${embedding ? JSON.stringify(embedding) : null},
        ${metadata?.isCode || false},
        ${metadata?.language || null}
      )
      RETURNING id, title, created_at
    `
    
    // Track usage
    await trackUsage(effectiveUserId, 'capture')
    
    return NextResponse.json({
      success: true,
      clip: result.rows[0]
    })
    
  } catch (error) {
    console.error('Capture error:', error)
    return NextResponse.json(
      { error: 'Failed to save clip' },
      { status: 500 }
    )
  }
}

// Check if user can capture more
async function checkUsageLimit(userId) {
  const user = await sql`SELECT plan FROM users WHERE id = ${userId}`
  const plan = user.rows[0]?.plan || 'free'
  
  if (plan === 'pro' || plan === 'team') {
    return true // Unlimited
  }
  
  // Free tier: 50 clips per month
  const result = await sql`
    SELECT COUNT(*) as count 
    FROM clips 
    WHERE user_id = ${userId}
      AND created_at >= NOW() - INTERVAL '30 days'
  `
  
  const count = parseInt(result.rows[0].count)
  return count < 50
}

// Generate title
async function generateTitle(content, userId) {
  const user = await sql`SELECT plan FROM users WHERE id = ${userId}`
  const plan = user.rows[0]?.plan || 'free'
  
  if (plan === 'free') {
    // Free tier: Simple title (first 50 chars)
    return content.slice(0, 50).trim() + (content.length > 50 ? '...' : '')
  }
  
  // Pro tier: AI-generated title
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Generate a concise, descriptive title (max 60 characters) for this content.'
        },
        {
          role: 'user',
          content: content.slice(0, 1000)
        }
      ],
      max_tokens: 30
    })
    
    return response.choices[0].message.content.replace(/['"]/g, '')
  } catch (error) {
    console.error('Title generation error:', error)
    return content.slice(0, 50) + '...'
  }
}

// Generate tags
async function generateTags(content, userId) {
  const isPro = await checkIfPro(userId)
  
  if (!isPro) {
    return [] // Free tier: No auto-tags
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Generate 3-5 relevant tags for this content. Return ONLY comma-separated tags, no explanations.'
        },
        {
          role: 'user',
          content: content.slice(0, 1000)
        }
      ],
      max_tokens: 50
    })
    
    const tagsString = response.choices[0].message.content
    return tagsString.split(',').map(t => t.trim().toLowerCase())
  } catch (error) {
    console.error('Tag generation error:', error)
    return []
  }
}

// Generate embeddings
async function generateEmbedding(content) {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: content.slice(0, 8000)
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding generation error:', error)
    return null
  }
}

// Check if user is Pro
async function checkIfPro(userId) {
  const result = await sql`SELECT plan FROM users WHERE id = ${userId}`
  const plan = result.rows[0]?.plan || 'free'
  return plan === 'pro' || plan === 'team'
}

async function isPro(userId) {
  return checkIfPro(userId)
}

// Track usage
async function trackUsage(userId, action) {
  const period = new Date().toISOString().slice(0, 7) // YYYY-MM
  
  await sql`
    INSERT INTO usage (user_id, action, period)
    VALUES (${userId}, ${action}, ${period})
    ON CONFLICT DO NOTHING
  `
}
```

---