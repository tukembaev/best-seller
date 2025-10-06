import React from 'react';
import { Check } from 'lucide-react';

export default function OrderTracking({ steps }) {
  const trackingSteps = steps || [
    { id: 1, title: "Order Received", date: "May 26, 2024" },
    { id: 2, title: "In Transit", date: "May 28, 2024" },
    { id: 3, title: "On Sorting Center", date: "May 30, 2024" },
    { id: 4, title: "On the Way", date: "June 02, 2024" },
    { id: 5, title: "Delivered", date: "June 06, 2024" }
  ];

      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Tracking</h2>
      
      <div className="relative">
        <div className="flex flex-row-reverse items-start justify-between">
          {trackingSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10 relative">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">{step.title}</p>
                <p className="text-xs text-gray-500">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Connecting lines */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-green-500"></div>
      </div>
    </div>
  );
}
