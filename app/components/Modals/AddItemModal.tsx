import { useState, useEffect } from 'react'
import { X, Upload, AlertCircle, Loader2 } from 'lucide-react'

interface Category {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  price: number
  weight: string | null
  pieces: number | null
  origin: string | null
  inStock: boolean
  category: { id: number; name: string }
  images: { url: string; isPrimary: boolean }[]
}

interface Props {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
}

export const AddItemModal = ({ onClose, product }: Props) => {
  const [images, setImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<{ url: string; isPrimary: boolean }[]>(
    product?.images ?? []
  )
  const [imageErrors, setImageErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({
    category: product?.category?.id?.toString() ?? '',
    name: product?.name ?? '',
    price: product?.price?.toString() ?? '',
    weight: product?.weight ?? '',
    pieces: product?.pieces?.toString() ?? '',
    origin: product?.origin ?? '',
  })

  const isEditing = !!product

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImageErrors('')

    const totalImages = files.length + images.length + existingImages.length
    if (totalImages > 3) {
      setImageErrors('You can only upload a maximum of 3 images.')
      return
    }

    const oversized = files.find(file => file.size > 1024 * 1024)
    if (oversized) {
      setImageErrors(`"${oversized.name}" is too large. Max size is 1MB.`)
      return
    }

    setImages([...images, ...files])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isEditing) {
        // PATCH — edit existing product
        const res = await fetch('/api/products', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: product.id,
            name: form.name,
            price: Number(form.price),
            weight: form.weight,
            pieces: Number(form.pieces),
            origin: form.origin,
            categoryId: Number(form.category),
          }),
        })
        if (!res.ok) throw new Error('Failed to update product')
      } else {
        // POST — create new product
        const formData = new FormData()
        formData.append('categoryId', form.category)
        formData.append('name', form.name)
        formData.append('price', form.price)
        formData.append('weight', form.weight)
        formData.append('pieces', form.pieces)
        formData.append('origin', form.origin)
        for (const image of images) {
          formData.append('images', image)
        }

        const res = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) throw new Error('Failed to save product')
      }

      onClose()
    } catch (error) {
      console.error('Error saving product:', error)
      setImageErrors('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-black/70 backdrop-blur-md p-4 py-8">
      <div className="relative bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-2xl border border-input shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="top-0 z-10 flex items-center justify-between p-6 border-b border-input bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-xl font-bold text-foreground">
            {isEditing ? 'Edit Product' : 'Add New Inventory Item'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                required
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Item Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Leather Bag"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (KES)</label>
              <input
                type="number"
                required
                placeholder="0.00"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              />
            </div>

            {/* Weight */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (kg)</label>
              <input
                type="text"
                placeholder="e.g. 0.5kg"
                value={form.weight}
                onChange={e => setForm({ ...form, weight: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              />
            </div>

            {/* Pieces */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Pieces Available</label>
              <input
                type="number"
                placeholder="1"
                value={form.pieces}
                onChange={e => setForm({ ...form, pieces: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              />
            </div>

            {/* Origin */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Origin</label>
              <input
                type="text"
                placeholder="e.g. Turkey, Local"
                value={form.origin}
                onChange={e => setForm({ ...form, origin: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              />
            </div>
          </div>

          {/* Images */}
          {!isEditing && (
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                Product Images (Max 3)
                <span className="text-xs text-muted-foreground font-normal">(Under 1MB each)</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="aspect-square rounded-xl border-2 border-dashed border-input bg-accent/10 flex items-center justify-center relative overflow-hidden group">
                    {images[index] ? (
                      <>
                        <img src={URL.createObjectURL(images[index])} className="object-cover w-full h-full" alt="Preview" />
                        <button
                          type="button"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      </label>
                    )}
                  </div>
                ))}
              </div>
              {imageErrors && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {imageErrors}
                </p>
              )}
            </div>
          )}

          {/* Existing images when editing */}
          {isEditing && existingImages.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Current Images</label>
              <div className="grid grid-cols-3 gap-4">
                {existingImages.map((img, index) => (
                  <div key={index} className="aspect-square rounded-xl border border-input overflow-hidden relative group">
                    <img src={img.url} className="object-cover w-full h-full" alt="Product" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-input">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg hover:bg-accent text-sm font-medium transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 rounded-lg bg-gradient-to-r from-black from-80% to-green-600 text-white font-medium hover:to-green-500 transition-all shadow-lg active:scale-95 disabled:opacity-60 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add to Inventory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}