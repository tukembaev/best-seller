'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { updatePrice } from '@/app/actions/productActions'

export default function EditPriceModal({ isOpen, onClose, product, onPriceUpdated }) {
    const [newPrice, setNewPrice] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!newPrice || isNaN(newPrice) || parseFloat(newPrice) <= 0) {
            toast.error('Please enter a valid price')
            return
        }

        setLoading(true)
        const result = await updatePrice(product.id, newPrice)
        
        if (result.success) {
            toast.success('Price updated successfully!')
            onPriceUpdated(product.id, parseFloat(newPrice))
            onClose()
            setNewPrice('')
        } else {
            toast.error(result.error || 'Failed to update price')
        }
        
        setLoading(false)
    }

    const handleClose = () => {
        setNewPrice('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Edit Price</h3>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 text-xl"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Product: <span className="font-medium">{product.name}</span></p>
                    <p className="text-sm text-gray-600">Current price: <span className="font-medium">${product.price?.toLocaleString()}</span></p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="newPrice" className="block text-sm font-medium text-gray-700 mb-2">
                            New Price ($)
                        </label>
                        <input
                            type="number"
                            id="newPrice"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="Enter new price"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Price'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


