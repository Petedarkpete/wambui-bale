import { useState, useEffect } from 'react'
import { Search, Plus } from 'lucide-react'
import { AddCategoryModal } from '@app/components/Modals/AddCategoryModal'

interface Category {
  id: number
  name: string
}

interface Props {
  searchTerm: string
  setSearchTerm: (val: string) => void
  activeCategory: string
  setActiveCategory: (val: string) => void
  onCategoryAdded: () => void
}

export const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  onCategoryAdded,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  const fetchCategories = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border border-input">
      
      {/* Dynamic Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
        {/* All pill */}
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeCategory === 'All'
              ? 'bg-green-500/10 text-green-600 border border-green-500/20'
              : 'hover:bg-accent text-muted-foreground border border-transparent'
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              activeCategory === cat.name
                ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                : 'hover:bg-accent text-muted-foreground border border-transparent'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full lg:w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all text-sm"
        />
      </div>

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <AddCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => {
            setIsCategoryModalOpen(false)
            fetchCategories()
            onCategoryAdded()
          }}
        />
      )}
    </div>
  )
}