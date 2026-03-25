'use client'

import { useState, useEffect } from 'react'
import { Filter } from 'lucide-react'

interface Category {
  id: number
  name: string
  _count: { products: number }
}

interface Props {
  activeCategory: string
  setActiveCategory: (val: string) => void
}

export const SideFilters = ({ activeCategory, setActiveCategory }: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  return (
    <div className="lg:w-64">
      <div className="bg-orange-200 rounded-lg shadow-sm p-6 sticky top-24">

        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={() => setShowFilters(!showFilters)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        <div className={`space-y-2 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <h3 className="text-lg font-semibold mb-4 hidden lg:block">Categories</h3>

          <button
            onClick={() => setActiveCategory('All')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              activeCategory === 'All'
                ? 'bg-green-50 text-green-700 font-medium border border-green-100'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div className="flex justify-between items-center">
              <span>All Bales</span>
              <span className="text-sm text-gray-500">
                ({categories.reduce((sum, c) => sum + c._count.products, 0)})
              </span>
            </div>
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                activeCategory === category.name
                  ? 'bg-green-50 text-green-700 font-medium border border-green-100'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">({category._count.products})</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}