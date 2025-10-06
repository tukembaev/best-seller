import React from 'react';
import { Settings, MapPin, User } from 'lucide-react';

export default function OrderInfo({ order }) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Order Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Order Information</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">PICKUP DATE</p>
              <p className="text-sm text-gray-700">
                {order?.pickupDate 
                  ? new Date(order.pickupDate).toLocaleString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric',
                      hour: '2-digit', minute: '2-digit', second: '2-digit',
                      hour12: true
                    })
                  : '26 May, 2024 12:24:10 pm'
                }
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">ESTIMATE DROP</p>
              <p className="text-sm text-gray-700">8 Days</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">RETURN AVAILABLE TIME</p>
              <p className="text-sm text-gray-700">In 7 Days</p>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Locations</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">PICKUP LOCATION</p>
              <p className="text-sm text-gray-700 mb-1">
                {order?.store?.name || 'Store Name'}
              </p>
              <p className="text-sm text-gray-700">
                {order?.pickupAddress 
                  ? `${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.state}, ${order.pickupAddress.zip}, ${order.pickupAddress.country}`
                  : `${order?.address?.street || ''}, ${order?.address?.city || ''}, ${order?.address?.state || ''}, ${order?.address?.zip || ''}, ${order?.address?.country || ''}`
                }
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">DROPOFF LOCATION</p>
              <p className="text-sm text-gray-700 mb-1">
                {order?.user?.name || 'Customer Name'}
              </p>
              <p className="text-sm text-gray-700">
                {order?.address 
                  ? `${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}, ${order.address.country}`
                  : '456 Maple Avenue, Brooklyn, NY 11201, United States'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gray-700" />
            <h3 className="text-lg font-semibold text-gray-900">Customer Details</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">FULL NAME</p>
              <p className="text-sm text-gray-700">{order?.user?.name || 'Jane Smith'}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">E-MAIL</p>
              <p className="text-sm text-gray-700">{order?.user?.email || 'mail@pagedone.com'}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-gray-500 mb-1">PHONE NUMBER</p>
              <p className="text-sm text-gray-700">{order?.address?.phone || '+1 369-1212'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
