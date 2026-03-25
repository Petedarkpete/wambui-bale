import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const categoryName = formData.get('category') as string
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  const weight = formData.get('weight') as string
  const pieces = Number(formData.get('pieces'))
  const origin = formData.get('origin') as string
  const imageFiles = formData.getAll('images') as File[]

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')

  // Find or create category
  const categoryId = Number(formData.get('categoryId'))

  // Save images locally
  const imageUrls: string[] = []
  for (const image of imageFiles) {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}_${image.name}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(path.join(uploadDir, filename), buffer)
    imageUrls.push(`/uploads/${filename}`)
  }

  // Create product with relations
  const product = await prisma.product.create({
    data: {
      name,
      slug,
      price,
      weight,
      pieces,
      origin,
      categoryId,
      images: {
        create: imageUrls.map((url, index) => ({
          url,
          alt: name,
          isPrimary: index === 0,
        })),
      },
    },
    include: { images: true, category: true },
  })

  return NextResponse.json(product)
}