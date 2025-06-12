// pages/dashboard.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function Dashboard({ session }) {
  const [step, setStep] = useState(1)
  const [startupDescription, setStartupDescription] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [postDrafts, setPostDrafts] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!session) router.push('/')
  }, [session, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const generateResults = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/suggest-subreddits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startupDescription,
          targetAudience
        })
      })

      const data = await response.json()
      const raw = data.raw

      // Parse subreddits
      const subredditRegex = /r\/[a-zA-Z0-9_]+.*?\((.*?)\).*?: (.*)/g
      const subreddits = []
      let match
      while ((match = subredditRegex.exec(raw)) !== null) {
        subreddits.push({
          name: match[0].split(' ')[0],
          members: match[1],
          relevance: 'High',
        })
      }

      // Parse Discord strategy
      const discordMatch = raw.match(/2\. Suggest a Discord.*?\n([\s\S]*?)\n3\./)
      const discordIdea = {
        title: 'Discord Growth Strategy',
        description: discordMatch ? discordMatch[1].trim() : 'No strategy found'
      }

      // Parse post drafts
      const postSection = raw.match(/3\. Write 3 viral-style Reddit posts[\s\S]*/)?.[0] || ''
      const postBlocks = postSection
        .split(/(?=\d\.\s*Title:)/g)
        .slice(0, 3)
        .map((block, i) => {
          const titleMatch = block.match(/Title:\s*(.*)/)
          const bodyMatch = block.match(/Body:\s*([\s\S]*)/)
          return {
            id: i + 1,
            title: titleMatch?.[1]?.trim() || '',
            body: bodyMatch?.[1]?.trim() || ''
          }
        })

      setResults({ subreddits, discordIdea })
      setPostDrafts(postBlocks)
      setStep(3)
    } catch (error) {
      console.error('Error generating results:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePostDraft = (id, field, value) => {
    setPostDrafts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, [field]: value } : post
      )
    )
  }

  if (!session) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-turquoise-400 text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-turquoise-400 to-turquoise-600 bg-clip-text text-transparent">Myno</span> Dashboard
          </h1>
          <div className="flex items-center space-x-6">
            <span className="text-gray-300">{session.user.email}</span>
            <button
              onClick={handleLogout}
              className="text-turquoise-400 hover:text-turquoise-300 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-16">
        {step === 1 && (
          <div>
            <h2 className="text-4xl font-bold mb-12 text-center">Tell us about your startup</h2>
            <div className="space-y-10">
              <div>
                <label className="block text-xl mb-4">What does your startup do?</label>
                <textarea
                  value={startupDescription}
                  onChange={(e) => setStartupDescription(e.target.value)}
                  className="w-full p-6 bg-gray-800 border border-gray-700 rounded-2xl text-white"
                  rows="5"
                  placeholder="Describe your product, service, or solution..."
                />
              </div>

              <div>
                <label className="block text-xl mb-4">Who is your target audience?</label>
                <textarea
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full p-6 bg-gray-800 border border-gray-700 rounded-2xl text-white"
                  rows="5"
                  placeholder="Describe your ideal customers, their pain points, demographics..."
                />
              </div>

              <div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!startupDescription.trim() || !targetAudience.trim()}
                  className="w-full bg-turquoise-500 text-black py-5 px-8 rounded-2xl font-bold text-xl hover:bg-turquoise-400 transition-all duration-300 disabled:opacity-50"
                >
                  Generate Growth Strategy
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <div className="mb-6 text-xl text-gray-400">Analyzing your startup...</div>
            <div className="mb-12 animate-spin rounded-full h-16 w-16 border-b-2 border-turquoise-400 mx-auto"></div>
            <button
              onClick={generateResults}
              className="bg-turquoise-500 text-black py-4 px-12 rounded-2xl font-bold text-lg hover:bg-turquoise-400 transition-all duration-300"
            >
              {loading ? 'Processing...' : 'View Results'}
            </button>
          </div>
        )}

        {step === 3 && results && (
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Recommended Subreddits</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {results.subreddits.map((s, i) => (
                  <div key={i} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-xl mb-2">{s.name}</h3>
                    <p className="text-gray-400 mb-1">{s.members} members</p>
                    <span className="text-sm bg-turquoise-600/10 text-turquoise-400 px-4 py-1 rounded-xl border border-turquoise-400">
                      {s.relevance} Relevance
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Viral Post Drafts</h2>
              {postDrafts.map((post, i) => (
                <div key={post.id} className="mb-6 bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => updatePostDraft(post.id, 'title', e.target.value)}
                    className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600"
                  />
                  <textarea
                    value={post.body}
                    onChange={(e) => updatePostDraft(post.id, 'body', e.target.value)}
                    rows={6}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600"
                  />
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Discord Promotion Strategy</h2>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-2">{results.discordIdea.title}</h3>
                <p className="text-gray-300">{results.discordIdea.description}</p>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setStep(1)
                  setStartupDescription('')
                  setTargetAudience('')
                  setResults(null)
                  setPostDrafts([])
                }}
                className="bg-gray-700 text-white py-4 px-12 rounded-2xl font-bold text-lg hover:bg-gray-600 transition-all duration-300"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
