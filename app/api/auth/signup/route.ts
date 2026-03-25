import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, password, secretKey } = await req.json()

    // ── 1. Secret key guard ────────────────────────────
    console.log(secretKey)
    console.log("The signup secret key is:", process.env.ADMIN_SIGNUP_SECRET)
    if (secretKey !== process.env.ADMIN_SIGNUP_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // ── 2. Disable signup in production ───────────────
    if (process.env.DISABLE_SIGNUP === 'true') {
      return NextResponse.json(
        { error: 'Signup is disabled' },
        { status: 403 }
      )
    }

    // ── 3. Basic field validation ──────────────────────
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // ── 4. Strong password validation ─────────────────
    if (password.length < 12) {
      return NextResponse.json(
        { error: 'Password must be at least 12 characters' },
        { status: 400 }
      )
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain uppercase, lowercase, number and special character' },
        { status: 400 }
      )
    }

    // ── 5. Only one admin allowed ──────────────────────
    const existingAdmin = await prisma.admin.findFirst()
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin account already exists. Contact your system administrator.' },
        { status: 403 }
      )
    }

    // ── 6. Check duplicate email ───────────────────────
    const existingEmail = await prisma.admin.findUnique({ where: { email } })
    if (existingEmail) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // ── 7. Hash with stronger rounds ──────────────────
    const hashed = await bcrypt.hash(password, 12)

    await prisma.admin.create({
      data: { email, password: hashed },
    })

    return NextResponse.json({ message: 'Account created successfully' })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}