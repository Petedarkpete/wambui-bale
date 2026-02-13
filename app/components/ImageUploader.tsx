'use client'

import { useState, useRef } from 'react'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

interface UploadResponse {
  success: boolean
  filename: string
  path: string
  size: number
  uploadedAt: string
  error?: string
}

interface ImageUploaderProps {
  onUploadSuccess: (response: UploadResponse) => void
}

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const uploadFile = async (file: File) => {
    setIsLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', 'bale')

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      })

      const data = (await response.json()) as UploadResponse & { error?: string }

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setMessage({ type: 'success', text: `Successfully uploaded ${file.name}` })
      onUploadSuccess(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      setMessage({ type: 'error', text: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      await uploadFile(files[0])
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      await uploadFile(files[0])
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <Upload className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <div>
            <p className="font-semibold text-gray-900">
              {isLoading ? 'Uploading...' : 'Drag and drop your image here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">or click to select a file</p>
            <p className="text-xs text-gray-400 mt-2">Max 5MB • JPEG, PNG, WebP, GIF</p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}
    </div>
  )
}
