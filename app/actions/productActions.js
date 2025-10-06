'use server'

import prisma from "@/lib/prisma.js"
import { revalidatePath } from "next/cache"
import path from "path"
import { promises as fs } from "fs"

export async function createProduct(formData) {
  try {
    // Нормализация ключей: поддержка префиксов вида "1_" (например, 1_name, 1_image1)
    const entries = Array.from(formData.entries())
    const normalized = new Map()
    for (const [key, value] of entries) {
      const match = key.match(/^\d+_(.+)$/)
      if (match) {
        normalized.set(match[1], value)
      } else {
        normalized.set(key, value)
      }
    }

    const get = (k) => normalized.get(k)

    const name = get('name')
    const description = get('description')
    const mrp = parseFloat(get('mrp'))
    const price = parseFloat(get('price'))
    const category = get('category')
    const stock = parseInt(get('stock')) || 0
    const brandId = get('brandId') && get('brandId').trim() !== '' ? get('brandId') : null
    
    // Watch characteristics as individual fields
    const collection = get('collection') || null
    const mechanism = get('mechanism') || null
    const gender = get('gender') || null
    const caseSize = get('caseSize') || null
    const caseMaterial = get('caseMaterial') || null
    const strapMaterial = get('strapMaterial') || null
    const waterResistance = get('waterResistance') || null

    // Загрузка изображений на диск и сохранение реальных путей
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    await fs.mkdir(uploadDir, { recursive: true })

    const imageCount = parseInt(get('imageCount')) || 0
    const images = []
    for (let i = 1; i <= Math.min(imageCount, 4); i++) {
      const file = get(`image${i}`) || get(`${i}_image${i}`) || get(`1_image${i}`)
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const ext = (file.name?.split('.').pop() || 'png').toLowerCase()
        const filename = `${Date.now()}_${i}.${ext}`
        const filePath = path.join(uploadDir, filename)
        await fs.writeFile(filePath, buffer)
        images.push(`/uploads/products/${filename}`)
      }
    }

    // Валидация обязательных полей
    if (!name || !description || !category || isNaN(mrp) || isNaN(price)) {
      return { success: false, error: 'Missing or invalid required fields' }
    }

    // Validate brandId if provided
    if (brandId) {
      const brandExists = await prisma.brand.findUnique({
        where: { id: brandId }
      })
      if (!brandExists) {
        return { success: false, error: 'Selected brand does not exist' }
      }
    }
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        mrp,
        price,
        category,
        stock,
        brandId,
        images,
        // Watch characteristics
        collection,
        mechanism,
        gender,
        caseSize,
        caseMaterial,
        strapMaterial,
        waterResistance,
      }
    })

    revalidatePath('/store/manage-product')
    return { success: true, product }
  } catch (error) {
    console.error('Error creating product:', error)
    return { success: false, error: error.message }
  }
}

export async function updateProduct(productId, formData) {
  try {
    const name = formData.get('name')
    const description = formData.get('description')
    const mrp = parseFloat(formData.get('mrp'))
    const price = parseFloat(formData.get('price'))
    const stock = parseInt(formData.get('stock'))
    const inStock = formData.get('inStock') === 'true'
    
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        mrp,
        price,
        stock,
        inStock,
      }
    })

    revalidatePath('/store/manage-product')
    return { success: true, product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteProduct(productId) {
  try {
    await prisma.product.delete({
      where: { id: productId }
    })

    revalidatePath('/store/manage-product')
    return { success: true }
  } catch (error) {
    console.error('Error deleting product:', error)
    return { success: false, error: error.message }
  }
}

export async function toggleStock(productId) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        inStock: !product.inStock
      }
    })

    revalidatePath('/store/manage-product')
    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error('Error toggling stock:', error)
    return { success: false, error: error.message }
  }
}

export async function reduceStock(productId, amount) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    if (product.stock < amount) {
      return { success: false, error: 'Insufficient stock' }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        stock: product.stock - amount,
        inStock: product.stock - amount > 0
      }
    })

    revalidatePath('/store/manage-product')
    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error('Error reducing stock:', error)
    return { success: false, error: error.message }
  }
}

export async function increaseStock(productId, amount) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        stock: product.stock + amount,
        inStock: true
      }
    })

    revalidatePath('/store/manage-product')
    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error('Error increasing stock:', error)
    return { success: false, error: error.message }
  }
}

export async function updatePrice(productId, newPrice) {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        price: parseFloat(newPrice)
      }
    })

    revalidatePath('/store/manage-product')
    return { success: true, product: updatedProduct }
  } catch (error) {
    console.error('Error updating price:', error)
    return { success: false, error: error.message }
  }
}

export async function updateProductFull(formData) {
  try {
    const productId = formData.get('productId')
    const name = formData.get('name')
    const description = formData.get('description')
    const mrp = parseFloat(formData.get('mrp'))
    const price = parseFloat(formData.get('price'))
    const category = formData.get('category')
    const stock = parseInt(formData.get('stock')) || 0
    const brandId = formData.get('brandId') && formData.get('brandId').trim() !== '' ? formData.get('brandId') : null
    
    // Watch characteristics as individual fields
    const collection = formData.get('collection') || null
    const mechanism = formData.get('mechanism') || null
    const gender = formData.get('gender') || null
    const caseSize = formData.get('caseSize') || null
    const caseMaterial = formData.get('caseMaterial') || null
    const strapMaterial = formData.get('strapMaterial') || null
    const waterResistance = formData.get('waterResistance') || null

    // Handle new images
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    await fs.mkdir(uploadDir, { recursive: true })

    const imageCount = parseInt(formData.get('imageCount')) || 0
    const existingImageCount = parseInt(formData.get('existingImageCount')) || 0
    const newImages = []
    const existingImages = []

    // Process new uploaded images
    for (let i = 1; i <= Math.min(imageCount, 4); i++) {
      const file = formData.get(`image${i}`)
      if (file && typeof file === 'object' && 'arrayBuffer' in file) {
        const buffer = Buffer.from(await file.arrayBuffer())
        const ext = (file.name?.split('.').pop() || 'png').toLowerCase()
        const filename = `${Date.now()}_${i}.${ext}`
        const filePath = path.join(uploadDir, filename)
        await fs.writeFile(filePath, buffer)
        newImages.push(`/uploads/products/${filename}`)
      }
    }

    // Process existing images
    for (let i = 1; i <= existingImageCount; i++) {
      const existingImage = formData.get(`existingImage${i}`)
      if (existingImage) {
        existingImages.push(existingImage)
      }
    }

    // Combine existing and new images
    const allImages = [...existingImages, ...newImages]

    // Валидация обязательных полей
    if (!name || !description || !category || isNaN(mrp) || isNaN(price)) {
      return { success: false, error: 'Missing or invalid required fields' }
    }

    // Validate brandId if provided
    if (brandId) {
      const brandExists = await prisma.brand.findUnique({
        where: { id: brandId }
      })
      if (!brandExists) {
        return { success: false, error: 'Selected brand does not exist' }
      }
    }
    
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        mrp,
        price,
        category,
        stock,
        brandId,
        images: allImages,
        // Watch characteristics
        collection,
        mechanism,
        gender,
        caseSize,
        caseMaterial,
        strapMaterial,
        waterResistance,
      }
    })

    revalidatePath('/store/manage-product')
    revalidatePath(`/store/edit-product/${productId}`)
    return { success: true, product }
  } catch (error) {
    console.error('Error updating product:', error)
    return { success: false, error: error.message }
  }
}