import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'

export const metadata = {
  title: 'Admin - Wambui Bales',
  description: 'Admin panel for managing Wambui Bales',
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()  // ← await here
  const token = cookieStore.get('admin_token')?.value

  if (!token) return redirect('/authentication/login')

  const user = verifyToken(token)
  if (!user) return redirect('/authentication/login')

  return <>{children}</>
}
