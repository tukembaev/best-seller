// Helper functions for order display and processing

// Логика для обновления статуса на основе текущего
export function getNextOrderStatus(currentStatus) {
  const statusFlow = {
    'ORDER_PLACED': 'PROCESSING',
    'PROCESSING': 'IN_TRANSIT', 
    'IN_TRANSIT': 'ON_SORTING_CENTER',
    'ON_SORTING_CENTER': 'ON_THE_WAY',
    'ON_THE_WAY': 'DELIVERED',
    'DELIVERED': 'DELIVERED', // Финальный статус
    'CANCELLED': 'CANCELLED', // Финальный статус
  }
  
  return statusFlow[currentStatus] || currentStatus
}

export function getNextTrackingStatus(currentTrackingStatus) {
  const trackingFlow = {
    'ORDER_RECEIVED': 'IN_TRANSIT',
    'IN_TRANSIT': 'ON_SORTING_CENTER', 
    'ON_SORTING_CENTER': 'ON_THE_WAY',
    'ON_THE_WAY': 'DELIVERED',
    'DELIVERED': 'DELIVERED', // Финальный статус
  }
  
  return trackingFlow[currentTrackingStatus] || currentTrackingStatus
}

export function getStatusDisplayName(status) {
  const displayNames = {
    'ORDER_PLACED': 'Order Placed',
    'PROCESSING': 'Processing',
    'IN_TRANSIT': 'In Transit',
    'ON_SORTING_CENTER': 'On Sorting Center', 
    'ON_THE_WAY': 'On the Way',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled',
    'RETURNED': 'Returned',
  }
  
  return displayNames[status] || status
}

export function getTrackingDisplayName(status) {
  const displayNames = {
    'ORDER_RECEIVED': 'Order Received',
    'IN_TRANSIT': 'In Transit',
    'ON_SORTING_CENTER': 'On Sorting Center',
    'ON_THE_WAY': 'On the Way',
    'DELIVERED': 'Delivered',
  }
  
  return displayNames[status] || status
}

export function getPaymentMethodDisplayName(method) {
  const displayNames = {
    'COD': 'Cash on Delivery',
    'STRIPE': 'Credit Card',
    'PAYPAL': 'PayPal',
    'BANK_TRANSFER': 'Bank Transfer',
    'WALLET': 'Digital Wallet',
  }
  
  return displayNames[method] || method
}
