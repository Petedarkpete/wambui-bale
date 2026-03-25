import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // ── 1. Basic validation ────────────────────────────
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // ── 2. Find admin ──────────────────────────────────
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // ── 3. Verify password ─────────────────────────────
    const isValid = await bcrypt.compare(password, admin.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // ── 4. Sign JWT token ──────────────────────────────
    const token = signToken({ id: admin.id, email: admin.email })

    // ── 5. Set cookie ──────────────────────────────────
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}