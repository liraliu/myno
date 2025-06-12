// pages/api/suggest-subreddits.js

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' })
  }

  const { startupDescription, targetAudience } = req.body

  if (!startupDescription || !targetAudience) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const prompt = `
You're a Reddit and Discord strategist. Based on the following:

Startup Description: ${startupDescription}
Target Audience: ${targetAudience}

1. Recommend 3 relevant subreddits. Include subreddit name, estimated size, and why it’s relevant.
2. Suggest a Discord growth strategy. Include a specific idea and how to execute it.
3. Write 3 viral-style Reddit posts with a title and body that feel native to Reddit. Keep each post under 200 words.
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })

    const content = completion.choices[0].message.content
    console.log('=== OpenAI RAW RESPONSE ===\n', content)

    // For now, just return the raw content so we can inspect it
    return res.status(200).json({ raw: content })

  } catch (error) {
    console.error('OpenAI ERROR:', error)
    return res.status(500).json({ error: 'OpenAI request failed' })
  }
}
