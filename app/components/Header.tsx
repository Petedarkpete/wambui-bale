'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About Us', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-max">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">WB</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Wambui Bales</h1>
              <p className="text-xs text-gray-600">Wholesale Clothing</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & Admin Link & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:+254700000000"
              className="hidden sm:flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">+254 757 270 511</span>
            </a>

            <Link
              href="/admin/images"
              className="hidden sm:inline-block px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
            >
              Admin
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+254726076717"
                className="flex items-center space-x-2 text-blue-600 py-2"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">+254 757 270 511</span>
              </a>
              <Link
                href="/admin/images"
                className="px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors inline-block"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
