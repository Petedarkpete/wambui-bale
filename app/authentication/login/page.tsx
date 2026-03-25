'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Eye, EyeOff, ShoppingBag } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Invalid credentials')
        return
      }

      router.push('/admin/file_uploads')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white-200 flex items-center justify-center p-4">

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <div className="space-y-1.5">
                <label className="text-xs font-medium text-black">Email</label>
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
                <label className="text-xs font-medium text-black">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/500 border border-white/10 text-black placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-500/40 transition-all text-sm"
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
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
        </form>

        <p className="text-center text-black text-xs mt-4">
            Don't have an account?{' '}
            <a href="/admin/signup" className="font-semibold hover:underline transition-colors">
                Sign up
            </a>
        </p>
    </div>

    <p className="text-center text-stone-600 text-xs mt-4">
        Restricted access — authorized personnel only
    </p>
</div>
    </div>
  )
}