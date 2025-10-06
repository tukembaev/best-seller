import prisma from "@/lib/prisma"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '0')

    const where = {
      inStock: true,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { brand: { name: { contains: q, mode: 'insensitive' } } },
              { category: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    }

    const products = await prisma.product.findMany({
      where,
      ...(limit ? { take: limit } : {}),
      orderBy: { createdAt: 'desc' },
      include: { brand: { select: { id: true, name: true, slug: true, logo: true } } },
    })

    return new Response(JSON.stringify({ products }), { status: 200 })
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 })
  }
}


