'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Trash2, AlertCircle, Loader } from 'lucide-react'

interface ImageItem {
  filename: string
  path: string
  size: number
  uploadedAt: string
}

interface ImageGalleryProps {
  refreshTrigger?: number
}

export default function ImageGallery({ refreshTrigger = 0 }: ImageGalleryProps) {
  const [images, setImages] = useState<ImageItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingFile, setDeletingFile] = useState<string | null>(null)
  const [deleteMessage, setDeleteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const fetchImages = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/images/list')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch images')
      }

      setImages(data.images || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load images'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [refreshTrigger])

  const handleDelete = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return
    }

    setDeletingFile(filename)
    setDeleteMessage(null)

    try {
      const response = await fetch('/api/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete image')
      }

      setDeleteMessage({ type: 'success', text: `Deleted ${filename}` })
      setImages((prev) => prev.filter((img) => img.filename !== filename))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete image'
      setDeleteMessage({ type: 'error', text: errorMessage })
    } finally {
      setDeletingFile(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-6 h-6 text-gray-400 animate-spin" />
        <p className="ml-2 text-gray-500">Loading images...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500">No images uploaded yet</p>
        <p className="text-sm text-gray-400 mt-1">Upload an image to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Uploaded Images ({images.length})</h3>
        <button
          onClick={fetchImages}
          className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {deleteMessage && (
        <div
          className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
            deleteMessage.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {deleteMessage.type === 'success' ? (
            <span>✓</span>
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {deleteMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <div
            key={image.filename}
            className="group relative rounded-lg overflow-hidden bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="aspect-square relative">
              <Image
                src={image.path}
                alt={image.filename}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleDelete(image.filename)}
                disabled={deletingFile === image.filename}
                className="p-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-full transition-colors"
              >
                {deletingFile === image.filename ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="p-2 bg-gray-50 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-900 truncate">{image.filename}</p>
              <p className="text-xs text-gray-500">{(image.size / 1024).toFixed(1)} KB</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(image.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
