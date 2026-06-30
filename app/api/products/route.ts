import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: true },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const productData = {
    name: "",
    price: 0,
    weight: null as string | null,
    pieces: null as number | null,
    origin: null as string | null,
    categoryId: 0,
    images: [] as File[],
  };

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    productData.name = (formData.get("name") as string)?.trim() || "";
    productData.price = Number(formData.get("price"));
    const weightValue = (formData.get("weight") as string)?.trim() || "";
    const piecesValue = (formData.get("pieces") as string)?.trim() || "";
    productData.origin = (formData.get("origin") as string)?.trim() || null;
    productData.categoryId = Number(formData.get("categoryId"));
    productData.images = formData.getAll("images") as File[];
    productData.weight = weightValue || null;
    productData.pieces = piecesValue ? Number(piecesValue) : null;
  } else {
    const body = await req.json();
    productData.name = (body.name as string)?.trim() || "";
    productData.price = Number(body.price);
    productData.weight = (body.weight as string)?.trim() || null;
    productData.pieces = body.pieces != null ? Number(body.pieces) : null;
    productData.origin = (body.origin as string)?.trim() || null;
    productData.categoryId = Number(body.categoryId);
    productData.images = [];
  }

  if (
    !productData.name ||
    !productData.categoryId ||
    Number.isNaN(productData.price)
  ) {
    return NextResponse.json(
      { error: "Invalid product data" },
      { status: 400 },
    );
  }

  const baseSlug = productData.name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const imageUrls: string[] = [];
  if (productData.images.length > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    for (const image of productData.images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}_${image.name}`;
      await writeFile(path.join(uploadDir, filename), buffer);
      imageUrls.push(`/uploads/${filename}`);
    }
  }

  const product = await prisma.product.create({
    data: {
      name: productData.name,
      slug,
      price: productData.price,
      weight: productData.weight,
      pieces: productData.pieces,
      origin: productData.origin,
      categoryId: productData.categoryId,
      images: imageUrls.length
        ? {
            create: imageUrls.map((url, index) => ({
              url,
              alt: productData.name,
              isPrimary: index === 0,
            })),
          }
        : undefined,
    },
    include: { images: true, category: true },
  });

  return NextResponse.json(product);
}

export async function PATCH(req: NextRequest) {
  const { id, inStock, ...rest } = await req.json();
  const product = await prisma.product.update({
    where: { id },
    data: { inStock, ...rest },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Product deleted" });
}
