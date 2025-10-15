'use client'
import { useEffect, useState } from "react"
import { Search, ShoppingCart, Package, DollarSign, CheckCircle, XCircle, AlertCircle, Trash2, Plus, Minus, Eye, X, HelpCircle } from "lucide-react"
import Loading from "@/components/shared/Loading"
import { getUnassignedOrders, acceptOrder, getSellerOrders, rejectOrder, updateOrder, getSellerStats, getSellerSales, completeOrder, removeOrderFromSeller } from "@/app/actions/orderActions"
import { getProductsForSale, registerSale, getSaleDetails } from "@/app/actions/productActions"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"

export default function SellProductPage() {
    const user = useSelector(state => state.auth.user)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')
    const [searchQuery, setSearchQuery] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [cart, setCart] = useState([]) // Корзина для регистрации продажи
    const [unassignedOrders, setUnassignedOrders] = useState([])
    const [myOrders, setMyOrders] = useState([])
    const [sales, setSales] = useState([])
    const [stats, setStats] = useState({
        totalOrders: 0,
        completedOrders: 0,
        totalSales: 0,
        registeredSales: 0,
        totalRevenue: 0
    })
    const [dailyActivity, setDailyActivity] = useState([])
    const [selectedSale, setSelectedSale] = useState(null)
    const [saleDetailsModal, setSaleDetailsModal] = useState(false)

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        const loadData = async () => {
            if (!user?.id) return
            
            await fetchStats()
            await fetchProducts()
            await fetchUnassignedOrders()
            await fetchMyOrders()
            await fetchSales()
            setLoading(false)
        }
        loadData()
    }, [user])

    // Фильтруем товары по поисковому запросу
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products)
        } else {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.brand?.name && product.brand.name.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            setFilteredProducts(filtered)
        }
    }, [searchQuery, products])

    // Обновляем активность при изменении заказов или продаж
    useEffect(() => {
        if (myOrders.length > 0 || sales.length > 0) {
            updateDailyActivity()
        }
    }, [myOrders, sales])

    const fetchStats = async () => {
        try {
            const result = await getSellerStats(user.id)
            if (result.success) {
                setStats(result.stats)
            }
        } catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    const fetchProducts = async () => {
        try {
            const result = await getProductsForSale('', true)
            if (result.success) {
                setProducts(result.products || [])
                setFilteredProducts(result.products || [])
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const fetchUnassignedOrders = async () => {
        try {
            const result = await getUnassignedOrders()
            if (result.success) {
                setUnassignedOrders(result.orders || [])
            }
        } catch (error) {
            console.error('Error fetching unassigned orders:', error)
        }
    }

    const fetchMyOrders = async () => {
        try {
            const result = await getSellerOrders(user.id)
            if (result.success) {
                setMyOrders(result.orders || [])
            }
        } catch (error) {
            console.error('Error fetching my orders:', error)
        }
    }

    const fetchSales = async () => {
        try {
            const result = await getSellerSales(user.id)
            if (result.success) {
                setSales(result.sales || [])
                calculateDailyActivity(result.sales)
            }
        } catch (error) {
            console.error('Error fetching sales:', error)
        }
    }

    const updateDailyActivity = () => {
        calculateDailyActivity(sales)
    }

    const calculateDailyActivity = (salesData) => {
        const activityMap = {}
        
        salesData.forEach(sale => {
            const date = new Date(sale.createdAt).toLocaleDateString('ru-RU')
            if (!activityMap[date]) {
                activityMap[date] = { 
                    date, 
                    sales: 0, 
                    orders: 0, 
                    grossRevenue: 0, 
                    netRevenue: 0, 
                    watchesSold: 0 
                }
            }
            activityMap[date].sales += 1
            activityMap[date].grossRevenue += sale.total
            activityMap[date].netRevenue += sale.total * 0.8 // Предполагаем 20% комиссия
            activityMap[date].watchesSold += sale.saleItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
        })

        myOrders.forEach(order => {
            // Считаем только завершенные заказы в активности
            if (order.status === 'DELIVERED') {
                const date = new Date(order.createdAt).toLocaleDateString('ru-RU')
                if (!activityMap[date]) {
                    activityMap[date] = { 
                        date, 
                        sales: 0, 
                        orders: 0, 
                        grossRevenue: 0, 
                        netRevenue: 0, 
                        watchesSold: 0 
                    }
                }
                activityMap[date].orders += 1
                activityMap[date].grossRevenue += order.total
                activityMap[date].netRevenue += order.total * 0.8 // Предполагаем 20% комиссия
                activityMap[date].watchesSold += order.orderItems?.reduce((sum, item) => sum + item.quantity, 0) || 0
            }
        })

        const activity = Object.values(activityMap).sort((a, b) => 
            new Date(b.date.split('.').reverse().join('-')) - new Date(a.date.split('.').reverse().join('-'))
        )
        
        setDailyActivity(activity.slice(0, 7))
    }

    // Работа с корзиной
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.productId === product.id)
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                setCart(cart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ))
            } else {
                toast.error('Недостаточно товара на складе')
            }
        } else {
            setCart([...cart, {
                productId: product.id,
                product: product,
                quantity: 1,
                price: product.price
            }])
        }
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.productId !== productId))
    }

    const updateCartQuantity = (productId, change) => {
        setCart(cart.map(item => {
            if (item.productId === productId) {
                const newQuantity = item.quantity + change
                if (newQuantity <= 0) return item
                if (newQuantity > item.product.stock) {
                    toast.error('Недостаточно товара на складе')
                    return item
                }
                return { ...item, quantity: newQuantity }
            }
            return item
        }))
    }

    const getTotalCart = () => {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    const handleRegisterSale = async () => {
        if (cart.length === 0) {
            toast.error('Корзина пуста')
            return
        }

        const items = cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))

        const result = await registerSale(user.id, items)
        if (result.success) {
            toast.success(`Продажа зарегистрирована на сумму ${getTotalCart().toLocaleString()} сом!`)
            setCart([])
            fetchStats()
            fetchProducts()
            fetchSales()
        } else {
            toast.error(result.error || 'Ошибка при регистрации продажи')
        }
    }

    const handleAcceptOrder = async (orderId) => {
        const result = await acceptOrder(orderId, user.id)
        if (result.success) {
            toast.success('Заказ успешно принят!')
            fetchUnassignedOrders()
            fetchMyOrders()
            fetchStats()
        } else {
            toast.error(result.error || 'Ошибка при принятии заказа')
        }
    }

    const handleRejectOrder = async (orderId) => {
        if (confirm('Вы уверены, что хотите отказаться от этого заказа?')) {
            const result = await rejectOrder(orderId)
            if (result.success) {
                toast.success('Заказ возвращен в общий пул')
                fetchUnassignedOrders()
                fetchMyOrders()
                fetchStats()
            } else {
                toast.error(result.error || 'Ошибка при отказе от заказа')
            }
        }
    }

    const handleUpdateOrderStatus = async (orderId, newStatus, trackingStatus) => {
        const result = await updateOrder(orderId, newStatus, trackingStatus)
        if (result.success) {
            toast.success('Статус заказа обновлен')
            fetchMyOrders()
            // Если заказ завершен, обновляем статистику и продажи
            if (newStatus === 'DELIVERED') {
                fetchStats()
                fetchSales()
            }
        } else {
            toast.error(result.error || 'Ошибка при обновлении статуса')
        }
    }

    const handleCompleteOrder = async (orderId) => {
        const result = await completeOrder(orderId)
        if (result.success) {
            toast.success('Заказ успешно завершен!')
            fetchMyOrders()
            fetchStats()
            fetchSales() // Обновляем продажи для пересчета активности
        } else {
            toast.error(result.error || 'Ошибка при завершении заказа')
        }
    }

    const handleSaleClick = async (saleId) => {
        const result = await getSaleDetails(saleId)
        if (result.success) {
            setSelectedSale(result.sale)
            setSaleDetailsModal(true)
        } else {
            toast.error(result.error || 'Ошибка при загрузке деталей продажи')
        }
    }

    const closeSaleModal = () => {
        setSaleDetailsModal(false)
        setSelectedSale(null)
    }

    const handleRemoveOrderFromSeller = async (orderId) => {
        const result = await removeOrderFromSeller(orderId)
        if (result.success) {
            toast.success('Заказ убран из вашего списка')
            fetchMyOrders()
        } else {
            toast.error(result.error || 'Ошибка при удалении заказа')
        }
    }

    if (loading) return <Loading />

    const statsCards = [
        { 
            title: 'Общая выручка', 
            value: `${(stats?.totalRevenue || 0).toLocaleString()} сом`, 
            icon: DollarSign, 
            color: 'text-green-600',
            tooltip: 'Общая сумма всех заказов и продаж с витрины'
        },
        { 
            title: 'Всего заказов', 
            value: stats?.totalOrders || 0, 
            icon: Package, 
            color: 'text-blue-600',
            tooltip: 'Количество всех принятых заказов'
        },
        { 
            title: 'Зарегистрированные продажи', 
            value: stats?.registeredSales || 0, 
            icon: ShoppingCart, 
            color: 'text-purple-600',
            tooltip: 'Количество продаж, зарегистрированных через витрину'
        },
        { 
            title: 'Выполненные заказы', 
            value: stats?.completedOrders || 0, 
            icon: CheckCircle, 
            color: 'text-green-600',
            tooltip: 'Количество успешно завершенных заказов'
        },
    ]

    return (
        <div className="text-slate-500 mb-28">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl">Продажа товаров</h1>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
                    >
                        Обзор
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-4 py-2 rounded-lg ${activeTab === 'products' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
                    >
                        Витрина
                    </button>
                    <button
                        onClick={() => setActiveTab('unassigned')}
                        className={`px-4 py-2 rounded-lg ${activeTab === 'unassigned' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
                    >
                        Заказы ({unassignedOrders.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('myorders')}
                        className={`px-4 py-2 rounded-lg ${activeTab === 'myorders' ? 'bg-slate-800 text-white' : 'bg-slate-100'}`}
                    >
                        Мои заказы ({myOrders.length})
                    </button>
                </div>
            </div>

            {/* Статистика продаж */}
            {activeTab === 'overview' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsCards.map((card, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-slate-600">{card.title}</p>
                                      
                                    </div>
                                    <card.icon size={32} className={card.color} />
                                </div>
                                <p className="text-2xl font-bold text-slate-800 mt-2">{card.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Таблица активности */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 mb-8">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className=" text-lg font-semibold text-slate-800">Активность продавца</h2>
                        </div>
                        <div className="overflow-x-auto ">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Дата</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                                            <div className="flex items-center gap-1">
                                                Заказы
                                            
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                                            <div className="flex items-center gap-1">
                                                Витрина
                                               
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                                            <div className="flex items-center gap-1">
                                                Часов продано
                                              
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                                            <div className="flex items-center gap-1">
                                                Грязный доход
                                              
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                                            <div className="flex items-center gap-1">
                                                Чистый доход
                                         
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {dailyActivity.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                                Нет данных об активности
                                            </td>
                                        </tr>
                                    ) : (
                                        dailyActivity.map((activity, index) => (
                                            <tr key={index} className="hover:bg-slate-50">
                                                <td className="px-4 py-4 text-slate-800">{activity.date}</td>
                                                <td className="px-4 py-4 text-slate-600">{activity.orders}</td>
                                                <td className="px-4 py-4 text-slate-600">{activity.sales}</td>
                                                <td className="px-4 py-4 text-slate-600">{activity.watchesSold}</td>
                                                <td className="px-4 py-4 text-slate-600">{activity.grossRevenue.toLocaleString()} сом</td>
                                                <td className="px-4 py-4 text-slate-600">{activity.netRevenue.toLocaleString()} сом</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Недавние продажи */}
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                        <div className="p-6 border-b border-slate-200">
                            <h2 className="text-lg font-semibold text-slate-800">Недавние продажи (витрина)</h2>
                        </div>
                        <div className="p-6">
                            {sales.length === 0 ? (
                                <p className="text-center text-slate-500 py-4">Нет зарегистрированных продаж</p>
                            ) : (
                                <div className="space-y-4">
                                    {sales.slice(0, 5).map((sale) => (
                                        <div 
                                            key={sale.id} 
                                            className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                                            onClick={() => handleSaleClick(sale.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {sale.saleItems?.map(item => item.product?.name).join(', ') || 'Товары'}
                                                    </p>
                                                    <p className="text-sm text-slate-500">
                                                        {new Date(sale.createdAt).toLocaleString('ru-RU')}
                                                    </p>
                                                </div>
                                                
                                            </div>
                                            <p className="font-semibold text-slate-800">
                                                {sale.total.toLocaleString()} сом
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Витрина - регистрация продаж */}
            {activeTab === 'products' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Список товаров */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Поиск товаров по названию, категории или бренду..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                            <div className="p-4 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Товары ({filteredProducts.length})
                                </h2>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {filteredProducts.length === 0 ? (
                                    <div className="text-center py-8 text-slate-500">
                                        Товары не найдены
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {filteredProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {product.images?.[0] && (
                                                        <img
                                                            src={product.images[0]}
                                                            alt={product.name}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-slate-800">{product.name}</h3>
                                                        <p className="text-sm text-slate-500">{product.category}</p>
                                                        <p className="text-sm text-slate-500">
                                                            Бренд: {product.brand?.name || 'Без бренда'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-slate-800">
                                                            {product.price.toLocaleString()} сом
                                                        </p>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            {product.inStock ? (
                                                                <CheckCircle size={16} className="text-green-500" />
                                                            ) : (
                                                                <XCircle size={16} className="text-red-500" />
                                                            )}
                                                            <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                                                {product.inStock ? `${product.stock} шт.` : 'Нет'}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => addToCart(product)}
                                                            disabled={!product.inStock}
                                                            className="mt-2 bg-slate-800 text-white px-3 py-1 rounded text-sm hover:bg-slate-700 disabled:bg-slate-300"
                                                        >
                                                            Добавить
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Корзина */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 sticky top-4">
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-lg font-semibold text-slate-800">Корзина ({cart.length})</h2>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {cart.length === 0 ? (
                                    <p className="text-center text-slate-500">Корзина пуста</p>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((item) => (
                                            <div key={item.productId} className="border-b border-slate-100 pb-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-medium text-slate-800 text-sm">{item.product.name}</p>
                                                    <button
                                                        onClick={() => removeFromCart(item.productId)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateCartQuantity(item.productId, -1)}
                                                            className="bg-slate-100 p-1 rounded hover:bg-slate-200"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateCartQuantity(item.productId, 1)}
                                                            className="bg-slate-100 p-1 rounded hover:bg-slate-200"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {(item.price * item.quantity).toLocaleString()} сом
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {cart.length > 0 && (
                                <div className="p-6 border-t border-slate-200">
                                    <div className="flex justify-between mb-4">
                                        <span className="font-semibold text-slate-800">Итого:</span>
                                        <span className="font-bold text-slate-800 text-lg">
                                            {getTotalCart().toLocaleString()} сом
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleRegisterSale}
                                        className="w-full bg-slate-800 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors"
                                    >
                                        Зарегистрировать продажу
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Непринятые заказы */}
            {activeTab === 'unassigned' && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Доступные заказы ({unassignedOrders.length})
                        </h2>
                    </div>

                    {unassignedOrders.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            Нет доступных заказов
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {unassignedOrders.map((order) => (
                                <div key={order.id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-slate-800">
                                                Заказ #{order.orderNumber}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                Покупатель: {order.user?.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                Сумма: {order.total.toLocaleString()} сом
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                Дата: {new Date(order.createdAt).toLocaleString('ru-RU')}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleAcceptOrder(order.id)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Принять заказ
                                        </button>
                                    </div>

                                    {order.orderItems && order.orderItems.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <p className="text-sm font-medium text-slate-700 mb-2">Товары:</p>
                                            <div className="space-y-2">
                                                {order.orderItems.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-3 text-sm text-slate-600">
                                                        <span>{item.product?.name}</span>
                                                        <span>×</span>
                                                        <span>{item.quantity}</span>
                                                        <span>=</span>
                                                        <span>{(item.price * item.quantity).toLocaleString()} сом</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Мои заказы */}
            {activeTab === 'myorders' && (
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Мои заказы ({myOrders.length})
                        </h2>
                    </div>

                    {myOrders.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            У вас пока нет принятых заказов
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {myOrders.map((order) => (
                                <div key={order.id} className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-medium text-slate-800">
                                                Заказ #{order.orderNumber}
                                            </h3>
                                            <p className="text-sm text-slate-500">
                                                Покупатель: {order.user?.name}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                Сумма: {order.total.toLocaleString()} сом
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                Дата: {new Date(order.createdAt).toLocaleString('ru-RU')}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            {(order.status === 'IN_TRANSIT' || order.status === 'ON_THE_WAY') && (
                                                <button
                                                    onClick={() => handleCompleteOrder(order.id)}
                                                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                >
                                                    Завершить заказ
                                                </button>
                                            )}
                                            {order.status === 'DELIVERED' ? (
                                                <button
                                                    onClick={() => handleRemoveOrderFromSeller(order.id)}
                                                    className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                                >
                                                    Убрать из моих заказов
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleRejectOrder(order.id)}
                                                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                >
                                                    Отказаться
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Управление статусом */}
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Статус заказа:
                                        </label>
                                        <select
                                            value={order.status}
                                            onChange={(e) => {
                                                const newStatus = e.target.value
                                                let trackingStatus = order.trackingStatus
                                                if (newStatus === 'IN_TRANSIT') trackingStatus = 'IN_TRANSIT'
                                                if (newStatus === 'ON_THE_WAY') trackingStatus = 'ON_THE_WAY'
                                                if (newStatus === 'DELIVERED') trackingStatus = 'DELIVERED'
                                                handleUpdateOrderStatus(order.id, newStatus, trackingStatus)
                                            }}
                                            className="w-full md:w-64 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                                        >
                                            <option value="PROCESSING">В обработке</option>
                                            <option value="IN_TRANSIT">В пути</option>
                                            <option value="ON_SORTING_CENTER">На сортировочном центре</option>
                                            <option value="ON_THE_WAY">В пути к клиенту</option>
                                            <option value="DELIVERED">Доставлен</option>
                                            <option value="CANCELLED">Отменен</option>
                                        </select>
                                    </div>

                                    {order.orderItems && order.orderItems.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <p className="text-sm font-medium text-slate-700 mb-2">Товары:</p>
                                            <div className="space-y-2">
                                                {order.orderItems.map((item, index) => (
                                                    <div key={index} className="flex items-center gap-3 text-sm text-slate-600">
                                                        <span>{item.product?.name}</span>
                                                        <span>×</span>
                                                        <span>{item.quantity}</span>
                                                        <span>=</span>
                                                        <span>{(item.price * item.quantity).toLocaleString()} сом</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Модальное окно с деталями продажи */}
            {saleDetailsModal && selectedSale && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-slate-200">
                            <h2 className="text-xl font-semibold text-slate-900">
                                Детали продажи
                            </h2>
                            <button 
                                onClick={closeSaleModal}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Информация о продаже */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800 mb-3">Информация о продаже</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Дата:</span> {new Date(selectedSale.createdAt).toLocaleString('ru-RU')}</p>
                                        <p><span className="font-medium">Продавец:</span> {selectedSale.seller?.name}</p>
                                        <p><span className="font-medium">Общая сумма:</span> {selectedSale.total.toLocaleString()} сом</p>
                                        <p><span className="font-medium">Количество товаров:</span> {selectedSale.saleItems?.length || 0}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-medium text-slate-800 mb-3">Статистика</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Общее количество:</span> {selectedSale.saleItems?.reduce((sum, item) => sum + item.quantity, 0) || 0} шт.</p>
                                        <p><span className="font-medium">Средняя цена:</span> {selectedSale.saleItems?.length ? (selectedSale.total / selectedSale.saleItems.reduce((sum, item) => sum + item.quantity, 0)).toFixed(0) : 0} сом</p>
                                    </div>
                                </div>
                            </div>

                            {/* Товары в продаже */}
                            <div>
                                <h3 className="text-lg font-medium text-slate-800 mb-4">Проданные товары</h3>
                                <div className="space-y-4">
                                    {selectedSale.saleItems?.map((item, index) => (
                                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                                            <div className="flex items-start gap-4">
                                                {item.product?.images?.[0] && (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-20 h-20 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-slate-800">{item.product?.name}</h4>
                                                    <p className="text-sm text-slate-500">{item.product?.category}</p>
                                                    <p className="text-sm text-slate-500">Бренд: {item.product?.brand?.name || 'Без бренда'}</p>
                                                    
                                                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <p className="font-medium text-slate-700">Количество:</p>
                                                            <p className="text-slate-600">{item.quantity} шт.</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-700">Цена за единицу:</p>
                                                            <p className="text-slate-600">{item.price.toLocaleString()} сом</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-700">Общая стоимость:</p>
                                                            <p className="text-slate-600 font-semibold">{(item.price * item.quantity).toLocaleString()} сом</p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-700">Текущий остаток:</p>
                                                            <p className="text-slate-600">{item.product?.stock || 0} шт.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}