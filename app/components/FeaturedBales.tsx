'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@app/components/ProductGrid'

export const FeaturedBales = () => {
  const [featured, setFeatured] = useState<Product[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setFeatured(data.slice(0, 5)))
  }, [])

  const handleOrderClick = (product: Product) => {
    const message = `Hi! I'm interested in ordering the *${product.name}* bale priced at *KSh ${Number(product.price).toLocaleString()}*.\n\nCategory: ${product.category.name}${product.weight ? `\nWeight: ${product.weight}` : ''}${product.origin ? `\nOrigin: ${product.origin}` : ''}\n\nCan you provide more details?`
    window.open(`https://wa.me/254757270511?text=${encodeURIComponent(message)}`, '_blank')
  }

  const prev = () => setCurrent(i => (i === 0 ? featured.length - 1 : i - 1))
  const next = () => setCurrent(i => (i === featured.length - 1 ? 0 : i + 1))

  // Auto advance
  useEffect(() => {
    if (featured.length === 0) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [featured.length, current])

  if (featured.length === 0) return null

  return (
    <div className="relative">

      {/* Cards — show 3 at a time, slide through 5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured
          .slice(current, current + 3)
          .concat(
            current + 3 > featured.length
              ? featured.slice(0, (current + 3) % featured.length)
              : []
          )
          .map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="w-full h-64 bg-orange-50 flex items-center justify-center">
                <Image
                  src={product.images?.[0]?.url || '/placeholder.svg'}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-contain p-2"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1 rounded-full">
                    {product.category.name}
                  </span>
                  <span className="text-sm text-gray-600">{product.weight ?? '—'}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    KSh {Number(product.price).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleOrderClick(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-orange-50 hover:border-orange-300 flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${i === current
                  ? 'w-6 h-2 bg-orange-500'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-orange-50 hover:border-orange-300 flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

    </div>
  )
}