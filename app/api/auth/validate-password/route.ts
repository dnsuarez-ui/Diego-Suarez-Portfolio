import { NextResponse } from 'next/server'
import { randomBytes, timingSafeEqual } from 'crypto'

const MAX_ATTEMPTS = 3
const LOCKOUT_MS = 2 * 60 * 60 * 1000 // 2 hours
const LOCKOUT_MESSAGE = 'Too many attempts. Try again in 2 hours.'

// Simple in-memory counter. Resets on server restart/redeploy — acceptable
// for a soft UX gate in front of a single shared password, not a real
// per-user rate limiter.
let failedAttempts = 0
let lockedUntil: number | null = null

function passwordsMatch(input: string, expected: string) {
  const inputBuf = Buffer.from(input)
  const expectedBuf = Buffer.from(expected)

  // Compare against a same-length buffer first so a length mismatch doesn't
  // short-circuit before timingSafeEqual, which would leak length via timing.
  if (inputBuf.length !== expectedBuf.length) {
    timingSafeEqual(inputBuf, inputBuf)
    return false
  }

  return timingSafeEqual(inputBuf, expectedBuf)
}

export async function POST(request: Request) {
  const correctPassword = process.env.PROTECTED_PASSWORD
  if (!correctPassword) {
    return NextResponse.json(
      { success: false, error: 'Server misconfiguration.', attemptsLeft: 0 },
      { status: 500 }
    )
  }

  if (lockedUntil && Date.now() < lockedUntil) {
    return NextResponse.json(
      { success: false, error: LOCKOUT_MESSAGE, attemptsLeft: 0 },
      { status: 429 }
    )
  }

  if (lockedUntil && Date.now() >= lockedUntil) {
    lockedUntil = null
    failedAttempts = 0
  }

  const body = await request.json().catch(() => null)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!passwordsMatch(password, correctPassword)) {
    failedAttempts += 1
    const lockedOut = failedAttempts >= MAX_ATTEMPTS

    if (lockedOut) {
      lockedUntil = Date.now() + LOCKOUT_MS
      return NextResponse.json(
        { success: false, error: LOCKOUT_MESSAGE, attemptsLeft: 0 },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect password.', attemptsLeft: MAX_ATTEMPTS - failedAttempts },
      { status: 401 }
    )
  }

  failedAttempts = 0
  lockedUntil = null
  const token = randomBytes(32).toString('hex')
  return NextResponse.json({ success: true, token })
}
