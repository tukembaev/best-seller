'use server'

import prisma from '@/lib/prisma.js'
import { getStoreOrders, getOrderById, updateOrderStatus, getStoreOrderStats, getUserOrders, createOrder } from '@/lib/queries/orders'
import { getNextTrackingStatus } from '@/lib/utils/orderHelpers'

export async function fetchStoreOrders() {
  try {
    console.log('Fetching all orders')
    const orders = await getStoreOrders()
    console.log('Found orders:', orders.length)
    return {
      success: true,
      orders
    }
  } catch (error) {
    console.error('Error fetching store orders:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return {
      success: false,
      error: `Failed to fetch orders: ${error.message}`
    }
  }
}

export async function fetchOrderById(orderId) {
  try {
    const order = await getOrderById(orderId)
    if (!order) {
      return {
        success: false,
        error: 'Order not found'
      }
    }
    return {
      success: true,
      order
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    return {
      success: false,
      error: 'Failed to fetch order details'
    }
  }
}

export async function updateOrder(orderId, status, trackingStatus = null) {
  try {
    const updatedOrder = await updateOrderStatus(orderId, status, trackingStatus)
    return {
      success: true,
      order: updatedOrder
    }
  } catch (error) {
    console.error('Error updating order:', error)
    return {
      success: false,
      error: 'Failed to update order'
    }
  }
}

export async function fetchStoreOrderStats() {
  try {
    const stats = await getStoreOrderStats()
    return {
      success: true,
      stats
    }
  } catch (error) {
    console.error('Error fetching store stats:', error)
    return {
      success: false,
      error: 'Failed to fetch store statistics'
    }
  }
}

export async function fetchUserOrders(userId) {
  try {
    const orders = await getUserOrders(userId)
    return {
      success: true,
      orders
    }
  } catch (error) {
    console.error('Error fetching user orders:', error)
    return {
      success: false,
      error: 'Failed to fetch user orders'
    }
  }
}

export async function placeOrder(orderData) {
  try {
    const order = await createOrder(orderData)
    return {
      success: true,
      order
    }
  } catch (error) {
    console.error('Error placing order:', error)
    return {
      success: false,
      error: 'Failed to place order'
    }
  }
}

// Получение непринятых заказов для продавца
export async function getUnassignedOrders() {
  try {
    // Получаем заказы, которые не приняты ни одним продавцом
    // Пока что просто возвращаем заказы в статусе ORDER_PLACED
    const orders = await prisma.order.findMany({
      where: {
        status: 'ORDER_PLACED'
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: {
              include: {
                brand: true
              }
            }
          }
        },
        address: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      orders
    }
  } catch (error) {
    console.error('Error fetching unassigned orders:', error)
    return {
      success: false,
      error: 'Failed to fetch unassigned orders'
    }
  }
}

// Принятие заказа продавцом
export async function acceptOrder(orderId, sellerId) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PROCESSING',
        trackingStatus: 'ORDER_RECEIVED',
        sellerId: sellerId
      }
    })

    // Создаем запись в истории отслеживания
    await prisma.orderTracking.create({
      data: {
        orderId: orderId,
        status: 'ORDER_RECEIVED',
        date: new Date(),
        notes: 'Заказ принят продавцом'
      }
    })

    return {
      success: true,
      order: updatedOrder
    }
  } catch (error) {
    console.error('Error accepting order:', error)
    return {
      success: false,
      error: 'Failed to accept order'
    }
  }
}

// Получение заказов конкретного продавца
export async function getSellerOrders(sellerId) {
  try {
    console.log('Fetching orders for seller:', sellerId)
    
    const orders = await prisma.order.findMany({
      where: {
        sellerId: sellerId
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: {
              include: {
                brand: true
              }
            }
          }
        },
        address: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('Found orders:', orders.length)

    return {
      success: true,
      orders
    }
  } catch (error) {
    console.error('Error fetching seller orders:', error)
    return {
      success: false,
      error: 'Failed to fetch seller orders'
    }
  }
}

// Отказ от заказа (возвращает в общий пул)
export async function rejectOrder(orderId) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        sellerId: null,
        status: 'ORDER_PLACED',
        trackingStatus: 'ORDER_RECEIVED'
      }
    })

    // Создаем запись в истории отслеживания
    await prisma.orderTracking.create({
      data: {
        orderId: orderId,
        status: 'ORDER_RECEIVED',
        date: new Date(),
        notes: 'Продавец отказался от заказа'
      }
    })

    return {
      success: true,
      order: updatedOrder
    }
  } catch (error) {
    console.error('Error rejecting order:', error)
    return {
      success: false,
      error: 'Failed to reject order'
    }
  }
}

// Получение продаж продавца
export async function getSellerSales(sellerId) {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        sellerId: sellerId
      },
      include: {
        saleItems: {
          include: {
            product: {
              include: {
                brand: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return {
      success: true,
      sales
    }
  } catch (error) {
    console.error('Error fetching seller sales:', error)
    return {
      success: false,
      error: 'Failed to fetch seller sales'
    }
  }
}

// Завершение заказа (перевод в статус DELIVERED)
export async function completeOrder(orderId) {
  try {
    // Сначала проверяем, существует ли заказ
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!existingOrder) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'DELIVERED',
        trackingStatus: 'DELIVERED'
      }
    })

    // Создаем запись в истории отслеживания
    await prisma.orderTracking.create({
      data: {
        orderId: orderId,
        status: 'DELIVERED',
        date: new Date(),
        notes: 'Заказ успешно доставлен и завершен'
      }
    })

    return {
      success: true,
      order: updatedOrder
    }
  } catch (error) {
    console.error('Error completing order:', error)
    return {
      success: false,
      error: 'Failed to complete order'
    }
  }
}

// Удаление заказа из списка продавца (убираем sellerId)
export async function removeOrderFromSeller(orderId) {
  try {
    // Сначала проверяем, существует ли заказ
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!existingOrder) {
      return {
        success: false,
        error: 'Order not found'
      }
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        sellerId: null,
        status: 'DELIVERED'
      }
    })

    return {
      success: true,
      order: updatedOrder
    }
  } catch (error) {
    console.error('Error removing order from seller:', error)
    return {
      success: false,
      error: 'Failed to remove order from seller'
    }
  }
}

// Получение статистики продавца
export async function getSellerStats(sellerId) {
  try {
    // Получаем заказы продавца
    const orders = await prisma.order.findMany({
      where: { sellerId: sellerId }
    })

    // Получаем продажи продавца
    const sales = await prisma.sale.findMany({
      where: { sellerId: sellerId }
    })

    // Вычисляем статистику
    const totalOrders = orders.length
    const completedOrders = orders.filter(o => o.status === 'DELIVERED').length
    const totalOrderRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    
    const totalSales = sales.length
    const totalSalesRevenue = sales.reduce((sum, s) => sum + s.total, 0)
    
    const totalRevenue = totalOrderRevenue + totalSalesRevenue

    return {
      success: true,
      stats: {
        totalOrders,
        completedOrders,
        totalSales,
        registeredSales: totalSales,
        totalRevenue,
        orderRevenue: totalOrderRevenue,
        salesRevenue: totalSalesRevenue
      }
    }
  } catch (error) {
    console.error('Error fetching seller stats:', error)
    return {
      success: false,
      error: 'Failed to fetch seller statistics'
    }
  }
}

