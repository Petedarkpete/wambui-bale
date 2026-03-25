import { useState, useEffect } from 'react'
import { AddCategoryModal } from "@app/components/Modals/AddCategoryModal";
import { Plus } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  description: string
  isActive: boolean
  deletedAt: string | null
  createdAt: string
  _count?: { products: number }
}

export const CategoriesTable = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    const res = await fetch('/api/categories?all=true')
    const data = await res.json()
    setCategories(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return
    const res = await fetch('/api/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    const data = await res.json()
    if (!res.ok) return alert(data.error)
    fetchCategories()
  }

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    await fetch('/api/categories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, isActive: !isActive }),
    })
    fetchCategories()
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Categories</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-black from-80% to-green-600 text-white font-medium hover:to-green-500 transition-all shadow-lg active:scale-95 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-input bg-card bg-orange-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/50 border-b border-input">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slug</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Products</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    Loading categories...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    No categories yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-accent/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">#{cat.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-mono">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                      {cat.description || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {cat._count?.products ?? 0} products
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        cat.deletedAt
                          ? 'bg-red-100 text-red-700'
                          : cat.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          cat.deletedAt ? 'bg-red-600' : cat.isActive ? 'bg-green-600' : 'bg-amber-600'
                        }`} />
                        {cat.deletedAt ? 'Deleted' : cat.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Toggle Status */}
                        {!cat.deletedAt && (
                          <button
                            onClick={() => handleToggleStatus(cat.id, cat.isActive)}
                            className="p-2 hover:bg-green-500/10 hover:text-green-600 rounded-lg transition-colors"
                            title={cat.isActive ? 'Deactivate' : 'Activate'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                          </button>
                        )}

                        {/* Delete */}
                        {!cat.deletedAt && (
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="p-2 hover:bg-red-500/10 hover:text-red-600 rounded-lg transition-colors"
                            title="Delete Category"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            fetchCategories()
          }}
        />
      )}
    </div>
  )
}