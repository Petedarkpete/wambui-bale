'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff, ShoppingBag } from 'lucide-react'
import { se } from 'date-fns/locale'

export default function AdminSignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, secretKey: form.secretKey }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create account')
        return
      }

      router.push('/authentication/login')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6">

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="bg-gradient-to-br from-orange-300 to-orange-500 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-700 to-orange-900 flex items-center justify-center shadow-lg shadow-orange-900/30 mb-3">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-black">Wambui Bales</h1>
            <p className="text-black text-xs mt-0.5">Admin Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-black-300">Email</label>
              <input
                type="email"
                required
                placeholder="admin@wambuibales.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white/500 border border-white/10 text-black placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-black-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 transition-all pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-black-300">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 transition-all pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-black-300">
                Setup Secret Key
              </label>
              <input
                type="password"
                required
                placeholder="Enter setup secret key"
                value={form.secretKey}
                onChange={e => setForm({ ...form, secretKey: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500/40 transition-all pr-10 text-sm"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-black text-xs flex items-start gap-1.5">
                <span className="text-red-500 font-black flex-shrink-0">✱✱</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-br from-orange-700 to-orange-900 text-white font-semibold hover:to-orange-500 transition-all shadow-lg active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2 text-sm mt-1"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-center text-black-500 text-xs">
              Already have an account?{' '}
              <a href="/admin/login" className="text-white-900 hover:text-black-400 font-medium transition-colors">
                Sign in
              </a>
            </p>
          </form>
        </div>

        <p className="text-center text-stone-600 text-xs mt-4">
          Restricted access — authorized personnel only
        </p>
      </div>
    </div>
  )
}