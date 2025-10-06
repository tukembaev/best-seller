'use client'
import PageTitle from "@/components/shared/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/orders/OrderItem";
import { fetchUserOrders } from "@/app/actions/orderActions";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // TODO: Get actual user ID from auth context
        const userId = "user_1" // This should come from authentication
        
        const fetchOrders = async () => {
            const result = await fetchUserOrders(userId);
            if (result.success) {
                setOrders(result.orders || []);
            } else {
                console.error('Failed to fetch user orders:', result.error);
                setOrders([]);
            }
            setLoading(false);
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-[70vh] mx-6">
            {orders.length > 0 ? (
                (
                    <div className="my-20 max-w-7xl mx-auto">
                        <PageTitle heading="My Orders" text={`Showing total ${orders.length} orders`} linkText={'Go to home'} />

                        <table className="w-full max-w-5xl text-slate-500 table-auto border-separate border-spacing-y-12 border-spacing-x-4">
                            <thead>
                                <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
                                    <th className="text-left">Product</th>
                                    <th className="text-center">Total Price</th>
                                    <th className="text-left">Address</th>
                                    <th className="text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <OrderItem order={order} key={order.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
                    <h1 className="text-2xl sm:text-4xl font-semibold">You have no orders</h1>
                </div>
            )}
        </div>
    )
}