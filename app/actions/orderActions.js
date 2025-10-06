'use server'

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

