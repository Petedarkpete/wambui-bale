'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Filter, Grid, List } from 'lucide-react'

import { ProductGrid , Product } from '@/app/components/ProductGrid'
import { SideFilters } from '@/app/components/SideFilters'

const bales = [
  {
    id: 1,
    name: "Premium Ladies Mix",
    category: "ladies",
    price: 8500,
    weight: "45kg",
    pieces: "80-100 pieces",
    description: "High-quality ladies clothing including dresses, tops, skirts, and blouses",
    image: "/womens-clothing-bale.png",
    inStock: true
  },
  {
    id: 2,
    name: "Kids Assorted Bale",
    category: "kids",
    price: 6200,
    weight: "35kg",
    pieces: "100-120 pieces",
    description: "Colorful kids clothing for all ages - shirts, dresses, pants, and more",
    image: "/colorful-kids-clothes-bale.png",
    inStock: true
  },
  {
    id: 3,
    name: "Gents Casual Wear",
    category: "gents",
    price: 7800,
    weight: "40kg",
    pieces: "60-80 pieces",
    description: "Men's casual clothing - shirts, t-shirts, pants, and jackets",
    image: "/mens-casual-clothing-bale.png",
    inStock: true
  },
  {
    id: 4,
    name: "Mixed Family Bale",
    category: "mixed",
    price: 9200,
    weight: "50kg",
    pieces: "90-110 pieces",
    description: "Perfect mix of ladies, gents, and kids clothing for variety stores",
    image: "/mixed-family-clothing-bale.png",
    inStock: true
  },
  {
    id: 5,
    name: "Ladies Formal Wear",
    category: "ladies",
    price: 9500,
    weight: "42kg",
    pieces: "70-90 pieces",
    description: "Professional and formal ladies clothing - blazers, dresses, and suits",
    image: "/womens-formal-clothing-bale.png",
    inStock: false
  },
  {
    id: 6,
    name: "Kids School Uniforms",
    category: "kids",
    price: 5800,
    weight: "30kg",
    pieces: "80-100 pieces",
    description: "School uniforms and formal kids wear in various sizes",
    image: "/kids-school-uniforms-bale.png",
    inStock: true
  }
]


export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredBales = selectedCategory === 'all'
    ? bales
    : bales.filter(bale => bale.category === selectedCategory)

  const handleOrderClick = (product: Product) => {
    const message = `Hi! I'm interested in ordering the *${product.name}* bale priced at *KSh ${Number(product.price).toLocaleString()}*.\n\nCategory: ${product.category.name}${product.weight ? `\nWeight: ${product.weight}` : ''}${product.origin ? `\nOrigin: ${product.origin}` : ''}\n\nCan you provide more details?`
    const whatsappUrl = `https://wa.me/254757270511?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Clothing Bales</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our selection of premium quality clothing bales. All bales are carefully sorted and inspected for quality.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <SideFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* View Toggle and Results Count */}
            {/* <div className="flex justify-between items-center">
              <div className="text-gray-600">
                Showing {filteredBales.length} bale{filteredBales.length !== 1 ? 's' : ''}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div> */}

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
              <ProductGrid
                searchTerm={searchTerm}
                activeCategory={activeCategory}
                onOrderClick={handleOrderClick}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
