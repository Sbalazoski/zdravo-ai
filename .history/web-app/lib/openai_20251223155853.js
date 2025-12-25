import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const ai = {
  // Generate title from content
  async generateTitle(content) {
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
        max_tokens: 30,
        temperature: 0.7
      })
      
      return response.choices[0].message.content.replace(/['"]/g, '')
    } catch (error) {
      console.error('Title generation error:', error)
      return content.slice(0, 50) + '...'
    }
  },

  // Generate tags from content
  async generateTags(content) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Generate 3-5 relevant tags for this content. Return ONLY comma-separated tags.'
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
      return tagsString.split(',').map(t => t.trim().toLowerCase())
    } catch (error) {
      console.error('Tag generation error:', error)
      return []
    }
  },

  // Generate embeddings for semantic search
  async generateEmbedding(content) {
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
  },

  // Semantic search using embeddings
  async semanticSearch(query, embeddings) {
    try {
      const queryEmbedding = await this.generateEmbedding(query)
      if (!queryEmbedding) return []

      // Calculate cosine similarity
      // This is a simplified version - in production, use vector database
      const similarities = embeddings.map(item => ({
        ...item,
        similarity: this.cosineSimilarity(queryEmbedding, item.embedding)
      }))

      return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 20)
    } catch (error) {
      console.error('Semantic search error:', error)
      return []
    }
  },

  // Calculate cosine similarity between two vectors
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0
    let normA = 0
    let normB = 0
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i]
      normA += vecA[i] * vecA[i]
      normB += vecB[i] * vecB[i]
    }
    
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
  },

  // Summarize long content
  async summarize(content, maxLength = 200) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Summarize this content in ${maxLength} characters or less.`
          },
          {
            role: 'user',
            content: content
          }
        ],
        max_tokens: Math.ceil(maxLength / 4),
        temperature: 0.5
      })
      
      return response.choices[0].message.content
    } catch (error) {
      console.error('Summarization error:', error)
      return content.slice(0, maxLength) + '...'
    }
  },

  // Analyze content type
  analyzeContentType(content) {
    const codePatterns = [
      /function\s+\w+\s*\(/,
      /const\s+\w+\s*=/,
      /def\s+\w+\s*\(/,
      /class\s+\w+/,
      /import\s+\w+/,
      /#include/,
      /public\s+static/,
      /\bif\s*\(/,
      /\bfor\s*\(/,
      /=>/,
      /{[\s\S]+}/
    ]
    
    const isCode = codePatterns.some(pattern => pattern.test(content))
    
    return {
      isCode,
      hasMarkdown: /^#{1,6}\s/.test(content) || /\*\*\w+\*\*/.test(content),
      wordCount: content.split(/\s+/).length,
      lineCount: content.split('\n').length,
      charCount: content.length
    }
  }
}

export default ai
