import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function GET() {
  try {
    const uploadsDir = join(process.cwd(), 'public', 'uploads')

    // Return empty array if directory doesn't exist
    if (!existsSync(uploadsDir)) {
      return Response.json({ images: [] })
    }

    // Read all files in uploads directory
    const files = await readdir(uploadsDir)

    // Get file stats for each image
    const images = await Promise.all(
      files
        .filter((file) => {
          // Filter only image files
          const ext = file.split('.').pop()?.toLowerCase()
          return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')
        })
        .map(async (filename) => {
          const filepath = join(uploadsDir, filename)
          const fileStats = await stat(filepath)

          return {
            filename,
            path: `/uploads/${filename}`,
            size: fileStats.size,
            uploadedAt: fileStats.mtime.toISOString(),
          }
        })
    )

    // Sort by upload date (newest first)
    images.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    )

    return Response.json({ images })
  } catch (error) {
    console.error('List error:', error)
    return Response.json(
      { error: 'Failed to list images' },
      { status: 500 }
    )
  }
}
