// pages/index.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthForm from '../components/AuthForm'

export default function Home({ session }) {
  const [showAuth, setShowAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (showAuth) {
    return <AuthForm />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-turquoise-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-turquoise-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-turquoise-400/5 rounded-full blur-3xl animate-bounce-gentle"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-3xl font-bold text-white animate-slide-in-left">
            <span className="bg-gradient-to-r from-turquoise-400 to-turquoise-600 bg-clip-text text-transparent">
              Myno
            </span>
          </div>
          <button
            onClick={() => setShowAuth(true)}
            className="text-gray-300 hover:text-turquoise-400 transition-colors duration-300 font-medium animate-slide-in-right"
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in mb-8">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 leading-tight">
              Your AI Copilot for
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-turquoise-400 via-turquoise-500 to-turquoise-600 bg-clip-text text-transparent animate-shimmer bg-300% animate-glow">
                  Reddit & Discord Growth
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-turquoise-400/20 to-turquoise-600/20 blur-lg animate-pulse-slow"></div>
              </span>
            </h1>
          </div>

          <div className="animate-slide-up mb-12">
            <p className="text-xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Find the best communities. Get viral post drafts. Grow your startup — 
              <span className="text-turquoise-400 font-medium"> all without sounding spammy.</span>
            </p>
          </div>

          <div className="animate-slide-up mb-20">
            <button
              onClick={() => setShowAuth(true)}
              className="group relative bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-black text-2xl font-bold py-6 px-16 rounded-2xl hover:from-turquoise-400 hover:to-turquoise-500 transform hover:scale-110 transition-all duration-500 shadow-2xl animate-glow"
            >
              <span className="relative z-10">Start Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-turquoise-400 to-turquoise-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-10 mt-24 animate-fade-in">
            <div className="group bg-gray-900/50 backdrop-blur-md rounded-3xl p-10 hover:bg-gray-800/60 transition-all duration-500 transform hover:scale-105 border border-gray-800 hover:border-turquoise-500/30 animate-slide-in-left">
              <div className="text-6xl mb-6 animate-float">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-turquoise-400 transition-colors duration-300">Smart Targeting</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                AI-powered community discovery to find your perfect audience on Reddit and Discord
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-md rounded-3xl p-10 hover:bg-gray-800/60 transition-all duration-500 transform hover:scale-105 border border-gray-800 hover:border-turquoise-500/30 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-6xl mb-6 animate-float" style={{animationDelay: '0.5s'}}>✨</div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-turquoise-400 transition-colors duration-300">Viral Content</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Generate engaging post drafts that resonate with your audience and drive growth
              </p>
            </div>

            <div className="group bg-gray-900/50 backdrop-blur-md rounded-3xl p-10 hover:bg-gray-800/60 transition-all duration-500 transform hover:scale-105 border border-gray-800 hover:border-turquoise-500/30 animate-slide-in-right">
              <div className="text-6xl mb-6 animate-float" style={{animationDelay: '1s'}}>🚀</div>
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-turquoise-400 transition-colors duration-300">Auto-Posting</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                Schedule and automate your posts across multiple platforms (coming soon)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-12 text-center animate-fade-in">
        <p className="text-gray-500 text-lg">
          © 2024 Myno. Built for ambitious startups.
        </p>
      </footer>
    </div>
  )
}
