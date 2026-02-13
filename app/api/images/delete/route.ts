import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: Request) {
  try {
    const { filename } = await request.json()

    if (!filename) {
      return Response.json({ error: 'No filename provided' }, { status: 400 })
    }

    // Prevent directory traversal attacks
    if (filename.includes('..') || filename.includes('/')) {
      return Response.json({ error: 'Invalid filename' }, { status: 400 })
    }

    const filepath = join(process.cwd(), 'public', 'uploads', filename)

    // Check if file exists
    if (!existsSync(filepath)) {
      return Response.json({ error: 'File not found' }, { status: 404 })
    }

    // Delete the file
    await unlink(filepath)

    return Response.json({
      success: true,
      message: `File ${filename} deleted successfully`,
      deletedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Delete error:', error)
    return Response.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    )
  }
}
