import React from 'react';
import Image from 'next/image';

export default function ItemListTable({ items }) {
  const defaultItems = items || [
    {
      id: 1,
      name: "Laptop",
      basePrice: 80.00,
      quantity: 1,
      total: 80.00,
      image: "/assets/product_img1.png"
    },
    {
      id: 2,
      name: "Watch",
      basePrice: 56.00,
      quantity: 2,
      total: 112.00,
      image: "/assets/product_img2.png"
    },
    {
      id: 3,
      name: "Headphone",
      basePrice: 94.00,
      quantity: 1,
      total: 94.00,
      image: "/assets/product_img3.png"
    },
    {
      id: 4,
      name: "Perfume",
      basePrice: 83.00,
      quantity: 1,
      total: 83.00,
      image: "/assets/product_img4.png"
    }
  ];

  const currentItems = defaultItems;
  const grandTotal = currentItems.reduce((sum, item) => sum + item.total, 0);

      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Item List</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">NO</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">ITEM NAME</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">BASE PRICE</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">QUANTITY</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 px-4 text-sm text-gray-700">{item.id}</td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700 text-right">${item.basePrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-right">{item.quantity}</td>
                <td className="py-3 px-4 text-sm text-gray-700 text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan="4" className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">
                ALL TOTAL
              </td>
              <td className="py-3 px-4 text-sm font-bold text-gray-900 text-right">
                ${grandTotal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
