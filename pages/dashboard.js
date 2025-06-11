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
    if (!session) {
      router.push('/')
    }
  }, [session, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const generateResults = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        subreddits: [
          { name: 'r/entrepreneur', members: '1.2M', relevance: 'High' },
          { name: 'r/startups', members: '800K', relevance: 'High' },
          { name: 'r/SaaS', members: '150K', relevance: 'Medium' }
        ],
        discordIdea: {
          title: 'Community Partnership Strategy',
          description: 'Partner with startup Discord servers to offer exclusive early access to your tool in exchange for feedback and testimonials.'
        }
      }

      const mockPosts = [
        {
          id: 1,
          title: 'How I automated my startup\'s Reddit growth (and you can too)',
          body: `After spending countless hours manually posting on Reddit with mediocre results, I decided to build an AI system that could do it better.\n\nHere's what I learned:\n\n1. Community research is everything - you need to find where your audience actually hangs out\n2. Timing matters more than you think\n3. Authentic engagement beats promotional posts every time\n\nThe result? 300% increase in qualified leads in just 2 months.\n\nWould love to hear your experiences with Reddit marketing!`
        },
        {
          id: 2,
          title: 'The Reddit marketing mistake that\'s killing your startup growth',
          body: `Most founders approach Reddit like it's Facebook or LinkedIn. Big mistake.\n\nReddit communities have their own culture, rules, and expectations. Here's what works:\n\n• Lead with value, not your product\n• Study each subreddit's posting patterns\n• Engage genuinely before promoting\n• Use data to optimize timing\n\nWhat's your biggest Reddit marketing challenge?`
        },
        {
          id: 3,
          title: 'From 0 to 10K users: My Reddit-first growth strategy',
          body: `6 months ago, we had 0 users. Today we have over 10K active users, and 60% came from Reddit.\n\nOur approach:\n\n1. Identified 15 high-value subreddits\n2. Created content calendars for each\n3. Tracked what resonated with each community\n4. Scaled the winners\n\nThe key insight: Each subreddit is its own ecosystem. What works in r/entrepreneur might flop in r/SaaS.\n\nHappy to share more details in the comments!`
        }
      ]

      setResults(mockResults)
      setPostDrafts(mockPosts)
      setLoading(false)
      setStep(3)
    }, 2000)
  }

  const updatePostDraft = (id, field, value) => {
    setPostDrafts(prev => prev.map(post => 
      post.id === id ? { ...post, [field]: value } : post
    ))
  }

  if (!session) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-turquoise-400 text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white animate-slide-in-left">
              <span className="bg-gradient-to-r from-turquoise-400 to-turquoise-600 bg-clip-text text-transparent">
                Myno
              </span>{' '}
              Dashboard
            </h1>
            <div className="flex items-center space-x-6 animate-slide-in-right">
              <span className="text-gray-300">Welcome, {session.user.email}</span>
              <button
                onClick={handleLogout}
                className="text-turquoise-400 hover:text-turquoise-300 transition-colors duration-300 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-16">
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-12 border border-gray-800">
              <h2 className="text-4xl font-bold text-white mb-12 text-center animate-slide-up">
                Tell us about your startup
              </h2>
              
              <div className="space-y-10">
                <div className="animate-slide-in-left">
                  <label className="block text-xl font-medium text-gray-300 mb-4">
                    What does your startup do?
                  </label>
                  <textarea
                    value={startupDescription}
                    onChange={(e) => setStartupDescription(e.target.value)}
                    className="w-full p-6 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 transition-all duration-300 resize-none hover:border-gray-600"
                    rows="5"
                    placeholder="Describe your product, service, or solution..."
                  />
                </div>

                <div className="animate-slide-in-right">
                  <label className="block text-xl font-medium text-gray-300 mb-4">
                    Who is your target audience?
                  </label>
                  <textarea
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full p-6 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 transition-all duration-300 resize-none hover:border-gray-600"
                    rows="5"
                    placeholder="Describe your ideal customers, their pain points, demographics..."
                  />
                </div>

                <div className="animate-slide-up">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!startupDescription.trim() || !targetAudience.trim()}
                    className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-black py-5 px-8 rounded-2xl font-bold text-xl hover:from-turquoise-400 hover:to-turquoise-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-glow"
                  >
                    Generate Growth Strategy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in text-center">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-16 border border-gray-800">
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-turquoise-200 border-t-turquoise-500 rounded-full mx-auto animate-spin"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-turquoise-400 rounded-full mx-auto animate-ping"></div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6 animate-pulse">
                Analyzing your startup...
              </h2>
              <p className="text-gray-400 mb-12 text-lg animate-fade-in">
                Our AI is finding the best communities and crafting viral post ideas for you.
              </p>
              <button
                onClick={generateResults}
                className="bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-black py-4 px-12 rounded-2xl font-bold text-lg hover:from-turquoise-400 hover:to-turquoise-500 transition-all duration-300 animate-glow"
              >
                {loading ? 'Processing...' : 'View Results'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && results && (
          <div className="animate-fade-in space-y-12">
            {/* Recommended Subreddits */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-800 animate-slide-up">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="text-4xl mr-4">🎯</span>
                Recommended Subreddits
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {results.subreddits.map((subreddit, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-turquoise-500/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 animate-slide-in-left" style={{animationDelay: `${index * 0.1}s`}}>
                    <h3 className="font-bold text-xl text-white mb-4">
                      {subreddit.name}
                    </h3>
                    <p className="text-gray-400 mb-4 text-lg">{subreddit.members} members</p>
                    <span className={`inline-block px-4 py-2 rounded-xl text-sm font-medium ${
                      subreddit.relevance === 'High' 
                        ? 'bg-turquoise-500/20 text-turquoise-400 border border-turquoise-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {subreddit.relevance} Relevance
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Drafts */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-800 animate-slide-up">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="text-4xl mr-4">✨</span>
                Viral Post Drafts
              </h2>
              <div className="space-y-8">
                {postDrafts.map((post, index) => (
                  <div key={post.id} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-turquoise-500/30 transition-all duration-300 animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Title
                      </label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => updatePostDraft(post.id, 'title', e.target.value)}
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 transition-all duration-300 hover:border-gray-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Body
                      </label>
                      <textarea
                        value={post.body}
                        onChange={(e) => updatePostDraft(post.id, 'body', e.target.value)}
                        className="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 transition-all duration-300 resize-none hover:border-gray-500"
                        rows="10"
                      />
                    </div>
                    <button className="bg-gradient-to-r from-green-500 to-turquoise-500 text-black py-3 px-8 rounded-xl font-bold hover:from-green-400 hover:to-turquoise-400 transition-all duration-300 transform hover:scale-105">
                      Push to Post (Coming Soon)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Discord Strategy */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-gray-800 animate-slide-up">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
                <span className="text-4xl mr-4">💬</span>
                Discord Promotion Strategy
              </h2>
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:border-turquoise-500/30 transition-all duration-300">
                <h3 className="font-bold text-2xl text-white mb-4">
                  {results.discordIdea.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {results.discordIdea.description}
                </p>
              </div>
            </div>

            <div className="text-center animate-fade-in">
              <button
                onClick={() => {
                  setStep(1)
                  setStartupDescription('')
                  setTargetAudience('')
                  setResults(null)
                  setPostDrafts([])
                }}
                className="bg-gray-700 text-white py-4 px-12 rounded-2xl font-bold text-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
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