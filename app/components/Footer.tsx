import Link from 'next/link'
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">WB</span>
              </div>
              <span className="text-xl font-bold">Wambui Bales</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for quality wholesale clothing bales. 
              Serving retailers and resellers across Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">Shop Bales</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/shop?category=ladies" className="text-gray-400 hover:text-white transition-colors">Ladies Bales</Link></li>
              <li><Link href="/shop?category=gents" className="text-gray-400 hover:text-white transition-colors">Gents Bales</Link></li>
              <li><Link href="/shop?category=kids" className="text-gray-400 hover:text-white transition-colors">Kids Bales</Link></li>
              <li><Link href="/shop?category=mixed" className="text-gray-400 hover:text-white transition-colors">Mixed Bales</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">info@wambuibales.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1" />
                <span className="text-gray-400">Gikomba Market, Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Wambui Bales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
