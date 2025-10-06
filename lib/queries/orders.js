import prisma from '../prisma.js'

// Получить все заказы для магазина
export async function getStoreOrders(storeId) {
  const orders = await prisma.order.findMany({
    where: {
      storeId
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        }
      },
      address: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
              price: true,
            }
          }
        }
      },
      // trackingUpdates: {
      //   orderBy: {
      //     date: 'desc'
      //   }
      // }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Добавляем tracking updates через отдельный запрос
  for (const order of orders) {
    order.trackingUpdates = await prisma.orderTracking.findMany({
      where: { orderId: order.id },
      orderBy: { date: 'desc' }
    })
  }

  return orders
}

// Получить заказ по ID с полной информацией
export async function getOrderById(orderId) {
  return await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
        }
      },
      store: {
        select: {
          name: true,
          email: true,
          contact: true,
        }
      },
      address: true,
      pickupAddress: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
              price: true,
              spec: true,
            }
          }
        }
      },
      trackingUpdates: {
        orderBy: {
          date: 'asc'
        }
      }
    }
  })
}

// Получить заказы покупателя
export async function getUserOrders(userId) {
  return await prisma.order.findMany({
    where: {
      userId
    },
    include: {
      store: {
        select: {
          name: true,
          username: true,
        }
      },
      address: true,
      orderItems: {
        include: {
          product: {
            select: {
              name: true,
              images: true,
              price: true,
            }
          }
        }
      },
      trackingUpdates: {
        orderBy: {
          date: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

// Обновить статус заказа
export async function updateOrderStatus(orderId, status, trackingStatus = null) {
  const updateData = {
    status,
    updatedAt: new Date()
  }
  
  if (trackingStatus) {
    updateData.trackingStatus = trackingStatus
  }

  const order = await prisma.order.update({
    where: {
      id: orderId
    },
    data: updateData,
    include: {
      trackingUpdates: true
    }
  })

  // Добавить запись в историю отслеживания
  if (trackingStatus) {
    await prisma.orderTracking.create({
      data: {
        orderId,
        status: trackingStatus,
        date: new Date(),
        location: getLocationForStatus(trackingStatus),
        notes: getNotesForStatus(trackingStatus),
      }
    })
  }

  return order
}

// Получить статистику заказов для магазина
export async function getStoreOrderStats(storeId) {
  const [
    totalOrders,
    pendingOrders,
    processingOrders,
    deliveredOrders,
    totalRevenue
  ] = await Promise.all([
    prisma.order.count({ where: { storeId } }),
    prisma.order.count({ where: { storeId, status: 'ORDER_PLACED' } }),
    prisma.order.count({ where: { storeId, status: 'PROCESSING' } }),
    prisma.order.count({ where: { storeId, status: 'DELIVERED' } }),
    prisma.order.aggregate({
      where: { 
        storeId,
        status: 'DELIVERED'
      },
      _sum: {
        total: true
      }
    })
  ])

  return {
    totalOrders,
    pendingOrders,
    processingOrders,
    deliveredOrders,
    totalRevenue: totalRevenue._sum.total || 0
  }
}

// Вспомогательные функции
function getLocationForStatus(status) {
  const locations = {
    "ORDER_RECEIVED": "Distribution Center",
    "IN_TRANSIT": "On Route",
    "ON_SORTING_CENTER": "Sorting Center",
    "ON_THE_WAY": "Local Delivery",
    "DELIVERED": "Final Destination"
  }
  return locations[status] || "Unknown"
}

function getNotesForStatus(status) {
  const notes = {
    "ORDER_RECEIVED": "Order confirmed and packed",
    "IN_TRANSIT": "Package is in transit",
    "ON_SORTING_CENTER": "Package arrived at sorting center", 
    "ON_THE_WAY": "Out for delivery",
    "DELIVERED": "Package delivered successfully"
  }
  return notes[status] || ""
}
