'use client'
import { useEffect, useState } from "react"
import Loading from "@/components/shared/Loading"
import OrderDetails from "@/components/orders/OrderDetails"
import { fetchStoreOrders, updateOrder } from "@/app/actions/orderActions"
import { getStatusDisplayName, getNextTrackingStatus } from "@/lib/utils/orderHelpers"

export default function StoreOrders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [storeId, setStoreId] = useState(null) // This should come from store context/auth

    // For demo purposes, we'll use the store ID from seed
    useEffect(() => {
        // Get the first store ID from our seed - this should come from auth context in real app
        setStoreId("cmganzlrt000dc2qy2kh0hlk3") // Real store ID from database
    }, [])

    const fetchOrders = async () => {
        if (!storeId) return
        
        console.log('Starting to fetch orders for store:', storeId)
        
        try {
            const result = await fetchStoreOrders(storeId)
            console.log('Fetch result:', result)
            if (result.success) {
                setOrders(result.orders || [])
            } else {
                console.error('Failed to fetch orders:', result.error)
                setOrders([])
            }
        } catch (error) {
            console.error('Error in fetchOrders:', error)
            setOrders([])
        }
        setLoading(false)
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const result = await updateOrder(orderId, newStatus, getNextTrackingStatus(newStatus))
            if (result.success) {
                // Update the order in the local state
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order.id === orderId 
                            ? { ...order, status: newStatus, trackingStatus: getNextTrackingStatus(newStatus) }
                            : order
                    )
                )
            }
        } catch (error) {
            console.error('Failed to update order:', error)
        }
    }

    const openModal = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedOrder(null)
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (storeId) {
            fetchOrders()
        }
    }, [storeId])

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    if (loading) return <Loading />

    return (
        <>
            <h1 className="text-2xl text-slate-500 mb-5">Store <span className="text-slate-800 font-medium">Orders</span></h1>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <div className="overflow-x-auto max-w-4xl rounded-md shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wider">
                            <tr>
                                {["Sr. No.", "Customer", "Total", "Payment", "Coupon", "Status", "Date"].map((heading, i) => (
                                    <th key={i} className="px-4 py-3">{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                                    onClick={() => openModal(order)}
                                >
                                    <td className="pl-6 text-blue-600" >
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3">{order.user?.name}</td>
                                    <td className="px-4 py-3 font-medium text-slate-800">{order.total} сом</td>
                                    <td className="px-4 py-3">{order.paymentMethod}</td>
                                    <td className="px-4 py-3">
                                        {order.isCouponUsed ? (
                                            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                {order.coupon?.code}
                                            </span>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td className="px-4 py-3" onClick={(e) => { e.stopPropagation() }}>
                                        <select
                                            value={order.status}
                                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                                            className="border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200"
                                        >
                                            <option value="ORDER_PLACED">{getStatusDisplayName('ORDER_PLACED')}</option>
                                            <option value="PROCESSING">{getStatusDisplayName('PROCESSING')}</option>
                                            <option value="IN_TRANSIT">{getStatusDisplayName('IN_TRANSIT')}</option>
                                            <option value="ON_SORTING_CENTER">{getStatusDisplayName('ON_SORTING_CENTER')}</option>
                                            <option value="ON_THE_WAY">{getStatusDisplayName('ON_THE_WAY')}</option>
                                            <option value="DELIVERED">{getStatusDisplayName('DELIVERED')}</option>
                                            <option value="CANCELLED">{getStatusDisplayName('CANCELLED')}</option>
                                            <option value="RETURNED">{getStatusDisplayName('RETURNED')}</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal with OrderDetails component */}
            {isModalOpen && selectedOrder && (
                <div onClick={closeModal} className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div onClick={e => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Order Details
                            </h2>
                            <button 
                                onClick={closeModal} 
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1">
                            <OrderDetails order={selectedOrder} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
