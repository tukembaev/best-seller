'use client'
import { dummyStoreDashboardData } from "@/assets/assets"
import Loading from "@/components/shared/Loading"
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon, PlusIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { createBrand, getBrands, deleteBrand } from "@/app/actions/brandActions"

export default function Dashboard() {

    

    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [brands, setBrands] = useState([])
    const [showBrandForm, setShowBrandForm] = useState(false)
    const [brandForm, setBrandForm] = useState({
        name: '',
        slug: '',
        description: '',
        logo: null,
    })
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalEarnings: 0,
        totalOrders: 0,
        ratings: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.totalProducts, icon: ShoppingBasketIcon },
        { title: 'Total Earnings', value: `${dashboardData.totalEarnings.toLocaleString()} сом`, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData.totalOrders, icon: TagsIcon },
        { title: 'Total Ratings', value: dashboardData.ratings.length, icon: StarIcon },
    ]

    const fetchDashboardData = async () => {
        setDashboardData(dummyStoreDashboardData)
        setLoading(false)
    }

    const fetchBrands = async () => {
        const result = await getBrands()
        if (result.success) {
            setBrands(result.brands)
        }
    }

    const handleCreateBrand = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', brandForm.name)
        formData.append('slug', brandForm.slug)
        formData.append('description', brandForm.description)
        if (brandForm.logo) formData.append('logo', brandForm.logo)

        const result = await createBrand(formData)
        if (result.success) {
            toast.success('Brand created successfully!')
            setBrandForm({ name: '', slug: '', description: '', logo: null })
            setShowBrandForm(false)
            fetchBrands()
        } else {
            toast.error(result.error || 'Failed to create brand')
        }
    }

    const handleDeleteBrand = async (brandId) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            const result = await deleteBrand(brandId)
            if (result.success) {
                toast.success('Brand deleted successfully!')
                fetchBrands()
            } else {
                toast.error(result.error || 'Failed to delete brand')
            }
        }
    }

    useEffect(() => {
        fetchDashboardData()
        fetchBrands()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-28">
            <h1 className="text-2xl">Seller <span className="text-slate-800 font-medium">Dashboard</span></h1>

            <div className="flex flex-wrap gap-5 my-10 mt-4">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="flex items-center gap-11 border border-slate-200 p-3 px-6 rounded-lg">
                            <div className="flex flex-col gap-3 text-xs">
                                <p>{card.title}</p>
                                <b className="text-2xl font-medium text-slate-700">{card.value}</b>
                            </div>
                            <card.icon size={50} className=" w-11 h-11 p-2.5 text-slate-400 bg-slate-100 rounded-full" />
                        </div>
                    ))
                }
            </div>

            {/* Brand Management Section */}
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium">Brand Management</h2>
                    <button 
                        onClick={() => setShowBrandForm(!showBrandForm)}
                        className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
                    >
                        <PlusIcon size={16} />
                        Add Brand
                    </button>
                </div>

                {showBrandForm && (
                    <form onSubmit={handleCreateBrand} className="bg-slate-50 p-6 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Brand Name</label>
                                <input
                                    type="text"
                                    value={brandForm.name}
                                    onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                                    className="w-full p-2 border border-slate-200 rounded"
                                    placeholder="e.g., Casio"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={brandForm.slug}
                                    onChange={(e) => setBrandForm({ ...brandForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    className="w-full p-2 border border-slate-200 rounded"
                                    placeholder="e.g., casio"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <input
                                    type="text"
                                    value={brandForm.description}
                                    onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                                    className="w-full p-2 border border-slate-200 rounded"
                                    placeholder="Brief description"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.files?.[0] || null })}
                                    className="w-full p-2 border border-slate-200 rounded"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button type="submit" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition">
                                Create Brand
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setShowBrandForm(false)}
                                className="bg-slate-200 text-slate-700 px-4 py-2 rounded hover:bg-slate-300 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {brands.map((brand) => (
                        <div key={brand.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-slate-800">{brand.name}</h3>
                                    <p className="text-sm text-slate-500">{brand.slug}</p>
                                    {brand.description && (
                                        <p className="text-xs text-slate-400 mt-1">{brand.description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDeleteBrand(brand.id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <TrashIcon size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h2>Total Reviews</h2>

            <div className="mt-5">
                {
                    dashboardData.ratings.map((review, index) => (
                        <div key={index} className="flex max-sm:flex-col gap-5 sm:items-center justify-between py-6 border-b border-slate-200 text-sm text-slate-600 max-w-4xl">
                            <div>
                                <div className="flex gap-3">
                                    <Image src={review.user.image} alt="" className="w-10 aspect-square rounded-full" width={100} height={100} />
                                    <div>
                                        <p className="font-medium">{review.user.name}</p>
                                        <p className="font-light text-slate-500">{new Date(review.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-slate-500 max-w-xs leading-6">{review.review}</p>
                            </div>
                            <div className="flex flex-col justify-between gap-6 sm:items-end">
                                <div className="flex flex-col sm:items-end">
                                    <p className="text-slate-400">{review.product?.category}</p>
                                    <p className="font-medium">{review.product?.name}</p>
                                    <div className='flex items-center'>
                                        {Array(5).fill('').map((_, index) => (
                                            <StarIcon key={index} size={17} className='text-transparent mt-0.5' fill={review.rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => router.push(`/product/${review.product.id}`)} className="bg-slate-100 px-5 py-2 hover:bg-slate-200 rounded transition-all">View Product</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}