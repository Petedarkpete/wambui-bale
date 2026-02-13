import { ReactNode } from 'react'

export const metadata = {
  title: 'Admin - Wambui Bales',
  description: 'Admin panel for managing Wambui Bales',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
