import prisma from "@/lib/prisma";

export async function getProductsWithRelations() {
  return prisma.product.findMany({
    where: { inStock: true },
    include: {
      brand: { select: { id: true, name: true, slug: true, logo: true } },
      rating: true,
      _count: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAllProductsWithRelations() {
  return prisma.product.findMany({
    include: {
      brand: { select: { id: true, name: true, slug: true, logo: true } },
      rating: true,
      _count: { select: { rating: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLatestProducts(limit = 4) {
  return prisma.product.findMany({
    take: limit,
    where: { inStock: true },
    orderBy: { createdAt: "desc" },
    include: {
      brand: { select: { id: true, name: true, slug: true, logo: true } },
      rating: true,
    },
  });
}

export async function getBrands() {
  return prisma.brand.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });
}

export async function getProductById(productId) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      brand: { select: { id: true, name: true, slug: true, logo: true } },
      rating: {
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });
}

export async function getBrandById(brandId) {
  return prisma.brand.findUnique({
    where: { id: brandId },
    include: {
      products: {
        where: { inStock: true },
        include: {
          brand: { select: { id: true, name: true, slug: true, logo: true } },
          rating: true,
          _count: { select: { rating: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function getBrandBySlug(slug) {
  return prisma.brand.findUnique({
    where: { slug: slug },
    include: {
      products: {
        where: { inStock: true },
        include: {
          brand: { select: { id: true, name: true, slug: true, logo: true } },
          rating: true,
          _count: { select: { rating: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
