import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    
    // Get total captures
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM clips
    `
    const totalCaptures = parseInt(totalResult.rows[0].count)
    
    // Get captures by plan (last N days)
    const capturesByPlanResult = await sql`
      SELECT 
        u.plan,
        COUNT(*) as count
      FROM clips c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY u.plan
    `
    
    const capturesByPlan = {
      free: 0,
      pro: 0,
      team: 0
    }
    
    capturesByPlanResult.rows.forEach(row => {
      const plan = row.plan || 'free'
      capturesByPlan[plan] = parseInt(row.count)
    })
    
    // Calculate estimated costs
    // Free tier: $0
    // Pro tier: $0.00022 per capture
    const estimatedCosts = 
      (capturesByPlan.pro * 0.00022) + 
      (capturesByPlan.team * 0.00022)
    
    // Get pro user count
    const proUsersResult = await sql`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE plan IN ('pro', 'team')
    `
    const proUsers = parseInt(proUsersResult.rows[0].count)
    
    // Calculate MRR (Monthly Recurring Revenue)
    const mrrResult = await sql`
      SELECT 
        COUNT(CASE WHEN plan = 'pro' THEN 1 END) as pro_count,
        COUNT(CASE WHEN plan = 'team' THEN 1 END) as team_count
      FROM users
    `
    const mrr = 
      (parseInt(mrrResult.rows[0].pro_count) * 9) + 
      (parseInt(mrrResult.rows[0].team_count) * 29)
    
    // Get daily activity
    const dailyActivityResult = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM clips
      WHERE created_at >= NOW() - INTERVAL '${days} days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `
    
    const dailyActivity = dailyActivityResult.rows.map(row => ({
      date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: parseInt(row.count)
    }))
    
    // Fill in missing days with 0
    const filledActivity = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      
      const existing = dailyActivity.find(d => d.date === dateStr)
      filledActivity.push({
        date: dateStr,
        count: existing ? existing.count : 0
      })
    }
    
    return NextResponse.json({
      totalCaptures,
      capturesByPlan,
      estimatedCosts,
      proUsers,
      mrr,
      dailyActivity: filledActivity,
      timeRange: days
    })
    
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Failed to load stats' },
      { status: 500 }
    )
  }
}