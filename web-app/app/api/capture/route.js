import { sql } from '@vercel/postgres'
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const { content, platform, url, timestamp, metadata, userId } = await request.json()
    
    const effectiveUserId = userId || 1
    
    // Check usage limits
    const usageCheck = await checkUsageLimit(effectiveUserId)
    if (!usageCheck.allowed) {
      return NextResponse.json(
        { 
          error: 'Usage limit reached. Upgrade to Pro for unlimited clips!',
          limit: usageCheck.limit,
          current: usageCheck.current
        },
        { status: 429 }
      )
    }
    
    // Get user's plan
    const plan = await getUserPlan(effectiveUserId)
    
    let title, tags, embedding
    
    if (plan === 'free') {
      // FREE TIER: Zero cost
      title = content.slice(0, 50).trim()
      if (content.length > 50) title += '...'
      tags = []
      embedding = null
      
      console.log('✅ Free tier capture - $0.00 cost')
      
    } else if (plan === 'pro' || plan === 'team') {
      // PRO TIER: AI features (~$0.00022 per capture)
      title = await generateTitle(content)
      tags = await generateTags(content)
      embedding = await generateEmbedding(content)
      
      console.log('💰 Pro tier capture - ~$0.00022 cost')
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
    
    // Log costs for monitoring
    const cost = (plan === 'pro' || plan === 'team') ? 0.00022 : 0
    console.log(`📊 Capture #${result.rows[0].id} | Plan: ${plan} | Cost: $${cost.toFixed(5)}`)
    
    return NextResponse.json({
      success: true,
      clip: result.rows[0],
      plan: plan,
      aiEnabled: plan !== 'free',
      cost: cost
    })
    
  } catch (error) {
    console.error('Capture error:', error)
    return NextResponse.json(
      { error: 'Failed to save clip' },
      { status: 500 }
    )
  }
}

async function getUserPlan(userId) {
  try {
    const result = await sql`SELECT plan FROM users WHERE id = ${userId}`
    return result.rows[0]?.plan || 'free'
  } catch (error) {
    return 'free'
  }
}

async function checkUsageLimit(userId) {
  try {
    const plan = await getUserPlan(userId)
    
    if (plan === 'pro' || plan === 'team') {
      return { allowed: true, limit: -1, current: -1 }
    }
    
    const result = await sql`
      SELECT COUNT(*) as count 
      FROM clips 
      WHERE user_id = ${userId}
        AND created_at >= NOW() - INTERVAL '30 days'
    `
    
    const current = parseInt(result.rows[0].count)
    const limit = 50
    
    return {
      allowed: current < limit,
      limit,
      current
    }
  } catch (error) {
    console.error('Check usage error:', error)
    return { allowed: false, limit: 50, current: 0 }
  }
}

async function trackUsage(userId, action) {
  try {
    const period = new Date().toISOString().slice(0, 7)
    await sql`
      INSERT INTO usage (user_id, action, period)
      VALUES (${userId}, ${action}, ${period})
    `
  } catch (error) {
    console.error('Track usage error:', error)
  }
}

async function generateTitle(content) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Generate a concise title (max 60 characters). No quotes or punctuation at the end.'
        },
        {
          role: 'user',
          content: content.slice(0, 1000)
        }
      ],
      max_tokens: 30,
      temperature: 0.7
    })
    
    return response.choices[0].message.content.replace(/['"]/g, '').trim()
  } catch (error) {
    console.error('Title generation error:', error)
    return content.slice(0, 50) + '...'
  }
}

async function generateTags(content) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Generate 3-5 relevant tags. Return ONLY comma-separated tags, nothing else.'
        },
        {
          role: 'user',
          content: content.slice(0, 1000)
        }
      ],
      max_tokens: 50,
      temperature: 0.5
    })
    
    const tagsString = response.choices[0].message.content
    return tagsString.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0)
  } catch (error) {
    console.error('Tag generation error:', error)
    return []
  }
}

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