'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { updateProductFull } from "@/app/actions/productActions"
import { getBrands } from "@/app/actions/brandActions"
import { COLLECTION_OPTIONS, CASE_MATERIAL_OPTIONS, CASE_SIZE_OPTIONS, STRAP_MATERIAL_OPTIONS, WATER_RESISTANCE_OPTIONS } from "@/shared/watchOptions"
import TemplateModal from "@/components/shared/TemplateModal"
import TemplateTabs from "@/components/shared/TemplateTabs"
import { useRouter } from "next/navigation"

export default function EditProductClient({ product, brands: initialBrands }) {
    const router = useRouter()
    const categories = ['luxury', 'mid-range', 'budget', 'sports', 'vintage', 'smart']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: product.name || "",
        description: product.description || "",
        mrp: product.mrp || 0,
        price: product.price || 0,
        category: product.category || "",
        stock: product.stock || 0,
        brandId: product.brandId || "",
        collection: product.collection || "",
        mechanism: product.mechanism || "",
        gender: product.gender || "",
        caseSize: product.caseSize || "",
        caseMaterial: product.caseMaterial || "",
        strapMaterial: product.strapMaterial || "",
        waterResistance: product.waterResistance || "",
    })
    const [brands, setBrands] = useState(initialBrands)
    const [loading, setLoading] = useState(false)
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    // Initialize images from existing product
    useEffect(() => {
        if (product.images && product.images.length > 0) {
            const imageState = { 1: null, 2: null, 3: null, 4: null }
            product.images.forEach((imagePath, index) => {
                if (index < 4) {
                    imageState[index + 1] = imagePath
                }
            })
            setImages(imageState)
        }
    }, [product.images])

    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template)
        
        // Если template равен null, сбрасываем только поля спецификации
        if (template === null) {
            setProductInfo({
                ...productInfo,
                collection: "",
                mechanism: "",
                gender: "",
                caseSize: "",
                caseMaterial: "",
                strapMaterial: "",
                waterResistance: "",
            })
        } else {
            // Применяем шаблон
            setProductInfo({
                ...productInfo,
                collection: template.collection || "",
                mechanism: template.mechanism || "",
                gender: template.gender || "",
                caseSize: template.caseSize || "",
                caseMaterial: template.caseMaterial || "",
                strapMaterial: template.strapMaterial || "",
                waterResistance: template.waterResistance || "",
            })
        }
    }

    const handleTemplateCreated = (template) => {
        handleTemplateSelect(template)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const formData = new FormData()
        formData.append('productId', product.id)
        formData.append('name', productInfo.name)
        formData.append('description', productInfo.description)
        formData.append('mrp', String(productInfo.mrp))
        formData.append('price', String(productInfo.price))
        formData.append('category', productInfo.category)
        formData.append('stock', String(productInfo.stock))
        formData.append('brandId', productInfo.brandId)
        // spec fields
        formData.append('collection', productInfo.collection)
        formData.append('mechanism', productInfo.mechanism)
        formData.append('gender', productInfo.gender)
        formData.append('caseSize', productInfo.caseSize)
        formData.append('caseMaterial', productInfo.caseMaterial)
        formData.append('strapMaterial', productInfo.strapMaterial)
        formData.append('waterResistance', productInfo.waterResistance)
        
        // Add images info
        const imageFiles = Object.values(images).filter(img => img !== null && typeof img === 'object')
        const existingImages = Object.values(images).filter(img => img !== null && typeof img === 'string')
        
        if (imageFiles.length > 0) {
            formData.append('imageCount', imageFiles.length.toString())
            imageFiles.forEach((file, idx) => {
                formData.append(`image${idx + 1}`, file)
            })
        }
        
        if (existingImages.length > 0) {
            formData.append('existingImageCount', existingImages.length.toString())
            existingImages.forEach((imagePath, idx) => {
                formData.append(`existingImage${idx + 1}`, imagePath)
            })
        }

        const result = await updateProductFull(formData)
        
        if (result.success) {
            toast.success('Product updated successfully!')
            router.push('/store/manage-product')
        } else {
            toast.error(result.error || 'Failed to update product')
        }
        
        setLoading(false)
    }

    const handleImageChange = (key, file) => {
        setImages({ ...images, [key]: file })
    }

    const removeImage = (key) => {
        setImages({ ...images, [key]: null })
    }

    return (
        <>
        <div className="mb-6">
            <button 
                onClick={() => router.back()}
                className="text-blue-600 hover:text-blue-800 text-sm mb-4 flex items-center gap-2"
            >
                ← Back to Products
            </button>
            <h1 className="text-2xl">Edit <span className="text-slate-800 font-medium">Product</span></h1>
        </div>

        <form onSubmit={onSubmitHandler} className="text-slate-500 mb-28">
            <p className="mt-7">Product Images</p>

            <div htmlFor="" className="flex gap-3 mt-4">
                {Object.keys(images).map((key) => (
                    <div key={key} className="relative">
                        <label htmlFor={`images${key}`}>
                            <Image 
                                width={300} 
                                height={300} 
                                className='h-15 w-auto border border-slate-200 rounded cursor-pointer' 
                                src={images[key] ? 
                                    (typeof images[key] === 'string' ? images[key] : URL.createObjectURL(images[key])) : 
                                    assets.upload_area
                                } 
                                alt="" 
                            />
                            <input 
                                type="file" 
                                accept='image/*' 
                                id={`images${key}`} 
                                onChange={e => handleImageChange(key, e.target.files[0])} 
                                hidden 
                            />
                        </label>
                        {images[key] && (
                            <button
                                type="button"
                                onClick={() => removeImage(key)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Templates Section */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Templates</h3>
                    <button
                        type="button"
                        onClick={() => setIsTemplateModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm"
                    >
                        Add Template
                    </button>
                </div>
                
                <div className="mb-4">
                    <TemplateTabs 
                        onTemplateSelect={handleTemplateSelect}
                        selectedTemplate={selectedTemplate}
                    />
                </div>
                
                {selectedTemplate && (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                        <p className="text-sm text-blue-800">
                            <strong>Selected template:</strong> {selectedTemplate.name}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <label htmlFor="" className="flex flex-col gap-2">
                    Watch Name
                    <input 
                        type="text" 
                        name="name" 
                        onChange={onChangeHandler} 
                        value={productInfo.name} 
                        placeholder="Enter watch name" 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                        required 
                    />
                </label>

                <label htmlFor="" className="flex flex-col gap-2">
                    Brand
                    <select 
                        name="brandId" 
                        onChange={onChangeHandler} 
                        value={productInfo.brandId} 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                        required
                    >
                        <option value="">Select a brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </label>
            </div>

            <label htmlFor="" className="flex flex-col gap-2 my-6">
                Description
                <textarea 
                    name="description" 
                    onChange={onChangeHandler} 
                    value={productInfo.description} 
                    placeholder="Enter watch description" 
                    rows={4} 
                    className="w-full max-w-2xl p-2 px-4 outline-none border border-slate-200 rounded resize-none" 
                    required 
                />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <label htmlFor="" className="flex flex-col gap-2">
                    Actual Price ($)
                    <input 
                        type="number" 
                        name="mrp" 
                        onChange={onChangeHandler} 
                        value={productInfo.mrp} 
                        placeholder="0" 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                        required 
                    />
                </label>
                <label htmlFor="" className="flex flex-col gap-2">
                    Offer Price ($)
                    <input 
                        type="number" 
                        name="price" 
                        onChange={onChangeHandler} 
                        value={productInfo.price} 
                        placeholder="0" 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                        required 
                    />
                </label>
                <label htmlFor="" className="flex flex-col gap-2">
                    Stock Quantity
                    <input 
                        type="number" 
                        name="stock" 
                        onChange={onChangeHandler} 
                        value={productInfo.stock} 
                        placeholder="0" 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                        required 
                    />
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <select 
                    name="category" 
                    onChange={onChangeHandler} 
                    value={productInfo.category} 
                    className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>

                <select 
                    name="mechanism" 
                    onChange={onChangeHandler} 
                    value={productInfo.mechanism} 
                    className="w-full p-2 px-4 outline-none border border-slate-200 rounded"
                >
                    <option value="">Select movement type</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual Winding">Manual Winding</option>
                    <option value="Quartz">Quartz</option>
                    <option value="Solar">Solar</option>
                </select>
            </div>

            <h3 className="text-lg font-medium mt-8 mb-4">Watch Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <label htmlFor="" className="flex flex-col gap-2">
                    Collection
                    <input 
                        type="text" 
                        name="collection" 
                        onChange={onChangeHandler} 
                        value={productInfo.collection} 
                        placeholder="e.g., Submariner" 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded" 
                    />
                </label>

                <label htmlFor="" className="flex flex-col gap-2">
                    Gender
                    <select 
                        name="gender" 
                        onChange={onChangeHandler} 
                        value={productInfo.gender} 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded"
                    >
                        <option value="">Select gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </label>

                <label htmlFor="" className="flex flex-col gap-2">
                    Case Size
                    <select 
                        name="caseSize" 
                        onChange={onChangeHandler} 
                        value={productInfo.caseSize} 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded"
                    >
                        <option value="">Select case size</option>
                        {CASE_SIZE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="" className="flex flex-col gap-2">
                    Case Material
                    <select 
                        name="caseMaterial" 
                        onChange={onChangeHandler} 
                        value={productInfo.caseMaterial} 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded"
                    >
                        <option value="">Select case material</option>
                        {CASE_MATERIAL_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="" className="flex flex-col gap-2">
                    Strap Material
                    <select 
                        name="strapMaterial" 
                        onChange={onChangeHandler} 
                        value={productInfo.strapMaterial} 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded"
                    >
                        <option value="">Select strap material</option>
                        {STRAP_MATERIAL_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="" className="flex flex-col gap-2">
                    Water Resistance
                    <select 
                        name="waterResistance" 
                        onChange={onChangeHandler} 
                        value={productInfo.waterResistance} 
                        className="w-full p-2 px-4 outline-none border border-slate-200 rounded"
                    >
                        <option value="">Select water resistance</option>
                        {WATER_RESISTANCE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex gap-4 mt-8">
                <button 
                    type="button"
                    onClick={() => router.push('/store/manage-product')}
                    className="bg-gray-500 text-white px-8 py-3 hover:bg-gray-600 rounded transition"
                >
                    Cancel
                </button>
                <button 
                    disabled={loading} 
                    className="bg-slate-800 text-white px-8 py-3 hover:bg-slate-900 rounded transition"
                >
                    {loading ? 'Updating Product...' : 'Update Product'}
                </button>
            </div>
        </form>

        {/* Template Modal */}
        <TemplateModal
            isOpen={isTemplateModalOpen}
            onClose={() => setIsTemplateModalOpen(false)}
            onTemplateCreated={handleTemplateCreated}
        />
    </>
    )
}
