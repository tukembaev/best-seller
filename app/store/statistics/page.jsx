'use client'
import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, Package, Star, Users, Calendar, Target, Award, CheckCircle, HelpCircle } from "lucide-react"
import Loading from "@/components/shared/Loading"
import { fetchStoreOrders, fetchStoreOrderStats } from "@/app/actions/orderActions"
import { getProducts } from "@/app/actions/productActions"


export default function StatisticsPage() {
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState(null)
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [forecasts, setForecasts] = useState({
        nextMonthSales: 0,
        growthRate: 0,
        topPerformingCategory: '',
        seasonalTrend: 'stable'
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            // Загружаем статистику заказов
            const statsResult = await fetchStoreOrderStats()
            if (statsResult.success) {
                setStats(statsResult.stats)
            }

            // Загружаем заказы для детального анализа
            const ordersResult = await fetchStoreOrders()
            if (ordersResult.success) {
                setOrders(ordersResult.orders || [])
            }

            // Загружаем товары для анализа
            const productsResult = await getProducts()
            if (productsResult.success) {
                setProducts(productsResult.products || [])
            }

            // Генерируем прогнозы на основе данных
            generateForecasts()

        } catch (error) {
            console.error('Error fetching statistics data:', error)
        }
        setLoading(false)
    }

    const generateForecasts = () => {
        // Простая логика для генерации прогнозов
        const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
        const completedOrders = orders.filter(order => order.status === 'DELIVERED')
        const currentMonth = new Date().getMonth()
        const currentMonthOrders = orders.filter(order =>
            new Date(order.createdAt).getMonth() === currentMonth
        )

        // Прогноз на следующий месяц (простая экстраполяция)
        const avgMonthlySales = totalSales / Math.max(1, orders.length)
        const nextMonthForecast = avgMonthlySales * 1.1 // Предполагаем 10% рост

        // Определяем топ категорию
        const categoryStats = {}
        completedOrders.forEach(order => {
            order.orderItems?.forEach(item => {
                const category = item.product?.category || 'Другие'
                categoryStats[category] = (categoryStats[category] || 0) + item.quantity
            })
        })

        const topCategory = Object.entries(categoryStats)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Не определена'

        setForecasts({
            nextMonthSales: Math.round(nextMonthForecast),
            growthRate: 10,
            topPerformingCategory: topCategory,
            seasonalTrend: currentMonth >= 10 || currentMonth <= 1 ? 'high' : 'stable'
        })
    }

    const getBrandDemandAnalysis = () => {
        const brandStats = {}
        const completedOrders = orders.filter(order => order.status === 'DELIVERED')

        completedOrders.forEach(order => {
            order.orderItems?.forEach(item => {
                const brand = item.product?.brand?.name || 'Без бренда'
                brandStats[brand] = (brandStats[brand] || 0) + item.quantity
            })
        })

        return Object.entries(brandStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([brand, quantity]) => ({ brand, quantity }))
    }

    const getModelDemandAnalysis = () => {
        const modelStats = {}
        const completedOrders = orders.filter(order => order.status === 'DELIVERED')

        completedOrders.forEach(order => {
            order.orderItems?.forEach(item => {
                const product = item.product
                if (product) {
                    const modelKey = `${product.name} (${product.category})`
                    modelStats[modelKey] = (modelStats[modelKey] || 0) + item.quantity
                }
            })
        })

        return Object.entries(modelStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([model, quantity]) => ({ model, quantity }))
    }

    const getBestsellers = () => {
        const productStats = {}
        const completedOrders = orders.filter(order => order.status === 'DELIVERED')

        completedOrders.forEach(order => {
            order.orderItems?.forEach(item => {
                const productId = item.productId
                productStats[productId] = (productStats[productId] || 0) + item.quantity
            })
        })

        return Object.entries(productStats)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([productId, quantity]) => {
                const product = products.find(p => p.id === productId)
                return {
                    product: product || { name: 'Неизвестный товар', price: 0 },
                    quantity,
                    revenue: (product?.price || 0) * quantity
                }
            })
            .filter(item => item.product.name !== 'Неизвестный товар')
    }

    if (loading) return <Loading />

    const brandDemand = getBrandDemandAnalysis()
    const modelDemand = getModelDemandAnalysis()
    const bestsellers = getBestsellers()

    return (
        <div className="text-slate-500 mb-28">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-800 mb-2">Аналитика продаж</h1>
                <p className="text-slate-600">Детальный анализ продаж и прогнозы</p>
            </div>

            {/* Прогнозы и ключевые метрики */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-slate-600">Прогноз продаж на месяц</p>
                                <div className="group relative">
                                    <HelpCircle size={14} className="text-slate-400 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                        Прогнозируемая выручка на следующий месяц на основе текущих трендов
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-slate-800 mt-2">
                                {forecasts.nextMonthSales.toLocaleString()} сом
                            </p>
                            <div className="flex items-center mt-2">
                                <TrendingUp size={16} className="text-green-500 mr-1" />
                                <span className="text-sm text-green-600">+{forecasts.growthRate}% рост</span>
                            </div>
                        </div>
                        <Target size={32} className="text-blue-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-slate-600">Топ категория</p>
                                <div className="group relative">
                                    <HelpCircle size={14} className="text-slate-400 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                        Категория товаров с наибольшим количеством продаж
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-slate-800 mt-2">
                                {forecasts.topPerformingCategory}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">По объему продаж</p>
                        </div>
                        <Award size={32} className="text-yellow-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-slate-600">Сезонный тренд</p>
                                <div className="group relative">
                                    <HelpCircle size={14} className="text-slate-400 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                        Анализ сезонности продаж на основе исторических данных
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg font-semibold text-slate-800 mt-2">
                                {forecasts.seasonalTrend === 'high' ? 'Высокий сезон' :
                                 forecasts.seasonalTrend === 'low' ? 'Низкий сезон' : 'Стабильный'}
                            </p>
                            <p className="text-sm text-slate-500 mt-1">Текущий период</p>
                        </div>
                        <Calendar size={32} className="text-purple-600" />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-slate-600">Конверсия заказов</p>
                                <div className="group relative">
                                    <HelpCircle size={14} className="text-slate-400 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                                        Процент успешно завершенных заказов от общего количества
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-slate-800 mt-2">
                                {stats ? Math.round((stats.completedOrders / Math.max(stats.totalOrders, 1)) * 100) : 0}%
                            </p>
                            <p className="text-sm text-slate-500 mt-1">Выполненные заказы</p>
                        </div>
                        <CheckCircle size={32} className="text-green-600" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Анализ спроса брендов */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Анализ спроса брендов</h2>
                        <p className="text-sm text-slate-600 mt-1">Топ бренды по количеству проданных товаров</p>
                    </div>
                    <div className="p-6">
                        {brandDemand.length === 0 ? (
                            <p className="text-slate-500 text-center py-4">Нет данных для анализа</p>
                        ) : (
                            <div className="space-y-4">
                                {brandDemand.map((item, index) => (
                                    <div key={item.brand} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                                index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                index === 1 ? 'bg-gray-100 text-gray-700' :
                                                index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{item.brand}</p>
                                                <p className="text-sm text-slate-500">{item.quantity} товаров</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-800">
                                                {Math.round((item.quantity / brandDemand.reduce((sum, i) => sum + i.quantity, 0)) * 100)}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Анализ спроса моделей */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Популярные модели</h2>
                        <p className="text-sm text-slate-600 mt-1">Топ модели по количеству продаж</p>
                    </div>
                    <div className="p-6">
                        {modelDemand.length === 0 ? (
                            <p className="text-slate-500 text-center py-4">Нет данных для анализа</p>
                        ) : (
                            <div className="space-y-4">
                                {modelDemand.map((item, index) => (
                                    <div key={item.model} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                                index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                index === 1 ? 'bg-gray-100 text-gray-700' :
                                                index === 2 ? 'bg-orange-100 text-orange-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800">{item.model}</p>
                                                <p className="text-sm text-slate-500">{item.quantity} проданных</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Товары-лидеры продаж */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 lg:col-span-2">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-800">Товары-лидеры продаж</h2>
                        <p className="text-sm text-slate-600 mt-1">Самые продаваемые товары по выручке</p>
                    </div>
                    <div className="p-6">
                        {bestsellers.length === 0 ? (
                            <p className="text-slate-500 text-center py-4">Нет данных для анализа</p>
                        ) : (
                            <div className="space-y-4">
                                {bestsellers.map((item, index) => (
                                    <div key={item.product.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            {item.product.images?.[0] && (
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-800">{item.product.name}</p>
                                                <p className="text-sm text-slate-500">{item.product.category}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-800">
                                                {item.quantity} шт.
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                {item.revenue.toLocaleString()} сом
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Рекомендации */}
            <div className="mt-8 bg-blue-50 rounded-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Рекомендации для увеличения продаж</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Увеличьте ассортимент товаров бренда "{forecasts.topPerformingCategory}" для удовлетворения спроса</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Сосредоточьтесь на продвижении товаров-лидеров продаж для увеличения прибыли</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Рассмотрите акции и скидки для менее популярных брендов</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p>Оптимизируйте запасы на основе сезонных трендов</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
