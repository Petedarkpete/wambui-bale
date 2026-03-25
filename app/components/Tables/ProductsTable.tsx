import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AddItemModal } from "@app/components/Modals/AddItemModal";

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  weight: string | null
  pieces: number | null
  origin: string | null
  inStock: boolean
  category: { id: number; name: string }
  images: { url: string; isPrimary: boolean }[]
  createdAt: string
}

interface Props {
  products: Product[]
  onRefresh: () => void
}

export const ProductsTable = ({ products, onRefresh }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    const res = await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    const data = await res.json()
    if (!res.ok) return alert(data.error)
    onRefresh()  // ← use parent's refresh
  }

  const handleToggleStatus = async (id: number, inStock: boolean) => {
    await fetch('/api/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, inStock: !inStock }),
    })
    onRefresh()  // ← use parent's refresh
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Products</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-black from-80% to-green-600 text-white font-medium hover:to-green-500 transition-all shadow-lg active:scale-95 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-input bg-card bg-orange-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-accent/50 border-b border-input">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Item Details</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weight</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-input">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground text-sm">
                    No products yet. Add one to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-accent/30 transition-colors group">
                    {/* Item Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-input"
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{product.name}</span>
                          <span className="text-xs text-muted-foreground">{product.origin ?? '—'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {product.category?.name ?? '—'}
                    </td>

                    {/* Weight */}
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-secondary text-secondary-foreground text-xs font-bold">
                        {product.weight ?? '—'}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-sm font-semibold">
                      KES {Number(product.price).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.inStock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          product.inStock ? 'bg-green-600' : 'bg-amber-600'
                        }`} />
                        {product.inStock ? 'Available' : 'Unavailable'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button
                          onClick={() => setEditProduct(product)}
                          className="p-2 hover:bg-blue-500/10 hover:text-blue-600 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Toggle Status */}
                        <button
                          onClick={() => handleToggleStatus(product.id, product.inStock)}
                          className="p-2 hover:bg-green-500/10 hover:text-green-600 rounded-lg transition-colors"
                          title={product.inStock ? 'Mark Unavailable' : 'Mark Available'}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-500/10 hover:text-red-600 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false)
            onRefresh()  // ← use parent's refresh
          }}
        />
      )}

      {/* Edit Modal */}
      {editProduct && (
        <AddItemModal
          isOpen={!!editProduct}
          product={editProduct}
          onClose={() => {
            setEditProduct(null)
            onRefresh()  // ← use parent's refresh
          }}
        />
      )}
    </div>
  )
}