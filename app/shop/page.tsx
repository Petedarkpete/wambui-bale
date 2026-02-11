'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Filter, Grid, List } from 'lucide-react'

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

const categories = [
  { id: 'all', name: 'All Categories', count: bales.length },
  { id: 'ladies', name: 'Ladies', count: bales.filter(b => b.category === 'ladies').length },
  { id: 'gents', name: 'Gents', count: bales.filter(b => b.category === 'gents').length },
  { id: 'kids', name: 'Kids', count: bales.filter(b => b.category === 'kids').length },
  { id: 'mixed', name: 'Mixed', count: bales.filter(b => b.category === 'mixed').length },
]

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredBales = selectedCategory === 'all' 
    ? bales 
    : bales.filter(bale => bale.category === selectedCategory)

  const handleOrderClick = (bale: typeof bales[0]) => {
    const message = `Hi! I'm interested in ordering the ${bale.name} bale for KSh ${bale.price.toLocaleString()}. Can you provide more details?`
    const whatsappUrl = `https://wa.me/254726076717?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="section-padding bg-gray-50 min-h-screen">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Clothing Bales</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our selection of premium quality clothing bales. All bales are carefully sorted and inspected for quality.
          </p>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
              
              <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <div>
                  <h3 className="text-lg font-semibold mb-4 hidden lg:block">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-sm text-gray-500">({category.count})</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>KSh 5,000 - KSh 7,000 (Budget)</div>
                    <div>KSh 7,000 - KSh 9,000 (Standard)</div>
                    <div>KSh 9,000+ (Premium)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Toggle and Results Count */}
            <div className="flex justify-between items-center mb-6">
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
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-6'
            }>
              {filteredBales.map((bale) => (
                <div key={bale.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow ${
                  viewMode === 'list' ? 'flex gap-6' : ''
                }`}>
                  <div className={viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}>
                    <Image
                      src={bale.image || "/placeholder.svg"}
                      alt={bale.name}
                      width={400}
                      height={300}
                      className={`w-full object-cover ${
                        viewMode === 'list' ? 'h-48 rounded-l-xl' : 'h-64 rounded-t-xl'
                      }`}
                    />
                  </div>
                  
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full capitalize">
                          {bale.category}
                        </span>
                        {!bale.inStock && (
                          <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{bale.weight}</div>
                        <div>{bale.pieces}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{bale.name}</h3>
                    <p className="text-gray-600 mb-4">{bale.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        KSh {bale.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleOrderClick(bale)}
                        disabled={!bale.inStock}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                          bale.inStock
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {bale.inStock ? 'Order Now' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredBales.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No bales found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later for new arrivals.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
