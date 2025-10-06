'use client'

import { useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toggleStock, updatePrice, increaseStock, reduceStock } from "@/app/actions/productActions"

export function ProductManageClient({ products, currency }) {
    const [localProducts, setLocalProducts] = useState(products)
    const router = useRouter()

    const handleToggleStock = async (productId) => {
        const result = await toggleStock(productId)
        if (result.success) {
            toast.success('Stock status updated!')
            // Update local state
            setLocalProducts(prev => prev.map(p => 
                p.id === productId ? { ...p, inStock: !p.inStock } : p
            ))
        } else {
            toast.error(result.error || 'Failed to update stock')
        }
    }

    const handleUpdatePrice = async (productId, newPrice) => {
        const result = await updatePrice(productId, newPrice)
        if (result.success) {
            toast.success('Price updated!')
            // Update local state
            setLocalProducts(prev => prev.map(p => 
                p.id === productId ? { ...p, price: parseFloat(newPrice) } : p
            ))
        } else {
            toast.error(result.error || 'Failed to update price')
        }
    }

    const handleStockChange = async (productId, amount, operation) => {
        const result = operation === 'increase' 
            ? await increaseStock(productId, amount)
            : await reduceStock(productId, amount)
            
        if (result.success) {
            toast.success(`Stock ${operation}d!`)
            // Update local state
            setLocalProducts(prev => prev.map(p => {
                if (p.id === productId) {
                    const newStock = operation === 'increase' ? p.stock + amount : p.stock - amount
                    return { ...p, stock: newStock, inStock: newStock > 0 }
                }
                return p
            }))
        } else {
            toast.error(result.error || `Failed to ${operation} stock`)
        }
    }

    return (
        <table className="w-full max-w-6xl text-left ring ring-slate-200 rounded overflow-hidden text-sm">
            <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
                <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3 hidden lg:table-cell">Brand</th>
                    <th className="px-4 py-3 hidden md:table-cell">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                </tr>
            </thead>
            <tbody className="text-slate-700">
                {localProducts && localProducts.length > 0 ? localProducts.map((product) => (
                    <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3">
                            <div className="flex gap-2 items-center">
                                {product.images && product.images[0] ? (
                                    <Image width={40} height={40} className='p-1 shadow rounded cursor-pointer' src={product.images[0]} alt={product.name} />
                                ) : (
                                    <div className='p-1 shadow rounded bg-slate-100 w-10 h-10' />
                                )}
                                <div>
                                    <div className="font-medium">{product.name}</div>
                                    <div className="text-xs text-gray-500 hidden sm:block">{product.brand?.name}</div>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">{product.brand?.name || 'No Brand'}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                            <div className="flex flex-col">
                                <span className="font-medium">{currency} {product.price?.toLocaleString()}</span>
                                <span className="text-xs text-gray-500 line-through">{currency} {product.mrp?.toLocaleString()}</span>
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{product.stock || 0}</span>
                                <div className="flex flex-col gap-1">
                                    <button 
                                        onClick={() => handleStockChange(product.id, 1, 'increase')}
                                        className="text-xs bg-green-100 hover:bg-green-200 px-2 py-1 rounded"
                                    >
                                        +1
                                    </button>
                                    <button 
                                        onClick={() => handleStockChange(product.id, 1, 'reduce')}
                                        className="text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
                                    >
                                        -1
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer" 
                                    onChange={() => handleToggleStock(product.id)} 
                                    checked={product.inStock} 
                                />
                                <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                            </label>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="New price"
                                    className="w-20 text-xs p-1 border rounded"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUpdatePrice(product.id, e.target.value)
                                            e.target.value = ''
                                        }
                                    }}
                                />
                                <button 
                                    onClick={() => {
                                        const newPrice = prompt('Enter new price:', product.price)
                                        if (newPrice && !isNaN(newPrice)) {
                                            handleUpdatePrice(product.id, newPrice)
                                        }
                                    }}
                                    className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
                                >
                                    Edit Price
                                </button>
                            </div>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                            No products found. Add some products to get started.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
