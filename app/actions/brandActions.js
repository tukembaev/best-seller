'use server'

import prisma from "@/lib/prisma.js"
import path from "path"
import { promises as fs } from "fs"
import { revalidatePath } from "next/cache"

export async function createBrand(formData) {
  try {
    const name = formData.get('name')
    const slug = formData.get('slug')
    const description = formData.get('description')
    const logoFile = formData.get('logo')
    let logo = null
    if (logoFile && typeof logoFile === 'object' && 'arrayBuffer' in logoFile) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'brands')
      await fs.mkdir(uploadDir, { recursive: true })
      const buffer = Buffer.from(await logoFile.arrayBuffer())
      const ext = (logoFile.name?.split('.').pop() || 'png').toLowerCase()
      const filename = `${Date.now()}_brand.${ext}`
      const filePath = path.join(uploadDir, filename)
      await fs.writeFile(filePath, buffer)
      logo = `/uploads/brands/${filename}`
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
        description,
        logo,
      }
    })

    revalidatePath('/store')
    return { success: true, brand }
  } catch (error) {
    console.error('Error creating brand:', error)
    return { success: false, error: error.message }
  }
}

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } }
    })
    return { success: true, brands }
  } catch (error) {
    console.error('Error fetching brands:', error)
    return { success: false, error: error.message }
  }
}

export async function updateBrand(brandId, formData) {
  try {
    const name = formData.get('name')
    const slug = formData.get('slug')
    const description = formData.get('description')

    const brand = await prisma.brand.update({
      where: { id: brandId },
      data: {
        name,
        slug,
        description,
      }
    })

    revalidatePath('/store')
    return { success: true, brand }
  } catch (error) {
    console.error('Error updating brand:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteBrand(brandId) {
  try {
    // Check if brand has products
    const productsCount = await prisma.product.count({
      where: { brandId }
    })

    if (productsCount > 0) {
      return { success: false, error: 'Cannot delete brand with existing products' }
    }

    await prisma.brand.delete({
      where: { id: brandId }
    })

    revalidatePath('/store')
    return { success: true }
  } catch (error) {
    console.error('Error deleting brand:', error)
    return { success: false, error: error.message }
  }
}
