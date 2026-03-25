import { NextRequest, NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, images: true },
  })
  return NextResponse.json(products)
}

export async function PATCH(req: NextRequest) {
  const { id, inStock, ...rest } = await req.json()
  const product = await prisma.product.update({
    where: { id },
    data: { inStock, ...rest },
  })
  return NextResponse.json(product)
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  await prisma.product.delete({ where: { id } })
  return NextResponse.json({ message: 'Product deleted' })
}