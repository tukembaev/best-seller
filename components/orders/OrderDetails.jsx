import React from 'react';
import OrderTracking from './OrderTracking';
import OrderInfo from './OrderInfo';
import ItemListTable from './ItemListTable';

export default function OrderDetails({ order }) {
  if (!order) {
    return (
      <div className="px-6 my-20 max-w-6xl mx-auto">
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold text-gray-700">Order not found</h2>
          <p className="text-gray-500 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const trackingSteps = order.trackingUpdates && order.trackingUpdates.length > 0 
    ? order.trackingUpdates.map(update => ({
        id: update.status.toLowerCase().replace(/_/g, '_'),
        title: getDisplayTitle(update.status),
        date: new Date(update.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: '2-digit' 
        })
      }))
    : [
        { id: 'order_received', title: 'Order Received', date: 'May 26, 2024' },
        { id: 'in_transit', title: 'In Transit', date: 'May 28, 2024' },
        { id: 'on_sorting_center', title: 'On Sorting Center', date: 'May 30, 2024' },
        { id: 'on_the_way', title: 'On the Way', date: 'June 02, 2024' },
        { id: 'delivered', title: 'Delivered', date: 'June 06, 2024' }
      ];

  const products = order.orderItems?.map((item, index) => ({
    id: index + 1,
    name: item.product?.name || 'Unknown Product',
    basePrice: item.price,
    quantity: item.quantity,
    total: item.price * item.quantity,
    image: item.product?.images?.[0] || "/assets/product_img1.png"
  })) || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Order #{order.orderNumber}
          {order.seller?.name && (
            <span className="text-lg font-normal text-gray-600 ml-2">
              ({order.seller.name})
            </span>
          )}
        </h1>
      </div>

      <div className="space-y-6">
        <OrderTracking steps={trackingSteps} />
        <OrderInfo order={order} />
        <ItemListTable items={products} />
      </div>
    </div>
  );
}

function getDisplayTitle(status) {
  const titles = {
    'ORDER_RECEIVED': 'Order Received',
    'IN_TRANSIT': 'In Transit',
    'ON_SORTING_CENTER': 'On Sorting Center',
    'ON_THE_WAY': 'On the Way',
    'DELIVERED': 'Delivered'
  };
  return titles[status] || status;
}
