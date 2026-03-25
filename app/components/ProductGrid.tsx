'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Package, MapPin, Layers } from 'lucide-react'

interface ProductImage {
  url: string
  isPrimary: boolean
  alt: string | null
}

export interface Product {
  id: number
  name: string
  price: number
  weight: string | null
  pieces: number | null
  origin: string | null
  inStock: boolean
  description: string | null
  category: { id: number; name: string }
  images: ProductImage[]
}

interface Props {
  searchTerm: string
  activeCategory: string
  onOrderClick?: (product: Product) => void
}

export const ImageCarousel = ({ images, name }: { images: ProductImage[]; name: string }) => {
  const [current, setCurrent] = useState(0)

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i => (i === 0 ? images.length - 1 : i - 1))
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrent(i => (i === images.length - 1 ? 0 : i + 1))
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
        <Package className="w-12 h-12 text-stone-300" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-64 overflow-hidden group">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={img.url}
            alt={img.alt ?? name}
            fill
            className="object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md"
          >
            <ChevronLeft className="w-4 h-4 text-stone-800" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md"
          >
            <ChevronRight className="w-4 h-4 text-stone-800" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`rounded-full transition-all ${i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export const ProductGrid = ({ searchTerm, activeCategory, onOrderClick }: Props) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false) })
  }, [])

  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category.name === activeCategory
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-stone-100 animate-pulse">
            <div className="h-64 bg-stone-200" />
            <div className="p-5 space-y-3">
              <div className="h-4 bg-stone-200 rounded w-1/3" />
              <div className="h-5 bg-stone-200 rounded w-2/3" />
              <div className="h-4 bg-stone-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
          <Package className="w-10 h-10 text-stone-300" />
        </div>
        <h3 className="text-lg font-semibold text-stone-700 mb-1">No bales found</h3>
        <p className="text-stone-400 text-sm max-w-xs">Try adjusting your filters or check back later for new arrivals.</p>
      </div>
    )
  }

  return (
    <div className={
      viewMode === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
        : 'space-y-4'
    }>
      {filtered.map((product) => (
        <div
          key={product.id}
          className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 ${
            viewMode === 'list' ? 'flex' : ''
          } ${!product.inStock ? 'opacity-75' : ''}`}
        >
          {/* Image Carousel */}
          <div className={viewMode === 'list' ? 'w-56 flex-shrink-0' : ''}>
            <ImageCarousel images={product.images} name={product.name} />
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            {/* Top row */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-green-100">
                {product.category.name}
              </span>
              {!product.inStock && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-100">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="text-base font-bold text-stone-800 mb-2 leading-snug">
              {product.name}
            </h3>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-xs text-stone-500 mb-4">
              {product.weight && (
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" /> {product.weight}
                </span>
              )}
              {product.pieces && (
                <span className="flex items-center gap-1">
                  <Package className="w-3 h-3" /> {product.pieces} pcs
                </span>
              )}
              {product.origin && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {product.origin}
                </span>
              )}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
              <div>
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wide">Price</p>
                <p className="text-xl font-bold text-stone-900">
                  KSh {Number(product.price).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => onOrderClick?.(product)}
                disabled={!product.inStock}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                  product.inStock
                    ? 'bg-orange-500 hover:bg-orange-600 text-white hover:to-green-500 shadow-md hover:shadow-lg'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Order Now' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}