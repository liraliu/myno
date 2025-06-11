// components/AuthForm.js
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        router.push('/dashboard')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-3xl shadow-2xl p-10 animate-slide-up border border-gray-800 backdrop-blur-sm">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-3 animate-fade-in">
            {isLogin ? 'Welcome Back' : 'Join Myno'}
          </h2>
          <p className="text-gray-400 text-lg animate-fade-in">
            {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="animate-slide-in-left">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 transition-all duration-300 hover:border-gray-600"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="animate-slide-in-right">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500 transition-all duration-300 hover:border-gray-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 p-4 rounded-xl border border-red-800 animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-turquoise-500 to-turquoise-600 text-black py-4 px-6 rounded-xl font-bold text-lg hover:from-turquoise-400 hover:to-turquoise-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-glow"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center animate-fade-in">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-turquoise-400 hover:text-turquoise-300 font-medium transition-colors duration-300"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}
