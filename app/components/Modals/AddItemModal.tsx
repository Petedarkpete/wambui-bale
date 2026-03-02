import { useState } from 'react'
import { X, Upload, AlertCircle, Loader2 } from 'lucide-react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@lib/firebase'
import { storage } from '@lib/firebase'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const AddItemModal = ({ onClose }: Props) => {
  const [images, setImages] = useState<File[]>([])
  const [imageErrors, setImageErrors] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    category: 'male',
    name: '',
    price: '',
    weight: '',
    pieces: '',
    origin: '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImageErrors('')

    if (files.length + images.length > 3) {
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
      // 1. Upload images to Firebase Storage
      const imageUrls: string[] = []
      console.log(images)

      for (const image of images) {
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`)
        await uploadBytes(storageRef, image)
        const url = await getDownloadURL(storageRef)
        imageUrls.push(url)
      }

      // 2. Save product to Firestore
      await addDoc(collection(db, 'products'), {
        category: form.category,
        name: form.name,
        price: Number(form.price),
        weight: form.weight,
        pieces: Number(form.pieces),
        origin: form.origin,
        images: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      onClose()
    } catch (error) {
      console.error('Error adding product:', error)
      setImageErrors('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto bg-black/70 backdrop-blur-md p-4 py-8">
      <div className="relative bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-2xl border border-input shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="top-0 z-10 flex items-center justify-between p-6 border-b border-input bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm rounded-t-2xl">
          <h2 className="text-xl font-bold text-foreground">Add New Inventory Item</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-green-500/20 outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
                <option value="kitchen">Kitchen</option>
                <option value="beddings">Beddings</option>
              </select>
            </div>

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

          {/* Image Upload */}
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
              {loading ? 'Saving...' : 'Add to Inventory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}