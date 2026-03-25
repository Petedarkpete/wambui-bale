import { NextRequest, NextResponse } from 'next/server'
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const { name, slug, description } = await req.json()

  if (!name || !slug || !description) {
    return NextResponse.json({ error: 'Name, slug and description are required' }, { status: 400 })
  }

  const existing = await prisma.category.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: 'Category already exists' }, { status: 400 })
  }

  const category = await prisma.category.create({
    data: { name, slug, description },
  })

  return NextResponse.json(category)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const all = searchParams.get('all')

 const categories = await prisma.category.findMany({
  where: { deletedAt: null, ...(all ? {} : { isActive: true }) },
  orderBy: { name: 'asc' },
  include: { _count: { select: { products: true } } },
})

  return NextResponse.json(categories)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()

  const products = await prisma.product.count({ where: { categoryId: id } })
  if (products > 0) {
    return NextResponse.json(
      { error: `Cannot delete — ${products} product(s) are using this category` },
      { status: 400 }
    )
  }

  await prisma.category.update({
    where: { id },
    data: { deletedAt: new Date() },
  })

  return NextResponse.json({ message: 'Category deleted' })
}

export async function PATCH(req: NextRequest) {
  const { id, name, slug, description, isActive } = await req.json()

  const category = await prisma.category.update({
    where: { id },
    data: { name, slug, description, isActive },
  })

  return NextResponse.json(category)
}