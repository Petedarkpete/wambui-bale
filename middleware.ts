import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  const { pathname } = req.nextUrl

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup'
  const isProtectedPage = pathname.startsWith('/admin') && !isAuthPage

  // ── Not logged in, trying to access protected page ──
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // ── Logged in, trying to access login/signup ──
  if (isAuthPage && token) {
    try {
      verifyToken(token)
      return NextResponse.redirect(new URL('/admin', req.url))
    } catch {
      // token invalid — let them through to login
    }
  }

  // ── Add no-cache headers to protected pages ──
  if (isProtectedPage && token) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}