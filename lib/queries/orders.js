import prisma from '../prisma.js'

// Получить все заказы (для единственного магазина)
export async function getStoreOrders() {
  const orders = await prisma.order.findMany({
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

// Получить статистику заказов (для единственного магазина)
export async function getStoreOrderStats() {
  const [
    totalOrders,
    pendingOrders,
    processingOrders,
    deliveredOrders,
    totalRevenue
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: 'ORDER_PLACED' } }),
    prisma.order.count({ where: { status: 'PROCESSING' } }),
    prisma.order.count({ where: { status: 'DELIVERED' } }),
    prisma.order.aggregate({
      where: { 
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

// Создать новый заказ
export async function createOrder(orderData) {
  const { userId, addressId, total, paymentMethod, orderItems, coupon = null } = orderData;
  
  // Генерируем уникальный номер заказа
  const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
  
  const order = await prisma.order.create({
    data: {
      orderNumber,
      total,
      userId,
      addressId,
      paymentMethod,
      isCouponUsed: !!coupon,
      coupon: coupon || {},
      orderItems: {
        create: orderItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      },
      trackingUpdates: {
        create: {
          status: 'ORDER_RECEIVED',
          date: new Date(),
          location: 'Distribution Center',
          notes: 'Order confirmed and packed',
        }
      }
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
      }
    }
  });

  return order;
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
