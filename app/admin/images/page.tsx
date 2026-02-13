'use client'

import { useState } from 'react'
import Link from 'next/link'
import ImageUploader from '@/app/components/ImageUploader'
import ImageGallery from '@/app/components/ImageGallery'
import { ArrowLeft } from 'lucide-react'

export default function AdminImagesPage() {
  const [refreshGallery, setRefreshGallery] = useState(0)

  const handleUploadSuccess = () => {
    // Trigger gallery refresh
    setRefreshGallery((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Image Management</h1>
          <p className="text-gray-600">Upload and manage bale product images for your shop</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h2>
              <ImageUploader onUploadSuccess={handleUploadSuccess} />

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Max file size: 5MB</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Formats: JPEG, PNG, WebP, GIF</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Use high-quality images</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Square images work best</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <ImageGallery refreshTrigger={refreshGallery} />
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">How to Use</h3>
          <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
            <li>Upload images using the uploader on the left</li>
            <li>All images are automatically saved to the server</li>
            <li>Use the delete button to remove images you no longer need</li>
            <li>Images will appear on your shop page automatically</li>
            <li>File paths are stored as <code className="bg-white px-2 py-1 rounded">/uploads/filename</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
