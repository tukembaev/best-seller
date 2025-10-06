'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteProduct } from '@/app/actions/productActions'

export default function DeleteProductModal({ isOpen, onClose, product, onProductDeleted }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        const result = await deleteProduct(product.id)
        
        if (result.success) {
            toast.success('Product deleted successfully!')
            onProductDeleted(product.id)
            onClose()
        } else {
            toast.error(result.error || 'Failed to delete product')
        }
        
        setLoading(false)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-red-600">Delete Product</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                        <p className="text-sm text-red-800 font-medium mb-2">
                            Удаление продукта {product.brand?.name || 'Unknown Brand'}
                        </p>
                        <p className="text-sm text-red-700">
                            Вы действительно хотите удалить этот товар?
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-md p-3">
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Product:</span> {product.name}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Brand:</span> {product.brand?.name || 'No Brand'}
                        </p>
                        <p className="text-sm text-gray-600">
                            <span className="font-medium">Price:</span> ${product.price?.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md transition disabled:opacity-50"
                    >
                        {loading ? 'Deleting...' : 'Delete Product'}
                    </button>
                </div>
            </div>
        </div>
    )
}


