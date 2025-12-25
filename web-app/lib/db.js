import { sql } from '@vercel/postgres'

export const db = {
  // Get user by ID
  async getUser(userId) {
    try {
      const result = await sql`SELECT * FROM users WHERE id = ${userId}`
      return result.rows[0] || null
    } catch (error) {
      console.error('Get user error:', error)
      return null
    }
  },

  // Create user
  async createUser(email, name) {
    try {
      const result = await sql`
        INSERT INTO users (email, name, plan)
        VALUES (${email}, ${name}, 'free')
        RETURNING *
      `
      return result.rows[0]
    } catch (error) {
      console.error('Create user error:', error)
      return null
    }
  },

  // Get user's plan
  async getUserPlan(userId) {
    try {
      const result = await sql`SELECT plan FROM users WHERE id = ${userId}`
      return result.rows[0]?.plan || 'free'
    } catch (error) {
      console.error('Get plan error:', error)
      return 'free'
    }
  },

  // Update user's plan
  async updateUserPlan(userId, plan) {
    try {
      await sql`
        UPDATE users 
        SET plan = ${plan}
        WHERE id = ${userId}
      `
      return true
    } catch (error) {
      console.error('Update plan error:', error)
      return false
    }
  },

  // Check usage limits
  async checkUsageLimit(userId, action = 'capture') {
    try {
      const plan = await this.getUserPlan(userId)
      
      if (plan === 'pro' || plan === 'team') {
        return { allowed: true, limit: -1, current: -1 }
      }

      // Free tier: 50 clips per month
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
  },

  // Track usage
  async trackUsage(userId, action) {
    try {
      const period = new Date().toISOString().slice(0, 7) // YYYY-MM
      
      await sql`
        INSERT INTO usage (user_id, action, period)
        VALUES (${userId}, ${action}, ${period})
      `
      return true
    } catch (error) {
      console.error('Track usage error:', error)
      return false
    }
  },

  // Get all clips for user
  async getClips(userId, filter = 'all', limit = 50) {
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
      return result.rows
    } catch (error) {
      console.error('Get clips error:', error)
      return []
    }
  },

  // Create clip
  async createClip(data) {
    try {
      const result = await sql`
        INSERT INTO clips (
          user_id, content, title, platform, url, 
          metadata, tags, embedding, is_code, language
        ) VALUES (
          ${data.userId},
          ${data.content},
          ${data.title},
          ${data.platform},
          ${data.url},
          ${JSON.stringify(data.metadata)},
          ${data.tags || []},
          ${data.embedding ? JSON.stringify(data.embedding) : null},
          ${data.isCode || false},
          ${data.language || null}
        )
        RETURNING id, title, created_at
      `
      return result.rows[0]
    } catch (error) {
      console.error('Create clip error:', error)
      return null
    }
  },

  // Delete clip
  async deleteClip(clipId, userId) {
    try {
      await sql`
        DELETE FROM clips
        WHERE id = ${clipId} AND user_id = ${userId}
      `
      return true
    } catch (error) {
      console.error('Delete clip error:', error)
      return false
    }
  },

  // Search clips (keyword)
  async searchClips(userId, query) {
    try {
      const result = await sql`
        SELECT * FROM clips
        WHERE user_id = ${userId}
          AND (
            content ILIKE ${'%' + query + '%'}
            OR title ILIKE ${'%' + query + '%'}
          )
        ORDER BY created_at DESC
        LIMIT 20
      `
      return result.rows
    } catch (error) {
      console.error('Search clips error:', error)
      return []
    }
  }
}

export default db
